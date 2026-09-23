import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, SetupNotice } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { safeNextPath } from "@/lib/auth/redirects";
import { describeSupabaseConfigProblem } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Create a partner account" };

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
  const configProblem = describeSupabaseConfigProblem();

  return (
    <AuthCard
      eyebrow="Partner Platform"
      title="Create a partner account"
      lead="One account gives you your Partner ID, a referral code and the partner dashboard."
      footer={
        <p className="text-xs text-muted">
          By creating an account you agree to the AI MARK partner terms. Read the{" "}
          <Link href="/privacy" className="link-underline text-paper">
            privacy notice
          </Link>
          .
        </p>
      }
    >
      <div className="grid gap-5">
        {configProblem ? <SetupNotice problem={configProblem} /> : null}
        <SignupForm next={next} disabled={configProblem !== null} />
      </div>
    </AuthCard>
  );
}
