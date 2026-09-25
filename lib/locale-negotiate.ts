/**
 * Locale cookie written by the language selector.
 * A value alone is not a preference: older responses set `locale` for every
 * prefixed URL, so a stray `/fr` visit stuck for a year.
 */
export const LOCALE_COOKIE = "locale";

/**
 * Present and equal to {@link EXPLICIT_LOCALE_SOURCE} only after the visitor
 * picks a language. Automatic detection never writes this.
 */
export const LOCALE_SOURCE_COOKIE = "locale_src";

export const EXPLICIT_LOCALE_SOURCE = "user";

/** Used when the visitor's preferred language is not one of `site.locales`. */
export const FALLBACK_LOCALE = "ru";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type LocaleDecision =
  | {
      action: "next";
      locale: string;
      clearStaleLocaleCookie: boolean;
    }
  | {
      action: "rewrite";
      locale: string;
      pathname: string;
      clearStaleLocaleCookie: boolean;
    }
  | {
      action: "redirect";
      locale: string;
      pathname: string;
      clearStaleLocaleCookie: boolean;
    };

type RankedTag = { tag: string; q: number; index: number };

/**
 * Parse `Accept-Language` into tags with quality. Invalid `q` values are
 * treated as not acceptable (`q=0`) and dropped by the caller.
 */
export function parseAcceptLanguage(header: string | null | undefined): RankedTag[] {
  if (!header) return [];
  const ranked: RankedTag[] = [];
  header.split(",").forEach((part, index) => {
    const [rawTag, ...params] = part.split(";").map((piece) => piece.trim());
    if (!rawTag) return;
    let q = 1;
    for (const param of params) {
      const eq = param.indexOf("=");
      if (eq === -1) continue;
      const key = param.slice(0, eq).trim().toLowerCase();
      const value = param.slice(eq + 1).trim();
      if (key !== "q") continue;
      const parsed = Number(value);
      q = Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : 0;
    }
    ranked.push({ tag: rawTag.toLowerCase(), q, index });
  });
  return ranked;
}

/** `fr-FR` and `zh-Hans-CN` both reduce to the project locale code. */
export function primaryLanguage(tag: string): string {
  return tag.toLowerCase().split("-")[0] || "";
}

/**
 * Preferred language for a first visit.
 *
 * The highest-q specific tag wins (`*` and `q=0` are skipped). That tag is
 * used when its primary language is one of `supported`. Otherwise the result
 * is `fallback` — a lower-q `en` later in the header is not a substitute.
 * This is what makes `de-DE,de;q=0.9,en;q=0.8` resolve to Russian when German
 * is not a site locale.
 *
 * An empty header (typical of some crawlers) is not an unsupported language.
 * It resolves to `whenAbsent` so the canonical unprefixed URL can stay English.
 */
export function matchAcceptLanguage(
  header: string | null | undefined,
  supported: readonly string[],
  fallback: string,
  whenAbsent: string,
): string {
  const ranked = parseAcceptLanguage(header)
    .filter((item) => item.q > 0 && item.tag !== "*")
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const top = ranked[0];
  if (!top) return whenAbsent;
  const language = primaryLanguage(top.tag);
  if ((supported as readonly string[]).includes(language)) return language;
  return fallback;
}

export function explicitLocaleChoice(
  localeCookie: string | null | undefined,
  localeSource: string | null | undefined,
  supported: readonly string[],
): string | null {
  if (localeSource !== EXPLICIT_LOCALE_SOURCE) return null;
  if (!localeCookie) return null;
  if (!(supported as readonly string[]).includes(localeCookie)) return null;
  return localeCookie;
}

export function localeFromPathname(
  pathname: string,
  locales: readonly string[],
): string | null {
  return (
    locales.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    ) ?? null
  );
}

/**
 * Stale `locale=<code>` cookies from the old proxy have no `locale_src=user`.
 * They must be dropped so they cannot keep redirecting `/` to `/fr`.
 */
export function shouldClearStaleLocaleCookie(
  localeCookie: string | null | undefined,
  localeSource: string | null | undefined,
  supported: readonly string[],
): boolean {
  if (!localeCookie && !localeSource) return false;
  return explicitLocaleChoice(localeCookie, localeSource, supported) === null;
}

/**
 * Public-page locale decision. Country and IP are intentionally not inputs.
 *
 * Priority:
 * 1. Explicit selector choice (`locale` + `locale_src=user`) for unprefixed URLs
 * 2. Locale prefix already in the URL, for this request only
 * 3. `Accept-Language` when the URL has no prefix and the visitor has not chosen
 * 4. `fallback` when that preferred language is not a site locale
 *
 * English stays a rewrite onto the `/en` route. The public URL remains
 * unprefixed because that is the canonical English URL. Every other locale is
 * a single redirect to its prefix.
 */
export function decidePublicLocale(input: {
  pathname: string;
  acceptLanguage: string | null;
  localeCookie: string | null;
  localeSource: string | null;
  locales: readonly string[];
  defaultLocale: string;
  fallbackLocale?: string;
}): LocaleDecision {
  const locales = input.locales;
  const defaultLocale = input.defaultLocale;
  const fallbackLocale = input.fallbackLocale ?? FALLBACK_LOCALE;
  const clearStaleLocaleCookie = shouldClearStaleLocaleCookie(
    input.localeCookie,
    input.localeSource,
    locales,
  );

  const prefixed = localeFromPathname(input.pathname, locales);
  if (prefixed) {
    return { action: "next", locale: prefixed, clearStaleLocaleCookie: false };
  }

  const explicit = explicitLocaleChoice(
    input.localeCookie,
    input.localeSource,
    locales,
  );
  const locale =
    explicit ??
    matchAcceptLanguage(
      input.acceptLanguage,
      locales,
      fallbackLocale,
      defaultLocale,
    );

  const pathname =
    input.pathname === "/" ? `/${locale}` : `/${locale}${input.pathname}`;

  if (locale === defaultLocale) {
    return {
      action: "rewrite",
      locale,
      pathname,
      clearStaleLocaleCookie,
    };
  }

  return {
    action: "redirect",
    locale,
    pathname,
    clearStaleLocaleCookie,
  };
}

/** `document.cookie` assignments for a language-selector choice. */
export function explicitLocaleCookieAssignments(locale: string): string[] {
  const common = `path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  return [
    `${LOCALE_COOKIE}=${locale}; ${common}`,
    `${LOCALE_SOURCE_COOKIE}=${EXPLICIT_LOCALE_SOURCE}; ${common}`,
  ];
}
