import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/ContactCta";
import { listPublicMessengers } from "@/lib/contact";
import { Pipeline } from "@/components/Pipeline";
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
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  const url = absoluteUrl(locale);

  return {
    title: { absolute: `${site.name} — ${locale === "ru" ? site.taglineRu : site.taglineEn}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: site.url,
        ru: `${site.url}/ru`,
        "x-default": site.url,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${site.name} — ${locale === "ru" ? site.taglineRu : site.taglineEn}`,
      description: t.meta.description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${locale === "ru" ? site.taglineRu : site.taglineEn}`,
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

      {/* 2. PINNED NARRATIVE: IDEA → WORKING BUSINESS */}
      <IdeaToBusiness locale={locale} />

      {/* 2b. FULL-BLEED CAPABILITY BAND */}
      <CapabilityBand locale={locale} />

      {/* 3. WHAT WE DO: 5-PART CONNECTED OPERATING CONTOUR */}
      <Section id="what-we-do" index="01" eyebrow={t.pillars.eyebrow} title={t.pillars.title}>
        <div className="space-y-6">
          <p className="max-w-2xl text-muted text-sm sm:text-base">
            {isRu
              ? "Мы не разделяем создание бизнеса, разработку продукта и маркетинг на независимые контракты. Все пять элементов работают как единая операционная система."
              : "We never fragment venture creation, software engineering, and customer acquisition across isolated silos. All five elements function as an integrated operating engine."}
          </p>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {t.pillars.items.map((item, idx) => (
              <li
                key={item.n}
                data-reveal
                style={{ "--reveal-delay": `${idx * 90}ms` } as CSSProperties}
                className="group relative flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-warm">{item.n}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-mark opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between text-[10px] font-mono text-muted">
                  <span>STAGE 0{idx + 1}</span>
                  {idx < 4 ? <span className="text-warm">→</span> : <span className="text-mark font-bold">✓</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 3. BUSINESS CREATION */}
      <Section
        id="business-creation"
        index="02"
        eyebrow={t.creation.eyebrow}
        title={t.creation.title}
        lead={t.creation.lead}
      >
        <BusinessCreationVisual locale={locale} />
      </Section>

      {/* 4. END-TO-END BUSINESS PATH (PIPELINE) */}
      <Section id="pipeline" index="03" eyebrow={t.pipeline.eyebrow} title={t.pipeline.title}>
        <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-mono text-warm uppercase tracking-widest mb-4">
            {isRu ? "Сквозная операционная цепочка" : "End-to-End Operational Pipeline"}
          </p>
          <Pipeline steps={t.pipeline.steps} />
        </div>
      </Section>

      {/* 5. DIGITAL PRODUCTION */}
      <Section
        id="production"
        index="04"
        eyebrow={t.production.eyebrow}
        title={t.production.title}
        lead={t.production.lead}
        width="wide"
      >
        <DigitalProductionShowcase locale={locale} />
      </Section>

      {/* 6. AI PRODUCTS */}
      <Section
        id="products"
        index="05"
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

      {/* 8. COMMERCIAL MODEL */}
      <Section
        id="commercial"
        index="06"
        eyebrow={t.commercial.eyebrow}
        title={t.commercial.title}
        lead={t.commercial.lead}
      >
        <p className="mb-8 max-w-3xl text-sm text-paper/85">{t.commercial.skuNote}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.commercial.tiers.map((tier, ti) => (
            <article
              key={tier.name}
              data-reveal
              style={{ "--reveal-delay": `${ti * 100}ms` } as CSSProperties}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
            >
              <div>
                <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
                  {isRu ? "Формат сотрудничества" : "Engagement Model"}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">{tier.name}</h3>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight text-mark">
                  {tier.price}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{tier.body}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-line">
                <ContactCta className="inline-flex w-full justify-center rounded-full border border-line bg-ink-3/40 px-4 py-2.5 text-xs font-semibold text-paper hover:border-paper/40 transition-colors">
                  {isRu ? "Запросить условия" : "Request Details"}
                </ContactCta>
              </div>
            </article>
          ))}
        </div>

        {/* Marketing Department Retainers Sub-Block */}
        <div className="mt-16 rounded-2xl border border-line bg-ink-3/30 p-6 sm:p-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-wider">
              {isRu ? "Пакеты отдела маркетинга" : "Dedicated Marketing Department Retainers"}
            </span>
            <h3 className="mt-1 font-display text-2xl font-semibold text-paper">
              {t.commercial.tiers[2].name}
            </h3>
            <p className="mt-2 text-sm text-muted">{t.commercial.tiers[2].body}</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, pi) => {
              const item = t.packages.items[pkg.id];
              return (
                <article
                  key={pkg.id}
                  data-reveal
                  style={{ "--reveal-delay": `${pi * 100}ms` } as CSSProperties}
                  className={`flex flex-col rounded-xl border p-6 transition-all hover:-translate-y-1 ${
                    pkg.featured
                      ? "border-mark/60 bg-ink-2 shadow-md relative"
                      : "border-line bg-ink-2 hover:border-line-strong"
                  }`}
                >
                  {pkg.featured ? (
                    <div className="absolute -top-3 right-6 rounded-full bg-mark px-3 py-0.5 text-[10px] font-mono font-semibold text-mark-ink uppercase">
                      {t.commercial.featured}
                    </div>
                  ) : null}
                  <h4 className="font-display text-xl font-semibold text-paper">{item.name}</h4>
                  <p className="mt-3 font-display text-3xl font-bold tracking-tight text-paper">
                    {formatUsd(pkg.priceUsd)}
                    <span className="text-sm font-normal text-muted ml-1.5">{t.commercial.perMonth}</span>
                  </p>
                  <p className="mt-3 text-xs text-muted leading-relaxed">{item.summary}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-xs border-t border-line/60 pt-4 text-paper/85">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-mark font-bold shrink-0">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <ContactCta
                    className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                      pkg.featured
                        ? "bg-mark text-mark-ink shadow hover:bg-mark-light"
                        : "border border-line bg-ink-3/40 text-paper hover:border-paper/40"
                    }`}
                  >
                    {t.commercial.retainerCta}
                  </ContactCta>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-6 text-xs text-muted font-mono">{t.commercial.footnote}</p>
      </Section>

      {/* 9. PARTNER NETWORK */}
      <Section
        id="partners"
        index="07"
        eyebrow={t.partners.eyebrow}
        title={t.partners.title}
        lead={t.partners.lead}
      >
        <PartnerNetworkVisual locale={locale} />
      </Section>

      {/* 10. WHY NOW */}
      <Section id="why-now" index="08" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead}>
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8" data-reveal>
            <span className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
              {t.why.oldLabel}
            </span>
            <h4 className="mt-2 font-display text-lg font-semibold text-paper">
              {isRu ? "Изолированные инструменты & ручной труд" : "Fragmented Tools & Manual Overhead"}
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

      {/* 11. INVESTORS SECTION */}
      <Section
        id="investors"
        index="09"
        eyebrow={t.investors.eyebrow}
        title={t.investors.title}
        lead={t.investors.lead}
      >
        <InvestorsSection locale={locale} />
      </Section>

      {/* 12. DIRECT CONTACT / CTA */}
      <Section id="contact" index="10" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted">{t.contact.lead}</p>
            <ContactCta className="inline-flex items-center rounded-full bg-mark px-5 py-2.5 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light">
              {isRu ? "Открыть чат" : "Open chat"} →
            </ContactCta>
            <ul className="space-y-3 pt-2">
              {listPublicMessengers().map((row) => (
                <li key={row.key}>
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-paper hover:text-mark transition-colors"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{row.label}</span>
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 text-sm text-muted space-y-6">
            <div>
              <span className="font-mono text-xs text-warm uppercase tracking-wider">
                {isRu ? "Прямой контакт" : "Direct Engagement"}
              </span>
              <p className="mt-1 font-display text-xl font-semibold text-paper">
                AI Mark
              </p>
              <p className="mt-1 text-xs font-mono text-mark uppercase">
                AI-Native Venture &amp; Marketing Company
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted">
              {t.footer.blurb}
            </p>

            <div className="border-t border-line pt-4">
              <p className="text-xs text-paper font-mono">
                Domain: <span className="text-muted">{site.domain}</span>
              </p>
            </div>

            <div className="rounded-lg border border-line/70 bg-ink-3/40 p-4 text-xs text-muted">
              <p className="font-semibold text-paper mb-1">
                {isRu ? "Формат первого диалога:" : "First Contact Cadence:"}
              </p>
              <p>
                {isRu
                  ? "Короткий 20-минутный разбор задачи: оценка применимости AI, аудит идеи или подбор готового продукта."
                  : "A focused 20-minute discussion: applicability audit, opportunity screening, or product onboarding."}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
