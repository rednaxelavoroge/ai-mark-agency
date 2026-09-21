export const site = {
  name: "AI Mark Agency",
  domain: "ai-mark.agency",
  url: "https://ai-mark.agency",
  email: "hello@ai-mark.agency",
  taglineEn: "From idea to a working business.",
  taglineRu: "От идеи до работающего бизнеса.",
  locales: ["en", "ru"] as const,
  defaultLocale: "en" as const,
  partner: {
    name: "AlexDev",
    url: "https://www.alex-dev.pro",
  },
};

export type Locale = (typeof site.locales)[number];

export function isLocale(value: string): value is Locale {
  return site.locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === site.defaultLocale) {
    return normalized === "/" ? "/" : normalized;
  }
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function absoluteUrl(locale: Locale, path = "") {
  const p = localePath(locale, path);
  return p === "/" ? site.url : `${site.url}${p}`;
}

/** Join a locale home with a hash (#how) or an in-app path (/products). */
export function navHref(locale: Locale, href: string) {
  if (!href || href === "/") return localePath(locale);
  if (href.startsWith("#")) return `${localePath(locale)}${href}`;
  return localePath(locale, href);
}
