-- Phase 4A · Foundation · 3/6
-- profiles — one row per auth.users row, holding the display/contact data the
-- account owner may edit.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  -- Mirrors auth.users.email. The account owner may not change it through
  -- this table (see public.profiles_guard); Supabase Auth owns the address.
  email text,
  phone text,
  country text,
  region text,
  language text not null default 'en',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_full_name_len check (
    full_name is null or char_length(full_name) <= 120
  ),
  constraint profiles_phone_len check (phone is null or char_length(phone) <= 40),
  constraint profiles_country_len check (country is null or char_length(country) <= 80),
  constraint profiles_region_len check (region is null or char_length(region) <= 80),
  constraint profiles_language_len check (char_length(language) between 2 and 12),
  constraint profiles_avatar_url_len check (
    avatar_url is null or char_length(avatar_url) <= 2048
  )
);

create index if not exists profiles_email_idx on public.profiles (lower(email));

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Identity columns are owned by the platform, not by the account owner.
-- RLS already limits a partner to their own row; this closes the remaining
-- hole (rewriting your own id/email) and applies to admins too, because a
-- partner's login identity must never drift from auth.users.
create or replace function public.profiles_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.id is distinct from old.id then
    raise exception using
      errcode = 'insufficient_privilege',
      message = 'profiles.id is immutable';
  end if;

  if new.email is distinct from old.email then
    raise exception using
      errcode = 'insufficient_privilege',
      message = 'profiles.email mirrors auth.users and cannot be changed here';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_guard_identity on public.profiles;
create trigger profiles_guard_identity
before update on public.profiles
for each row execute function public.profiles_guard();
