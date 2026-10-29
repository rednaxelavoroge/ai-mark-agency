import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { getBrandStudioCopy } from "../content/brand-studio.ts";
import {
  BRAND_STUDIO_PLAN_PRICES,
  BRAND_STUDIO_PATH,
  brandStudioPath,
} from "./brand-studio.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

describe("AI Brand Studio service page", () => {
  it("exposes a dedicated route helper and price config", () => {
    const src = read("lib/brand-studio.ts");
    assert.match(src, /BRAND_STUDIO_PATH = "\/ai-brand-studio"/);
    assert.match(src, /BRAND_STUDIO_PLAN_PRICES/);
    assert.equal(BRAND_STUDIO_PLAN_PRICES.start, 590);
    assert.equal(BRAND_STUDIO_PLAN_PRICES.growth, 1190);
    assert.equal(BRAND_STUDIO_PLAN_PRICES.global, 2490);
    assert.equal(brandStudioPath("en"), "/ai-brand-studio");
    assert.equal(brandStudioPath("ru"), "/ru/ai-brand-studio");
  });

  it("ships client-facing copy in every locale without banned names", () => {
    for (const locale of ["en", "ru", "ar", "ja", "tr"]) {
      const t = getBrandStudioCopy(locale);
      const blob = JSON.stringify(t);
      assert.doesNotMatch(blob, /Fastlane/i);
      assert.doesNotMatch(blob, /coming soon/i);
      assert.match(t.hero.title, /AI Brand Studio/);
      assert.equal(t.how.steps.length, 4);
      assert.equal(t.why.bullets.length, 4);
      assert.equal(t.faq.items.length, 4);
      assert.equal(t.plans.items.length, 3);
    }
  });

  it("links from home services and pricing teaser", () => {
    const home = read("app/[locale]/page.tsx");
    assert.match(home, /BrandStudioHubCard/);
    assert.match(home, /id="services"/);
    const pricing = read("app/[locale]/pricing/page.tsx");
    assert.match(pricing, /BrandStudioPricingTeaser/);
  });
});
