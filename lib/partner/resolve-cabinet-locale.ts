import {
  EXPLICIT_LOCALE_SOURCE,
  matchAcceptLanguage,
} from "@/lib/locale-negotiate";
import { isLocale, site, type Locale } from "@/lib/site";

/**
 * Partner cabinet UI language, in priority order:
 * 1. a language the visitor explicitly picked (site or cabinet selector),
 * 2. the profile preference,
 * 3. any site locale cookie,
 * 4. the browser's Accept-Language,
 * 5. English.
 */
export function resolveCabinetLocale(
  profileLanguage: string | null | undefined,
  localeCookie: string | null | undefined,
  localeSource?: string | null,
  acceptLanguage?: string | null,
): Locale {
  if (localeSource === EXPLICIT_LOCALE_SOURCE && localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }
  if (profileLanguage && isLocale(profileLanguage)) {
    return profileLanguage;
  }
  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }
  const negotiated = matchAcceptLanguage(acceptLanguage, site.locales, "en", "en");
  return isLocale(negotiated) ? negotiated : "en";
}
