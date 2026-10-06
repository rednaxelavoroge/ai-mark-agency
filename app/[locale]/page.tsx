import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSystem } from "@/components/HeroSystem";
import { HomeRest } from "@/components/home/HomeRest";
import { ShowroomRoleLinkage } from "@/components/products/ShowroomRoleLinkage";
import { getCopy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { skuPrice } from "@/lib/showroom-ai";
import { formatUsdPrice } from "@/lib/pricing/crypto-checkout";
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
  // The three cards are roles of one product brand, Showroom AI, not three
  // separate products. Brand and role names come from the brand copy (RU/EN,
  // EN fallback); the Showroom price also comes from there, because the
  // per-locale chrome string still carries the pre-2026-10-06 tiers.
  const showroom = getShowroomAiCopy(locale);
  const homeRole: Record<string, "seller" | "marketer" | "assistant"> = {
    showroom: "seller",
    aime: "marketer",
    assistant: "assistant",
  };
  const roleName = (id: "seller" | "marketer" | "assistant") =>
    showroom.roles.find((role) => role.id === id)?.name ?? id;
  // The Showroom card quotes the entry bundle (the Seller role) and resolves the
  // amount from the published catalog, like every other price on the site.
  const entryPrice = skuPrice("showroom-start");

  const hubModules = [...home.hubModules];

  const featuredProducts = home.featuredProducts.map((fp) => ({
    id: fp.id,
    variant: fp.id as ProductVariant,
    name: `${showroom.brand} · ${roleName(homeRole[fp.id] ?? "seller")}`,
    tag: fp.tag,
    price:
      fp.id === "showroom" && entryPrice
        ? `${showroom.cardPricePrefix}${formatUsdPrice(entryPrice.listUsd)}${showroom.perMonth}`
        : fp.price,
    desc: fp.desc,
    highlights: [...fp.highlights],
    href: productPagePath(locale, fp.id),
    externalUrl: fp.id === "showroom" ? "https://showroom-ai.pro" : null,
  }));

  return (
    <>
      <HeroSystem locale={locale} t={t} />
      {/* The pair the product is built around: the marketer brings the
          customers, the seller sells. Two equally weighted role cards plus the
          smaller Business Assistant card, each linking to its role page. */}
      <section id="roles" className="scroll-mt-24 border-b border-line py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ShowroomRoleLinkage locale={locale} />
        </div>
      </section>
      <HomeRest locale={locale} t={t} hubModules={hubModules} featuredProducts={featuredProducts} />
    </>
  );
}
