/**
 * Provider resolution for the OpenAI-style HTTP calls in this pipeline.
 *
 * Today that is exactly one call — image generation for posts (capability 7)
 * in `image.ts` — and it speaks the OpenAI request/response shape. OpenRouter
 * implements the same shape, so a deployment without a direct OpenAI account
 * can still run the pipeline by pointing those calls at OpenRouter instead:
 *
 *   OPENAI_API_KEY set              -> api.openai.com/v1, OpenAI model ids
 *   else OPENROUTER_API_KEY set     -> openrouter.ai/api/v1, OpenRouter model ids
 *   neither                         -> null, callers return "not_configured"
 *
 * OpenAI wins when both are set, so adding an OpenRouter key can never
 * silently reroute a deployment that already works against OpenAI.
 *
 * The text path (`llm.ts`, Anthropic Messages API) is deliberately not
 * involved: different request and response shape, unchanged by this module.
 *
 * Kept free of `server-only`, Supabase and any other import so the offline
 * tests can exercise it directly under `node --test` — `image.ts` remains the
 * only module here that needs a live runtime.
 */

export const OPENAI_BASE_URL = "https://api.openai.com/v1";
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

/**
 * Same payload, different path: OpenAI serves it at `/images/generations`,
 * OpenRouter at `/images`.
 * https://openrouter.ai/docs/features/multimodal/image-generation
 */
export const OPENAI_IMAGES_PATH = "/images/generations";
export const OPENROUTER_IMAGES_PATH = "/images";

export const DEFAULT_OPENAI_IMAGE_MODEL = "gpt-image-1";
/** Cheapest OpenRouter image model that matches the OpenAI response shape. */
export const DEFAULT_OPENROUTER_IMAGE_MODEL = "google/gemini-2.5-flash-image";

export type OpenAiCompatibleProvider = "openai" | "openrouter";

export type OpenAiCompatibleConfig = {
  provider: OpenAiCompatibleProvider;
  /** Human-readable provider name for error and status strings. */
  label: string;
  baseUrl: string;
  /** Fully qualified image generation URL: `baseUrl` + the provider's path. */
  imagesUrl: string;
  apiKey: string;
  imageModel: string;
  /** Provider-specific extras merged into every request's headers. */
  extraHeaders: Record<string, string>;
};

type Env = Record<string, string | undefined>;

/**
 * Returns the provider to send OpenAI-style calls to, or null when neither
 * key is set (the caller then reports "not configured" instead of throwing).
 *
 * Model ids are provider-specific — an OpenAI id like `gpt-image-1` is not
 * valid on OpenRouter, which wants `vendor/model` slugs — so the default
 * changes with the provider. `MARKETER_IMAGE_MODEL` overrides the image model
 * on both; on OpenRouter, `MARKETER_OPENROUTER_MODEL` is the general OpenRouter
 * model override and serves as the fallback when it is unset.
 */
export function resolveOpenAiCompatibleConfig(env: Env = process.env): OpenAiCompatibleConfig | null {
  const openaiKey = env.OPENAI_API_KEY?.trim();
  if (openaiKey) {
    return {
      provider: "openai",
      label: "OpenAI",
      baseUrl: OPENAI_BASE_URL,
      imagesUrl: `${OPENAI_BASE_URL}${OPENAI_IMAGES_PATH}`,
      apiKey: openaiKey,
      imageModel: env.MARKETER_IMAGE_MODEL?.trim() || DEFAULT_OPENAI_IMAGE_MODEL,
      extraHeaders: {},
    };
  }

  const openrouterKey = env.OPENROUTER_API_KEY?.trim();
  if (!openrouterKey) return null;

  return {
    provider: "openrouter",
    label: "OpenRouter",
    baseUrl: OPENROUTER_BASE_URL,
    imagesUrl: `${OPENROUTER_BASE_URL}${OPENROUTER_IMAGES_PATH}`,
    apiKey: openrouterKey,
    imageModel:
      env.MARKETER_IMAGE_MODEL?.trim() ||
      env.MARKETER_OPENROUTER_MODEL?.trim() ||
      DEFAULT_OPENROUTER_IMAGE_MODEL,
    // OpenRouter asks for these on every request; they are attribution only,
    // so a stale value is harmless.
    extraHeaders: {
      "HTTP-Referer": "https://ai-mark.agency",
      "X-Title": "AI MARK — Marketer (AIME)",
    },
  };
}
