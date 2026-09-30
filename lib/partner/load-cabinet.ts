import { cookies, headers } from "next/headers";
import { cache } from "react";
import { getCabinetCopy, type CabinetCopy } from "@/content/cabinet";
import { getAuthContext, getOwnProfile } from "@/lib/auth/dal";
import { LOCALE_COOKIE, LOCALE_SOURCE_COOKIE } from "@/lib/locale-negotiate";
import type { PlatformNavItem } from "@/components/platform/PlatformNav";
import type { Locale } from "@/lib/site";
import { resolveCabinetLocale } from "@/lib/partner/resolve-cabinet-locale";

export type PartnerCabinetContext = {
  locale: Locale;
  copy: CabinetCopy;
};

/** One partner-cabinet locale + copy bundle per request (profile language, then site cookie). */
export const loadPartnerCabinet = cache(async (): Promise<PartnerCabinetContext> => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value ?? null;
  const localeSource = cookieStore.get(LOCALE_SOURCE_COOKIE)?.value ?? null;
  const acceptLanguage = (await headers()).get("accept-language");
  const auth = await getAuthContext();
  const profile = auth ? await getOwnProfile(auth.userId) : null;
  const locale = resolveCabinetLocale(profile?.language, localeCookie, localeSource, acceptLanguage);
  return { locale, copy: getCabinetCopy(locale) };
});

/** Auth routes have no profile yet — cookie, then browser language, then English. */
export const loadAuthCabinet = cache(async (): Promise<PartnerCabinetContext> => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value ?? null;
  const localeSource = cookieStore.get(LOCALE_SOURCE_COOKIE)?.value ?? null;
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = resolveCabinetLocale(undefined, localeCookie, localeSource, acceptLanguage);
  return { locale, copy: getCabinetCopy(locale) };
});

export function partnerNavFromCopy(copy: CabinetCopy): PlatformNavItem[] {
  return [
    { href: "/partner/dashboard", label: copy.nav.dashboard },
    { href: "/partner/customers", label: copy.nav.customers },
    { href: "/partner/sales", label: copy.nav.sales },
    { href: "/partner/network", label: copy.nav.network },
    { href: "/partner/commissions", label: copy.nav.commissions },
    { href: "/partner/payouts", label: copy.nav.payouts },
    { href: "/partner/resources", label: copy.nav.resources },
    { href: "/partner/profile", label: copy.nav.profile },
  ];
}

export type PlatformShellCopy = {
  navLabel: string;
  signOut: string;
  signedIn: string;
  backToSite: string;
  ventureTagline: string;
  themeLight: string;
  themeDark: string;
  backAriaLabel: string;
};

export function shellCopyFromCabinet(copy: CabinetCopy): PlatformShellCopy {
  return {
    navLabel: copy.shell.navLabel,
    signOut: copy.shell.signOut,
    signedIn: copy.shell.signedIn,
    backToSite: copy.shell.backToSite,
    ventureTagline: copy.shell.ventureTagline,
    themeLight: copy.shell.themeLight,
    themeDark: copy.shell.themeDark,
    backAriaLabel: copy.shell.backAriaLabel,
  };
}
