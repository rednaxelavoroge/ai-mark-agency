-- Phase 4A · Foundation · 6/6
-- Provisioning: mirror auth.users into the application tables.
--
-- Phase 4A policy (per the project brief): every new account becomes a
-- partner. One AFTER INSERT trigger on auth.users creates the profile, the
-- partner profile (with generated partner_id + referral_code) and the
-- default 'partner' role, so the three can never drift apart.
--
-- Later phases can gate this (invite-only, manual approval) without changing
-- the schema — the trigger is the single place that decides.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  attempt int := 0;
  v_full_name text;
  v_language text;
begin
  -- Metadata is client-supplied at signup, so sanitise before it reaches a
  -- constrained column: a bad value must never make the signup itself fail.
  v_full_name := left(
    nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''),
    120
  );

  v_language := lower(
    nullif(btrim(coalesce(new.raw_user_meta_data ->> 'language', '')), '')
  );
  if v_language is null or v_language !~ '^[a-z][a-z-]{1,11}$' then
    v_language := 'en';
  end if;

  insert into public.profiles (id, email, full_name, language)
  values (new.id, new.email, v_full_name, v_language)
  on conflict (id) do nothing;

  -- Generated identifiers can theoretically collide; retry a few times
  -- rather than failing the signup. `on conflict (user_id) do nothing` keeps
  -- the whole block idempotent.
  loop
    attempt := attempt + 1;
    begin
      insert into public.partner_profiles (
        user_id, partner_id, referral_code, status
      )
      values (
        new.id,
        public.generate_partner_id(),
        public.generate_referral_code(),
        'partner'
      )
      on conflict (user_id) do nothing;
      exit;
    exception
      when unique_violation then
        if attempt >= 5 then
          raise;
        end if;
    end;
  end loop;

  insert into public.user_roles (user_id, role)
  values (new.id, 'partner')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- profiles.email mirrors auth.users.email. Supabase Auth owns the address;
-- this keeps the mirror honest when the address changes (confirmation flows,
-- admin updates) instead of letting the two drift.
create or replace function public.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles
       set email = new.email
     where id = new.id;
  end if;
  return null;
end;
$$;

drop trigger if exists on_auth_user_email_changed on auth.users;
create trigger on_auth_user_email_changed
after update of email on auth.users
for each row execute function public.handle_user_email_change();
