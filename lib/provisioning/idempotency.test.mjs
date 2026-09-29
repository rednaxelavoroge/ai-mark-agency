import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { idempotencyKey } from "./client.ts";

describe("provisioning idempotency", () => {
  it("builds stable keys per invoice and action", () => {
    assert.equal(idempotencyKey("INV-20260929-AAAA", "create"), "INV-20260929-AAAA:create");
    assert.equal(idempotencyKey("INV-20260929-AAAA", "magic_link"), "INV-20260929-AAAA:magic_link");
    assert.notEqual(
      idempotencyKey("INV-20260929-AAAA", "create"),
      idempotencyKey("INV-20260929-BBBB", "create"),
    );
  });
});
