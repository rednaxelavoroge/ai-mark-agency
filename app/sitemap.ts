import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: site.url,
      lastModified,
      alternates: { languages: { en: site.url, ru: `${site.url}/ru` } },
    },
    {
      url: `${site.url}/ru`,
      lastModified,
      alternates: { languages: { en: site.url, ru: `${site.url}/ru` } },
    },
    {
      url: `${site.url}/privacy`,
      lastModified,
      alternates: {
        languages: { en: `${site.url}/privacy`, ru: `${site.url}/ru/privacy` },
      },
    },
    {
      url: `${site.url}/ru/privacy`,
      lastModified,
      alternates: {
        languages: { en: `${site.url}/privacy`, ru: `${site.url}/ru/privacy` },
      },
    },
  ];
}
