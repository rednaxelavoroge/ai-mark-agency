import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Daily hold advance. Vercel Cron calls GET with
 * `Authorization: Bearer $CRON_SECRET`. The route only calls the existing
 * `advance_sponsor_lock` function: confirmed sales whose 14-day hold has
 * elapsed move to locked, and their commission entries become payable.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const admin = createSupabaseAdminClient();
    const result = await admin.rpc("advance_sponsor_lock", {});
    if (result.error) {
      return Response.json({ ok: false, error: result.error.message }, { status: 500 });
    }
    return Response.json({ ok: true, locked: result.data ?? 0 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "cron failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
