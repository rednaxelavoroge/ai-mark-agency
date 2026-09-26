import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/ContactCta";
import { LeadInquiry } from "@/components/LeadInquiry";
import { CompactHero } from "@/components/hub/CompactHero";
import { CommercialHub } from "@/components/hub/CommercialHub";
import { CompanyDeep } from "@/components/hub/CompanyDeep";
import { HubSection } from "@/components/hub/HScroll";
import { HowRail } from "@/components/hub/HowRail";
import { InvestorEntry } from "@/components/hub/InvestorEntry";
import { PartnerStrip } from "@/components/hub/PartnerStrip";
import { ProductRail, ProductsHubCta } from "@/components/hub/ProductRail";
import { getCopy } from "@/content/copy";
import { absoluteUrl, getSiteTagline, isLocale, site, type Locale } from "@/lib/site";

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
  const isRu = locale === "ru";

  return (
    <>
      <CompactHero locale={locale} t={t} />

      <HubSection id="products" eyebrow={t.tech.eyebrow} title={t.products.title} lead={t.products.lead}>
        <ProductRail locale={locale} t={t} />
        <ProductsHubCta locale={locale} t={t} />
      </HubSection>

      <HubSection id="how" eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead}>
        <HowRail locale={locale} t={t} />
      </HubSection>

      <HubSection
        id="commercial"
        eyebrow={t.commercial.eyebrow}
        title={t.commercial.title}
        lead={t.commercial.lead}
      >
        <CommercialHub locale={locale} t={t} />
      </HubSection>

      <HubSection id="partners" eyebrow={t.partners.eyebrow} title={t.partners.title} lead={t.partners.model}>
        <PartnerStrip locale={locale} t={t} />
      </HubSection>

      <HubSection id="investors" eyebrow={t.investors.eyebrow} title={t.investors.title} lead={t.investors.lead}>
        <InvestorEntry locale={locale} t={t} />
      </HubSection>

      <HubSection id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <ContactCta className="inline-flex items-center rounded-full bg-mark px-5 py-2.5 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light">
              {isRu ? "Открыть чат" : "Open chat"} →
            </ContactCta>
            <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
          </div>
          <aside className="rounded-xl border border-line bg-ink-2 p-5 text-sm text-muted">
            <p className="font-display text-lg font-semibold text-paper">{site.name}</p>
            <p className="mt-1 text-[11px] font-mono text-mark uppercase">{t.hero.eyebrow}</p>
            <p className="mt-2 text-xs font-mono">{site.email}</p>
          </aside>
        </div>
      </HubSection>

      <CompanyDeep locale={locale} t={t} />
    </>
  );
}
