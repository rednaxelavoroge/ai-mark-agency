import { CabinetCopyProvider } from "@/components/platform/CabinetCopyProvider";
import { loadAuthCabinet } from "@/lib/partner/load-cabinet";
import type { Metadata } from "next";

/**
 * Auth screens are never indexed: they are a private entry point, and a
 * crawler following a magic link would burn a single-use token.
 */
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { copy } = await loadAuthCabinet();

  return (
    <CabinetCopyProvider copy={copy}>
      <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
        {children}
      </div>
    </CabinetCopyProvider>
  );
}
