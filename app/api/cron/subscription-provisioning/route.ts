import { runProvisioningBatch } from "@/lib/provisioning/worker";

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
    const result = await runProvisioningBatch(20);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "cron failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
