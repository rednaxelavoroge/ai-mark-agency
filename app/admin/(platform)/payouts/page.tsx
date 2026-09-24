import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { fieldClass, labelClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/classes";
import { getAdminPayouts, requireAdmin } from "@/lib/auth/dal";
import { formatDateTime, formatStoredMoney } from "@/lib/partner/format";
import {
  advanceDueLocks,
  confirmPartnerPayout,
  createPartnerPayout,
} from "./actions";

export const metadata: Metadata = { title: "Payouts" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("/admin/payouts");
  const params = await searchParams;
  const payouts = await getAdminPayouts();
  const error = first(params.error);
  const notice = first(params.locked)
    ? `Locks advanced: ${first(params.locked)}.`
    : first(params.created)
      ? "Payout opened from payable entries."
      : first(params.confirmed)
        ? "Payout confirmed."
        : "";

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Payouts"
        lead="The existing ledger actions: advance the 14-day hold, open a payout from payable entries, and confirm it. No payout provider is connected here."
      />

      {notice ? (
        <p className="text-sm text-paper" role="status">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <form action={advanceDueLocks}>
        <button type="submit" className={secondaryButtonClass}>
          Advance holds that are already 14 days old
        </button>
      </form>

      <form action={createPartnerPayout} className="grid max-w-xl gap-4">
        <label className={labelClass}>
          <span className="text-muted">Partner ID</span>
          <input className={fieldClass} name="partner_id" required placeholder="AM-001042" />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Currency</span>
          <input className={fieldClass} name="currency" required maxLength={3} defaultValue="USD" />
        </label>
        <button type="submit" className={`w-fit ${primaryButtonClass}`}>
          Open payout
        </button>
      </form>

      <DataTable
        unreadable={payouts.unreadable}
        empty="No payouts recorded."
        columns={["Partner", "Status", "Amount", "Created", "Confirm"]}
        rows={(payouts.rows ?? []).map((payout) => [
          payout.partner_id,
          payout.status,
          formatStoredMoney(payout.amount, payout.currency),
          formatDateTime(payout.created_at),
          payout.status === "open" ? (
            <form key={payout.id} action={confirmPartnerPayout}>
              <input type="hidden" name="payout_id" value={payout.id} />
              <button type="submit" className={secondaryButtonClass}>
                Confirm
              </button>
            </form>
          ) : (
            formatDateTime(payout.paid_at)
          ),
        ])}
      />
    </div>
  );
}
