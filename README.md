# AI Mark Agency

Production site for **[ai-mark.agency](https://ai-mark.agency)** — an AI-native venture and marketing company. Core line: from idea to a working business. English at `/`, Russian at `/ru`. Additional locales can be added to `site.locales` in `lib/site.ts` plus a copy pack in `content/copy.ts`.

Source of truth: this GitHub repo. Built for Vercel.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

- English (default): http://localhost:3000/
- Russian: http://localhost:3000/ru

`CONTACT_TO_EMAIL` is required in production. In `next dev`, requests are logged to the server console unless `RESEND_API_KEY` or `CONTACT_WEBHOOK_URL` is set.

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

EN/RU copy lives in `content/copy.ts`. Department retainers live in `content/packages.ts` (Starter $1,200 / Growth $2,200 / Scale $3,500) as **one** commercial format among products, marketing services, production, business creation, and enterprise.

Product routes on this domain:

- `/ai-marketing-employee` and `/ru/ai-marketing-employee`
- `/ai-business-assistant` and `/ru/ai-business-assistant`
- `/showroom-ai` and `/ru/showroom-ai`
- `/products` hub

The landing defaults to a **light** theme; a header toggle persists light/dark in `localStorage` + cookie.

## Vercel

1. Import this GitHub repo.
2. Framework preset: Next.js. Build: `npm run build`. Output: default.
3. Set `CONTACT_TO_EMAIL` (and a provider key or webhook).
4. Add domains `ai-mark.agency` and `www.ai-mark.agency`.

## Public brand

Site name is **AI Mark Agency**. AlexDev appears only as a quiet tech-partner line in the footer.
