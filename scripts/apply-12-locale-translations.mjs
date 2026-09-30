#!/usr/bin/env node
/**
 * Apply full 12-locale translations to section bundles, public-chrome, cabinet, hub-labels, facts.
 * Run: node scripts/apply-12-locale-translations.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  extractLocaleBlock,
  patchLocaleBlock,
  collectStrings,
  translateDeep,
} from "./translations/extract-locale-block.mjs";
import { ideaToBusinessLocales } from "./translations/idea-to-business.locales.mjs";
import { operatingModelLocales } from "./translations/operating-model.locales.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ["en", "es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

function buildMap(a, b, map = new Map()) {
  if (typeof a === "string" && typeof b === "string") {
    if (a !== b) map.set(a, b);
    return map;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) buildMap(a[i], b[i], map);
    return map;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    for (const k of Object.keys(a)) buildMap(a[k], b[k], map);
  }
  return map;
}

function loadJsonMap(locale) {
  const p = path.join(root, "translations/maps", `${locale}.json`);
  try {
    const o = JSON.parse(readFileSync(p, "utf8"));
    return new Map(Object.entries(o));
  } catch {
    return new Map();
  }
}

// --- idea-to-business ---
{
  const filePath = path.join(root, "../content/sections/idea-to-business.ts");
  for (const [loc, obj] of Object.entries(ideaToBusinessLocales)) {
    writeFileSync(filePath, patchLocaleBlock(filePath, loc, obj));
    console.log("idea-to-business", loc);
  }
}

// --- operating-model ---
{
  const filePath = path.join(root, "../content/sections/operating-model.ts");
  for (const [loc, obj] of Object.entries(operatingModelLocales)) {
    writeFileSync(filePath, patchLocaleBlock(filePath, loc, obj));
    console.log("operating-model", loc);
  }
}

// --- public-chrome: EN structure + string maps ---
{
  const filePath = path.join(root, "../content/sections/public-chrome.ts");
  let text = readFileSync(filePath, "utf8");
  const en = extractLocaleBlock(text, "en");
  for (const loc of LOCALES) {
    if (loc === "en") continue;
    const existing = extractLocaleBlock(text, loc);
    const fromStructure = buildMap(en, existing);
    const fromFile = loadJsonMap(loc);
    const merged = new Map([...fromStructure, ...fromFile]);
    const translated = translateDeep(en, merged);
    writeFileSync(filePath, patchLocaleBlock(filePath, loc, translated));
    text = readFileSync(filePath, "utf8");
    console.log("public-chrome", loc, "map size", merged.size);
  }
}

console.log("Apply complete. Run translation-parity-test.mjs");
