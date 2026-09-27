-- Partner Commission Model v2
--
-- Owner-approved economics:
--   L1 50% / L2 15% / L3 7% / L4 5% / L5 3%
--   PARTNER_POOL_CAP = 80% of commissionable amount (sales.amount)
--   AI Mark retained share = 20% of commissionable amount
--
-- Historical safety:
--   Existing commission_entries and paid payouts are not rewritten.
--   v1 commission_rules rows are closed (active_to set), not deleted.
--   Sales with paid_at before V2_EFFECTIVE_FROM still resolve v1 base rates.
--
-- Launch:
--   The 90-day window remains a ledger status flag (commission_type).
--   It is not a rate multiplier. The engine never multiplies base_rate.
--   A launch_multiplier column may still exist on historical rows (1.5);
--   v2 rows store 1.0 and the poster ignores the column for arithmetic.

-- Immutable cap. Marketing and the engine share this number.
create or replace function public.partner_pool_cap()
returns numeric
language sql
immutable
parallel safe
as $$
  select 0.80::numeric(12, 6);
$$;

comment on function public.partner_pool_cap() is
  'Partner Commission Model v2: aggregate L1–L5 pool may not exceed 80% of sales.amount.';

create or replace function public.ai_mark_retained_share()
returns numeric
language sql
immutable
parallel safe
as $$
  select 0.20::numeric(12, 6);
$$;

comment on function public.ai_mark_retained_share() is
  'AI Mark retained share = 20% of commissionable amount. Not a net-profit figure.';

revoke all on function public.partner_pool_cap() from public;
revoke all on function public.ai_mark_retained_share() from public;
grant execute on function public.partner_pool_cap() to authenticated, service_role;
grant execute on function public.ai_mark_retained_share() to authenticated, service_role;

-- Close v1 rules. Do not delete them: audit-safe history of the old schedule.
update public.commission_rules
   set active_to = timestamptz '2026-09-27 00:00:00+00'
 where active_to is null
   and active_from < timestamptz '2026-09-27 00:00:00+00';

insert into public.commission_rules (level, base_rate, launch_multiplier, active_from)
values
  (1, 0.50::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-09-27 00:00:00+00'),
  (2, 0.15::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-09-27 00:00:00+00'),
  (3, 0.07::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-09-27 00:00:00+00'),
  (4, 0.05::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-09-27 00:00:00+00'),
  (5, 0.03::numeric(12, 6), 1.0::numeric(12, 6), timestamptz '2026-09-27 00:00:00+00');

comment on table public.commission_rules is
  'Versioned L1–L5 rates. Engine reads base_rate only. launch_multiplier is historical; v2 stores 1.0 and the poster does not multiply. Sum of active v2 base_rate = 0.80.';

-- Reject a v2+ rule that would reintroduce a launch multiplier.
create or replace function public.commission_rules_v2_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_from timestamptz := timestamptz '2026-09-27 00:00:00+00';
  v_sum numeric(12, 6);
begin
  if new.active_from >= v_from and new.launch_multiplier is distinct from 1::numeric then
    raise exception using
      errcode = 'check_violation',
      message = 'v2 commission rules cannot store a launch multiplier other than 1';
  end if;

  if new.base_rate < 0 or new.base_rate > 1 then
    raise exception using
      errcode = 'check_violation',
      message = 'commission base_rate must be between 0 and 1';
  end if;

  select coalesce(sum(r.base_rate), 0)
    into v_sum
    from (
      select level, base_rate
        from public.commission_rules
       where active_from = new.active_from
         and level is distinct from new.level
      union all
      select new.level, new.base_rate
    ) r;

  if v_sum > public.partner_pool_cap() then
    raise exception using
      errcode = 'check_violation',
      message = 'active rule set would exceed the 80% partner pool cap';
  end if;

  return new;
end;
$$;

drop trigger if exists commission_rules_v2_guard on public.commission_rules;
create trigger commission_rules_v2_guard
before insert or update on public.commission_rules
for each row execute function public.commission_rules_v2_guard();

revoke all on function public.commission_rules_v2_guard() from public;

-- Recreate the poster: rates from commission_rules.base_rate only.
-- Launch window still tags commission_type; it never multiplies the rate.
-- Fail-closed if the posted pool would exceed PARTNER_POOL_CAP.
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
  v_rate numeric(12, 6);
  v_status text;
  v_type text;
  v_count integer;
  v_rate_sum numeric(12, 6) := 0;
  v_pool numeric(20, 2);
  v_cap numeric(20, 2);
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

  -- 90 days from partner_profiles.created_at. Status flag only.
  -- The boundary instant is base. Launch does not change the rate.
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

    select r.base_rate
      into v_base
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

    -- Partner Commission Model v2: never multiply. launch_multiplier is ignored.
    v_rate := v_base;
    v_rate_sum := v_rate_sum + v_rate;

    if v_rate_sum > public.partner_pool_cap() then
      raise exception using
        errcode = 'check_violation',
        message = 'partner pool exceeds 80% of commissionable amount';
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
     and e.commission_type in ('base', 'launch');

  v_cap := round(v_sale.amount * public.partner_pool_cap(), 2);

  if v_pool > v_cap then
    raise exception using
      errcode = 'check_violation',
      message = 'partner pool exceeds 80% of commissionable amount';
  end if;

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

comment on function public.post_commission_entries(uuid) is
  'Posts L1-L5 from partner_relationships and commission_rules.base_rate. Launch is a status flag, not a multiplier. Fail-closed when no rule is active or the partner pool would exceed 80%.';
