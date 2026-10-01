import assert from "node:assert/strict";
import { test } from "node:test";

import {
  cryptoPriceUsd,
  listPriceUsd,
} from "./crypto-checkout.ts";

test("list price unchanged; crypto is 8% below list", () => {
  assert.equal(listPriceUsd(199), 199);
  assert.equal(cryptoPriceUsd(199), 183.08);
  assert.equal(cryptoPriceUsd(349), 321.08);
  assert.equal(cryptoPriceUsd(149), 137.08);
});
