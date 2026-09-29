/**
 * Centred shell for the sign-in / sign-up screens.
 *
 * Presentational only — no server-only imports — so both the server pages and
 * the client forms can compose it.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { cardClass, eyebrowClass } from "@/components/ui/classes";

export function AuthCard({
  eyebrow,
  title,
  lead,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <Link href="/" className="inline-flex max-w-full flex-col items-start">
        <BrandLogo className="h-7 sm:h-8" />
        <span className="mt-1.5 text-[13px] font-semibold text-muted">Venture and Marketing</span>
      </Link>

      <p className={`mt-8 ${eyebrowClass}`}>{eyebrow}</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">{lead}</p>

      <div className={`mt-6 p-5 sm:p-6 ${cardClass}`}>{children}</div>

      {footer ? <div className="mt-5">{footer}</div> : null}
    </div>
  );
}

/** Short notice when sign-in cannot start. Operator detail stays in the server log. */
export function SetupNotice() {
  return (
    <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-xs text-danger">
      <p className="font-semibold">Sign-in is temporarily unavailable.</p>
      <p className="mt-1.5 leading-relaxed">
        Write to us and we will help you in. The public website stays open.
      </p>
    </div>
  );
}
