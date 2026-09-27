"use client";

import Link from "next/link";
import { navHref, type Locale } from "@/lib/site";

interface BackButtonProps {
  locale: Locale;
  targetHref?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  locale,
  targetHref = "/",
  label,
  className = "",
}: BackButtonProps) {
  const isRu = locale === "ru";
  const defaultLabel = isRu ? "Вернуться на главную" : "Back to Home";
  const text = label || defaultLabel;

  return (
    <Link
      href={navHref(locale, targetHref)}
      className={`group inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/90 px-4 py-2 text-xs font-medium text-paper shadow-sm backdrop-blur-md transition-all hover:-translate-x-0.5 hover:border-mark/50 hover:bg-ink-3 hover:text-mark active:scale-95 ${className}`}
    >
      <span className="text-mark transition-transform group-hover:-translate-x-1">
        ←
      </span>
      <span>{text}</span>
    </Link>
  );
}
