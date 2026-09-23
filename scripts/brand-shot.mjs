// Minimal header shot at one viewport, for visual sign-off.
// Usage: BASE=http://127.0.0.1:3100 node scripts/brand-shot.mjs <width> <out.png>
import { chromium } from "playwright";
const BASE = process.env.BASE || "http://127.0.0.1:3100";
const [, , w = "320", out = "/tmp/header.png"] = process.argv;
const width = Number(w);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 2 });
await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height: 72 } });
console.log("saved", out, width);
await browser.close();
