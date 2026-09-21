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

## Deploy
Push to `main` → Vercel builds and deploys (~25s). Verify: fetch a page and look for a new marker string, or run the overflow script with `BASE=https://ai-mark.agency`.

## i18n / routing
- Locales: `en` (default, unprefixed) and `ru`. `lib/site.ts` is the source of truth.
- `proxy.ts` (Next middleware) rewrites unprefixed paths to `/en` and passes `/ru` & `/en` through. `/en` and `/en/*` DO resolve.
- Copy: `content/copy.ts` (home), `content/products/{aime,assistant,showroom}.ts` (product pages), `content/packages.ts` (pricing).

## Design system
- Tokens in `app/globals.css`: `--ink/-2/-3` (surfaces), `--paper` (text), `--mark` (olive), `--warm` (amber), `--line`. Light default; dark via `[data-theme="dark"]` (a wrapper can opt a section in, e.g. the dark operating-model band).
- Fonts (`app/layout.tsx`): Manrope (sans), Unbounded (display), Playfair Display (editorial serif, `font-editorial`).
- Motion primitives in `globals.css`: `[data-reveal]` (+ `.is-revealed`), `.ui-bar`, `.ui-grow`, `.flow-line`, `.flow-dash`, `.stage-enter`, `.loop-pulse`, `.cycle-fill`, `.marquee-track`, `.scanline`, `.grain-overlay`, `.page-in`. All disabled under `prefers-reduced-motion`; reveal also falls back for no-JS (`<noscript>` in layout) and print.

## Key components
- `components/Motion.tsx` — `MotionRoot` (global reveal observer, incl. late-mounted nodes), `ScrollProgress`, `Parallax`.
- `components/IdeaToBusiness.tsx` — pinned scroll scene "idea → working business": 8 stages, satellite nodes, gradient progress arc, accent cycle (olive/amber/light-olive), localized artifact captions, plus a stage-overview section. **All RU text must stay localized.**
- `components/ui/ProductUI.tsx` — code-drawn product mockups: `aime | assistant | showroom | saas | portal | ecommerce | ai`. No third-party screenshots (the old `public/work` and `public/aiba` assets were deleted because they showed AlexDev branding).
- `components/ui/Live.tsx` — `LiveNumber` (count-up), `LiveType` (typewriter), `LiveDot`.
- `components/ui/ProductConstellation.tsx` — `ProductConstellation` / `ConstellationOverlays` (desktop + phone + context event card, parallax). `cardKind: publish | handoff | quote`.
- `components/AssistantWidget.tsx` — global AI Business Assistant chat widget (mounted in `app/[locale]/layout.tsx`). Channel picker → chat; assistant asks a guiding question first; scripted KB replies; opens via `window.dispatchEvent(new CustomEvent("am:open-chat", { detail: { text } }))`. No invented contacts — only email/contact form/`hello@ai-mark.agency`.
- `components/products/PanelDemo.tsx` — interactive app-shell demo (dark sidebar + Dashboard / Inbox / Knowledge / Playground, working playground test).
- `components/Manifesto.tsx`, `components/Section.tsx` (serif headings), `components/HeroSystem.tsx` (ambient hero + transformation ribbon).
- Home: `app/[locale]/page.tsx`. Products hub: `app/[locale]/products/page.tsx` (ecosystem band). Product route: `app/[locale]/[product]/page.tsx`.

## Hard rules (keep these)
- **No AlexDev / `alex-dev.pro` / "Технологии:" references anywhere public.** Verify: `grep -rn -i "alexdev\|alex-dev"` → 0.
- Do not fabricate clients, revenue, partners, countries, investment amounts, ROI, case studies.
- Investor wording stays generic (see `InvestorsSection.tsx`).
- Don't invent contact handles — only `hello@ai-mark.agency` and the on-site contact form exist.
- Check horizontal overflow after layout changes (script above).

## Done (this round)
Premium light palette, editorial serif, motion system, pinned narrative scene, dark cinematic operating-model chapter, manifesto, hero motion + ribbon, product mockups with live counters/typing, product constellation on all three product heroes, e-commerce mock with real product cards, products-hub ecosystem band, page transitions, embedded AI chat widget, interactive panel demo, EN routing fix, all AlexDev assets removed.

## Next (agreed backlog)
1. Enrich `PortalMock` and `SaasMock` to the same depth as the e-commerce cards (they have numbers but a thinner structure).
2. Optional: hover/animation polish on the products-hub cards; more in-mockup life.
3. Then: continue premium pass (more full-bleed/editorial rhythm, page-transition refinement).

## Last commit
See `git log --oneline -1`.
