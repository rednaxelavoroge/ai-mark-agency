import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import type { Copy } from "@/content/copy";
import { navHref, site, type Locale } from "@/lib/site";

export function CompactHero({ locale, t }: { locale: Locale; t: Copy }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="ambient-drift pointer-events-none absolute -right-16 -top-24 h-[280px] w-[280px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.10),transparent_70%)]"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-mark uppercase sm:text-base">
          {site.name}
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-warm uppercase">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-editorial text-3xl leading-[1.05] tracking-tight text-paper sm:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{t.hero.lead}</p>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">{t.hero.extra}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <ContactCta className="inline-flex items-center rounded-full bg-mark px-4 py-2.5 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light">
            {t.hero.primaryCta} →
          </ContactCta>
          <a
            href={navHref(locale, "#how")}
            className="inline-flex rounded-full border border-line bg-ink-2 px-4 py-2.5 text-sm font-semibold text-paper hover:border-line-strong"
          >
            {t.hero.secondaryCta}
          </a>
          <Link
            href={navHref(locale, "/partners")}
            className="inline-flex rounded-full border border-line bg-ink-2 px-4 py-2.5 text-sm font-semibold text-paper hover:border-line-strong"
          >
            {t.hero.partnerCta}
          </Link>
          <Link
            href={navHref(locale, "/investors")}
            className="inline-flex rounded-full border border-line bg-ink-2 px-4 py-2.5 text-sm font-semibold text-paper hover:border-line-strong"
          >
            {t.hero.investorCta}
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-muted">{t.hero.soft}</p>
      </div>
    </section>
  );
}
