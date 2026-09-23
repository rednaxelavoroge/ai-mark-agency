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

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-line bg-ink/90 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)]"
          : "border-transparent bg-ink/70"
      }`}
    >
      {/* At 320px the row is genuinely tight, so the plate steps down to a
          20px lockup there and back up at 360px. The right-hand controls keep
          their own size: the brand plate is never squeezed into a letterboxed
          version of the artwork, and the header never overlaps itself. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href={navHref(locale, "/")}
          className="group flex min-w-0 shrink items-center"
        >
          <BrandLogo className="h-5 shrink min-[360px]:h-6 sm:h-8 lg:h-9 xl:h-10" />
        </Link>
        <nav className="hidden items-center gap-3 text-xs text-muted xl:flex">
          {t.nav.items.map((item) =>
            item.href === "#contact" ? (
              <ContactCta
                key={item.href + item.label}
                className="link-underline whitespace-nowrap text-muted transition-colors hover:text-paper"
              >
                {item.label}
              </ContactCta>
            ) : (
              <Link
                key={item.href + item.label}
                href={navHref(locale, item.href)}
                className="link-underline whitespace-nowrap transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle lightLabel={t.nav.themeLight} darkLabel={t.nav.themeDark} />
          <LanguageSelector locale={locale} />
          <ContactCta className="hidden rounded-full bg-mark px-3 py-1.5 text-xs font-semibold text-mark-ink sm:inline-flex sm:px-4 sm:text-sm">
            {t.nav.cta}
          </ContactCta>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-sm xl:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-ink px-4 py-4 xl:hidden">
          <ul className="mx-auto grid max-w-6xl gap-2 text-sm">
            {t.nav.items.map((item) => (
              <li key={item.href + item.label}>
                {item.href === "#contact" ? (
                  <ContactCta
                    className="block w-full rounded-lg px-2 py-2 text-left hover:bg-ink-3"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </ContactCta>
                ) : (
                  <Link
                    href={navHref(locale, item.href)}
                    className="block rounded-lg px-2 py-2 hover:bg-ink-3"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-2 border-t border-line flex items-center justify-between px-2">
              <span className="text-xs text-muted">Language</span>
              <LanguageSelector locale={locale} />
            </li>
            <li>
              <ContactCta
                className="mt-2 block w-full rounded-full bg-mark px-4 py-2.5 text-center text-sm font-semibold text-mark-ink"
                onClick={() => setOpen(false)}
              >
                {t.nav.cta}
              </ContactCta>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
