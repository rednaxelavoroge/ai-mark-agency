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
