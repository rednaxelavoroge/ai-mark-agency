import type { Locale } from "./site.ts";

/**
 * AI MARK / AlexDev — the developer company behind Showroom AI.
 *
 * Showroom AI is the product brand customers buy; AI MARK builds it. Several
 * places credit the developer (the "Showroom AI — by AI MARK" credit in the
 * site footer, the "No website? We'll build one" line in the pricing section),
 * so the outbound URLs live here instead of being typed into components.
 *
 * The developer site runs its own locale-prefixed URLs and does not cover every
 * locale this site ships. Only the locales it actually publishes are forwarded;
 * the rest take its English page rather than a URL that would 404.
 */

export const ALEXDEV_ORIGIN = "https://alex-dev.pro";

/** "Turnkey websites & apps" — the developer's websites page. */
export const ALEXDEV_WEBSITES_PATH = "/turnkey-websites";

/**
 * Locales published by the developer site. Anything outside this set falls back
 * to `en` there, so `zh`, `id`, `vi`, `de`, `ja` and `tr` readers get the
 * English page instead of a broken link.
 */
const ALEXDEV_LOCALES: readonly string[] = [
  "en",
  "es",
  "pt",
  "ru",
  "ar",
  "fr",
];

function developerLocale(locale: Locale): string {
  return ALEXDEV_LOCALES.includes(locale) ? locale : "en";
}

/** The developer's websites page, in the locale they publish (else English). */
export function websitesPageUrl(locale: Locale): string {
  return `${ALEXDEV_ORIGIN}/${developerLocale(locale)}${ALEXDEV_WEBSITES_PATH}`;
}

/** The developer's home page, in the locale they publish (else English). */
export function developerHomeUrl(locale: Locale): string {
  return `${ALEXDEV_ORIGIN}/${developerLocale(locale)}`;
}
