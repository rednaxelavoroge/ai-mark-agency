import { collectPostInsights } from "@/lib/marketer/service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Capability 11. Vercel Cron calls GET with `Authorization: Bearer $CRON_SECRET`.
 * Pulls Instagram Insights for posts published in the last 30 days. Run this
 * on a schedule a few hours after `marketer-publish` so results have had a
 * chance to accrue; feed the result into `improveStrategyFromResults`
 * (capability 12) via /api/marketer/run-cycle?mode=improve.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const summary = await collectPostInsights();
    return Response.json({ ok: true, ...summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "cron failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
