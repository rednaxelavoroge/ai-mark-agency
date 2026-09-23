// Menu geometry at the tightest viewports: is the chooser scrollable, is every
// channel reachable, and does the chat teaser overlap it?
// Usage: BASE=http://127.0.0.1:3100 node scripts/check-launcher-geometry.mjs
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://127.0.0.1:3100";
const browser = await chromium.launch();

for (const [width, height] of [
  [320, 780],
  [360, 780],
  [390, 780],
  [430, 780],
  [1280, 900],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(1200);
  await page.click(".cl-fab");
  await page.waitForTimeout(700);

  const info = await page.evaluate(() => {
    const menu = document.querySelector(".cl-menu");
    const cs = getComputedStyle(menu);
    const mr = menu.getBoundingClientRect();
    const items = [...document.querySelectorAll(".cl-menu .cl-item")];
    const email = items.find((el) => el.querySelector(".cl-item-label")?.textContent?.trim() === "Email");
    const er = email?.getBoundingClientRect();
    const teaser = document.querySelector(".aiba-greeting");
    const tr = teaser?.getBoundingClientRect();
    const panel = document.querySelector(".aiba-root .aiba-panel");
    return {
      menu: { top: +mr.top.toFixed(0), bottom: +mr.bottom.toFixed(0), h: +mr.height.toFixed(0) },
      viewportH: window.innerHeight,
      scrollable: menu.scrollHeight > menu.clientHeight + 1,
      overflowY: cs.overflowY,
      scrollHeight: menu.scrollHeight,
      clientHeight: menu.clientHeight,
      emailVisible: er ? er.top >= 0 && er.bottom <= window.innerHeight : false,
      emailTop: er ? +er.top.toFixed(0) : null,
      emailBottom: er ? +er.bottom.toFixed(0) : null,
      teaserVisible: !!teaser && !!(tr && tr.width && tr.height),
      teaserTop: tr ? +tr.top.toFixed(0) : null,
      panelVisible: !!(panel && !panel.hidden && panel.style.display !== "none"),
    };
  });

  // scroll the menu to its end and confirm Email becomes reachable
  const reached = await page.evaluate(() => {
    const menu = document.querySelector(".cl-menu");
    menu.scrollTop = menu.scrollHeight;
    const email = [...document.querySelectorAll(".cl-menu .cl-item")].find(
      (el) => el.querySelector(".cl-item-label")?.textContent?.trim() === "Email",
    );
    const r = email.getBoundingClientRect();
    return r.bottom <= window.innerHeight + 1 && r.top >= 0;
  });

  console.log(
    `${width}x${height} menu=${info.menu.h}px (top ${info.menu.top}, bottom ${info.menu.bottom}) ` +
      `scrollable=${info.scrollable} (${info.clientHeight}/${info.scrollHeight}) overflowY=${info.overflowY}`,
  );
  console.log(
    `   email visible now=${info.emailVisible} [${info.emailTop}..${info.emailBottom}] ` +
      `after scroll=${reached} | teaser visible=${info.teaserVisible} top=${info.teaserTop} | chatPanel=${info.panelVisible}`,
  );
  await page.close();
}

await browser.close();
