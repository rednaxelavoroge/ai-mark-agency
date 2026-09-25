"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fieldClass, secondaryButtonClass } from "@/components/ui/classes";

export function CopyLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <input
          readOnly
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          className={`font-mono text-xs ${fieldClass}`}
        />
        <button type="button" onClick={copy} className={secondaryButtonClass}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </label>
  );
}
