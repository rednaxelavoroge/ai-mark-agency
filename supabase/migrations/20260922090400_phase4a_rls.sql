-- Phase 4A · Foundation · 5/6
-- Row Level Security for every user-facing table.
--
-- Model:
--   * RLS is ENABLED on all five tables. There is no `using (true)` policy
--     anywhere, so an authenticated session with no matching policy reads
--     zero rows rather than everything.
--   * A partner sees only their own profile, their own partner profile, their
--     own sponsor edge and their own status history. Network-wide visibility
--     is deliberately NOT granted here; it arrives in a later phase through
--     server-side logic.
--   * Admin gets full access.
--   * Privileges are granted broadly and restricted by policy (the Supabase
--     idiom). RLS is the boundary, not the GRANT.
--
-- The helper predicates is_admin() / current_partner_id() are SECURITY
-- DEFINER, so evaluating them does not re-enter RLS. That is what stops the
-- user_roles policy from recursing through is_admin().
--
-- NOTE: FORCE ROW LEVEL SECURITY is intentionally NOT set. The definer
-- helpers and the provisioning trigger run as the table owner (postgres in
-- Supabase) and must bypass RLS to work.

alter table public.profiles enable row level security;
alter table public.partner_profiles enable row level security;
alter table public.partner_relationships enable row level security;
alter table public.partner_status_history enable row level security;
alter table public.user_roles enable row level security;

-- ------------------------------------------------------------------ profiles

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

drop policy if exists profiles_insert_own_or_admin on public.profiles;
create policy profiles_insert_own_or_admin
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()) or public.is_admin());

drop policy if exists profiles_update_own_or_admin on public.profiles;
create policy profiles_update_own_or_admin
  on public.profiles for update to authenticated
  using (id = (select auth.uid()) or public.is_admin())
  with check (id = (select auth.uid()) or public.is_admin());

drop policy if exists profiles_delete_admin on public.profiles;
create policy profiles_delete_admin
  on public.profiles for delete to authenticated
  using (public.is_admin());

-- ----------------------------------------------------------- partner_profiles

drop policy if exists partner_profiles_select_own_or_admin on public.partner_profiles;
create policy partner_profiles_select_own_or_admin
  on public.partner_profiles for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

-- A partner can never provision or edit their own partner record: the public
-- Partner ID, referral code, status and sponsor are all platform-owned. That
-- is why only admin holds write policies here.
drop policy if exists partner_profiles_insert_admin on public.partner_profiles;
create policy partner_profiles_insert_admin
  on public.partner_profiles for insert to authenticated
  with check (public.is_admin());

drop policy if exists partner_profiles_update_admin on public.partner_profiles;
create policy partner_profiles_update_admin
  on public.partner_profiles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists partner_profiles_delete_admin on public.partner_profiles;
create policy partner_profiles_delete_admin
  on public.partner_profiles for delete to authenticated
  using (public.is_admin());

-- ------------------------------------------------------ partner_relationships

-- `partner_id = current_partner_id()` selects the single row naming the
-- caller as the downline partner — i.e. "who is my sponsor". The sponsor's
-- own downline rows are not exposed to the sponsor in Phase 4A.
drop policy if exists partner_relationships_select_own_or_admin on public.partner_relationships;
create policy partner_relationships_select_own_or_admin
  on public.partner_relationships for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

drop policy if exists partner_relationships_insert_admin on public.partner_relationships;
create policy partner_relationships_insert_admin
  on public.partner_relationships for insert to authenticated
  with check (public.is_admin());

drop policy if exists partner_relationships_update_admin on public.partner_relationships;
create policy partner_relationships_update_admin
  on public.partner_relationships for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists partner_relationships_delete_admin on public.partner_relationships;
create policy partner_relationships_delete_admin
  on public.partner_relationships for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------- partner_status_history

drop policy if exists partner_status_history_select_own_or_admin on public.partner_status_history;
create policy partner_status_history_select_own_or_admin
  on public.partner_status_history for select to authenticated
  using (partner_id = public.current_partner_id() or public.is_admin());

drop policy if exists partner_status_history_insert_admin on public.partner_status_history;
create policy partner_status_history_insert_admin
  on public.partner_status_history for insert to authenticated
  with check (public.is_admin());

drop policy if exists partner_status_history_update_admin on public.partner_status_history;
create policy partner_status_history_update_admin
  on public.partner_status_history for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists partner_status_history_delete_admin on public.partner_status_history;
create policy partner_status_history_delete_admin
  on public.partner_status_history for delete to authenticated
  using (public.is_admin());

-- --------------------------------------------------------------- user_roles

-- A partner may read their own roles (the UI needs to know whether to render
-- the admin entry point) but may never write them. This is the boundary that
-- makes privilege escalation impossible from a partner session.
drop policy if exists user_roles_select_own_or_admin on public.user_roles;
create policy user_roles_select_own_or_admin
  on public.user_roles for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists user_roles_insert_admin on public.user_roles;
create policy user_roles_insert_admin
  on public.user_roles for insert to authenticated
  with check (public.is_admin());

drop policy if exists user_roles_update_admin on public.user_roles;
create policy user_roles_update_admin
  on public.user_roles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists user_roles_delete_admin on public.user_roles;
create policy user_roles_delete_admin
  on public.user_roles for delete to authenticated
  using (public.is_admin());

-- ------------------------------------------------------- privileges / grants

-- `anon` keeps no table privilege at all: the public marketing site does not
-- talk to Supabase. Guarded so this file also runs on a plain PostgreSQL
-- instance that has no Supabase roles.
do $$
declare
  role_name text;
  table_name text;
  all_tables text[] := array[
    'profiles',
    'partner_profiles',
    'partner_relationships',
    'partner_status_history',
    'user_roles'
  ];
begin
  foreach role_name in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = role_name) then
      foreach table_name in array all_tables loop
        execute format(
          'revoke all on table public.%I from %I', table_name, role_name
        );
      end loop;
    end if;
  end loop;

  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    foreach table_name in array all_tables loop
      execute format(
        'grant select, insert, update, delete on table public.%I to authenticated',
        table_name
      );
    end loop;
  end if;

  -- `service_role` (the Supabase SECRET key) is granted explicitly rather than
  -- relying on the project's default privileges. Postgres checks table grants
  -- BEFORE Row Level Security, so a role with BYPASSRLS still fails with a
  -- permission error when the grant is missing — a failure mode that would
  -- otherwise only show up in production. This keeps the secret key working
  -- for operator work and migrations.
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    foreach table_name in array all_tables loop
      execute format(
        'grant select, insert, update, delete on table public.%I to service_role',
        table_name
      );
    end loop;
  end if;
end
$$;

-- The two generators are internal plumbing. Nothing outside the database
-- should be able to mint Partner IDs or referral codes.
revoke all on function public.generate_partner_id() from public;
revoke all on function public.generate_referral_code() from public;

-- ...but the elevated role still has to be able to run provisioning paths.
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant select, usage on sequence public.partner_id_seq to service_role';
    execute 'grant execute on function public.generate_partner_id() to service_role';
    execute 'grant execute on function public.generate_referral_code() to service_role';
    execute 'grant execute on function public.is_admin() to service_role';
    execute 'grant execute on function public.current_partner_id() to service_role';
  end if;
end
$$;

-- Public identifier generators are read by provisioning only; the sequence
-- must not be advanced by a client.
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    revoke all on sequence public.partner_id_seq from authenticated;
  end if;
  if exists (select 1 from pg_roles where rolname = 'anon') then
    revoke all on sequence public.partner_id_seq from anon;
  end if;
end
$$;
