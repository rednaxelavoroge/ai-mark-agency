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
      <Link href="/" className="inline-flex items-center">
        <BrandLogo className="h-6 w-auto sm:h-7" />
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

/**
 * Explains why the platform cannot authenticate.
 *
 * The reason comes from `describeSupabaseConfigProblem()` rather than being
 * hardcoded here, so a dangerous misconfiguration (a secret key placed in a
 * NEXT_PUBLIC_ variable) is reported precisely instead of hiding behind a
 * generic "not configured".
 */
export function SetupNotice({ problem }: { problem: string }) {
  return (
    <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-xs text-danger">
      <p className="font-semibold">Supabase is not usable</p>
      <p className="mt-1.5 leading-relaxed">{problem}</p>
      <p className="mt-2 leading-relaxed">
        See <code className="font-mono">.env.example</code> and{" "}
        <code className="font-mono">supabase/README.md</code>. The public website
        is unaffected.
      </p>
    </div>
  );
}
