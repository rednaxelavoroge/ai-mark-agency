import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandStudioPageContent } from "@/components/BrandStudioPageContent";
import { getBrandStudioCopy } from "@/content/brand-studio";
import { BRAND_STUDIO_PATH } from "@/lib/brand-studio";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";
import { socialImages } from "@/lib/social";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getBrandStudioCopy(locale);

  const langAlternates: Record<string, string> = {};
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc, BRAND_STUDIO_PATH);
  }

  return {
    title: { absolute: t.seoTitle },
    description: t.seoDescription,
    alternates: {
      canonical: absoluteUrl(locale, BRAND_STUDIO_PATH),
      languages: langAlternates,
    },
    openGraph: {
      title: t.seoTitle,
      description: t.seoDescription,
      siteName: site.name,
      url: absoluteUrl(locale, BRAND_STUDIO_PATH),
      type: "article",
      images: socialImages(locale),
    },
  };
}

export default async function BrandStudioPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return <BrandStudioPageContent locale={locale} />;
}
