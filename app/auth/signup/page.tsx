import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { SetupNotice } from "@/components/auth/SetupNotice";
import { SignupForm } from "@/components/auth/SignupForm";
import { safeNextPath } from "@/lib/auth/redirects";
import { loadAuthCabinet } from "@/lib/partner/load-cabinet";
import { describeSupabaseConfigProblem } from "@/lib/supabase/config";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadAuthCabinet();
  return { title: copy.auth.signup.metadataTitle };
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const next = safeNextPath(first(params.next));
  const { copy } = await loadAuthCabinet();
  const signup = copy.auth.signup;
  const configProblem = describeSupabaseConfigProblem();
  if (configProblem) console.error("[auth] sign-up unavailable:", configProblem);

  return (
    <AuthCard
      ventureTagline={copy.auth.ventureTagline}
      eyebrow={signup.eyebrow}
      title={signup.title}
      lead={signup.lead}
      footer={
        <p className="text-xs text-muted">
          {signup.footerBefore}{" "}
          <Link href="/privacy" className="link-underline text-paper">
            {signup.privacyLink}
          </Link>
          {signup.footerAfter}
        </p>
      }
    >
      <div className="grid gap-5">
        {configProblem ? <SetupNotice /> : null}
        <SignupForm next={next} disabled={configProblem !== null} />
      </div>
    </AuthCard>
  );
}
