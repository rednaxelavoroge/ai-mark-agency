# AI Mark Agency

Production landing for **[ai-mark.agency](https://ai-mark.agency)** — an AI-native marketing company. Most ops run through an AI system and specialized agents; humans own strategy, clients, and key decisions. Not a SaaS storefront and not an investment page.

Source of truth: this GitHub repo. Built for Vercel.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

- English (default): http://localhost:3000/
- Russian: http://localhost:3000/ru

`CONTACT_TO_EMAIL` is required in production. In `next dev`, briefs are logged to the server console unless `RESEND_API_KEY` or `CONTACT_WEBHOOK_URL` is set.

## Env

See `.env.example`:

| Variable | Purpose |
| --- | --- |
| `CONTACT_TO_EMAIL` | Operator inbox for `/api/contact` |
| `CONTACT_FROM_EMAIL` | Optional From header (Resend) |
| `RESEND_API_KEY` | Send via [Resend](https://resend.com) |
| `CONTACT_WEBHOOK_URL` | Optional JSON webhook instead of Resend |

Never commit secrets. `.env.local` is gitignored.

## Content

USD retainers live in `content/packages.ts`. EN/RU copy lives in `content/copy.ts`.

Packages:

- **Starter** ~$1,200/mo — Instagram + approval path, 1 brand
- **Growth** ~$2,200/mo — full Meta (IG/FB) + HITL, weekly research loop
- **Scale** ~$3,500/mo — multi-brand / heavier volume, still HITL

Tools mentioned as agency delivery (not a cloned product hub): AI Marketing Employee (AIME), AI Business Assistant, Showroom AI. Soft USD list prices and full SKUs live on [alex-dev.pro/{locale}/products](https://www.alex-dev.pro/en/products). The landing shows three equal cards plus a B2B strip for agencies that want AIME Agency/License themselves.

**Channels & growth** is a service block (not extra SKUs): Ads → Landing/CRO → Content (AIME) → Inbox (BA) → Offer (Showroom) → Analytics, plus honest channel readiness (Meta live; ads/YouTube/PR/email as retainer lines; reputation later).

## Vercel

1. Import this GitHub repo.
2. Framework preset: Next.js. Build: `npm run build`. Output: default.
3. Set `CONTACT_TO_EMAIL` (and a provider key or webhook).
4. Add domains `ai-mark.agency` and `www.ai-mark.agency`.

## DNS for ai-mark.agency

At your registrar / DNS host, point the apex and www to Vercel:

**A (apex)**

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |

**CNAME (www)**

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `cname.vercel-dns.com` |

If Vercel shows project-specific targets in the domain UI, use those. Then in the Vercel project: **Add domain** `ai-mark.agency`, redirect `www` → apex (or the reverse — pick one canonical). TLS is issued by Vercel.

Optional: add a `TXT` record if you verify the domain for Resend (SPF/DKIM as Resend instructs).

## SEO

- Metadata + Open Graph image
- `sitemap.xml` / `robots.txt`
- JSON-LD (`Organization` + `ProfessionalService`)
- `hreflang` for `en` and `ru`

## Public brand

Site name is **AI Mark Agency**. AlexDev appears only as a quiet tech-partner line in the footer.
