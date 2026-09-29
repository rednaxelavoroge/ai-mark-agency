import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { cardClass } from "@/components/ui/classes";
import { requireAdmin } from "@/lib/auth/dal";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NO_DATA, formatDateTime } from "@/lib/partner/format";

export const metadata: Metadata = { title: "Provisioning" };

export default async function AdminProvisioningPage() {
  await requireAdmin("/admin/provisioning");

  let rows: {
    id: string;
    email: string;
    sku: string;
    product: string;
    provisioning_status: string;
    provisioning_error: string | null;
    reason: string;
    created_at: string;
  }[] = [];
  let unreadable = false;

  try {
    const admin = createSupabaseAdminClient();
    const queue = await admin
      .from("provisioning_manual_queue")
      .select("id, subscription_id, invoice_ref, reason, created_at")
      .is("resolved_at", null)
      .order("created_at", { ascending: false })
      .limit(100);

    if (queue.error) {
      unreadable = true;
    } else {
      for (const item of queue.data ?? []) {
        const sub = await admin
          .from("subscriptions")
          .select("email, sku, product, provisioning_status, provisioning_error")
          .eq("id", item.subscription_id)
          .maybeSingle();
        rows.push({
          id: item.id,
          email: sub.data?.email ?? NO_DATA,
          sku: sub.data?.sku ?? NO_DATA,
          product: sub.data?.product ?? NO_DATA,
          provisioning_status: sub.data?.provisioning_status ?? NO_DATA,
          provisioning_error: sub.data?.provisioning_error ?? null,
          reason: item.reason,
          created_at: item.created_at,
        });
      }
    }
  } catch {
    unreadable = true;
  }

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin"
        title="Needs manual activation"
        lead="Subscriptions the product API could not provision automatically. Resolve in the product admin, then update the subscription in Supabase."
      />

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <p className="text-xs text-muted">
          Tenant API contract: <code className="text-paper">docs/phase-2-product-tenant-contract.md</code>
        </p>
      </section>

      <DataTable
        unreadable={unreadable}
        empty="No subscriptions are waiting for manual activation."
        columns={["Buyer", "SKU", "Product", "Status", "Reason", "Queued"]}
        rows={rows.map((row) => [
          row.email,
          row.sku,
          row.product,
          row.provisioning_status,
          row.provisioning_error ?? row.reason,
          formatDateTime(row.created_at),
        ])}
      />
    </div>
  );
}
