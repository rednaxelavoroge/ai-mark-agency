import Link from "next/link";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import type { Copy } from "@/content/copy";
import { navHref, site, type Locale } from "@/lib/site";

type HubModule = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  badge: string;
  cta: string;
  href: string;
  accent: string;
};

type FeaturedProduct = {
  id: string;
  name: string;
  tag: string;
  price: string;
  desc: string;
  highlights: string[];
  href: string;
  externalUrl: string | null;
};

/**
 * Home follows the Manus sample section order: three entry points, three
 * product cards, team-vs-subscription, eight-stage path, contact, then
 * partner / investor / pricing cards. Long UI mocks stay on the subpages.
 */
export function HomeRest({
  locale,
  t,
  hubModules,
  featuredProducts,
  isRu,
}: {
  locale: Locale;
  t: Copy;
  hubModules: HubModule[];
  featuredProducts: FeaturedProduct[];
  isRu: boolean;
}) {
  const entries = [
    { href: "/products", kicker: "01", title: t.products.hubTitle, body: t.products.hubLead },
    { href: "/digital-production", kicker: "02", title: t.production.title, body: t.production.lead },
    { href: "/how-it-works", kicker: "03", title: t.creation.title, body: t.creation.lead },
  ];
  const tailOrder = ["/partners", "/investors", "/pricing"];
  const tail = tailOrder
    .map((href) => hubModules.find((m) => m.href === href))
    .filter((m): m is HubModule => Boolean(m));

  return (
    <>
      <section className="border-b border-line" aria-label={t.pipeline.title}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-[13px] text-muted sm:px-6">
          <span className="font-semibold text-paper">{t.pipeline.eyebrow}</span>
          {t.pipeline.steps.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </section>

      <Section id="start" index="01" eyebrow={t.pillars.eyebrow} title={t.pillars.title} lead={t.hero.extra}>
        <div className="grid gap-4 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={navHref(locale, entry.href)}
              className="flex flex-col rounded-[24px] border border-line bg-ink-2 p-6"
            >
              <span className="font-mono text-xs font-semibold text-muted">{entry.kicker}</span>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-[-0.04em]">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{entry.body}</p>
              <span className="mt-6 text-sm font-semibold text-mark">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="products" index="02" eyebrow={t.tech.eyebrow} title={t.tech.title} lead={t.products.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="flex flex-col rounded-[24px] border border-line bg-ink-2 p-5">
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span className="font-semibold text-mark">{product.tag}</span>
                <span className="font-semibold">{product.price}</span>
              </div>
              <h3 className="mt-3 font-sans text-xl font-semibold tracking-[-0.04em]">{product.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{product.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {product.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-mark" aria-hidden>
                      ↗
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-sm font-semibold">
                <Link href={product.href} className="text-mark">
                  {isRu ? "Подробнее" : "Details"} →
                </Link>
                {product.externalUrl ? (
                  <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                    showroom-ai.pro ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-t border-line bg-[#14291f] text-[#f4f6ee]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">{t.commercial.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-sans text-3xl font-semibold tracking-[-0.05em]">{t.commercial.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d3ddd2]">{t.commercial.lead}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[24px] border border-white/15 p-6">
              <h3 className="font-sans text-2xl font-semibold">{t.commercial.tiers[0]?.name ?? t.commercial.eyebrow}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#d3ddd2]">{t.commercial.tiers[0]?.body}</p>
              <Link href={navHref(locale, "/pricing")} className="mt-6 inline-flex text-sm font-semibold text-[#d4f27e]">
                {t.commercial.retainerCta} →
              </Link>
            </article>
            <article className="rounded-[24px] border border-white/15 p-6">
              <h3 className="font-sans text-2xl font-semibold">{t.production.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#d3ddd2]">{t.production.lead}</p>
              <Link href={navHref(locale, "/digital-production")} className="mt-6 inline-flex text-sm font-semibold text-[#d4f27e]">
                {isRu ? "О цифровом производстве" : "About digital production"} →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Section id="stages" index="03" eyebrow={t.creation.eyebrow} title={t.creation.title} lead={t.creation.lead}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.creation.steps.map((step, i) => (
            <article key={step.title} className="rounded-2xl border border-line bg-ink-2 p-4">
              <span className="font-mono text-xs text-mark">{String(i).padStart(2, "0")}</span>
              <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-[24px] border border-line bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-sans text-xl font-semibold">{t.why.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.why.lead}</p>
          </div>
          <Link href={navHref(locale, "/how-it-works")} className="inline-flex min-h-11 items-center text-sm font-semibold text-mark">
            {isRu ? "Все этапы" : "All stages"} →
          </Link>
        </div>
      </Section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {t.pillars.items.map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Section id="contact" index="04" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <a className="inline-flex min-h-11 items-center text-sm font-semibold text-mark" href={`mailto:${site.email}`}>
          {site.email} →
        </a>
        <details id="inquiry" className="mt-6 scroll-mt-24 rounded-[24px] border border-line bg-ink-2">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold">
            {t.contact.formCta}
          </summary>
          <div className="px-2 pb-2">
            <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
          </div>
        </details>
      </Section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-3">
          {tail.map((card) => (
            <Link key={card.href} href={navHref(locale, card.href)} className="rounded-[24px] border border-line bg-ink-2 p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{card.tag}</p>
              <h3 className="mt-3 font-sans text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.desc}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-mark">{card.cta} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
