"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { navHref, type Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";
import { getPublicChromeCopy } from "@/content/sections";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { ShowroomDemoChatButton } from "@/components/products/ShowroomDemoChat";
import { SHOWROOM_AI_SETUP_FEE_USD, SHOWROOM_AI_TRIAL_DAYS } from "@/lib/showroom-ai";
import { formatUsdPrice } from "@/lib/pricing/crypto-checkout";
import { brief } from "@/lib/brief";
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
export function HeroSystem({ locale, t }: HeroProps) {
  const hero = getPublicChromeCopy(locale).heroExtra;
  const showroom = getShowroomAiCopy(locale);
  const lede = hero.lede || brief(t.hero.lead);
  const primary = hero.primaryCta || t.hero.primaryCta;
  const secondary = hero.secondaryCta || t.hero.secondaryCta;
  const footnote = hero.footnote || brief(t.hero.soft || t.hero.extra);
  const pillarsLabel = hero.pillarsLabel || brief(t.pillars.eyebrow);
  const pillars =
    hero.pillars.length > 0
      ? hero.pillars
      : t.pillars.items.slice(0, 3).map((item) => item.title);

  return (
    <section className="am-hero" data-motion>
      <HeroCursor />
      <div className="am-wrap">
        <div className="am-hero-grid">
          <div className="relative z-[2] py-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">
              {t.hero.eyebrow}
            </p>
            <h1 className="am-display" data-reveal>
              {t.hero.title}
            </h1>
            <p className="lede mt-4 max-w-xl">{lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#start"
                className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--lime)] px-5 text-sm font-semibold text-[#14291f]"
              >
                {primary} ↓
              </a>
              <Link
                href={navHref(locale, "/how-it-works")}
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white"
              >
                {secondary} →
              </Link>
            </div>
            {/*
              First screen is the Seller role: «не просто ответит, а продаст»,
              with the live demo chat one tap away and the trial terms spelled
              out. The live widget is the same one the contact launcher mounts
              (`ContactLauncher`), so this band only dispatches the open-chat
              event with a Showroom opening line. The trial length and the setup
              fee are interpolated from the constants, never typed here.
            */}
            {/* Kept compact on phones so the demo-chat button stays inside the
                first screen; the longer lead returns from `sm` up. */}
            <div className="mt-5 max-w-xl rounded-2xl border border-white/25 bg-[#193428]/85 p-4 sm:mt-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--lime)]">
                {showroom.heroKicker}
              </p>
              <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {showroom.mantra}
              </p>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#c5d0c4] sm:line-clamp-none">
                {showroom.mantraLead}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-3">
                <ShowroomDemoChatButton
                  locale={locale}
                  className="inline-flex min-h-11 items-center rounded-full bg-[var(--lime)] px-5 text-sm font-semibold text-[#14291f] transition-opacity hover:opacity-90"
                />
                <span className="font-mono text-[11px] text-[#c5d0c4]">
                  {showroom.heroTrialNote.replace("{days}", String(SHOWROOM_AI_TRIAL_DAYS))}
                  {" · "}
                  {showroom.heroSetupNote.replace(
                    "{fee}",
                    formatUsdPrice(SHOWROOM_AI_SETUP_FEE_USD),
                  )}
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[#c5d0c4]">{footnote}</p>
          </div>

          <div className="hero-demo-wrap relative z-[2] flex items-center py-2">
            <HeroProductDemo locale={locale} />
          </div>
        </div>

        <div className="relative z-[1] mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 py-4 pr-16 text-sm text-[#d5e0d4] min-[761px]:pr-0">
          <span className="font-semibold text-white">{pillarsLabel}</span>
          {pillars.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
