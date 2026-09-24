import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader, StatCard } from "@/components/platform/PageHeader";
import { cardClass } from "@/components/ui/classes";
import {
  getPartnerLedgerStats,
  getPartnerPayouts,
  requirePartner,
} from "@/lib/auth/dal";
import {
  LOCK_HOLD_DAYS,
  NO_DATA,
  formatDateTime,
  formatLedgerMoney,
  formatStoredMoney,
} from "@/lib/partner/format";

export const metadata: Metadata = { title: "Payouts" };

export default async function PartnerPayoutsPage() {
  await requirePartner("/partner/payouts");
  const [payouts, ledger] = await Promise.all([
    getPartnerPayouts(),
    getPartnerLedgerStats(),
  ]);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Payouts"
        lead="Payout rows recorded for you, and the payable and paid totals from the ledger. There is no separate payout provider on this screen."
      />

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">How a payout moves</h2>
        <ol className="mt-4 grid gap-3 text-xs leading-relaxed text-muted">
          <li>1. A qualifying sale posts a commission entry as confirmed.</li>
          <li>
            2. The entry stays confirmed for {LOCK_HOLD_DAYS} days after the sale
            is confirmed. It is not paid during that hold.
          </li>
          <li>
            3. If there is no refund, chargeback or cancellation, the entry
            becomes payable.
          </li>
          <li>
            4. AI MARK records a payout from payable entries. The payout is open,
            then paid when it is confirmed.
          </li>
          <li>
            5. A refund or chargeback adds a reversal row. It does not rewrite
            the original amount.
          </li>
        </ol>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          label="Payable"
          value={formatLedgerMoney(ledger.payableAmount, ledger.currency)}
          hint={ledger.currency ?? NO_DATA}
        />
        <StatCard
          label="Paid"
          value={formatLedgerMoney(ledger.paidAmount, ledger.currency)}
          hint={ledger.currency ?? NO_DATA}
        />
      </div>

      <DataTable
        unreadable={payouts.unreadable}
        empty="No payouts. Payable commission is not a payout until AI MARK records one. An empty list is empty."
        columns={["Status", "Amount", "Created", "Confirmed", "Paid"]}
        rows={(payouts.rows ?? []).map((payout) => [
          payout.status,
          formatStoredMoney(payout.amount, payout.currency),
          formatDateTime(payout.created_at),
          formatDateTime(payout.confirmed_at),
          formatDateTime(payout.paid_at),
        ])}
      />
    </div>
  );
}
