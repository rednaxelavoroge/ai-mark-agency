import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { packages } from "../../content/packages.ts";
import { site } from "../site.ts";
import { normalizeBuyerEmail, optionalBuyerText } from "./buyer.ts";
import {
  PAYABLE_SKUS,
  SUBSCRIPTION_PERIOD_DAYS,
  isSubscriptionSku,
  payableSkuById,
} from "./catalog.ts";

describe("self-serve catalog", () => {
  it("keeps product list prices and drops department retainers from /pay", () => {
    const ids = PAYABLE_SKUS.map((sku) => sku.id);
    assert.deepEqual(ids, [
      "aime-lite",
      "aime-pro",
      "assistant-entry",
      "assistant-standard",
      "showroom-standard",
      "showroom-business",
      "showroom-start",
      "showroom-growth",
      "showroom-pro",
    ]);
    assert.equal(payableSkuById("starter"), null);
    assert.equal(payableSkuById("growth"), null);
    assert.equal(payableSkuById("scale"), null);
    assert.equal(payableSkuById("aime-lite")?.amountUsd, 199);
    assert.equal(payableSkuById("aime-pro")?.amountUsd, 349);
    assert.equal(payableSkuById("assistant-entry")?.amountUsd, 149);
    assert.equal(payableSkuById("assistant-standard")?.amountUsd, 249);
    assert.equal(payableSkuById("showroom-standard")?.amountUsd, 199);
    assert.equal(payableSkuById("showroom-business")?.amountUsd, 299);
    assert.equal(payableSkuById("showroom-start")?.amountUsd, 89);
    assert.equal(payableSkuById("showroom-growth")?.amountUsd, 249);
    assert.equal(payableSkuById("showroom-pro")?.amountUsd, 449);
    assert.deepEqual(
      packages.map((pkg) => [pkg.id, pkg.priceUsd]),
      [
        ["starter", 1200],
        ["growth", 2200],
        ["scale", 3500],
      ],
    );
  });

  it("marks every self-serve SKU as a 30-day subscription", () => {
    for (const sku of PAYABLE_SKUS) {
      assert.equal(isSubscriptionSku(sku), true);
      assert.equal(sku.billingPeriodDays, SUBSCRIPTION_PERIOD_DAYS);
      assert.equal(SUBSCRIPTION_PERIOD_DAYS, 30);
    }
  });
});

describe("buyer fields", () => {
  it("requires a real email and keeps name and company optional", () => {
    assert.equal(normalizeBuyerEmail("  Buyer@Example.com "), "buyer@example.com");
    assert.equal(normalizeBuyerEmail("not-an-email"), null);
    assert.equal(normalizeBuyerEmail(""), null);
    assert.equal(optionalBuyerText("  Acme  ", 160), "Acme");
    assert.equal(optionalBuyerText("   ", 160), null);
  });
});

describe("pay copy", () => {
  it("has buyer field labels in every locale", () => {
    for (const locale of site.locales) {
      const text = readFileSync(
        new URL(`../../content/locales/${locale}.ts`, import.meta.url),
        "utf8",
      );
      assert.match(text, /emailHint/, locale);
      assert.match(text, /"company"|company:/, locale);
      assert.match(text, /optional/, locale);
    }
  });
});
