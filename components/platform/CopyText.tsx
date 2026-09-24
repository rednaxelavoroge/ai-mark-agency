"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fieldClass, secondaryButtonClass } from "@/components/ui/classes";

export function CopyText({
  label,
  value,
  copiedLabel,
  copyLabel,
}: {
  label: string;
  value: string;
  copiedLabel: string;
  copyLabel: string;
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
    <div className="grid gap-2">
      <span className="text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </span>
      <textarea
        readOnly
        value={value}
        rows={4}
        onFocus={(event) => event.currentTarget.select()}
        className={`font-mono text-[11px] leading-relaxed ${fieldClass}`}
      />
      <button type="button" onClick={copy} className={`w-fit ${secondaryButtonClass}`}>
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
