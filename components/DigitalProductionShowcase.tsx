"use client";

import { useMemo, useState } from "react";
import { ContactCta } from "@/components/ContactCta";
import { getPublicChromeCopy } from "@/content/sections";
import { type Locale } from "@/lib/site";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";

const MOCK_BY_ID: Record<string, ProductVariant> = {
  saas: "saas",
  portals: "portal",
  ecommerce: "ecommerce",
  "ai-engines": "ai",
};

export function DigitalProductionShowcase({ locale }: { locale: Locale }) {
  const chrome = getPublicChromeCopy(locale).digitalProductionShowcase;
  const categories = useMemo(
    () =>
      chrome.categories.map((cat) => ({
        ...cat,
        mock: MOCK_BY_ID[cat.id] ?? ("saas" as ProductVariant),
      })),
    [chrome.categories],
  );
  const [activeCategory, setActiveCategory] = useState(0);
  const current = categories[activeCategory];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(i)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              activeCategory === i
                ? "bg-mark text-mark-ink shadow-sm"
                : "border border-line bg-ink-2 text-muted hover:border-paper/30 hover:text-paper"
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase ${
                activeCategory === i ? "bg-mark-ink/20 text-mark-ink" : "bg-ink-3 text-muted"
              }`}
            >
              {cat.badge}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-lg">
        <div className="flex items-center justify-between border-b border-line bg-ink-3/50 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-mono text-[11px] text-muted truncate max-w-[200px] sm:max-w-none">
              ai-mark.production // {current.id}
            </span>
          </div>
          <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
            {chrome.digitalCore}
          </span>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="font-mono text-xs font-semibold tracking-wider text-mark uppercase">
              {current.badge} · {current.name}
            </span>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-paper leading-tight">
              {current.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{current.desc}</p>

            <div className="mt-6 space-y-2">
              <p className="font-mono text-[11px] font-semibold text-warm uppercase tracking-wider">
                {chrome.engineeringStandards}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {current.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 rounded-lg border border-line/70 bg-ink-3/40 px-3 py-2 text-xs font-mono text-paper"
                  >
                    <span className="text-mark font-bold">✓</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink hover:bg-mark-light transition-all shadow">
                {chrome.requestEstimate}
              </ContactCta>
            </div>
          </div>

          <div data-reveal="scale">
            <ProductUI
              variant={current.mock}
              ratio="h-[380px] sm:h-[390px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
