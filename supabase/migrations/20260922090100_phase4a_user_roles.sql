-- Phase 4A · Foundation · 2/6
-- user_roles — the authorization source of truth — and public.is_admin().
--
-- Roles are rows, not a constant in the application. Nothing anywhere in the
-- repo hardcodes an admin email; the first admin is granted by an operator
-- through the service role (documented in supabase/README.md).

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  -- Who granted it. NULL means "granted by an operator / service role".
  granted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint user_roles_user_role_key unique (user_id, role)
);

create index if not exists user_roles_user_id_idx on public.user_roles (user_id);
create index if not exists user_roles_role_idx on public.user_roles (role);

-- SECURITY DEFINER on purpose:
--   1. it is called from RLS policies, so it must not be itself subject to
--      RLS (that would recurse through user_roles forever);
--   2. it reads only the current session's own claims, so it cannot be used
--      to probe another user.
-- `(select auth.uid())` is wrapped so the planner evaluates it once
-- (initplan) instead of per row.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles r
    where r.user_id = (select auth.uid())
      and r.role = 'admin'
  );
$$;

comment on function public.is_admin() is
  'True when the current session''s user holds the admin role. Used by RLS policies.';
