-- Partner launch bonus schedules (owner-approved 2026-10-01)
--
-- Launch bonus until 2026-12-31: months 1–3 of a client → L1 50 / L2 15 / L3 7 / L4 5 / L5 3 (80% pool).
-- From client month 4+: renewals → L1 20% + L2 5% (25% pool).
-- Standard from 2027-01-01 (shown now): months 1–3 → L1 35 / L2 10 / L3 5 (50% pool); renewals unchanged.
--
-- Builds on 20260927170000_partner_commission_model_v2.sql (flat 80% grid). v2 rules are closed;
-- historical commission_entries are not rewritten.

alter table public.commission_rules
  add column if not exists schedule_phase text;

comment on column public.commission_rules.schedule_phase is
  'launch_initial | standard_initial | renewal. Null on pre-v3 historical rows.';

alter table public.commission_rules
  drop constraint if exists commission_rules_version_unique;

alter table public.commission_rules
  add constraint commission_rules_version_unique
  unique (level, active_from, schedule_phase);

alter table public.commission_rules
  drop constraint if exists commission_rules_schedule_phase_valid;

alter table public.commission_rules
  add constraint commission_rules_schedule_phase_valid check (
    schedule_phase is null
    or schedule_phase in ('launch_initial', 'standard_initial', 'renewal')
  );

-- Close the flat v2 grid (no schedule_phase).
update public.commission_rules
   set active_to = timestamptz '2026-10-01 00:00:00+00'
 where active_to is null
   and schedule_phase is null
   and active_from = timestamptz '2026-09-27 00:00:00+00';

insert into public.commission_rules (level, base_rate, launch_multiplier, active_from, schedule_phase)
values
  (1, 0.50::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'launch_initial'),
  (2, 0.15::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'launch_initial'),
  (3, 0.07::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'launch_initial'),
  (4, 0.05::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'launch_initial'),
  (5, 0.03::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'launch_initial'),
  (1, 0.35::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'standard_initial'),
  (2, 0.10::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'standard_initial'),
  (3, 0.05::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'standard_initial'),
  (4, 0.00::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'standard_initial'),
  (5, 0.00::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'standard_initial'),
  (1, 0.20::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'renewal'),
  (2, 0.05::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'renewal'),
  (3, 0.00::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'renewal'),
  (4, 0.00::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'renewal'),
  (5, 0.00::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-10-01 00:00:00+00', 'renewal');

create or replace function public.partner_pool_cap_for_phase(p_phase text)
returns numeric
language sql
immutable
parallel safe
as $$
  select case p_phase
    when 'launch_initial' then 0.80::numeric(12, 6)
    when 'standard_initial' then 0.50::numeric(12, 6)
    when 'renewal' then 0.25::numeric(12, 6)
    else public.partner_pool_cap()
  end;
$$;

comment on function public.partner_pool_cap_for_phase(text) is
  'Aggregate partner pool cap for a schedule phase (launch 80%, standard initial 50%, renewal 25%).';

revoke all on function public.partner_pool_cap_for_phase(text) from public;
grant execute on function public.partner_pool_cap_for_phase(text) to authenticated, service_role;

create or replace function public.resolve_commission_schedule_phase(
  p_paid_at timestamptz,
  p_client_payment_index integer
)
returns text
language plpgsql
immutable
as $$
begin
  if p_client_payment_index is null or p_client_payment_index < 1 then
    raise exception using
      errcode = 'check_violation',
      message = 'client payment index must be a positive integer';
  end if;

  if p_client_payment_index >= 4 then
    return 'renewal';
  end if;

  if p_paid_at >= timestamptz '2027-01-01 00:00:00+00' then
    return 'standard_initial';
  end if;

  return 'launch_initial';
end;
$$;

revoke all on function public.resolve_commission_schedule_phase(timestamptz, integer) from public;
grant execute on function public.resolve_commission_schedule_phase(timestamptz, integer) to authenticated, service_role;

create or replace function public.commission_rules_v2_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_sum numeric(12, 6);
  v_phase text := new.schedule_phase;
begin
  if new.launch_multiplier is distinct from 1::numeric then
    raise exception using
      errcode = 'check_violation',
      message = 'commission rules cannot store a launch multiplier other than 1';
  end if;

  if new.base_rate < 0 or new.base_rate > 1 then
    raise exception using
      errcode = 'check_violation',
      message = 'commission base_rate must be between 0 and 1';
  end if;

  if v_phase is null then
    return new;
  end if;

  select coalesce(sum(r.base_rate), 0)
    into v_sum
    from (
      select level, base_rate
        from public.commission_rules
       where active_from = new.active_from
         and schedule_phase = v_phase
         and level is distinct from new.level
      union all
      select new.level, new.base_rate
    ) r;

  if v_sum > public.partner_pool_cap_for_phase(v_phase) then
    raise exception using
      errcode = 'check_violation',
      message = 'active rule set would exceed the partner pool cap for this schedule phase';
  end if;

  return new;
end;
$$;

create or replace function public.post_commission_entries(
  p_sale_id uuid,
  p_client_payment_index integer default 1
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sale public.sales%rowtype;
  v_seller text;
  v_row record;
  v_base numeric(12, 6);
  v_rate numeric(12, 6);
  v_status text;
  v_type text;
  v_count integer;
  v_rate_sum numeric(12, 6) := 0;
  v_pool numeric(20, 2);
  v_cap numeric(20, 2);
  v_phase text;
begin
  if p_sale_id is null then
    raise exception using
      errcode = 'check_violation',
      message = 'sale id is required';
  end if;

  select * into v_sale
    from public.sales s
   where s.id = p_sale_id
   for update;

  if not found then
    raise exception using
      errcode = 'no_data_found',
      message = 'sale not found';
  end if;

  if v_sale.status not in ('confirmed', 'locked') then
    raise exception using
      errcode = 'check_violation',
      message = 'commissions post only for a qualifying sale';
  end if;

  if exists (
    select 1 from public.commission_entries e
     where e.sale_id = p_sale_id
       and e.commission_type in ('base', 'launch', 'initial', 'renewal')
  ) then
    select count(*) into v_count
      from public.commission_entries e
     where e.sale_id = p_sale_id
       and e.commission_type in ('base', 'launch', 'initial', 'renewal');
    return v_count;
  end if;

  v_seller := v_sale.partner_id;

  if not exists (
    select 1 from public.partner_profiles pp where pp.partner_id = v_seller
  ) then
    raise exception using
      errcode = 'no_data_found',
      message = 'attributed partner has no profile';
  end if;

  v_phase := public.resolve_commission_schedule_phase(v_sale.paid_at, p_client_payment_index);
  v_type := case
    when v_phase = 'renewal' then 'renewal'
    else 'initial'
  end;
  v_status := case when v_sale.status = 'locked' then 'payable' else 'confirmed' end;

  for v_row in
    with recursive chain as (
      select
        1 as lvl,
        v_seller as partner_id,
        array[v_seller]::text[] as seen
      union all
      select
        c.lvl + 1,
        r.sponsor_partner_id,
        c.seen || r.sponsor_partner_id
      from chain c
      join public.partner_relationships r on r.partner_id = c.partner_id
      where c.lvl < 5
        and not (r.sponsor_partner_id = any (c.seen))
    )
    select c.lvl, c.partner_id, pp.status as partner_status
      from chain c
      join public.partner_profiles pp on pp.partner_id = c.partner_id
     order by c.lvl
  loop
    if v_row.partner_status = 'suspended' then
      continue;
    end if;

    select r.base_rate
      into v_base
      from public.commission_rules r
     where r.level = v_row.lvl
       and r.schedule_phase = v_phase
       and r.active_from <= v_sale.paid_at
       and (r.active_to is null or r.active_to > v_sale.paid_at)
     order by r.active_from desc
     limit 1;

    if v_base is null or v_base = 0 then
      continue;
    end if;

    v_rate := v_base;
    v_rate_sum := v_rate_sum + v_rate;

    if v_rate_sum > public.partner_pool_cap_for_phase(v_phase) then
      raise exception using
        errcode = 'check_violation',
        message = 'partner pool exceeds cap for schedule phase';
    end if;

    insert into public.commission_entries (
      sale_id, beneficiary_partner_id, level, commission_type,
      base_amount, rate, amount, currency, status
    )
    values (
      v_sale.id,
      v_row.partner_id,
      v_row.lvl,
      v_type,
      v_sale.amount,
      v_rate,
      round(v_sale.amount * v_rate, 2),
      v_sale.currency,
      v_status
    )
    on conflict (sale_id, beneficiary_partner_id, level, commission_type)
    do nothing;
  end loop;

  select coalesce(sum(e.amount), 0)
    into v_pool
    from public.commission_entries e
   where e.sale_id = p_sale_id
     and e.commission_type in ('base', 'launch', 'initial', 'renewal');

  v_cap := round(v_sale.amount * public.partner_pool_cap_for_phase(v_phase), 2);

  if v_pool > v_cap then
    raise exception using
      errcode = 'check_violation',
      message = 'partner pool exceeds cap for schedule phase';
  end if;

  select count(*) into v_count
    from public.commission_entries e
   where e.sale_id = p_sale_id
     and e.commission_type in ('base', 'launch', 'initial', 'renewal');

  if v_count = 0 then
    raise exception using
      errcode = 'check_violation',
      message = 'no commission entries were posted';
  end if;

  return v_count;
end;
$$;

comment on function public.post_commission_entries(uuid, integer) is
  'Posts L1–L5 from commission_rules for launch initial, standard initial, or renewal phase. Client month index defaults to 1.';

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
  v_payment_index integer := 1;
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

    if v_has_sub then
      select count(*)::integer + 1
        into v_payment_index
        from public.sales s
        join public.payment_invoices pi on pi.sale_id = s.id
       where pi.subscription_id = v_sub.id
         and s.status in ('confirmed', 'locked');
    end if;
  end if;

  if v_has_sub then
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
  perform public.post_commission_entries(v_sale, v_payment_index);

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
