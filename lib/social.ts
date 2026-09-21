import { site, type Locale } from "@/lib/site";

/**
 * Link-preview artwork (1200x630) for a locale.
 *
 * Points at the locale-aware `opengraph-image` route rather than the raw files
 * in `public/og/`, so every page emits one URL shape no matter which mechanism
 * produced the tag, and the artwork's file layout stays an implementation
 * detail.
 *
 * Pages under `/[locale]` normally inherit the image from that file convention.
 * The ones below call this explicitly because Next merges metadata segments
 * *shallowly*: a nested page that declares its own `openGraph` object replaces
 * the one resolved for its parent segment, image included. So
 * `app/[locale]/[product]/page.tsx` and `app/[locale]/investors/page.tsx` would
 * otherwise ship a card with no picture at all. Any future page that declares
 * `openGraph` must spread `socialImages(locale)` into it too.
 */
export function socialImages(locale: Locale) {
  return [
    {
      url: `${site.url}/${locale}/opengraph-image`,
      type: "image/jpeg",
      width: 1200,
      height: 630,
      alt: `${site.name} — AI-Native Venture & Marketing`,
    },
  ];
}

export const socialAlt = `${site.name} — AI-Native Venture & Marketing`;
