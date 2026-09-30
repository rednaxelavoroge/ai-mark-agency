import type { Metadata } from "next";
import { signOut } from "@/app/auth/actions";
import { AuthCard } from "@/components/auth/AuthCard";
import { CabinetCopyProvider } from "@/components/platform/CabinetCopyProvider";
import { secondaryButtonClass } from "@/components/ui/classes";
import { getAuthContext } from "@/lib/auth/dal";
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return {
    title: copy.pages.noAccess.metadataTitle,
    robots: { index: false, follow: false },
  };
}

export default async function PartnerNoAccessPage() {
  const auth = await getAuthContext();
  const { copy } = await loadPartnerCabinet();
  const page = copy.pages.noAccess;

  return (
    <CabinetCopyProvider copy={copy}>
      <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
        <AuthCard
          ventureTagline={copy.auth.ventureTagline}
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
          footer={<p className="text-xs text-muted">{page.footer}</p>}
        >
          <div className="grid gap-4">
            <p className="text-sm text-muted">
              {page.signedInBefore}{" "}
              <span className="text-paper">{auth?.email ?? "an unknown account"}</span>.{" "}
              {page.signedInAfter}
            </p>

            <form action={signOut}>
              <button type="submit" className={secondaryButtonClass}>
                {copy.shell.signOut}
              </button>
            </form>
          </div>
        </AuthCard>
      </div>
    </CabinetCopyProvider>
  );
}
