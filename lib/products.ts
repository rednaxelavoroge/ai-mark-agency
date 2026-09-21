import { localePath, type Locale } from "@/lib/site";
import type { ProductId } from "@/content/packages";

/** Live AlexDev landings (sitemap + fetch, Sep 2026). Do not invent paths. */
export const PARTNER_WWW = "https://www.alex-dev.pro";

export const PRODUCT_SLUGS = ["aime", "assistant", "showroom"] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/** Canonical on-domain slug → live partner URL (follow redirects). */
export const partnerLandingUrl: Record<
  ProductSlug,
  (locale: Locale) => string
> = {
  aime: (locale) => `${PARTNER_WWW}/${locale}/ai-marketing-employee`,
  assistant: (locale) => `${PARTNER_WWW}/${locale}/ai-business-assistant`,
  showroom: (locale) => `${PARTNER_WWW}/${locale}/showroom-ai`,
};

export const partnerProductsHubUrl = (locale: Locale) =>
  `${PARTNER_WWW}/${locale}/products`;

const ALIAS_TO_SLUG: Record<string, ProductSlug> = {
  aime: "aime",
  "ai-marketing-employee": "aime",
  assistant: "assistant",
  "ai-business-assistant": "assistant",
  showroom: "showroom",
  "showroom-ai": "showroom",
};

export function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(value);
}

export function resolveProductSlug(value: string): ProductSlug | null {
  return ALIAS_TO_SLUG[value] ?? null;
}

export function productPagePath(locale: Locale, slug: ProductSlug | ProductId) {
  return localePath(locale, `/products/${slug}`);
}

export function productsHubPath(locale: Locale) {
  return localePath(locale, "/products");
}

export function shortProductPath(locale: Locale, slug: ProductSlug) {
  const short =
    slug === "aime"
      ? "/aime"
      : slug === "assistant"
        ? "/ai-business-assistant"
        : "/showroom-ai";
  return localePath(locale, short);
}

export function aliasPathToProducts(pathname: string): string | null {
  const match = pathname.match(
    /^\/(en|ru)\/(aime|assistant|showroom|ai-marketing-employee|ai-business-assistant|showroom-ai)\/?$/,
  );
  if (!match) return null;
  const locale = match[1] as Locale;
  const slug = resolveProductSlug(match[2]);
  if (!slug) return null;
  return `/${locale}/products/${slug}`;
}
