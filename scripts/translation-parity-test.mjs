#!/usr/bin/env node
/** Report English-fallback parity vs EN reference strings. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractLocaleBlock, collectStrings } from "./translations/extract-locale-block.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ["es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

function allowSameAsEn(s) {
  if (s.length <= 3) return true;
  if (s.startsWith("/") || s.startsWith("http")) return true;
  if (/^[0-9.+→←$]+$/.test(s)) return true;
  if (/^(seed|bars|grid|brand|product|funnel|growth|ai)$/.test(s)) return true;
  if (/^from \$/.test(s)) return true;
  if (/^var\(--/.test(s)) return true;
  if (/^(regional|Format|Status|agency)$/.test(s)) return true;
  return /AI MARK|SHOWROOM|USDT|USDC|RAG|Meta|Telegram|WhatsApp|Instagram|Facebook|Threads|Bitrix|Kommo|HubSpot|PDF|API|SaaS|Reels|CRM|1C|AIME|AIBA|Venture and Marketing|Partner Platform|hello@|\.pro|saas|ecommerce|portals|ai-engines/i.test(
    s,
  );
}

function report(name, filePath, localeKey) {
  const text = readFileSync(filePath, "utf8");
  const en = new Set(collectStrings(extractLocaleBlock(text, "en")));
  console.log(`\n=== ${name} ===`);
  for (const loc of LOCALES) {
    const cur = collectStrings(extractLocaleBlock(text, loc));
    let same = 0;
    let total = 0;
    for (const s of cur) {
      if (!en.has(s)) continue;
      total++;
      if (!allowSameAsEn(s)) same++;
    }
    console.log(`${loc}: ${same} English-fallback strings (of ${total} EN-overlap)`);
  }
}

report(
  "idea-to-business",
  path.join(root, "../content/sections/idea-to-business.ts"),
  "ideaToBusinessCopy",
);
report(
  "operating-model",
  path.join(root, "../content/sections/operating-model.ts"),
  "operatingModelCopy",
);
report("public-chrome", path.join(root, "../content/sections/public-chrome.ts"), "publicChromeCopy");

console.log("\nDone parity report.");
