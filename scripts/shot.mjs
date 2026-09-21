// Ad-hoc screenshot helper for design review.
// Usage: BASE=http://localhost:3100 node scripts/shot.mjs <route> <out.png> [width] [height] [scrollY] [clipSelector]
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3100";
const [, , route = "/ru", out = "/tmp/shot.png", width = "1440", height = "1000", scrollY = "0", selector = ""] =
  process.argv;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) }, deviceScaleFactor: 2 });
await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(800);

// Progressive scroll so every IntersectionObserver reveal fires before capture.
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.6);
  const max = document.documentElement.scrollHeight;
  for (let y = 0; y < max; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

if (Number(scrollY) !== 0) {
  await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
  await page.waitForTimeout(1200);
}
if (selector) {
  const el = await page.$(selector);
  if (!el) throw new Error(`selector not found: ${selector}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: false });
}
await browser.close();
console.log("saved", out);
