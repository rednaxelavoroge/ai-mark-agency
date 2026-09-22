#!/usr/bin/env bash
# ============================================================================
# Partner Platform — RLS, immutability, provisioning and referral verification.
#
# Applies supabase/migrations/*.sql verbatim to a throwaway local PostgreSQL
# database (with the Supabase-compat shim in 00_auth_shim.sql providing
# auth.users / auth.uid() / anon / authenticated / service_role) and then
# asserts every security property the brief asks for:
#
#   * a partner sees only their own profile, partner profile, status history,
#     referral clicks and attributed leads — and never another partner's;
#   * a partner cannot grant themselves admin, or edit platform-owned fields;
#   * anonymous callers have no reachable data at all;
#   * admin has full access;
#   * the sponsor edge is immutable and single-valued;
#   * signup provisioning populates profiles / partner_profiles / user_roles;
#   * Phase 4B — attribution is server-only: the sponsor edge is created by
#     public.attribute_partner_signup() (service_role only), which refuses
#     unknown, suspended, malformed, self- and duplicate sponsors, and never
#     attributes an account that already existed;
#   * Phase 4B — client-supplied signup metadata cannot create a sponsor, and
#     the counts-only stats rollup exposes numbers without exposing rows.
#
# Usage:  bash supabase/tests/run-rls-tests.sh
# Env:    AM_TEST_DB (default am_phase4a_test), AM_MAINT_DB (default postgres)
#
# Exits non-zero if any assertion fails.
# ============================================================================
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"

TEST_DB="${AM_TEST_DB:-am_phase4a_test}"
MAINT_DB="${AM_MAINT_DB:-postgres}"

PSQL_BASE=(psql -X -q --no-psqlrc -v ON_ERROR_STOP=1)

if [ -t 1 ]; then
  C_GREEN=$'\033[32m'; C_RED=$'\033[31m'; C_BOLD=$'\033[1m'; C_DIM=$'\033[2m'; C_OFF=$'\033[0m'
else
  C_GREEN=""; C_RED=""; C_BOLD=""; C_DIM=""; C_OFF=""
fi

PASSES=0
FAILURES=0

pass() { PASSES=$((PASSES + 1)); printf '  %sPASS%s %s\n' "$C_GREEN" "$C_OFF" "$1"; }
fail() {
  FAILURES=$((FAILURES + 1))
  printf '  %sFAIL%s %s\n' "$C_RED" "$C_OFF" "$1"
  [ -n "${2:-}" ] && printf '       %s%s%s\n' "$C_DIM" "$2" "$C_OFF"
}
section() { printf '\n%s%s%s\n' "$C_BOLD" "$1" "$C_OFF"; }

OUT=""
RC=0
run_sql() {
  OUT="$("${PSQL_BASE[@]}" -d "$TEST_DB" -A -t -c "$1" 2>&1)"
  RC=$?
}

# --- assertion helpers ------------------------------------------------------

eq() { # label expected
  if [ "$OUT" = "$2" ]; then pass "$1"; else fail "$1" "expected [$2], got [$OUT]"; fi
}

expect_value() { # label expected value
  if [ "$3" = "$2" ]; then pass "$1"; else fail "$1" "expected [$2], got [$3]"; fi
}

expect_error() { # label needle sql
  run_sql "$3"
  if [ "$RC" -eq 0 ]; then
    fail "$1" "expected an error, statement succeeded with [$OUT]"
  elif [ -n "$2" ] && ! grep -qi -- "$2" <<<"$OUT"; then
    fail "$1" "expected error matching [$2], got: $OUT"
  else
    pass "$1"
  fi
}

# Run a statement as an authenticated session holding the given JWT subject.
# An empty uid means "authenticated but with no session claims".
as_user() {
  local uid="$1" body="$2" sql
  if [ -n "$uid" ]; then
    sql="set role authenticated; set request.jwt.claims = '{\"sub\":\"$uid\"}'; $body"
  else
    sql="set role authenticated; $body"
  fi
  run_sql "$sql"
}

user_eq() { # label uid expected sql
  as_user "$2" "$4"
  if [ "$RC" -ne 0 ]; then fail "$1" "query failed: $OUT"; else eq "$1" "$3"; fi
}

user_error() { # label uid needle sql
  as_user "$2" "$4"
  if [ "$RC" -eq 0 ]; then
    fail "$1" "expected an error, got [$OUT]"
  elif [ -n "$3" ] && ! grep -qi -- "$3" <<<"$OUT"; then
    fail "$1" "expected error matching [$3], got: $OUT"
  else
    pass "$1"
  fi
}

# ---------------------------------------------------------------------------
# 1. Build a throwaway database and apply the real migrations verbatim.
# ---------------------------------------------------------------------------
section "Setup — apply migrations to a throwaway database"

"${PSQL_BASE[@]}" -d "$MAINT_DB" -c "drop database if exists $TEST_DB with (force);" >/dev/null 2>&1
if ! "${PSQL_BASE[@]}" -d "$MAINT_DB" -c "create database $TEST_DB;" >/dev/null 2>&1; then
  printf '%sCannot create test database %s.%s\n' "$C_RED" "$TEST_DB" "$C_OFF"
  exit 1
fi

"${PSQL_BASE[@]}" -d "$TEST_DB" -f "$HERE/00_auth_shim.sql" >/dev/null || {
  printf '%sFailed to apply the auth shim.%s\n' "$C_RED" "$C_OFF"; exit 1; }

for migration in "$ROOT"/supabase/migrations/*.sql; do
  if ! "${PSQL_BASE[@]}" -d "$TEST_DB" -f "$migration" >/dev/null; then
    printf '%sMigration failed: %s%s\n' "$C_RED" "$(basename "$migration")" "$C_OFF"
    exit 1
  fi
  printf '  %sapplied%s %s\n' "$C_GREEN" "$C_OFF" "$(basename "$migration")"
done

UID_A="11111111-1111-1111-1111-111111111111"
UID_B="22222222-2222-2222-2222-222222222222"
UID_ADMIN="33333333-3333-3333-3333-333333333333"
UID_D="44444444-4444-4444-4444-444444444444"

run_sql "
insert into auth.users (id, email, raw_user_meta_data) values
  ('$UID_A', 'partner-a@example.test', '{\"full_name\":\"Partner A\",\"language\":\"en\"}'::jsonb),
  ('$UID_B', 'partner-b@example.test', '{\"full_name\":\"Partner B\",\"language\":\"ru\"}'::jsonb),
  ('$UID_ADMIN', 'admin@example.test', '{\"full_name\":\"Admin\"}'::jsonb),
  ('$UID_D', 'partner-d@example.test',
    jsonb_build_object('full_name', repeat('x', 300), 'language', 'this-is-a-very-long-language-tag'));
"
if [ "$RC" -ne 0 ]; then
  printf '%sSeeding auth.users failed: %s%s\n' "$C_RED" "$OUT" "$C_OFF"; exit 1
fi

# Promote the operator-granted admin. This is the "no hardcoded admin email"
# bootstrap: a role row, not a constant in the codebase.
run_sql "insert into public.user_roles (user_id, role) values ('$UID_ADMIN', 'admin');"

PID_A="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_A'"; printf '%s' "$OUT")"
PID_B="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_B'"; printf '%s' "$OUT")"
PID_D="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_D'"; printf '%s' "$OUT")"
CODE_A="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_A'"; printf '%s' "$OUT")"

# ---------------------------------------------------------------------------
# 2. Schema-level guards
# ---------------------------------------------------------------------------
section "Schema — RLS enabled everywhere, no blanket policy"

run_sql "select count(*) from pg_class c join pg_namespace n on n.oid = c.relnamespace
         where n.nspname = 'public'
           and c.relname in ('profiles','partner_profiles','partner_relationships','partner_status_history','user_roles','referral_clicks','leads')
           and c.relrowsecurity;"
eq "all seven tables have row level security enabled" "7"

run_sql "select count(*) from pg_policies
         where schemaname = 'public' and (qual = 'true' or with_check = 'true');"
eq "no permissive 'using (true)' policy exists" "0"

# No policy may be granted to PUBLIC (which would include anon): every policy
# scopes itself to `authenticated`.
run_sql "select count(*) from pg_policies
         where schemaname = 'public'
           and tablename in ('profiles','partner_profiles','partner_relationships','partner_status_history','user_roles','referral_clicks','leads')
           and array_to_string(roles, ',') <> 'authenticated';"
eq "every policy is scoped to authenticated only (never PUBLIC/anon)" "0"

run_sql "select count(*) from pg_policies
         where schemaname = 'public'
           and tablename in ('profiles','partner_profiles','partner_relationships','partner_status_history','user_roles','referral_clicks','leads');"
eq "all 22 expected policies exist" "22"

# Every write policy on the four platform-owned tables must route through
# is_admin(). pg_get_expr omits the schema prefix, hence the plain name.
run_sql "select count(*) from pg_policies
         where schemaname = 'public'
           and tablename in ('partner_profiles','partner_relationships','partner_status_history','user_roles')
           and cmd in ('INSERT','UPDATE','DELETE')
           and coalesce(qual, with_check) not like '%is_admin()%';"
eq "platform-owned tables only accept writes from an admin" "0"

# ---------------------------------------------------------------------------
# 3. Provisioning (signup -> profiles + partner profile + role)
# ---------------------------------------------------------------------------
section "Provisioning — every signup becomes a partner"

run_sql "select count(*) from public.profiles;"
eq "profiles row created per auth user (4)" "4"

run_sql "select count(*) from public.partner_profiles;"
eq "partner_profiles row created per auth user (4)" "4"

run_sql "select count(*) from public.partner_profiles where partner_id !~ '^AM-[0-9]{6}\$';"
eq "every partner_id matches AM-######" "0"

run_sql "select count(*) from public.partner_profiles where referral_code !~ '^[a-z0-9]{8}\$';"
eq "every referral_code is 8 url-safe characters" "0"

run_sql "select count(distinct referral_code) = count(*) from public.partner_profiles;"
eq "referral codes are unique" "t"

run_sql "select count(*) from public.partner_profiles where status <> 'partner';"
eq "new partners start in status 'partner'" "0"

run_sql "select count(*) from public.user_roles where role = 'partner';"
eq "every new user holds the partner role" "4"

run_sql "select count(*) from public.partner_status_history where old_status is null and new_status = 'partner';"
eq "initial status is recorded in the history" "4"

run_sql "select full_name || '|' || language from public.profiles where id = '$UID_A';"
eq "full_name and language come from signup metadata" "Partner A|en"

run_sql "select language from public.profiles where id = '$UID_B';"
eq "a non-default signup language is preserved" "ru"

run_sql "select language from public.profiles where id = '$UID_ADMIN';"
eq "language falls back to 'en' when metadata omits it" "en"

run_sql "select language || '|' || char_length(full_name) from public.profiles where id = '$UID_D';"
eq "hostile metadata is sanitised, not fatal (en|120)" "en|120"

# ---------------------------------------------------------------------------
# 4. Partner isolation — reads
# ---------------------------------------------------------------------------
section "Partner isolation — a partner reads only their own rows"

user_eq "partner sees exactly one profile" "$UID_A" "1" \
  "select count(*) from public.profiles;"
user_eq "partner sees exactly one partner_profile" "$UID_A" "1" \
  "select count(*) from public.partner_profiles;"
user_eq "partner sees exactly one status_history row" "$UID_A" "1" \
  "select count(*) from public.partner_status_history;"
user_eq "partner sees only their own role rows" "$UID_A" "1" \
  "select count(*) from public.user_roles;"
user_eq "partner cannot read another partner's profile" "$UID_A" "0" \
  "select count(*) from public.profiles where id = '$UID_B';"
user_eq "partner cannot read another partner's partner_profile" "$UID_A" "0" \
  "select count(*) from public.partner_profiles where user_id = '$UID_B';"
user_eq "the visible partner_profile is the caller's own" "$UID_A" "$PID_A" \
  "select partner_id from public.partner_profiles;"
user_eq "the visible referral code is the caller's own" "$UID_A" "$CODE_A" \
  "select referral_code from public.partner_profiles;"
user_eq "partner cannot read another partner's status history" "$UID_A" "0" \
  "select count(*) from public.partner_status_history where partner_id = '$PID_B';"
user_eq "partner sees no admin role rows" "$UID_A" "0" \
  "select count(*) from public.user_roles where role = 'admin';"
user_eq "is_admin() is false for a partner" "$UID_A" "f" \
  "select public.is_admin();"
user_eq "an authenticated session with no claims reads nothing" "" "0" \
  "select count(*) from public.profiles;"

# ---------------------------------------------------------------------------
# 5. Partner isolation — writes and privilege escalation
# ---------------------------------------------------------------------------
section "Partner isolation — writes are refused"

user_eq "partner cannot edit their own partner_profile status" "$UID_A" "0" \
  "with u as (update public.partner_profiles set status = 'strategic' returning 1) select count(*) from u;"
user_eq "partner cannot change their own referral_code" "$UID_A" "0" \
  "with u as (update public.partner_profiles set referral_code = 'hijacked' returning 1) select count(*) from u;"
user_eq "partner cannot move their own status history" "$UID_A" "0" \
  "with u as (update public.partner_status_history set reason = 'tampered' returning 1) select count(*) from u;"
user_eq "partner cannot delete their profile" "$UID_A" "0" \
  "with d as (delete from public.profiles returning 1) select count(*) from d;"
user_eq "partner cannot delete their status history" "$UID_A" "0" \
  "with d as (delete from public.partner_status_history returning 1) select count(*) from d;"

user_error "partner cannot insert a partner_profile" "$UID_A" "row-level security" \
  "insert into public.partner_profiles (user_id, partner_id, referral_code) values ('$UID_A', 'AM-999999', 'sneaky99');"
user_error "partner cannot insert a sponsor relationship" "$UID_A" "row-level security" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('$PID_A', '$PID_B');"
user_error "partner cannot grant themselves the admin role" "$UID_A" "row-level security" \
  "insert into public.user_roles (user_id, role) values ('$UID_A', 'admin');"
user_eq "partner cannot promote an existing role row to admin" "$UID_A" "0" \
  "with u as (update public.user_roles set role = 'admin' returning 1) select count(*) from u;"
user_error "partner cannot forge a status history entry" "$UID_A" "row-level security" \
  "insert into public.partner_status_history (partner_id, old_status, new_status) values ('$PID_A', 'partner', 'strategic');"

user_eq "partner may edit their own profile fields" "$UID_A" "1" \
  "with u as (update public.profiles set full_name = 'Partner A Renamed' returning 1) select count(*) from u;"
user_eq "the partner's own edit is persisted" "$UID_A" "Partner A Renamed" \
  "select full_name from public.profiles;"
user_error "partner cannot rewrite their own email mirror" "$UID_A" "cannot be changed here" \
  "update public.profiles set email = 'attacker@example.test';"

# ---------------------------------------------------------------------------
# 6. Anonymous callers
# ---------------------------------------------------------------------------
section "Anonymous — no reachable data"

run_sql "set role anon; select count(*) from public.profiles;"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon has no SELECT privilege on profiles"
else
  fail "anon has no SELECT privilege on profiles" "rc=$RC out=$OUT"
fi

run_sql "set role anon; select count(*) from public.partner_profiles;"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon has no SELECT privilege on partner_profiles"
else
  fail "anon has no SELECT privilege on partner_profiles" "rc=$RC out=$OUT"
fi

# ---------------------------------------------------------------------------
# 7. Admin — full access
# ---------------------------------------------------------------------------
section "Admin — full access"

user_eq "is_admin() is true for an admin" "$UID_ADMIN" "t" \
  "select public.is_admin();"
user_eq "admin sees every profile" "$UID_ADMIN" "4" \
  "select count(*) from public.profiles;"
user_eq "admin sees every partner_profile" "$UID_ADMIN" "4" \
  "select count(*) from public.partner_profiles;"
user_eq "admin sees every role row" "$UID_ADMIN" "5" \
  "select count(*) from public.user_roles;"
user_eq "admin may change a partner's status" "$UID_ADMIN" "1" \
  "with u as (update public.partner_profiles set status = 'growth' where partner_id = '$PID_B' returning 1) select count(*) from u;"
user_eq "the status change is audited automatically" "$UID_ADMIN" "1" \
  "select count(*) from public.partner_status_history where partner_id = '$PID_B' and old_status = 'partner' and new_status = 'growth';"
user_eq "the audit row records who changed it" "$UID_ADMIN" "1" \
  "select count(*) from public.partner_status_history where partner_id = '$PID_B' and changed_by = '$UID_ADMIN';"
user_eq "admin may create the sponsor edge" "$UID_ADMIN" "1" \
  "with i as (insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('$PID_A', '$PID_B') returning 1) select count(*) from i;"

# ---------------------------------------------------------------------------
# 8. Sponsor edge — single-valued, immutable, derived pointer
# ---------------------------------------------------------------------------
section "Sponsor edge — one sponsor, immutable, derived pointer"

run_sql "select sponsor_partner_id from public.partner_profiles where partner_id = '$PID_B';"
eq "the edge syncs partner_profiles.sponsor_partner_id" "$PID_A"

user_eq "the downline partner sees their own sponsor edge" "$UID_B" "1" \
  "select count(*) from public.partner_relationships;"
user_eq "the downline partner sees who their sponsor is" "$UID_B" "$PID_A" \
  "select sponsor_partner_id from public.partner_profiles;"
user_eq "a sponsor cannot enumerate their downline in Phase 4A" "$UID_A" "0" \
  "select count(*) from public.partner_relationships;"

expect_error "a partner cannot have two sponsors" "duplicate key" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('${PID_A}', '${PID_B}');"
expect_error "a partner cannot sponsor themselves" "cannot sponsor themselves" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('${PID_A}', '${PID_A}');"
expect_error "an unknown sponsor is rejected by the foreign key" "foreign key" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('AM-000000', '${PID_D}');"

expect_error "the sponsor edge cannot be rewritten" "immutable" \
  "update public.partner_relationships set sponsor_partner_id = '${PID_D}' where partner_id = '${PID_B}';"

run_sql "with u as (update public.partner_relationships set confirmed_at = now() where partner_id = '$PID_B' returning 1) select count(*) from u;"
eq "an admin may confirm the edge" "1"
expect_error "confirmed_at cannot be replayed" "immutable once set" \
  "update public.partner_relationships set confirmed_at = now() + interval '1 day' where partner_id = '${PID_B}';"
expect_error "a confirmed edge cannot be deleted" "cannot be deleted" \
  "delete from public.partner_relationships where partner_id = '${PID_B}';"
expect_error "locking requires confirmation first" "must be confirmed" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id, locked_at) values ('${PID_A}', '${PID_D}', now());"

expect_error "the derived pointer cannot be cleared directly" "immutable once set" \
  "update public.partner_profiles set sponsor_partner_id = null where partner_id = '${PID_B}';"
expect_error "the derived pointer must match a real edge" "must match a row" \
  "update public.partner_profiles set sponsor_partner_id = '${PID_A}' where partner_id = (select partner_id from public.partner_profiles where user_id = '$UID_D');"
expect_error "a partner_profile cannot be born with a sponsor pointer" "is derived" \
  "insert into public.partner_profiles (user_id, partner_id, referral_code, sponsor_partner_id) values ('$UID_D', 'AM-888888', 'newcode9', '${PID_A}');"

# ---------------------------------------------------------------------------
# 9. Database-level invariants
# ---------------------------------------------------------------------------
section "Database invariants"

expect_error "reserved referral codes are rejected" "reserved" \
  "insert into public.partner_profiles (user_id, partner_id, referral_code, status) values (gen_random_uuid(), 'AM-777777', 'admin', 'partner');"
expect_error "malformed partner_id is rejected" "partner_id_format" \
  "insert into public.partner_profiles (user_id, partner_id, referral_code, status) values (gen_random_uuid(), 'nope', 'goodcode', 'partner');"
expect_error "malformed referral_code is rejected" "referral_code_format" \
  "insert into public.partner_profiles (user_id, partner_id, referral_code, status) values (gen_random_uuid(), 'AM-666666', 'AB', 'partner');"

run_sql "select count(*) from public.partner_profiles where partner_id = '$PID_A' and referral_code = '$CODE_A';"
eq "partner identity survived every rejected write" "1"

# ---------------------------------------------------------------------------
# 10. service_role — what the Supabase SECRET key resolves to
#
# Postgres checks table GRANTs before it applies RLS, so a role with BYPASSRLS
# still fails with "permission denied" when the grant is missing. That failure
# would only appear against a real project, so it is asserted here.
# ---------------------------------------------------------------------------
section "service_role — the secret key reaches every table"

for table in profiles partner_profiles partner_relationships partner_status_history user_roles referral_clicks leads; do
  run_sql "set role service_role; select count(*) from public.$table;"
  if [ "$RC" -eq 0 ]; then
    pass "service_role can read $table (grant present)"
  else
    fail "service_role can read $table" "$OUT"
  fi
done

run_sql "set role service_role; select count(*) from public.profiles;"
eq "service_role is not filtered by RLS (sees every account)" "4"

run_sql "select count(*) from public.profiles;"
eq "the same query as superuser agrees" "4"

run_sql "set role service_role; with i as (insert into public.user_roles (user_id, role) values ('$UID_D', 'admin') returning 1) select count(*) from i;"
eq "service_role can grant a role (elevated write works)" "1"

run_sql "set role service_role; with d as (delete from public.user_roles where user_id = '$UID_D' and role = 'admin' returning 1) select count(*) from d;"
eq "service_role cleanup succeeds" "1"

run_sql "set role service_role; select public.generate_partner_id() ~ '^AM-[0-9]{6}\$';"
eq "service_role can execute the Partner ID generator" "t"

run_sql "select count(*) from public.user_roles where user_id = '$UID_D' and role = 'admin';"
eq "no admin role was left behind by the elevated test" "0"

# ---------------------------------------------------------------------------
# 11. Phase 4B — the referral attribution engine
#
# The tables, the server-only attribution RPC and the counts-only rollup. The
# rules under test:
#   * a member of the public can never write attribution data;
#   * a partner can never set, change or forge their own sponsor;
#   * "last valid referral" attribution happens once, server-side;
#   * unknown, suspended, malformed, self- and duplicate sponsors are refused.
# ---------------------------------------------------------------------------
section "Phase 4B — attribution tables: RLS, grants and isolation"

# The attribution tables are read by their owner and written only by the
# server. There is a SELECT policy and deliberately no write policy at all.
run_sql "select count(*) from pg_policies
         where schemaname = 'public'
           and tablename in ('referral_clicks','leads')
           and cmd in ('INSERT','UPDATE','DELETE');"
eq "the attribution tables accept no client writes at all" "0"

run_sql "select string_agg(distinct privilege_type, ',' order by privilege_type)
         from information_schema.role_table_grants
         where table_schema = 'public'
           and table_name in ('referral_clicks','leads')
           and grantee = 'authenticated';"
eq "authenticated holds SELECT only on the attribution tables" "SELECT"

run_sql "select count(*) from information_schema.role_table_grants
         where table_schema = 'public'
           and table_name in ('referral_clicks','leads')
           and grantee = 'anon';"
eq "anon holds no privilege on the attribution tables" "0"

PID_B="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_B'"; printf '%s' "$OUT")"
CODE_B="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_B'"; printf '%s' "$OUT")"

# Seed clicks and leads exactly the way the server does (as the table owner).
run_sql "
insert into public.referral_clicks (partner_id, referral_code, landing_path, utm_source, utm_medium, utm_campaign) values
  ('$PID_A', '$CODE_A', '/products', 'newsletter', 'email', 'phase-4b'),
  ('$PID_A', '$CODE_A', '/partners', null, null, null),
  ('$PID_B', '$CODE_B', '/', 'cta', 'social', 'launch');
insert into public.leads (partner_id, referral_code, referral_source, name, email, messenger, company, scenario) values
  ('$PID_A', '$CODE_A', 'referral', 'Lead A', 'lead-a@example.test', '@leada', 'Acme', 'idea'),
  ('$PID_B', '$CODE_B', 'referral', 'Lead B', 'lead-b@example.test', '@leadb', 'Beta', 'business'),
  (null, null, 'direct', 'Lead C', 'lead-c@example.test', '@leadc', 'Gamma', 'marketing');
"
if [ "$RC" -ne 0 ]; then fail "seed attribution rows" "$OUT"; fi

user_eq "a partner sees only their own clicks" "$UID_A" "2" \
  "select count(*) from public.referral_clicks;"
user_eq "a partner cannot see another partner's clicks" "$UID_A" "0" \
  "select count(*) from public.referral_clicks where partner_id = '$PID_B';"
user_eq "a partner sees only leads attributed to them" "$UID_A" "1" \
  "select count(*) from public.leads;"
user_eq "a partner cannot see an unattributed lead" "$UID_A" "0" \
  "select count(*) from public.leads where partner_id is null;"
user_eq "a partner cannot see another partner's leads" "$UID_A" "0" \
  "select count(*) from public.leads where partner_id = '$PID_B';"

user_error "a partner cannot insert a referral click" "$UID_A" "permission denied" \
  "insert into public.referral_clicks (partner_id, referral_code, landing_path) values ('$PID_A', '$CODE_A', '/');"
user_error "a partner cannot insert a lead" "$UID_A" "permission denied" \
  "insert into public.leads (name, email, messenger, company, scenario) values ('X', 'x@y.test', '@x', 'C', 'idea');"
user_error "a partner cannot edit a referral click" "$UID_A" "permission denied" \
  "update public.referral_clicks set landing_path = '/hijacked' where partner_id = '$PID_A';"
user_error "a partner cannot delete a lead" "$UID_A" "permission denied" \
  "delete from public.leads where partner_id = '$PID_A';"

run_sql "set role anon; select count(*) from public.referral_clicks;"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon has no SELECT privilege on referral_clicks"
else
  fail "anon has no SELECT privilege on referral_clicks" "rc=$RC out=$OUT"
fi

run_sql "set role anon; select count(*) from public.leads;"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon has no SELECT privilege on leads"
else
  fail "anon has no SELECT privilege on leads" "rc=$RC out=$OUT"
fi

section "Phase 4B — partner signup attribution is server-controlled"

UID_X="77777777-7777-7777-7777-777777777777"
UID_Y="88888888-8888-8888-8888-888888888888"
UID_Z="99999999-9999-9999-9999-999999999999"
UID_M="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"

run_sql "
insert into auth.users (id, email, raw_user_meta_data) values
  ('$UID_X', 'partner-x@example.test', '{\"full_name\":\"Partner X\"}'::jsonb),
  ('$UID_Y', 'partner-y@example.test', '{\"full_name\":\"Partner Y\"}'::jsonb),
  ('$UID_Z', 'partner-z@example.test', '{\"full_name\":\"Partner Z\"}'::jsonb),
  ('$UID_M', 'partner-m@example.test',
    jsonb_build_object(
      'full_name', 'Partner M',
      'sponsor_partner_id', '$PID_A',
      'referral_code', '$CODE_A'
    ));
"
if [ "$RC" -ne 0 ]; then fail "create the Phase 4B test partners" "$OUT"; fi

PID_X="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_X'"; printf '%s' "$OUT")"
PID_Y="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_Y'"; printf '%s' "$OUT")"
PID_Z="$(run_sql "select partner_id from public.partner_profiles where user_id = '$UID_Z'"; printf '%s' "$OUT")"
CODE_X="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_X'"; printf '%s' "$OUT")"
CODE_Y="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_Y'"; printf '%s' "$OUT")"
CODE_Z="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_Z'"; printf '%s' "$OUT")"

# A hostile signup that names its own sponsor through client-supplied metadata.
run_sql "select count(*) from public.partner_relationships r
         join public.partner_profiles pp on pp.partner_id = r.partner_id
         where pp.user_id = '$UID_M';"
eq "client-supplied signup metadata creates no sponsor edge" "0"
run_sql "select sponsor_partner_id is null from public.partner_profiles where user_id = '$UID_M';"
eq "a new partner is never born with a sponsor pointer" "t"

# Valid attribution.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_X', '$CODE_A', null);"
eq "service_role attributes a new partner to a valid referral code" "attributed"
run_sql "select sponsor_partner_id from public.partner_profiles where partner_id = '$PID_X';"
eq "the attributed edge syncs the sponsor pointer" "$PID_A"
run_sql "select attribution_source || '|' || attribution_code from public.partner_relationships where partner_id = '$PID_X';"
eq "the edge records how it was decided" "referral_link|$CODE_A"

# Duplicate relationship.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_X', '$CODE_A', null);"
eq "a second attribution attempt is refused" "already_attributed"
run_sql "select count(*) from public.partner_relationships where partner_id = '$PID_X';"
eq "the duplicate attempt created no second edge" "1"
run_sql "set role service_role; select public.attribute_partner_signup('$UID_X', '$CODE_Y', null);"
eq "an attributed partner cannot be moved to another sponsor" "already_attributed"

# Invalid sponsors.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', 'zzzzzzzz', null);"
eq "an unknown referral code is rejected" "invalid_code"
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', 'not a code', null);"
eq "a malformed referral code is rejected" "invalid_code"
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', 'admin', null);"
eq "a reserved referral code is rejected" "invalid_code"

# Self-referral.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', '$CODE_Y', null);"
eq "self-referral is rejected" "self_referral"
run_sql "select count(*) from public.partner_relationships where partner_id = '$PID_Y';"
eq "a rejected self-referral creates no edge" "0"

# A click id that belongs to a different partner is never recorded.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', '$CODE_A', gen_random_uuid());"
eq "a click id belonging to another partner is rejected" "invalid_click"

# A suspended sponsor can never attract new partners.
run_sql "update public.partner_profiles set status = 'suspended' where partner_id = '$PID_Z';"
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', '$CODE_Z', null);"
eq "a suspended sponsor cannot be attributed" "invalid_code"

# The happy path for a second partner.
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Y', '$CODE_X', null);"
eq "a second partner is attributed to another partner's code" "attributed"

# Unknown target account, and an account that already existed.
run_sql "set role service_role; select public.attribute_partner_signup('00000000-0000-0000-0000-000000000000', '$CODE_A', null);"
eq "an unknown target account is refused" "no_target"
run_sql "update public.partner_profiles set created_at = now() - interval '2 hours' where partner_id = '$PID_Z';"
run_sql "set role service_role; select public.attribute_partner_signup('$UID_Z', '$CODE_A', null);"
eq "an account older than the signup window cannot be attributed" "stale_target"

section "Phase 4B — no client can perform attribution"

user_error "a partner cannot execute the attribution RPC" "$UID_A" "permission denied" \
  "select public.attribute_partner_signup('$UID_Y', '$CODE_A', null);"
user_error "a partner with no sponsor record still cannot execute it" "$UID_D" "permission denied" \
  "select public.attribute_partner_signup('$UID_Y', '$CODE_A', null);"

run_sql "set role anon; select public.attribute_partner_signup('$UID_Y', '$CODE_A', null);"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon cannot execute the attribution RPC"
else
  fail "anon cannot execute the attribution RPC" "rc=$RC out=$OUT"
fi

user_eq "a partner cannot set their own sponsor pointer" "$UID_A" "0" \
  "with u as (update public.partner_profiles set sponsor_partner_id = '$PID_B' returning 1) select count(*) from u;"
user_error "a partner cannot create a sponsor edge for themselves" "$UID_A" "row-level security" \
  "insert into public.partner_relationships (sponsor_partner_id, partner_id) values ('$PID_B', '$PID_A');"
expect_error "attribution provenance cannot be rewritten" "immutable" \
  "update public.partner_relationships set attribution_code = 'hijacked' where partner_id = '$PID_X';"

section "Phase 4B — partner referral stats (counts only)"

# PID_A: two clicks, one lead, and two sponsored partners — the Phase 4A edge
# to B plus X, who was attributed to A's own code in Phase 4B.
user_eq "the rollup returns the caller's real counts" "$UID_A" "2|1|2" \
  "select clicks || '|' || leads || '|' || partner_signups from public.partner_referral_stats();"
user_eq "a partner with no activity sees honest zeros" "$UID_Z" "0|0|0" \
  "select clicks || '|' || leads || '|' || partner_signups from public.partner_referral_stats();"

# The counts are visible, the rows are not: Phase 4A's "a sponsor cannot
# enumerate their downline" still holds.
user_eq "the rollup counts a downline the sponsor cannot enumerate" "$UID_A" "0" \
  "select count(*) from public.partner_relationships;"

run_sql "set role anon; select * from public.partner_referral_stats();"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon cannot call the stats rollup"
else
  fail "anon cannot call the stats rollup" "rc=$RC out=$OUT"
fi

run_sql "set role service_role; select clicks || '|' || leads || '|' || partner_signups from public.partner_referral_stats();"
eq "service_role can call the rollup for its own (absent) partner record" "0|0|0"

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
printf '\n%s%d passed, %d failed%s\n' "$C_BOLD" "$PASSES" "$FAILURES" "$C_OFF"
if [ "$FAILURES" -gt 0 ]; then
  printf '%sRLS verification FAILED%s\n' "$C_RED" "$C_OFF"
  exit 1
fi
printf '%sRLS verification passed%s\n' "$C_GREEN" "$C_OFF"
