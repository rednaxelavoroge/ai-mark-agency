"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";
import {
  getSellerHeroCopy,
  type SellerHeroPlan,
} from "@/content/seller-hero-demo";

/**
 * Seller page hero chat animation. Same motion pattern as HeroProductDemo
 * on the home page: messages type in, the Seller answers, the sale closes.
 * Start vs Pro toggles the scene (order close vs multi-channel booking).
 * Reuses the shared `.hd-*` styles from globals.css.
 */

const TIMELINE = [700, 1600, 1500, 1500, 1300, 2800] as const;
const FINAL = TIMELINE.length - 1;
// 0 empty · 1 client · 2 typing · 3 seller · 4 client2 · 5 booked

export function SellerHeroDemo({ locale }: { locale: Locale }) {
  const copy = getSellerHeroCopy(locale);
  const [plan, setPlan] = useState<SellerHeroPlan>("start");
  const scene = copy[plan];
  const [step, setStep] = useState<number>(FINAL);
  const host = useRef<HTMLDivElement>(null);
  const planRef = useRef(plan);

  useEffect(() => {
    planRef.current = plan;
  }, [plan]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.requestAnimationFrame(() => setStep(FINAL));
      return () => window.cancelAnimationFrame(id);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current: number = FINAL;
    let visible = true;
    const run = () => {
      clearTimeout(timer);
      if (!visible || document.hidden) return;
      timer = setTimeout(() => {
        current = current >= FINAL ? 0 : current + 1;
        setStep(current);
        run();
      }, TIMELINE[current]);
    };
    current = FINAL;
    window.requestAnimationFrame(() => setStep(FINAL));
    run();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    if (host.current) io.observe(host.current);
    const onVis = () => run();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [plan]);

  const on = (n: number) => (step >= n ? "hd-on" : "");

  const switchPlan = (next: SellerHeroPlan) => {
    if (next === planRef.current) return;
    setPlan(next);
  };

  return (
    <div className="seller-hero-demo w-full">
      <div
        className="mb-3 flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Start / Pro"
      >
        {(["start", "pro"] as const).map((id) => {
          const active = plan === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchPlan(id)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? "bg-mark text-mark-ink shadow-sm"
                  : "border border-line bg-ink-2 text-muted hover:text-paper"
              }`}
            >
              {id === "start" ? copy.startTab : copy.proTab}
            </button>
          );
        })}
      </div>

      <div ref={host} className="hd mx-0" role="img" aria-label={scene.label}>
        <div className="hd-card" aria-hidden>
          <div className="hd-head">
            <span className="hd-avatar">AI</span>
            <span className="hd-title">{scene.chatTitle}</span>
            <span className="hd-online">● {scene.online}</span>
          </div>
          <div className="hd-chat">
            <p className={`hd-msg hd-client ${on(1)}`}>{scene.client1}</p>
            <p
              className={`hd-msg hd-seller hd-typing ${
                step === 2 ? "hd-on" : "hd-gone"
              }`}
            >
              <span /> <span /> <span />
            </p>
            <p
              className={`hd-msg hd-seller ${on(3)} ${
                step < 3 ? "hd-gone" : ""
              }`}
            >
              {scene.seller1}
            </p>
            <p className={`hd-msg hd-client ${on(4)}`}>{scene.client2}</p>
            <div className={`hd-booked ${on(5)}`}>
              <span className="hd-check">✓</span>
              <span>
                <strong>{scene.bookedTitle}</strong>
                <small>{scene.bookedDetail}</small>
              </span>
            </div>
          </div>
        </div>

        {plan === "pro" && scene.channels ? (
          <div className={`hd-card hd-tasks ${on(5)}`} aria-hidden>
            <p className="hd-title hd-tasks-title">{copy.channelBand}</p>
            <ul>
              {scene.channels.map((ch) => (
                <li key={ch} className="hd-on">
                  <span className="hd-box">✓</span>
                  <span className="hd-task">{ch}</span>
                  <span className="hd-status">●</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
