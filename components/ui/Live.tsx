"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` once the element scrolls into view. */
export function LiveNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const formatted = Number(display.toFixed(decimals)).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/** Types a string once, when it becomes visible. */
export function LiveType({
  text,
  speed = 26,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setN(text.length));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / (text.length * speed));
      setN(Math.round(text.length * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, n)}
    </span>
  );
}

/** Small status dot with an expanding ring. */
export function LiveDot({ tone = "mark" }: { tone?: "mark" | "warm" | "emerald" }) {
  const map = { mark: "bg-mark text-mark", warm: "bg-warm text-warm", emerald: "bg-emerald-500 text-emerald-500" } as const;
  return (
    <span className={`relative inline-block h-1.5 w-1.5 shrink-0 rounded-full ${map[tone]} pulse-ring`} />
  );
}
