import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { ContactCta } from "@/components/ContactCta";
import { getCopy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { packages } from "@/content/packages";
import { absoluteUrl, isLocale, navHref, site, type Locale } from "@/lib/site";
import { DIGITAL_PRODUCTION_PATH } from "@/lib/digital-production";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const metaByLocale: Partial<Record<Locale, { title: string; description: string }>> = {
    ru: {
      title: `Тарифы и коммерческая модель · ${site.name}`,
      description:
        "Прозрачные тарифы на AI-маркетинг, подписки на proprietary AI-продукты и заказную разработку цифровых платформ.",
    },
    de: {
      title: `Preise und Geschäftsmodell · ${site.name}`,
      description:
        "Transparente Retainer für AI-Marketing, Abos der eigenen AI-Produkte und digitale Produktion nach Auftrag.",
    },
    ja: {
      title: `料金と商業モデル · ${site.name}`,
      description:
        "AIマーケティングのリテイナー、自社AI製品のサブスクリプション、受託のデジタル制作の透明な料金です。",
    },
  };
  const meta = metaByLocale[locale] ?? {
    title: `Pricing & Commercial Model · ${site.name}`,
    description:
      "Transparent retainer tiers for AI marketing, proprietary AI product subscriptions, and turnkey digital production.",
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

function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default async function PricingPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const p = getPublicChromeCopy(locale).pricingPage;

  const otherTiers = t.commercial.tiers.filter((tier) => {
    const n = tier.name.toLowerCase();
    return (
      !n.includes("starter") &&
      !n.includes("growth") &&
      !n.includes("scale") &&
      !n.includes("department") &&
      !n.includes("отдел")
    );
  });

  return (
    <article id="commercial" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <BackButton locale={locale} targetHref="/" />
      </div>

      <header className="max-w-3xl" data-reveal>
        <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
          {t.commercial.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-5xl">
          {t.commercial.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {t.commercial.lead}
        </p>
      </header>

      {/* Row 1: Marketing Department Retainer Plans */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm">
            {p.retainersHeading}
          </span>
          <span className="text-xs text-muted font-mono">
            {p.retainersSub}
          </span>
        </div>
        <p className="text-xs text-muted max-w-2xl">
          {p.retainersNote}
        </p>

        <div className="grid gap-6 md:grid-cols-3 pt-2">
          {packages.map((pkg, i) => {
            const item = t.packages.items[pkg.id];
            const isFeatured = pkg.featured;
            return (
              <div
                key={pkg.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-all sm:p-8 hover:-translate-y-1 ${
                  isFeatured
                    ? "relative border-mark bg-ink-2 shadow-lg shadow-mark/5"
                    : "border-line bg-ink-2 hover:border-line-strong hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-semibold text-paper">
                      {item.name}
                    </h3>
                    {isFeatured ? (
                      <span className="rounded-full bg-mark px-2.5 py-0.5 font-mono text-[10px] font-semibold text-mark-ink uppercase tracking-wide">
                        {t.commercial.featured || p.popular}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold text-paper tracking-tight">
                      {formatUsd(pkg.priceUsd)}
                    </span>
                    <span className="text-xs text-muted font-mono">
                      {t.commercial.perMonth || p.perMonth}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted min-h-[36px]">
                    {item.summary}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-xs text-paper/90">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="text-mark font-bold shrink-0">✓</span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 space-y-2 pt-4 border-t border-line">
                  <Link
                    href={navHref(locale, "/#contact")}
                    className={`block w-full rounded-xl py-3 text-center text-xs font-semibold transition-all ${
                      isFeatured
                        ? "bg-mark text-mark-ink hover:bg-mark-light shadow"
                        : "border border-line bg-ink-3 text-paper hover:bg-ink-3/80"
                    }`}
                  >
                    {t.commercial.retainerCta}
                  </Link>
                  <ContactCta
                    className="block w-full rounded-xl border border-transparent py-2 text-center text-[11px] text-muted hover:text-paper hover:bg-ink-3/40 transition-colors"
                  >
                    {p.customScope}
                  </ContactCta>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Other Formats of Collaboration */}
      <div className="mt-16 space-y-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm">
          {p.otherFormats}
        </span>
        <p className="text-xs text-muted max-w-2xl">
          {t.commercial.skuNote}
        </p>

        <div className="grid gap-4 md:grid-cols-3 pt-2">
          {otherTiers.length > 0 ? (
            otherTiers.map((tier) => (
              <div
                key={tier.name}
                data-reveal
                className="rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between hover:border-line-strong transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
                      {p.formatLabel}
                    </span>
                    <span className="font-mono text-xs font-semibold text-paper">
                      {tier.price}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-semibold text-paper">
                    {tier.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {tier.body}
                  </p>
                </div>
                <div className="mt-5">
                  <ContactCta className="block w-full rounded-lg border border-line bg-ink-3 py-2 text-center text-xs font-medium text-paper hover:bg-ink-3/80 transition-all">
                    {p.discussProject}
                  </ContactCta>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between hover:border-line-strong transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-warm uppercase tracking-wider">SaaS</span>
                    <span className="font-mono text-xs font-semibold text-paper">$149–$349/mo</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-semibold text-paper">
                    {p.aiProducts}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t.products.hubLead}
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href={navHref(locale, "/products")}
                    className="block w-full rounded-lg border border-line bg-ink-3 py-2 text-center text-xs font-medium text-paper hover:bg-ink-3/80 transition-all"
                  >
                    {getPublicChromeCopy(locale).footer.allProducts}
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between hover:border-line-strong transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-warm uppercase tracking-wider">Service</span>
                    <span className="font-mono text-xs font-semibold text-paper">{p.fromPrice}</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-semibold text-paper">
                    {p.aiMarketingServices}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t.commercial.lead}
                  </p>
                </div>
                <div className="mt-5">
                  <ContactCta className="block w-full rounded-lg border border-line bg-ink-3 py-2 text-center text-xs font-medium text-paper hover:bg-ink-3/80 transition-all">
                    {p.discussProject}
                  </ContactCta>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between hover:border-line-strong transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-warm uppercase tracking-wider">Custom</span>
                    <span className="font-mono text-xs font-semibold text-paper">{p.byScope}</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-semibold text-paper">
                    Digital Production &amp; Ventures
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t.production.lead}
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href={navHref(locale, DIGITAL_PRODUCTION_PATH)}
                    className="block w-full rounded-lg border border-line bg-ink-3 py-2 text-center text-xs font-medium text-paper hover:bg-ink-3/80 transition-all"
                  >
                    {p.digitalProductionLink}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Commercial Policy Note */}
      <p className="mt-12 text-center text-[13px] text-muted">
        {t.commercial.footnote || p.commercialFootnote}
        {" "}
        {t.ui.cardsSoon}
      </p>

      {/* Why Now / Philosophy Cards */}
      <div id="why-now" className="mt-20 scroll-mt-24 rounded-3xl border border-line bg-ink-2 p-6 sm:p-10" data-reveal>
        <span className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
          {t.why.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
          {t.why.title}
        </h2>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm text-muted leading-relaxed">
          {t.why.lead}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-2xl border border-line bg-ink-3/40 p-6 sm:p-8">
            <span className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
              {t.why.oldLabel}
            </span>
            <ul className="mt-4 divide-y divide-line text-xs text-muted">
              {t.why.old.map((item) => (
                <li key={item} className="py-2.5 flex items-center gap-2">
                  <span className="text-warm/80">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden text-center font-display text-xl text-warm md:block">→</div>
          <div className="rounded-2xl border border-mark/40 bg-ink-3/40 p-6 sm:p-8 shadow-sm">
            <span className="font-mono text-xs font-semibold tracking-wider text-mark uppercase">
              {t.why.newLabel}
            </span>
            <ul className="mt-4 divide-y divide-line text-xs text-paper/90">
              {t.why.next.map((item) => (
                <li key={item} className="py-2.5 flex items-center gap-2">
                  <span className="text-mark font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-xs text-muted leading-relaxed">{t.why.close}</p>
      </div>

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
