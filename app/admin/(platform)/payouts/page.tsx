import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { PayoutDestinationText } from "@/components/platform/PayoutDestination";
import { fieldClass, labelClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/classes";
import {
  getAdminPayableEntries,
  getAdminPayoutInstructions,
  getAdminPayouts,
  type PayoutInstruction,
  requireAdmin,
} from "@/lib/auth/dal";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";
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

const EMPTY_INSTRUCTION: PayoutInstruction = { recipient: null, details: null };

export default async function AdminPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("/admin/payouts");
  const params = await searchParams;
  const [payouts, payable] = await Promise.all([
    getAdminPayouts(),
    getAdminPayableEntries(),
  ]);
  const partnerIds = [
    ...(payable.rows ?? []).map((entry) => entry.beneficiary_partner_id),
    ...(payouts.rows ?? []).map((payout) => payout.partner_id),
  ];
  const instructions = await getAdminPayoutInstructions(partnerIds);
  const instructionFor = (partnerId: string): PayoutInstruction =>
    instructions.byPartner.get(partnerId) ?? EMPTY_INSTRUCTION;

  const groups = new Map<
    string,
    { partnerId: string; currency: string; count: number }
  >();
  for (const entry of payable.rows ?? []) {
    const key = `${entry.beneficiary_partner_id}\0${entry.currency}`;
    const existing = groups.get(key);
    if (existing) existing.count += 1;
    else {
      groups.set(key, {
        partnerId: entry.beneficiary_partner_id,
        currency: entry.currency,
        count: 1,
      });
    }
  }

  const error = first(params.error);
  const notice = first(params.locked)
    ? `Locks advanced: ${first(params.locked)}.`
    : first(params.created)
      ? "Payout opened from payable entries."
      : first(params.confirmed)
        ? "Payout confirmed in the ledger. No money was sent."
        : "";

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Payouts"
        lead="Payable commission entries and the USDC destination saved on the partner profile. Opening a payout calls create_payout. Confirming it calls confirm_payout and marks the payout paid in the ledger. Tokens are not sent from this app."
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
      {instructions.unreadable ? (
        <p className="text-sm text-muted" role="status">
          {NO_DATA} Payout details could not be read.
        </p>
      ) : null}

      <section className="grid gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Payable</h2>
        <p className="max-w-2xl text-xs leading-relaxed text-muted">
          Commission entries already in status payable. Up to 100, oldest
          first. An empty list is empty. The amount on each row is the stored
          commission, not a new calculation.
        </p>
        <DataTable
          unreadable={payable.unreadable}
          empty="No payable commission entries."
          columns={["Partner", "Level", "Type", "Amount", "Destination", "Created"]}
          rows={(payable.rows ?? []).map((entry) => {
            const instruction = instructionFor(entry.beneficiary_partner_id);
            return [
              entry.beneficiary_partner_id,
              `L${entry.level}`,
              entry.commission_type,
              formatStoredMoney(entry.amount, entry.currency),
              <PayoutDestinationText
                key={entry.id}
                recipient={instruction.recipient}
                details={instruction.details}
              />,
              formatDateTime(entry.created_at),
            ];
          })}
        />
      </section>

      <section className="grid gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Open a payout</h2>
        <p className="max-w-2xl text-xs leading-relaxed text-muted">
          Each button opens one payout for that partner and currency. Send the
          same amount as USDC on Solana unless the partner saved a different
          network. The ledger sets the amount. This app does not sign a transfer.
        </p>
        {payable.unreadable ? (
          <p className="text-sm text-muted">{NO_DATA} Payable entries could not be read.</p>
        ) : groups.size === 0 ? (
          <p className="text-sm text-muted">No partner is waiting on a payout.</p>
        ) : (
          <div className="grid gap-3">
            {[...groups.values()].map((group) => {
              const instruction = instructionFor(group.partnerId);
              return (
                <form
                  key={`${group.partnerId}-${group.currency}`}
                  action={createPartnerPayout}
                  className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-line bg-ink-2 p-4"
                >
                  <input type="hidden" name="partner_id" value={group.partnerId} />
                  <input type="hidden" name="currency" value={group.currency} />
                  <div className="grid gap-2">
                    <p className="font-mono text-sm text-paper">
                      {group.partnerId} · {group.currency} · {group.count}{" "}
                      {group.count === 1 ? "entry" : "entries"}
                    </p>
                    <PayoutDestinationText
                      recipient={instruction.recipient}
                      details={instruction.details}
                    />
                  </div>
                  <button type="submit" className={primaryButtonClass}>
                    Open payout
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </section>

      <form action={advanceDueLocks}>
        <button type="submit" className={secondaryButtonClass}>
          Advance holds that are already 14 days old
        </button>
      </form>

      <form action={createPartnerPayout} className="grid max-w-xl gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Open by Partner ID</h2>
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
        columns={["Partner", "Status", "Amount", "Destination", "Created", "Confirm"]}
        rows={(payouts.rows ?? []).map((payout) => {
          const instruction = instructionFor(payout.partner_id);
          return [
            payout.partner_id,
            payout.status,
            formatStoredMoney(payout.amount, payout.currency),
            <PayoutDestinationText
              key={payout.id}
              recipient={instruction.recipient}
              details={instruction.details}
            />,
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
          ];
        })}
      />
    </div>
  );
}
