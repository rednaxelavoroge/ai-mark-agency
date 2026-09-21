import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AIMEPageContent } from "@/components/products/AIMEPageContent";
import { AIBAPageContent } from "@/components/products/AIBAPageContent";
import { ShowroomAIPageContent } from "@/components/products/ShowroomAIPageContent";
import { getAimeCopy } from "@/content/products/aime";
import { getAibaCopy } from "@/content/products/assistant";
import { getShowroomCopy } from "@/content/products/showroom";
import {
  PRODUCT_PATHS,
  PUBLIC_PRODUCT_SLUGS,
  resolvePublicProductSlug,
} from "@/lib/products";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string; product: string }> };

export function generateStaticParams() {
  return PUBLIC_PRODUCT_SLUGS.map((product) => ({ product }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, product } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const id = resolvePublicProductSlug(product);
  if (!id) return {};

  const path = PRODUCT_PATHS[id];
  let title = site.name;
  let description = "";

  if (id === "aime") {
    const c = getAimeCopy(locale);
    title = c.seoTitle;
    description = c.seoDescription;
  } else if (id === "assistant") {
    const c = getAibaCopy(locale);
    title = c.seoTitle;
    description = c.seoDescription;
  } else if (id === "showroom") {
    const c = getShowroomCopy(locale);
    title = c.seoTitle;
    description = c.seoDescription;
  }

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: {
        en: absoluteUrl("en", path),
        ru: absoluteUrl("ru", path),
      },
    },
    openGraph: {
      title,
      description,
      siteName: site.name,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale: raw, product } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const id = resolvePublicProductSlug(product);
  if (!id) notFound();

  if (id === "aime") {
    return <AIMEPageContent locale={locale} />;
  }

  if (id === "assistant") {
    return <AIBAPageContent locale={locale} />;
  }

  if (id === "showroom") {
    return <ShowroomAIPageContent locale={locale} />;
  }

  notFound();
}
