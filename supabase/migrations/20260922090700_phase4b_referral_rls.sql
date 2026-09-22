-- Phase 4B · Referral Engine · 2/2
-- Row Level Security for the two new attribution tables.
--
-- Model (identical in spirit to Phase 4A, strictly tighter in grants):
--
--   * Only the owner of an attribution row (or an admin) may READ it. A
--     partner sees their own clicks and their own attributed leads.
--   * NOBODY reaches these tables over PostgREST with a write. Both tables are
--     written exclusively by server-side code through the secret key, so
--     "unauthenticated writes to attribution tables" and "an authenticated
--     partner inflates their own click/lead counts" are impossible by
--     construction rather than by a check that could be forgotten.
--   * `anon` has no privilege at all — not even SELECT.
--
-- Consequence: the dashboard never reads these tables directly for its
-- numbers; it calls public.partner_referral_stats(), a counts-only SECURITY
-- DEFINER rollup. That keeps "a sponsor cannot enumerate their downline"
-- (Phase 4A) intact while still giving the partner real figures.

alter table public.referral_clicks enable row level security;
alter table public.leads enable row level security;

-- ------------------------------------------------------------ referral_clicks

drop policy if exists referral_clicks_select_own_or_admin on public.referral_clicks;
create policy referral_clicks_select_own_or_admin
  on public.referral_clicks for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

-- No INSERT / UPDATE / DELETE policy exists on purpose. Adding one would be the
-- single change that lets a client forge attribution data, so the migration
-- suite asserts their absence (see supabase/tests/run-rls-tests.sh).

-- -------------------------------------------------------------------- leads

drop policy if exists leads_select_own_or_admin on public.leads;
create policy leads_select_own_or_admin
  on public.leads for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

-- Deliberately no write policy: an admin reads leads here, but every write
-- goes through /api/contact acting as the server.

-- -------------------------------------------------------- privileges / grants
--
-- Unlike Phase 4A (which grants broadly and lets RLS restrict), the new tables
-- grant `authenticated` SELECT only. Defence in depth: even if a permissive
-- policy were ever added by mistake, the table grant would still refuse a
-- write coming from a browser session.

do $$
declare
  role_name text;
  table_name text;
  all_tables text[] := array['referral_clicks', 'leads'];
begin
  foreach table_name in array all_tables loop
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

    -- The secret key is the only writer. Granted explicitly because Postgres
    -- checks table grants before RLS: a BYPASSRLS role without the grant still
    -- fails with "permission denied".
    if exists (select 1 from pg_roles where rolname = 'service_role') then
      execute format(
        'grant select, insert, update, delete on table public.%I to service_role',
        table_name
      );
    end if;
  end loop;
end
$$;

-- The stats rollup is read-only and exposes counts, so it may run as a partner
-- session. It is still denied to `anon`.
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
