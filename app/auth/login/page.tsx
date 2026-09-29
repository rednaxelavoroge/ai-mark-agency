import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { SetupNotice } from "@/components/auth/SetupNotice";
import { LoginForm } from "@/components/auth/LoginForm";
import { safeNextPath } from "@/lib/auth/redirects";
import { loadAuthCabinet } from "@/lib/partner/load-cabinet";
import { describeSupabaseConfigProblem } from "@/lib/supabase/config";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadAuthCabinet();
  return { title: copy.auth.login.metadataTitle };
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function callbackMessage(
  copy: Awaited<ReturnType<typeof loadAuthCabinet>>["copy"],
  errorCode: string | undefined,
  signedOut: string | undefined,
): string | null {
  if (signedOut === "1") return copy.auth.signedOutNotice;
  if (!errorCode) return null;
  const errors = copy.auth.callbackErrors;
  return (
    errors[errorCode as keyof typeof errors] ?? copy.auth.genericSignInError
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const next = safeNextPath(first(params.next));
  const { copy } = await loadAuthCabinet();
  const login = copy.auth.login;
  const configProblem = describeSupabaseConfigProblem();
  if (configProblem) console.error("[auth] sign-in unavailable:", configProblem);

  const notice = callbackMessage(copy, first(params.error), first(params.signed_out));

  return (
    <AuthCard
      ventureTagline={copy.auth.ventureTagline}
      eyebrow={login.eyebrow}
      title={login.title}
      lead={login.lead}
      footer={
        <p className="text-xs text-muted">
          {login.footerBefore}{" "}
          <Link href="/partners" className="link-underline text-paper">
            {login.footerLink}
          </Link>
        </p>
      }
    >
      <div className="grid gap-5">
        {configProblem ? <SetupNotice /> : null}
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
