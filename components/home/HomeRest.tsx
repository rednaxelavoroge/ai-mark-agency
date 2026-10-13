import Link from "next/link";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import type { Copy } from "@/content/copy";
import { getHomePlain } from "@/content/home-plain";
import { fillPlanTokens, getPlainCopy, planTokens } from "@/content/plain-copy";
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
 * Home below the hero and the roles block, for a small business: how to start
 * (three steps + the lead form), then the three plans. Business creation,
 * investors, digital production and the partner program are footer-only.
 * `hubModules` / `featuredProducts` stay in the props for the page call.
 */
export function HomeRest({
  locale,
  t,
}: {
  locale: Locale;
  t: Copy;
  hubModules: HubModule[];
  featuredProducts: FeaturedProduct[];
}) {
  const home = getHomePlain(locale);
  const plain = getPlainCopy(locale);
  const tokens = planTokens();
  // Customer intents only: no capital / investment options on the home form.
  const contact = {
    ...t.contact,
    scenarioOptions: t.contact.scenarioOptions.filter(
      (o) => o.value !== "capital" && o.value !== "investment",
    ),
  };

  return (
    <>
      <Section id="start" index="01" tight eyebrow={home.startEyebrow} title={home.startTitle}>
        <ol className="grid gap-4 lg:grid-cols-3">
          {home.steps.map(([title, body], i) => (
            <li key={title} className="flex flex-col rounded-[24px] border border-line bg-ink-2 p-6">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mark font-mono text-sm font-semibold text-mark-ink">
                {i + 1}
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-[-0.04em]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{fillPlanTokens(body, tokens)}</p>
            </li>
          ))}
        </ol>
        <div id="contact" className="mt-6 scroll-mt-24 rounded-[24px] border border-line bg-ink-2 p-2">
          <LeadInquiry contact={contact} locale={locale} framed={false} compact />
        </div>
        <a className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-mark" href={`mailto:${site.email}`}>
          {site.email} →
        </a>
      </Section>

      <Section id="plans" index="02" tight eyebrow={plain.pricing.eyebrow} title={home.plansTitle}>
        <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-relaxed text-paper/90">{fillPlanTokens(plain.pricing.lead, tokens)}</p>
          <Link href={navHref(locale, "/pricing")} className="inline-flex shrink-0 min-h-11 items-center rounded-full bg-mark px-5 text-sm font-semibold text-mark-ink">
            {home.plansCta} →
          </Link>
        </div>
        <p className="mt-3 text-[13px] text-muted">{plain.pricing.payNote}</p>
      </Section>
    </>
  );
}
