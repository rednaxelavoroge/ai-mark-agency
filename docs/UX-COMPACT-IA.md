# Compact IA — public site

UX logic reference (structure only, not visual brand): progressive disclosure, short first-level scan, details on demand.

## CURRENT → TARGET

| Surface | Current | Target |
| --- | --- | --- |
| Home | Long vertical pitch: hero system, capability band, idea narrative, 5 pillars, creation, pipeline, production, products, HITL chapter, manifesto, commercial, partners, why-now, investors, contact | Compact hub: hero + products rail + how-it-works rail + commercial tabs + partner strip + investor entry + contact. Same facts live in Level 2 expands. Anchor ids kept. |
| `/products` | Tall 3-column catalog cards with mock UI | Horizontal/compact cards: name, category, one line, price, CTA; Explore expands existing who/loop/price copy |
| Product pages | Long vertical product essays | Compact glance (what / channels / KB / handoff / who / commercial) then existing sections, unchanged copy |
| `/partners` | Long stacked market/product/how/network/status/kit/global/faq | First screen: what / how earn / how sale works / what I get. Then horizontal how, L1–L5, launch/hold/payout expands, infra, status, FAQ, CTA. Economics unchanged. |
| `/investors` | Full proposal rendered as a long document | Overview cards (what we build, model, products, distribution, technology, market, capital use) expanding into the same Markdown sections. No invented metrics. |

## Sitemap (unchanged routes)

- `/` and `/{locale}` — hub
- `/products`, `/ai-marketing-employee`, `/ai-business-assistant`, `/showroom-ai`
- `/partners`, `/investors`, `/pay`, `/privacy`
- Partner platform, auth, admin — not in this IA change

## Component architecture

- `components/hub/*` — presentation only. Prices and commission rates come from existing `content/` and `content/partner-program.ts`.
- Native `<details>` so Level 2 copy stays in HTML for SEO and no-JS.
- `.hub-hscroll` — horizontal snap on small screens, CSS grid from 1024px.

## Unchanged on purpose

Partner L1–L5 (15 / 5 / 3 / 2 / 1), 1.5× launch, 90 days, 14-day hold, referral rules, Supabase, auth, payments, legal wording, locale routing.
