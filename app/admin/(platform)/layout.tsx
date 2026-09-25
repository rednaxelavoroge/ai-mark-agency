import type { Metadata } from "next";
import { PlatformShell } from "@/components/platform/PlatformShell";
import type { PlatformNavItem } from "@/components/platform/PlatformNav";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const ADMIN_NAV: PlatformNavItem[] = [
  // `exact` keeps "Overview" from staying active on every child route.
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/network", label: "Network" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/commissions", label: "Commissions" },
  { href: "/admin/payouts", label: "Payouts" },
  { href: "/admin/audit", label: "Audit" },
];

export default async function AdminPlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin("/admin");

  return (
    <PlatformShell
      nav={ADMIN_NAV}
      navLabel="Admin sections"
      homeHref="/admin"
      badge="Admin"
      userEmail={auth.email}
    >
      {children}
    </PlatformShell>
  );
}
