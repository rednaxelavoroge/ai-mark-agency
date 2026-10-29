import { localePath, type Locale } from "./site.ts";

export const BRAND_STUDIO_PATH = "/ai-brand-studio" as const;

export function brandStudioPath(locale: Locale) {
  return localePath(locale, BRAND_STUDIO_PATH);
}

/** Published monthly list prices (USD). Single source for plan cards. */
export const BRAND_STUDIO_PLAN_PRICES = {
  start: 590,
  growth: 1190,
  global: 2490,
} as const;

export type BrandStudioPlanId = keyof typeof BRAND_STUDIO_PLAN_PRICES;

export const BRAND_STUDIO_PLAN_ORDER: BrandStudioPlanId[] = [
  "start",
  "growth",
  "global",
];

export const BRAND_STUDIO_FEATURED_PLAN: BrandStudioPlanId = "growth";
