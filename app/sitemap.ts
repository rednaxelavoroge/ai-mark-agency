import type { MetadataRoute } from "next";
import { PRODUCT_SLUGS } from "@/lib/products";
import { absoluteUrl, site, type Locale } from "@/lib/site";

function alt(enPath: string, ruPath: string) {
  return { languages: { en: enPath, ru: ruPath } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified,
      alternates: alt(site.url, `${site.url}/ru`),
    },
    {
      url: `${site.url}/ru`,
      lastModified,
      alternates: alt(site.url, `${site.url}/ru`),
    },
    {
      url: `${site.url}/privacy`,
      lastModified,
      alternates: alt(`${site.url}/privacy`, `${site.url}/ru/privacy`),
    },
    {
      url: `${site.url}/ru/privacy`,
      lastModified,
      alternates: alt(`${site.url}/privacy`, `${site.url}/ru/privacy`),
    },
  ];

  const locales: Locale[] = ["en", "ru"];
  for (const locale of locales) {
    entries.push({
      url: absoluteUrl(locale, "/products"),
      lastModified,
      alternates: alt(
        absoluteUrl("en", "/products"),
        absoluteUrl("ru", "/products"),
      ),
    });
    for (const slug of PRODUCT_SLUGS) {
      entries.push({
        url: absoluteUrl(locale, `/products/${slug}`),
        lastModified,
        alternates: alt(
          absoluteUrl("en", `/products/${slug}`),
          absoluteUrl("ru", `/products/${slug}`),
        ),
      });
    }
  }

  return entries;
}
