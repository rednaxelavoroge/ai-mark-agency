# Partner Network infrastructure audit

Date: 2026-09-26  
Repo: `rednaxelavoroge/ai-mark-agency`  
Live: https://ai-mark.agency  
Base: `origin/main`  
This document is the audit artifact. Economic parameters, L1–L5 rates, launch multiplier, 14-day hold, payout/reversal rules, Capital Partner, Legal/Trust Pack, and public product prices were not changed.

## 1. Executive summary

Referral identity, click tracking, contact-form leads, sponsor edges, qualifying sales, L1–L5 ledger entries, and a partner cabinet already exist in production. What the public `/partners` page listed as “infrastructure” was only partly wired into the cabinet: there was no place that said *where* a partner gets demos, presentations, marketing files, product knowledge, or support.

This branch does not invent banners, slide decks, or demo tenants. It turns `/partner/resources` into a Partner Hub that lists **only** live product pages (with the partner’s `/go/<code>?to=` link), published product facts, approved brand files that already sit in `/public`, and the same public support channels as the site.

## 2. Capability matrix

| # | Capability | Public claim | Backend | Frontend | Production | Test | Status | Gap |
|---|---|---|---|---|---|---|---|---|
| 1 | Referral link + Partner ID | Personal referral link and Partner ID | `partner_profiles` generates `partner_id` (`AM-…`) and `referral_code`; `GET /go/[code]` validates, records click, sets `am_ref` | Signup, dashboard, profile, resources | `/auth/signup` live; `/go/<unknown>` 302 to `/partners` with no cookie | Referral unit 14; live verify-referral 69 (historical); RLS 127 | **REAL** | None in architecture. Email confirmation can skip browser signup attribution (infra, not code). |
| 2 | Product demos / presentations | Product demos and presentations | None dedicated. Public product routes + BA widget | Product pages; Assistant `PanelDemo`; Hub now links `/go/<code>?to=<product>` and `/pay?sku=` | Product pages live; widget live; no partner sandbox | Hub facts: demo landings allowed, cabinet reserved | **PARTIAL** | No AIME/Showroom tenant, no PDF/PPT. Presentation = live page. |
| 3 | Ready-made marketing materials | Ready-made marketing creatives | None | Hub lists existing PNG lockup + OG JPGs + copy-paste sales lines | Brand files exist on disk; no campaign banners | Asset paths must exist on disk | **PARTIAL** | No banners, social kits, localised ads. Honest inventory only. |
| 4 | Lead tracking + attribution | Lead and attribution tracking | Clicks, `leads` via `/api/contact`, invoice `referral_code`, signup RPC | Customers list; dashboard counters | Cookie on valid `/go`; contact form attributes | Referral + commerce suites | **PARTIAL** | Chat / Telegram / WhatsApp / email are **not** `leads` rows. Direct (non-referred) sales cannot enter ledger (`sales.partner_id` NOT NULL). |
| 5 | Commission + payout tracking | Commission and payout tracking | Phase 4C RPCs; partner read path; admin payouts | Dashboard stats; Sales; Commissions; Payouts; Profile destination | Ledger applied (HANDOFF) | ledger suite 72; Phase 4C 54 historical | **PARTIAL** | Partner sees entries. Operator still sends USDC. No partner-initiated payout. `advance_sponsor_lock` is manual. `reverse_sale_commissions` / void payout have no UI. Audit only — not redesigned. |
| 6 | Product knowledge base | Product knowledge and sales resources | None | Hub KB from public copy + published limits | Public product FAQs live | Limits tests refuse ROI / invented scheduler | **PARTIAL** | No separate objection-playbook CMS. Facts are the public pages, now also in the cabinet. |
| 7 | Partner Dashboard | Partner Dashboard | RLS-scoped DAL; no client writes to financial tables | `/partner/*` | `/partner/dashboard` requires login | RLS 127 | **REAL** | Downline names hidden by design. Admin partners/network/audit still thin. |
| 8 | Support + onboarding | AI MARK onboarding and support | None dedicated | Signup copy; Hub how-to + public channels; dashboard links | Telegram / WhatsApp / Messenger / `hello@ai-mark.agency` live | Support URLs from `site` | **PARTIAL** | No ticket queue, no training course, Partner Agreement unpublished. |

Statuses used: REAL / PARTIAL / MOCK / MISSING. Nothing in the eight claims is a fabricated dashboard number (MOCK). Gaps are PARTIAL or honest missing files, not fake counters.

## 3. Existing implementation (where / how)

### 1. Referral link + Partner ID

- **Where:** `supabase/migrations/20260922090300_phase4a_partner_core.sql`, `app/go/[code]/route.ts`, `lib/referral/{rules,cookie,attribution}.ts`, `app/auth/actions.ts`, `components/platform/ReferralPanel.tsx`.
- **How:** Signup provisions a partner row. Partner ID and code are DB-generated. `/go/<code>` records a click, sets HTTP-only `am_ref` (30 days, HMAC). Last valid link wins.
- **Partner use:** Copy the URL on Dashboard / Profile / Resources. Optional `?to=/ai-business-assistant` or `?to=/pay?sku=aime-lite`.
- **Tested:** `npm test` referral cases; `npm run test:rls`; live `verify:referral` / `verify:commerce` as documented in HANDOFF.

### 4. Lead → sale → commission

- Visitor `/go/<code>` → cookie → contact form `POST /api/contact` → `leads` with `partner_id` **or** `/pay` invoice stores `referral_code` → operator confirm → `record_sale` → `qualify_sale` → `post_commission_entries`.
- Sponsor for a new partner: `attribute_partner_signup()` service_role only.
- **Not in this chain:** hosted BA widget (`site.widget`), messengers, mailto.

### 5. Commissions

- Partner reads own `sales`, `commission_entries`, `payouts` through the user session (RLS). Stats via `partner_ledger_stats`.
- Known lifecycle gaps remain operator-side (see HANDOFF Phase 4C). Not changed.

### 7. Dashboard security

- `server-only` DAL; session client; filter to own `partner_id` even for admin-in-cabinet.
- Referral tables have no partner write policy. Financial writes are RPCs for `service_role` except the stats rollup.
- No evidence of client-side writes to ledger tables.

## 4. Missing pieces (this branch did not fake)

- Partner-only product demos / slide decks.
- Campaign banners and social creatives.
- Attribution of the public chat widget.
- Partner-initiated payout, scheduled lock advance, reversal UI, void payout UI.
- Partner Agreement on the site.
- Dedicated support tickets / training LMS.
- Direct (non-referred) sales in the ledger.

## 5. Marketing claims vs production

The public kit on `/partners` and `/ru/partners` now lists only what exists: referral link and Partner ID, Partner Dashboard, live product pages, published brand files, contact-form / signup / `/pay` attribution, Partner Hub facts, and the public support channels. It states the absences: sandbox, PDF/PPT, campaign creatives, partner payout request, automatic lock, reversal screen, tickets, LMS, and chat / Telegram / WhatsApp / email leads.

The public product label is SHOWROOM AI (English: SHOWROOM AI / AI Sales Agent; Russian: SHOWROOM AI — AI-продавец). SKU id `showroom` is unchanged. Prices are unchanged.

## 6. Security / RLS

- No schema or policy change in this PR.
- Historical: RLS 127/127, referral live 69/69, ledger 72 assertions (HANDOFF). Re-run locally: `npm run test:rls`, `npm run test:ledger`.
- Production `/go/invalidcode`: 302, `no-store`, `noindex`, no `Set-Cookie`.
- Production `/partner/resources`: 307 to login.

## 7. Recommended implementation (done vs later)

**Done (in architecture, no economy change):** Partner Hub on `/partner/resources`; dashboard links; customers copy that chat is not a lead.

**Later (owner):** widget attribution; operator reversal/void UI; scheduled `advance_sponsor_lock`; partner payout request; real creatives if design supplies them; publish Partner Agreement.

## 8. Implemented changes

- `lib/partner/facts.ts` — brand files, published limits, demo channel truth, public support channels.
- `lib/partner/hub.ts` — Partner Hub model from published copy + payable SKUs.
- `app/partner/(platform)/resources/page.tsx` — Hub UI.
- `components/platform/PartnerDashboardView.tsx` — links into Hub sections.
- `app/partner/(platform)/customers/page.tsx` — attribution boundary.
- `components/platform/ReferralPanel.tsx` — comment no longer says the ledger does not exist.
- `lib/partner/facts.test.mjs` + `package.json` `test` script.

## 9. Tests

```
npm test          # 33/33 (locale + referral + hub facts)
```

Not run in this cloud pass unless Postgres is present: `npm run test:rls`, `npm run test:ledger`. Live verify scripts need `.env.local`.

## 10. Production verification (read-only)

| Check | Result |
|---|---|
| https://ai-mark.agency/ru/partners kit list | All 8 claims present |
| https://ai-mark.agency/auth/signup | Partner account create, terms not published |
| https://ai-mark.agency/partner/dashboard | Sign-in gate |
| https://ai-mark.agency/partner/resources | 307 `/auth/login?next=/partner/dashboard` |
| https://ai-mark.agency/go/invalidcode | 302 `/partners`, no cookie |
| Product pages | Live public presentations |
| Hub after merge | Requires a signed-in partner on production |

## 11. Remaining gaps

P0 closed in this pass: public `/partners` kit matches the cabinet, and the public Showroom.pro label is SHOWROOM AI.

P1: chat/messenger leads not attributed; no partner payout request; lock not automatic.

P2: no reversal/void UI; admin partners/network/audit placeholders.

P3: training LMS, localised ads, demo tenants.

## 12–13. Commit and PR

See the pull request for this branch. Do not merge to `main` until the owner says «да».
