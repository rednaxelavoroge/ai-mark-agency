import "server-only";

import { generateText, parseJsonResponse } from "./llm";
import type {
  AudienceAnalysis,
  ContentPlan,
  MarketerProfileBrief,
  NicheResearch,
  Strategy,
} from "./types";

const JSON_ONLY = "Reply with ONLY a single JSON object, no prose, no markdown fence.";

function briefLine(brief: MarketerProfileBrief): string {
  return [
    `Business: ${brief.businessName}`,
    `Description: ${brief.businessDescription}`,
    brief.website ? `Website: ${brief.website}` : null,
    brief.niche ? `Niche: ${brief.niche}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Capability 1: research of niche, business and competitors. */
export async function generateNicheResearch(
  brief: MarketerProfileBrief,
): Promise<{ ok: true; data: NicheResearch; model: string } | { ok: false; error: string }> {
  const result = await generateText({
    system:
      "You are a market research analyst for a social media marketing agency. " +
      JSON_ONLY +
      ' Shape: {"summary": string, "market_trends": string[], "competitors": [{"name": string, "strengths": string, "weaknesses": string}]}',
    prompt: `Research this business's niche and its direct competitors on Instagram.\n\n${briefLine(brief)}`,
  });
  if (!result.ok) return { ok: false, error: result.error };
  const data = parseJsonResponse<NicheResearch>(result.text);
  if (!data) return { ok: false, error: "model did not return valid JSON" };
  return { ok: true, data, model: result.model };
}

/** Capability 2: target audience analysis. */
export async function generateAudienceAnalysis(
  brief: MarketerProfileBrief,
  research: NicheResearch,
): Promise<{ ok: true; data: AudienceAnalysis; model: string } | { ok: false; error: string }> {
  const result = await generateText({
    system:
      "You are a target audience researcher. " +
      JSON_ONLY +
      ' Shape: {"segments": [{"name": string, "description": string, "pains": string[], "desires": string[]}]}',
    prompt: `Business:\n${briefLine(brief)}\n\nMarket research:\n${JSON.stringify(research)}\n\nIdentify 2-4 target audience segments on Instagram for this business.`,
  });
  if (!result.ok) return { ok: false, error: result.error };
  const data = parseJsonResponse<AudienceAnalysis>(result.text);
  if (!data) return { ok: false, error: "model did not return valid JSON" };
  return { ok: true, data, model: result.model };
}

/** Capability 3: strategy and targeting ideas. */
export async function generateStrategy(
  brief: MarketerProfileBrief,
  research: NicheResearch,
  audience: AudienceAnalysis,
  improvementContext?: string,
): Promise<{ ok: true; data: Strategy; model: string } | { ok: false; error: string }> {
  const result = await generateText({
    system:
      "You are a social media strategist. " +
      JSON_ONLY +
      ' Shape: {"positioning": string, "pillars": string[], "targeting_ideas": string[]}',
    prompt: [
      `Business:\n${briefLine(brief)}`,
      `Market research:\n${JSON.stringify(research)}`,
      `Audience:\n${JSON.stringify(audience)}`,
      improvementContext
        ? `Results from the previous content cycle, use them to adjust the strategy:\n${improvementContext}`
        : null,
      "Produce a positioning statement, 3-5 content pillars, and targeting ideas for Instagram/Facebook ads.",
    ]
      .filter(Boolean)
      .join("\n\n"),
  });
  if (!result.ok) return { ok: false, error: result.error };
  const data = parseJsonResponse<Strategy>(result.text);
  if (!data) return { ok: false, error: "model did not return valid JSON" };
  return { ok: true, data, model: result.model };
}

/** Capability 4: content plan. */
export async function generateContentPlan(
  brief: MarketerProfileBrief,
  strategy: Strategy,
  periodDays = 14,
): Promise<{ ok: true; data: ContentPlan; model: string } | { ok: false; error: string }> {
  const result = await generateText({
    system:
      "You are a content planner for Instagram. " +
      JSON_ONLY +
      ' Shape: {"period_days": number, "items": [{"day": number, "kind": "post"|"reel"|"story", "topic": string, "goal": string}]}',
    prompt: `Business:\n${briefLine(brief)}\n\nStrategy:\n${JSON.stringify(strategy)}\n\nBuild a ${periodDays}-day content plan, roughly every 2-3 days, mixing post/reel/story kinds.`,
    maxTokens: 3000,
  });
  if (!result.ok) return { ok: false, error: result.error };
  const data = parseJsonResponse<ContentPlan>(result.text);
  if (!data) return { ok: false, error: "model did not return valid JSON" };
  return { ok: true, data, model: result.model };
}
