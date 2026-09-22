"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fieldClass, primaryButtonClass } from "@/components/ui/classes";

type CopyState = "idle" | "copied" | "failed";

/**
 * Shows the partner's referral link and copies it to the clipboard.
 *
 * The link is real: `/go/<code>` resolves server-side, records the click and
 * attributes a lead or a new partner to this code. Everything the visitor
 * carries is a signed, HTTP-only first-party cookie — the URL itself only ever
 * contains the public referral code.
 */
export function CopyReferralLink({ url }: { url: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      // Fallback for non-secure contexts (plain http) and older browsers.
      try {
        const area = document.createElement("textarea");
        area.value = url;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.top = "-1000px";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        copied = document.execCommand("copy");
        document.body.removeChild(area);
      } catch {
        copied = false;
      }
    }

    setState(copied ? "copied" : "failed");

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  }, [url]);

  return (
    <div className="grid gap-3">
      <label className="grid gap-1.5" htmlFor="referral-link">
        <span className="text-sm text-muted">Your referral link</span>
        <input
          id="referral-link"
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
          className={`font-mono text-xs ${fieldClass}`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className={`w-full sm:w-auto ${primaryButtonClass}`}
        >
          {state === "copied" ? "Copied" : "Copy referral link"}
        </button>

        <p role="status" aria-live="polite" className="text-xs text-muted">
          {state === "copied" ? "Referral link copied to your clipboard." : null}
          {state === "failed"
            ? "Copying was blocked — select the link and copy it manually."
            : null}
        </p>
      </div>

      <p className="text-[11px] leading-relaxed text-muted">
        The link is live. Every visit is recorded and attributes a customer lead
        for 30 days; a partner who signs up through it is recorded as your
        referral. Add campaign parameters (for example{" "}
        <span className="font-mono">?utm_source=newsletter</span>) to see where
        your clicks come from.
      </p>
    </div>
  );
}
