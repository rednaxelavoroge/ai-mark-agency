"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCabinetCopy } from "@/components/platform/CabinetCopyProvider";
import { fieldClass, primaryButtonClass } from "@/components/ui/classes";

type CopyState = "idle" | "copied" | "failed";

export function CopyReferralLink({ url }: { url: string }) {
  const copy = useCabinetCopy();
  const strings = copy.copyReferralLink;
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const onCopy = useCallback(async () => {
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
        <span className="text-sm text-muted">{strings.label}</span>
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
          onClick={onCopy}
          className={`w-full sm:w-auto ${primaryButtonClass}`}
        >
          {state === "copied" ? strings.copied : strings.copy}
        </button>

        <p role="status" aria-live="polite" className="text-xs text-muted">
          {state === "copied" ? strings.copiedStatus : null}
          {state === "failed" ? strings.failedStatus : null}
        </p>
      </div>

      <p className="text-[11px] leading-relaxed text-muted">{strings.hint}</p>
    </div>
  );
}
