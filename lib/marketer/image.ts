import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolveOpenAiCompatibleConfig } from "./openai-compatible";

const STORAGE_BUCKET = "marketer-media";

export type ImageGenResult =
  | { status: "generated"; url: string }
  | { status: "not_configured"; reason: string }
  | { status: "failed"; reason: string };

/**
 * Capability 7: graphic design (images for posts).
 *
 * Generates an image from `prompt` through the configured OpenAI-style
 * provider (OpenAI, or OpenRouter when only `OPENROUTER_API_KEY` is set — see
 * `openai-compatible.ts`), then re-uploads it to a public Supabase Storage
 * bucket, because the Instagram Graph API (`/{ig-user-id}/media`) needs a
 * stable, publicly reachable `image_url` — a model's own hosted URL is
 * short-lived.
 *
 * Without `OPENAI_API_KEY` or `OPENROUTER_API_KEY` this returns
 * `not_configured` rather than throwing, same as every other optional
 * integration in this pipeline: the post still goes through Telegram approval
 * with its caption, and publishing fails with a clear reason instead of the
 * whole cycle crashing.
 */
export async function generateAndStorePostImage(
  prompt: string,
  postId: string,
): Promise<ImageGenResult> {
  const provider = resolveOpenAiCompatibleConfig();
  if (!provider) {
    return {
      status: "not_configured",
      reason:
        "neither OPENAI_API_KEY nor OPENROUTER_API_KEY is set; see docs/marketer-setup.md",
    };
  }

  let base64: string;
  try {
    const res = await fetch(provider.imagesUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        "Content-Type": "application/json",
        ...provider.extraHeaders,
      },
      body: JSON.stringify({
        model: provider.imageModel,
        prompt,
        n: 1,
        // OpenAI takes an explicit pixel size; OpenRouter's image models are
        // sized per-model (aspect_ratio/resolution) and reject foreign fields.
        ...(provider.provider === "openai" ? { size: "1024x1024" } : {}),
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) {
      const body = await res.text();
      return {
        status: "failed",
        reason: `${provider.label} Images API ${res.status}: ${body.slice(0, 300)}`,
      };
    }
    const data = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) return { status: "failed", reason: `${provider.label} Images API returned no image` };
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
