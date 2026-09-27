import { localePath, type Locale } from "@/lib/site";

/** Dedicated Digital Production service page — not the three-SKU catalog. */
export const DIGITAL_PRODUCTION_PATH = "/digital-production" as const;

export function digitalProductionPath(locale: Locale) {
  return localePath(locale, DIGITAL_PRODUCTION_PATH);
}
