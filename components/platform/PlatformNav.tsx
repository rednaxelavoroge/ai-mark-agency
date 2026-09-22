"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PlatformNavItem = {
  href: string;
  label: string;
  /**
   * Match the path exactly. Required for a section index such as `/admin`,
   * which would otherwise also match every child route.
   */
  exact?: boolean;
};

/**
 * Navigation for the Partner Platform and the admin console.
 *
 * Both orientations are rendered and CSS decides which is visible
 * (`hidden lg:block` / `lg:hidden`), because `display: none` also removes the
 * inactive copy from the accessibility tree — the same technique BrandLogo
 * uses for its two ink variants.
 */
export function PlatformNav({
  items,
  orientation,
  label,
}: {
  items: PlatformNavItem[];
  orientation: "sidebar" | "bar";
  label: string;
}) {
  const pathname = usePathname() || "";

  const isActive = (item: PlatformNavItem) =>
    item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (orientation === "sidebar") {
    return (
      <nav aria-label={label} className="mt-6 grid gap-0.5">
        {items.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-mark/10 font-medium text-paper"
                  : "text-muted hover:bg-ink-3/60 hover:text-paper"
              }`}
            >
              {active ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-mark"
                />
              ) : null}
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label={label}
      className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5"
    >
      {items.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs whitespace-nowrap transition-colors ${
              active
                ? "border-mark bg-mark/10 font-medium text-paper"
                : "border-line text-muted hover:text-paper"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
