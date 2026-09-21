"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/content/copy";
import { ThemeToggle } from "@/components/ThemeToggle";
import { counterpartLocaleHref, navHref, type Locale } from "@/lib/site";

export function Header({ locale, t }: { locale: Locale; t: Copy }) {
  const pathname = usePathname() || "/";
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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={navHref(locale, "/")} className="flex min-w-0 items-center gap-2.5 group">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-mark font-display text-xs font-bold text-mark-ink transition-transform group-hover:scale-105">
            AM
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-sm font-semibold tracking-tight text-paper">
              AI Mark
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-wider text-warm uppercase">
              Venture &amp; Marketing
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-3 text-xs text-muted xl:flex">
          {t.nav.items.map((item) => (
            <Link
              key={item.href + item.label}
              href={navHref(locale, item.href)}
              className="link-underline whitespace-nowrap transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle lightLabel={t.nav.themeLight} darkLabel={t.nav.themeDark} />
          <div className="flex overflow-hidden rounded-full border border-line text-xs">
            <Link
              href={counterpartLocaleHref(pathname, "en")}
              hrefLang="en"
              className={`px-2.5 py-1 ${
                locale === "en" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {t.nav.langEn}
            </Link>
            <Link
              href={counterpartLocaleHref(pathname, "ru")}
              hrefLang="ru"
              className={`px-2.5 py-1 ${
                locale === "ru" ? "bg-paper text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {t.nav.langRu}
            </Link>
          </div>
          <Link
            href={navHref(locale, "#contact")}
            className="hidden rounded-full bg-mark px-3 py-1.5 text-xs font-semibold text-mark-ink sm:inline-flex sm:px-4 sm:text-sm"
          >
            {t.nav.cta}
          </Link>
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
                <Link
                  href={navHref(locale, item.href)}
                  className="block rounded-lg px-2 py-2 hover:bg-ink-3"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={navHref(locale, "#contact")}
                className="mt-2 block rounded-full bg-mark px-4 py-2.5 text-center text-sm font-semibold text-mark-ink"
                onClick={() => setOpen(false)}
              >
                {t.nav.cta}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
