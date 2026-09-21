# AI Mark — Handoff

Production: https://ai-mark.agency/ru · Repo: `rednaxelavoroge/ai-mark-agency` (branch `main`) · Deploy: Vercel (auto on push to `main`).

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
- `components/ContactLauncher.tsx` — floating contact chooser (Chat → messengers if configured → Email last). Chat injects the real BA widget (`site.widget` in `lib/site.ts`). CTAs dispatch `am:open-launcher`; `am:open-chat` opens the widget. Email scrolls to `#contact`. No invented messenger numbers.
- `app/api/chat/route.ts` — the server brain: proxies to `ASSISTANT_API_URL` when set (normalising `text|reply|answer|response|message|content|output|result|data` and OpenAI/Gemini-style SSE), otherwise talks to `AI_PROVIDER` directly with the knowledge base as a system prompt. Rate limit per IP, honeypot, history/length caps, upstream timeout. `GET /api/chat` reports `{ remote, direct, mode }` — the fastest way to check whether a brain is configured.
- `lib/assistant-knowledge.ts` — the assistant's only source of facts (company, three products, AIBA pricing $39/$99/Enterprise, setup from $300, 1 day / 3–5 days launch, channels, CRM, AI Marketing Department retainers) plus tone rules, in RU and EN. Chat answers are never invented outside this file.
- `components/products/PanelDemo.tsx` — interactive app-shell demo (dark sidebar + Dashboard / Inbox / Knowledge / Playground, working playground test).
- `components/Manifesto.tsx`, `components/Section.tsx` (serif headings), `components/HeroSystem.tsx` (ambient hero + transformation ribbon).
- Home: `app/[locale]/page.tsx`. Products hub: `app/[locale]/products/page.tsx` (ecosystem band). Product route: `app/[locale]/[product]/page.tsx`.

## Env vars
- Contact form: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, then `RESEND_API_KEY` **or** `CONTACT_WEBHOOK_URL`. Locally, without a provider, submissions are only logged (`[contact] …`).
- Chat: `ASSISTANT_API_URL` + `ASSISTANT_API_TOKEN` (+ `ASSISTANT_API_TOKEN_HEADER`, `ASSISTANT_API_EXTRA_HEADERS`, `ASSISTANT_API_MESSAGES_FIELD`) to use an existing assistant API. Without it, `AI_PROVIDER` (`openai|anthropic|gemini|deepseek`) + the matching key + `AI_MODEL` make the route call the model itself. Guards: `ASSISTANT_RATE_LIMIT`, `ASSISTANT_RATE_WINDOW_MS`, `ASSISTANT_TIMEOUT_MS`.
- **No key is required for local work**: with nothing configured the chat replies "ассистент ещё не подключён к модели" instead of failing silently. Full list in `.env.example`; production values go to Vercel → Settings → Environment Variables.
- `next.config.ts` sets `allowedDevOrigins: ["127.0.0.1"]` so Playwright/`localhost` runs can load dev assets.

## Hard rules (keep these)
- **No AlexDev / `alex-dev.pro` / "Технологии:" references anywhere public.** Verify: `grep -rn -i "alexdev\|alex-dev"` → 0.
- Do not fabricate clients, revenue, partners, countries, investment amounts, ROI, case studies.
- Investor wording stays generic (see `InvestorsSection.tsx`).
- Don't invent contact handles — only `hello@ai-mark.agency` and the on-site contact form exist.
- Chat pricing/facts may only come from `lib/assistant-knowledge.ts`, and its numbers must match `content/packages.ts` + `content/products/assistant.ts`. Update all three together.
- The chat must not open with a request for a contact: that behaviour (the old `reply()` fallback) is what made the widget useless.
- Check horizontal overflow after layout changes (script above).

## Done (design round: catalog + premium pass)
- **`SaasMock` and `PortalMock` rebuilt to e-commerce depth.** Both are now five-band app surfaces: toolbar with section tabs / account switcher → four KPI tiles (value + delta chip + `Spark` micro trend line) → data body (usage chart, tenant table, orders table with stage progress bars, document pack, integration sync) → compliance footer. `SaasMock` uses a two-column body (chart + tenants left, health rail with roles / recent deploys right) so nothing is squeezed by `flex-1`.
- Charts read as charts: `Bar` is capped at 16px and the troughs use `justify-between`, so wider frames grow spacing instead of fattening columns.
- **Catalog hover pass.** `products/page.tsx` cards gained `.catalog-card` (gradient accent rail on hover, arrow nudge), a lift + shadow step, staggered reveal delays, and `peek` previews: the mock's lower edge dissolves and the surface eases up on hover, turning the old hard crop into an intentional "live window".
- **Preview frames are sized by height, not aspect ratio.** `DigitalProductionShowcase` uses `h-[380px] sm:h-[390px] lg:h-[400px]`; a width-derived ratio clipped the dashboards on desktop by 30–40px. The mocks have `overflow-hidden` roots so they can never paint over neighbouring bands.
- **Premium composition.** `Section` gained an editorial numbered rule (`01 … 10`) and a `wide` (86rem) variant, used by Digital Production so the showcase becomes the page's centrepiece. New full-bleed `CapabilityBand` (two counter-scrolling rows of oversized solid/outlined type, paused on hover) sits between the pinned narrative and the chapters.
- **Route transition.** New `RouteCurtain` wipes an ink panel with a mark→warm leading edge and the wordmark across the viewport on client navigation only — skipped on first paint, skipped under `prefers-reduced-motion`, mounted as a sibling so sticky keeps working.

## Done (this round)
AI chat is no longer a scripted demo: `POST /api/chat` with a remote-assistant proxy + direct-model fallback, verification tests, session history, in-chat lead capture into `/api/contact`, per-IP rate limit and honeypot, and the panel no longer overflows the viewport. **Still open: plug in the real assistant API URL + token (or a model key) — the code is ready, only the credential is missing.**

## Done (earlier rounds)
Premium light palette, editorial serif, motion system, pinned narrative scene, dark cinematic operating-model chapter, manifesto, hero motion + ribbon, product mockups with live counters/typing, product constellation on all three product heroes, e-commerce mock with real product cards, products-hub ecosystem band, page transitions, embedded AI chat widget, interactive panel demo, EN routing fix, all AlexDev assets removed.

## Next (agreed backlog)
1. Small-frame density: at 390px wide the taller mocks crop cleanly but lose their footer bands. If that matters, gate individual bands behind Tailwind container queries (`@container` on the frame body) rather than shrinking type.
2. In-mockup life: the KPI sparklines draw once — consider a slow redraw or a moving caret on the "live" rows.
3. `AimeMock` / `AssistantMock` / `ShowroomMock` are still the older, thinner structure (the hub cards crop them heavily). Extend the same five-band treatment, or give the hub cards a compact variant.
4. Chat: plug in the real assistant API URL + token (or a model key) — see the round note above.

## Last commit
See `git log --oneline -1`.
