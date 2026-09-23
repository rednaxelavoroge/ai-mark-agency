import type { Metadata } from "next";
import { signOut } from "@/app/auth/actions";
import { AuthCard } from "@/components/auth/AuthCard";
import { secondaryButtonClass } from "@/components/ui/classes";
import { getAuthContext } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Partner access",
  robots: { index: false, follow: false },
};

/**
 * Reachable when a session exists but no partner record is attached to it —
 * for example an operator-created account, or a sign-up whose provisioning
 * was interrupted.
 *
 * It lives OUTSIDE the (platform) route group on purpose: that group's layout
 * redirects here, so rendering it inside the group would loop.
 */
export default async function PartnerNoAccessPage() {
  const auth = await getAuthContext();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <AuthCard
        eyebrow="Partner Platform"
        title="No partner access on this account"
        lead="Your account is signed in, but it has no partner record attached yet."
        footer={
          <p className="text-xs text-muted">
            Think this is wrong? Reply to any AI MARK email and we will link your
            partner record.
          </p>
        }
      >
        <div className="grid gap-4">
          <p className="text-sm text-muted">
            Signed in as{" "}
            <span className="text-paper">{auth?.email ?? "an unknown account"}</span>.
            Partner records are issued by AI MARK; they are never created by the
            account owner.
          </p>

          <form action={signOut}>
            <button type="submit" className={secondaryButtonClass}>
              Sign out
            </button>
          </form>
        </div>
      </AuthCard>
    </div>
  );
}
