import { readFileSync } from "node:fs";

/** Extract a locale object from a TS file like `"es": { ... },` */
export function extractLocaleBlock(text, localeKey) {
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const blockStr = text.slice(start, i + 1).replace(/^"\w+":\s*/, "");
  return Function(`"use strict"; return (${blockStr});`)();
}

export function patchLocaleBlock(filePath, localeKey, newObj) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found in ${filePath}`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const before = text.slice(0, start);
  const after = text.slice(i);
  const injected = `"${localeKey}": ${JSON.stringify(newObj, null, 2)}`;
  return before + injected + after;
}

export function collectStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

export function translateDeep(value, map) {
  if (typeof value === "string") {
    if (map.has(value)) return map.get(value);
    return value;
  }
  if (Array.isArray(value)) return value.map((v) => translateDeep(v, map));
  if (value && typeof value === "object") {
    const o = {};
    for (const [k, v] of Object.entries(value)) o[k] = translateDeep(v, map);
    return o;
  }
  return value;
}
