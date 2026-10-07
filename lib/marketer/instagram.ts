import "server-only";

/**
 * Capability 9 (auto-publish an approved post to Instagram) and capability 11
 * (post-result analysis from Instagram Insights). Meta Graph API, Content
 * Publishing flow: create a media container, then publish it.
 *
 * The Graph API itself has no "publish at this time" parameter for organic
 * content (that only exists for ads). "Scheduled time" in this pipeline is
 * our own: `marketer_posts.scheduled_at` + the `/api/cron/marketer-publish`
 * cron decide *when* to call this, not Graph API. Documented in
 * docs/marketer-setup.md so that gap isn't a silent surprise.
 */

function graphApiVersion(): string {
  return process.env.META_GRAPH_API_VERSION?.trim() || "v21.0";
}

export type InstagramConnection = {
  igUserId: string;
  pageAccessToken: string;
};

export type PublishResult =
  | { ok: true; mediaId: string }
  | { ok: false; error: string };

export async function publishImagePost(
  connection: InstagramConnection,
  input: { imageUrl: string; caption: string },
): Promise<PublishResult> {
  const base = `https://graph.facebook.com/${graphApiVersion()}`;

  try {
    const createRes = await fetch(`${base}/${connection.igUserId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: input.imageUrl,
        caption: input.caption,
        access_token: connection.pageAccessToken,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    const created = (await createRes.json()) as { id?: string; error?: { message: string } };
    if (!createRes.ok || !created.id) {
      return { ok: false, error: created.error?.message ?? `media container creation failed (HTTP ${createRes.status})` };
    }

    const publishRes = await fetch(`${base}/${connection.igUserId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: created.id,
        access_token: connection.pageAccessToken,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    const published = (await publishRes.json()) as { id?: string; error?: { message: string } };
    if (!publishRes.ok || !published.id) {
      return { ok: false, error: published.error?.message ?? `media publish failed (HTTP ${publishRes.status})` };
    }

    return { ok: true, mediaId: published.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { ok: false, error: message };
  }
}

export type InstagramInsights = {
  impressions: number | null;
  reach: number | null;
  likes: number | null;
  comments: number | null;
  saves: number | null;
  shares: number | null;
  raw: unknown;
};

export type InsightsResult =
  | { ok: true; data: InstagramInsights }
  | { ok: false; error: string };

const METRICS = ["reach", "likes", "comments", "saved", "shares"] as const;

export async function fetchPostInsights(
  connection: InstagramConnection,
  mediaId: string,
): Promise<InsightsResult> {
  const base = `https://graph.facebook.com/${graphApiVersion()}`;
  try {
    const url = `${base}/${mediaId}/insights?metric=${METRICS.join(",")}&access_token=${encodeURIComponent(connection.pageAccessToken)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    const body = (await res.json()) as {
      data?: { name: string; values: { value: number }[] }[];
      error?: { message: string };
    };
    if (!res.ok || !body.data) {
      return { ok: false, error: body.error?.message ?? `insights fetch failed (HTTP ${res.status})` };
    }
    const metric = (name: string) =>
      body.data?.find((m) => m.name === name)?.values?.[0]?.value ?? null;
    return {
      ok: true,
      data: {
        impressions: null,
        reach: metric("reach"),
        likes: metric("likes"),
        comments: metric("comments"),
        saves: metric("saved"),
        shares: metric("shares"),
        raw: body,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { ok: false, error: message };
  }
}
