import type { Metadata } from "next";
import { PlatformShell } from "@/components/platform/PlatformShell";
import type { PlatformNavItem } from "@/components/platform/PlatformNav";
import { requirePartner } from "@/lib/auth/dal";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Order matches the Phase 4A route map. */
const PARTNER_NAV: PlatformNavItem[] = [
  { href: "/partner/dashboard", label: "Dashboard" },
  { href: "/partner/customers", label: "Customers" },
  { href: "/partner/sales", label: "Sales" },
  { href: "/partner/network", label: "Network" },
  { href: "/partner/commissions", label: "Commissions" },
  { href: "/partner/payouts", label: "Payouts" },
  { href: "/partner/resources", label: "Resources" },
  { href: "/partner/profile", label: "Profile" },
];

export default async function PartnerPlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, account } = await requirePartner("/partner/dashboard");

  return (
    <PlatformShell
      nav={PARTNER_NAV}
      navLabel="Partner sections"
      homeHref="/partner/dashboard"
      badge={account.partner.partner_id}
      userEmail={auth.email}
    >
      {children}
    </PlatformShell>
  );
}
