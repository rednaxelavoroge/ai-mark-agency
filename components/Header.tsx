"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/content/copy";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactCta } from "@/components/ContactCta";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { navHref, type Locale } from "@/lib/site";

export function Header({ locale, t }: { locale: Locale; t: Copy }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-line bg-ink/95 shadow-[0_8px_28px_#14291f0f]"
          : "border-line/70 bg-ink/80"
      }`}
    >
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1280px] items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <Link
          href={navHref(locale, "/")}
          className="flex min-w-0 shrink-0 flex-col items-start py-2"
        >
          <BrandLogo className="h-[18px] min-[400px]:h-6 sm:h-7" />
          <span className="mt-1 max-w-[7.25rem] text-[12px] font-semibold leading-tight tracking-[0.01em] text-muted min-[400px]:max-w-none min-[400px]:leading-none">
            Venture and Marketing
          </span>
        </Link>

        <nav className="ml-auto hidden min-w-0 items-center justify-end gap-x-3 text-[13px] font-medium text-muted min-[1280px]:flex xl:gap-x-4">
          {t.nav.items.map((item) =>
            item.href === "#contact" ? (
              <ContactCta
                key={item.href + item.label}
                className="whitespace-nowrap py-2 transition-colors hover:text-paper"
              >
                {item.label}
              </ContactCta>
            ) : (
              <Link
                key={item.href + item.label}
                href={navHref(locale, item.href)}
                className="whitespace-nowrap py-2 transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 min-[1280px]:ml-3 sm:gap-2">
          <ThemeToggle lightLabel={t.nav.themeLight} darkLabel={t.nav.themeDark} />
          <LanguageSelector locale={locale} />
          <ContactCta className="inline-flex h-9 items-center rounded-full bg-mark px-2.5 text-sm font-semibold text-mark-ink min-[400px]:h-11 min-[400px]:px-4">
            <span className="max-[399px]:sr-only">{t.nav.cta}</span>
            <span className="min-[400px]:hidden" aria-hidden>
              →
            </span>
          </ContactCta>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-paper min-[400px]:h-11 min-[400px]:w-11 min-[1280px]:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
              <span className={`block h-[1.5px] bg-current transition ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] bg-current transition ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-ink px-4 py-3 min-[1280px]:hidden">
          <ul className="mx-auto grid w-full max-w-[1280px] gap-1 text-[15px]">
            {t.nav.items.map((item) => (
              <li key={item.href + item.label}>
                {item.href === "#contact" ? (
                  <ContactCta
                    className="block w-full rounded-xl px-2 py-3 text-start hover:bg-ink-3"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </ContactCta>
                ) : (
                  <Link
                    href={navHref(locale, item.href)}
                    className="block rounded-xl px-2 py-3 hover:bg-ink-3"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
