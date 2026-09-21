import type { MetadataRoute } from "next";
import { PRODUCT_PATHS } from "@/lib/products";
import type { ProductId } from "@/content/packages";
import { absoluteUrl, site, type Locale } from "@/lib/site";

function alt(enPath: string, ruPath: string) {
  return { languages: { en: enPath, ru: ruPath } };
}

const productIds: ProductId[] = ["aime", "assistant", "showroom"];

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
    for (const id of productIds) {
      const path = PRODUCT_PATHS[id];
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        alternates: alt(absoluteUrl("en", path), absoluteUrl("ru", path)),
      });
    }
  }

  return entries;
}
