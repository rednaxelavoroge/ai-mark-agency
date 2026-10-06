# Showroom AI brand + pricing — PR evidence (2026-10-06)

Captured against a production build (`npm run build` → `next start -p 3100`) of the
branch `claude/showroom-ai-brand-pricing`.

## Files

| File | What it shows |
| --- | --- |
| `home-first-screen-{360,390,1280}.png` | Home first screen: the Showroom AI band with the live demo-chat button (the site's own launcher widget, opened with a Showroom opening line) and the trial/setup line. |
| `home-featured-products-en-1280.png` | The three home product cards as roles of one brand: `Showroom AI · Seller / Business Assistant / Marketer` with catalog-resolved entry prices. |
| `pricing-showroom-ai-{360,390,1280}.png` | The new Showroom AI block on `/pricing` (anchor `#showroom-ai`): bundles $89 / $249 / $449 with computed USDT/USDC amounts (−4%), the roles sold separately, setup free vs $300, the 7-day trial. |
| `role-page-seller-{360,390,1280}.png` | `/showroom-ai` — the Seller role page — with the three-role cards (`#seller`). |
| `role-page-marketer-banner-390.png` | `/ai-marketing-employee` (URL unchanged) — the Showroom AI role banner at the top of the long-published Marketer page. |

## Commands

```bash
npm run build && npx next start -p 3100
export BASE=http://localhost:3100
node scripts/shot.mjs /ru <out.png> 390 780                       # viewport
node scripts/shot.mjs /ru/pricing <out.png> 390 900 0 '#showroom-ai'  # element clip
BASE=$BASE WIDTHS=360,390,1280 \
  ROUTES="/,/pricing,/showroom-ai,/ai-marketing-employee,/ai-business-assistant,/products,/ru,/ru/pricing,/ru/showroom-ai,/ru/ai-marketing-employee,/ru/ai-business-assistant,/ru/products" \
  node scripts/check-overflow.mjs
```

`check-overflow.mjs` result: **OK: no horizontal overflow** for all 36 width × route
combinations.

## Notes on the captures

* The tall element clips (`#showroom-ai`, `#seller`) stitch a page taller than the
  viewport, so the site's fixed header appears once in the middle of the image. That is
  a capture artifact, not a layout defect.
* `playwright` is not a dependency of this repo (only `puppeteer-core` is). It was
  installed outside the repo and linked into `node_modules/playwright` for these
  captures; `package.json` / `package-lock.json` are unchanged.

## Pre-existing, untouched by this PR

* `npm run lint` reports one error, `prefer-const` in
  `app/admin/(platform)/provisioning/page.tsx:14` (`'rows' is never reassigned`), plus
  25 warnings. None of them are in the files this PR touches or adds.
* At exactly 1280px the desktop header nav starts under the logo ("Главная" is partly
  covered). The header is not part of this change.
