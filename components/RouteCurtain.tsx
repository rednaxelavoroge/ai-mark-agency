"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-change curtain.
 *
 * Mounted as a sibling of the page (never as a wrapper) so the transform it
 * animates can never create a containing block for the sticky narrative scene.
 *
 * The previous pathname is tracked explicitly rather than with a "have I run
 * yet" flag: React StrictMode invokes effects twice on mount, and a boolean
 * guard would let the second invocation fire a wipe for a navigation the
 * visitor never made.
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (previous.current === null || previous.current === pathname) {
      previous.current = pathname;
      return;
    }
    previous.current = pathname;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.remove("is-wiping");
    // force reflow so the keyframes restart on back-to-back navigations
    void el.offsetWidth;
    el.classList.add("is-wiping");
    const done = () => el.classList.remove("is-wiping");
    el.addEventListener("animationend", done, { once: true });
    return () => el.removeEventListener("animationend", done);
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden className="route-curtain">
      <span className="route-curtain-mark">AI Mark</span>
    </div>
  );
}
