-- Phase 4A · Foundation · 4/6
-- Partner identity (partner_profiles), the sponsor edge
-- (partner_relationships) and the status audit trail
-- (partner_status_history).
--
-- Two rules drive the shape of this file:
--
--   1. partner_id and referral_code are generated in the database, never by
--      the client. They are public identifiers, so the client must not be
--      able to choose them.
--   2. The sponsor edge is IMMUTABLE. Phase 4A has no qualifying-sale logic
--      yet, but the structure already allows a later phase to finalise the
--      sponsor (confirmed_at / locked_at) without ever rewriting history.
--      A partner can never set or change their own sponsor.

-- ---------------------------------------------------------------- generators

create sequence if not exists public.partner_id_seq
  as bigint
  start with 1000
  increment by 1
  no cycle;

-- Public, stable, human-quotable Partner ID, e.g. AM-001000.
create or replace function public.generate_partner_id()
returns text
language sql
volatile
set search_path = ''
as $$
  select 'AM-' || lpad(nextval('public.partner_id_seq')::text, 6, '0');
$$;

-- Unambiguous referral code (no i/l/o/0/1, so it survives being read aloud
-- or copied off a business card). Randomness comes from pgcrypto, not
-- random(): a published code must not be guessable from a sequence.
create or replace function public.generate_referral_code()
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  alphabet constant text := 'abcdefghjkmnpqrstuvwxyz23456789';
  bytes bytea := extensions.gen_random_bytes(8);
  code text := '';
  i int;
begin
  for i in 0..7 loop
    code := code || substr(alphabet, 1 + (get_byte(bytes, i) % length(alphabet)), 1);
  end loop;
  return code;
end;
$$;

-- ----------------------------------------------------------- partner_profiles

create table if not exists public.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  -- One partner profile per auth user.
  user_id uuid not null unique references auth.users (id) on delete cascade,
  -- Public, stable Partner ID (see generate_partner_id()).
  partner_id text not null unique,
  -- Public referral code (see generate_referral_code()).
  referral_code text not null unique,
  -- Denormalised pointer to the canonical edge in partner_relationships.
  -- Derived, write-once, and never set by a partner. See
  -- public.partner_profiles_guard().
  sponsor_partner_id text,
  status public.partner_status not null default 'partner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partner_profiles_partner_id_format check (
    partner_id ~ '^AM-[0-9]{4,12}$'
  ),
  constraint partner_profiles_referral_code_format check (
    referral_code ~ '^[a-z0-9][a-z0-9_-]{3,31}$'
  ),
  -- Keep codes that would collide with real routes or read as staff.
  constraint partner_profiles_referral_code_reserved check (
    referral_code not in (
      'admin', 'api', 'auth', 'dashboard', 'en', 'go', 'investors', 'login',
      'partner', 'partners', 'privacy', 'products', 'ru', 'signup'
    )
  ),
  constraint partner_profiles_no_self_sponsor check (
    sponsor_partner_id is null or sponsor_partner_id <> partner_id
  ),
  constraint partner_profiles_sponsor_fk foreign key (sponsor_partner_id)
    references public.partner_profiles (partner_id)
    on delete restrict
);

create index if not exists partner_profiles_sponsor_idx
  on public.partner_profiles (sponsor_partner_id);
create index if not exists partner_profiles_status_idx
  on public.partner_profiles (status);

drop trigger if exists partner_profiles_set_updated_at on public.partner_profiles;
create trigger partner_profiles_set_updated_at
before update on public.partner_profiles
for each row execute function public.set_updated_at();

-- Resolves the calling session's partner_id. SECURITY DEFINER for the same
-- reason as is_admin(): it is referenced from RLS policies and must not be
-- filtered by them.
create or replace function public.current_partner_id()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select pp.partner_id
  from public.partner_profiles pp
  where pp.user_id = (select auth.uid());
$$;

comment on function public.current_partner_id() is
  'The current session''s public Partner ID, or NULL when the caller is not a partner.';

-- --------------------------------------------------------- partner_relationships

create table if not exists public.partner_relationships (
  id uuid primary key default gen_random_uuid(),
  -- The upline partner.
  sponsor_partner_id text not null
    references public.partner_profiles (partner_id) on delete restrict,
  -- The downline partner. UNIQUE below is what enforces "one sponsor only".
  partner_id text not null
    references public.partner_profiles (partner_id) on delete cascade,
  -- Phase 4B (qualifying sale) sets these. Phase 4A leaves them NULL.
  confirmed_at timestamptz,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint partner_relationships_one_sponsor_per_partner unique (partner_id),
  constraint partner_relationships_no_self_sponsor check (
    sponsor_partner_id <> partner_id
  )
);

create index if not exists partner_relationships_sponsor_idx
  on public.partner_relationships (sponsor_partner_id);

-- --------------------------------------------------------------- immutability

-- Guards partner_profiles: derived sponsor pointer, immutable identity,
-- write-once referral_code.
create or replace function public.partner_profiles_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    -- Force operators through partner_relationships so the edge stays the
    -- single source of truth and the pointer can never disagree with it.
    if new.sponsor_partner_id is not null then
      raise exception using
        errcode = 'restrict_violation',
        message = 'partner_profiles.sponsor_partner_id is derived; insert the edge into public.partner_relationships instead';
    end if;
    return new;
  end if;

  if new.id is distinct from old.id
     or new.user_id is distinct from old.user_id
     or new.partner_id is distinct from old.partner_id then
    raise exception using
      errcode = 'restrict_violation',
      message = 'partner_profiles.id, user_id and partner_id are immutable';
  end if;

  if new.referral_code is distinct from old.referral_code
     and old.referral_code is not null then
    raise exception using
      errcode = 'restrict_violation',
      message = 'partner_profiles.referral_code is immutable once assigned';
  end if;

  if new.sponsor_partner_id is distinct from old.sponsor_partner_id then
    if old.sponsor_partner_id is not null then
      raise exception using
        errcode = 'restrict_violation',
        message = 'partner_profiles.sponsor_partner_id is immutable once set';
    end if;

    if new.sponsor_partner_id is not null and not exists (
      select 1
      from public.partner_relationships r
      where r.partner_id = new.partner_id
        and r.sponsor_partner_id = new.sponsor_partner_id
    ) then
      raise exception using
        errcode = 'foreign_key_violation',
        message = 'sponsor_partner_id must match a row in public.partner_relationships';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists partner_profiles_guard on public.partner_profiles;
create trigger partner_profiles_guard
before insert or update on public.partner_profiles
for each row execute function public.partner_profiles_guard();

-- Guards partner_relationships: immutable edges, monotonic confirmation.
create or replace function public.partner_relationships_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    if old.confirmed_at is not null then
      raise exception using
        errcode = 'restrict_violation',
        message = 'a confirmed sponsor relationship cannot be deleted';
    end if;
    return old;
  end if;

  if new.sponsor_partner_id = new.partner_id then
    raise exception using
      errcode = 'check_violation',
      message = 'a partner cannot sponsor themselves';
  end if;

  -- Applies to INSERT as well as UPDATE: a row must never be born locked
  -- without having been confirmed first.
  if new.locked_at is not null and new.confirmed_at is null then
    raise exception using
      errcode = 'check_violation',
      message = 'a sponsor relationship must be confirmed before it can be locked';
  end if;

  if tg_op = 'UPDATE' then
    if new.sponsor_partner_id is distinct from old.sponsor_partner_id
       or new.partner_id is distinct from old.partner_id then
      raise exception using
        errcode = 'restrict_violation',
        message = 'sponsor relationship edges are immutable; only confirmed_at/locked_at may advance';
    end if;

    if old.confirmed_at is not null
       and new.confirmed_at is distinct from old.confirmed_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'partner_relationships.confirmed_at is immutable once set';
    end if;

    if old.locked_at is not null
       and new.locked_at is distinct from old.locked_at then
      raise exception using
        errcode = 'restrict_violation',
        message = 'partner_relationships.locked_at is immutable once set';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists partner_relationships_guard on public.partner_relationships;
create trigger partner_relationships_guard
before insert or update or delete on public.partner_relationships
for each row execute function public.partner_relationships_guard();

-- Keeps partner_profiles.sponsor_partner_id in step with the canonical edge.
-- SECURITY DEFINER so it can write the pointer regardless of the caller's RLS
-- context (a future SECURITY DEFINER attribution routine will insert edges as
-- a partner who deliberately cannot update partner_profiles).
create or replace function public.sync_sponsor_pointer()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.partner_profiles
     set sponsor_partner_id = new.sponsor_partner_id
   where partner_id = new.partner_id
     and sponsor_partner_id is null;

  return null;
end;
$$;

drop trigger if exists partner_relationships_sync_pointer on public.partner_relationships;
create trigger partner_relationships_sync_pointer
after insert on public.partner_relationships
for each row execute function public.sync_sponsor_pointer();

-- ------------------------------------------------------ partner_status_history

create table if not exists public.partner_status_history (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null
    references public.partner_profiles (partner_id) on delete cascade,
  old_status public.partner_status,
  new_status public.partner_status not null,
  reason text,
  created_at timestamptz not null default now(),
  -- NULL when the change came from the service role rather than a session.
  changed_by uuid references auth.users (id) on delete set null,
  constraint partner_status_history_reason_len check (
    reason is null or char_length(reason) <= 500
  )
);

create index if not exists partner_status_history_partner_idx
  on public.partner_status_history (partner_id, created_at desc);

-- Every status transition is recorded by the database, so a status can never
-- change without an audit row even if a future writer forgets to log it.
create or replace function public.record_partner_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.partner_status_history (
      partner_id, old_status, new_status, reason, changed_by
    )
    values (
      new.partner_id,
      null,
      new.status,
      'partner account created',
      (select auth.uid())
    );
    return null;
  end if;

  if new.status is distinct from old.status then
    insert into public.partner_status_history (
      partner_id, old_status, new_status, reason, changed_by
    )
    values (new.partner_id, old.status, new.status, null, (select auth.uid()));
  end if;

  return null;
end;
$$;

drop trigger if exists partner_profiles_record_status on public.partner_profiles;
create trigger partner_profiles_record_status
after insert or update on public.partner_profiles
for each row execute function public.record_partner_status();
