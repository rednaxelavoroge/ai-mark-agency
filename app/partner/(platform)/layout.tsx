import { CabinetCopyProvider } from "@/components/platform/CabinetCopyProvider";
import {
  loadPartnerCabinet,
  partnerNavFromCopy,
  shellCopyFromCabinet,
} from "@/lib/partner/load-cabinet";
import type { Metadata } from "next";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { requirePartner } from "@/lib/auth/dal";

import { getPartnerNotifications } from "@/lib/partner/notifications";
import { PartnerNotificationsBadge } from "@/components/platform/PartnerNotificationsBadge";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PartnerPlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, partner } = await requirePartner("/partner/dashboard");
  const [{ copy, locale }, { notifications, unreadCount }] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerNotifications(partner.partner_id),
  ]);

  return (
    <CabinetCopyProvider copy={copy}>
      <PlatformShell
        nav={partnerNavFromCopy(copy)}
        navLabel={copy.shell.navLabel}
        shell={shellCopyFromCabinet(copy)}
        homeHref="/partner/dashboard"
        badge={partner.partner_id}
        userEmail={auth.email}
        locale={locale}
        languageLabel={copy.dashboard.labelLanguage}
        notificationsSlot={
          <PartnerNotificationsBadge
            notifications={notifications}
            unreadCount={unreadCount}
            locale={locale}
          />
        }
      >
        {children}
      </PlatformShell>
    </CabinetCopyProvider>
  );
}
