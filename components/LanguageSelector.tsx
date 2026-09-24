"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  LOCALES_INFO,
  counterpartLocaleHref,
  site,
  type Locale,
} from "@/lib/site";

const emptySubscribe = () => () => {};

function persistLocale(code: Locale) {
  if (typeof document !== "undefined") {
    try {
      document.cookie = `locale=${code}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore in restricted environments
    }
  }
}

export function LanguageSelector({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  /**
   * Height of the mobile sheet, px.
   *
   * Measured rather than expressed in `vh` units: `100vh`/`100dvh` track the
   * LARGE viewport once the browser's URL bar auto-hides, which parked the last
   * language under the browser UI, while `100svh` is unsupported on older
   * engines. `window.innerHeight` is the area actually available on every
   * engine, and re-measuring on resize/orientation keeps it honest. Falls back
   * to the `100svh`/`100vh` cascade before the first measurement lands.
   */
  const [sheetHeight, setSheetHeight] = useState<number | null>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const currentMeta = LOCALES_INFO[locale] || LOCALES_INFO.en;
  const allLocales = site.locales.map((code) => LOCALES_INFO[code]);

  const filteredLocales = search.trim()
    ? allLocales.filter((item) => {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q)
        );
      })
    : allLocales;

  const handleSelectLocale = (targetCode: Locale) => {
    persistLocale(targetCode);
    setOpen(false);
  };

  // Close on outside click for desktop popover & mobile drawer backdrop
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;
      if (modalRef.current && modalRef.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Close on Escape & focus search
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Measure the sheet height before paint, then keep it in step with the
  // viewport as the browser chrome or the on-screen keyboard opens and closes.
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const measure = () => setSheetHeight(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [open]);

  // Lock body scroll on mobile when sheet is open, and publish the overlay flag
  // so overlays we do not own (the hosted AI widget paints at z-index
  // 2147483000 from a sibling <body> subtree) can stand down while we cover the
  // screen. ContactLauncher observes this attribute.
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const root = document.documentElement;
    const isMobile = window.innerWidth < 640;
    const originalStyle = document.body.style.overflow;
    if (isMobile) {
      document.body.style.overflow = "hidden";
      root.setAttribute("data-overlay-open", "true");
    }
    return () => {
      document.body.style.overflow = originalStyle;
      root.removeAttribute("data-overlay-open");
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={(event) => {
          setOpen((v) => !v);
          setSearch("");
          // The sheet takes focus on phones; drop the button's own ring so the
          // open panel is the only focus affordance on screen.
          event.currentTarget.blur();
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Current language: ${currentMeta.name}. Change language`}
        className="flex h-7.5 items-center gap-1 rounded-full border border-line bg-paper/5 px-2 text-xs font-medium text-paper transition-all hover:border-paper/40 hover:bg-paper/10 sm:h-8 sm:px-2.5 sm:gap-1.5 cursor-pointer"
      >
        <span className="text-xs leading-none" aria-hidden>
          {currentMeta.flag}
        </span>
        <span className="font-mono uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
          {currentMeta.code}
        </span>
        <svg
          className={`h-3 w-3 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Desktop Popover Menu (hidden on mobile, sm:block) */}
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 hidden w-72 origin-top-right rounded-2xl border border-line bg-ink-2 p-2 shadow-2xl sm:block animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-line px-3 pb-2 pt-1 text-[11px] font-mono tracking-wider text-muted uppercase">
            <span>Select language</span>
            <span>{allLocales.length} languages</span>
          </div>

          {/* Quick Search */}
          <div className="p-1.5">
            <div className="relative">
              <input
                ref={searchInputRef}
                id={searchId}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-line bg-ink-3 px-2.5 py-1.5 text-xs text-paper placeholder-muted outline-none transition-colors focus:border-mark"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-paper"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>
          </div>

          {/* Locale List */}
          <div className="max-h-72 overflow-y-auto p-1 space-y-0.5 overscroll-contain">
            {filteredLocales.length === 0 ? (
              <p className="p-3 text-center text-xs text-muted">
                No language found
              </p>
            ) : (
              filteredLocales.map((item) => {
                const isActive = item.code === locale;
                return (
                  <Link
                    key={item.code}
                    href={counterpartLocaleHref(pathname, item.code)}
                    hrefLang={item.code}
                    onClick={() => handleSelectLocale(item.code)}
                    className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors ${
                      isActive
                        ? "bg-mark/15 font-semibold text-mark-light"
                        : "text-muted hover:bg-paper/8 hover:text-paper"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none" aria-hidden>
                        {item.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-paper font-medium">{item.name}</span>
                        <span className="text-[10px] text-muted leading-tight">
                          {item.region}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <span
                        className="text-mark-light font-bold"
                        aria-hidden
                      >
                        ✓
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase opacity-50">
                        {item.code}
                      </span>
                    )}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      ) : null}

      {/* Mobile Language Sheet rendered via Portal into document.body.
          Full height, hanging from the TOP edge where its trigger lives: on a
          phone this is a switch, not a task sheet, so it claims the whole
          screen rather than making the reader scroll a half-height drawer.

          The height is `100svh` — the SMALL viewport, i.e. the area left with
          the browser's own chrome on screen. `100dvh` grows to the full height
          as soon as the URL bar auto-hides, which parked the last language
          under the browser bar where it could be neither seen nor tapped.

          The list is a real scroll container (`min-h-0`, `touch-action: pan-y`,
          `overscroll-contain`): today's 12 languages end with breathing room on
          a typical phone, and the list keeps scrolling normally as more are
          added. The panel also respects the device safe areas. */}
      {mounted && open
        ? createPortal(
            <div className="sm:hidden fixed inset-0 z-[999999]">
              {/* Backdrop overlay */}
              <div
                className="am-fade fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                aria-hidden
              />

              {/* Full-height Top Panel */}
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Choose Language"
                // Height is set inline on purpose. `100dvh` tracks the LARGE
                // viewport once the URL bar auto-hides, which parks the last
                // language under the browser UI; `100svh` is the small one and
                // is what we want. It cannot be a Tailwind class because the
                // `dvh` fallback must come FIRST in source order, and only an
                // inline declaration is guaranteed to do that.
                style={{
                  height: sheetHeight ? `${sheetHeight}px` : "100svh",
                  maxHeight: "100vh",
                }}
                className="am-drop fixed inset-x-0 top-0 z-10 flex flex-col border-b border-line bg-ink px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl"
              >
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-line px-1 pb-2.5">
                  <div>
                    <h3 className="text-base font-semibold text-paper">
                      Language / Язык
                    </h3>
                    <p className="text-xs text-muted">
                      Choose your language ({allLocales.length} available)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 cursor-pointer"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Search Input for Mobile */}
                <div className="py-2.5">
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search language..."
                      className="w-full rounded-xl border border-line bg-ink-2 px-3 py-2 text-sm text-paper placeholder-muted outline-none focus:border-mark"
                    />
                    {search ? (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted hover:text-paper cursor-pointer"
                        aria-label="Clear"
                      >
                        ✕
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Scrollable Language List — sized so all 12 languages fit a
                    typical phone screen without scrolling; the scroll area is
                    still there for short screens and the on-screen keyboard. */}
                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-px py-1 pb-2 pr-1 min-[380px]:space-y-0.5"
                  style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
                >
                  {filteredLocales.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted">
                      No language found
                    </p>
                  ) : (
                    filteredLocales.map((item) => {
                      const isActive = item.code === locale;
                      return (
                        <Link
                          key={item.code}
                          href={counterpartLocaleHref(pathname, item.code)}
                          hrefLang={item.code}
                          onClick={() => handleSelectLocale(item.code)}
                          className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-mark/15 font-semibold text-mark-light border border-mark/30"
                              : "text-paper hover:bg-paper/8 active:bg-paper/12"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xl leading-none min-[380px]:text-2xl"
                              aria-hidden
                            >
                              {item.flag}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[15px] font-semibold text-paper min-[380px]:text-base">
                                {item.name}
                              </span>
                              <span className="text-[11px] leading-tight text-muted min-[380px]:text-xs">
                                {item.region}
                              </span>
                            </div>
                          </div>
                          {isActive ? (
                            <span
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-mark text-mark-ink font-bold text-xs"
                              aria-hidden
                            >
                              ✓
                            </span>
                          ) : (
                            <span className="font-mono text-xs uppercase text-muted">
                              {item.code}
                            </span>
                          )}
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
