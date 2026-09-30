import { runProvisioningBatch } from "@/lib/provisioning/worker";
import { autoConfirmOpenInvoices } from "@/lib/crypto/auto-confirm";

export const dynamic = "force-dynamic";

/**
 * Daily catch-up: retries failed/pending product tenant provisioning and
 * processes subscription expiries. Initial provisioning runs on payment
 * confirm (see confirmInvoicePayment); this route is not the primary path.
 * Vercel Cron: Authorization: Bearer $CRON_SECRET
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    // Catch-up for buyers who closed the payment page before the transfer landed.
    const payments = await autoConfirmOpenInvoices().catch((error: unknown) => {
      console.error("[cron] auto-confirm failed:", error);
      return { checked: 0, confirmed: 0, errors: 1 };
    });
    const result = await runProvisioningBatch(20);
    return Response.json({ ok: true, payments, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "cron failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
