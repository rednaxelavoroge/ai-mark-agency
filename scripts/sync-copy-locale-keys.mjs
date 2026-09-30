/**
 * Ensures every content/locales/*.ts bundle has the same keys as en (fills gaps from en).
 */
import { writeFileSync, readdirSync } from "node:fs";
import { copyEn } from "../content/locales/en.ts";

const dir = new URL("../content/locales/", import.meta.url);

function fillMissing(en, loc) {
  if (Array.isArray(en)) {
    const base = Array.isArray(loc) ? loc : [];
    return en.map((item, index) => fillMissing(item, base[index]));
  }
  if (en === null || typeof en !== "object") {
    return loc !== undefined ? loc : en;
  }
  const locObj = loc && typeof loc === "object" && !Array.isArray(loc) ? loc : {};
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const key of Object.keys(en)) {
    out[key] = fillMissing(en[key], locObj[key]);
  }
  return out;
}

const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "en.ts");

for (const file of files) {
  const loc = file.replace(/\.ts$/, "");
  const mod = await import(new URL(file, dir).href);
  const exportName = `copy${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  const current = mod[exportName];
  const merged = fillMissing(copyEn, current);
  const body = `import type { Copy } from "../copy";

export const ${exportName}: Copy = ${JSON.stringify(merged, null, 2)} as Copy;
`;
  writeFileSync(new URL(file, dir), body);
  console.log("Synced", file);
}
