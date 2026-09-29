"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { navHref, type Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";
import { brief } from "@/lib/brief";

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
 * illustration, and three pillars. The old stage explorer is not part of
 * that structure.
 */
export function HeroSystem({ locale, t }: HeroProps) {
  const isRu = locale === "ru";
  const isEn = locale === "en";

  const lede = isRu
    ? "AI MARK объединяет исследование рынка, цифровые продукты, AI-инфраструктуру и маркетинг — от первой гипотезы до запуска и роста."
    : isEn
      ? "AI MARK brings market research, digital products, AI infrastructure and marketing into one operating path — from a first hypothesis to launch and growth."
      : brief(t.hero.lead);
  const primary = isRu ? "Выбрать точку входа" : isEn ? "Find your starting point" : t.hero.primaryCta;
  const secondary = isRu ? "Как устроен процесс" : isEn ? "See how it works" : t.hero.secondaryCta;
  const footnote = isRu
    ? "Единая система работы вместо набора разрозненных подрядчиков."
    : isEn
      ? "One connected system — not a bundle of disconnected vendors."
      : brief(t.hero.soft || t.hero.extra);
  const pillarsLabel = isRu ? "В единой системе" : isEn ? "The work moves across" : brief(t.pillars.eyebrow);
  const pillars = isRu
    ? ["Рынок и модель", "Цифровой продукт", "AI и рост"]
    : isEn
      ? ["Market & model", "Digital product", "AI & growth"]
      : t.pillars.items.slice(0, 3).map((item) => item.title);
  const captionKicker = isRu ? "РАБОЧИЙ КОНТУР" : "THE OPERATING LOOP";
  const caption = isRu
    ? "Исследовать, создать, согласовать, запустить — и продолжать учиться."
    : isEn
      ? "Research, build, approve, launch — then keep learning."
      : brief(t.hero.lead);

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
            <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[#c5d0c4]">{footnote}</p>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art">
              <Image
                src="/brand/ai-mark-hero.webp"
                alt={isRu ? "Изумрудные стеклянные формы, соединённые световыми линиями" : "Emerald glass forms linked by lines of light"}
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 640px"
                className="hero-art-img"
              />
            </div>
            <div className="hero-ring am-anim" aria-hidden />
            <div className="absolute bottom-4 left-4 right-4 z-[3] rounded-2xl border border-white/30 bg-[#193428]/90 p-3 text-[13px] text-[#e7eee4]">
              <p className="font-semibold text-[var(--lime)]">{captionKicker}</p>
              <p className="mt-1 leading-snug">{caption}</p>
            </div>
          </div>
        </div>

        <div className="relative z-[1] mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 py-4 text-sm text-[#d5e0d4]">
          <span className="font-semibold text-white">{pillarsLabel}</span>
          {pillars.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
