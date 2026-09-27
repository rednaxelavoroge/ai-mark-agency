import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ContactCta } from "@/components/ContactCta";
import { Section } from "@/components/Section";
import { IdeaToBusiness } from "@/components/IdeaToBusiness";
import { BusinessCreationVisual } from "@/components/BusinessCreationVisual";
import { DigitalProductionShowcase } from "@/components/DigitalProductionShowcase";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { Manifesto } from "@/components/Manifesto";
import { getCopy } from "@/content/copy";
import { absoluteUrl, isLocale, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const isRu = locale === "ru";
  const title = isRu
    ? `Как идея становится бизнесом · Сквозной контур · ${site.name}`
    : `How an Idea Becomes a Business · Venture System · ${site.name}`;
  const description = isRu
    ? "Сквозной управляемый контур трансформации: от идеи и юнит-экономики до AI-инфраструктуры, продукта и масштабирования."
    : "The end-to-end transformation system: from idea and unit economics to AI infrastructure, product, and scale.";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(locale, "/how-it-works"),
      languages: {
        en: absoluteUrl("en", "/how-it-works"),
        ru: absoluteUrl("ru", "/how-it-works"),
      },
    },
  };
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const isRu = locale === "ru";

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4 sm:px-6 sm:pt-10">
        <BackButton locale={locale} targetHref="/" />
      </div>

      {/* 1. Full IdeaToBusiness Dial with unconstrained sticky pinning */}
      <IdeaToBusiness locale={locale} />

      {/* 2. Business Creation: Two Entries */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Section
          id="business-creation"
          index="01"
          eyebrow={t.creation.eyebrow}
          title={t.creation.title}
          lead={t.creation.lead}
        >
          <BusinessCreationVisual locale={locale} />
        </Section>
      </div>

      {/* 3. Digital Production Infrastructure */}
      <div className="mt-20">
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
      </div>

      {/* 4. AI-Native Operating Model (HITL) */}
      <div className="mt-20 overflow-hidden rounded-3xl border border-line bg-ink">
        <div className="p-6 sm:p-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-4xl">
            {t.how.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {t.how.lead}
          </p>
          <div className="mt-10">
            <OperatingModelSection locale={locale} />
          </div>
        </div>
      </div>

      {/* 5. Manifesto & Principles */}
      <div className="mt-20 overflow-hidden rounded-3xl border border-line bg-ink-2/30">
        <Manifesto locale={locale} />
      </div>

      {/* Bottom Action Card */}
      <div className="mt-20 rounded-3xl border border-warm/30 bg-warm-soft p-8 sm:p-12 text-center" data-reveal>
        <span className="font-mono text-[10px] font-semibold tracking-widest text-warm uppercase">
          {isRu ? "Следующий шаг" : "Next Step"}
        </span>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
          {isRu ? "Обсудим задачу вашего бизнеса?" : "Ready to discuss your business challenge?"}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          {isRu
            ? "Разберём текущую стадию: идея, готовый продукт или внедрение AI-агентов в существующие процессы."
            : "We'll review your current stage: an idea, an existing product, or integrating AI agents into operations."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <ContactCta className="inline-flex items-center gap-2 rounded-full bg-mark px-6 py-3 text-xs sm:text-sm font-semibold text-mark-ink hover:bg-mark-light shadow-md transition-all">
            {isRu ? "Открыть чат с ассистентом" : "Open chat with assistant"} →
          </ContactCta>
          <BackButton locale={locale} targetHref="/" />
        </div>
      </div>
    </div>
  );
}
