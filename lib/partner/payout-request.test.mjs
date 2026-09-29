import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PARTNER_PAYOUT_MIN_USD,
  canRequestPayout,
} from "./payout.ts";

describe("partner payout request guards", () => {
  it("enforces minimum threshold and blocks double requests", () => {
    assert.equal(PARTNER_PAYOUT_MIN_USD, 50);

    assert.deepEqual(
      canRequestPayout({
        payableAmount: "49.99",
        currency: "USD",
        hasOpenPayout: false,
        hasDestination: true,
      }),
      { ok: false, reason: "below_minimum" },
    );

    assert.deepEqual(
      canRequestPayout({
        payableAmount: "50.00",
        currency: "USD",
        hasOpenPayout: false,
        hasDestination: true,
      }),
      { ok: true },
    );

    assert.deepEqual(
      canRequestPayout({
        payableAmount: "120.00",
        currency: "USD",
        hasOpenPayout: true,
        hasDestination: true,
      }),
      { ok: false, reason: "open_payout" },
    );

    assert.deepEqual(
      canRequestPayout({
        payableAmount: "120.00",
        currency: "USD",
        hasOpenPayout: false,
        hasDestination: false,
      }),
      { ok: false, reason: "missing_destination" },
    );
  });
});
