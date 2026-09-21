import { getCopy } from "@/content/copy";
import { packages, toolsViaAgency } from "@/content/packages";
import { site, type Locale } from "@/lib/site";

export function JsonLd({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: t.jsonLd.description,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        areaServed: "Worldwide",
        priceRange: "$$",
        parentOrganization: { "@id": `${site.url}/#org` },
        description: t.jsonLd.description,
        offers: packages.map((pkg) => ({
          "@type": "Offer",
          name: t.packages.items[pkg.id].name,
          price: pkg.priceUsd,
          priceCurrency: "USD",
          description: t.packages.items[pkg.id].summary,
        })),
      },
      {
        "@type": "ItemList",
        name: "Agency tools",
        itemListElement: toolsViaAgency.map((tool, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: tool.name,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
