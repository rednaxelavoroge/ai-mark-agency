# Partner Commission Model v2

STATUS = OWNER APPROVED (fixed contract)

This is the active economic contract for the AI MARK Partner Platform.
Runtime posting reads `public.commission_rules` on the server. Published copy
and tests share the same numbers via `lib/partner/commission-model.ts`.
Clients never send rates, levels, or amounts used as a commission rate.

Phase 4C operational rules (qualifying sale, 14-day hold, reversals, payouts,
RLS, idempotency) remain in `docs/phase-4c-contract.md`. This file replaces
only the rate schedule and the launch-multiplier behaviour.

## Commissionable amount

`commissionableAmount` is `sales.amount`: the amount collected on a qualifying
paid sale or invoice.

- Do not deduct cost, salaries, AI/API, or infrastructure.
- Exclude VAT, sales tax, refunds, and chargebacks at recording time.
- A cancelled or unsuccessful payment is not a sale.
- `referral_clicks` and `leads` are not sales.

The v2 change is the **rate schedule**, not a new base. Formula:

```
commission(level) = round(commissionableAmount × levelRate, 2)
sum(commission(L1…L5)) ≤ commissionableAmount × 0.80
```

Money is PostgreSQL `numeric` on the ledger and integer minor units (cents) in
TypeScript. No IEEE float arithmetic.

## Active rates (v2)

| Level | Rate | Role |
| --- | ---: | --- |
| L1 | 50% | Direct sale |
| L2 | 15% | First network |
| L3 | 7% | Extended network |
| L4 | 5% | Market depth |
| L5 | 3% | Maximum depth |
| **Partner pool** | **80%** | Aggregate across qualified levels |
| **AI Mark retained share** | **20%** | Share of commissionable amount |

`PARTNER_POOL_CAP = 80%`. AI Mark retained share is **20% of the commissionable
amount**. It is not described as net profit.

Effective from `2026-09-27 00:00:00+00` (`V2_EFFECTIVE_FROM`).

## $1,000 example (full five-level network)

Commissionable sale = $1,000.

| Recipient | Amount |
| --- | ---: |
| L1 | $500 |
| L2 | $150 |
| L3 | $70 |
| L4 | $50 |
| L5 | $30 |
| Partner pool | $800 |
| AI Mark retained share | $200 |

The direct (L1) partner receives **$500, not $800**. Marketing must say
“up to 80% total partner rewards across the network” / «До 80% партнёрского
вознаграждения». Never imply that one L1 partner is paid the whole pool.

Missing, suspended, or circular upline levels are skipped. The pool on that
sale is then **less than** 80%. It must never be more.

## Launch period

The 90-day window from `partner_profiles.created_at` compared with
`sales.paid_at` remains a **ledger status flag** (`commission_type = 'launch'`
vs `'base'`).

Launch status **is not a commission multiplier**. The engine uses
`commission_rules.base_rate` only. `launch_multiplier` on v2 rows is `1.0`.
Historical v1 rows may still store `1.5`; the poster ignores that column.

Forbidden: any path that can produce Partner Pool > 80% on one commissionable
sale (including `80% × 1.5 = 120%`).

## Historical data safety

Append-only ledger. Finalized commissions and paid payouts are **not rewritten**.

| State | Migration |
| --- | --- |
| Paid payout / paid commission | Untouched. Amounts stay as posted under the rule in force at `paid_at`. |
| Payable / confirmed (pending) | Untouched. Already-posted rows keep original `rate` and `amount` until paid or reversed. |
| New posts after v2 | `sales.paid_at` selects the active rule version. `paid_at >= V2_EFFECTIVE_FROM` → v2. |
| v1 `commission_rules` | Closed with `active_to = V2_EFFECTIVE_FROM`. Not deleted. |
| v1 launch 1.5× entries already posted | Remain in history. New posts never apply 1.5×, even inside the 90-day flag. |

v1 schedule (historical only): L1 15% / L2 5% / L3 3% / L4 2% / L5 1% (pool 26%).
A stored `launch_multiplier` of 1.5 on those closed rows is documentation of the
old contract, not an active multiplier.

## Refund, chargeback, payout

Unchanged from Phase 4C:

- Refund / chargeback / cancellation inserts a `reversal` row with the negative
  of the original amount and a link to the original entry. The original amount
  is immutable.
- Commission stays `confirmed` for 14 days after `confirmed_at`, then `payable`
  after `advance_sponsor_lock`.
- `create_payout` allocates payable entries. One commission entry cannot sit in
  two active non-void payouts. `confirm_payout` marks entries `paid`.
- Payout cannot exceed allocated payable commission. Negative balances are not
  invented: reversals are separate rows.

## Security

- Server-side rates only. `post_commission_entries` does not take a rate
  argument. Partners and anon cannot insert sales, commissions, or payouts.
- Referral graph is `partner_relationships`. Circular walks are cut with a
  `seen` array. Self-sponsor assignment is not a client write.
- Pool invariant: posted `sum(amount)` must be `<= round(sales.amount * 0.80, 2)`.
- v2 rule rows cannot store `launch_multiplier <> 1`. A version whose
  `sum(base_rate)` would exceed 80% is rejected.

## Classification of old economics strings

| Kind | Treatment |
| --- | --- |
| ACTIVE | v2 rates only. Public `/partners`, dashboard, chat knowledge, partner terms, engine, tests of current posts. |
| HISTORICAL | Original `20260922090800_phase4c_ledger.sql` seed; closed `commission_rules`; already-posted `commission_entries`; this document's v1 section. |
| DOC | This file and the updated Phase 4C contract. |
| FIXTURE / TEST | Phase 4C suite keeps v1-dated sales at 15/5/3/2/1 **without** 1.5×; v2-dated sales at 50/15/7/5/3. |
| LEGACY | Launch multiplier 1.5 as an active rate path — removed. |

## Source files

- TypeScript SSOT: `lib/partner/commission-model.ts`
- Ledger migration: `supabase/migrations/20260927170000_partner_commission_model_v2.sql`
- Poster: `public.post_commission_entries(uuid)`
- Published terms: `content/partner-program.ts`
- Public page: `app/[locale]/partners/page.tsx`
- Dashboard card: `components/platform/CommissionScheduleCard.tsx`
