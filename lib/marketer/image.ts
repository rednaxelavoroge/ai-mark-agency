import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const STORAGE_BUCKET = "marketer-media";

export type ImageGenResult =
  | { status: "generated"; url: string }
  | { status: "not_configured"; reason: string }
  | { status: "failed"; reason: string };

/**
 * Capability 7: graphic design (images for posts).
 *
 * Generates an image from `prompt` with the OpenAI Images API, then
 * re-uploads it to a public Supabase Storage bucket, because the Instagram
 * Graph API (`/{ig-user-id}/media`) needs a stable, publicly reachable
 * `image_url` — a model's own hosted URL is short-lived.
 *
 * Without `OPENAI_API_KEY` this returns `not_configured` rather than
 * throwing, same as every other optional integration in this pipeline: the
 * post still goes through Telegram approval with its caption, and publishing
 * fails with a clear reason instead of the whole cycle crashing.
 */
export async function generateAndStorePostImage(
  prompt: string,
  postId: string,
): Promise<ImageGenResult> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return {
      status: "not_configured",
      reason: "OPENAI_API_KEY not set; see docs/marketer-setup.md",
    };
  }

  let base64: string;
  try {
    const res = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.MARKETER_IMAGE_MODEL?.trim() || "gpt-image-1",
        prompt,
        size: "1024x1024",
        n: 1,
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) {
      const body = await res.text();
      return { status: "failed", reason: `OpenAI Images API ${res.status}: ${body.slice(0, 300)}` };
    }
    const data = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) return { status: "failed", reason: "OpenAI Images API returned no image" };
    base64 = b64;
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { status: "failed", reason: message };
  }

  try {
    const admin = createSupabaseAdminClient();
    const bytes = Buffer.from(base64, "base64");
    const path = `${postId}.png`;
    const upload = await admin.storage.from(STORAGE_BUCKET).upload(path, bytes, {
      contentType: "image/png",
      upsert: true,
    });
    if (upload.error) {
      return {
        status: "failed",
        reason: `Supabase Storage upload failed: ${upload.error.message}. Create the "${STORAGE_BUCKET}" public bucket first — see docs/marketer-setup.md.`,
      };
    }
    const { data } = admin.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return { status: "generated", url: data.publicUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "storage upload failed";
    return { status: "failed", reason: message };
  }
}
