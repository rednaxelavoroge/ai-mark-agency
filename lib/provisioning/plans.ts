/**
 * Product tenant API plan ids (not AI MARK sku ids).
 * Keep in sync with PAYABLE_SKUS in lib/crypto/catalog.ts.
 */
const SKU_PRODUCT_PLAN: Readonly<
  Record<string, { product: "aime" | "assistant" | "showroom"; plan: string | null }>
> = Object.freeze({
  "aime-lite": { product: "aime", plan: "lite" },
  "aime-pro": { product: "aime", plan: "pro" },
  "assistant-entry": { product: "assistant", plan: "entry" },
  "assistant-standard": { product: "assistant", plan: "standard" },
  "showroom-standard": { product: "showroom", plan: null },
  "showroom-business": { product: "showroom", plan: null },
});

/**
 * Maps a subscription SKU + product_ref to the plan id the product API expects.
 * Returns null when the product has no API (Showroom) or the pair is invalid.
 */
export function productPlanForSku(productRef: string, skuId: string): string | null {
  const row = SKU_PRODUCT_PLAN[skuId];
  if (!row || row.product !== productRef) return null;
  return row.plan;
}

export function provisioningPlanMissingReason(productRef: string, skuId: string): string {
  if (productRef === "showroom") {
    return "Showroom product tenant API is not available yet; manual activation required";
  }
  const row = SKU_PRODUCT_PLAN[skuId];
  if (!row) {
    return `Unknown subscription SKU ${skuId}; no product plan mapping`;
  }
  if (row.product !== productRef) {
    return `SKU ${skuId} does not belong to product ${productRef}`;
  }
  return `No product plan mapping for SKU ${skuId}`;
}

export function subscriptionSkuPlanTable(): { sku: string; product: string; plan: string | null }[] {
  return Object.entries(SKU_PRODUCT_PLAN).map(([sku, row]) => ({
    sku,
    product: row.product,
    plan: row.plan,
  }));
}
