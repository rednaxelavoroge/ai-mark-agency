#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUT = process.env.OUT_DIR ?? "/opt/cursor/artifacts";

const shots = [
  { path: "/en/ai-brand-studio", name: "en-brand-studio-1280.png", width: 1280 },
  { path: "/en/ai-brand-studio", name: "en-brand-studio-390.png", width: 390 },
  { path: "/ru/ai-brand-studio", name: "ru-brand-studio-1280.png", width: 1280 },
  { path: "/ru/ai-brand-studio", name: "ru-brand-studio-390.png", width: 390 },
  { path: "/en", name: "en-home-390.png", width: 390 },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: shot.width, height: shot.width === 390 ? 1400 : 900 });
  await page.goto(`${BASE}${shot.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `${OUT}/${shot.name}`,
    fullPage: shot.width === 390,
  });
  await page.close();
  console.log("saved", shot.name);
}
await browser.close();
