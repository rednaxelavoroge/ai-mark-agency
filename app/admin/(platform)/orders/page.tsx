import type { Metadata } from "next";
import { DataTable } from "@/components/platform/DataTable";
import { PageHeader } from "@/components/platform/PageHeader";
import { fieldClass, labelClass, primaryButtonClass } from "@/components/ui/classes";
import { getAdminSales, requireAdmin } from "@/lib/auth/dal";
import { NO_DATA, formatDateTime, formatStoredMoney } from "@/lib/partner/format";
import { recordQualifyingSale } from "./actions";

export const metadata: Metadata = { title: "Orders" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin("/admin/orders");
  const params = await searchParams;
  const sales = await getAdminSales();
  const error = first(params.error);
  const recorded = first(params.recorded);
  const referralDefault = first(params.referral_code).trim().toLowerCase();
  const partnerDefault = first(params.partner_id).trim().toUpperCase();
  const referralValue = /^[a-z0-9][a-z0-9_-]{3,31}$/.test(referralDefault)
    ? referralDefault
    : "";
  const partnerValue = /^AM-[0-9]{4,12}$/.test(partnerDefault) ? partnerDefault : "";

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Admin console"
        title="Orders"
        lead="Record a payment the customer has already made. The ledger attributes it and posts commission. This form does not charge a card and does not set a rate."
      />

      {recorded ? (
        <p className="text-sm text-paper" role="status">
          Sale recorded, qualified, and posted to the ledger.
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <form action={recordQualifyingSale} className="grid max-w-xl gap-4">
        <label className={labelClass}>
          <span className="text-muted">External order id</span>
          <input className={fieldClass} name="external_order_id" required maxLength={200} />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Product</span>
          <select className={fieldClass} name="product_ref" required defaultValue="aime">
            <option value="aime">AI Marketing Employee</option>
            <option value="assistant">AI Business Assistant</option>
            <option value="showroom">SHOWROOM AI — AI Sales Agent</option>
            <option value="starter">Starter retainer</option>
            <option value="growth">Growth retainer</option>
            <option value="scale">Scale retainer</option>
            <option value="digital-production">Digital production</option>
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span className="text-muted">Amount paid</span>
            <input className={fieldClass} name="amount" inputMode="decimal" required placeholder="1000.00" />
          </label>
          <label className={labelClass}>
            <span className="text-muted">Currency</span>
            <input className={fieldClass} name="currency" required maxLength={3} defaultValue="USD" />
          </label>
        </div>
        <label className={labelClass}>
          <span className="text-muted">Paid at (UTC)</span>
          <input className={fieldClass} type="datetime-local" name="paid_at" required />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Referral code</span>
          <input
            className={fieldClass}
            name="referral_code"
            maxLength={32}
            defaultValue={referralValue}
          />
        </label>
        <label className={labelClass}>
          <span className="text-muted">Partner ID, if you are not using a code</span>
          <input
            className={fieldClass}
            name="partner_id"
            maxLength={16}
            placeholder="AM-001042"
            defaultValue={partnerValue}
          />
        </label>
        <button type="submit" className={`w-fit ${primaryButtonClass}`}>
          Record qualifying sale
        </button>
      </form>

      <DataTable
        unreadable={sales.unreadable}
        empty="No sales recorded."
        columns={["Partner", "Product", "Amount", "Status", "Order", "Paid"]}
        rows={(sales.rows ?? []).map((sale) => [
          sale.partner_id,
          sale.product_ref ?? NO_DATA,
          formatStoredMoney(sale.amount, sale.currency),
          sale.status,
          sale.external_order_id,
          formatDateTime(sale.paid_at),
        ])}
      />
    </div>
  );
}
