import "server-only";

export type ProvisioningProduct = "aime" | "assistant" | "showroom";

const PRODUCT_ENV: Record<
  ProvisioningProduct,
  { urlKey: string; secretKey: string }
> = {
  aime: {
    urlKey: "AIME_PROVISIONING_URL",
    secretKey: "AIME_PROVISIONING_SECRET",
  },
  assistant: {
    urlKey: "ASSISTANT_PROVISIONING_URL",
    secretKey: "ASSISTANT_PROVISIONING_SECRET",
  },
  showroom: {
    urlKey: "SHOWROOM_PROVISIONING_URL",
    secretKey: "SHOWROOM_PROVISIONING_SECRET",
  },
};

export function productRefToProvisioningProduct(
  productRef: string,
): ProvisioningProduct | null {
  if (productRef === "aime") return "aime";
  if (productRef === "assistant") return "assistant";
  if (productRef === "showroom") return "showroom";
  return null;
}

export type ProvisioningConfig = {
  baseUrl: string;
  secret: string;
};

export function provisioningConfigForProduct(
  productRef: string,
): ProvisioningConfig | null {
  const key = productRefToProvisioningProduct(productRef);
  if (!key) return null;
  const spec = PRODUCT_ENV[key];
  const baseUrl = process.env[spec.urlKey]?.trim().replace(/\/$/, "") ?? "";
  const secret = process.env[spec.secretKey]?.trim() ?? "";
  if (!baseUrl || !secret) return null;
  return { baseUrl, secret };
}

export const MAX_PROVISIONING_ATTEMPTS = 8;

/** Exponential backoff cap (minutes). */
export function provisioningBackoffMinutes(attempt: number): number {
  const base = Math.min(60 * 6, 2 ** Math.min(attempt, 6));
  return Math.max(5, base);
}
