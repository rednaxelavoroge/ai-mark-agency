"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";
import { getHeroDemoCopy } from "@/content/hero-demo";

/**
 * Home hero product animation. Replaces the abstract hero art with the
 * product doing its job: a customer writes, the Seller answers and books the
 * order, then the Marketer's follow-up tasks appear one by one.
 *
 * Plain React state + CSS transitions, no video and no animation library.
 * Server render (and reduced motion) shows the finished scene, so the frame
 * is complete without JS; on the client it holds that frame briefly, then
 * replays from the first message and pauses while the tab is hidden or the hero is offscreen.
 */

// Step at which each element becomes visible, and the delay before the next step (ms).
const TIMELINE = [700, 1600, 1500, 1500, 1300, 900, 900, 900, 4200] as const;
const FINAL = TIMELINE.length - 1;
// 0 empty · 1 client · 2 typing · 3 seller · 4 client2 · 5 booked · 6–8 tasks

export function HeroProductDemo({ locale }: { locale: Locale }) {
  const c = getHeroDemoCopy(locale);
  const [step, setStep] = useState<number>(FINAL);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Start from the finished frame, then replay from the first message.
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
  }, []);

  const on = (n: number) => (step >= n ? "hd-on" : "");

  return (
    <div ref={host} className="hd" role="img" aria-label={c.label}>
      <div className="hd-card" aria-hidden>
        <div className="hd-head">
          <span className="hd-avatar">AI</span>
          <span className="hd-title">{c.chatTitle}</span>
          <span className="hd-online">● {c.online}</span>
        </div>
        <div className="hd-chat">
          <p className={`hd-msg hd-client ${on(1)}`}>{c.client1}</p>
          <p className={`hd-msg hd-seller hd-typing ${step === 2 ? "hd-on" : "hd-gone"}`}>
            <span /> <span /> <span />
          </p>
          <p className={`hd-msg hd-seller ${on(3)} ${step < 3 ? "hd-gone" : ""}`}>{c.seller1}</p>
          <p className={`hd-msg hd-client ${on(4)}`}>{c.client2}</p>
          <div className={`hd-booked ${on(5)}`}>
            <span className="hd-check">✓</span>
            <span>
              <strong>{c.bookedTitle}</strong>
              <small>{c.bookedDetail}</small>
            </span>
          </div>
        </div>
      </div>
      <div className={`hd-card hd-tasks ${on(6)}`} aria-hidden>
        <p className="hd-title hd-tasks-title">{c.marketerTitle}</p>
        <ul>
          {c.tasks.map((task, i) => (
            <li key={task} className={on(6 + i)}>
              <span className="hd-box">{step >= 6 + i ? "✓" : ""}</span>
              <span className="hd-task">{task}</span>
              <span className="hd-status">{c.taskStatus[i]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
