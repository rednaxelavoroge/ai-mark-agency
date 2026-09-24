import type { Metadata, Viewport } from "next";
import { PartnerPwa } from "@/components/platform/PartnerPwa";
import { requireSession } from "@/lib/auth/dal";

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
  applicationName: "AI MARK Partner Platform",
  manifest: "/partner/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AI MARK",
    statusBarStyle: "default",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#11120f" },
  ],
};

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession("/partner/dashboard");
  return (
    <>
      <PartnerPwa />
      {children}
    </>
  );
}
