import Link from "next/link";
import { HScroll } from "@/components/hub/HScroll";
import type { Copy } from "@/content/copy";
import { INVESTOR_PAGE_PATH } from "@/lib/investors";
import { navHref, type Locale } from "@/lib/site";

export function InvestorEntry({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";
  const cards = isRu
    ? [
        { title: "Бизнес", body: t.investors.lead },
        { title: "Технология", body: t.tech.lead },
        { title: "Дистрибуция", body: t.partners.lead },
        { title: "Рост", body: t.investors.uses.join(" · ") },
      ]
    : [
        { title: "Business", body: t.investors.lead },
        { title: "Technology", body: t.tech.lead },
        { title: "Distribution", body: t.partners.lead },
        { title: "Growth", body: t.investors.uses.join(" · ") },
      ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{t.investors.not}</p>
      <HScroll cols={4} label={t.investors.title}>
        {cards.map((card) => (
          <article key={card.title} role="listitem" className="rounded-xl border border-line bg-ink-2 p-4">
            <h3 className="font-display text-sm font-semibold text-paper">{card.title}</h3>
            <p className="mt-2 line-clamp-4 text-[11px] leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </HScroll>
      <p className="text-xs text-muted">{t.investors.scale}</p>
      <Link
        href={navHref(locale, INVESTOR_PAGE_PATH)}
        className="inline-flex rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink hover:bg-mark-light"
      >
        {isRu ? "Обзор для инвесторов" : "View Investor Overview"}
      </Link>
    </div>
  );
}
