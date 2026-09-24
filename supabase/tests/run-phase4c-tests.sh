#!/usr/bin/env bash
# Phase 4C ledger verification. Applies every migration, including
# 20260922090800_phase4c_ledger.sql, to a throwaway database and checks the
# approved commission contract. Does not modify Phase 4A/4B assertions.
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"

TEST_DB="${AM_PHASE4C_DB:-am_phase4c_test}"
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
eq() {
  if [ "$OUT" = "$2" ]; then pass "$1"; else fail "$1" "expected [$2], got [$OUT]"; fi
}
expect_error() {
  run_sql "$3"
  if [ "$RC" -eq 0 ]; then
    fail "$1" "expected an error, statement succeeded with [$OUT]"
  elif [ -n "$2" ] && ! grep -qi -- "$2" <<<"$OUT"; then
    fail "$1" "expected error matching [$2], got: $OUT"
  else
    pass "$1"
  fi
}
as_user() {
  local uid="$1" body="$2"
  run_sql "set role authenticated; set request.jwt.claims = '{\"sub\":\"$uid\"}'; $body"
}
user_eq() {
  as_user "$2" "$4"
  if [ "$RC" -ne 0 ]; then fail "$1" "query failed: $OUT"; else eq "$1" "$3"; fi
}
user_error() {
  as_user "$2" "$4"
  if [ "$RC" -eq 0 ]; then
    fail "$1" "expected an error, got [$OUT]"
  elif [ -n "$3" ] && ! grep -qi -- "$3" <<<"$OUT"; then
    fail "$1" "expected error matching [$3], got: $OUT"
  else
    pass "$1"
  fi
}
svc() { run_sql "set role service_role; $1"; }
svc_eq() {
  svc "$3"
  if [ "$RC" -ne 0 ]; then fail "$1" "query failed: $OUT"; else eq "$1" "$2"; fi
}

section "Setup — apply migrations"

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

UID_TOP="11111111-1111-4111-8111-111111111111"
UID_L4="22222222-2222-4222-8222-222222222222"
UID_L3="33333333-3333-4333-8333-333333333333"
UID_L2="44444444-4444-4444-8444-444444444444"
UID_L1="55555555-5555-4555-8555-555555555555"
UID_EMPTY="66666666-6666-4666-8666-666666666666"
UID_ADMIN="77777777-7777-4777-8777-777777777777"

run_sql "
insert into auth.users (id, email, raw_user_meta_data) values
  ('$UID_TOP', 'top@example.test', '{\"full_name\":\"Top\"}'::jsonb),
  ('$UID_L4', 'l4@example.test', '{\"full_name\":\"L4\"}'::jsonb),
  ('$UID_L3', 'l3@example.test', '{\"full_name\":\"L3\"}'::jsonb),
  ('$UID_L2', 'l2@example.test', '{\"full_name\":\"L2\"}'::jsonb),
  ('$UID_L1', 'l1@example.test', '{\"full_name\":\"Seller\"}'::jsonb),
  ('$UID_EMPTY', 'empty@example.test', '{\"full_name\":\"Empty\"}'::jsonb),
  ('$UID_ADMIN', 'ops@example.test', '{\"full_name\":\"Ops\"}'::jsonb);
"
if [ "$RC" -ne 0 ]; then
  printf '%sSeeding users failed: %s%s\n' "$C_RED" "$OUT" "$C_OFF"; exit 1
fi

pid_of() { run_sql "select partner_id from public.partner_profiles where user_id = '$1'"; printf '%s' "$OUT"; }
PID_TOP="$(pid_of "$UID_TOP")"
PID_L4="$(pid_of "$UID_L4")"
PID_L3="$(pid_of "$UID_L3")"
PID_L2="$(pid_of "$UID_L2")"
PID_L1="$(pid_of "$UID_L1")"
PID_EMPTY="$(pid_of "$UID_EMPTY")"
CODE_L1="$(run_sql "select referral_code from public.partner_profiles where user_id = '$UID_L1'"; printf '%s' "$OUT")"

run_sql "
insert into public.partner_relationships (sponsor_partner_id, partner_id, attribution_source)
values
  ('$PID_TOP', '$PID_L4', 'operator'),
  ('$PID_L4', '$PID_L3', 'operator'),
  ('$PID_L3', '$PID_L2', 'operator'),
  ('$PID_L2', '$PID_L1', 'operator');
update public.partner_profiles
   set created_at = timestamptz '2026-01-01 00:00:00+00'
 where partner_id = '$PID_L1';
"
if [ "$RC" -ne 0 ]; then
  printf '%sChain setup failed: %s%s\n' "$C_RED" "$OUT" "$C_OFF"; exit 1
fi

section "Rules are seeded as numeric, not hardcoded in the engine"

run_sql "select string_agg(level::text || ':' || base_rate::text || ':' || launch_multiplier::text, ',' order by level)
         from public.commission_rules;"
eq "base rates 0.15/0.05/0.03/0.02/0.01 and multiplier 1.5" \
  "1:0.150000:1.500000,2:0.050000:1.500000,3:0.030000:1.500000,4:0.020000:1.500000,5:0.010000:1.500000"

section "Empty partner and non-sales"

user_eq "an empty partner ledger is real zeros" "$UID_EMPTY" "0|0.00|-|0" \
  "select qualifying_sales || '|' || commission_net || '|' || coalesce(currency, '-') || '|' || entry_count
     from public.partner_ledger_stats();"

CODE_EMPTY="$(run_sql "select referral_code from public.partner_profiles where partner_id = '$PID_EMPTY'"; printf '%s' "$OUT")"
run_sql "insert into public.referral_clicks (partner_id, referral_code, landing_path)
         values ('$PID_EMPTY', '$CODE_EMPTY', '/partners');
         insert into public.leads (partner_id, referral_code, referral_source, name, email, messenger, company, scenario)
         values ('$PID_EMPTY', '$CODE_EMPTY', 'referral', 'Ada', 'ada@example.test', '@ada', 'Ada Co', 'partner');"
if [ "$RC" -ne 0 ]; then fail "seed a click and a lead" "$OUT"; else pass "seed a click and a lead"; fi

user_eq "clicks and leads are not qualifying sales" "$UID_EMPTY" "0|0.00|-|0" \
  "select qualifying_sales || '|' || commission_net || '|' || coalesce(currency, '-') || '|' || entry_count
     from public.partner_ledger_stats();"

section "Base schedule on a paid \$1000 sale"

svc "select public.record_sale('invoice', 'ord-base', 'aime', 1000::numeric, 'USD', timestamptz '2026-05-01 00:00:00+00', null, '$PID_L1');"
if [ "$RC" -ne 0 ]; then fail "service_role records the base sale" "$OUT"; else BASE_SALE="$OUT"; pass "service_role records the base sale"; fi

svc_eq "qualifying the base sale returns the same id" "$BASE_SALE" \
  "select public.qualify_sale('$BASE_SALE');"
svc_eq "base sale posts five commission entries" "5" \
  "select public.post_commission_entries('$BASE_SALE');"
svc_eq "posting again does not create a second set" "5" \
  "select public.post_commission_entries('$BASE_SALE');"

run_sql "select string_agg(amount::text, ',' order by level)
           from public.commission_entries
          where sale_id = '$BASE_SALE' and commission_type = 'base';"
eq "base L1-L5 is 150, 50, 30, 20, 10" "150.00,50.00,30.00,20.00,10.00"

run_sql "select sum(amount)::numeric(20,2) from public.commission_entries where sale_id = '$BASE_SALE' and commission_type = 'base';"
eq "base pool is 260" "260.00"

run_sql "select string_agg(beneficiary_partner_id || ':' || level::text, ',' order by level)
           from public.commission_entries where sale_id = '$BASE_SALE' and commission_type = 'base';"
eq "L1-L5 beneficiaries come from partner_relationships" \
  "$PID_L1:1,$PID_L2:2,$PID_L3:3,$PID_L4:4,$PID_TOP:5"

run_sql "select count(*) from public.partner_relationships where confirmed_at is not null or locked_at is not null;"
eq "the sponsor edge is not locked or confirmed by the ledger" "0"

section "Launch window and recurring payments"

svc "select public.record_sale('invoice', 'ord-launch', 'aime', 1000::numeric, 'USD', timestamptz '2026-01-31 00:00:00+00', '$CODE_L1', null);"
if [ "$RC" -ne 0 ]; then fail "record launch sale by referral code" "$OUT"; else LAUNCH_SALE="$OUT"; pass "record launch sale by referral code"; fi
svc_eq "qualify launch sale" "$LAUNCH_SALE" "select public.qualify_sale('$LAUNCH_SALE');"
svc_eq "launch sale posts five entries" "5" "select public.post_commission_entries('$LAUNCH_SALE');"

run_sql "select string_agg(amount::text, ',' order by level)
           from public.commission_entries
          where sale_id = '$LAUNCH_SALE' and commission_type = 'launch';"
eq "launch L1-L5 is 225, 75, 45, 30, 15" "225.00,75.00,45.00,30.00,15.00"

run_sql "select sum(amount)::numeric(20,2) from public.commission_entries where sale_id = '$LAUNCH_SALE' and commission_type = 'launch';"
eq "launch pool is 390" "390.00"

run_sql "select partner_id from public.sales where id = '$LAUNCH_SALE';"
eq "referral code resolves server-side to the selling partner" "$PID_L1"

# Day 30 is inside 90; day 100 is base. Same partner, two payments.
svc "select public.record_sale('invoice', 'ord-rec-in', 'aime', 1000::numeric, 'USD', timestamptz '2026-01-01 00:00:00+00' + interval '30 days', null, '$PID_L1');"
REC_IN="$OUT"
svc "select public.qualify_sale('$REC_IN'); select public.post_commission_entries('$REC_IN');" >/dev/null
run_sql "select amount::text || ':' || commission_type from public.commission_entries where sale_id = '$REC_IN' and level = 1;"
eq "recurring payment inside 90 days is launch" "225.00:launch"

svc "select public.record_sale('invoice', 'ord-rec-out', 'aime', 1000::numeric, 'USD', timestamptz '2026-01-01 00:00:00+00' + interval '100 days', null, '$PID_L1');"
REC_OUT="$OUT"
svc "select public.qualify_sale('$REC_OUT'); select public.post_commission_entries('$REC_OUT');" >/dev/null
run_sql "select amount::text || ':' || commission_type from public.commission_entries where sale_id = '$REC_OUT' and level = 1;"
eq "recurring payment after 90 days is base" "150.00:base"

section "Refund and chargeback reverse without rewriting history"

svc "select public.record_sale('invoice', 'ord-refund', 'aime', 1000::numeric, 'USD', timestamptz '2026-06-01 00:00:00+00', null, '$PID_L1');"
REFUND_SALE="$OUT"
svc "select public.qualify_sale('$REFUND_SALE'); select public.post_commission_entries('$REFUND_SALE');" >/dev/null
ORIG="$(run_sql "select id::text || '|' || amount::text from public.commission_entries where sale_id = '$REFUND_SALE' and level = 1;"; printf '%s' "$OUT")"
ORIG_ID="${ORIG%%|*}"
ORIG_AMT="${ORIG##*|}"
svc_eq "refund inserts one reversal per original entry" "5" \
  "select public.reverse_sale_commissions('$REFUND_SALE', 'refund');"
svc_eq "a second refund does not insert a second reversal" "0" \
  "select public.reverse_sale_commissions('$REFUND_SALE', 'refund');"
run_sql "select amount::text from public.commission_entries where id = '$ORIG_ID';"
eq "the original refunded entry is unchanged" "$ORIG_AMT"
run_sql "select amount::text from public.commission_entries where reverses_entry_id = '$ORIG_ID';"
eq "the refund reversal is the negative amount" "-${ORIG_AMT}"
run_sql "select (confirmed_at is not null)::text || '|' || status from public.sales where id = '$REFUND_SALE';"
eq "refund keeps confirmed_at and marks the sale refunded" "true|refunded"

svc "select public.record_sale('invoice', 'ord-cb', 'aime', 1000::numeric, 'USD', timestamptz '2026-06-02 00:00:00+00', null, '$PID_L1');"
CB_SALE="$OUT"
svc "select public.qualify_sale('$CB_SALE'); select public.post_commission_entries('$CB_SALE');" >/dev/null
CB_ORIG="$(run_sql "select id from public.commission_entries where sale_id = '$CB_SALE' and level = 1;"; printf '%s' "$OUT")"
svc_eq "chargeback inserts reversals" "5" \
  "select public.reverse_sale_commissions('$CB_SALE', 'chargeback');"
run_sql "select amount::text from public.commission_entries where id = '$CB_ORIG';"
eq "the original chargeback entry is unchanged" "150.00"
run_sql "select status from public.sales where id = '$CB_SALE';"
eq "chargeback marks the sale" "chargeback"

section "Idempotent sale, failed payment, disagreed attribution"

svc_eq "duplicate sale returns the original id" "$BASE_SALE" \
  "select public.record_sale('invoice', 'ord-base', 'aime', 1000::numeric, 'USD', timestamptz '2026-05-01 00:00:00+00', null, '$PID_L1');"
run_sql "select count(*) from public.sales where source = 'invoice' and external_order_id = 'ord-base';"
eq "duplicate sale does not insert a second row" "1"
run_sql "select count(*) from public.commission_entries where sale_id = '$BASE_SALE' and commission_type = 'base';"
eq "duplicate sale does not create a second commission" "5"

expect_error "a zero amount is not a sale" "not a sale" \
  "set role service_role; select public.record_sale('invoice', 'ord-zero', 'aime', 0::numeric, 'USD', now(), null, '$PID_L1');"
expect_error "referral code and partner id must agree" "disagree" \
  "set role service_role; select public.record_sale('invoice', 'ord-mix', 'aime', 1000::numeric, 'USD', now(), '$CODE_L1', '$PID_L2');"

section "Lock, payout and duplicate allocation"

svc "select public.record_sale('invoice', 'ord-early', 'aime', 1000::numeric, 'USD', now() - interval '2 days', null, '$PID_L1');"
EARLY="$OUT"
svc "select public.qualify_sale('$EARLY'); select public.post_commission_entries('$EARLY');" >/dev/null
svc_eq "a sale younger than 14 days is not locked" "0" \
  "select public.advance_sponsor_lock('$EARLY');"
run_sql "select status || '|' || (locked_at is null)::text from public.sales where id = '$EARLY';"
eq "early sale stays confirmed with no locked_at" "confirmed|true"
run_sql "select count(*) from public.commission_entries where sale_id = '$EARLY' and status = 'payable';"
eq "unlocked commission is not payable" "0"

svc "select public.record_sale('invoice', 'ord-lock', 'aime', 1000::numeric, 'USD', now() - interval '20 days', null, '$PID_L1');"
LOCK_SALE="$OUT"
svc "select public.qualify_sale('$LOCK_SALE'); select public.post_commission_entries('$LOCK_SALE');" >/dev/null
expect_error "payable payout is refused before the lock" "no payable" \
  "set role service_role; select public.create_payout('$PID_L1', 'USD', '$UID_ADMIN');"
svc_eq "a sale at least 14 days after confirmation locks" "1" \
  "select public.advance_sponsor_lock('$LOCK_SALE');"
run_sql "select count(*) from public.commission_entries where sale_id = '$LOCK_SALE' and status = 'payable';"
eq "locked entries become payable" "5"
run_sql "select count(*) from public.partner_relationships where locked_at is not null;"
eq "advance_sponsor_lock does not write the sponsor edge" "0"

svc "select public.create_payout('$PID_L1', 'USD', '$UID_ADMIN');"
if [ "$RC" -ne 0 ]; then fail "service_role creates a payout" "$OUT"; else PAYOUT="$OUT"; pass "service_role creates a payout"; fi
run_sql "select count(*) from public.payout_allocations where payout_id = '$PAYOUT';"
eq "payout allocates the seller payable entries in USD" "1"
run_sql "select amount::text from public.payouts where id = '$PAYOUT';"
eq "payout amount is the allocated commission" "150.00"

run_sql "select id from public.commission_entries where sale_id = '$LOCK_SALE' and level = 1;"
LOCK_ENTRY="$OUT"
expect_error "duplicate payout allocation is rejected" "already in an active payout" \
  "set role service_role;
   insert into public.payouts (id, partner_id, status, currency, amount, created_by)
   values ('99999999-9999-4999-8999-999999999999', '$PID_L1', 'open', 'USD', 0, '$UID_ADMIN');
   insert into public.payout_allocations (payout_id, commission_entry_id, allocated_amount)
   values ('99999999-9999-4999-8999-999999999999', '$LOCK_ENTRY', 150.00);"

svc_eq "confirming the payout marks it paid" "$PAYOUT" \
  "select public.confirm_payout('$PAYOUT', '$UID_ADMIN');"
run_sql "select status from public.commission_entries where id = '$LOCK_ENTRY';"
eq "confirmed payout marks the entry paid" "paid"
svc_eq "confirming the payout again is a no-op" "$PAYOUT" \
  "select public.confirm_payout('$PAYOUT', '$UID_ADMIN');"

section "Client cannot write the ledger"

user_error "a partner cannot insert a sale" "$UID_L1" "permission denied" \
  "insert into public.sales (source, external_order_id, partner_id, amount, currency, paid_at)
   values ('invoice', 'ord-hack', '$PID_L1', 1000, 'USD', now());"
user_error "a partner cannot insert a commission" "$UID_L1" "permission denied" \
  "insert into public.commission_entries (sale_id, beneficiary_partner_id, level, commission_type, base_amount, rate, amount, currency, status)
   values ('$BASE_SALE', '$PID_L1', 1, 'base', 1000, 0.15, 150, 'USD', 'confirmed');"
user_error "a partner cannot insert a payout" "$UID_L1" "permission denied" \
  "insert into public.payouts (partner_id, status, currency, amount, created_by)
   values ('$PID_L1', 'open', 'USD', 1, '$UID_L1');"
user_error "a partner cannot call record_sale" "$UID_L1" "permission denied" \
  "select public.record_sale('invoice', 'ord-hack-2', 'aime', 1000::numeric, 'USD', now(), null, '$PID_L1');"

run_sql "set role anon; insert into public.sales (source, external_order_id, partner_id, amount, currency, paid_at)
         values ('invoice', 'ord-anon', '$PID_L1', 1000, 'USD', now());"
if [ "$RC" -ne 0 ] && grep -qi "permission denied" <<<"$OUT"; then
  pass "anon cannot insert a sale"
else
  fail "anon cannot insert a sale" "rc=$RC out=$OUT"
fi

run_sql "set role service_role; select has_table_privilege('service_role', 'public.sales', 'INSERT')
  and has_table_privilege('service_role', 'public.commission_entries', 'INSERT')
  and has_table_privilege('service_role', 'public.payouts', 'INSERT');"
eq "service_role can mutate sales, commissions and payouts" "t"

user_eq "seller ledger reports the qualifying sales, not the click" "$UID_L1" "6" \
  "select qualifying_sales::text from public.partner_ledger_stats();"

printf '\n%s%d passed, %d failed%s\n' "$C_BOLD" "$PASSES" "$FAILURES" "$C_OFF"
if [ "$FAILURES" -gt 0 ]; then
  printf '%sPhase 4C ledger verification FAILED%s\n' "$C_RED" "$C_OFF"
  exit 1
fi
printf '%sPhase 4C ledger verification passed%s\n' "$C_GREEN" "$C_OFF"
