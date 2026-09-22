-- Phase 4A · Foundation · 1/6
-- Extensions, enums and the shared updated_at trigger.
--
-- Target: Supabase (PostgreSQL). Also applied verbatim by the local
-- verification harness in supabase/tests/, which provides the auth schema,
-- auth.uid() and the anon/authenticated/service_role roles that Supabase
-- already ships. See supabase/README.md.

-- gen_random_bytes() for referral-code generation lives in pgcrypto.
-- Supabase exposes extensions under its own schema; create it so the same
-- migration is runnable on a plain PostgreSQL instance too.
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- Application roles. Deliberately NOT a boolean or a hardcoded email:
-- authorization is data, so it is auditable and grantable at runtime.
do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public' and t.typname = 'app_role'
  ) then
    create type public.app_role as enum ('partner', 'admin');
  end if;
end
$$;

-- Partner lifecycle status (see partner_profiles.status).
do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public' and t.typname = 'partner_status'
  ) then
    create type public.partner_status as enum (
      'partner',
      'growth',
      'regional',
      'strategic',
      'suspended'
    );
  end if;
end
$$;

-- Single source of truth for updated_at on every mutable table.
-- search_path is pinned: a SECURITY DEFINER caller must never be able to
-- redirect an unqualified name to an attacker-controlled schema.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
