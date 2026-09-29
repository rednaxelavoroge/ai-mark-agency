import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSystem } from "@/components/HeroSystem";
import { HomeRest } from "@/components/home/HomeRest";
import { getCopy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { absoluteUrl, getSiteTagline, isLocale, site, type Locale } from "@/lib/site";
import { productPagePath } from "@/lib/products";
import type { ProductVariant } from "@/components/ui/ProductUI";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  const url = absoluteUrl(locale);

  const tagline = getSiteTagline(locale);
  const pageTitle = `${site.name} — ${tagline}`;

  const langAlternates: Record<string, string> = {
    "x-default": site.url,
  };
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc);
  }

  return {
    title: { absolute: pageTitle },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: url,
      languages: langAlternates,
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: pageTitle,
      description: t.meta.description,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: t.meta.description,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const home = getPublicChromeCopy(locale).homePage;

  const hubModules = [...home.hubModules];

  const featuredProducts = home.featuredProducts.map((fp) => ({
    id: fp.id,
    variant: fp.id as ProductVariant,
    name:
      fp.id === "showroom"
        ? "Showroom AI"
        : fp.id === "assistant"
          ? "AI Business Assistant"
          : "AI Marketing Employee",
    tag: fp.tag,
    price: fp.price,
    desc: fp.desc,
    highlights: [...fp.highlights],
    href: productPagePath(locale, fp.id),
    externalUrl: fp.id === "showroom" ? "https://showroom-ai.pro" : null,
  }));

  return (
    <>
      <HeroSystem locale={locale} t={t} />
      <HomeRest locale={locale} t={t} hubModules={hubModules} featuredProducts={featuredProducts} />
    </>
  );
}
