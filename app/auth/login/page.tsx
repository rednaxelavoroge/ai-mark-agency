import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, SetupNotice } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { safeNextPath } from "@/lib/auth/redirects";
import { describeSupabaseConfigProblem } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Sign in" };

type SearchParams = Record<string, string | string[] | undefined>;

/** Messages for the `error` codes produced by /auth/callback. */
const CALLBACK_ERRORS: Record<string, string> = {
  missing_code: "That sign-in link is incomplete. Request a new one below.",
  exchange_failed:
    "That sign-in link has expired or was already used. Request a new one below.",
  provider_error: "The sign-in provider did not complete the request.",
  not_configured: "The Partner Platform is not connected to Supabase yet.",
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const next = safeNextPath(first(params.next));
  const configProblem = describeSupabaseConfigProblem();

  const errorCode = first(params.error);
  const notice =
    first(params.signed_out) === "1"
      ? "You have been signed out."
      : errorCode
        ? (CALLBACK_ERRORS[errorCode] ??
          "We could not complete that sign-in. Please try again.")
        : null;

  return (
    <AuthCard
      eyebrow="Partner Platform"
      title="Sign in"
      lead="Your AI Mark partner dashboard: referral link, network, customers and commissions."
      footer={
        <p className="text-xs text-muted">
          Not a partner yet?{" "}
          <Link href="/partners" className="link-underline text-paper">
            See the partner programme
          </Link>
        </p>
      }
    >
      <div className="grid gap-5">
        {configProblem ? <SetupNotice problem={configProblem} /> : null}
        {notice ? (
          <p
            role="status"
            className="rounded-xl border border-line bg-ink-3/60 px-3.5 py-2.5 text-xs text-muted"
          >
            {notice}
          </p>
        ) : null}
        <LoginForm next={next} disabled={configProblem !== null} />
      </div>
    </AuthCard>
  );
}
