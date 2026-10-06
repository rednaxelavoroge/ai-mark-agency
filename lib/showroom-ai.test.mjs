import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { payableSkuById } from "./crypto/catalog.ts";
import { cryptoPriceUsd } from "./pricing/crypto-checkout.ts";
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
