import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { PlaceholderPanel } from "@/components/platform/StatusBadge";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Orders" };

/**
 * Phase 4A route placeholder.
 *
 * The route, the shell and the server-side authorization are real; the feature
 * behind it is not built yet, and this page says so instead of showing
 * invented data.
 */
export default async function AdminOrdersPage() {
  await requireAdmin("/admin/orders");

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow={"Admin console"}
        title={"Orders"}
        lead={"Orders across every AI Mark product."}
      />
      <PlaceholderPanel
        summary={"There is no order pipeline yet: the public site has no checkout and the products do not report sales back. This screen is reserved for when they do."}
        planned={[
          "Order feed from each product",
          "Partner attribution per order",
          "Qualification, refund and chargeback state",
        ]}
      />
    </div>
  );
}
