import { isLocale, type Locale } from "@/lib/site";

/**
 * Partner cabinet UI language: profile preference, then site cookie, then English.
 */
export function resolveCabinetLocale(
  profileLanguage: string | null | undefined,
  localeCookie: string | null | undefined,
): Locale {
  if (profileLanguage && isLocale(profileLanguage)) {
    return profileLanguage;
  }
  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }
  return "en";
}
