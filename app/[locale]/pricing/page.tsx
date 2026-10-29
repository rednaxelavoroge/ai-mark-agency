import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ContactCta } from "@/components/ContactCta";
import { BrandStudioPricingTeaser } from "@/components/BrandStudioPlans";
import { ShowroomAiIncluded, ShowroomAiPlans } from "@/components/products/ShowroomAiPlans";
import { getPlainCopy, planTokens, fillPlanTokens } from "@/content/plain-copy";
import { getCopy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const plainMeta = getPlainCopy(locale).pricing;
  const meta = {
    title: `${plainMeta.eyebrow} · Showroom AI · ${site.name}`,
    description: fillPlanTokens(plainMeta.lead, planTokens()),
  };
  const title = meta.title;
  const description = meta.description;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(locale, "/pricing"),
      languages: {
        en: absoluteUrl("en", "/pricing"),
        ru: absoluteUrl("ru", "/pricing"),
      },
    },
  };
}


export default async function PricingPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const p = getPublicChromeCopy(locale).pricingPage;
  const plain = getPlainCopy(locale).pricing;
  const tokens = planTokens();

  return (
    <article id="commercial" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <BackButton locale={locale} targetHref="/" />
      </div>

      <header className="max-w-3xl" data-reveal>
        <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
          {plain.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-5xl">
          {plain.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {fillPlanTokens(plain.lead, tokens)}
        </p>
      </header>

      {/* Row 1b: Showroom AI — the product brand sold to customers.
          Prices come from the published catalog, never from this file. */}
      <div id="showroom-ai" className="mt-16 scroll-mt-24 border-t border-line pt-12">
        <ShowroomAiPlans locale={locale} />
        <ShowroomAiIncluded locale={locale} className="mt-8" />
      </div>

      <p className="mt-6 max-w-3xl text-sm text-paper/90">{plain.payNote}</p>

      <div id="brand-studio" className="mt-12 scroll-mt-24">
        <BrandStudioPricingTeaser locale={locale} />
      </div>

      {/* Anything outside the three plans is quoted individually. */}
      <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" data-reveal>
        <div>
          <h3 className="font-display text-lg font-semibold text-paper">{plain.customTitle}</h3>
          <p className="mt-1 text-sm text-muted">{plain.customBody}</p>
        </div>
        <ContactCta className="inline-flex shrink-0 rounded-full bg-mark px-6 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all">
          {plain.customCta} →
        </ContactCta>
      </div>

      <p className="mt-10 text-center text-[13px] text-muted">{plain.footnote}</p>

      {/* Bottom CTA Card */}
      <div className="mt-16 rounded-3xl border border-warm/30 bg-warm-soft p-8 sm:p-10 text-center" data-reveal>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper">
          {p.customProposalTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted">
          {t.contact.lead}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <ContactCta className="inline-flex items-center gap-2 rounded-full bg-mark px-6 py-2.5 text-xs sm:text-sm font-semibold text-mark-ink hover:bg-mark-light shadow-md transition-all">
            {p.openChat} →
          </ContactCta>
          <BackButton locale={locale} targetHref="/" />
        </div>
      </div>
    </article>
  );
}
