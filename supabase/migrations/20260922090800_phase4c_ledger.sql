-- Phase 4C · Ledger
-- Qualifying sales, commission entries and payouts.
--
-- Contract: docs/phase-4c-contract.md (APPROVED).
--
-- This file does not alter Phase 4A/4B tables, partner_relationships,
-- attribute_partner_signup, or the referral attribution rules.
-- referral_clicks and leads are not sales and are not read here.
--
-- Launch eligibility uses partner_profiles.created_at. There is no
-- activation column on partner_profiles; none is added.
-- The 90-day window is the attributed partner's (L1) created_at, compared
-- with sales.paid_at, and it applies to every level of that sale.
--
-- Money is numeric. Commission currency is the sale currency. No FX.

-- ----------------------------------------------------------------- sales

create table public.sales (
  id uuid primary key default gen_random_uuid(),
  external_order_id text not null,
  source text not null,
  product_ref text,
  partner_id text not null
    references public.partner_profiles (partner_id) on delete restrict,
  referral_code text,
  amount numeric(20, 2) not null,
  currency text not null,
  status text not null default 'recorded',
  paid_at timestamptz not null,
  confirmed_at timestamptz,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sales_source_order_unique unique (source, external_order_id),
  constraint sales_source_len check (char_length(source) between 1 and 64),
  constraint sales_external_order_len check (
    char_length(external_order_id) between 1 and 200
  ),
  constraint sales_product_ref_len check (
    product_ref is null or char_length(product_ref) between 1 and 200
  ),
  constraint sales_referral_code_format check (
    referral_code is null or referral_code ~ '^[a-z0-9][a-z0-9_-]{3,31}$'
  ),
  constraint sales_amount_positive check (amount > 0),
  constraint sales_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint sales_status_valid check (
    status in (
      'recorded', 'confirmed', 'locked', 'refunded', 'chargeback', 'cancelled'
    )
  ),
  constraint sales_lock_after_confirm check (
    locked_at is null or confirmed_at is not null
  )
);

create index sales_partner_idx on public.sales (partner_id, created_at desc);
create index sales_status_idx on public.sales (status);

comment on table public.sales is
  'One row per paid external order. Clicks and leads are not sales. Written by service_role RPCs only.';

drop trigger if exists sales_set_updated_at on public.sales;
create trigger sales_set_updated_at
before update on public.sales
for each row execute function public.set_updated_at();

create or replace function public.sales_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception using
      errcode = 'restrict_violation',
      message = 'sales are not deleted';
  end if;

  if tg_op = 'UPDATE' then
    if new.source is distinct from old.source
       or new.external_order_id is distinct from old.external_order_id
       or new.partner_id is distinct from old.partner_id
       or new.referral_code is distinct from old.referral_code
       or new.amount is distinct from old.amount
       or new.currency is distinct from old.currency
       or new.paid_at is distinct from old.paid_at
       or new.product_ref is distinct from old.product_ref
       or new.created_at is distinct from old.created_at
       or new.id is distinct from old.id then
      raise exception using
        errcode = 'restrict_violation',
        message = 'sale identity, amount and currency are immutable';
    end if;

    if old.confirmed_at is not null
       and new.confirmed_at is distinct from old.confirmed_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'sales.confirmed_at is immutable once set';
    end if;

    if old.locked_at is not null and new.locked_at is distinct from old.locked_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'sales.locked_at is immutable once set';
    end if;

    if old.status = 'recorded'
       and new.status not in ('recorded', 'confirmed', 'cancelled') then
      raise exception using
        errcode = 'check_violation',
        message = 'a recorded sale can only be confirmed or cancelled';
    end if;

    if old.status = 'confirmed'
       and new.status not in ('confirmed', 'locked', 'refunded', 'chargeback', 'cancelled') then
      raise exception using
        errcode = 'check_violation',
        message = 'a confirmed sale cannot move backwards';
    end if;

    if old.status = 'locked'
       and new.status not in ('locked', 'refunded', 'chargeback', 'cancelled') then
      raise exception using
        errcode = 'check_violation',
        message = 'a locked sale cannot move backwards';
    end if;

    if old.status in ('refunded', 'chargeback', 'cancelled')
       and new.status is distinct from old.status then
      raise exception using
        errcode = 'restrict_violation',
        message = 'a reversed sale status is immutable';
    end if;
  end if;

  if new.status = 'confirmed' and new.confirmed_at is null then
    raise exception using
      errcode = 'check_violation',
      message = 'confirmed sales require confirmed_at';
  end if;

  if new.status = 'locked'
     and (new.confirmed_at is null or new.locked_at is null) then
    raise exception using
      errcode = 'check_violation',
      message = 'locked sales require confirmed_at and locked_at';
  end if;

  return new;
end;
$$;

drop trigger if exists sales_guard on public.sales;
create trigger sales_guard
before insert or update or delete on public.sales
for each row execute function public.sales_guard();

-- --------------------------------------------------------- commission_rules

create table public.commission_rules (
  id uuid primary key default gen_random_uuid(),
  level smallint not null,
  base_rate numeric(12, 6) not null,
  launch_multiplier numeric(12, 6) not null,
  active_from timestamptz not null,
  active_to timestamptz,
  created_at timestamptz not null default now(),
  constraint commission_rules_level_valid check (level between 1 and 5),
  constraint commission_rules_base_rate_valid check (
    base_rate >= 0 and base_rate <= 1
  ),
  constraint commission_rules_launch_multiplier_valid check (
    launch_multiplier >= 1
  ),
  constraint commission_rules_window_valid check (
    active_to is null or active_to > active_from
  ),
  constraint commission_rules_version_unique unique (level, active_from)
);

comment on table public.commission_rules is
  'Affiliate schedule only. Country Partner and Strategic Partner are not seeded here.';

insert into public.commission_rules (level, base_rate, launch_multiplier, active_from)
values
  (1, 0.15::numeric(12, 6), 1.5::numeric(12, 6), timestamptz '2020-01-01 00:00:00+00'),
  (2, 0.05::numeric(12, 6), 1.5::numeric(12, 6), timestamptz '2020-01-01 00:00:00+00'),
  (3, 0.03::numeric(12, 6), 1.5::numeric(12, 6), timestamptz '2020-01-01 00:00:00+00'),
  (4, 0.02::numeric(12, 6), 1.5::numeric(12, 6), timestamptz '2020-01-01 00:00:00+00'),
  (5, 0.01::numeric(12, 6), 1.5::numeric(12, 6), timestamptz '2020-01-01 00:00:00+00');

-- ------------------------------------------------------- commission_entries

create table public.commission_entries (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales (id) on delete restrict,
  beneficiary_partner_id text not null
    references public.partner_profiles (partner_id) on delete restrict,
  level smallint not null,
  commission_type text not null,
  base_amount numeric(20, 2) not null,
  rate numeric(12, 6) not null,
  amount numeric(20, 2) not null,
  currency text not null,
  status text not null,
  reverses_entry_id uuid references public.commission_entries (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz,
  constraint commission_entries_idempotency unique (
    sale_id, beneficiary_partner_id, level, commission_type
  ),
  constraint commission_entries_level_valid check (level between 1 and 5),
  constraint commission_entries_type_valid check (
    commission_type in ('base', 'launch', 'reversal')
  ),
  constraint commission_entries_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint commission_entries_status_valid check (
    status in ('confirmed', 'payable', 'paid')
  ),
  constraint commission_entries_linkage check (
    (
      commission_type = 'reversal'
      and reverses_entry_id is not null
      and amount < 0
      and amount = -round(base_amount * rate, 2)
    )
    or (
      commission_type in ('base', 'launch')
      and reverses_entry_id is null
      and amount > 0
      and amount = round(base_amount * rate, 2)
    )
  )
);

create unique index commission_entries_one_reversal
  on public.commission_entries (reverses_entry_id)
  where reverses_entry_id is not null;

create index commission_entries_beneficiary_idx
  on public.commission_entries (beneficiary_partner_id, status);
create index commission_entries_sale_idx
  on public.commission_entries (sale_id);

comment on table public.commission_entries is
  'Append-only commission ledger. A refund or chargeback inserts a reversal; it does not rewrite the original amount.';

drop trigger if exists commission_entries_set_updated_at on public.commission_entries;
create trigger commission_entries_set_updated_at
before update on public.commission_entries
for each row execute function public.set_updated_at();

create or replace function public.commission_entries_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception using
      errcode = 'restrict_violation',
      message = 'commission entries are not deleted';
  end if;

  if tg_op = 'UPDATE' then
    if new.sale_id is distinct from old.sale_id
       or new.beneficiary_partner_id is distinct from old.beneficiary_partner_id
       or new.level is distinct from old.level
       or new.commission_type is distinct from old.commission_type
       or new.base_amount is distinct from old.base_amount
       or new.rate is distinct from old.rate
       or new.amount is distinct from old.amount
       or new.currency is distinct from old.currency
       or new.reverses_entry_id is distinct from old.reverses_entry_id
       or new.id is distinct from old.id
       or new.created_at is distinct from old.created_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'commission entry amounts are immutable; only status may advance';
    end if;

    if old.status = 'paid' and new.status is distinct from 'paid' then
      raise exception using
        errcode = 'restrict_violation',
        message = 'a paid commission entry cannot change status';
    end if;

    if old.status = 'payable' and new.status not in ('payable', 'paid') then
      raise exception using
        errcode = 'check_violation',
        message = 'a payable commission entry can only be paid';
    end if;

    if old.status = 'confirmed' and new.status not in ('confirmed', 'payable') then
      raise exception using
        errcode = 'check_violation',
        message = 'a confirmed commission entry can only become payable';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists commission_entries_guard on public.commission_entries;
create trigger commission_entries_guard
before insert or update or delete on public.commission_entries
for each row execute function public.commission_entries_guard();

-- ------------------------------------------------------------------- payouts

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null
    references public.partner_profiles (partner_id) on delete restrict,
  status text not null default 'open',
  currency text not null,
  amount numeric(20, 2) not null,
  created_by uuid not null references auth.users (id),
  confirmed_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmed_at timestamptz,
  paid_at timestamptz,
  constraint payouts_status_valid check (status in ('open', 'paid', 'void')),
  constraint payouts_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint payouts_paid_fields check (
    status <> 'paid' or (confirmed_by is not null and confirmed_at is not null and paid_at is not null)
  )
);

create index payouts_partner_idx on public.payouts (partner_id, created_at desc);

drop trigger if exists payouts_set_updated_at on public.payouts;
create trigger payouts_set_updated_at
before update on public.payouts
for each row execute function public.set_updated_at();

create or replace function public.payouts_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception using
      errcode = 'restrict_violation',
      message = 'payouts are not deleted';
  end if;

  if tg_op = 'UPDATE' then
    if new.partner_id is distinct from old.partner_id
       or new.currency is distinct from old.currency
       or new.created_by is distinct from old.created_by
       or new.id is distinct from old.id
       or new.created_at is distinct from old.created_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'payout identity is immutable';
    end if;

    if old.status <> 'open' and new.amount is distinct from old.amount then
      raise exception using
        errcode = 'restrict_violation',
        message = 'payout amount is immutable once the payout leaves open';
    end if;

    if old.status = 'paid' and new.status is distinct from 'paid' then
      raise exception using
        errcode = 'restrict_violation',
        message = 'a paid payout cannot change status';
    end if;

    if old.status = 'void' and new.status is distinct from 'void' then
      raise exception using
        errcode = 'restrict_violation',
        message = 'a void payout cannot change status';
    end if;

    if old.status = 'open' and new.status not in ('open', 'paid', 'void') then
      raise exception using
        errcode = 'check_violation',
        message = 'an open payout can only be paid or voided';
    end if;

    if old.confirmed_by is not null and new.confirmed_by is distinct from old.confirmed_by then
      raise exception using
        errcode = 'restrict_violation',
        message = 'payouts.confirmed_by is immutable once set';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists payouts_guard on public.payouts;
create trigger payouts_guard
before insert or update or delete on public.payouts
for each row execute function public.payouts_guard();

-- --------------------------------------------------------- payout_allocations

create table public.payout_allocations (
  id uuid primary key default gen_random_uuid(),
  payout_id uuid not null references public.payouts (id) on delete restrict,
  commission_entry_id uuid not null
    references public.commission_entries (id) on delete restrict,
  allocated_amount numeric(20, 2) not null,
  created_at timestamptz not null default now(),
  constraint payout_allocations_entry_once_per_payout unique (payout_id, commission_entry_id)
);

create index payout_allocations_entry_idx
  on public.payout_allocations (commission_entry_id);

create or replace function public.payout_allocations_one_active()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_amount numeric(20, 2);
  v_status text;
begin
  select e.amount, e.status into v_amount, v_status
    from public.commission_entries e
   where e.id = new.commission_entry_id;

  if v_status is distinct from 'payable' then
    raise exception using
      errcode = 'check_violation',
      message = 'only a payable commission entry can be allocated';
  end if;

  if new.allocated_amount is distinct from v_amount then
    raise exception using
      errcode = 'check_violation',
      message = 'allocated_amount must equal the commission entry amount';
  end if;

  if exists (
    select 1
      from public.payout_allocations a
      join public.payouts p on p.id = a.payout_id
     where a.commission_entry_id = new.commission_entry_id
       and p.status <> 'void'
       and a.id is distinct from new.id
  ) then
    raise exception using
      errcode = 'unique_violation',
      message = 'commission entry is already in an active payout';
  end if;

  return new;
end;
$$;

drop trigger if exists payout_allocations_one_active on public.payout_allocations;
create trigger payout_allocations_one_active
before insert or update on public.payout_allocations
for each row execute function public.payout_allocations_one_active();

-- --------------------------------------------------------------------- RPCs

create or replace function public.record_sale(
  p_source text,
  p_external_order_id text,
  p_product_ref text,
  p_amount numeric,
  p_currency text,
  p_paid_at timestamptz,
  p_referral_code text default null,
  p_partner_id text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_source text := nullif(btrim(coalesce(p_source, '')), '');
  v_order text := nullif(btrim(coalesce(p_external_order_id, '')), '');
  v_product text := nullif(btrim(coalesce(p_product_ref, '')), '');
  v_currency text := upper(btrim(coalesce(p_currency, '')));
  v_code text := lower(nullif(btrim(coalesce(p_referral_code, '')), ''));
  v_partner text := nullif(btrim(coalesce(p_partner_id, '')), '');
  v_from_code text;
  v_existing public.sales%rowtype;
  v_id uuid;
begin
  if v_source is null or v_order is null then
    raise exception using
      errcode = 'check_violation',
      message = 'source and external_order_id are required';
  end if;

  if p_amount is null or p_amount <= 0 then
    raise exception using
      errcode = 'check_violation',
      message = 'a cancelled or unsuccessful payment is not a sale';
  end if;

  if v_currency !~ '^[A-Z]{3}$' then
    raise exception using
      errcode = 'check_violation',
      message = 'currency must be a 3-letter ISO code';
  end if;

  if p_paid_at is null then
    raise exception using
      errcode = 'check_violation',
      message = 'a sale requires the time the customer actually paid';
  end if;

  if v_code is not null then
    if v_code !~ '^[a-z0-9][a-z0-9_-]{3,31}$' then
      raise exception using
        errcode = 'check_violation',
        message = 'referral code is malformed';
    end if;

    select pp.partner_id into v_from_code
      from public.partner_profiles pp
     where pp.referral_code = v_code;

    if v_from_code is null then
      raise exception using
        errcode = 'foreign_key_violation',
        message = 'referral code does not resolve to a partner';
    end if;
  end if;

  if v_partner is not null and not exists (
    select 1 from public.partner_profiles pp where pp.partner_id = v_partner
  ) then
    raise exception using
      errcode = 'foreign_key_violation',
      message = 'partner_id does not resolve to a partner';
  end if;

  if v_from_code is not null and v_partner is not null and v_from_code <> v_partner then
    raise exception using
      errcode = 'check_violation',
      message = 'referral code and partner_id disagree';
  end if;

  v_partner := coalesce(v_from_code, v_partner);

  if v_partner is null then
    raise exception using
      errcode = 'check_violation',
      message = 'attribution requires a referral code or partner id';
  end if;

  if exists (
    select 1 from public.partner_profiles pp
     where pp.partner_id = v_partner and pp.status = 'suspended'
  ) then
    raise exception using
      errcode = 'check_violation',
      message = 'a suspended partner cannot be attributed a sale';
  end if;

  select * into v_existing
    from public.sales s
   where s.source = v_source
     and s.external_order_id = v_order;

  if found then
    if v_existing.amount is distinct from p_amount
       or v_existing.currency is distinct from v_currency
       or v_existing.partner_id is distinct from v_partner then
      raise exception using
        errcode = 'unique_violation',
        message = 'sale key already exists with a different payload';
    end if;
    return v_existing.id;
  end if;

  insert into public.sales (
    source, external_order_id, product_ref, partner_id, referral_code,
    amount, currency, status, paid_at
  )
  values (
    v_source, v_order, v_product, v_partner, v_code,
    p_amount, v_currency, 'recorded', p_paid_at
  )
  returning id into v_id;

  return v_id;
exception
  when unique_violation then
    select s.id into v_id
      from public.sales s
     where s.source = v_source
       and s.external_order_id = v_order
       and s.amount = p_amount
       and s.currency = v_currency
       and s.partner_id = v_partner;
    if v_id is null then
      raise;
    end if;
    return v_id;
end;
$$;

create or replace function public.qualify_sale(p_sale_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sale public.sales%rowtype;
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

  if v_sale.status in ('confirmed', 'locked') then
    return v_sale.id;
  end if;

  if v_sale.status <> 'recorded' then
    raise exception using
      errcode = 'check_violation',
      message = 'sale cannot be qualified';
  end if;

  if v_sale.paid_at is null or v_sale.amount <= 0 then
    raise exception using
      errcode = 'check_violation',
      message = 'an unpaid sale is not qualifying';
  end if;

  update public.sales
     set status = 'confirmed',
         confirmed_at = v_sale.paid_at
   where id = p_sale_id;

  return p_sale_id;
end;
$$;

create or replace function public.post_commission_entries(p_sale_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sale public.sales%rowtype;
  v_seller text;
  v_activated timestamptz;
  v_launch boolean;
  v_row record;
  v_base numeric(12, 6);
  v_multiplier numeric(12, 6);
  v_rate numeric(12, 6);
  v_status text;
  v_type text;
  v_count integer;
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
       and e.commission_type in ('base', 'launch')
  ) then
    select count(*) into v_count
      from public.commission_entries e
     where e.sale_id = p_sale_id
       and e.commission_type in ('base', 'launch');
    return v_count;
  end if;

  v_seller := v_sale.partner_id;

  select pp.created_at into v_activated
    from public.partner_profiles pp
   where pp.partner_id = v_seller;

  if v_activated is null then
    raise exception using
      errcode = 'no_data_found',
      message = 'attributed partner has no activation timestamp';
  end if;

  -- 90 days from partner_profiles.created_at. The boundary instant is base.
  v_launch := v_sale.paid_at < v_activated + interval '90 days';
  v_type := case when v_launch then 'launch' else 'base' end;
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

    select r.base_rate, r.launch_multiplier
      into v_base, v_multiplier
      from public.commission_rules r
     where r.level = v_row.lvl
       and r.active_from <= v_sale.paid_at
       and (r.active_to is null or r.active_to > v_sale.paid_at)
     order by r.active_from desc
     limit 1;

    if v_base is null then
      raise exception using
        errcode = 'check_violation',
        message = 'no active commission rule for this level';
    end if;

    v_rate := v_base * case when v_launch then v_multiplier else 1::numeric end;

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

  select count(*) into v_count
    from public.commission_entries e
   where e.sale_id = p_sale_id
     and e.commission_type in ('base', 'launch');

  if v_count = 0 then
    raise exception using
      errcode = 'check_violation',
      message = 'no commission entries were posted';
  end if;

  return v_count;
end;
$$;

create or replace function public.reverse_sale_commissions(
  p_sale_id uuid,
  p_reason text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sale public.sales%rowtype;
  v_status text;
  v_count integer := 0;
  v_entry record;
  v_reversal_status text;
begin
  if p_reason not in ('refund', 'chargeback', 'cancellation') then
    raise exception using
      errcode = 'check_violation',
      message = 'reversal reason must be refund, chargeback or cancellation';
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

  v_status := case p_reason
    when 'refund' then 'refunded'
    when 'chargeback' then 'chargeback'
    else 'cancelled'
  end;

  if v_sale.status = 'recorded' then
    if p_reason <> 'cancellation' then
      raise exception using
        errcode = 'check_violation',
        message = 'an unconfirmed payment is cancelled, not reversed as a sale';
    end if;
    update public.sales set status = 'cancelled' where id = p_sale_id;
    return 0;
  end if;

  if v_sale.status not in ('confirmed', 'locked', 'refunded', 'chargeback', 'cancelled') then
    raise exception using
      errcode = 'check_violation',
      message = 'sale cannot be reversed';
  end if;

  if v_sale.status in ('confirmed', 'locked') then
    update public.sales set status = v_status where id = p_sale_id;
  elsif v_sale.status is distinct from v_status then
    raise exception using
      errcode = 'restrict_violation',
      message = 'sale was already reversed with a different reason';
  end if;

  for v_entry in
    select e.*
      from public.commission_entries e
     where e.sale_id = p_sale_id
       and e.commission_type in ('base', 'launch')
       and not exists (
         select 1 from public.commission_entries r
          where r.reverses_entry_id = e.id
       )
     order by e.level
  loop
    v_reversal_status := case
      when v_entry.status in ('payable', 'paid') then 'payable'
      else 'confirmed'
    end;

    insert into public.commission_entries (
      sale_id, beneficiary_partner_id, level, commission_type,
      base_amount, rate, amount, currency, status, reverses_entry_id
    )
    values (
      v_entry.sale_id,
      v_entry.beneficiary_partner_id,
      v_entry.level,
      'reversal',
      v_entry.base_amount,
      v_entry.rate,
      -v_entry.amount,
      v_entry.currency,
      v_reversal_status,
      v_entry.id
    );

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

-- Locks the sale's commission hold. Does not write partner_relationships.
create or replace function public.advance_sponsor_lock(p_sale_id uuid default null)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer := 0;
begin
  update public.sales s
     set status = 'locked',
         locked_at = s.confirmed_at + interval '14 days'
   where s.status = 'confirmed'
     and s.confirmed_at is not null
     and s.locked_at is null
     and s.confirmed_at + interval '14 days' <= now()
     and (p_sale_id is null or s.id = p_sale_id);

  get diagnostics v_count = row_count;

  update public.commission_entries e
     set status = 'payable'
   where e.status = 'confirmed'
     and e.sale_id in (
       select s.id
         from public.sales s
        where s.status = 'locked'
          and s.locked_at is not null
          and (p_sale_id is null or s.id = p_sale_id)
     );

  return v_count;
end;
$$;

create or replace function public.create_payout(
  p_partner_id text,
  p_currency text,
  p_created_by uuid
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_partner text := nullif(btrim(coalesce(p_partner_id, '')), '');
  v_currency text := upper(btrim(coalesce(p_currency, '')));
  v_payout uuid;
  v_amount numeric(20, 2) := 0;
  v_entry record;
begin
  if v_partner is null or v_currency !~ '^[A-Z]{3}$' or p_created_by is null then
    raise exception using
      errcode = 'check_violation',
      message = 'payout requires a partner, a currency and created_by';
  end if;

  if not exists (
    select 1 from public.partner_profiles pp where pp.partner_id = v_partner
  ) then
    raise exception using
      errcode = 'foreign_key_violation',
      message = 'payout partner does not exist';
  end if;

  if not exists (select 1 from auth.users u where u.id = p_created_by) then
    raise exception using
      errcode = 'foreign_key_violation',
      message = 'payout created_by does not exist';
  end if;

  for v_entry in
    select e.id, e.amount
      from public.commission_entries e
     where e.beneficiary_partner_id = v_partner
       and e.currency = v_currency
       and e.status = 'payable'
       and not exists (
         select 1
           from public.payout_allocations a
           join public.payouts p on p.id = a.payout_id
          where a.commission_entry_id = e.id
            and p.status <> 'void'
       )
     order by e.created_at, e.id
     for update of e
  loop
    if v_payout is null then
      insert into public.payouts (partner_id, status, currency, amount, created_by)
      values (v_partner, 'open', v_currency, 0, p_created_by)
      returning id into v_payout;
    end if;

    insert into public.payout_allocations (payout_id, commission_entry_id, allocated_amount)
    values (v_payout, v_entry.id, v_entry.amount);

    v_amount := v_amount + v_entry.amount;
  end loop;

  if v_payout is null then
    raise exception using
      errcode = 'check_violation',
      message = 'no payable commission entries';
  end if;

  update public.payouts set amount = v_amount where id = v_payout;
  return v_payout;
end;
$$;

create or replace function public.confirm_payout(
  p_payout_id uuid,
  p_confirmed_by uuid
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_payout public.payouts%rowtype;
begin
  if p_payout_id is null or p_confirmed_by is null then
    raise exception using
      errcode = 'check_violation',
      message = 'payout id and confirmed_by are required';
  end if;

  select * into v_payout
    from public.payouts p
   where p.id = p_payout_id
   for update;

  if not found then
    raise exception using
      errcode = 'no_data_found',
      message = 'payout not found';
  end if;

  if v_payout.status = 'paid' then
    return v_payout.id;
  end if;

  if v_payout.status <> 'open' then
    raise exception using
      errcode = 'check_violation',
      message = 'only an open payout can be confirmed';
  end if;

  if not exists (select 1 from auth.users u where u.id = p_confirmed_by) then
    raise exception using
      errcode = 'foreign_key_violation',
      message = 'payout confirmed_by does not exist';
  end if;

  update public.payouts
     set status = 'paid',
         confirmed_by = p_confirmed_by,
         confirmed_at = now(),
         paid_at = now()
   where id = p_payout_id;

  update public.commission_entries e
     set status = 'paid',
         paid_at = now()
    from public.payout_allocations a
   where a.payout_id = p_payout_id
     and a.commission_entry_id = e.id
     and e.status = 'payable';

  return p_payout_id;
end;
$$;

-- Money leaves the database as text so a client does not parse it as float.
-- No rows: real zeros, null currency, entry_count 0. Clicks and leads are
-- not included. Mixed currencies are separate rows and must not be summed.
create or replace function public.partner_ledger_stats()
returns table (
  qualifying_sales bigint,
  commission_net text,
  currency text,
  payable_amount text,
  paid_amount text,
  entry_count bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_partner text := public.current_partner_id();
  v_sales bigint;
begin
  if v_partner is null then
    qualifying_sales := 0;
    commission_net := '0.00';
    currency := null;
    payable_amount := '0.00';
    paid_amount := '0.00';
    entry_count := 0;
    return next;
    return;
  end if;

  select count(*) into v_sales
    from public.sales s
   where s.partner_id = v_partner
     and s.status in ('confirmed', 'locked');

  return query
  select
    v_sales,
    to_char(coalesce(sum(e.amount), 0), 'FM9999999990.00'),
    e.currency,
    to_char(
      coalesce(sum(e.amount) filter (where e.status = 'payable'), 0),
      'FM9999999990.00'
    ),
    to_char(
      coalesce(sum(e.amount) filter (where e.status = 'paid'), 0),
      'FM9999999990.00'
    ),
    count(*)::bigint
  from public.commission_entries e
  where e.beneficiary_partner_id = v_partner
  group by e.currency;

  if not found then
    qualifying_sales := v_sales;
    commission_net := '0.00';
    currency := null;
    payable_amount := '0.00';
    paid_amount := '0.00';
    entry_count := 0;
    return next;
  end if;
end;
$$;

comment on function public.record_sale(text, text, text, numeric, text, timestamptz, text, text) is
  'Service-only idempotent intake of a paid order. Resolves referral_code or partner_id server-side. Does not accept sponsor, rate, level or timestamps.';

comment on function public.qualify_sale(uuid) is
  'Sets confirmed_at from paid_at after the customer has actually paid.';

comment on function public.post_commission_entries(uuid) is
  'Posts L1-L5 from partner_relationships and commission_rules. Fail-closed when no rule is active.';

comment on function public.reverse_sale_commissions(uuid, text) is
  'Inserts negative reversal rows. Does not update the original commission amount or clear confirmed_at.';

comment on function public.advance_sponsor_lock(uuid) is
  'Sets sales.locked_at 14 days after confirmed_at and moves entries to payable. Does not write partner_relationships.';

comment on function public.partner_ledger_stats() is
  'Ledger rollup for the calling partner. Empty ledger is zeros, not an estimate. Does not count clicks or leads.';

-- -------------------------------------------------------------------- grants

revoke all on function public.record_sale(text, text, text, numeric, text, timestamptz, text, text) from public;
revoke all on function public.qualify_sale(uuid) from public;
revoke all on function public.post_commission_entries(uuid) from public;
revoke all on function public.reverse_sale_commissions(uuid, text) from public;
revoke all on function public.advance_sponsor_lock(uuid) from public;
revoke all on function public.create_payout(text, text, uuid) from public;
revoke all on function public.confirm_payout(uuid, uuid) from public;
revoke all on function public.partner_ledger_stats() from public;
revoke all on function public.sales_guard() from public;
revoke all on function public.commission_entries_guard() from public;
revoke all on function public.payouts_guard() from public;
revoke all on function public.payout_allocations_one_active() from public;

do $$
declare
  fn text;
  mutators text[] := array[
    'public.record_sale(text, text, text, numeric, text, timestamptz, text, text)',
    'public.qualify_sale(uuid)',
    'public.post_commission_entries(uuid)',
    'public.reverse_sale_commissions(uuid, text)',
    'public.advance_sponsor_lock(uuid)',
    'public.create_payout(text, text, uuid)',
    'public.confirm_payout(uuid, uuid)',
    'public.sales_guard()',
    'public.commission_entries_guard()',
    'public.payouts_guard()',
    'public.payout_allocations_one_active()'
  ];
begin
  foreach fn in array mutators loop
    if exists (select 1 from pg_roles where rolname = 'anon') then
      execute format('revoke all on function %s from anon', fn);
    end if;
    if exists (select 1 from pg_roles where rolname = 'authenticated') then
      execute format('revoke all on function %s from authenticated', fn);
    end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then
      execute format('grant execute on function %s to service_role', fn);
    end if;
  end loop;

  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on function public.partner_ledger_stats() from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'grant execute on function public.partner_ledger_stats() to authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.partner_ledger_stats() to service_role';
  end if;
end
$$;

-- ---------------------------------------------------------------------- RLS

alter table public.sales enable row level security;
alter table public.commission_rules enable row level security;
alter table public.commission_entries enable row level security;
alter table public.payouts enable row level security;
alter table public.payout_allocations enable row level security;

drop policy if exists sales_select_own_or_admin on public.sales;
create policy sales_select_own_or_admin
  on public.sales for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

drop policy if exists commission_rules_select_admin on public.commission_rules;
create policy commission_rules_select_admin
  on public.commission_rules for select to authenticated
  using (public.is_admin());

drop policy if exists commission_entries_select_own_or_admin on public.commission_entries;
create policy commission_entries_select_own_or_admin
  on public.commission_entries for select to authenticated
  using (
    beneficiary_partner_id = public.current_partner_id() or public.is_admin()
  );

drop policy if exists payouts_select_own_or_admin on public.payouts;
create policy payouts_select_own_or_admin
  on public.payouts for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

drop policy if exists payout_allocations_select_own_or_admin on public.payout_allocations;
create policy payout_allocations_select_own_or_admin
  on public.payout_allocations for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.payouts p
       where p.id = payout_id
         and p.partner_id = public.current_partner_id()
    )
  );

do $$
declare
  role_name text;
  table_name text;
  ledger_tables text[] := array[
    'sales', 'commission_rules', 'commission_entries', 'payouts', 'payout_allocations'
  ];
begin
  foreach table_name in array ledger_tables loop
    execute format('revoke all on table public.%I from public', table_name);

    foreach role_name in array array['anon', 'authenticated'] loop
      if exists (select 1 from pg_roles where rolname = role_name) then
        execute format(
          'revoke all on table public.%I from %I', table_name, role_name
        );
      end if;
    end loop;

    if exists (select 1 from pg_roles where rolname = 'authenticated') then
      execute format(
        'grant select on table public.%I to authenticated', table_name
      );
    end if;

    if exists (select 1 from pg_roles where rolname = 'service_role') then
      execute format(
        'grant select, insert, update, delete on table public.%I to service_role',
        table_name
      );
    end if;
  end loop;
end
$$;
