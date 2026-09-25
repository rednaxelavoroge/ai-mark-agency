import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { fieldClass, labelClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/classes";
import { requireAdmin } from "@/lib/auth/dal";
import { payableSkuById } from "@/lib/crypto/catalog";
import { listAdminInvoices } from "@/lib/crypto/invoices";
import { NETWORK_LABELS, configuredTreasuryRails, isPaymentNetwork } from "@/lib/crypto/networks";
import { solanaRpcUrl } from "@/lib/crypto/solana-watch";
import { NO_DATA, formatDateTime } from "@/lib/partner/format";
import { confirmTreasuryInvoice, probeSolanaTreasury } from "./actions";

export const metadata: Metadata = { title: "Invoices" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("/admin/invoices");
  const params = await searchParams;
  const invoices = await listAdminInvoices();
  const rails = configuredTreasuryRails();
  const error = first(params.error);
  const confirmed = first(params.confirmed);
  const watched = first(params.watched);
  const sigs = first(params.sigs);
  const rpcReady = Boolean(solanaRpcUrl());

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Treasury invoices"
        lead="Customers send USDT or USDC to AI MARK addresses. Matching a tx hash records the sale through the existing ledger functions. This screen does not hold a merchant balance and does not send payouts."
      />

      {confirmed ? (
        <p className="text-sm text-paper" role="status">
          Invoice matched. Sale recorded, qualified, and posted.
        </p>
      ) : null}
      {watched ? (
        <p className="text-sm text-paper" role="status">
          Solana RPC returned {watched} recent signature{watched === "1" ? "" : "s"}
          {sigs ? `: ${sigs}` : ""}. Confirm by entering the hash below. Nothing was marked paid.
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <section className="grid gap-3">
        <h2 className="text-sm font-semibold tracking-tight">Configured receive addresses</h2>
        {rails.length === 0 ? (
          <p className="text-sm text-muted">
            {NO_DATA} No treasury addresses in env. The pay page is ready and will not invent wallets.
          </p>
        ) : (
          <ul className="grid gap-2 text-xs">
            {rails.map((rail) => (
              <li key={rail.envName} className="break-all font-mono text-muted">
                {rail.asset} {NETWORK_LABELS[rail.network]} · {rail.address}
              </li>
            ))}
          </ul>
        )}
      </section>

      <form action={probeSolanaTreasury}>
        <button type="submit" className={secondaryButtonClass} disabled={!rpcReady}>
          {rpcReady ? "Look up recent Solana signatures" : "Solana RPC not configured"}
        </button>
      </form>

      <form action={confirmTreasuryInvoice} className="grid max-w-xl gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Match a transfer</h2>
        <label className={labelClass}>
          <span className="text-muted">Invoice ref</span>
          <input className={fieldClass} name="public_ref" required maxLength={16} placeholder="aim…" />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Transaction hash</span>
          <input className={`${fieldClass} font-mono text-xs`} name="tx_hash" required maxLength={128} />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Paid at (UTC)</span>
          <input className={fieldClass} type="datetime-local" name="paid_at" required />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Referral code</span>
          <input className={fieldClass} name="referral_code" maxLength={32} />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Partner ID, if you are not using a code</span>
          <input className={fieldClass} name="partner_id" maxLength={16} placeholder="AM-001042" />
        </label>
        <button type="submit" className={`w-fit ${primaryButtonClass}`}>
          Confirm payment
        </button>
      </form>

      <DataTable
        unreadable={invoices.unreadable}
        empty="No invoices."
        columns={["Ref", "Product", "Send", "Rail", "Status", "Tx", "Created"]}
        rows={(invoices.rows ?? []).map((invoice) => {
          const sku = payableSkuById(invoice.sku_id);
          const network = isPaymentNetwork(invoice.network) ? invoice.network : null;
          return [
            invoice.public_ref,
            sku?.name ?? invoice.product_ref,
            `${invoice.expected_amount} ${invoice.asset}`,
            network ? NETWORK_LABELS[network] : invoice.network,
            invoice.status,
            invoice.tx_hash ?? NO_DATA,
            formatDateTime(invoice.created_at),
          ];
        })}
      />
    </div>
  );
}
