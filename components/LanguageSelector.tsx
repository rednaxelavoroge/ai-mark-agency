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
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close on outside click for desktop popover
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Lock body scroll on mobile when sheet is open
  useEffect(() => {
    if (open && typeof document !== "undefined") {
      const originalStyle = document.body.style.overflow;
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setSearch("");
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Current language: ${currentMeta.name}. Change language`}
        className="flex h-8 items-center gap-1.5 rounded-full border border-line bg-paper/5 px-2.5 text-xs font-medium text-paper transition-all hover:border-paper/40 hover:bg-paper/10 sm:h-9 sm:px-3 sm:text-xs cursor-pointer"
      >
        <span className="text-sm leading-none" aria-hidden>
          {currentMeta.flag}
        </span>
        <span className="font-mono uppercase tracking-wider font-semibold">
          {currentMeta.code}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${
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
                    onClick={() => setOpen(false)}
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

      {/* Mobile Bottom Sheet Modal rendered via Portal into document.body */}
      {mounted && open
        ? createPortal(
            <div className="sm:hidden fixed inset-0 z-[999999]">
              {/* Backdrop overlay */}
              <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setOpen(false)}
                aria-hidden
              />

              {/* Bottom Sheet Drawer */}
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Choose Language"
                className="fixed inset-x-0 bottom-0 z-10 max-h-[85vh] flex flex-col rounded-t-3xl border-t border-line bg-ink p-4 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300"
              >
                {/* Handle pill */}
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line-strong" />

                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-line px-1">
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
                <div className="py-3">
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

                {/* Scrollable Language List */}
                <div className="flex-1 overflow-y-auto space-y-1 py-1 pr-1 overscroll-contain">
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
                          onClick={() => setOpen(false)}
                          className={`flex min-h-[48px] items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isActive
                              ? "bg-mark/15 font-semibold text-mark-light border border-mark/30"
                              : "text-paper hover:bg-paper/8 active:bg-paper/12"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl leading-none" aria-hidden>
                              {item.flag}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-semibold text-paper">
                                {item.name}
                              </span>
                              <span className="text-xs text-muted">
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
