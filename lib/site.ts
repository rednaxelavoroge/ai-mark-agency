export const site = {
  name: "AI MARK",
  domain: "ai-mark.agency",
  url: "https://ai-mark.agency",
  email: "hello@ai-mark.agency",
  taglineEn: "From Idea to Business.",
  taglineRu: "От идеи до работающего бизнеса.",
  /**
   * Display order for the language selector, the sitemap and every
   * generateStaticParams list. English is the root locale; the rest run from
   * the broadest reach to the narrowest, with Russian placed after the other
   * two Latin-script markets (es, pt) and before the RTL/CJK blocks.
   */
  locales: [
    "en",
    "es",
    "pt",
    "ru",
    "ar",
    "zh",
    "id",
    "vi",
    "de",
    "fr",
    "ja",
    "tr",
  ] as const,
  defaultLocale: "en" as const,
  taglines: {
    en: "From Idea to Business.",
    ru: "От идеи до работающего бизнеса.",
    es: "De la Idea al Negocio en Marcha.",
    pt: "Da Ideia ao Negócio em Operação.",
    ar: "من الفكرة إلى شركة ناجحة.",
    zh: "从创意到成熟企业。",
    id: "Dari Ide Menjadi Bisnis Nyata.",
    vi: "Từ Ý Tưởng Đến Doanh Nghiệp Vận Hành.",
    de: "Von der Idee zum laufenden Unternehmen.",
    fr: "De l'idée à l'entreprise opérationnelle.",
    ja: "アイデアから稼働するビジネスへ。",
    tr: "Fikirden Çalışan Bir İşletmeye.",
  } as Record<string, string>,
  /**
   * Real AI Business Assistant webchat (same embed as the BA product widget).
   * SRC+KEY live here so the launcher never hard-codes a second copy.
   * There is no dedicated AI MARK `wc_` in this repo; keep this workspace key
   * so messages land in the BA inbox for that widget.
   *
   * Workspace config (title still "AlexDev" as of 2026-09-26) is NOT in this
   * repo. Public answers are grounded with `lib/chat-context.ts` on send.
   * Dashboard path is documented on that module.
   */
  widget: {
    src: "https://app.alex-dev.pro/widget.js",
    key: "wc_30ff859272acf6000db08542",
  },
  /**
   * Public channel URLs. Omit a channel (leave unset) rather than inventing
   * handles or copying another brand's numbers.
   *
   * `TODO(instagram)`: only the numeric IG account id is known and the
   * `instagram.com/direct/t/<id>` deep link is bot-blocked, so guessing a
   * handle would ship a dead button. Set any of `@handle`, `handle` or a full
   * URL and `instagramDirectUrl()` in `lib/contact.ts` normalises it — the
   * channel then appears in the launcher with no other change. Messenger stays
   * wired because the Meta/Facebook Developer work is next.
   */
  messengers: {
    telegram: "https://t.me/AlexDevCompany",
    whatsapp: "https://wa.me/37281952565",
    messenger: "https://m.me/61586410776411",
    instagram: undefined as string | undefined,
  },
};

export type Locale = (typeof site.locales)[number];

export interface LocaleMeta {
  code: Locale;
  name: string;
  region: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LOCALES_INFO: Record<Locale, LocaleMeta> = {
  en: { code: "en", name: "English", region: "Global / US", flag: "🇺🇸", dir: "ltr" },
  ru: { code: "ru", name: "Русский", region: "СНГ / Global", flag: "🇷🇺", dir: "ltr" },
  es: { code: "es", name: "Español", region: "América Latina", flag: "🇲🇽", dir: "ltr" },
  pt: { code: "pt", name: "Português", region: "Brasil", flag: "🇧🇷", dir: "ltr" },
  ar: { code: "ar", name: "العربية", region: "الشرق الأوسط", flag: "🇦🇪", dir: "rtl" },
  zh: { code: "zh", name: "简体中文", region: "中国 / 亚洲", flag: "🇨🇳", dir: "ltr" },
  id: { code: "id", name: "Bahasa Indonesia", region: "Indonesia", flag: "🇮🇩", dir: "ltr" },
  vi: { code: "vi", name: "Tiếng Việt", region: "Việt Nam", flag: "🇻🇳", dir: "ltr" },
  de: { code: "de", name: "Deutsch", region: "DACH / Europa", flag: "🇩🇪", dir: "ltr" },
  fr: { code: "fr", name: "Français", region: "France / Monde", flag: "🇫🇷", dir: "ltr" },
  ja: { code: "ja", name: "日本語", region: "日本", flag: "🇯🇵", dir: "ltr" },
  tr: { code: "tr", name: "Türkçe", region: "Türkiye", flag: "🇹🇷", dir: "ltr" },
};

export function isRtlLocale(locale: Locale): boolean {
  return LOCALES_INFO[locale]?.dir === "rtl";
}

export function getSiteTagline(locale: Locale): string {
  return site.taglines[locale] || site.taglines.en || site.taglineEn;
}

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
