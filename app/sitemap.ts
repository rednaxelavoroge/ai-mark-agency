import type { MetadataRoute } from "next";
import { PRODUCT_PATHS } from "@/lib/products";
import type { ProductId } from "@/content/packages";
import { absoluteUrl, site } from "@/lib/site";

function getLanguageAlternates(path = ""): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const loc of site.locales) {
    languages[loc] = absoluteUrl(loc, path);
  }
  return { languages };
}

const productIds: ProductId[] = ["aime", "assistant", "showroom"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of site.locales) {
    entries.push({
      url: absoluteUrl(locale, "/"),
      lastModified,
      alternates: getLanguageAlternates("/"),
    });
    entries.push({
      url: absoluteUrl(locale, "/privacy"),
      lastModified,
      alternates: getLanguageAlternates("/privacy"),
    });
    entries.push({
      url: absoluteUrl(locale, "/products"),
      lastModified,
      alternates: getLanguageAlternates("/products"),
    });
    entries.push({
      url: absoluteUrl(locale, "/investors"),
      lastModified,
      alternates: getLanguageAlternates("/investors"),
    });
    entries.push({
      url: absoluteUrl(locale, "/partners"),
      lastModified,
      alternates: getLanguageAlternates("/partners"),
    });
    for (const id of productIds) {
      const path = PRODUCT_PATHS[id];
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        alternates: getLanguageAlternates(path),
      });
    }
  }

  return entries;
}
