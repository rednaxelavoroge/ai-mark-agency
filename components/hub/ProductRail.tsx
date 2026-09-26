import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { BuyLink } from "@/components/BuyLink";
import { Explore } from "@/components/hub/Explore";
import { HScroll } from "@/components/hub/HScroll";
import type { Copy } from "@/content/copy";
import { products } from "@/content/packages";
import { navHref, type Locale } from "@/lib/site";
import { productPagePath, productsHubPath } from "@/lib/products";

export function ProductRail({
  locale,
  t,
  withBuy = false,
}: {
  locale: Locale;
  t: Copy;
  withBuy?: boolean;
}) {
  const isRu = locale === "ru";
  const explore = isRu ? "Подробнее" : "Explore";
  const cards = [
    {
      id: "aime",
      name: products.find((p) => p.id === "aime")?.name ?? "AIME",
      category: t.productPages.aime.eyebrow,
      body: t.products.items.aime.value,
      price: t.products.items.aime.price,
      href: productPagePath(locale, "aime"),
      who: t.products.items.aime.who,
      extra: t.products.items.aime.extra,
      sections: t.productPages.aime.sections,
      flow: t.productPages.aime.flow,
    },
    {
      id: "assistant",
      name: products.find((p) => p.id === "assistant")?.name ?? "AI Business Assistant",
      category: t.productPages.assistant.eyebrow,
      body: t.products.items.assistant.value,
      price: t.products.items.assistant.price,
      href: productPagePath(locale, "assistant"),
      who: t.products.items.assistant.who,
      extra: t.products.items.assistant.extra,
      sections: t.productPages.assistant.sections,
      flow: t.productPages.assistant.flow,
    },
    {
      id: "showroom",
      name: products.find((p) => p.id === "showroom")?.name ?? "SHOWROOM AI",
      category: t.productPages.showroom.eyebrow,
      body: t.products.items.showroom.value,
      price: t.products.items.showroom.price,
      href: productPagePath(locale, "showroom"),
      who: t.products.items.showroom.who,
      extra: t.products.items.showroom.extra,
      sections: t.productPages.showroom.sections,
      flow: t.productPages.showroom.flow,
    },
    {
      id: "production",
      name: isRu ? "Digital Production & AI Engineering" : "Digital Production & AI Engineering",
      category: t.production.eyebrow,
      body: t.production.lead,
      price: t.commercial.tiers[3]?.price ?? t.commercial.custom,
      href: navHref(locale, "#production"),
      who: t.production.note,
      extra: t.production.items.join(" · "),
      sections: t.production.items.map((item) => ({ title: item, body: t.production.note })),
      flow: t.production.items,
    },
  ];

  return (
    <HScroll cols={4} label={t.products.title}>
      {cards.map((card) => (
        <article
          key={card.id}
          role="listitem"
          className="flex min-h-0 flex-col rounded-xl border border-line bg-ink-2 p-4"
        >
          <p className="font-mono text-[10px] font-semibold tracking-wider text-warm uppercase">
            {card.category}
          </p>
          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-paper">{card.name}</h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">{card.body}</p>
          <p className="mt-3 font-mono text-[11px] font-semibold text-mark">{card.price}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {card.id === "production" ? (
              <ContactCta className="inline-flex rounded-full bg-mark px-3 py-1.5 text-[11px] font-semibold text-mark-ink hover:bg-mark-light">
                {isRu ? "Обсудить" : "Discuss"}
              </ContactCta>
            ) : (
              <Link
                href={card.href}
                className="inline-flex rounded-full bg-mark px-3 py-1.5 text-[11px] font-semibold text-mark-ink hover:bg-mark-light"
              >
                {t.products.detailCta}
              </Link>
            )}
            {withBuy && card.id !== "production" ? (
              <BuyLink
                locale={locale}
                label={isRu ? "Оплатить" : "Pay"}
                className="inline-flex rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-paper"
              />
            ) : null}
          </div>
          <div className="mt-3">
            <Explore summary={explore}>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {isRu ? "Что делает" : "What it does"}
                </span>
                <br />
                {card.body}
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {isRu ? "Каналы / контур" : "Channels / loop"}
                </span>
                <br />
                {card.flow.join(" → ")}
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {t.products.extraLabel}
                </span>
                <br />
                {card.extra}
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {isRu ? "Человек в контуре" : "Human handoff"}
                </span>
                <br />
                {card.extra}
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {t.products.whoLabel}
                </span>
                <br />
                {card.who}
              </p>
              {card.sections.map((section) => (
                <p key={section.title}>
                  <strong className="text-paper">{section.title}.</strong> {section.body}
                </p>
              ))}
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                  {isRu ? "Коммерческая модель" : "Commercial model"}
                </span>
                <br />
                {card.price}
              </p>
            </Explore>
          </div>
        </article>
      ))}
    </HScroll>
  );
}

export function ProductsHubCta({ locale, t }: { locale: Locale; t: Copy }) {
  return (
    <p className="mt-4 text-xs text-muted">
      <Link href={productsHubPath(locale)} className="link-underline font-semibold text-paper">
        {t.products.hubCta}
      </Link>
    </p>
  );
}
