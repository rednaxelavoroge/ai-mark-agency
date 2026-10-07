import { improveStrategyFromResults, runResearchAndContentCycle } from "@/lib/marketer/service";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * Manual trigger for one research/content cycle (capabilities 1-6, 8) or the
 * strategy-improvement cycle (capability 12). There is no admin UI for this
 * yet — the operator calls it directly, same bearer convention as the cron
 * routes — see docs/marketer-setup.md "Running a cycle".
 *
 * Body: { "profileId": "<uuid>", "mode"?: "initial" | "improve" }
 */
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: { profileId?: string; mode?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  if (!body.profileId) {
    return Response.json({ ok: false, error: "profileId is required" }, { status: 400 });
  }

  const result =
    body.mode === "improve"
      ? await improveStrategyFromResults(body.profileId)
      : await runResearchAndContentCycle(body.profileId);

  if (!result.ok) return Response.json({ ok: false, error: result.error }, { status: 422 });
  return Response.json(result);
}
