# AI Mark — Handoff

Production: https://ai-mark.agency/ru · Repo: `rednaxelavoroge/ai-mark-agency` (branch `main`) · Deploy: Vercel (auto on push to `main`).

---

## Current state — start here

**Phase 4A (Partner Platform foundation) and Phase 4B (referral engine) are
implemented, applied to the live Supabase project and verified. Phase 4C
(qualifying sale, commissions) is NOT started — deliberately.**

Live Supabase project ref: `ziwslkdqeqtexotyybbi` (the value in
`NEXT_PUBLIC_SUPABASE_URL`). The Phase 4A **and** Phase 4B migrations are applied
there; the local `.env.local` holds the publishable and secret keys.

### What is committed vs. not

Nothing from Phase 4A/4B is committed. `git status` shows the whole
`app/partner`, `app/admin`, `app/auth`, `app/go`, `components/{auth,platform}`,
`lib/{auth,partner,referral,supabase}` and `supabase/` trees as untracked, plus
modified `proxy.ts`, `app/robots.ts`, `app/api/contact/route.ts`,
`.env.example`, `package.json`, `HANDOFF.md`. **Do not commit or push without
being asked.**

### Verify the current state (all green at handoff)

```bash
npm test                      # 14/14  referral rules + cookie (no DB, no keys)
npm run test:rls              # 127/127 full schema vs a throwaway PostgreSQL
npm run lint && npm run build # clean; build exit 0, 48/48 pages
npm run dev -- -p 3100        # needed by the two BASE=… commands below
npm run verify:referral       # 69/69  live project: RLS, every RPC path, /go + /api/contact
BASE=http://localhost:3100 node supabase/tests/verify-live-browser.mjs   # 29/29, 1 skip
node supabase/tests/verify-live-project.mjs   # 37/37  Phase 4A regression
```

The single **skip** is the referral signup submitted through the public form:
the live project has **email confirmation ON**, so GoTrue sends a confirmation
mail and the built-in SMTP quota is easily exhausted (`email rate limit
exceeded`). That is an infrastructure limit, not a code defect — the same
attribution rule is proven by `npm run verify:referral`. To close it: wait for
the quota to reset, or switch **Authentication → Sign In / Providers → Email →
Confirm email** off (a production security decision, not a test detail).

### Environment gotchas

* **`node_modules/@types/<name> 2` duplicate directories** appear on this
  machine (cloud-sync artifact) and break `tsc` with `TS2688`. Fix:
  `rm -rf node_modules/@types/*\ 2`. Not caused by the code.
* Playwright is resolvable from the repo root; browsers are installed.
* A copy of the Phase 4B SQL bundle for re-application lives **outside the
  repo** at `../phase4b-all.sql` (canonical file:
  `supabase/.generated/phase4b-all.sql`).
* No Supabase CLI and no Management API token on this machine — applying DDL
  needs the SQL editor (or a PAT via the API call documented in
  `supabase/README.md` §2). Never ask for a secret in chat.

### Read first, in this order

1. `supabase/README.md` — §1b the attribution rules, §5 data model + RLS matrix,
   §7 environment/deploy impact, §9 where the attribution code lives, §10 next.
2. `lib/referral/rules.ts` + `lib/referral/cookie.ts` — the pure rules, imported
   directly by the unit tests.
3. `lib/referral/attribution.ts` — the server-only half (clicks, leads, signup).
4. `supabase/migrations/20260922090600_phase4b_referral_schema.sql` — the RPC
   contract and every rejection path.

### Phase 4C — where to start (not started)

Everything Phase 4C needs is already in the schema; no commission code exists
yet:

* `partner_relationships.confirmed_at` / `locked_at` — a qualifying sale
  finalises an edge by advancing these, never by rewriting the edge.
* `partner_relationships.attribution_source` / `attribution_code` — how each
  sponsor edge was decided.
* `leads` and `referral_clicks` — the attributable events a sale can be tied to.
* Pattern to copy for an aggregate a partner may read: `public.partner_referral_stats()`,
  a counts-only `SECURITY DEFINER` rollup (Phase 4A deliberately does not let a
  sponsor enumerate their downline).
* Pattern to copy for something a client must never do: a `SECURITY DEFINER`
  function with EXECUTE revoked from `PUBLIC`/`anon`/`authenticated` and granted
  to `service_role` only, plus RLS with no write policy at all.

Open questions Phase 4C must answer before coding: what exactly counts as a
qualifying sale, where the sale event comes from, the L1–L5 distribution rules,
the commission base and currency, and how payouts are recorded. **Do not invent
financial numbers in the UI** — the dashboard shows `—`, never a simulated
figure, and that rule stays.

---

## Stack
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript. No animation libraries — motion is hand-built CSS + IntersectionObserver.

## Local
```bash
npm install
cp .env.example .env.local      # CONTACT_TO_EMAIL etc.
npm run dev                     # EN: /  RU: /ru
npm run lint && npm run build
```
Overflow regression: `BASE=https://ai-mark.agency node scripts/check-overflow.mjs`
Design-review stills: `BASE=http://localhost:3100 node scripts/shot.mjs /ru/products /tmp/card.png 1440 1000`
Both scripts need Playwright resolvable from the repo root (a globally installed `playwright` symlinked into `node_modules/` works).
Partner Platform RLS + integrity suite (needs only a local PostgreSQL, no Supabase project): `npm run test:rls` (127 assertions)
Referral attribution unit tests (no database, no credentials): `npm test`
Referral engine against the LIVE project (needs `.env.local` + the applied schema; add `BASE=` for the HTTP half): `npm run verify:referral`
Partner Platform against the LIVE project (needs `.env.local` + the applied schema; creates and deletes its own `phase4a-verify-*` users): `node supabase/tests/verify-live-project.mjs`
Partner Platform through a real browser (needs a server already running): `BASE=http://localhost:3100 node supabase/tests/verify-live-browser.mjs`
Applying migrations to a project without the CLI: `POST https://api.supabase.com/v1/projects/<ref>/database/query` with a Personal Access Token — see `supabase/README.md` §2. Without a token, paste `supabase/.generated/phase4b-all.sql` into the Supabase SQL editor.

## Deploy
Push to `main` → Vercel builds and deploys (~25s). Verify: fetch a page and look for a new marker string, or run the overflow script with `BASE=https://ai-mark.agency`.

## i18n / routing
- Locales: `en` (default, unprefixed) and `ru`. `lib/site.ts` is the source of truth.
- `proxy.ts` (Next middleware) rewrites unprefixed paths to `/en` and passes `/ru` & `/en` through. `/en` and `/en/*` DO resolve.
- Copy: `content/copy.ts` (home), `content/products/{aime,assistant,showroom}.ts` (product pages), `content/packages.ts` (pricing).

## Design system
- Tokens in `app/globals.css`: `--ink/-2/-3` (surfaces), `--paper` (text), `--mark` (olive), `--warm` (amber), `--line`. Light default; dark via `[data-theme="dark"]` (a wrapper can opt a section in, e.g. the dark operating-model band).
- Fonts (`app/layout.tsx`): Manrope (sans), Unbounded (display), Playfair Display (editorial serif, `font-editorial`).
- Motion primitives in `globals.css`: `[data-reveal]` (+ `.is-revealed`), `.ui-bar`, `.ui-grow`, `.flow-line`, `.flow-dash`, `.stage-enter`, `.loop-pulse`, `.cycle-fill`, `.marquee-track` (+ `.marquee-host` hover-pause), `.scanline`, `.grain-overlay`, `.page-in`, `.peek-frame` / `.peek-body` / `.peek-host`, `.catalog-card`, `.route-curtain`, `.text-outline`. All disabled under `prefers-reduced-motion`; reveal also falls back for no-JS (`<noscript>` in layout) and print.

## Key components
- `components/Motion.tsx` — `MotionRoot` (global reveal observer, incl. late-mounted nodes), `ScrollProgress`, `Parallax`.
- `components/IdeaToBusiness.tsx` — pinned scroll scene "idea → working business": 8 stages, satellite nodes, gradient progress arc, accent cycle (olive/amber/light-olive), localized artifact captions, plus a stage-overview section. **All RU text must stay localized.**
- `components/ui/ProductUI.tsx` — code-drawn product mockups: `aime | assistant | showroom | saas | portal | ecommerce | ai`. No third-party screenshots (the old `public/work` and `public/aiba` assets were deleted because they showed AlexDev branding). Shared helpers: `Bar`, `Dot`, `Line`, `Chip`, `Pill`, `Spark`. `ProductUI`/`UIFrame` take `peek` — catalog mode, which masks the lower edge and eases the surface up on hover so the deliberate crop never looks accidental (the host card needs `.peek-host`). `ratio` accepts any height utility (`h-[400px]`, not just `aspect-*`) — the dashboards are fixed-height content, so a width-derived aspect ratio clips them at desktop widths.
- `components/CapabilityBand.tsx` — full-bleed display marquee (two counter-scrolling rows, solid/outlined alternating). Decorative capability nouns only — no clients, metrics or partners.
- `components/RouteCurtain.tsx` — route-change wipe. Mounted as a **sibling** of the page in `app/[locale]/layout.tsx`, never a wrapper: the transform it animates must not become a containing block for the sticky narrative scene. It tracks the previous pathname (a boolean "already ran" guard fires spuriously under React StrictMode's double effect).
- `components/Section.tsx` — editorial chapter wrapper; `index` renders the numbered rule (`04 ─── DIGITAL PRODUCTION`) and `width="wide"` (86rem) lets a section's media break out of the reading measure.
- `components/ui/Live.tsx` — `LiveNumber` (count-up), `LiveType` (typewriter), `LiveDot`.
- `components/ui/ProductConstellation.tsx` — `ProductConstellation` / `ConstellationOverlays` (desktop + phone + context event card, parallax). `cardKind: publish | handoff | quote`.
- `components/ContactLauncher.tsx` — floating contact chooser on every public page. Channels, in this exact order: **AI chat → Telegram → WhatsApp → Messenger → Instagram → Email**. Chat is first and primary and injects the real BA widget (`site.widget` in `lib/site.ts`); the messengers and Email follow. CTAs dispatch `am:open-launcher` (opens the chooser); `am:open-chat` opens the chat widget directly, bypassing the chooser, which is what the product-page CTAs use. Messenger rows come from `listPublicMessengers()`, so a channel with no configured URL simply does not render — Instagram is in that state until a handle exists (`lib/site.ts`). Email is a `mailto:` to `site.email` because the public site carries no email intake any more. The launcher also re-asserts `site.name` over the widget header title, which the hosted workspace still calls "AlexDev".
- `components/ContactCta.tsx` — dispatches `am:open-launcher`, so CTAs open the channel chooser instead of a `#contact` anchor (the site has no email intake).
- `components/BrandLogo.tsx` — the approved PNG lockup (header, footer, auth, partner shell). One artwork on a light plate in both themes; compact crop below 640px, full lockup from 640px. Asset rationale: `public/brand/README.txt`.
- `app/[locale]/opengraph-image.tsx` + `twitter-image.tsx` — per-locale 1200x630 link previews served from `public/og/`. `lib/social.ts` carries the image for pages that build their own `openGraph`, because Next merges metadata segments shallowly.
- **The old hand-rolled chat brain is gone.** `app/api/chat/route.ts`, `lib/assistant-knowledge.ts` and the scripted `reply()` were deleted; the chat is the hosted BA widget injected by `ContactLauncher`. Do not add a second answer path next to it.
- `components/products/PanelDemo.tsx` — interactive app-shell demo (dark sidebar + Dashboard / Inbox / Knowledge / Playground, working playground test).
- `components/Manifesto.tsx`, `components/Section.tsx` (serif headings), `components/HeroSystem.tsx` (ambient hero + transformation ribbon).
- Home: `app/[locale]/page.tsx`. Products hub: `app/[locale]/products/page.tsx` (ecosystem band). Product route: `app/[locale]/[product]/page.tsx`.

## Env vars
- Contact form: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, then `RESEND_API_KEY` **or** `CONTACT_WEBHOOK_URL`. Locally, without a provider, submissions are only logged (`[contact] …`).
- Chat: **no env vars.** The hosted widget's `src` and its public `key` live in `site.widget` (`lib/site.ts`). Title, greeting, colour and online state are workspace settings at `app.alex-dev.pro`, not repo settings.
- `.env.example` lists the contact-form variables **and** the Partner Platform's Supabase variables. Production values go to Vercel → Settings → Environment Variables.
- Partner Platform (Supabase, current API keys — short `sb_…` strings, not `eyJ…` JWTs): `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (browser-safe; RLS is the boundary), plus `SUPABASE_SECRET_KEY` (**server only — it maps to `service_role` and bypasses RLS**; read in `server-only` modules only: `lib/supabase/admin.ts` for the elevated client, `lib/referral/attribution.ts` for tracking availability, `lib/referral/cookie.ts` as the HMAC fallback when `REFERRAL_COOKIE_SECRET` is unset) and an optional server-side `SUPABASE_URL`. None are needed by the public site: without them `/auth/*` renders a "not usable" notice, `/partner`, `/admin` redirect to login and `/go/<code>` redirects without tracking, so `npm run build` stays green with no credentials. A `sb_secret_…` value mistakenly placed in the `NEXT_PUBLIC_` variable is refused at runtime instead of being shipped to the browser. Never commit real values; `.env*.local` is gitignored. Vercel setup: `supabase/README.md` §7.
- `next.config.ts` sets `allowedDevOrigins: ["127.0.0.1"]` so Playwright/`localhost` runs can load dev assets.

## Hard rules (keep these)
- **No AlexDev / `alex-dev.pro` branding visible to visitors.** The unavoidable `alex-dev.pro` references are the hosted widget's script origin (`site.widget.src` in `lib/site.ts`) and the note explaining the title override in `components/ContactLauncher.tsx`. The workspace behind that key still calls itself "AlexDev", so the launcher overwrites the panel header title with `site.name` on every sync tick; once the dashboard `title` is changed to AI MARK wording that override becomes a no-op and can be deleted.
- Do not fabricate clients, revenue, partners, countries, investment amounts, ROI, case studies.
- Investor wording stays generic (see `InvestorsSection.tsx`).
- Don't invent contact handles — public channels are the site chat widget plus the URLs in `site.messengers` (`lib/site.ts`). A channel with no URL is hidden rather than guessed at.
- Chat facts come from the hosted orchestrator, not this repo. Public pricing in `content/packages.ts` and `content/products/assistant.ts` must agree with the product pages.
- The chat must not open with a request for a contact: asking for an email on the first message is what made the old scripted widget useless.
- Check horizontal overflow after layout changes (script above).

## Done (design round: catalog + premium pass)
- **`SaasMock` and `PortalMock` rebuilt to e-commerce depth.** Both are now five-band app surfaces: toolbar with section tabs / account switcher → four KPI tiles (value + delta chip + `Spark` micro trend line) → data body (usage chart, tenant table, orders table with stage progress bars, document pack, integration sync) → compliance footer. `SaasMock` uses a two-column body (chart + tenants left, health rail with roles / recent deploys right) so nothing is squeezed by `flex-1`.
- Charts read as charts: `Bar` is capped at 16px and the troughs use `justify-between`, so wider frames grow spacing instead of fattening columns.
- **Catalog hover pass.** `products/page.tsx` cards gained `.catalog-card` (gradient accent rail on hover, arrow nudge), a lift + shadow step, staggered reveal delays, and `peek` previews: the mock's lower edge dissolves and the surface eases up on hover, turning the old hard crop into an intentional "live window".
- **Preview frames are sized by height, not aspect ratio.** `DigitalProductionShowcase` uses `h-[380px] sm:h-[390px] lg:h-[400px]`; a width-derived ratio clipped the dashboards on desktop by 30–40px. The mocks have `overflow-hidden` roots so they can never paint over neighbouring bands.
- **Premium composition.** `Section` gained an editorial numbered rule (`01 … 10`) and a `wide` (86rem) variant, used by Digital Production so the showcase becomes the page's centrepiece. New full-bleed `CapabilityBand` (two counter-scrolling rows of oversized solid/outlined type, paused on hover) sits between the pinned narrative and the chapters.
- **Route transition.** New `RouteCurtain` wipes an ink panel with a mark→warm leading edge and the wordmark across the viewport on client navigation only — skipped on first paint, skipped under `prefers-reduced-motion`, mounted as a sibling so sticky keeps working.

## Done (this round)
Replaced the scripted demo chat with the live hosted AI Business Assistant widget (real orchestrator, leads into the AlexDev Inbox workspace). `components/ContactLauncher.tsx` is the floating contact chooser (AI chat → Telegram → WhatsApp → Messenger → Instagram → Email); the public site has no email intake, so Email is a `mailto:` and the CTAs open the chooser. Brand: the approved AI MARK PNG is installed in `public/brand/`, the header, footer, auth screens and partner shell render it, favicon/icon/apple-icon were rebuilt from it, and both per-locale 1200x630 link previews were regenerated from it by `scripts/build-og-previews.py`.

## Open — hosted widget workspace
Checked against `GET https://app.alex-dev.pro/api/webchat/<key>/config` on 2026-09-22. These are workspace settings, not repo settings, so they need fixing in the AlexDev dashboard:
1. `title: "AlexDev"` — must become AI Mark wording; a public "AlexDev" label violates the hard rule above.
2. `greeting` is English-only — `?lang=ru` is ignored by the config endpoint, so **/ru visitors currently read an English greeting** (confirmed live). Needs a Russian greeting or a per-locale field from the backend.
3. `online: false` — the widget renders, but the channel should be online to answer.
4. `color: "#111827"` — the site accent is the olive `--mark`; align it for a native look.
   No domain allowlist blocks us: a session request with `Origin: https://ai-mark.agency` returns `200`.

## Done (earlier rounds)
Premium light palette, editorial serif, motion system, pinned narrative scene, dark cinematic operating-model chapter, manifesto, hero motion + ribbon, product mockups with live counters/typing, product constellation on all three product heroes, e-commerce mock with real product cards, products-hub ecosystem band, page transitions, embedded AI chat widget, interactive panel demo, EN routing fix, all AlexDev assets removed.

## Done (Partner Platform — Phase 4A foundation)
Additive, opt-in Supabase foundation for the Partner Platform. **The public site is untouched**: `/`, `/ru`, `/partners`, `/ru/partners`, product and investor pages all still prerender, and everything builds with no credentials present.

- **Auth** — `@supabase/ssr` + Server Actions only; there is deliberately no browser-side Supabase client yet. Email/password and magic link, PKCE callback at `/auth/callback` (a future Google provider reuses it with no new route). The Google Cloud project that owns the OAuth client is **AI MARK** (project id `ai-mark-509509`) on the personal account `edwardsonin1@gmail.com` (Edward Sonin), not the Webtransfer project. Client ID and secret stay in the Supabase dashboard, never in this repo. The secret key is confined to `lib/supabase/admin.ts`, which is `server-only`. Uses the current publishable/secret API keys (`sb_publishable_…` / `sb_secret_…`); the project signs JWTs asymmetrically (ES256), so `getClaims()` verifies locally with no Auth round-trip.
- **Authorization** — roles are rows in `public.user_roles` (`partner`, `admin`), never a hardcoded email or a client-side flag. Four layers: `proxy.ts` session refresh → `app/{partner,admin}/layout.tsx` (session) → `(platform)/layout.tsx` (role + partner record) → every page re-checks in `lib/auth/dal.ts` next to its own data. Queries always run through the user's own session, so RLS is an independent second gate.
- **Schema** — `supabase/migrations/*` (6 files): `profiles`, `partner_profiles`, `partner_relationships`, `partner_status_history`, `user_roles`; DB-generated `partner_id` (`AM-001042`) and referral codes; signup provisioning trigger; status-audit trigger.
- **RLS** — enabled on all five tables, no blanket policy anywhere. A partner reads only their own profile, partner profile, status history and roles; `anon` has no privileges at all; admin has full access. The sponsor edge is single-valued, immutable and impossible for a partner to set, and `partner_profiles.sponsor_partner_id` is a derived, write-once pointer.
- **Verified for real** — `bash supabase/tests/run-rls-tests.sh` applies the migrations verbatim to a throwaway local PostgreSQL (through a Supabase-compat shim) and runs assertions including "a partner cannot grant themselves admin", "a partner cannot have two sponsors", and "hostile signup metadata is sanitised rather than fatal". (Phase 4A alone was 82; the same suite now runs **127** with Phase 4B added.)
- **Routes** — `/partner` + dashboard, profile, network, customers, sales, commissions, payouts, resources, no-access; `/admin` + partners, network, orders, commissions, payouts, audit. Dashboard and profile render real data; the rest are honest "Planned" panels. Only the dashboard and the admin overview show figures, and anything not yet computed is a `—` — never a simulated number.
- **Design** — `components/platform/*` reuses the existing tokens, `BrandLogo`, rounded cards and Manrope/Unbounded. One new token, `--danger`, was added to `app/globals.css`; nothing on the public site references it. Verified at 390px: `documentElement.scrollWidth === 390` (no horizontal overflow), metrics collapse to a 2x2 grid, and the section nav becomes a horizontally scrollable pill bar.
- **Routing gotcha to keep** — `proxy.ts` skips `/partner`, `/admin` and `/auth` from the locale rewrite with a **boundary-aware** check. A naive `startsWith("/partner")` would have captured the public `/partners` page and broken it.
- Full detail, including how to bootstrap the first admin without committing an email: `supabase/README.md`.

## Done (Partner Platform — Phase 4B referral engine)
Reliable, server-side referral attribution. **The public site is untouched**: `/`, `/ru`, `/partners`, `/ru/partners`, product and investor pages still prerender, and everything builds with no credentials.

- **The route** — `GET /go/[code]` (`app/go/[code]/route.ts`). Validates the code against `partner_profiles` server-side, records a click, preserves UTM source/medium/campaign (plus term/content on the redirect), sets the attribution cookie and 302s to the intended landing page. `?to=` accepts internal paths only (same-origin proof, reserved prefixes refused, fallback `/partners`) and the URL never contains a partner or user id. `no-store` + `X-Robots-Tag: noindex` + `robots.ts` disallow `/go/`. `proxy.ts` keeps `/go` out of the locale rewrite — the same boundary-aware rule that protects `/partners` from `/partner`.
- **Attribution** — a signed, **HTTP-only**, same-site, first-party cookie (`am_ref`): HMAC-SHA256 over `{code, issuedAt, clickId}`, **30-day** window, no personal data. `lib/referral/{rules,cookie}.ts` are pure and dependency-free (so the unit tests run the real code); `lib/referral/attribution.ts` is `server-only` and re-validates the code against the database on every read. A reload inside 30 minutes reuses the recorded click instead of inflating the count; a different link re-attributes (last link wins).
- **Rules** — *Partner signup: last valid partner referral before signup. Customer lead: last valid partner referral within 30 days before lead creation.* Documented in the migration headers, `lib/referral/rules.ts`, the README and the dashboard copy.
- **Schema** — `supabase/migrations/20260922090600_phase4b_referral_schema.sql` + `…090700_phase4b_referral_rls.sql`: `referral_clicks` (id, partner_id, referral_code, landing_path, utm_source/medium/campaign, created_at — **no IP, no user agent**), `leads` (attribution + the existing contact fields), `attribution_source`/`attribution_code` on `partner_relationships`, and `public.partner_referral_stats()`. A single-paste bundle for the live project is `supabase/.generated/phase4b-all.sql`.
- **RLS** — enabled on both new tables, read-your-own-or-admin, **no write policy at all**, `authenticated` granted `SELECT` only, `anon` granted nothing. Re-verified: 7 tables, 22 policies, no `using (true)` anywhere.
- **Sponsor is server-controlled** — `public.attribute_partner_signup()` is `SECURITY DEFINER` and executable by **`service_role` only**. A partner calling PostgREST gets `permission denied for function`; a raw GoTrue signup gets no sponsor at all (fail-closed); a `sponsor_partner_id` in client signup metadata is ignored. It refuses unknown/malformed/reserved/suspended codes, self-referral, duplicates, foreign click ids and accounts older than 15 minutes (`stale_target`). The Server Action additionally rejects self-referral against the already-signed-in account, and only attributes when the signup really created a new account.
- **Leads** — `/api/contact` keeps its existing email/webhook delivery untouched and now also writes a `leads` row, attributed when the visitor carried a valid cookie, `direct` otherwise. A failed DB write is logged and changes nothing about the response.
- **Dashboard** — a real referral section (`components/platform/ReferralPanel.tsx`): Partner ID, referral code, referral URL, copy button, and the three real counters from the counts-only rollup (so a sponsor still cannot enumerate their downline). A count that could not be read is `—`, never 0. No financial numbers.
- **Verified** — `npm test` 14/14 (no database). `npm run test:rls` **127/127** on a throwaway PostgreSQL. Migrations applied to the live project, then `npm run verify:referral` **69/69**: new tables reachable, `anon` and a partner JWT blocked from every write and from the RPC, every rejection path (`invalid_code`, `self_referral`, `no_target`, `stale_target`, `invalid_click`, `already_attributed`), a real attributed edge with provenance, the counts-only rollup, and the whole HTTP half — 302 with UTM preserved, HttpOnly/SameSite cookie, no internal id in the URL, reload dedupe, invalid code records nothing, attributed/direct/tampered/expired leads, public pages intact. Browser suite **29/29, 1 skip** (the form signup is skipped because the live project has email confirmation ON and the built-in SMTP quota is exhausted; the same rule is proven by the RPC run). Phase 4A live suite still **37/37**.
- **Production impact** — Phase 4B **does** need `SUPABASE_SECRET_KEY` at runtime on the server (three writes are impossible for a browser session by design). Optional `REFERRAL_COOKIE_SECRET` signs the cookie. Without the secret the engine degrades honestly: redirects work, nothing is recorded, build stays green.

## Next (agreed backlog)
1. Small-frame density: at 390px wide the taller mocks crop cleanly but lose their footer bands. If that matters, gate individual bands behind Tailwind container queries (`@container` on the frame body) rather than shrinking type.
2. In-mockup life: the KPI sparklines draw once — consider a slow redraw or a moving caret on the "live" rows.
3. `AimeMock` / `AssistantMock` / `ShowroomMock` are still the older, thinner structure (the hub cards crop them heavily). Extend the same five-band treatment, or give the hub cards a compact variant.
4. Chat: fix the hosted workspace items above (title, RU greeting, online, colour). There is no repo-side credential left to plug in.
5. Brand: `--mark` is olive while the approved logo is amber/graphite, so the header pairs an orange mark with a green CTA. Decide whether to re-tint the site accents to the logo palette.
6. Partner Platform Phase 4C: the qualifying sale that finalises a sponsor (`partner_relationships.confirmed_at` / `locked_at` already exist for it, and `attribution_source`/`attribution_code` already record how the edge was decided), then L1–L5 distribution and commissions. **Not started — Phase 4B stops at attribution.**
7. Partner Platform: profile editing (Server Actions + a Supabase Storage avatar policy), and the admin screens over the schema that already exists.
8. Replace the hand-written `lib/supabase/database.types.ts` with `npx supabase gen types typescript` once the project ref exists, so the types cannot drift from the migrations.

## Last commit

The Phase 4A + Phase 4B work is **uncommitted** — the last commit on `main` only
contains the public-site work. `git log --oneline -1` shows it; `git status` is
the authoritative list of what a new session would be committing. Do not commit
or push without being asked.
