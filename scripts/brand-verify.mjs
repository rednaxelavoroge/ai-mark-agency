// Brand verification: viewport-accurate header/footer captures.
// Deliberately does NOT pre-scroll: after the site's scroll-driven reveals run,
// a subsequent sticky-header screenshot at scrollY=0 can come back blank in
// headless Chromium, so each page is captured fresh.
// Usage: BASE=http://127.0.0.1:3100 node scripts/brand-verify.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const BASE = process.env.BASE || "http://127.0.0.1:3100";
const OUT = "/tmp/brand3";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const report = [];

async function shoot(width, height, route, tag, dpr = 2) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr });
  const resp = await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(1500);

  const metrics = await page.evaluate(() => {
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    };
    const plate = document.querySelector(".brand-plate");
    const imgs = [...document.querySelectorAll(".brand-logo")].map((el) => ({
      src: (el.currentSrc || el.src).split("/").pop(),
      visible: el.getBoundingClientRect().height > 0,
      h: +el.getBoundingClientRect().height.toFixed(1),
    }));
    return {
      header: box(document.querySelector("header")),
      plate: box(plate),
      imgs,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      theme: document.documentElement.getAttribute("data-theme"),
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim().slice(0, 50) ?? null,
    };
  });

  await page.screenshot({ path: `${OUT}/${tag}-top.png` });
  if (metrics.header) {
    const h = metrics.header;
    execFileSync("magick", [
      `${OUT}/${tag}-top.png`, "-crop",
      `${Math.round(h.w * dpr)}x${Math.round(h.h * dpr)}+0+0`, "+repage",
      `${OUT}/${tag}-header.png`,
    ]);
  }

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(900);
  const fm = await page.evaluate(() => {
    const f = document.querySelector("footer");
    if (!f) return null;
    const r = f.getBoundingClientRect();
    return { y: r.y, w: r.width, h: r.height };
  });
  if (fm) {
    await page.screenshot({ path: `${OUT}/${tag}-bottom.png` });
    const y = Math.max(0, Math.min(Math.round(fm.y * dpr), height * dpr - 2));
    const hh = Math.max(2, Math.min(Math.round(fm.h * dpr), height * dpr - y));
    execFileSync("magick", [
      `${OUT}/${tag}-bottom.png`, "-crop",
      `${Math.round(fm.w * dpr)}x${hh}+0+${y}`, "+repage",
      `${OUT}/${tag}-footer.png`,
    ]);
  }

  report.push({ tag, width, route, status: resp?.status(), ...metrics });
  await page.close();
}

for (const w of [1280, 1440, 1920]) {
  for (const route of ["/", "/ru", "/products", "/partners", "/ru/partners"]) {
    await shoot(w, 900, route, `d${w}${route.replace(/\//g, "_")}`);
  }
}
for (const w of [320, 360, 390, 430]) {
  for (const route of ["/", "/ru", "/products", "/partners", "/ru/partners", "/auth/login", "/auth/signup"]) {
    await shoot(w, 780, route, `m${w}${route.replace(/\//g, "_")}`);
  }
}
for (const w of [639, 640, 1024]) {
  await shoot(w, 820, "/", `bp${w}_`);
}

for (const r of report) {
  const plate = r.plate ? `${r.plate.w.toFixed(0)}x${r.plate.h.toFixed(0)}` : "—";
  const shown = (r.imgs || []).filter((i) => i.visible).map((i) => `${i.src.split("/").pop()}@${i.h}`).join(",");
  console.log(
    `${r.tag.padEnd(22)} st=${r.status} plate=${plate} img=${shown || "none"} ` +
      `header=${r.header ? r.header.h.toFixed(0) : "—"} overflow=${r.overflow} theme=${r.theme} h1=${r.h1 ?? ""}`,
  );
}
await browser.close();
