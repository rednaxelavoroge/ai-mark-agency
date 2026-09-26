import { CompactProductsHub } from "@/components/hub/CompactProductsHub";
import { getCopy } from "@/content/copy";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  return {
    title: { absolute: `${t.products.hubTitle} · ${site.name}` },
    description: t.products.hubLead,
    alternates: {
      canonical: absoluteUrl(locale, "/products"),
      languages: {
        en: absoluteUrl("en", "/products"),
        ru: absoluteUrl("ru", "/products"),
      },
    },
  };
}

export default async function ProductsHubPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <CompactProductsHub locale={raw} />;
}
