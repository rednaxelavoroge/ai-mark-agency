-- Read path for the partner cabinet.
--
-- Same numbers as before. The referral rollup resolves the caller once
-- instead of three times. List and ledger scans keep an index that matches
-- the filter they already use. Nothing here changes rates, attribution or
-- who may write the ledger.

create or replace function public.partner_referral_stats()
returns table (clicks bigint, leads bigint, partner_signups bigint)
language sql
stable
security definer
set search_path = ''
as $$
  with me as (
    select public.current_partner_id() as partner_id
  )
  select
    (
      select count(*) from public.referral_clicks c
       where c.partner_id = me.partner_id
    ),
    (
      select count(*) from public.leads l
       where l.partner_id = me.partner_id
    ),
    (
      select count(*) from public.partner_relationships r
       where r.sponsor_partner_id = me.partner_id
    )
  from me;
$$;

comment on function public.partner_referral_stats() is
  'Counts-only rollup (clicks, delivered leads, attributed partner signups) for the calling partner. Resolves the caller once. Returns zeros for a caller with no partner record.';

revoke all on function public.partner_referral_stats() from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on function public.partner_referral_stats() from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'grant execute on function public.partner_referral_stats() to authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.partner_referral_stats() to service_role';
  end if;
end
$$;

-- Ledger list and qualifying-sale count. Empty partners hit the index and stop.
create index if not exists sales_partner_status_idx
  on public.sales (partner_id, status);

create index if not exists commission_entries_beneficiary_created_idx
  on public.commission_entries (beneficiary_partner_id, created_at desc);
