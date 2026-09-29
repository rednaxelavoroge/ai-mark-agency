-- Self-serve phase 1.
--
-- Buyer identity on a treasury invoice, a subscriptions row per email+sku,
-- and one transactional confirm: the same invoice or the same tx hash cannot
-- create a second sale or a second subscription. A renewal (new invoice,
-- same email+sku) extends active_until by the invoice billing period and
-- pays the partner from the referral code frozen on the first payment.
--
-- Not applied to production from the agent that added this file: that
-- environment had no DDL channel. Apply with the Supabase SQL editor or CLI
-- before the new pay form is used in production.

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  sku text not null,
  product text not null,
  status text not null default 'onboarding',
  active_until timestamptz not null,
  cancel_at_period_end boolean not null default false,
  referral_code text,
  partner_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_email_format check (
    email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and char_length(email) <= 320
  ),
  constraint subscriptions_sku_len check (char_length(sku) between 1 and 64),
  constraint subscriptions_product_len check (char_length(product) between 1 and 200),
  constraint subscriptions_status_valid check (
    status in ('pending', 'onboarding', 'active', 'past_due', 'cancelled')
  ),
  constraint subscriptions_referral_format check (
    referral_code is null
    or referral_code ~ '^[a-z0-9][a-z0-9_-]{3,31}$'
  ),
  constraint subscriptions_partner_format check (
    partner_id is null
    or partner_id ~ '^AM-[0-9]{4,12}$'
  ),
  constraint subscriptions_email_sku_uq unique (email, sku)
);

comment on table public.subscriptions is
  'Self-serve product subscription. referral_code and partner_id are frozen from the first payment and are not rewritten on renewal.';

comment on column public.subscriptions.referral_code is
  'Referral code captured on the first paid invoice. Renewals keep paying this partner after the attribution cookie expires.';

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

alter table public.subscriptions enable row level security;

drop policy if exists subscriptions_select_admin on public.subscriptions;
create policy subscriptions_select_admin
  on public.subscriptions for select to authenticated
  using (public.is_admin());

alter table public.payment_invoices
  add column if not exists buyer_email text,
  add column if not exists buyer_name text,
  add column if not exists buyer_company text,
  add column if not exists billing_period_days integer,
  add column if not exists subscription_id uuid;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'payment_invoices_buyer_email_format'
  ) then
    alter table public.payment_invoices
      add constraint payment_invoices_buyer_email_format check (
        buyer_email is null
        or (
          buyer_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
          and char_length(buyer_email) <= 320
        )
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'payment_invoices_buyer_name_len'
  ) then
    alter table public.payment_invoices
      add constraint payment_invoices_buyer_name_len check (
        buyer_name is null or char_length(buyer_name) between 1 and 120
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'payment_invoices_buyer_company_len'
  ) then
    alter table public.payment_invoices
      add constraint payment_invoices_buyer_company_len check (
        buyer_company is null or char_length(buyer_company) between 1 and 160
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'payment_invoices_billing_period_valid'
  ) then
    alter table public.payment_invoices
      add constraint payment_invoices_billing_period_valid check (
        billing_period_days is null
        or billing_period_days between 1 and 366
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'payment_invoices_subscription_id_fkey'
  ) then
    alter table public.payment_invoices
      add constraint payment_invoices_subscription_id_fkey
      foreign key (subscription_id) references public.subscriptions (id)
      on delete restrict;
  end if;
end
$$;

create index if not exists payment_invoices_subscription_idx
  on public.payment_invoices (subscription_id)
  where subscription_id is not null;

comment on column public.payment_invoices.buyer_email is
  'Buyer address collected on /pay. Required by the app for a new invoice. Subscriptions match on this email plus sku.';

comment on column public.payment_invoices.billing_period_days is
  'Set for a subscription SKU (30). Null means confirm records a sale and does not open a subscription.';

-- One transaction: sale + subscription + invoice. A second call for the same
-- invoice or the same tx hash returns the existing ids and does not extend
-- the period again.
create or replace function public.fulfill_paid_invoice(
  p_invoice_id uuid,
  p_tx_hash text,
  p_paid_at timestamptz,
  p_confirmed_by uuid,
  p_referral_code text default null,
  p_partner_id text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_inv public.payment_invoices%rowtype;
  v_hash text := nullif(btrim(coalesce(p_tx_hash, '')), '');
  v_email text;
  v_code text;
  v_partner text;
  v_sub public.subscriptions%rowtype;
  v_has_sub boolean := false;
  v_sale uuid;
  v_sale_row public.sales%rowtype;
  v_until timestamptz;
  v_status text;
  v_sub_id uuid;
begin
  if p_invoice_id is null or v_hash is null or p_paid_at is null or p_confirmed_by is null then
    raise exception using
      errcode = 'check_violation',
      message = 'invoice, transaction hash, paid time and confirmer are required';
  end if;

  if char_length(v_hash) < 8 or char_length(v_hash) > 128 then
    raise exception using
      errcode = 'check_violation',
      message = 'transaction hash length is not valid';
  end if;

  select * into v_inv
    from public.payment_invoices
   where id = p_invoice_id
   for update;

  if not found then
    raise exception using
      errcode = 'no_data_found',
      message = 'invoice was not found';
  end if;

  if v_inv.status = 'cancelled' then
    raise exception using
      errcode = 'check_violation',
      message = 'this invoice was cancelled';
  end if;

  if exists (
    select 1
      from public.payment_invoices other
     where other.tx_hash = v_hash
       and other.id <> v_inv.id
  ) then
    raise exception using
      errcode = 'unique_violation',
      message = 'this transaction hash is already matched to another invoice';
  end if;

  -- Already confirmed: do not open another sale or another subscription,
  -- and do not add another 30 days.
  if v_inv.status = 'confirmed' then
    if v_inv.tx_hash is not null and v_inv.tx_hash is distinct from v_hash then
      raise exception using
        errcode = 'check_violation',
        message = 'this invoice is already matched to a different transaction';
    end if;
    if v_inv.tx_hash is null then
      update public.payment_invoices
         set tx_hash = v_hash
       where id = v_inv.id;
    end if;
    return jsonb_build_object(
      'sale_id', v_inv.sale_id,
      'subscription_id', v_inv.subscription_id,
      'idempotent', true
    );
  end if;

  v_email := lower(nullif(btrim(coalesce(v_inv.buyer_email, '')), ''));

  if v_inv.billing_period_days is not null then
    if v_email is null then
      raise exception using
        errcode = 'check_violation',
        message = 'buyer email is required for a subscription';
    end if;

    select * into v_sub
      from public.subscriptions s
     where s.email = v_email
       and s.sku = v_inv.sku_id
     for update;

    v_has_sub := found;
  end if;

  if v_has_sub then
    -- Frozen on the first payment. A later cookie or a typed override
    -- must not move the renewal to a different partner.
    v_code := v_sub.referral_code;
    v_partner := v_sub.partner_id;
  else
    v_code := lower(nullif(btrim(coalesce(p_referral_code, v_inv.referral_code, '')), ''));
    v_partner := nullif(btrim(coalesce(p_partner_id, '')), '');
  end if;

  v_sale := public.record_sale(
    'treasury',
    v_inv.public_ref,
    v_inv.product_ref,
    v_inv.expected_amount,
    v_inv.ledger_currency,
    p_paid_at,
    v_code,
    v_partner
  );

  perform public.qualify_sale(v_sale);
  perform public.post_commission_entries(v_sale);

  v_sub_id := case when v_has_sub then v_sub.id else null end;

  if v_inv.billing_period_days is not null then
    if v_has_sub then
      v_until := greatest(coalesce(v_sub.active_until, p_paid_at), p_paid_at)
        + make_interval(days => v_inv.billing_period_days);
      v_status := case
        when v_sub.status in ('cancelled', 'past_due', 'pending') then 'onboarding'
        else v_sub.status
      end;
      update public.subscriptions
         set active_until = v_until,
             status = v_status
       where id = v_sub.id
       returning id into v_sub_id;
    else
      select * into v_sale_row
        from public.sales s
       where s.id = v_sale;

      v_until := p_paid_at + make_interval(days => v_inv.billing_period_days);
      insert into public.subscriptions (
        email, sku, product, status, active_until, cancel_at_period_end,
        referral_code, partner_id
      )
      values (
        v_email,
        v_inv.sku_id,
        v_inv.product_ref,
        'onboarding',
        v_until,
        false,
        v_sale_row.referral_code,
        v_sale_row.partner_id
      )
      returning id into v_sub_id;
    end if;
  end if;

  update public.payment_invoices
     set status = 'confirmed',
         tx_hash = v_hash,
         sale_id = v_sale,
         subscription_id = v_sub_id,
         confirmed_by = p_confirmed_by,
         confirmed_at = now()
   where id = v_inv.id
     and status = 'awaiting';

  return jsonb_build_object(
    'sale_id', v_sale,
    'subscription_id', v_sub_id,
    'idempotent', false
  );
end;
$$;

comment on function public.fulfill_paid_invoice(uuid, text, timestamptz, uuid, text, text) is
  'Confirms a treasury invoice once. Renewals extend the subscription by billing_period_days and post commission with the frozen referral code. A repeat of the same invoice or tx hash does not create a second sale or subscription.';

revoke all on function public.fulfill_paid_invoice(uuid, text, timestamptz, uuid, text, text) from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on function public.fulfill_paid_invoice(uuid, text, timestamptz, uuid, text, text) from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on function public.fulfill_paid_invoice(uuid, text, timestamptz, uuid, text, text) from authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.fulfill_paid_invoice(uuid, text, timestamptz, uuid, text, text) to service_role';
  end if;

  execute 'revoke all on table public.subscriptions from public';

  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on table public.subscriptions from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on table public.subscriptions from authenticated';
    execute 'grant select on table public.subscriptions to authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant select, insert, update, delete on table public.subscriptions to service_role';
  end if;
end
$$;
