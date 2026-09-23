import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";

/**
 * Outermost gate for everything under /partner.
 *
 * A verified session is required; the partner-specific check lives one level
 * down in `(platform)/layout.tsx`, so that `/partner/no-access` can explain a
 * missing partner record without redirecting into itself.
 *
 * Note the deliberate layering: proxy.ts refreshes the session, this layout
 * gates the subtree, and every page re-checks through the DAL next to its own
 * data. A layout does not stop nested segments from rendering, so it is never
 * the only check.
 */
export const metadata: Metadata = {
  title: {
    default: "Partner Platform",
    template: "%s · AI MARK Partner Platform",
  },
  robots: { index: false, follow: false },
};

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/partner/dashboard");
  return <>{children}</>;
}
