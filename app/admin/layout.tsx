import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";

/**
 * Outermost gate for /admin: a verified session.
 *
 * The admin *role* check lives in `(platform)/layout.tsx` and in every page, so
 * a signed-in partner who reaches an admin URL is redirected to their own
 * dashboard rather than shown an admin shell.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · AI MARK Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/admin");
  return <>{children}</>;
}
