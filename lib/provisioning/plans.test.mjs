import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PAYABLE_SKUS } from "../crypto/catalog.ts";
import {
  joinProvisioningPath,
} from "./client.ts";
import {
  productPlanForSku,
  subscriptionSkuPlanTable,
} from "./plans.ts";

describe("productPlanForSku", () => {
  it("maps every PAYABLE_SKUS subscription id to the product API plan", () => {
    const expected = {
      "aime-lite": "lite",
      "aime-pro": "pro",
      "assistant-entry": "entry",
      "assistant-standard": "standard",
      "showroom-standard": null,
      "showroom-business": null,
    };

    for (const sku of PAYABLE_SKUS) {
      const plan = productPlanForSku(sku.productRef, sku.id);
      assert.equal(plan, expected[sku.id], sku.id);
    }

    assert.deepEqual(subscriptionSkuPlanTable(), PAYABLE_SKUS.map((row) => ({
      sku: row.id,
      product: row.productRef,
      plan: expected[row.id],
    })));
  });

  it("rejects mismatched product_ref", () => {
    assert.equal(productPlanForSku("assistant", "aime-lite"), null);
  });
});

describe("joinProvisioningPath", () => {
  it("joins base /api/provisioning with /tenants without double slashes", () => {
    assert.equal(
      joinProvisioningPath("https://panel.alex-dev.pro/api/provisioning", "/tenants"),
      "https://panel.alex-dev.pro/api/provisioning/tenants",
    );
    assert.equal(
      joinProvisioningPath("https://panel.alex-dev.pro/api/provisioning/", "/tenants"),
      "https://panel.alex-dev.pro/api/provisioning/tenants",
    );
    assert.equal(
      joinProvisioningPath("https://app.alex-dev.pro/api/provisioning", "tenants/tn_1/magic-link"),
      "https://app.alex-dev.pro/api/provisioning/tenants/tn_1/magic-link",
    );
  });
});
