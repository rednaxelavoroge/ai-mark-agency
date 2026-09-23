// Verifies the restored channel chooser: required channels present in order,
// chat first, email last, no horizontal overflow, on desktop and mobile.
// Usage: BASE=http://127.0.0.1:3100 node scripts/check-launcher.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:3100";
const OUT = "/tmp/launcher";
mkdirSync(OUT, { recursive: true });

// The contract is an ORDER, not a fixed set: a channel with no configured URL
// is intentionally absent (Instagram today) and hidden rather than guessed.
const REQUIRED = ["Chat with our AI assistant", "Telegram", "WhatsApp", "Messenger", "Email"];
const OPTIONAL = ["Instagram"];
const browser = await chromium.launch();
let failures = 0;

for (const [width, locale, route] of [
  [1280, "en", "/"],
  [1440, "en", "/"],
  [1920, "en", "/"],
  [320, "en", "/"],
  [360, "ru", "/ru"],
  [390, "ru", "/ru"],
  [430, "en", "/products"],
]) {
  const page = await browser.newPage({ viewport: { width, height: 820 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(1200);

  await page.click(".cl-fab");
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const menu = document.querySelector(".cl-menu");
    const items = [...document.querySelectorAll(".cl-menu .cl-item")];
    const r = menu?.getBoundingClientRect();
    return {
      menuOpen: !!menu,
      labels: items.map((el) => el.querySelector(".cl-item-label")?.textContent?.trim() ?? ""),
      hrefs: items.map((el) => el.getAttribute("href")),
      roles: items.map((el) => el.getAttribute("role")),
      ariaLabel: menu?.getAttribute("aria-label") ?? null,
      menu: r ? { left: +r.left.toFixed(0), right: +r.right.toFixed(0), w: +r.width.toFixed(0), h: +r.height.toFixed(0) } : null,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      fabLabel: document.querySelector(".cl-fab-label")?.textContent?.trim() ?? null,
      fabExpanded: document.querySelector(".cl-fab")?.getAttribute("aria-expanded") ?? null,
    };
  });

  const labels = info.labels;
  const chatFirst = labels[0]?.startsWith("Chat") || labels[0]?.startsWith("Чат");
  const emailLast = labels[labels.length - 1] === "Email";
  const missingRequired = REQUIRED.filter((e) => !labels.includes(e) && !(e.startsWith("Chat") && chatFirst));
  const orderOk = labels.join(">") === REQUIRED.map((e) => (e.startsWith("Chat") && chatFirst ? labels[0] : e)).join(">");
  const absentOptional = OPTIONAL.filter((e) => !labels.includes(e));
  const offscreen = info.menu ? info.menu.left < 0 || info.menu.right > width + 1 : true;

  const ok = info.menuOpen && chatFirst && emailLast && orderOk && missingRequired.length === 0 && !offscreen && info.overflow === 0;
  if (!ok) failures += 1;

  console.log(
    `${ok ? "OK  " : "FAIL"} ${width}px ${route}  menu=${info.menu ? `${info.menu.w}x${info.menu.h}@${info.menu.left}` : "closed"} ` +
      `overflow=${info.overflow} fab=${info.fabLabel}/${info.fabExpanded}`,
  );
  console.log(`      channels: ${labels.join(" | ") || "—"}`);
  console.log(
    `      required missing: ${missingRequired.length ? missingRequired.join(", ") : "none"} | order ${orderOk ? "ok" : "WRONG"}` +
      ` | intentionally off: ${absentOptional.join(", ") || "none"}${offscreen ? "  [MENU OFF-SCREEN]" : ""}`,
  );
  if (info.hrefs.some((h) => h && h.includes("alexdev"))) {
    console.log("      NOTE: a channel href still points at the old AlexDev handle");
  }
  if (errors.length) console.log(`      page errors: ${errors.slice(0, 2).join(" | ")}`);

  await page.screenshot({ path: `${OUT}/menu-${width}-${locale}.png` });
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} viewport(s) FAILED` : "\nall viewports OK");
process.exit(failures ? 1 : 0);
