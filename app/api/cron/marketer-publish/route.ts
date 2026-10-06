import { publishDuePosts } from "@/lib/marketer/service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Capability 9. Vercel Cron calls GET with `Authorization: Bearer $CRON_SECRET`
 * (same convention as /api/cron/advance-sponsor-lock). Publishes every
 * approved post whose `scheduled_at` has arrived — this is where "scheduled
 * time" is actually enforced, since the Graph API has no native scheduling
 * for organic posts.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const summary = await publishDuePosts();
    return Response.json({ ok: true, ...summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "cron failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
