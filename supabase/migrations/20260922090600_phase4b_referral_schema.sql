-- Phase 4B · Referral Engine · 1/2
-- The referral attribution engine: click tracking, customer leads and the
-- server-controlled sponsor attribution RPC.
--
-- Attribution rules implemented here (and mirrored in lib/referral/rules.ts):
--
--   * Partner signup — the LAST VALID partner referral before signup wins.
--   * Customer lead  — the LAST VALID partner referral within 30 days before
--                      the lead is created wins.
--
-- Both decisions are made SERVER-SIDE. A client cannot write these tables and
-- cannot name its own sponsor: the sponsor edge is only ever created by
-- `public.attribute_partner_signup()`, which is executable by the elevated
-- service role alone (see the RLS half of this phase).
--
-- PRIVACY: no raw IP address, no user agent, no device fingerprint is stored
-- anywhere in this phase. `referral_clicks` deliberately has no IP column: a
-- click is "this referral code was used, from this landing path, with these
-- campaign parameters". That is the whole attribution budget, and it is the
-- minimum needed to prove a click happened and to count leads per partner.
-- If a future fraud phase needs an IP it must add a documented security
-- requirement, a retention window and a hash/salt — not a raw address here.

-- ------------------------------------------------------------ referral_clicks

create table if not exists public.referral_clicks (
  id uuid primary key default gen_random_uuid(),
  -- The partner who owns the code. NOT NULL: only valid referrals are stored.
  partner_id text not null
    references public.partner_profiles (partner_id) on delete cascade,
  -- Denormalised copy of the code used. referral_code is write-once in
  -- partner_profiles, so this can never drift away from the owner.
  referral_code text not null,
  -- The AI Mark path the visitor was sent to (no query string; campaign
  -- parameters live in their own columns).
  landing_path text not null default '/partners',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  constraint referral_clicks_code_format check (
    referral_code ~ '^[a-z0-9][a-z0-9_-]{3,31}$'
  ),
  constraint referral_clicks_landing_path_format check (
    landing_path ~ '^/' and char_length(landing_path) <= 300
  ),
  constraint referral_clicks_utm_source_len check (
    utm_source is null or char_length(utm_source) <= 200
  ),
  constraint referral_clicks_utm_medium_len check (
    utm_medium is null or char_length(utm_medium) <= 200
  ),
  constraint referral_clicks_utm_campaign_len check (
    utm_campaign is null or char_length(utm_campaign) <= 200
  )
);

create index if not exists referral_clicks_partner_idx
  on public.referral_clicks (partner_id, created_at desc);
create index if not exists referral_clicks_code_idx
  on public.referral_clicks (referral_code, created_at desc);
create index if not exists referral_clicks_created_idx
  on public.referral_clicks (created_at desc);

comment on table public.referral_clicks is
  'One row per tracked /go/<code> visit. No IP address or user agent is stored — see the migration header. Written by the server only.';

-- -------------------------------------------------------------------- leads

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  -- The attributed partner, or NULL for an unattributed (direct) lead.
  -- `on delete set null` keeps the lead as a business record when a partner
  -- account is removed; referral_code is preserved so the provenance survives.
  partner_id text
    references public.partner_profiles (partner_id) on delete set null,
  referral_code text,
  -- 'direct'  — no valid referral cookie at submission time.
  -- 'referral' — attributed to the referral code/partner above.
  referral_source text not null default 'direct',
  -- The exact click the cookie carried, when there was one.
  referral_click_id uuid
    references public.referral_clicks (id) on delete set null,
  -- Contact details required by the existing /api/contact workflow. These are
  -- the same fields that are emailed/webhooked; nothing extra is collected.
  name text not null,
  email text not null,
  messenger text not null,
  company text not null,
  scenario text not null,
  message text,
  landing_path text,
  created_at timestamptz not null default now(),
  constraint leads_referral_source_valid check (
    referral_source in ('direct', 'referral')
  ),
  -- A referral lead always names the code it came from. Only the FK pointer is
  -- allowed to go NULL (partner deletion), which is why the code — not the
  -- partner_id — is what this check pins down.
  constraint leads_attribution_consistent check (
    referral_source <> 'referral' or referral_code is not null
  ),
  constraint leads_name_len check (char_length(name) between 1 and 120),
  constraint leads_email_len check (char_length(email) between 3 and 200),
  constraint leads_email_format check (
    email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  constraint leads_messenger_len check (char_length(messenger) between 1 and 120),
  constraint leads_company_len check (char_length(company) between 1 and 160),
  constraint leads_scenario_len check (char_length(scenario) between 1 and 40),
  constraint leads_message_len check (message is null or char_length(message) <= 4000),
  constraint leads_landing_path_format check (
    landing_path is null
    or (landing_path ~ '^/' and char_length(landing_path) <= 300)
  )
);

create index if not exists leads_partner_idx
  on public.leads (partner_id, created_at desc);
create index if not exists leads_created_idx
  on public.leads (created_at desc);
create index if not exists leads_email_idx
  on public.leads (lower(email));

comment on table public.leads is
  'Customer leads captured by /api/contact, with server-side referral attribution. The email/webhook delivery path is unchanged; this table is an additional record, never a replacement.';

-- ------------------------------------------- sponsor attribution provenance

-- Phase 4A deliberately left partner_relationships without saying WHERE an
-- edge came from. Phase 4B records it, so a sponsor edge created by a referral
-- link is distinguishable from one created by an operator or an import.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'partner_relationships'
      and column_name = 'attribution_source'
  ) then
    alter table public.partner_relationships add column attribution_source text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'partner_relationships'
      and column_name = 'attribution_code'
  ) then
    alter table public.partner_relationships add column attribution_code text;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'partner_relationships_attribution_source_valid'
  ) then
    alter table public.partner_relationships
      add constraint partner_relationships_attribution_source_valid
      check (
        attribution_source is null
        or attribution_source in ('referral_link', 'operator', 'import')
      );
  end if;
end
$$;

-- The Phase 4A guard is re-declared (not replaced by a second trigger) with one
-- addition: attribution provenance is immutable once written, exactly like the
-- edge itself. Everything above the new block is unchanged Phase 4A behaviour.
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

    -- Phase 4B: how the sponsor was decided is part of the audit trail.
    if new.attribution_source is distinct from old.attribution_source
       or new.attribution_code is distinct from old.attribution_code then
      raise exception using
        errcode = 'restrict_violation',
        message = 'partner_relationships attribution is immutable once set';
    end if;
  end if;

  return new;
end;
$$;

-- ------------------------------------------------- attribute_partner_signup()
--
-- The single server-side entry point that may create a sponsor edge from a
-- referral. It is SECURITY DEFINER (so it can write partner_relationships and
-- partner_profiles regardless of the caller's RLS context) and its EXECUTE
-- privilege is granted to `service_role` ONLY — see the RLS half of this phase.
--
-- Consequences that matter for security:
--   * An authenticated partner calling PostgREST directly cannot run it at all
--     (`permission denied for function`), so a partner can never set or change
--     a sponsor from the client.
--   * A raw GoTrue signup (bypassing the app's Server Action) creates a partner
--     with NO sponsor: attribution is fail-closed.
--   * Every hostile input is rejected with a named status instead of an
--     exception, so callers log a reason rather than a crash.
--
-- Return values: attributed | already_attributed | invalid_code |
--                self_referral | no_target | stale_target | invalid_click
--
-- `stale_target` is the anti-abuse backstop for the "attribute an existing
-- account" attack: attribution is only ever applied to a partner record
-- created moments ago, so even a forged magic-link callback that claims to
-- come from a referral cannot attach a sponsor to an account that already
-- existed.
create or replace function public.attribute_partner_signup(
  p_partner_user_id uuid,
  p_referral_code text,
  p_click_id uuid default null
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_code text;
  v_target public.partner_profiles%rowtype;
  v_sponsor public.partner_profiles%rowtype;
  v_click_id uuid;
begin
  v_code := lower(nullif(btrim(coalesce(p_referral_code, '')), ''));

  -- The code format is re-checked here, not just in the app: this function is
  -- the security boundary and must not trust its caller.
  if v_code is null or v_code !~ '^[a-z0-9][a-z0-9_-]{3,31}$' then
    return 'invalid_code';
  end if;

  select * into v_target
    from public.partner_profiles pp
   where pp.user_id = p_partner_user_id;

  if not found then
    return 'no_target';
  end if;

  -- Attribution is a signup-time event. A partner record that already existed
  -- before this request is never attributed, which is what stops a forged
  -- callback (or a replayed cookie) from attaching a sponsor to an established
  -- account.
  if v_target.created_at < now() - interval '15 minutes' then
    return 'stale_target';
  end if;

  select * into v_sponsor
    from public.partner_profiles pp
   where pp.referral_code = v_code;

  -- Unknown code, or a suspended partner: no attribution either way.
  if not found or v_sponsor.status = 'suspended' then
    return 'invalid_code';
  end if;

  -- Self-referral, in both senses: the code resolving to the account being
  -- attributed, or to the same auth user.
  if v_sponsor.partner_id = v_target.partner_id
     or v_sponsor.user_id = v_target.user_id then
    return 'self_referral';
  end if;

  -- "One sponsor only" is enforced by a unique index; this is the friendly
  -- path that returns a status instead of raising.
  if v_target.sponsor_partner_id is not null
     or exists (
       select 1 from public.partner_relationships r
        where r.partner_id = v_target.partner_id
     ) then
    return 'already_attributed';
  end if;

  -- The click is provenance only. An unknown or foreign click id is not fatal
  -- — the attribution still stands — but it is never recorded as if it were
  -- this partner's click.
  if p_click_id is not null then
    select c.id into v_click_id
      from public.referral_clicks c
     where c.id = p_click_id
       and c.partner_id = v_sponsor.partner_id;

    if v_click_id is null then
      return 'invalid_click';
    end if;
  end if;

  insert into public.partner_relationships (
    sponsor_partner_id, partner_id, attribution_source, attribution_code
  )
  values (
    v_sponsor.partner_id, v_target.partner_id, 'referral_link', v_code
  );

  return 'attributed';
exception
  when unique_violation then
    -- Two concurrent signups with the same cookie: exactly one edge survives.
    return 'already_attributed';
end;
$$;

comment on function public.attribute_partner_signup(uuid, text, uuid) is
  'Server-only: attributes a newly provisioned partner to the last valid referral code. Rejects unknown/suspended sponsors, self-referral and duplicate edges. Executable by service_role only.';

-- ---------------------------------------------------- partner_referral_stats()
--
-- Phase 4A deliberately does not let a partner enumerate their downline. The
-- dashboard still needs real numbers, so this SECURITY DEFINER rollup returns
-- COUNTS ONLY for the calling partner — never another partner's rows, never a
-- row-level view of the network.
create or replace function public.partner_referral_stats()
returns table (clicks bigint, leads bigint, partner_signups bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select
    (
      select count(*) from public.referral_clicks c
       where c.partner_id = public.current_partner_id()
    ),
    (
      select count(*) from public.leads l
       where l.partner_id = public.current_partner_id()
    ),
    (
      select count(*) from public.partner_relationships r
       where r.sponsor_partner_id = public.current_partner_id()
    );
$$;

comment on function public.partner_referral_stats() is
  'Counts-only rollup (clicks, delivered leads, attributed partner signups) for the calling partner. Returns zeros for a caller with no partner record.';

-- ------------------------------------------------------------------- grants
--
-- `create function` grants EXECUTE to PUBLIC by default, so both functions are
-- revoked explicitly before the intended grant is added.

revoke all on function public.attribute_partner_signup(uuid, text, uuid) from public;
revoke all on function public.partner_referral_stats() from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on function public.attribute_partner_signup(uuid, text, uuid) from anon';
    execute 'revoke all on function public.partner_referral_stats() from anon';
  end if;

  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    -- The attribution RPC stays out of reach for every signed-in user; only
    -- the stats rollup is callable from a partner session.
    execute 'revoke all on function public.attribute_partner_signup(uuid, text, uuid) from authenticated';
    execute 'grant execute on function public.partner_referral_stats() to authenticated';
  end if;

  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.attribute_partner_signup(uuid, text, uuid) to service_role';
    execute 'grant execute on function public.partner_referral_stats() to service_role';
  end if;
end
$$;
