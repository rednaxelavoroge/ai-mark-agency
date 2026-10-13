"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";
import { getHomePlain } from "@/content/home-plain";
import { fillPlanTokens, planTokens } from "@/content/plain-copy";
import { ShowroomDemoChatButton } from "@/components/products/ShowroomDemoChat";
import { HeroProductDemo } from "@/components/HeroProductDemo";

function HeroCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 760px)").matches;
    if (!fine || reduce || narrow || !ref.current) return;
    const node = ref.current;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      const host = node.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      node.style.transform = `translate(${x - rect.left}px, ${y - rect.top}px)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="hero-cursor am-anim" aria-hidden />;
}

interface HeroProps {
  locale: Locale;
  t: Copy;
}

/**
 * Home hero matches the Manus sample: one lede, two actions, a still
 * product animation (chat → booking → marketer tasks), and three pillars. The old stage explorer is not part of
 * that structure.
 */
// `t` stays in the props for the page call; the hero copy now lives in content/home-plain.
export function HeroSystem({ locale }: HeroProps) {
  const home = getHomePlain(locale);
  const tokens = planTokens();

  return (
    <section className="am-hero" data-motion>
      <HeroCursor />
      <div className="am-wrap">
        <div className="am-hero-grid">
          <div className="relative z-[2] py-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">
              {home.eyebrow}
            </p>
            <h1 className="am-display" data-reveal>
              {home.title}
            </h1>
            <p className="lede mt-4 max-w-xl">{fillPlanTokens(home.lede, tokens)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#start"
                className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--lime)] px-6 text-sm font-semibold text-[#14291f]"
              >
                {fillPlanTokens(home.primaryCta, tokens)}
              </a>
              <ShowroomDemoChatButton
                locale={locale}
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              />
            </div>
            <p className="mt-4 font-mono text-[11px] text-[#c5d0c4]">{fillPlanTokens(home.note, tokens)}</p>
          </div>

          <div className="hero-demo-wrap relative z-[2] flex items-center py-2">
            <HeroProductDemo locale={locale} />
          </div>
        </div>

        <div className="relative z-[1] mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 py-4 pr-16 text-sm text-[#d5e0d4] min-[761px]:pr-0">
          {home.pillars.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="text-[var(--lime)]" aria-hidden>✓</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
