import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InvestorProposalView, revealDelay } from "@/components/InvestorProposal";
import { getInvestorsCopy } from "@/content/investors";
import { INVESTOR_PAGE_PATH } from "@/lib/investors";
import { Flow } from "@/lib/markdown";
import { absoluteUrl, isLocale, navHref, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getInvestorsCopy(locale);

  return {
    title: { absolute: `${t.eyebrow} · ${site.name}` },
    description: t.subtitle,
    alternates: {
      canonical: absoluteUrl(locale, INVESTOR_PAGE_PATH),
      languages: {
        en: absoluteUrl("en", INVESTOR_PAGE_PATH),
        ru: absoluteUrl("ru", INVESTOR_PAGE_PATH),
      },
    },
    openGraph: {
      title: `${t.eyebrow} · ${site.name}`,
      description: t.subtitle,
      url: absoluteUrl(locale, INVESTOR_PAGE_PATH),
      type: "article",
    },
  };
}

export default async function InvestorsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getInvestorsCopy(locale);
  const isRu = locale === "ru";

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mark">
          {t.eyebrow}
        </p>
        <h1
          className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-5xl"
          data-reveal
        >
          {t.title}
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-paper sm:text-lg">
          {t.subtitle}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
          {t.lead}
        </p>
        <div className="mt-6">
          <Flow steps={t.meta.split("→").map((step) => step.trim())} />
        </div>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((stat, index) => (
          <div
            key={stat.label}
            data-reveal
            style={revealDelay(index * 80)}
            className="rounded-2xl border border-line bg-ink-2 p-5 shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-warm">
              {stat.label}
            </span>
            <p className="mt-3 font-display text-xl font-semibold text-paper sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-muted">
              {stat.unit || "\u00A0"}
            </p>
            <p className="mt-2 border-t border-line/60 pt-2 text-[11px] leading-relaxed text-muted">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {t.documentLabel}
        </span>
        {(["ru", "en"] as const).map((docLocale) => (
          <a
            key={docLocale}
            href={`/api/investors/proposal/${docLocale}`}
            className="link-underline font-mono text-[11px] font-semibold text-mark"
            download={`ai-mark-investment-proposal-${docLocale}.md`}
          >
            {t.downloadLabel} · {docLocale.toUpperCase()}
          </a>
        ))}
      </div>

      <InvestorProposalView locale={locale} copy={t} />

      <section
        data-reveal
        className="mt-12 rounded-2xl border border-warm/30 bg-warm/10 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-warm">
              {t.ctaEyebrow}
            </span>
            <h2 className="mt-2 font-display text-lg font-semibold text-paper sm:text-xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.ctaBody}</p>
          </div>
          <div className="shrink-0">
            <Link
              href={navHref(locale, "#contact")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-mark px-6 py-3 text-xs font-semibold text-mark-ink shadow-md transition-all hover:bg-mark-light"
            >
              {t.ctaButton}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
        <p className="mt-6 border-t border-warm/20 pt-4 text-[11px] leading-relaxed text-muted">
          {isRu
            ? "Документ является предварительным информационным предложением и не является публичной офертой, гарантией доходности или обещанием определённого финансового результата."
            : "This document is a preliminary information proposal and is not a public offer, a guarantee of returns or a promise of any specific financial outcome."}
        </p>
      </section>
    </article>
  );
}
