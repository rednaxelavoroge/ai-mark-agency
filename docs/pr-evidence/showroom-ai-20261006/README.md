# Showroom AI brand + pricing — PR evidence (2026-10-06)

Captured against a production build (`npm run build` → `next start -p 3100`) of the
branch `claude/showroom-ai-brand-pricing`.

## Files

| File | What it shows |
| --- | --- |
| `home-first-screen-{360,390,1280}.png` | Home first screen — **the Seller role**: `Showroom AI · Продавец`, «Не просто ответит, а продаст.», the live demo-chat button (the site's own launcher widget, opened with a Showroom opening line) and the terms line «7 дней бесплатно · сетап $300 (по желанию)». |
| `home-first-screen-en-1280.png` | The same first screen in EN, so both full-copy locales are on record. |
| `home-role-linkage-{390,1280}.png` | The «Связка: маркетолог приводит клиентов — продавец продаёт» block: two large equal cards (Seller with its industries line, Marketer with its full capability set and «Маркетолог, SMM, дизайнер и аналитик в одном») plus the smaller Business Assistant card. Every card links to its role page. |
| `home-featured-products-en-1280.png` | The three home product cards as roles of one brand: `Showroom AI · Seller / Business Assistant / Marketer` with catalog-resolved entry prices. |
| `pricing-showroom-ai-{360,390,1280}.png`, `pricing-showroom-ai-en-1280.png` | The Showroom AI block on `/pricing` (anchor `#showroom-ai`): bundles $89 / $249 / $399 with computed USDT/USDC amounts (−4%: 85.44 / 239.04 / 383.04), **Business and Pro emphasised** (accent bar, ring, «Продавец и Маркетолог вместе»), the roles sold separately, setup free vs $300, the 7-day trial, and the «Нет сайта? Сделаем под ключ» line pointing at the AI MARK websites page. |
| `role-page-seller-{360,390,1280}.png` | `/showroom-ai` — the Seller role page — with the linkage block (`#seller`). |
| `role-page-marketer-banner-390.png` | `/ai-marketing-employee` (URL unchanged) — the Showroom AI role banner at the top of the long-published Marketer page. |
| `powered-by-{marketer-390,seller-1280}.png` | The «Powered by AI MARK» band at the foot of the role pages, linking to alex-dev.pro. |

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
combinations, after the linkage block and the plan emphasis were added.

## Notes on the captures

* The tall element clips (`#showroom-ai`, `#seller`, `#roles`, `#products`) stitch a page
  taller than the viewport, so the site's fixed header appears once in the middle of the
  image. That is a capture artifact, not a layout defect.
* `playwright` is not a dependency of this repo (only `puppeteer-core` is). It was
  installed outside the repo and linked into `node_modules/playwright` for these
  captures; `package.json` / `package-lock.json` are unchanged.
* The `npm test` suite needs Node ≥ 22 (`--experimental-strip-types`); the system `node`
  here is v20.19.2, so it was run with `/exec-daemon/node` (v22.14.0): **107/107 pass**.

## Pre-existing, untouched by this PR

* `npm run lint` reports one error, `prefer-const` in
  `app/admin/(platform)/provisioning/page.tsx:14` (`'rows' is never reassigned`), plus
  25 warnings. None of them are in the files this PR touches or adds.
* At exactly 1280px the desktop header nav starts under the logo ("Главная" is partly
  covered). The header is not part of this change.
