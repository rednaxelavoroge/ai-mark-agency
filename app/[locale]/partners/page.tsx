import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadInquiry } from "@/components/LeadInquiry";
import { PartnerNetworkHeroVisual } from "@/components/PartnerNetworkHeroVisual";
import { LevelRings } from "@/components/visuals/ProductScenes";
import { getCopy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { PARTNER_SIGNUP_HREF } from "@/lib/auth/redirects";
import { digitalProductionPath } from "@/lib/digital-production";
import { partnerProgramTerms } from "@/content/partner-program";
import { partnerPageCopy } from "@/content/partners-copy";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";
import { socialImages } from "@/lib/social";
import { BackButton } from "@/components/BackButton";
import { brief } from "@/lib/brief";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = partnerPageCopy[locale] ?? partnerPageCopy.en;
  const copy = getCopy(locale);
  const metaTitle = t.metaTitle ?? copy.partners.title;
  const metaDescription = t.metaDescription ?? copy.partners.lead;

  const langAlternates: Record<string, string> = {};
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc, "/partners");
  }

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: {
      canonical: absoluteUrl(locale, "/partners"),
      languages: langAlternates,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName: site.name,
      url: absoluteUrl(locale, "/partners"),
      type: "article",
      images: socialImages(locale),
    },
  };
}

const reveal = (ms: number): CSSProperties => ({ "--reveal-delay": ms + "ms" } as CSSProperties);

export default async function PartnersPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = partnerPageCopy[locale] ?? partnerPageCopy.en;
  const terms = partnerProgramTerms[locale];
  const published = getCopy(locale);
  const partnersChrome = getPublicChromeCopy(locale).partnersPage;
  const publishedPrices = [
    published.products.items.aime.price,
    published.products.items.assistant.price,
    published.products.items.showroom.price,
    published.commercial.tiers[3]?.price ?? "",
  ];

  return (
    <article>
      <section className="relative overflow-hidden border-b border-line">
        <div className="ambient-drift pointer-events-none absolute -right-20 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.12),transparent_68%)]" />
        <div className="ambient-drift-slow pointer-events-none absolute -bottom-40 left-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,191,140,0.09),transparent_68%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-24">
          <div data-reveal>
            <BackButton locale={locale} className="mb-6" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-editorial text-4xl leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.lead}</p>
            <p className="mt-4 max-w-xl font-display text-lg font-semibold leading-snug text-paper sm:text-xl">{t.poolHeadline}</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {partnersChrome.heroSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  {i > 0 ? <span className="font-mono text-xs text-warm">→</span> : null}
                  <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-sm text-paper">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={PARTNER_SIGNUP_HREF} className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">
                {t.primary}
                <span className="btn-arrow" aria-hidden>→</span>
              </Link>
              <a href="#how-it-works" className="inline-flex rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-semibold text-paper transition hover:border-line-strong">{t.secondary}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {t.note.split(" · ").map((item) => <span key={item} className="font-mono text-[10px] tracking-wide text-muted">{item}</span>)}
            </div>
          </div>
          <div data-reveal style={reveal(120)}>
            <details open className="group mt-6 rounded-2xl border border-line bg-ink-2/30">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-paper hover:bg-ink-3/40 transition-colors rounded-t-2xl">
                <span>{partnersChrome.networkSketch}</span>
                <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
              </summary>
              <div className="border-t border-line/60 p-4 sm:p-5 space-y-6">
                <PartnerNetworkHeroVisual locale={locale} />
                <div data-motion className="rounded-2xl border border-line bg-ink-2 p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3 mb-4">
                    <span className="font-mono text-[11px] font-semibold text-warm uppercase tracking-wider">
                      {partnersChrome.heroSteps[2]}
                    </span>
                    <span className="font-mono text-xs font-semibold text-mark">
                      {partnersChrome.heroSteps[3]}
                    </span>
                  </div>
                  <LevelRings />
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section id="market" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.marketEyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.marketTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{brief(t.marketLead)}</p>
          </div>
          <div className="am-step-grid mt-6 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {t.market.map((item, i) => (
              <article key={item.title} data-reveal style={reveal(i * 80)} className="rounded-2xl border border-line bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-warm">0{i + 1}</span><span className="h-1.5 w-1.5 rounded-full bg-mark" /></div>
                <h3 className="mt-5 font-display text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{brief(item.body)}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-mark/30 bg-mark/5 p-6 sm:p-8">
            <p className="font-editorial text-2xl leading-snug text-paper sm:text-3xl">{t.marketCore}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.productEyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.productTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{brief(t.productLead)}</p>
          </div>
          <div className="am-step-grid mt-6 grid gap-3 grid-cols-2">
            {t.products.map((product, i) => (
              <article key={product.name} data-reveal style={reveal(i * 90)} className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">{product.type}</span><span className="h-1.5 w-1.5 rounded-full bg-mark" /></div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-paper">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{brief(product.body)}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">{publishedPrices[i] || product.revenue}</span>
                    {product.href ? <Link href={localePath(locale, product.href)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productCta} →</Link> : <Link href={digitalProductionPath(locale)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productionCta} →</Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.howEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.modelTitle}</h2><p className="mt-4 max-w-2xl text-muted">{brief(t.modelLead)}</p></div>
          <div className="am-step-grid mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line grid-cols-2 lg:grid-cols-3">
            {t.steps.map((step) => <article key={step.n} className="bg-ink p-6 sm:p-7" data-reveal><span className="font-mono text-xs font-semibold text-warm">{step.n}</span><h3 className="mt-3 font-display text-base font-semibold text-paper">{step.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted">{brief(step.body)}</p></article>)}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.networkEyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.networkTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{brief(t.networkLead)}</p>
            <p className="mt-4 max-w-3xl font-display text-lg font-semibold text-paper">{t.poolHeadline}</p>
            <p className="mt-2 max-w-3xl text-sm text-muted">{brief(t.poolLead)}</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink-2">
            <div className="am-step-grid grid grid-cols-2 md:grid-cols-5">
              {t.levels.map((level, i) => (
                <div
                  key={level.n}
                  className={`border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-6 ${i === 0 ? "bg-mark/10 md:border-r-mark/40" : ""}`}
                  data-reveal
                  style={reveal(i * 70)}
                >
                  <span className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${i === 0 ? "text-mark" : "text-warm"}`}>{level.n}</span>
                  <p className={`mt-3 font-editorial ${i === 0 ? "text-4xl text-mark" : "text-2xl text-paper"}`}>{level.rate}</p>
                  <h3 className="mt-3 font-display text-sm font-semibold text-paper">{level.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">{brief(level.body)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-line bg-ink-3/30 px-6 py-5">
              <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{t.commissionLabel}</p>
              <p className="mt-2 text-xs leading-relaxed text-paper/80">{t.commissionNote}</p>
              <p className="mt-4 font-display text-sm font-semibold text-paper">{t.exampleTitle}</p>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {t.exampleRows.map((row) => (
                  <div key={row.label} className={`flex items-baseline justify-between gap-3 rounded-lg border px-3 py-2 ${row.accent ? "border-mark/40 bg-mark/10" : "border-line bg-ink-2"}`}>
                    <dt className="text-[11px] text-muted">{row.label}</dt>
                    <dd className={`font-mono text-sm ${row.accent ? "text-mark" : "text-paper"}`}>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-paper/80">{t.exampleFoot}</p>
              <details open className="group mt-4 rounded-xl border border-line bg-ink-2/40 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-mark">
                  <span>{partnersChrome.networkTerms}</span>
                  <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 space-y-2 border-t border-line/50 pt-3 text-xs leading-relaxed text-muted">
                  <p>{terms.note}</p>
                  <p>{terms.launch}</p>
                  <p>{terms.example}</p>
                  <p>{terms.lock}</p>
                  <p>{terms.payout}</p>
                  <p>{terms.country}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.statusEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.statusTitle}</h2><p className="mt-4 max-w-3xl text-muted">{brief(t.statusLead)}</p></div>
          <div className="am-step-grid mt-6 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {t.statuses.map((status, i) => <article key={status.title} data-reveal style={reveal(i * 90)} className="flex flex-col rounded-2xl border border-line bg-ink-2 p-5"><span className="inline-flex self-start rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-warm">{status.tag}</span><h3 className="mt-5 font-display text-lg font-semibold text-paper">{status.title}</h3><p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{brief(status.body)}</p><div className="mt-5 border-t border-line pt-4 font-mono text-[10px] text-mark">{t.statusNote}</div></article>)}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.kitEyebrow}</p><h2 className="mt-3 font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.kitTitle}</h2><p className="mt-4 text-muted">{t.kitLead}</p></div>
          <div className="am-step-grid grid grid-cols-2 gap-3" data-reveal style={reveal(120)}>{t.kit.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mark text-[10px] font-bold text-mark-ink">{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
        </div>
      </section>

      <details open className="border-b border-line bg-ink-2/20 group">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6 flex items-center justify-between text-paper hover:bg-ink-3/40 transition-colors">
          <span>{partnersChrome.globalExpansion}</span>
          <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
        </summary>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 border-t border-line/60">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.globalEyebrow}</p><h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.globalTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.globalLead}</p></div>
          <div className="am-step-grid mt-6 grid grid-cols-2 gap-3" data-reveal style={reveal(120)}>{t.global.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 font-mono text-[10px] font-semibold text-warm">0{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
        </div>
      </details>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.faqEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.faqTitle}</h2></div>
          <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-2">{t.faq.map((item) => <details key={item.q} className="group px-5 py-5 sm:px-7"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-sm font-semibold text-paper"><span>{item.q}</span><span className="font-mono text-lg text-mark transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-3 text-xs leading-relaxed text-muted">{item.a}</p></details>)}</div>
        </div>
      </section>

      <details open className="border-b border-line group">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6 flex items-center justify-between text-paper hover:bg-ink-3/40 transition-colors">
          <span>{partnersChrome.leaveContacts}</span>
          <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
        </summary>
        <div className="border-t border-line/60">
          <LeadInquiry contact={published.contact} locale={locale} />
        </div>
      </details>

      <section className="border-b border-line"><div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28" data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.ctaEyebrow}</p><h2 className="mt-3 font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{brief(t.ctaTitle)}</h2><p className="mx-auto mt-4 max-w-2xl text-muted">{brief(t.ctaLead)}</p><p className="mx-auto mt-3 max-w-xl text-xs text-muted">{terms.join}</p><Link href={PARTNER_SIGNUP_HREF} className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">{t.ctaButton}<span className="btn-arrow" aria-hidden>→</span></Link></div></section>
    </article>
  );
}
