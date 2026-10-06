import assert from "node:assert/strict";
import { test } from "node:test";

import {
  cryptoPriceUsd,
  listPriceUsd,
} from "./crypto-checkout.ts";

test("list price unchanged; crypto is 4% below list", () => {
  assert.equal(listPriceUsd(199), 199);
  assert.equal(cryptoPriceUsd(199), 191.04);
  assert.equal(cryptoPriceUsd(349), 335.04);
  assert.equal(cryptoPriceUsd(149), 143.04);
});

test("Showroom AI bundle list prices get the same computed 4% crypto price", () => {
  // Start $89 / Business $249 / Pro $449 — never hardcode the crypto amount.
  assert.equal(cryptoPriceUsd(89), 85.44);
  assert.equal(cryptoPriceUsd(249), 239.04);
  assert.equal(cryptoPriceUsd(449), 431.04);
});
