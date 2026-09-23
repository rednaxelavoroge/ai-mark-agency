// Focused check: which lockup image is painted at each breakpoint, and what (if
// anything) overflows the document at narrow widths.
// Usage: BASE=http://127.0.0.1:3100 node scripts/brand-check.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:3100";
const OUT = "/tmp/brand4";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const w of [320, 360, 390, 430, 639, 640, 768, 1280]) {
  const page = await browser.newPage({ viewport: { width: w, height: 820 }, deviceScaleFactor: 2 });
  await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(1600);

  const info = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll(".brand-logo")].filter((el) => el.currentSrc).map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { src: (el.currentSrc || el.src).split("/").pop(), display: cs.display, w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    });
    const plate = document.querySelector(".brand-plate");
    const pr = plate.getBoundingClientRect();
    const docW = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > docW + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 70),
          left: +r.left.toFixed(0),
          right: +r.right.toFixed(0),
        });
      }
    }
    return {
      imgs,
      plate: { w: +pr.width.toFixed(1), h: +pr.height.toFixed(1) },
      overflow: document.documentElement.scrollWidth - docW,
      offenders: offenders.slice(0, 8),
      offendersTotal: offenders.length,
    };
  });

  console.log(`\n== width ${w}`);
  for (const i of info.imgs) console.log(`   ${i.src} display=${i.display} box=${i.w}x${i.h}`);
  console.log(`   plate=${info.plate.w}x${info.plate.h} overflow=${info.overflow} offenders=${info.offendersTotal}`);
  for (const o of info.offenders) console.log(`     ${o.tag}.${o.cls} [${o.left}..${o.right}]`);

  await page.screenshot({ path: `${OUT}/w${w}-header.png`, clip: { x: 0, y: 0, width: w, height: Math.min(90, 820) } });
  await page.close();
}
await browser.close();
