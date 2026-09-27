import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { DigitalProductionPageContent } from "@/components/DigitalProductionPageContent";
import { getDigitalProductionCopy } from "@/content/digital-production";
import { DIGITAL_PRODUCTION_PATH } from "@/lib/digital-production";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";
import { socialImages } from "@/lib/social";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getDigitalProductionCopy(locale);

  const langAlternates: Record<string, string> = {};
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc, DIGITAL_PRODUCTION_PATH);
  }

  return {
    title: { absolute: t.seoTitle },
    description: t.seoDescription,
    alternates: {
      canonical: absoluteUrl(locale, DIGITAL_PRODUCTION_PATH),
      languages: langAlternates,
    },
    openGraph: {
      title: t.seoTitle,
      description: t.seoDescription,
      siteName: site.name,
      url: absoluteUrl(locale, DIGITAL_PRODUCTION_PATH),
      type: "article",
      images: socialImages(locale),
    },
  };
}

export default async function DigitalProductionPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-0 sm:px-6 sm:pt-10">
        <BackButton locale={locale} targetHref="/" />
      </div>
      <DigitalProductionPageContent locale={locale} />
    </div>
  );
}
