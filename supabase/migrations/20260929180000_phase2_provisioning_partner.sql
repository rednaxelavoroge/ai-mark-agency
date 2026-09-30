-- Phase 2: product tenant provisioning, partner agreement, payout requests.

-- ------------------------------------------------------------------- agreement
alter table public.partner_profiles
  add column if not exists agreement_accepted_at timestamptz,
  add column if not exists agreement_version text;

comment on column public.partner_profiles.agreement_accepted_at is
  'When the partner accepted the published partner agreement.';
comment on column public.partner_profiles.agreement_version is
  'Slug of the agreement text accepted at signup (e.g. 2026-09-29-v1).';

-- ----------------------------------------------------------- subscriptions
alter table public.subscriptions
  add column if not exists product_tenant_id text,
  add column if not exists provisioning_status text not null default 'pending',
  add column if not exists provisioning_error text,
  add column if not exists provisioning_attempts integer not null default 0,
  add column if not exists provisioning_next_retry_at timestamptz,
  add column if not exists product_access_suspended boolean not null default false,
  add column if not exists last_provisioned_invoice_ref text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'subscriptions_provisioning_status_valid'
  ) then
    alter table public.subscriptions
      add constraint subscriptions_provisioning_status_valid check (
        provisioning_status in (
          'pending', 'provisioning', 'active', 'manual', 'failed', 'not_applicable'
        )
      );
  end if;
end
$$;

comment on column public.subscriptions.product_tenant_id is
  'Tenant id returned by the product provisioning API.';
comment on column public.subscriptions.provisioning_status is
  'pending: awaiting worker; active: tenant live; manual: operator queue; failed: retries exhausted.';
comment on column public.subscriptions.product_access_suspended is
  'True when the product tenant was suspended for expiry; cleared on renewal resume.';

create index if not exists subscriptions_provisioning_retry_idx
  on public.subscriptions (provisioning_next_retry_at)
  where provisioning_status in ('pending', 'failed', 'provisioning');

-- Idempotent provisioning ledger (one row per invoice ref + action).
create table if not exists public.subscription_provisioning_log (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions (id) on delete restrict,
  invoice_ref text not null,
  action text not null,
  status text not null default 'pending',
  idempotency_key text not null,
  response_snapshot jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscription_provisioning_log_action_valid check (
    action in ('create', 'magic_link', 'suspend', 'resume')
  ),
  constraint subscription_provisioning_log_status_valid check (
    status in ('pending', 'succeeded', 'failed', 'skipped')
  ),
  constraint subscription_provisioning_log_idempotency_uq unique (idempotency_key)
);

create index if not exists subscription_provisioning_log_sub_idx
  on public.subscription_provisioning_log (subscription_id, created_at desc);

drop trigger if exists subscription_provisioning_log_set_updated_at
  on public.subscription_provisioning_log;
create trigger subscription_provisioning_log_set_updated_at
before update on public.subscription_provisioning_log
for each row execute function public.set_updated_at();

alter table public.subscription_provisioning_log enable row level security;

drop policy if exists subscription_provisioning_log_admin
  on public.subscription_provisioning_log;
create policy subscription_provisioning_log_admin
  on public.subscription_provisioning_log for select to authenticated
  using (public.is_admin());

-- Manual activation queue (admin).
create table if not exists public.provisioning_manual_queue (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions (id) on delete restrict,
  invoice_ref text,
  reason text not null,
  resolved_at timestamptz,
  resolved_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint provisioning_manual_queue_reason_len check (
    char_length(reason) between 1 and 500
  )
);

create index if not exists provisioning_manual_queue_open_idx
  on public.provisioning_manual_queue (created_at desc)
  where resolved_at is null;

alter table public.provisioning_manual_queue enable row level security;

drop policy if exists provisioning_manual_queue_admin on public.provisioning_manual_queue;
create policy provisioning_manual_queue_admin
  on public.provisioning_manual_queue for select to authenticated
  using (public.is_admin());

-- Partner-initiated payout request guard (one open payout per partner).
create or replace function public.request_partner_payout(
  p_currency text,
  p_requested_by uuid
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_partner text;
  v_payable numeric;
  v_min numeric := 50;
  v_open uuid;
  v_payout uuid;
  v_recipient text;
  v_details text;
begin
  if p_currency is null or p_requested_by is null then
    raise exception using
      errcode = 'check_violation',
      message = 'currency and requester are required';
  end if;

  if p_currency !~ '^[A-Z]{3}$' then
    raise exception using
      errcode = 'check_violation',
      message = 'currency must be a 3-letter code';
  end if;

  select public.current_partner_id() into v_partner;
  if v_partner is null then
    raise exception using
      errcode = 'check_violation',
      message = 'only a partner can request a payout';
  end if;

  if not exists (
    select 1 from public.partner_profiles pp
     where pp.partner_id = v_partner
       and pp.user_id = p_requested_by
  ) then
    raise exception using
      errcode = 'check_violation',
      message = 'requester does not match the partner session';
  end if;

  select p.payout_recipient, p.payout_details
    into v_recipient, v_details
    from public.profiles p
    join public.partner_profiles pp on pp.user_id = p.id
   where pp.partner_id = v_partner;

  if v_recipient is null or btrim(v_recipient) = ''
     or v_details is null or btrim(v_details) = '' then
    raise exception using
      errcode = 'check_violation',
      message = 'save payout destination on your profile before requesting';
  end if;

  select coalesce(sum(ce.amount), 0)
    into v_payable
    from public.commission_entries ce
   where ce.beneficiary_partner_id = v_partner
     and ce.currency = p_currency
     and ce.status = 'payable';

  if v_payable < v_min then
    raise exception using
      errcode = 'check_violation',
      message = 'payable balance is below the minimum payout threshold';
  end if;

  select p.id into v_open
    from public.payouts p
   where p.partner_id = v_partner
     and p.status = 'open'
   limit 1;

  if v_open is not null then
    raise exception using
      errcode = 'check_violation',
      message = 'you already have an open payout request';
  end if;

  v_payout := public.create_payout(v_partner, p_currency, p_requested_by);
  return v_payout;
end;
$$;

comment on function public.request_partner_payout(text, uuid) is
  'Partner opens a payout from payable commission entries. Refuses when balance < $50, destination missing, or an open payout exists.';

revoke all on function public.request_partner_payout(text, uuid) from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'grant execute on function public.request_partner_payout(text, uuid) to authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.request_partner_payout(text, uuid) to service_role';
  end if;
end
$$;

revoke all on table public.subscription_provisioning_log from public;
revoke all on table public.provisioning_manual_queue from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant select, insert, update, delete on table public.subscription_provisioning_log to service_role';
    execute 'grant select, insert, update, delete on table public.provisioning_manual_queue to service_role';
  end if;
end
$$;
