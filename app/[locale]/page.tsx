import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/ContactCta";
import { BuyLink } from "@/components/BuyLink";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import { HeroSystem } from "@/components/HeroSystem";
import { IdeaToBusiness } from "@/components/IdeaToBusiness";
import { BusinessCreationVisual } from "@/components/BusinessCreationVisual";
import { DigitalProductionShowcase } from "@/components/DigitalProductionShowcase";
import { CapabilityBand } from "@/components/CapabilityBand";
import { AIProductsShowcase } from "@/components/AIProductsShowcase";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { Manifesto } from "@/components/Manifesto";
import { PartnerNetworkVisual } from "@/components/PartnerNetworkVisual";
import { InvestorsSection } from "@/components/InvestorsSection";
import { getCopy } from "@/content/copy";
import { packages } from "@/content/packages";
import { absoluteUrl, getSiteTagline, isLocale, navHref, site, type Locale } from "@/lib/site";

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

function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const isRu = locale === "ru";

  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSystem locale={locale} t={t} />

      {/* What the company contains — before the long narrative */}
      <CapabilityBand locale={locale} />

      {/* 2. PINNED NARRATIVE: the one full path */}
      <IdeaToBusiness locale={locale} />

      {/* 3. BUSINESS CREATION: TWO WAYS TO ENTER THE SYSTEM */}
      <Section
        id="business-creation"
        index="01"
        eyebrow={t.creation.eyebrow}
        title={t.creation.title}
        lead={t.creation.lead}
      >
        <BusinessCreationVisual locale={locale} />
      </Section>

      {/* 4. DIGITAL PRODUCTION */}
      <Section
        id="production"
        index="02"
        eyebrow={t.production.eyebrow}
        title={t.production.title}
        lead={t.production.lead}
        width="wide"
      >
        <DigitalProductionShowcase locale={locale} />
      </Section>

      {/* 5. AI PRODUCTS */}
      <Section
        id="products"
        index="03"
        eyebrow={t.tech.eyebrow}
        title={t.tech.title}
        lead={t.tech.lead}
      >
        <AIProductsShowcase locale={locale} />
      </Section>

      {/* 7. AI-NATIVE OPERATING MODEL — cinematic dark chapter */}
      <section
        id="how"
        data-theme="dark"
        className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink text-paper"
      >
        <div
          aria-hidden
          className="ambient-drift pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="ambient-drift-slow pointer-events-none absolute -bottom-32 left-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,191,140,0.08),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl" data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {t.how.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">
              {t.how.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{t.how.lead}</p>
          </div>

          {/* HITL pull-statement */}
          <p
            className="mt-12 max-w-4xl font-editorial text-2xl leading-snug text-paper/95 sm:text-3xl lg:text-4xl"
            data-reveal
          >
            {isRu ? (
              <>
                AI готовит <span className="text-mark">→</span> человек проверяет{" "}
                <span className="text-mark">→</span> клиент утверждает{" "}
                <span className="text-mark">→</span> действие.
              </>
            ) : (
              <>
                AI prepares <span className="text-mark">→</span> a human reviews{" "}
                <span className="text-mark">→</span> the client approves{" "}
                <span className="text-mark">→</span> action.
              </>
            )}
          </p>

          <div className="mt-12">
            <OperatingModelSection locale={locale} />
          </div>
        </div>
      </section>

      {/* 8. MANIFESTO — editorial spread */}
      <Manifesto locale={locale} />

      {/* 6. COMMERCIAL MODEL */}
      {/* 6. COMMERCIAL MODEL */}
      <Section
        id="commercial"
        index="04"
        eyebrow={t.commercial.eyebrow}
        title={t.commercial.title}
        lead={t.commercial.lead}
      >
        {/* Marketing Department Retainer Packages */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-wider">
                {isRu ? "Пакеты отдела маркетинга" : "Dedicated Marketing Department Retainers"}
              </span>
              <p className="mt-1 text-xs text-muted max-w-xl">
                {isRu
                  ? "Постоянный HITL-маркетинг: AI генерирует, человек утверждает. Медиабюджет оплачивается отдельно."
                  : "Continuous HITL marketing: AI drafts, human reviews. Media budget is separate."}
              </p>
            </div>
            <span className="font-mono text-xs text-mark shrink-0">
              {isRu ? "Оплата за выбранный план" : "Fixed monthly fee"}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg, pi) => {
              const item = t.packages.items[pkg.id];
              return (
                <article
                  key={pkg.id}
                  data-reveal
                  style={{ "--reveal-delay": `${pi * 80}ms` } as CSSProperties}
                  className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all hover:-translate-y-1 ${
                    pkg.featured
                      ? "border-mark/60 bg-ink-2 shadow-md relative"
                      : "border-line bg-ink-2 hover:border-line-strong hover:shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-semibold text-paper">{item.name}</h4>
                      {pkg.featured ? (
                        <span className="rounded-full bg-mark px-2.5 py-0.5 text-[9px] font-mono font-semibold text-mark-ink uppercase">
                          {t.commercial.featured}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                      {formatUsd(pkg.priceUsd)}
                      <span className="text-xs font-normal text-muted ml-1.5">{t.commercial.perMonth}</span>
                    </p>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{item.summary}</p>

                    <ul className="mt-4 space-y-1.5 text-xs border-t border-line/60 pt-3 text-paper/85">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-mark font-bold shrink-0">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/60 space-y-2">
                    <BuyLink
                      locale={locale}
                      skuId={pkg.id}
                      label={
                        isRu
                          ? `Оплатить ${formatUsd(pkg.priceUsd)}${t.commercial.perMonth}`
                          : `Pay ${formatUsd(pkg.priceUsd)}${t.commercial.perMonth}`
                      }
                      className={`inline-flex w-full justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                        pkg.featured
                          ? "bg-mark text-mark-ink shadow hover:bg-mark-light"
                          : "border border-mark/50 bg-mark/10 text-mark hover:bg-mark/20"
                      }`}
                    />
                    <ContactCta className="inline-flex w-full justify-center rounded-full border border-line bg-ink-3/40 px-3 py-1.5 text-[11px] font-medium text-muted hover:text-paper hover:border-paper/40 transition-colors">
                      {isRu ? "Другой скоуп — обсудить" : "Different scope — discuss"}
                    </ContactCta>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Other Collaboration Formats */}
        {(() => {
          const otherTiers = t.commercial.tiers.filter(
            (tier) =>
              tier &&
              !["Starter", "Growth", "Scale"].includes(tier.name) &&
              !tier.name.toLowerCase().includes("department") &&
              !tier.name.toLowerCase().includes("отдел")
          );
          if (otherTiers.length === 0) return null;
          return (
            <div className="mt-10 pt-8 border-t border-line">
              <div className="mb-5">
                <span className="font-mono text-xs font-semibold text-warm uppercase tracking-wider">
                  {isRu ? "Другие форматы сотрудничества" : "Other Engagement Formats"}
                </span>
                <p className="mt-1 text-xs text-muted">
                  {t.commercial.skuNote}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherTiers.map((tier, ti) => (
                  <article
                    key={tier.name}
                    data-reveal
                    style={{ "--reveal-delay": `${ti * 70}ms` } as CSSProperties}
                    className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-5 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
                          {isRu ? "Формат" : "Format"}
                        </span>
                        <span className="font-display text-sm font-bold text-mark">
                          {tier.price}
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-base font-semibold text-paper">{tier.name}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{tier.body}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-line">
                      {ti === 0 ? (
                        <a
                          href={navHref(locale, "/products")}
                          className="inline-flex w-full justify-center rounded-full border border-line bg-ink-3/40 px-4 py-2 text-xs font-semibold text-paper hover:border-paper/40 transition-colors"
                        >
                          {isRu ? "Смотреть продукты →" : "View Products →"}
                        </a>
                      ) : (
                        <ContactCta className="inline-flex w-full justify-center rounded-full border border-line bg-ink-3/40 px-4 py-2 text-xs font-semibold text-paper hover:border-paper/40 transition-colors">
                          {isRu ? "Обсудить проект →" : "Discuss Project →"}
                        </ContactCta>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })()}

        <p className="mt-6 text-xs text-muted font-mono">{t.commercial.footnote}</p>
      </Section>

      {/* 7. PARTNER NETWORK */}
      <Section
        id="partners"
        index="05"
        eyebrow={t.partners.eyebrow}
        title={t.partners.title}
        lead={t.partners.lead}
      >
        <PartnerNetworkVisual locale={locale} />
      </Section>

      {/* 8. WHY NOW */}
      <Section id="why-now" index="06" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead}>
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8" data-reveal>
            <span className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
              {t.why.oldLabel}
            </span>
            <h4 className="mt-2 font-display text-lg font-semibold text-paper">
              {isRu ? "Изолированные инструменты и ручной труд" : "Fragmented Tools & Manual Overhead"}
            </h4>
            <ul className="mt-6 divide-y divide-line text-xs text-muted">
              {t.why.old.map((item) => (
                <li key={item} className="py-2.5 flex items-center gap-2">
                  <span className="text-warm/80">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden text-center font-display text-xl text-warm md:block">→</div>

          <div className="rounded-2xl border border-mark/40 bg-ink-2 p-6 sm:p-8 shadow-sm" data-reveal>
            <span className="font-mono text-xs font-semibold tracking-wider text-mark uppercase">
              {t.why.newLabel}
            </span>
            <h4 className="mt-2 font-display text-lg font-semibold text-paper">
              {isRu ? "Сквозная AI-native операционная модель" : "End-to-End AI-Native Architecture"}
            </h4>
            <ul className="mt-6 divide-y divide-line text-xs text-paper/90">
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
      </Section>

      {/* 9. INVESTORS SECTION */}
      <Section
        id="investors"
        index="07"
        eyebrow={t.investors.eyebrow}
        title={t.investors.title}
        lead={t.investors.lead}
      >
        <InvestorsSection locale={locale} />
      </Section>

      {/* 10. DIRECT CONTACT / CTA */}
      <Section id="contact" index="08" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <ContactCta className="inline-flex items-center rounded-full bg-mark px-5 py-2.5 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light">
              {isRu ? "Открыть чат" : "Open chat"} →
            </ContactCta>
          </div>
          <aside className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 text-sm text-muted space-y-4">
            <div>
              <p className="font-display text-xl font-semibold text-paper">
                AI MARK
              </p>
              <p className="mt-1 text-xs font-mono text-mark uppercase">
                AI-Native Venture &amp; Marketing Company
              </p>
              <p className="mt-2 text-xs font-mono">
                {site.email}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              {isRu
                ? "Короткий разбор задачи: применимость AI, идея или подбор готового продукта."
                : "A short first conversation: AI fit, an idea, or the right published product."}
            </p>
          </aside>
        </div>
        <div id="inquiry" className="mt-12 scroll-mt-24">
          <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
        </div>
      </Section>
    </>
  );
}
