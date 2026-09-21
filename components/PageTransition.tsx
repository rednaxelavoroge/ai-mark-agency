"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-level entry transition. Re-triggers a short opacity fade whenever the
 * pathname changes. Opacity-only (no transform) so it never creates a
 * containing block that would break `position: sticky` descendants.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("page-in");
    // force reflow so the animation restarts on subsequent navigations
    void el.offsetWidth;
    el.classList.add("page-in");
  }, [pathname]);

  return (
    <div ref={ref} className="page-in">
      {children}
    </div>
  );
}
