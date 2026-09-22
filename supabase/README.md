# Partner Platform — Phase 4A foundation + Phase 4B referral engine

Supabase schema, application roles, Row Level Security, the server-side auth
integration and the referral attribution engine for the AI Mark Partner
Platform.

**The public website does not depend on any of this.** With no Supabase
environment configured, `npm run lint`, `npm run build` and every public page
behave exactly as they did before Phase 4A; `/auth/*` shows a "not configured"
notice, `/partner`, `/admin` redirect to the login page, and `/go/<code>`
redirects without tracking anything.

---

## 1. What Phase 4A ships

| Area | Delivered |
| --- | --- |
| Auth | Supabase Auth via `@supabase/ssr`: email + password, magic link, PKCE callback. A Google provider needs no new plumbing (see §6). |
| Roles | `public.user_roles` (`partner`, `admin`) — data, not a hardcoded email or a client-side flag. |
| Schema | `profiles`, `partner_profiles`, `partner_relationships`, `partner_status_history`, `user_roles`. |
| Security | RLS enabled on all five tables, no blanket policy anywhere, helper predicates that cannot recurse. |
| Integration | `lib/supabase/{config,database.types,server,proxy,admin}.ts`, `lib/auth/{dal,roles,redirects}.ts`, `lib/partner/format.ts`. |
| Routes | `/partner/*` (8 sections) and `/admin/*` (7 sections), all server-gated. |
| Dashboard | Partner Dashboard V1 with real identity data and honest `—` placeholders. |

Deliberately **not** in Phase 4A: commission calculations, payouts, L1–L5
distribution, the fraud engine, KYC.

## 1b. What Phase 4B ships

| Area | Delivered |
| --- | --- |
| Referral route | `GET /go/<referralCode>` — validates the code server-side, records a click, preserves UTM parameters, sets the attribution cookie, redirects to the intended landing page. Never exposes a partner or user id in the URL. |
| Attribution | Signed, HTTP-only, same-site first-party cookie (`am_ref`), 30-day window, HMAC-SHA256, code + issue time + click id only — no personal data. |
| Schema | `referral_clicks`, `leads`, plus `attribution_source` / `attribution_code` on `partner_relationships`. |
| Leads | `/api/contact` still delivers by email/webhook, and now also records a Lead (attributed when a valid referral cookie is present). |
| Partner signup | `public.attribute_partner_signup()` creates the sponsor edge server-side; client-supplied signup metadata can never set a sponsor. |
| Rollups | `public.partner_referral_stats()` — counts only, for the dashboard. |
| Dashboard | A real referral section: Partner ID, referral code, referral URL, copy button, referral clicks, attributed leads, attributed partner signups. |
| Tests | 127-assertion SQL suite, 14 unit assertions, a live-project verifier and a browser acceptance run. |

Deliberately **not** in Phase 4B: the qualifying sale that confirms an edge
(`confirmed_at`), commission calculations, L1–L5 distribution, the fraud
engine, KYC.

### The attribution rules (normative)

Both rules are implemented server-side, and are quoted in the migration headers
and in `lib/referral/rules.ts` so the code and this document cannot drift:

| Event | Rule |
| --- | --- |
| **Partner signup** | **Last valid partner referral before signup.** The most recent `/go/<code>` visit that produced a valid, unexpired cookie wins. |
| **Customer lead** | **Last valid partner referral within 30 days before lead creation.** |

"Last valid" means the code resolved to a real, non-suspended partner at the
moment the visitor followed the link, and the signed cookie is still inside the
30-day window when the event happens. Following a different partner's link
overwrites the attribution — last link wins. Following the *same* link again
inside 30 minutes reuses the recorded click instead of inflating the count, but
still refreshes the cookie.

---

## 2. Migrations

Apply in filename order.

| File | Contents |
| --- | --- |
| `20260922090000_phase4a_extensions_enums.sql` | `pgcrypto`, `app_role`, `partner_status`, `set_updated_at()`. |
| `20260922090100_phase4a_user_roles.sql` | `user_roles`, `is_admin()`. |
| `20260922090200_phase4a_profiles.sql` | `profiles` + identity guard. |
| `20260922090300_phase4a_partner_core.sql` | `partner_profiles`, `partner_relationships`, `partner_status_history`, the ID/referral generators, immutability triggers, `current_partner_id()`. |
| `20260922090400_phase4a_rls.sql` | RLS enable + every policy + grants/revokes. |
| `20260922090500_phase4a_auth_provisioning.sql` | `auth.users` triggers: provision a partner on signup, mirror email changes. |
| `20260922090600_phase4b_referral_schema.sql` | `referral_clicks`, `leads`, sponsor-attribution provenance, `attribute_partner_signup()`, `partner_referral_stats()`. |
| `20260922090700_phase4b_referral_rls.sql` | RLS for the two new tables: read-your-own, no client writes, no `anon` grants. |

A single-paste bundle of the Phase 4B half (for a project that already has
Phase 4A) is generated at `supabase/.generated/phase4b-all.sql`:

With the Supabase CLI:

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push
```

Or paste each file into the Supabase SQL editor in filename order. They are
idempotent, so re-running is safe.

### Bootstrap the first admin

There is **no admin email in this repository**, and there must never be one.
Grant the role once, by hand, with the service role or in the SQL editor:

```sql
insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = '<operator-email>'
on conflict (user_id, role) do nothing;
```

Every signup is provisioned with the `partner` role by the
`on_auth_user_created` trigger; the `admin` role is only ever granted this way.

---

## 3. Advertising the platform to search engines

Handled two ways: `app/robots.ts` disallows `/admin`, `/auth`, `/partner/` and
`/go/`, and the partner/admin layouts emit `robots: noindex`. The trailing
slash in `/partner/` is deliberate — `/partner` would also match the public
marketing page at `/partners` and de-index it. `/go/` is disallowed because a
crawler following a referral link would otherwise be counted as a click and
could attribute traffic to the wrong partner; the route also answers with
`X-Robots-Tag: noindex, nofollow`.

---

## 4. Tests

| Command | What it covers | Needs |
| --- | --- | --- |
| `npm test` | Referral codes, landing-path safety, UTM handling and the signed cookie (round trip, tamper, 30-day expiry) — 14 assertions. | Nothing. |
| `npm run test:rls` | The full schema against a throwaway PostgreSQL: RLS, immutability, provisioning and the whole attribution engine — 127 assertions. | A local PostgreSQL. |
| `npm run verify:referral` | The same rules against the **real** project over PostgREST with real JWTs, plus the HTTP half (`/go`, `/api/contact`) against a running server. | `.env.local`, the applied schema, and a server on `BASE` (default `http://localhost:3100`). |
| `node supabase/tests/verify-live-project.mjs` | The Phase 4A properties against the real project. | `.env.local`, the applied schema. |
| `BASE=… node supabase/tests/verify-live-browser.mjs` | The real UI in a browser: gating, the dashboard, and a referral-link signup end to end. | `.env.local`, the applied schema, a server, Playwright. |

### 4a. Verify RLS locally — no Supabase project required

```bash
npm run test:rls      # or: bash supabase/tests/run-rls-tests.sh
```

This creates a throwaway database, applies the real migration files verbatim,
and runs **127 assertions** against a PostgreSQL instance. `00_auth_shim.sql`
recreates the small slice of Supabase the migrations need (`auth.users`,
`auth.uid()`, and the `anon` / `authenticated` / `service_role` roles) — it is
**test-only and must never be applied to a real project.**

What the suite proves:

* a partner sees exactly one profile, one partner profile, one status history
  row and their own roles — and zero rows belonging to another partner;
* a partner cannot insert a partner profile, insert a sponsor edge, forge a
  status-history entry, edit platform-owned fields, or **grant themselves the
  admin role**;
* `anon` has no reachable data at all;
* an admin has full access, including creating the sponsor edge;
* the sponsor edge is single-valued, immutable, self-sponsorship-proof, and its
  denormalised pointer can only ever be derived from a real edge;
* signup provisioning fills `profiles`, `partner_profiles`, `user_roles` and
  the initial status-history row, and sanitises hostile signup metadata;
* **Phase 4B** — the attribution tables have a read-your-own policy and **no
  write policy at all**; `authenticated` holds `SELECT` only and `anon` holds
  nothing; a partner cannot insert a click or a lead, cannot set their own
  sponsor pointer, and cannot execute the attribution RPC;
* **Phase 4B** — `attribute_partner_signup()` attributes a valid code, and
  refuses unknown, malformed, reserved, suspended, self-, duplicate, foreign-
  click and stale-account inputs, each with its own status;
* **Phase 4B** — client-supplied signup metadata (a `sponsor_partner_id` in
  `raw_user_meta_data`) creates no edge, and the stats rollup exposes counts
  while the downline rows stay unenumerable.

`AM_TEST_DB` and `AM_MAINT_DB` override the database names if needed.

### 4b. Verify the LIVE project

The local suite cannot exercise PostgREST, GoTrue or real JWTs. Once the schema
is applied and `.env.local` holds the keys:

```bash
node supabase/tests/verify-live-project.mjs     # Phase 4A
npm run verify:referral                          # Phase 4B (DB + HTTP)
```

`verify-referral-live.mjs` needs the Phase 4B schema. If it is missing it says
so and prints exactly what to apply; it never half-runs. With a server already
listening it also exercises the HTTP path: a valid `/go/<code>` redirect with
UTM preservation and an HttpOnly cookie, click deduplication on reload, an
unknown code that records nothing, an attributed `/api/contact` lead, a direct
lead, and tampered/expired cookies that are refused.

Run it against `npm run dev` unless a contact provider is configured: a
production-mode server returns the pre-existing `503` for a submission with no
`RESEND_API_KEY` / `CONTACT_WEBHOOK_URL` (the lead is still recorded, which is
why the suite accepts either status).

It verifies over the real APIs, with real signed-in sessions:

* all five Phase 4A tables are reachable, so the migrations really applied;
* the auth trigger provisioned `profiles`, `partner_profiles`, `user_roles`
  and the initial audit row for a newly created account;
* a partner authenticated with **their own JWT** reads exactly their own
  profile / partner profile / roles, and cannot read a second partner's rows;
* a partner cannot grant themselves `admin`, change their own status, or insert
  a sponsor edge;
* a caller holding only the publishable key and no session reaches no data;
* an admin's session sees across partners and `is_admin()` returns true;
* the sponsor edge is single-valued, immutable and self-sponsorship-proof, and
  the derived pointer stays in sync.

It creates three throwaway `phase4a-verify-*` users, deletes them in a `finally`
block, and removes leftovers from any interrupted earlier run — it never touches
data it did not create. A confirmed sponsor edge is deliberately never created
there, because a confirmed edge is permanent by design and would block cleanup.

### 4c. Verify the LIVE project through a browser

`verify-live-project.mjs` talks to the APIs. This one drives the real UI, which
is the only way to prove the routing and rendering behave:

```bash
npm run build && npm run start -- -p 3100     # or npm run dev
BASE=http://localhost:3100 node supabase/tests/verify-live-browser.mjs
```

It checks:

* a signed-out visitor is redirected from `/partner/dashboard` and `/admin` to
  the login page, with the requested path preserved in `?next=`;
* a real partner signing in through the real form lands on the dashboard, sees
  their own Partner ID, referral code and `https://ai-mark.agency/go/<code>`,
  and the page has no horizontal overflow at 390px;
* that same partner is bounced from `/admin` to their own dashboard;
* an admin reaches `/admin`, sees live schema counts that match the database
  (not dashes), and can open `/admin/partners`;
* **Phase 4B** — a signed-out visitor follows `/go/<code>`, registers through
  the real form, and the new partner record comes back with
  `sponsor_partner_id` set and a `referral_link` edge in
  `partner_relationships`;
* **Phase 4B** — the dashboard referral section shows the Partner ID, referral
  code, `/go/<code>` link, a copy button and three counters whose values match
  the database exactly, with no horizontal overflow at 390px.

It creates its own `phase4a-accept-*` accounts (including the referred one) and
deletes them afterwards, downline before sponsor.

### Email confirmation is ON in the live project

Signing up through the public form therefore sends a confirmation email, and
Supabase's built-in SMTP has a low hourly quota. When GoTrue answers
`email rate limit exceeded`, the browser suite reports that one step as `SKIP`
with the reason instead of failing — it is an infrastructure limit, not a code
defect, and the identical attribution rule is proven over the real APIs by
`npm run verify:referral` (which uses the admin API and sends no mail). To close
the gap completely, either wait for the quota to reset and re-run, or switch
**Authentication → Sign In / Providers → Email → Confirm email** off on a test
project: `signUp` then returns a session, no mail is sent, and the form test
runs end to end. The signup action and `/auth/callback` handle both
configurations, and referral attribution runs at `signUp` either way.

---

## 5. Data model

### `profiles` — one row per `auth.users` row

`id` (= `auth.users.id`), `full_name`, `email`, `phone`, `country`, `region`,
`language`, `avatar_url`, `created_at`, `updated_at`.

`id` and `email` are immutable from the account owner (a trigger enforces it);
the address is owned by Supabase Auth and mirrored by a trigger.

### `partner_profiles` — partner identity

`user_id` (unique), `partner_id`, `referral_code` (both unique), `status`,
`created_at`, `updated_at`, plus a derived `sponsor_partner_id`.

* `partner_id` — public, stable, human-quotable, generated in the database:
  `AM-001042`.
* `referral_code` — 8 characters from an unambiguous alphabet (no `i l o 0 1`),
  drawn from `pgcrypto`, with reserved words (`admin`, `go`, `api`, …) rejected
  by a constraint.
* `status` — `partner` → `growth` → `regional` → `strategic`, or `suspended`.
* `id`, `user_id`, `partner_id` are immutable; `referral_code` is write-once.

### `partner_relationships` — the sponsor edge

`sponsor_partner_id` → `partner_id`, plus `attribution_source` /
`attribution_code`, `confirmed_at` / `locked_at` for the qualifying-sale phase,
and `created_at`.

* `unique (partner_id)` — **a partner has exactly one sponsor**.
* the edge columns are **immutable**: `update` may only advance
  `confirmed_at` (once) and then `locked_at` (once); it may never rewrite who
  sponsored whom, and it may never rewrite the attribution provenance;
* a confirmed edge cannot be deleted;
* self-sponsorship is rejected;
* `partner_profiles.sponsor_partner_id` is a derived pointer, kept in sync by
  an `after insert` trigger, write-once, and rejected on insert — operators
  must create the edge, so the two can never disagree;
* `attribution_source` is `referral_link` (created by the attribution RPC),
  `operator` or `import`; `attribution_code` is the code that produced a
  referral edge. Both are written once, by the server.

### `referral_clicks` — one row per tracked `/go/<code>` visit

`id`, `partner_id`, `referral_code`, `landing_path`, `utm_source`,
`utm_medium`, `utm_campaign`, `created_at`.

**No IP address, user agent or device fingerprint is stored.** The click is
"this code was used, from this path, with these campaign parameters" — that is
the whole attribution budget. A future fraud phase that needs more must add a
documented security requirement, a retention window and a salted hash, not a
raw address here.

### `leads` — contact submissions with server-side attribution

`id`, `partner_id` (nullable), `referral_code`, `referral_source`
(`direct` | `referral`), `referral_click_id`, `name`, `email`, `messenger`,
`company`, `scenario`, `message`, `landing_path`, `created_at`.

Written by `/api/contact` alongside — never instead of — the existing email /
webhook delivery. `partner_id` is `ON DELETE SET NULL` so the lead survives as
a business record with its `referral_code` provenance intact.

### `partner_status_history` — the audit trail

`partner_id`, `old_status`, `new_status`, `reason`, `changed_by`,
`created_at`. Written automatically by a trigger on every status change,
including account creation, so a status cannot change without an audit row.

### `user_roles` — authorization

`user_id` + `role` (`unique`), `granted_by`, `created_at`.

`is_admin()` and `current_partner_id()` are `SECURITY DEFINER` with
`search_path = ''`. Being definer functions is what lets them be referenced
from RLS policies without recursing through `user_roles` itself. They are owned
by the migration role, so **do not** enable `FORCE ROW LEVEL SECURITY` on these
tables — the helpers and the provisioning trigger rely on the owner bypass.

### The two attribution functions

| Function | Who may execute it | What it does |
| --- | --- | --- |
| `public.attribute_partner_signup(p_partner_user_id uuid, p_referral_code text, p_click_id uuid)` | **`service_role` only** | Creates the sponsor edge for a newly provisioned partner. Returns a status string: `attributed`, `already_attributed`, `invalid_code`, `self_referral`, `no_target`, `stale_target`, `invalid_click`. Never throws for hostile input. |
| `public.partner_referral_stats()` | `authenticated`, `service_role` | Counts-only rollup (`clicks`, `leads`, `partner_signups`) for `current_partner_id()`. Zeroes for a caller without a partner record. |

`attribute_partner_signup` is the **only** thing that can create a sponsor edge
from a referral. Its EXECUTE privilege is revoked from `PUBLIC`, `anon` and
`authenticated`, so:

* an authenticated partner calling PostgREST directly gets
  `permission denied for function` — a partner can never set or change a
  sponsor from the client;
* a raw GoTrue signup that bypasses the app's Server Action produces a partner
  with **no sponsor** (fail-closed);
* a client-supplied `sponsor_partner_id` in signup metadata is ignored by the
  provisioning trigger and cannot create an edge.

`stale_target` is the backstop against attaching a sponsor to an account that
already existed: attribution only ever applies to a partner record created
within the last 15 minutes.

### RLS summary

| Table | SELECT | INSERT / UPDATE / DELETE |
| --- | --- | --- |
| `profiles` | own row, or admin | own row, or admin |
| `partner_profiles` | own row, or admin | admin only |
| `partner_relationships` | own incoming edge, or admin | admin only |
| `partner_status_history` | own rows, or admin | admin only |
| `user_roles` | own rows, or admin | admin only |
| `referral_clicks` | own rows, or admin | **nobody** — server (`service_role`) only |
| `leads` | own rows, or admin | **nobody** — server (`service_role`) only |

Unlike the Phase 4A tables, the two attribution tables grant `authenticated`
`SELECT` only: even a mistaken permissive policy could not turn into a
client-side write, because the table grant would still refuse it.

Network-wide visibility is **not** granted to partners in Phase 4A; a sponsor
cannot enumerate their downline. That arrives with server-side rollups in a
later phase. Privileges are granted broadly and restricted by policy (the
Supabase idiom) — RLS is the boundary, not the `GRANT`.

`service_role` — what the secret key resolves to — is granted explicitly rather
than relying on the project's default privileges. Postgres evaluates table
grants **before** RLS, so a `BYPASSRLS` role still fails with a permission
error when the grant is missing; the migration grants it, and the test suite
asserts it, so that failure mode cannot reach production.

---

## 6. Auth flow

```
Browser ──POST form──▶ Server Action (app/auth/actions.ts)
                         └─ supabase.auth.signInWithPassword() | signInWithOtp()
                              └─ cookies written server-side (httpOnly, @supabase/ssr)
Magic link ──▶ /auth/callback?code=… ──▶ exchangeCodeForSession() ──▶ redirect
```

* Credentials are only ever handled on the server. The browser never receives
  the secret key; `SUPABASE_SECRET_KEY` is read only in `server-only` modules —
  `lib/supabase/admin.ts` (the elevated client), `lib/referral/attribution.ts`
  (tracking availability) and `lib/referral/cookie.ts` (HMAC fallback) — so an
  accidental client import is a build error rather than a leaked master key.
* `proxy.ts` refreshes the session on every request that carries a Supabase
  auth cookie, and skips the Auth server entirely for anonymous traffic, which
  keeps the public marketing site unaffected.
* There is intentionally **no browser-side Supabase client** in Phase 4A: every
  auth operation is a Server Action. When a future feature genuinely needs one,
  add `createBrowserClient` from `@supabase/ssr` with the publishable key only,
  in a `lib/supabase/client.ts`.
* **Google login (future):** add `supabase.auth.signInWithOAuth({ provider:
  "google" })` to a Server Action. It redirects to Google and returns to the
  existing `/auth/callback`, which already exchanges the code — no new route,
  no new middleware.

### Authorization layers

1. `proxy.ts` — optimistic session refresh and CDN cache headers (never the
   only check).
2. `app/{partner,admin}/layout.tsx` — a verified session for the subtree.
3. `app/{partner,admin}/(platform)/layout.tsx` — the role + partner-record
   check for the shell.
4. **Every page** re-checks via `lib/auth/dal.ts` next to its own data, because
   a layout does not stop a nested route segment from rendering, and every
   query runs through the user's own session so RLS is a second, independent
   gate.

`requireAdmin()` sends a signed-in non-admin to their own dashboard rather than
showing an admin shell they cannot use. `/partner/no-access` explains the
"signed in but not provisioned" case, and lives outside the `(platform)` group
so it cannot redirect into itself. Deep links normalise to the section root
(`/partner/dashboard`, `/admin`) after login.

---

## 7. Environment variables

This project uses the **current Supabase API keys** — short opaque strings, not
the legacy `eyJ…` JWTs. See
[API keys](https://supabase.com/docs/guides/getting-started/api-keys).

| Variable | Exposure | Maps to | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser | — | Project URL, e.g. `https://<ref>.supabase.co`. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | browser | `anon` (or `authenticated` once signed in) | Low privilege. Safe to ship because RLS is the boundary. |
| `SUPABASE_URL` | **server only** | — | Optional; falls back to `NEXT_PUBLIC_SUPABASE_URL`. |
| `SUPABASE_SECRET_KEY` | **server only** | `service_role`, which has `BYPASSRLS` | Elevates past every RLS policy. Never `NEXT_PUBLIC_`. **Phase 4B uses it at runtime** (see below). |
| `REFERRAL_COOKIE_SECRET` | **server only** | — | Optional. HMAC key for the attribution cookie; falls back to `SUPABASE_SECRET_KEY`. |

### Guard rails already in the code

* `lib/supabase/admin.ts` is `server-only`, so importing it from a client
  component **fails the build** instead of shipping the key.
* `lib/referral/attribution.ts` is `server-only` too, and is the only module
  that reads the referral cookie or writes attribution rows.
* `lib/supabase/config.ts` refuses to run when
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` holds an `sb_secret_…` value, and the
  auth screens print the exact reason. A `NEXT_PUBLIC_` value is inlined into
  the client bundle, so that mistake would ship the master key to every visitor
  — it now fails loudly instead.
* `REFERRAL_COOKIE_SECRET` / `SUPABASE_SECRET_KEY` are only ever read through
  `process.env` on the server. A non-`NEXT_PUBLIC_` name is replaced with
  `undefined` in a client bundle, so an accidental client import cannot leak it.
* Supabase itself rejects a secret key presented from a browser (it matches on
  the `User-Agent` and answers `401`), which is a second, independent barrier.

### Local development

```bash
cp .env.example .env.local     # then fill in the Supabase values
```

`.env.local` is gitignored (`.env*.local`). Never commit real keys.

### Does the running app need the secret key? Yes, from Phase 4B.

This changes what you deploy, so it is worth being explicit:

* **Phase 4A did not need it.** Sign-in, the dashboard and `/admin` run on the
  publishable key plus the signed-in user's own JWT, with RLS doing the work.
* **Phase 4B does.** Three writes are deliberately impossible for a browser
  session, so the server performs them with the elevated client:
  1. `/go/<code>` records a `referral_clicks` row for an **anonymous** visitor;
  2. `/api/contact` records a `leads` row for an **anonymous** visitor;
  3. partner signup calls `attribute_partner_signup()`, which is granted to
     `service_role` only.
* Without `SUPABASE_SECRET_KEY`, the platform degrades honestly rather than
  breaking: `/go/<code>` still redirects, no click is recorded, `/api/contact`
  still delivers, no lead row is written, and a new partner is created with no
  sponsor. `npm run build` and every public page stay green. The server logs the
  reason.
* Prefer a **non-expiring, dedicated** key for the server. A short-lived key
  that expires later silently disables attribution.
* `REFERRAL_COOKIE_SECRET` is optional: when set, the cookie key can be rotated
  without touching the database key. When neither is set, no attribution cookie
  is issued at all — an unsigned cookie would let a visitor choose their own
  referral code.

### Production — Vercel

The repository is not linked to a Vercel project yet. Once it is, Phase 4B
needs the two publishable variables **and** the server secret:

```bash
vercel link                                   # select the ai-mark-agency project

# Needed at BUILD time (they are inlined), for Production, Preview and Development.
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production

# Needed at RUNTIME, server-side only. Recommended for Production/Preview/Development.
vercel env add SUPABASE_SECRET_KEY production
vercel env add REFERRAL_COOKIE_SECRET production   # optional, preferred
```

Add the public pair to **Production, Preview and Development** — a Preview
deployment without them renders an unconfigured platform. `vercel env add
<NAME> <environment>` reads the value from stdin, so paste it when prompted or
pipe it in. Generate the cookie secret with `openssl rand -base64 48`.

Then redeploy: `NEXT_PUBLIC_*` changes need a new build, not just a restart
(Vercel → Deployments → Redeploy).

### Supabase dashboard — redirect URLs

**Authentication → URL Configuration → Redirect URLs** must contain every
origin that can receive a magic link:

```
https://ai-mark.agency/auth/callback
https://<your-preview-domain>/auth/callback
http://localhost:3000/auth/callback
```

Also set **Site URL** to `https://ai-mark.agency`.

---

## 8. Route map

| Route | Guard | State |
| --- | --- | --- |
| `/go/[code]` | public | **Phase 4B** — validates, records a click, sets the attribution cookie, redirects. `no-store`, `noindex`, no internal id in the URL. |
| `/api/contact` | public | Email/webhook delivery unchanged; also records an attributed `leads` row. |
| `/auth/login` | public | Email+password and magic link (disabled with a notice when unconfigured). |
| `/auth/signup` | public | Registration; the DB trigger provisions the partner record, and the Server Action applies the referral attribution. |
| `/auth/callback` | public | PKCE code exchange for magic link / email confirmation / future OAuth. Also the attribution point for a magic-link signup. |
| `/partner` | session + partner | Redirects to the dashboard. |
| `/partner/dashboard` | session + partner | **Real** — identity, the referral section (code, URL, copy, clicks, leads, signups), status history, honest `—` financial metrics. |
| `/partner/profile` | session + partner | **Real** — read-only account + partner record. |
| `/partner/network` | session + partner | Placeholder. |
| `/partner/customers` | session + partner | Placeholder. |
| `/partner/sales` | session + partner | Placeholder. |
| `/partner/commissions` | session + partner | Placeholder. |
| `/partner/payouts` | session + partner | Placeholder. |
| `/partner/resources` | session + partner | Placeholder. |
| `/partner/no-access` | session only | Explains a missing partner record. |
| `/admin` | session + admin | **Real** — live schema counts. |
| `/admin/partners` | session + admin | Placeholder. |
| `/admin/network` | session + admin | Placeholder. |
| `/admin/orders` | session + admin | Placeholder. |
| `/admin/commissions` | session + admin | Placeholder. |
| `/admin/payouts` | session + admin | Placeholder. |
| `/admin/audit` | session + admin | Placeholder. |

---

## 9. Where the attribution code lives

| File | Role |
| --- | --- |
| `lib/referral/rules.ts` | Pure rules: code shape, safe landing paths, UTM handling, the click-dedupe window, the referral URL. No imports at all, so the unit tests exercise the real code. |
| `lib/referral/cookie.ts` | The signed cookie: payload shape, HMAC-SHA256 sign/verify, the 30-day window, cookie attributes. Only `node:crypto`. |
| `lib/referral/attribution.ts` | `server-only`. Reads and validates the cookie, resolves a code against the database, records clicks and leads, calls the signup RPC. Never throws into a product flow. |
| `app/go/[code]/route.ts` | The public entry point: validate → record → set cookie → redirect. |
| `app/api/contact/route.ts` | Delivery first, unchanged; the lead record is an addition. |
| `app/auth/actions.ts` | Reads the cookie for signup, rejects self-referral against the signed-in account, calls the RPC. |
| `app/auth/callback/route.ts` | The same for a magic-link / email-confirmation signup. |
| `lib/auth/dal.ts` | `getPartnerReferralStats()` — the counts-only rollup the dashboard renders. |
| `components/platform/ReferralPanel.tsx` | The dashboard referral section. |

`proxy.ts` keeps `/go` out of the locale rewrite (like `/partner`), so
`/go/<code>` is served exactly as written instead of being rewritten to
`/en/go/<code>`.

---

## 10. Notes for the next phase

* `lib/supabase/database.types.ts` is hand-written to mirror the migrations.
  Replace it with the real generator so it cannot drift:
  `npx supabase gen types typescript --project-id <ref> --schema public > lib/supabase/database.types.ts`
* `partner_relationships.confirmed_at` / `locked_at` exist precisely so the
  qualifying-sale phase can finalise a sponsor without touching the edge.
  `attribution_source` / `attribution_code` already record how the edge was
  decided, so the confirmation step only has to advance the timestamps.
* `lib/supabase/admin.ts` is the single sanctioned path to elevated access; in
  Phase 4B the running app uses it (see §7).
* Still open for a later phase: the qualifying sale, L1–L5 distribution,
  commissions, payouts, KYC and the fraud engine. Multi-account
  self-referral (one person registering two accounts through their own link) is
  detected at the row level and against the signed-in session, but a
  person-level judgement needs the fraud engine — do not pretend otherwise.
* If a future phase needs an IP address for fraud scoring, it must arrive with a
  documented security requirement, a retention window and a salted hash. The
  attribution tables deliberately store none today.
