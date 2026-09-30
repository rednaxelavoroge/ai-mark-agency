"use client";

import { useRef } from "react";
import { setCabinetLanguage } from "@/app/partner/language/actions";
import { LOCALES_INFO, site, type Locale } from "@/lib/site";

/** Compact language picker for the partner/admin cabinet; submits on change. */
export function CabinetLanguageSelect({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={setCabinetLanguage}>
      <label className="sr-only" htmlFor="cabinet-language">
        {label}
      </label>
      <select
        id="cabinet-language"
        name="locale"
        defaultValue={locale}
        aria-label={label}
        onChange={() => formRef.current?.requestSubmit()}
        className="h-9 rounded-full border border-line bg-ink px-2.5 text-xs text-paper"
      >
        {site.locales.map((code) => (
          <option key={code} value={code}>
            {LOCALES_INFO[code as Locale].flag} {LOCALES_INFO[code as Locale].name}
          </option>
        ))}
      </select>
    </form>
  );
}
