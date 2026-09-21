// Horizontal-overflow regression check across widths x routes.
// Usage: BASE=https://ai-mark.agency node scripts/check-overflow.mjs
// Requires playwright available (globally installed or in node_modules).
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const WIDTHS = (process.env.WIDTHS || "360,390,768,1024,1280,1440,1920").split(",").map(Number);
const ROUTES = (
  process.env.ROUTES ||
  "/ru,/ru/ai-marketing-employee,/ru/ai-business-assistant,/ru/showroom-ai,/ru/products,/en"
).split(",");

const browser = await chromium.launch();
let failures = 0;
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
    await page.waitForTimeout(400);
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (over > 1) {
      console.log(`OVERFLOW w=${width} ${route} = ${over}px`);
      failures++;
    }
  }
  await page.close();
}
await browser.close();
console.log(failures === 0 ? "OK: no horizontal overflow" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
