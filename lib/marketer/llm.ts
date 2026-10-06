import "server-only";

/**
 * Text generation for the Marketer pipeline (research, audience analysis,
 * strategy, content plan, post copy, reel/story scripts): capabilities 1-6
 * and 12 of the AIME promise all reduce to "ask a model for structured text
 * about this business". One call site keeps the prompt/response contract
 * (JSON-only, model id, error shape) identical across every generator in
 * `research.ts` and `copywriting.ts`.
 *
 * Uses the Anthropic Messages API directly over fetch — no SDK dependency —
 * so this module has the same "skip, don't throw" shape as `lib/email/send.ts`
 * when ANTHROPIC_API_KEY is unset.
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";

export type LlmResult =
  | { ok: true; text: string; model: string }
  | { ok: false; error: string; notConfigured?: true };

export function llmConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export async function generateText(input: {
  system: string;
  prompt: string;
  maxTokens?: number;
}): Promise<LlmResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      notConfigured: true,
      error: "ANTHROPIC_API_KEY not set; see docs/marketer-setup.md",
    };
  }

  const model = process.env.MARKETER_LLM_MODEL?.trim() || DEFAULT_MODEL;

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: input.maxTokens ?? 2000,
        system: input.system,
        messages: [{ role: "user", content: input.prompt }],
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Anthropic API ${res.status}: ${body.slice(0, 300)}` };
    }

    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text = data.content?.find((block) => block.type === "text")?.text ?? "";
    if (!text) {
      return { ok: false, error: "Anthropic API returned no text block" };
    }
    return { ok: true, text, model };
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { ok: false, error: message };
  }
}

/**
 * Strips a ```json fence (models add one even when told not to) and parses.
 * Returns null instead of throwing so callers can fall back cleanly.
 */
export function parseJsonResponse<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  try {
    return JSON.parse(candidate.trim()) as T;
  } catch {
    return null;
  }
}
