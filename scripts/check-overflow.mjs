// Horizontal-overflow regression check across widths x routes.
// Usage: BASE=https://ai-mark.agency node scripts/check-overflow.mjs
// Requires playwright available (globally installed or in node_modules).
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const WIDTHS = (process.env.WIDTHS || "375,390,412,1440").split(",").map(Number);
const HEIGHTS = { 375: 812, 390: 844, 412: 915, 1440: 900 };
const ROUTES = (
  process.env.ROUTES ||
  "/,/products,/ai-marketing-employee,/ai-business-assistant,/showroom-ai,/partners,/investors,/pay,/ru,/ru/products,/ru/ai-marketing-employee,/ru/ai-business-assistant,/ru/showroom-ai,/ru/partners,/ru/investors,/ru/pay"
).split(",");

const browser = await chromium.launch();
let failures = 0;
for (const width of WIDTHS) {
  const height = HEIGHTS[width] || 900;
  const page = await browser.newPage({ viewport: { width, height } });
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
    await page.waitForTimeout(300);
    const report = await page.evaluate((vw) => {
      const docOver = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const offenders = [];
      if (docOver > 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 1) continue;
          if (r.right > vw + 2) {
            const tag = el.tagName.toLowerCase();
            const cls = typeof el.className === "string" ? el.className.slice(0, 80) : "";
            offenders.push(`${tag}.${cls} right=${Math.round(r.right)}`);
            if (offenders.length >= 8) break;
          }
        }
      }
      return { docOver, offenders };
    }, width);
    if (report.docOver > 1) {
      console.log(`OVERFLOW w=${width} h=${height} ${route} = ${report.docOver}px`);
      for (const row of report.offenders) console.log(`  ${row}`);
      failures++;
    } else {
      console.log(`ok w=${width} ${route}`);
    }
  }
  await page.close();
}
await browser.close();
console.log(failures === 0 ? "OK: no horizontal overflow" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
