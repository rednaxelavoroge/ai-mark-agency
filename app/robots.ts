import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // The Partner Platform and the admin console are private surfaces.
        // Each also sends `noindex` from its layout; this keeps a crawler from
        // spending a request on them in the first place.
        "/admin",
        "/auth",
        // NOTE: the trailing slash matters. "/partner" would also match the
        // public marketing page at "/partners" and de-index it.
        "/partner/",
      ],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
