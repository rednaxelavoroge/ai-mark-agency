import { site, type Locale } from "@/lib/site";

export function normalizeEmailLocale(value: string | null | undefined): Locale {
  const lang = (value ?? "en").toLowerCase().split("-")[0];
  if ((site.locales as readonly string[]).includes(lang)) {
    return lang as Locale;
  }
  return "en";
}
