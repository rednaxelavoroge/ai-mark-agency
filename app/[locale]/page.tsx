import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { getCopy } from "@/content/copy";
import { packages, toolsViaAgency } from "@/content/packages";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  const url = absoluteUrl(locale);

  return {
    title: { absolute: t.meta.title },
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
      title: t.meta.ogTitle,
      description: t.meta.description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
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
  const home = localePath(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,255,63,0.12),transparent_45%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{t.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${home}#packages`}
                className="rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                href={`${home}#contact`}
                className="rounded-full border border-line px-5 py-3 text-sm hover:border-paper/40"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {t.hero.notes.map((note) => (
              <li key={note} className="text-sm text-paper/90">
                <span className="mr-2 text-mark">→</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="how" eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.how.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-line bg-ink-2 p-5"
            >
              <p className="font-mono text-xs text-mark">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="packages"
        eyebrow={t.packages.eyebrow}
        title={t.packages.title}
        lead={t.packages.lead}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((pkg) => {
            const item = t.packages.items[pkg.id];
            return (
              <article
                key={pkg.id}
                className={`flex flex-col rounded-xl border p-6 ${
                  pkg.featured
                    ? "border-mark bg-ink-3"
                    : "border-line bg-ink-2"
                }`}
              >
                {pkg.featured ? (
                  <p className="mb-3 text-xs font-semibold tracking-wide text-mark uppercase">
                    {t.packages.featured}
                  </p>
                ) : null}
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-3 font-display text-3xl tracking-tight">
                  {formatUsd(pkg.priceUsd)}
                  <span className="text-base text-muted">{t.packages.perMonth}</span>
                </p>
                <p className="mt-3 text-sm text-muted">{item.summary}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-mark">·</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${home}#contact`}
                  className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-semibold ${
                    pkg.featured
                      ? "bg-mark text-mark-ink"
                      : "border border-line hover:border-paper/40"
                  }`}
                >
                  {t.packages.cta}
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted">{t.packages.footnote}</p>
      </Section>

      <Section
        id="stack"
        eyebrow={t.stack.eyebrow}
        title={t.stack.title}
        lead={t.stack.lead}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg">{t.stack.readyTitle}</h3>
            <ul className="mt-4 space-y-4">
              {t.stack.ready.map((item) => (
                <li key={item.title} className="border-b border-line pb-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg">{t.stack.laterTitle}</h3>
            <ul className="mt-4 space-y-4">
              {t.stack.later.map((item) => (
                <li key={item.title} className="border-b border-line pb-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 rounded-xl border border-line bg-ink-2 p-6">
          <h3 className="font-display text-lg">{t.stack.toolsTitle}</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t.stack.toolsLead}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {toolsViaAgency.map((tool) => (
              <li key={tool.id}>
                <p className="text-sm font-medium">{tool.name}</p>
                <p className="mt-1 text-sm text-muted">{t.stack.tools[tool.id]}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="fit" eyebrow={t.fit.eyebrow} title={t.fit.title}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-ink-2 p-6">
            <h3 className="font-display text-xl text-mark">{t.fit.forTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {t.fit.forItems.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-ink-2 p-6">
            <h3 className="font-display text-xl">{t.fit.notTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {t.fit.notItems.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <ContactForm t={t.contact} />
          <aside className="rounded-xl border border-line bg-ink-2 p-6 text-sm text-muted">
            <p className="font-display text-paper">{site.domain}</p>
            <p className="mt-3">{t.footer.blurb}</p>
            <p className="mt-4">
              <a className="text-mark hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
