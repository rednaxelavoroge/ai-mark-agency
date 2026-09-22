# Partner Platform — Phase 4A foundation

Supabase schema, application roles, Row Level Security and the server-side auth
integration for the AI Mark Partner Platform.

**The public website does not depend on any of this.** With no Supabase
environment configured, `npm run lint`, `npm run build` and every public page
behave exactly as they did before Phase 4A; `/auth/*` shows a "not configured"
notice and `/partner`, `/admin` redirect to the login page.

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

Deliberately **not** in Phase 4A: commission calculations, payouts, the
referral attribution engine, L1–L5 distribution, the fraud engine, KYC. The
schema is shaped so those phases can land without a migration rewrite.

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

Handled two ways: `app/robots.ts` disallows `/admin`, `/auth` and `/partner/`,
and the partner/admin layouts emit `robots: noindex`. The trailing slash in
`/partner/` is deliberate — `/partner` would also match the public marketing
page at `/partners` and de-index it.

---

## 4. Verify RLS locally — no Supabase project required

```bash
bash supabase/tests/run-rls-tests.sh
```

This creates a throwaway database, applies the real migration files verbatim,
and runs 82 assertions against a PostgreSQL instance. `00_auth_shim.sql`
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
  the initial status-history row, and sanitises hostile signup metadata.

`AM_TEST_DB` and `AM_MAINT_DB` override the database names if needed.

### 4b. Verify the LIVE project

The local suite cannot exercise PostgREST, GoTrue or real JWTs. Once the schema
is applied and `.env.local` holds the keys:

```bash
node supabase/tests/verify-live-project.mjs
```

It verifies over the real APIs, with real signed-in sessions:

* all five tables are reachable, so the migrations really applied;
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
  (not dashes), and can open `/admin/partners`.

It creates its own `phase4a-accept-*` accounts and deletes them afterwards.

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

`sponsor_partner_id` → `partner_id`, plus `confirmed_at` / `locked_at` for the
qualifying-sale phase, and `created_at`.

* `unique (partner_id)` — **a partner has exactly one sponsor**.
* the edge columns are **immutable**: `update` may only advance
  `confirmed_at` (once) and then `locked_at` (once); it may never rewrite who
  sponsored whom;
* a confirmed edge cannot be deleted;
* self-sponsorship is rejected;
* `partner_profiles.sponsor_partner_id` is a derived pointer, kept in sync by
  an `after insert` trigger, write-once, and rejected on insert — operators
  must create the edge, so the two can never disagree.

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

### RLS summary

| Table | SELECT | INSERT / UPDATE / DELETE |
| --- | --- | --- |
| `profiles` | own row, or admin | own row, or admin |
| `partner_profiles` | own row, or admin | admin only |
| `partner_relationships` | own incoming edge, or admin | admin only |
| `partner_status_history` | own rows, or admin | admin only |
| `user_roles` | own rows, or admin | admin only |

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
  the secret key; `SUPABASE_SECRET_KEY` is read in exactly one module,
  `lib/supabase/admin.ts`, which is `server-only` — an accidental client import
  is a build error rather than a leaked master key.
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
| `SUPABASE_SECRET_KEY` | **server only** | `service_role`, which has `BYPASSRLS` | Elevates past every RLS policy. Never `NEXT_PUBLIC_`. |

### Guard rails already in the code

* `lib/supabase/admin.ts` is `server-only`, so importing it from a client
  component **fails the build** instead of shipping the key.
* `lib/supabase/config.ts` refuses to run when
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` holds an `sb_secret_…` value, and the
  auth screens print the exact reason. A `NEXT_PUBLIC_` value is inlined into
  the client bundle, so that mistake would ship the master key to every visitor
  — it now fails loudly instead.
* Supabase itself rejects a secret key presented from a browser (it matches on
  the `User-Agent` and answers `401`), which is a second, independent barrier.

### Local development

```bash
cp .env.example .env.local     # then fill in the three Supabase values
```

`.env.local` is gitignored (`.env*.local`). Never commit real keys.

### Does the running app need the secret key? No.

Worth knowing before wiring production, because it changes what you deploy:

* Nothing in `app/` imports `lib/supabase/admin.ts` — `createSupabaseAdminClient()`
  is never called by the running application. It exists as the single sanctioned
  path for the elevated work that later phases will need.
* Sign-in, the dashboard and `/admin` all run on the **publishable** key plus the
  signed-in user's own JWT, so RLS is doing the work.
* The only things that read `SUPABASE_SECRET_KEY` today are the two verification
  scripts in `supabase/tests/`.

Consequences:

* You do **not** have to set `SUPABASE_SECRET_KEY` in Vercel for Phase 4A. Add it
  when a phase actually introduces server-side elevated code.
* A secret key that expires (Supabase lets you set a lifetime when creating one)
  therefore does not break the product. It only stops the verification scripts
  from creating their throwaway users, and they will say so plainly. Rotate in
  the dashboard, update `.env.local`, and re-run them.

### Production — Vercel

The repository is not linked to a Vercel project yet. Once it is, **Phase 4A
needs only the two publishable variables**:

```bash
vercel link                                   # select the ai-mark-agency project

# Needed at BUILD time (they are inlined), for Production, Preview and Development.
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
```

Add both to **Production, Preview and Development** — a Preview deployment
without them renders an unconfigured platform. `vercel env add <NAME>
<environment>` reads the value from stdin, so paste it when prompted or pipe it
in.

`SUPABASE_SECRET_KEY` is **not needed for Phase 4A** (see the section above).
Add it only when a phase introduces server-side elevated code, and prefer a
non-expiring, dedicated key for the server rather than a short-lived one that
would silently break that code later.

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

| Route | Guard | State in Phase 4A |
| --- | --- | --- |
| `/auth/login` | public | Email+password and magic link (disabled with a notice when unconfigured). |
| `/auth/signup` | public | Registration; the DB trigger provisions the partner record. |
| `/auth/callback` | public | PKCE code exchange for magic link / email confirmation / future OAuth. |
| `/partner` | session + partner | Redirects to the dashboard. |
| `/partner/dashboard` | session + partner | **Real** — identity, referral link, status history, honest `—` metrics. |
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

## 9. Notes for the next phase

* `lib/supabase/database.types.ts` is hand-written to mirror the migrations.
  Replace it with the real generator so it cannot drift:
  `npx supabase gen types typescript --project-id <ref> --schema public > lib/supabase/database.types.ts`
* `partner_relationships.confirmed_at` / `locked_at` exist precisely so the
  qualifying-sale phase can finalise a sponsor without touching the edge.
* `lib/supabase/admin.ts` is the single sanctioned path to elevated access.
* `/go/[code]` and the tracking engine are Phase 4B; the dashboard already
  displays `https://ai-mark.agency/go/<referral_code>` and says plainly that it
  does not track yet.
