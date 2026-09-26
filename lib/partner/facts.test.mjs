/**
 * Partner Hub facts — offline, no database.
 *
 *   node --test lib/partner/facts.test.mjs
 *
 * Proves the hub points at files that exist, published product limits, and
 * referral URLs that keep the partner code. It does not invent banners or
 * commission figures.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { resolveLandingPath } from "../referral/rules.ts";
import {
  PARTNER_BRAND_ASSETS,
  PARTNER_DEMO_CHANNELS,
  PARTNER_PRODUCT_LIMITS,
} from "./facts.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

test("brand files listed for partners exist on disk", () => {
  assert.equal(PARTNER_BRAND_ASSETS.length, 5);
  for (const asset of PARTNER_BRAND_ASSETS) {
    assert.match(asset.href, /^\/(brand|og)\//);
    const path = join(root, "public", asset.href.slice(1));
    assert.equal(existsSync(path), true, `${asset.href} is missing`);
  }
});

test("demo channels are public product pages, not invented tenants", () => {
  assert.equal(PARTNER_DEMO_CHANNELS.aime.liveChat, false);
  assert.equal(PARTNER_DEMO_CHANNELS.aime.panelDemo, false);
  assert.equal(PARTNER_DEMO_CHANNELS.showroom.liveChat, false);
  assert.equal(PARTNER_DEMO_CHANNELS.assistant.liveChat, true);
  assert.equal(PARTNER_DEMO_CHANNELS.assistant.panelDemo, true);
  assert.equal(PARTNER_DEMO_CHANNELS.aime.page, "/ai-marketing-employee");
  assert.equal(PARTNER_DEMO_CHANNELS.assistant.page, "/ai-business-assistant");
  assert.equal(PARTNER_DEMO_CHANNELS.showroom.page, "/showroom-ai");
});

test("product limits refuse scheduler / invented-price claims", () => {
  assert.match(PARTNER_PRODUCT_LIMITS.aime.en.join(" "), /Not a post scheduler/);
  assert.match(PARTNER_PRODUCT_LIMITS.aime.en.join(" "), /TikTok posting is not available/);
  assert.match(PARTNER_PRODUCT_LIMITS.assistant.en.join(" "), /does not calculate a commercial proposal/);
  assert.match(PARTNER_PRODUCT_LIMITS.showroom.en.join(" "), /Not a support chatbot/);
  for (const product of Object.values(PARTNER_PRODUCT_LIMITS)) {
    const text = `${product.en.join(" ")} ${product.ru.join(" ")}`;
    assert.doesNotMatch(text, /ROI|гарантир/i);
  }
});

test("demo landings are allowed referral targets, cabinet is not", () => {
  for (const channel of Object.values(PARTNER_DEMO_CHANNELS)) {
    assert.equal(resolveLandingPath(channel.page, {}), channel.page);
  }
  assert.equal(
    resolveLandingPath("/pay?sku=aime-lite", {}),
    "/pay?sku=aime-lite",
  );
  assert.equal(
    resolveLandingPath("/partner/resources", {}),
    "/partners",
    "a referral link must not land inside the signed-in cabinet",
  );
});
