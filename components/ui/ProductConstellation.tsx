"use client";

import { Parallax } from "@/components/Motion";
import { ProductUI, type ProductVariant } from "./ProductUI";

/**
 * Product shown as an object constellation rather than a single frame:
 * the desktop app, an overlapping phone screen, and a floating event card,
 * each on its own parallax layer.
 */

function PhoneMock() {
  return (
    <div className="float-soft overflow-hidden rounded-[1.6rem] border border-line bg-ink-2 p-1.5 shadow-xl">
      <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-3/40">
        <span className="absolute left-1/2 top-1 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/25" />
        <div className="px-3 pb-3 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-warm">WhatsApp</span>
            <span className="flex items-center gap-1 font-mono text-[8px] text-mark">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI 24/7
            </span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="max-w-[85%] rounded-lg rounded-tl-sm border border-line/70 bg-ink-2 px-2 py-1.5 text-[9px] text-paper/85">
              Есть в наличии?
            </div>
            <div className="ml-auto max-w-[88%] rounded-lg rounded-tr-sm bg-mark/12 px-2 py-1.5 text-[9px] text-paper">
              Да — отгрузка 5 дней, КП сформировано.
              <span className="caret ml-0.5 inline-block h-2.5 w-[2px] translate-y-0.5 bg-mark align-middle" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-full border border-line/70 bg-ink-2 px-2 py-1">
            <span className="font-mono text-[8px] text-muted">передать менеджеру</span>
            <span className="font-mono text-[8px] text-mark">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatCard() {
  return (
    <div className="float-slow rounded-xl border border-line bg-ink-2/95 p-3 shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-mark text-[9px] font-bold text-mark-ink">
          ✓
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[9px] font-semibold text-paper">Telegram · approved</p>
          <p className="font-mono text-[8px] text-muted">пост опубликован в Meta</p>
        </div>
      </div>
      <div className="mt-2.5 space-y-1">
        <span className="block h-1.5 w-3/4 rounded bg-ink-3" />
        <span className="block h-1.5 w-1/2 rounded bg-ink-3" />
      </div>
    </div>
  );
}

export function ProductConstellation({
  variant,
  showPhone = true,
  showCard = true,
}: {
  variant: ProductVariant;
  showPhone?: boolean;
  showCard?: boolean;
}) {
  return (
    <div className="relative">
      <ProductUI variant={variant} />

      {showPhone ? (
        <Parallax
          speed={-0.07}
          className="absolute -bottom-10 -left-6 z-10 hidden w-[30%] max-w-[190px] sm:block"
        >
          <PhoneMock />
        </Parallax>
      ) : null}

      {showCard ? (
        <Parallax
          speed={0.09}
          className="absolute -right-5 top-10 z-10 hidden w-[46%] max-w-[230px] lg:block"
        >
          <FloatCard />
        </Parallax>
      ) : null}
    </div>
  );
}
