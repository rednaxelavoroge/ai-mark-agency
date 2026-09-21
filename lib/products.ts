import type { ProductId } from "@/content/packages";
import { localePath, type Locale } from "@/lib/site";

/** Confirmed live AlexDev landings (EN + RU). */
export const PARTNER_WWW = "https://www.alex-dev.pro";

export const PRODUCT_PATHS: Record<ProductId, `/${string}`> = {
  aime: "/ai-marketing-employee",
  assistant: "/ai-business-assistant",
  showroom: "/showroom-ai",
};

export const PUBLIC_PRODUCT_SLUGS = [
  "ai-marketing-employee",
  "ai-business-assistant",
  "showroom-ai",
] as const;

export type PublicProductSlug = (typeof PUBLIC_PRODUCT_SLUGS)[number];

const SLUG_TO_ID: Record<PublicProductSlug, ProductId> = {
  "ai-marketing-employee": "aime",
  "ai-business-assistant": "assistant",
  "showroom-ai": "showroom",
};

export function partnerLandingUrl(locale: Locale, id: ProductId) {
  return `${PARTNER_WWW}/${locale}${PRODUCT_PATHS[id]}`;
}

export function productPagePath(locale: Locale, id: ProductId) {
  return localePath(locale, PRODUCT_PATHS[id]);
}

export function productsHubPath(locale: Locale) {
  return localePath(locale, "/products");
}

export function resolvePublicProductSlug(value: string): ProductId | null {
  if (value in SLUG_TO_ID) {
    return SLUG_TO_ID[value as PublicProductSlug];
  }
  return null;
}

export function isPublicProductSlug(value: string): value is PublicProductSlug {
  return (PUBLIC_PRODUCT_SLUGS as readonly string[]).includes(value);
}
