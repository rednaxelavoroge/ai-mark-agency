export const site = {
  name: "AI Mark",
  domain: "ai-mark.agency",
  url: "https://ai-mark.agency",
  email: "hello@ai-mark.agency",
  taglineEn: "From Idea to Business.",
  taglineRu: "От идеи до работающего бизнеса.",
  locales: ["en", "ru"] as const,
  defaultLocale: "en" as const,
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

/** Strip `/ru` or internal `/en` prefix from a pathname (e.g. from usePathname). */
export function stripLocaleFromPathname(pathname: string) {
  let p = pathname || "/";
  for (const locale of site.locales) {
    const re = new RegExp(`^/${locale}(?=/|$)`);
    if (re.test(p)) {
      p = p.replace(re, "") || "/";
      break;
    }
  }
  return p;
}

/** Same page in another locale (for language switcher links). */
export function counterpartLocaleHref(pathname: string, next: Locale) {
  return localePath(next, stripLocaleFromPathname(pathname));
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
