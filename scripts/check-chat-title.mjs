// Opens the AI chat and asserts the widget header no longer says "AlexDev".
// Usage: BASE=http://127.0.0.1:3100 node scripts/check-chat-title.mjs
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://127.0.0.1:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(1500);

await page.click(".cl-fab");
await page.waitForTimeout(600);
// channel 1 = AI chat
await page.click(".cl-menu .cl-item-ai");
await page.waitForTimeout(4000);

const info = await page.evaluate(() => {
  const root = document.querySelector(".aiba-root");
  const titleWrap = document.querySelector(".aiba-root .aiba-header-title");
  const title = titleWrap?.querySelector("span:not(.aiba-dot)")?.textContent?.trim() ?? null;
  const panel = document.querySelector(".aiba-root .aiba-panel");
  return {
    widgetMounted: !!root,
    panelOpen: !!(panel && !panel.hidden && panel.style.display !== "none"),
    title,
    mentionsAlexDevInWidget: !!root && /alexdev/i.test(root.textContent || ""),
    bodyText: (root?.textContent || "").replace(/\s+/g, " ").slice(0, 180),
  };
});

console.log(`widget mounted: ${info.widgetMounted} | panel open: ${info.panelOpen}`);
console.log(`panel header title: ${JSON.stringify(info.title)}`);
console.log(`"AlexDev" anywhere in widget text: ${info.mentionsAlexDevInWidget}`);
console.log(`widget text sample: ${info.bodyText}`);

await browser.close();
process.exit(info.title === "AI MARK" && !info.mentionsAlexDevInWidget ? 0 : 1);
