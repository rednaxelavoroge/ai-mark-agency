import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader, StatCard } from "@/components/platform/PageHeader";
import { PayoutDestinationText } from "@/components/platform/PayoutDestination";
import { cardClass, primaryButtonClass } from "@/components/ui/classes";
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
import { canRequestPayout, PARTNER_PAYOUT_MIN_USD } from "@/lib/partner/payout";
import { requestPartnerPayout } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await loadPartnerCabinet();
  return { title: copy.pages.payouts.metadataTitle };
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function PartnerPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { auth } = await requirePartner("/partner/payouts");
  const params = await searchParams;
  const [{ copy }, payouts, ledger, destination] = await Promise.all([
    loadPartnerCabinet(),
    getPartnerPayouts(),
    getPartnerLedgerStats(),
    getOwnPayoutDetails(auth.userId),
  ]);
  const page = copy.pages.payouts;
  const pay = copy.payouts;
  const req = pay.request;
  const table = copy.dataTable.payouts;

  const hasOpen = (payouts.rows ?? []).some((p) => p.status === "open");
  const hasDestination =
    !destination.unreadable &&
    Boolean(destination.recipient && destination.details);
  const guard = canRequestPayout({
    payableAmount: ledger.payableAmount,
    currency: ledger.currency,
    hasOpenPayout: hasOpen,
    hasDestination,
  });
  const blockReason =
    guard.ok === false
      ? guard.reason === "open_payout"
        ? req.openBlocked
        : guard.reason === "missing_destination"
          ? req.destBlocked
          : guard.reason === "below_minimum"
            ? req.belowMinimum
            : null
      : null;

  const minNote = req.minimumNote.replace(
    "{min}",
    String(PARTNER_PAYOUT_MIN_USD),
  );

  return (
    <div className="grid gap-7">
      <PageHeader eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      {first(params.requested) ? (
        <p className="text-sm text-paper" role="status">{req.requestedNotice}</p>
      ) : null}
      {first(params.error) ? (
        <p className="text-sm text-danger" role="alert">{first(params.error)}</p>
      ) : null}

      <section className={`p-5 sm:p-6 ${cardClass}`}>
        <h2 className="text-sm font-semibold tracking-tight">{req.sectionTitle}</h2>
        <p className="mt-1 text-xs text-muted">{minNote}</p>
        <p className="mt-2 text-sm">
          {req.availableLabel}:{" "}
          <strong>{formatLedgerMoney(ledger.payableAmount, ledger.currency)}</strong>
        </p>
        {blockReason ? (
          <p className="mt-2 text-xs text-muted">{blockReason}</p>
        ) : null}
        <form action={requestPartnerPayout} className="mt-4">
          <button
            type="submit"
            className={primaryButtonClass}
            disabled={!guard.ok || ledger.payableAmount === null}
          >
            {req.requestButton}
          </button>
        </form>
      </section>

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
