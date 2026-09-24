"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const COOKIE = "theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function persistTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(COOKIE, theme);
  } catch {
    /* ignore */
  }
  document.cookie = `${COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new Event("theme-change"));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("theme-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("theme-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function ThemeToggle({
  lightLabel,
  darkLabel,
}: {
  lightLabel: string;
  darkLabel: string;
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);
  const isDark = theme === "dark";

  function toggle() {
    persistTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-7.5 w-7.5 place-items-center rounded-full border border-line text-xs text-muted transition-colors hover:text-paper sm:h-8 sm:w-8 sm:text-sm cursor-pointer"
      aria-label={isDark ? lightLabel : darkLabel}
      title={isDark ? lightLabel : darkLabel}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
