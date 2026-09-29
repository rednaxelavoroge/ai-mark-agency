import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader, StatCard } from "@/components/platform/PageHeader";
import { PayoutDestinationText } from "@/components/platform/PayoutDestination";
import { cardClass } from "@/components/ui/classes";
import {
  getOwnPayoutDetails,
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
  const { auth } = await requirePartner("/partner/payouts");
  const [payouts, ledger, destination] = await Promise.all([
    getPartnerPayouts(),
    getPartnerLedgerStats(),
    getOwnPayoutDetails(auth.userId),
  ]);

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Partner Platform"
        title="Payouts"
        lead="Payouts recorded for you, and the USDC address saved on your profile. AI MARK sends the payout to that address."
      />

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">Where a payout is sent</h2>
        <p className="mt-1 text-xs text-muted">
          The address you want payouts sent to.
        </p>
        <div className="mt-4">
          {destination.unreadable ? (
            <p className="text-sm text-muted">{NO_DATA} Payout details could not be read.</p>
          ) : (
            <PayoutDestinationText
              recipient={destination.recipient}
              details={destination.details}
            />
          )}
        </div>
        <Link href="/partner/profile" className="mt-4 inline-block text-xs font-medium text-paper link-underline">
          Edit payout details
        </Link>
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">How a payout moves</h2>
        <ol className="mt-4 grid gap-3 text-xs leading-relaxed text-muted">
          <li>1. A qualifying sale records your commission.</li>
          <li>
            2. That commission is held for {LOCK_HOLD_DAYS} days after the sale
            is confirmed.
          </li>
          <li>3. After the hold, if the sale still stands, it is ready to pay.</li>
          <li>4. AI MARK records the payout and sends it to your USDC address.</li>
          <li>5. A refund or cancellation adjusts what is owed.</li>
        </ol>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          label="Ready to pay"
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
        empty="No payouts yet. AI MARK records a payout when commission is ready to pay."
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
