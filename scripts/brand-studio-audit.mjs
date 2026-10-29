#!/usr/bin/env node
/**
 * Brand Studio locale audit against a running preview or local dev server.
 * Usage: BASE=https://… node scripts/brand-studio-audit.mjs
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { getBrandStudioCopy } from "../content/brand-studio.ts";

const BASE = (process.env.BASE ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const OUT = process.env.OUT_DIR ?? "/opt/cursor/artifacts";
const LOCALES = ["en", "es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const EN_MARKERS = [
  "Discuss a project",
  "See plans",
  "How it works",
  "Why us",
  "Most popular",
  "Done for you",
  "Quick answers",
  "From your domain to a month",
  "Monthly subscriptions in USD",
  "Done for you",
  "DONE FOR YOU",
  "done-for-you",
  "Done-for-you",
];

const BANNED = [/Fastlane/i, /coming soon/i, /\bGeorgia\b/i];

const PRICE_EXPECT = ["590", "1190", "2490"];

function localePath(locale, path) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const locale of LOCALES) {
  const page = await browser.newPage({ viewport: { width: 390, height: 1400 } });
  const row = {
    locale,
    pageStatus: 0,
    homeCard: "skip",
    pricingBlock: "skip",
    metaTitle: "",
    metaDescription: "",
    prices: [],
    priceOk: false,
    englishLeaks: [],
    bannedHits: [],
    overflow: 0,
    ctaDiscuss: "ok",
    ctaPlans: "ok",
    pricingLink: "ok",
    homeCardLink: "ok",
    ok: true,
  };

  try {
    const studioPath = localePath(locale, "/ai-brand-studio");
    const resp = await page.goto(`${BASE}${studioPath}`, { waitUntil: "networkidle", timeout: 90000 });
    row.pageStatus = resp?.status() ?? 0;
    if (row.pageStatus !== 200) row.ok = false;

    row.metaTitle = await page.title();
    row.metaDescription =
      (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";

    const bodyText = await page.locator("body").innerText();
    for (const marker of EN_MARKERS) {
      if (locale !== "en" && bodyText.includes(marker)) {
        row.englishLeaks.push(marker);
        row.ok = false;
      }
    }
    for (const pattern of BANNED) {
      if (pattern.test(bodyText)) {
        row.bannedHits.push(String(pattern));
        row.ok = false;
      }
    }

    const priceText = await page.locator("#plans").innerText();
    row.prices = PRICE_EXPECT.filter((p) => priceText.replace(/,/g, "").includes(p));
    row.priceOk = row.prices.length === 3;
    if (!row.priceOk) row.ok = false;

    row.overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (row.overflow > 1) row.ok = false;

    const plansHref = await page.locator('a[href="#plans"]').first().getAttribute("href");
    if (!plansHref) {
      row.ctaPlans = "missing";
      row.ok = false;
    }

    const copy = getBrandStudioCopy(locale);
    const discuss = page.getByRole("button", { name: copy.hero.ctaDiscuss, exact: false }).first();
    if ((await discuss.count()) === 0) {
      row.ctaDiscuss = "missing";
      row.ok = false;
    }

    // Home card + pricing teaser
    const homePath = localePath(locale, "/");
    await page.goto(`${BASE}${homePath}`, { waitUntil: "networkidle", timeout: 90000 });
    row.overflow = Math.max(
      row.overflow,
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    );

    const card = page.locator(`a[href*="/ai-brand-studio"]`).first();
    if ((await card.count()) === 0) {
      row.homeCard = "missing";
      row.homeCardLink = "missing";
      row.ok = false;
    } else {
      row.homeCard = "present";
      const href = await card.getAttribute("href");
      if (!href) {
        row.homeCardLink = "missing href";
        row.ok = false;
      } else {
        const cardResp = await page.request.get(`${BASE}${href.startsWith("http") ? href : href}`);
        if (cardResp.status() !== 200) {
          row.homeCardLink = String(cardResp.status());
          row.ok = false;
        }
      }
    }

    const pricingPath = localePath(locale, "/pricing");
    await page.goto(`${BASE}${pricingPath}`, { waitUntil: "networkidle", timeout: 90000 });
    const teaser = page.locator(`a[href*="ai-brand-studio"]`).first();
    if ((await teaser.count()) === 0) {
      row.pricingBlock = "missing";
      row.pricingLink = "missing";
      row.ok = false;
    } else {
      row.pricingBlock = "present";
      const href = await teaser.getAttribute("href");
      if (!href) {
        row.pricingLink = "missing href";
        row.ok = false;
      } else {
        const u = new URL(href, BASE);
        const pr = await page.request.get(u.toString());
        if (pr.status() !== 200) {
          row.pricingLink = String(pr.status());
          row.ok = false;
        }
      }
    }

    if (!row.metaTitle || row.metaTitle.length < 8) {
      row.ok = false;
    }
    if (!row.metaDescription || row.metaDescription.length < 20) {
      row.ok = false;
    }
  } catch (err) {
    row.ok = false;
    row.bannedHits.push(String(err));
  }

  results.push(row);
  await page.close();
}

await browser.close();

const md = [
  `# Brand Studio audit`,
  ``,
  `Base: ${BASE}`,
  ``,
  `| Locale | OK | Page | Meta | Prices | Overflow@390 | EN leaks | Banned | Home card | Pricing |`,
  `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |`,
  ...results.map((r) =>
    `| ${r.locale} | ${r.ok ? "✅" : "❌"} | ${r.pageStatus} | ${r.metaTitle ? "yes" : "no"} | ${r.priceOk ? "$590/$1190/$2490" : r.prices.join(",") || "fail"} | ${r.overflow}px | ${r.englishLeaks.length || "—"} | ${r.bannedHits.length || "—"} | ${r.homeCard} | ${r.pricingBlock} |`,
  ),
  ``,
  `## Details`,
  ...results
    .filter((r) => !r.ok)
    .map(
      (r) =>
        `- **${r.locale}**: leaks=${r.englishLeaks.join("; ") || "—"} banned=${r.bannedHits.join("; ") || "—"} pricingLink=${r.pricingLink} homeCardLink=${r.homeCardLink}`,
    ),
].join("\n");

writeFileSync(`${OUT}/brand-studio-audit.json`, JSON.stringify(results, null, 2));
writeFileSync(`${OUT}/brand-studio-audit.md`, md);

console.log(md);
const failed = results.filter((r) => !r.ok).length;
console.log(failed === 0 ? "\nOK: all locales passed" : `\nFAILURES: ${failed}`);
process.exit(failed === 0 ? 0 : 1);
