"use client";

import { useEffect } from "react";

/**
 * Registers the partner service worker. Scope stays under `/partner/` so the
 * public site is not controlled. Authenticated HTML is never cached.
 */
export function PartnerPwa() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/partner/sw.js", { scope: "/partner/" }).catch(() => {
      // Install is optional. A failed registration must not block the cabinet.
    });
  }, []);

  return null;
}
