import Link from "next/link";
import type { ReactNode } from "react";
import { signOut } from "@/app/auth/actions";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { secondaryButtonClass } from "@/components/ui/classes";
import { PlatformNav, type PlatformNavItem } from "./PlatformNav";

/**
 * Application shell shared by the partner dashboard and the admin console.
 *
 * Deliberately more functional than the public site's editorial layout: a
 * persistent nav, a dense content column and no scroll-driven motion. It is
 * server-rendered, so the sign-out form posts a Server Action directly.
 */
export function PlatformShell({
  nav,
  navLabel,
  homeHref,
  badge,
  userEmail,
  children,
}: {
  nav: PlatformNavItem[];
  navLabel: string;
  homeHref: string;
  badge: string;
  userEmail: string | null;
  children: ReactNode;
}) {
  return (
    <div className="min-h-svh bg-ink">
      {/* Compact header + scrollable pill nav for phones (verified at 390px). */}
      <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2">
          <Link href={homeHref} className="flex min-w-0 items-center gap-2">
            <BrandLogo className="h-6 shrink-0 sm:h-7" />
            <span className="truncate rounded-full border border-line px-2 py-0.5 text-[10px] tracking-[0.14em] text-muted uppercase">
              {badge}
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle
              lightLabel="Switch to light theme"
              darkLabel="Switch to dark theme"
            />
            <form action={signOut}>
              <button type="submit" className={secondaryButtonClass}>
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 pb-2.5">
          <PlatformNav items={nav} orientation="bar" label={navLabel} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[92rem] gap-8 px-4 sm:px-6">
        <aside className="sticky top-0 hidden h-svh w-60 shrink-0 self-start overflow-y-auto border-r border-line py-7 lg:block">
          <Link href={homeHref} className="inline-flex max-w-full items-center">
            <BrandLogo className="h-7" />
          </Link>

          <p className="mt-4 rounded-full border border-line px-2.5 py-1 text-center text-[10px] tracking-[0.16em] text-muted uppercase">
            {badge}
          </p>

          <PlatformNav items={nav} orientation="sidebar" label={navLabel} />

          <div className="mt-8 border-t border-line pt-5">
            <p className="text-[10px] tracking-[0.16em] text-muted uppercase">
              Signed in
            </p>
            <p className="mt-1.5 truncate text-xs text-paper" title={userEmail ?? undefined}>
              {userEmail ?? "—"}
            </p>
            <form action={signOut} className="mt-3">
              <button type="submit" className={secondaryButtonClass}>
                Sign out
              </button>
            </form>
            <Link
              href="/"
              className="link-underline mt-4 inline-block text-xs text-muted"
            >
              ← ai-mark.agency
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-6 lg:py-9">{children}</main>
      </div>
    </div>
  );
}
