import Link from "next/link";
import { ProductUI } from "@/components/ui/ProductUI";
import { getDigitalProductionCopy } from "@/content/digital-production";
import { digitalProductionPath } from "@/lib/digital-production";
import type { Locale } from "@/lib/site";

export function DigitalProductionHubCard({ locale }: { locale: Locale }) {
  const t = getDigitalProductionCopy(locale);
  const isRu = locale === "ru";
  const cta = isRu ? "Цифровое производство" : "Digital Production";

  return (
    <article className="catalog-card peek-host group overflow-hidden rounded-2xl border border-line bg-ink-2 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-xl">
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-xl border border-line bg-ink-3/30">
          <ProductUI variant="saas" ratio="aspect-[16/8.8]" peek />
        </div>
      </div>
      <div className="border-t border-line p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">
            {t.hero.label}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" />
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold text-paper">{t.hero.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.hero.body}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">
            {t.hero.badge}
          </span>
          <Link
            href={digitalProductionPath(locale)}
            className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light"
          >
            {cta} →
          </Link>
        </div>
      </div>
    </article>
  );
}
