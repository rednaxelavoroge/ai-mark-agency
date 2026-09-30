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
import { loadPartnerCabinet } from "@/lib/partner/load-cabinet";
import {
  NO_DATA,
  formatDateTime,
  formatLedgerMoney,
  formatStoredMoney,
} from "@/lib/partner/format";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.payouts.metadataTitle };
}

export default async function PartnerPayoutsPage() {
  const { auth } = await requirePartner("/partner/payouts");
  const [{ copy }, payouts, ledger, destination] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerPayouts(),
    getPartnerLedgerStats(),
    getOwnPayoutDetails(auth.userId),
  ]);
  const page = copy.pages.payouts;
  const pay = copy.payouts;
  const table = copy.dataTable.payouts;

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{pay.destinationTitle}</h2>
        <p className="mt-1 text-xs text-muted">{pay.destinationLead}</p>
        <div className="mt-4">
          {destination.unreadable ? (
            <p className="text-sm text-muted">
              {NO_DATA} {pay.destinationUnreadable}
            </p>
          ) : (
            <PayoutDestinationText
              recipient={destination.recipient}
              details={destination.details}
            />
          )}
        </div>
        <Link
          href="/partner/profile"
          className="mt-4 inline-block text-xs font-medium text-paper link-underline"
        >
          {pay.editPayoutLink}
        </Link>
      </section>

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{pay.flowTitle}</h2>
        <ol className="mt-4 grid gap-3 text-xs leading-relaxed text-muted">
          {pay.flowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          label={pay.statReady}
          value={formatLedgerMoney(ledger.payableAmount, ledger.currency)}
          hint={ledger.currency ?? NO_DATA}
        />
        <StatCard
          label={pay.statPaid}
          value={formatLedgerMoney(ledger.paidAmount, ledger.currency)}
          hint={ledger.currency ?? NO_DATA}
        />
      </div>

      <DataTable
        unreadable={payouts.unreadable}
        unreadableText={copy.dataTable.unreadable}
        empty={table.empty}
        columns={table.columns}
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
