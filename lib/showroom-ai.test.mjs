import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { payableSkuById } from "./crypto/catalog.ts";
import { cryptoPriceUsd } from "./pricing/crypto-checkout.ts";
import { developerHomeUrl, websitesPageUrl } from "./developer.ts";
import { showroomAiCopy } from "../content/showroom-ai.ts";
import {
  SHOWROOM_AI_BRAND_PATH,
  SHOWROOM_AI_PLANS,
  SHOWROOM_AI_ROLE_PATHS,
  SHOWROOM_AI_SEPARATE_OFFERS,
  SHOWROOM_AI_SETUP_FEE_USD,
  SHOWROOM_AI_TRIAL_DAYS,
  showroomRoleHref,
  skuPayHref,
  skuPrice,
} from "./showroom-ai.ts";

/** Owner pricing decision 2026-10-06: bundle id -> [published SKU, list USD]. */
const BUNDLE_PRICES = {
  start: ["showroom-start", 89],
  business: ["showroom-growth", 249],
  pro: ["showroom-pro", 449],
};

/** Role sold on its own -> the published SKU that charges for it. */
const SEPARATE_SKUS = {
  seller: "showroom-start",
  "marketer-lite": "aime-lite",
  "marketer-pro": "aime-pro",
  "assistant-entry": "assistant-entry",
  "assistant-standard": "assistant-standard",
};

describe("Showroom AI offer structure", () => {
  it("maps every bundle to a published Showroom SKU at the decided price", () => {
    assert.deepEqual(
      SHOWROOM_AI_PLANS.map((plan) => plan.id),
      ["start", "business", "pro"],
    );

    for (const plan of SHOWROOM_AI_PLANS) {
      const [skuId, listUsd] = BUNDLE_PRICES[plan.id];
      assert.equal(plan.skuId, skuId, plan.id);

      const sku = payableSkuById(plan.skuId);
      assert.ok(sku, `${plan.id} points at a payable SKU`);
      assert.equal(sku.productRef, "showroom", plan.id);
      assert.equal(sku.amountUsd, listUsd, plan.id);

      const price = skuPrice(plan.skuId);
      assert.equal(price.listUsd, listUsd, plan.id);
      assert.equal(price.cryptoUsd, cryptoPriceUsd(listUsd), plan.id);
    }
  });

  it("applies the computed 4% crypto discount to the bundle prices", () => {
    const crypto = Object.fromEntries(
      SHOWROOM_AI_PLANS.map((plan) => [plan.id, skuPrice(plan.skuId).cryptoUsd]),
    );
    assert.deepEqual(crypto, { start: 85.44, business: 239.04, pro: 431.04 });
  });

  it("keeps the Business bundle cheaper than its two roles bought apart", () => {
    const seller = skuPrice("showroom-start").listUsd;
    const marketerLite = skuPrice("aime-lite").listUsd;
    const business = skuPrice("showroom-growth").listUsd;
    assert.ok(business < seller + marketerLite, `${business} vs ${seller + marketerLite}`);
  });

  it("leaves the legacy Showroom SKUs payable at their old amounts", () => {
    // An already-published `/pay?sku=` link or an outstanding invoice must still
    // resolve, and a catalog edit must never re-price an existing subscriber.
    assert.equal(payableSkuById("showroom-standard")?.amountUsd, 199);
    assert.equal(payableSkuById("showroom-business")?.amountUsd, 299);
  });

  it("maps every separately sold role to a payable SKU", () => {
    assert.equal(SHOWROOM_AI_SEPARATE_OFFERS.length, Object.keys(SEPARATE_SKUS).length);
    for (const offer of SHOWROOM_AI_SEPARATE_OFFERS) {
      assert.equal(offer.skuId, SEPARATE_SKUS[offer.id], offer.id);
      assert.ok(payableSkuById(offer.skuId), offer.id);
    }
  });

  it("keeps the three role pages distinct, with the Seller on the brand page", () => {
    const paths = Object.values(SHOWROOM_AI_ROLE_PATHS);
    assert.equal(new Set(paths).size, paths.length);
    assert.equal(SHOWROOM_AI_ROLE_PATHS.seller.split("#")[0], SHOWROOM_AI_BRAND_PATH);

    assert.equal(showroomRoleHref("en", "seller"), "/showroom-ai#seller");
    assert.equal(showroomRoleHref("ru", "seller"), "/ru/showroom-ai#seller");
    assert.equal(showroomRoleHref("en", "marketer"), "/ai-marketing-employee");
    assert.equal(showroomRoleHref("ru", "assistant"), "/ru/ai-business-assistant");
  });

  it("sends every call to action through the one checkout path", () => {
    assert.ok(skuPayHref("en", "showroom-growth").endsWith("/pay?sku=showroom-growth"));
    assert.ok(skuPayHref("ru", "showroom-start").includes("sku=showroom-start"));
  });

  it("keeps the setup fee and the trial length as decided", () => {
    assert.equal(SHOWROOM_AI_SETUP_FEE_USD, 300);
    assert.equal(SHOWROOM_AI_TRIAL_DAYS, 7);
  });

  it("returns null for an unknown SKU instead of throwing", () => {
    assert.equal(skuPrice("does-not-exist"), null);
  });
});

describe("Showroom AI landing copy", () => {
  const { en, ru } = showroomAiCopy;
  const roleOf = (copy, id) => copy.roles.find((role) => role.id === id);

  it("keeps RU and EN structurally identical, so no key falls back by accident", () => {
    assert.deepEqual(Object.keys(en).sort(), Object.keys(ru).sort());
    assert.deepEqual(
      en.roles.map((role) => role.id),
      ru.roles.map((role) => role.id),
    );
    for (const role of en.roles) {
      assert.deepEqual(
        roleOf(ru, role.id).capabilities.length,
        role.capabilities.length,
        role.id,
      );
    }
    assert.equal(en.plans.length, ru.plans.length);
    assert.equal(en.includedPoints.length, ru.includedPoints.length);
  });

  it("opens on the Seller role with the selling message and the trial terms", () => {
    assert.equal(ru.mantra, "Не просто ответит, а продаст.");
    assert.match(en.mantra, /sells/i);
    // The first-screen band is the Seller, not the brand in the abstract.
    assert.match(ru.heroKicker, /Продавец/);
    assert.match(en.heroKicker, /Seller/);
    // Trial length and setup fee stay placeholders, filled from the constants.
    assert.match(ru.heroTrialNote, /\{days\}/);
    assert.match(en.heroTrialNote, /\{days\}/);
    assert.match(ru.heroSetupNote, /\{fee\}/);
    assert.match(en.heroSetupNote, /\{fee\}/);
  });

  it("carries the owner's full Marketer capability set", () => {
    for (const copy of [en, ru]) {
      const marketer = roleOf(copy, "marketer");
      assert.equal(marketer.capabilities.length, 9, copy === ru ? "ru" : "en");
      // Every stage the owner listed, in order: research → audience → strategy
      // → content plan → texts → Reels/Stories → design → Telegram approval
      // with publishing → analytics.
      assert.match(marketer.capabilities[0], /research|Исследование/i);
      assert.match(marketer.capabilities[1], /audience|аудитории/i);
      assert.match(marketer.capabilities[2], /targeting|таргетинг/i);
      assert.match(marketer.capabilities[3], /content plan|Контент-план/i);
      assert.match(marketer.capabilities[4], /texts|Тексты/i);
      assert.match(marketer.capabilities[5], /Reels/);
      assert.match(marketer.capabilities[6], /design|дизайн/i);
      assert.match(marketer.capabilities[7], /Telegram/);
      assert.match(marketer.capabilities[8], /analys|Анализ/i);
      assert.match(marketer.combo, /analyst|аналитик/i);
    }
  });

  it("names the trades the Seller is configured for", () => {
    assert.match(roleOf(en, "seller").industries, /Real estate/);
    assert.match(roleOf(ru, "seller").industries, /Недвижимость/);
  });

  it("marks nothing as coming soon", () => {
    const published = JSON.stringify([en, ru]);
    assert.doesNotMatch(published, /coming soon|soon|скоро/i);
  });

  it("pairs the Seller with the Marketer in the Business and Pro bundles only", () => {
    const paired = SHOWROOM_AI_PLANS.filter((plan) => plan.roles.includes("marketer"));
    assert.deepEqual(
      paired.map((plan) => plan.id),
      ["business", "pro"],
    );
    assert.ok(en.pairPlanBadge && ru.pairPlanBadge);
  });
});

describe("AI MARK developer links", () => {
  it("points at the developer's websites page in a locale it publishes", () => {
    assert.equal(websitesPageUrl("en"), "https://alex-dev.pro/en/turnkey-websites");
    assert.equal(websitesPageUrl("ru"), "https://alex-dev.pro/ru/turnkey-websites");
    assert.equal(websitesPageUrl("es"), "https://alex-dev.pro/es/turnkey-websites");
    assert.equal(websitesPageUrl("fr"), "https://alex-dev.pro/fr/turnkey-websites");
  });

  it("falls back to the developer's English page for locales it does not publish", () => {
    // Our site ships these; alex-dev.pro does not, so a locale prefix would 404.
    for (const locale of ["zh", "id", "vi", "de", "ja", "tr"]) {
      assert.equal(
        websitesPageUrl(locale),
        "https://alex-dev.pro/en/turnkey-websites",
        locale,
      );
    }
  });

  it("links the developer credit to the developer's own site", () => {
    assert.equal(developerHomeUrl("ru"), "https://alex-dev.pro/ru");
    assert.equal(developerHomeUrl("ar"), "https://alex-dev.pro/ar");
    assert.equal(developerHomeUrl("ja"), "https://alex-dev.pro/en");
  });
});
