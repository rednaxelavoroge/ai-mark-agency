import "server-only";

import { generateText, parseJsonResponse } from "./llm";
import type { ContentPlanItem, MarketerProfileBrief, Strategy } from "./types";

type PostCopyResult =
  | { ok: true; caption: string; script: string | null; imagePrompt: string; model: string }
  | { ok: false; error: string };

/**
 * Capabilities 5-6: post text, and the reel/story script when the plan item
 * calls for one. One call produces both so the caption and the visual script
 * stay consistent with each other and with the content pillar they serve.
 *
 * `regenerationComment` is the client's Telegram rejection comment — set only
 * when this call is producing the next version of a rejected post
 * (capability 10).
 */
export async function generatePostCopy(
  brief: MarketerProfileBrief,
  strategy: Strategy,
  planItem: ContentPlanItem,
  options?: { previousCaption?: string; regenerationComment?: string },
): Promise<PostCopyResult> {
  const needsScript = planItem.kind !== "post";

  const result = await generateText({
    system:
      "You are a social media copywriter. Reply with ONLY a single JSON object, no prose, no markdown fence. " +
      `Shape: {"caption": string, ${needsScript ? '"script": string, ' : ""}"image_prompt": string}. ` +
      "caption is the Instagram caption (with line breaks and relevant hashtags). " +
      (needsScript
        ? "script is a shot-by-shot voiceover/on-screen-text script for a short vertical video. "
        : "") +
      "image_prompt is a short visual brief for an image generator (no text overlay instructions).",
    prompt: [
      `Business:\n${brief.businessName} — ${brief.businessDescription}`,
      `Strategy:\n${JSON.stringify(strategy)}`,
      `Plan item:\n${JSON.stringify(planItem)}`,
      options?.regenerationComment
        ? [
            `The previous version was rejected by the client.`,
            options.previousCaption ? `Previous caption:\n${options.previousCaption}` : null,
            `Client's comment on what to change:\n${options.regenerationComment}`,
            "Produce a new version that addresses this comment directly.",
          ]
            .filter(Boolean)
            .join("\n")
        : null,
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  if (!result.ok) return { ok: false, error: result.error };

  const data = parseJsonResponse<{ caption: string; script?: string; image_prompt: string }>(
    result.text,
  );
  if (!data) return { ok: false, error: "model did not return valid JSON" };

  return {
    ok: true,
    caption: data.caption,
    script: data.script ?? null,
    imagePrompt: data.image_prompt,
    model: result.model,
  };
}
