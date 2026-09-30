import { autoConfirmInvoice } from "@/lib/crypto/auto-confirm";
import { isInvoiceRef } from "@/lib/crypto/invoice-ref";
import { loadInvoiceByRef } from "@/lib/crypto/invoices";
import { allow } from "@/lib/rate/window";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Polled by the open payment page. Looks the transfer up on-chain and, on an
 * exact unique-amount match, confirms the invoice automatically.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = (url.searchParams.get("ref") ?? "").toLowerCase();
  const locale = (url.searchParams.get("locale") ?? "").slice(0, 5) || undefined;
  if (!isInvoiceRef(ref)) return Response.json({ status: "invalid" }, { status: 400 });

  const invoice = await loadInvoiceByRef(ref);
  if (!invoice) return Response.json({ status: "invalid" }, { status: 404 });
  if (invoice.status !== "awaiting") return Response.json({ status: invoice.status });

  // At most one chain lookup per invoice every 15s, whatever the number of tabs.
  if (!allow(`pay:${ref}`, 1, 15_000)) return Response.json({ status: "awaiting" });

  const outcome = await autoConfirmInvoice(ref, locale);
  if (outcome.status === "confirmed") return Response.json({ status: "confirmed" });
  return Response.json({ status: "awaiting" });
}
