"use client";

import { useState } from "react";
import { ContactCta } from "@/components/ContactCta";
import { BuyLink } from "@/components/BuyLink";
import { Explore } from "@/components/hub/Explore";
import type { Copy } from "@/content/copy";
import { packages } from "@/content/packages";
import type { Locale } from "@/lib/site";

function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export function CommercialHub({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";
  const tabs = [
    { id: "products", label: isRu ? "Продукты" : "Products" },
    { id: "marketing", label: isRu ? "Отдел маркетинга" : "Marketing Department" },
    { id: "production", label: isRu ? "Digital Production" : "Digital Production" },
    { id: "custom", label: isRu ? "Custom AI" : "Custom AI" },
  ] as const;
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("products");

  return (
    <div>
      <p className="mb-4 max-w-3xl text-xs text-paper/85">{t.commercial.skuNote}</p>
      <div role="tablist" aria-label={t.commercial.title} className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            id={`tab-${tab.id}`}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
              active === tab.id
                ? "border-mark/60 bg-mark/15 text-paper"
                : "border-line bg-ink-2 text-muted hover:border-line-strong"
            }`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="panel-products"
        hidden={active !== "products"}
        aria-labelledby="tab-products"
        className="mt-4"
      >
        <article className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
          <h3 className="font-display text-lg font-semibold text-paper">{t.commercial.tiers[0].name}</h3>
          <p className="mt-1 font-display text-xl font-bold text-mark">{t.commercial.tiers[0].price}</p>
          <p className="mt-2 text-xs text-muted">{t.commercial.tiers[0].body}</p>
          <ul className="mt-3 space-y-1 text-xs text-paper/85">
            <li>AIME — {t.products.items.aime.price}</li>
            <li>AI Business Assistant — {t.products.items.assistant.price}</li>
            <li>SHOWROOM AI — {t.products.items.showroom.price}</li>
          </ul>
        </article>
      </div>

      <div
        role="tabpanel"
        hidden={active !== "marketing"}
        aria-labelledby="tab-marketing"
        className="mt-4 space-y-4"
      >
        <article className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
          <h3 className="font-display text-lg font-semibold text-paper">{t.commercial.tiers[1].name}</h3>
          <p className="mt-1 font-display text-xl font-bold text-mark">{t.commercial.tiers[1].price}</p>
          <p className="mt-2 text-xs text-muted">{t.commercial.tiers[1].body}</p>
        </article>
        <article className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
          <h3 className="font-display text-lg font-semibold text-paper">{t.commercial.tiers[2].name}</h3>
          <p className="mt-1 font-display text-xl font-bold text-mark">{t.commercial.tiers[2].price}</p>
          <p className="mt-2 text-xs text-muted">{t.commercial.tiers[2].body}</p>
          <p className="mt-2 text-[11px] text-muted">
            {isRu
              ? "Опубликованные планы: Starter $1,200, Growth $2,200, Scale $3,500 в месяц. Коридор $1,500–3,500+ — тот же формат диапазоном."
              : "Published plans: Starter $1,200, Growth $2,200, Scale $3,500 per month. The $1,500–3,500+ band is the same format as a range."}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {packages.map((pkg) => {
              const item = t.packages.items[pkg.id];
              return (
                <div key={pkg.id} className="rounded-lg border border-line bg-ink-3/30 p-3">
                  <p className="font-display text-sm font-semibold text-paper">{item.name}</p>
                  <p className="mt-1 font-mono text-sm text-mark">
                    {formatUsd(pkg.priceUsd)}
                    {t.commercial.perMonth}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">{item.summary}</p>
                  <Explore summary={isRu ? "Состав" : "Includes"} className="mt-2">
                    <ul className="space-y-1">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </Explore>
                  <BuyLink
                    locale={locale}
                    skuId={pkg.id}
                    label={
                      isRu
                        ? `Оплатить ${formatUsd(pkg.priceUsd)}${t.commercial.perMonth}`
                        : `Pay ${formatUsd(pkg.priceUsd)}${t.commercial.perMonth}`
                    }
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-mark px-3 py-2 text-[11px] font-semibold text-mark-ink hover:bg-mark-light"
                  />
                  <ContactCta className="mt-1 inline-flex w-full justify-center rounded-full border border-line px-3 py-2 text-[11px] font-semibold text-paper">
                    {isRu ? "Другой скоуп — обсудить" : "Different scope — discuss"}
                  </ContactCta>
                </div>
              );
            })}
          </div>
        </article>
      </div>

      <div role="tabpanel" hidden={active !== "production"} aria-labelledby="tab-production" className="mt-4">
        <article className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
          <h3 className="font-display text-lg font-semibold text-paper">{t.commercial.tiers[3].name}</h3>
          <p className="mt-1 font-display text-xl font-bold text-mark">{t.commercial.tiers[3].price}</p>
          <p className="mt-2 text-xs text-muted">{t.commercial.tiers[3].body}</p>
          <p className="mt-2 text-xs text-muted">{t.production.items.join(" · ")}</p>
          <ContactCta className="mt-3 inline-flex rounded-full border border-line px-3 py-2 text-[11px] font-semibold text-paper">
            {isRu ? "Обсудить проект" : "Discuss Project"}
          </ContactCta>
        </article>
      </div>

      <div role="tabpanel" hidden={active !== "custom"} aria-labelledby="tab-custom" className="mt-4 grid gap-3 md:grid-cols-2">
        {t.commercial.tiers.slice(4).map((tier) => (
          <article key={tier.name} className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
            <h3 className="font-display text-lg font-semibold text-paper">{tier.name}</h3>
            <p className="mt-1 font-display text-xl font-bold text-mark">{tier.price}</p>
            <p className="mt-2 text-xs text-muted">{tier.body}</p>
            <ContactCta className="mt-3 inline-flex rounded-full border border-line px-3 py-2 text-[11px] font-semibold text-paper">
              {isRu ? "Обсудить проект" : "Discuss Project"}
            </ContactCta>
          </article>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-muted font-mono">{t.commercial.footnote}</p>
    </div>
  );
}
