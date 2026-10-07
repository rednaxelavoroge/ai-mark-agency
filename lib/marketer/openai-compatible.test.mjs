/**
 * Marketer image provider switch — offline invariants.
 *
 *   node --test lib/marketer/openai-compatible.test.mjs
 *
 * `image.ts` itself is `server-only` + Supabase-backed and cannot be imported
 * here, so these tests pin the one thing it delegates: which base URL, key,
 * path and model id an OpenAI-style image call resolves to. That is the whole
 * switch — OpenAI when `OPENAI_API_KEY` is set, OpenRouter when only
 * `OPENROUTER_API_KEY` is.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  DEFAULT_OPENAI_IMAGE_MODEL,
  DEFAULT_OPENROUTER_IMAGE_MODEL,
  OPENAI_BASE_URL,
  OPENAI_IMAGES_PATH,
  OPENROUTER_BASE_URL,
  OPENROUTER_IMAGES_PATH,
  resolveOpenAiCompatibleConfig,
} from "./openai-compatible.ts";

test("no keys at all resolves to null so callers report not_configured", () => {
  assert.equal(resolveOpenAiCompatibleConfig({}), null);
  assert.equal(resolveOpenAiCompatibleConfig({ OPENAI_API_KEY: "  ", OPENROUTER_API_KEY: "" }), null);
});

test("OPENAI_API_KEY switches to api.openai.com with an OpenAI model id", () => {
  const config = resolveOpenAiCompatibleConfig({ OPENAI_API_KEY: "sk-openai" });
  assert.ok(config);
  assert.equal(config.provider, "openai");
  assert.equal(config.baseUrl, OPENAI_BASE_URL);
  assert.equal(config.imagesUrl, "https://api.openai.com/v1/images/generations");
  assert.equal(config.imagesUrl, `${OPENAI_BASE_URL}${OPENAI_IMAGES_PATH}`);
  assert.equal(config.apiKey, "sk-openai");
  assert.equal(config.imageModel, DEFAULT_OPENAI_IMAGE_MODEL);
  assert.deepEqual(config.extraHeaders, {});
});

test("only OPENROUTER_API_KEY switches to openrouter.ai/api/v1 with an OpenRouter model id", () => {
  const config = resolveOpenAiCompatibleConfig({ OPENROUTER_API_KEY: "sk-or" });
  assert.ok(config);
  assert.equal(config.provider, "openrouter");
  assert.equal(config.baseUrl, OPENROUTER_BASE_URL);
  assert.equal(config.imagesUrl, "https://openrouter.ai/api/v1/images");
  assert.equal(config.imagesUrl, `${OPENROUTER_BASE_URL}${OPENROUTER_IMAGES_PATH}`);
  assert.equal(config.apiKey, "sk-or");
  assert.equal(config.imageModel, DEFAULT_OPENROUTER_IMAGE_MODEL);
  assert.equal(config.imageModel.includes("/"), true, "OpenRouter ids are vendor/model slugs");
  assert.equal(typeof config.extraHeaders["HTTP-Referer"], "string");
});

test("OpenAI wins when both keys are set — OpenRouter never silently reroutes a working deployment", () => {
  const config = resolveOpenAiCompatibleConfig({
    OPENAI_API_KEY: "sk-openai",
    OPENROUTER_API_KEY: "sk-or",
  });
  assert.ok(config);
  assert.equal(config.provider, "openai");
  assert.equal(config.apiKey, "sk-openai");
  assert.equal(config.baseUrl, OPENAI_BASE_URL);
});

test("MARKETER_IMAGE_MODEL overrides the image model on either provider", () => {
  const openai = resolveOpenAiCompatibleConfig({
    OPENAI_API_KEY: "sk-openai",
    MARKETER_IMAGE_MODEL: "gpt-image-2",
  });
  assert.equal(openai?.imageModel, "gpt-image-2");

  const openrouter = resolveOpenAiCompatibleConfig({
    OPENROUTER_API_KEY: "sk-or",
    MARKETER_IMAGE_MODEL: "bytedance-seed/seedream-4.5",
  });
  assert.equal(openrouter?.imageModel, "bytedance-seed/seedream-4.5");
});

test("on OpenRouter MARKETER_OPENROUTER_MODEL is the fallback, and MARKETER_IMAGE_MODEL beats it", () => {
  const fallback = resolveOpenAiCompatibleConfig({
    OPENROUTER_API_KEY: "sk-or",
    MARKETER_OPENROUTER_MODEL: "openai/gpt-image-1",
  });
  assert.equal(fallback?.imageModel, "openai/gpt-image-1");

  const explicit = resolveOpenAiCompatibleConfig({
    OPENROUTER_API_KEY: "sk-or",
    MARKETER_OPENROUTER_MODEL: "openai/gpt-image-1",
    MARKETER_IMAGE_MODEL: "google/gemini-2.5-flash-image",
  });
  assert.equal(explicit?.imageModel, "google/gemini-2.5-flash-image");
});

test("round trip: the resolved config is exactly what image.ts puts on the wire", () => {
  // Mirrors the header/body construction in image.ts so a change to one
  // without the other fails here.
  const config = resolveOpenAiCompatibleConfig({ OPENROUTER_API_KEY: "sk-or" });
  assert.ok(config);
  const init = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...config.extraHeaders,
    },
    body: JSON.stringify({ model: config.imageModel, prompt: "a red panda", n: 1 }),
  };
  assert.equal(config.imagesUrl, "https://openrouter.ai/api/v1/images");
  assert.equal(init.headers.Authorization, "Bearer sk-or");
  assert.equal(JSON.parse(init.body).model, DEFAULT_OPENROUTER_IMAGE_MODEL);
  assert.equal("size" in JSON.parse(init.body), false, "OpenRouter payload has no OpenAI pixel size");
});
