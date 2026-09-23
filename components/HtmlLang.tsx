"use client";

import { useEffect } from "react";
import { isLocale, isRtlLocale, type Locale } from "@/lib/site";

export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    if (isLocale(locale)) {
      document.documentElement.dir = isRtlLocale(locale as Locale) ? "rtl" : "ltr";
    }
  }, [locale]);
  return null;
}
