#!/usr/bin/env node
/**
 * Sync service fields from EN and apply targeted copy fixes, then rewrite section bundles.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ideaToBusinessCopy } from "../content/sections/idea-to-business.ts";
import { operatingModelCopy } from "../content/sections/operating-model.ts";
import { publicChromeCopy } from "../content/sections/public-chrome.ts";
import { site } from "../lib/site.ts";
import {
  fixShowroomFeaturedPrice,
  syncServiceFieldsFromEn,
} from "../lib/i18n/service-fields.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @param {string} filePath @param {string} exportName @param {Record<string, unknown>} data */
function writeSectionBundle(filePath, exportName, data) {
  const abs = path.join(root, "..", filePath);
  const original = readFileSync(abs, "utf8");
  const typeExport = original.match(
    /export type \w+ = \(typeof \w+\)\["en"\];/,
  );
  const fnBlock = original.match(
    /export function get\w+Copy\([\s\S]*?\n\}/,
  );

  const header = `import type { Locale } from "@/lib/site";\n\nexport const ${exportName} = `;
  const body = `${JSON.stringify(data, null, 2)} as const satisfies Record<Locale, unknown>;\n\n`;
  const footer = [
    typeExport?.[0] ?? "",
    "",
    fnBlock?.[0] ?? "",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  writeFileSync(abs, header + body + footer, "utf8");
}

function syncBundle(copy) {
  const en = copy.en;
  for (const locale of site.locales) {
    if (locale === "en") continue;
    syncServiceFieldsFromEn(en, copy[locale]);
  }
}

function patchDeArCopy(copy) {
  const de = copy.de;
  const ar = copy.ar;

  const deHome = de.homePage;
  if (deHome?.featuredProducts) {
    for (const p of deHome.featuredProducts) {
      if (p.id === "showroom") {
        p.price = "ab $199/Mo";
        p.highlights = [
          "Deterministische Berechnungsformeln nach Maß",
          "Automatisierter PDF-Angebotsgenerator mit Prüfung",
          "Nahtlose CRM-Synchronisation und Übergabe an Manager",
        ];
      }
      if (p.id === "assistant") {
        p.price = "ab $149/Mo";
        p.highlights = [
          "Ein Posteingang für WhatsApp, Telegram, Direct und Web",
          "Streng auf der Wissensbasis des Unternehmens verankert",
          "Sofortige Übergabe an den Operator mit einem Klick",
        ];
      }
      if (p.id === "aime") {
        p.price = "ab $1.200/Mo";
        p.highlights = [
          "Marktinformationen und markengerechte Content-Planung",
          "Visuelle Entwürfe und überzeugende Reels-Skripte",
          "Striktes Ein-Klick-Freigabetor in Telegram",
        ];
      }
    }
  }

  const deShowcase = de.aiProductsShowcase;
  if (deShowcase?.products) {
    deShowcase.products = structuredClone(deHome.featuredProducts);
  }

  de.pricingPage.aiMarketingServices = "KI-Marketing-Services";
  de.pricingPage.fromPrice = "ab $500+";

  const arHome = ar.homePage;
  if (arHome) {
    arHome.hubModules[2].desc =
      "عقود قسم التسويق من $1,200/شهر، اشتراكات SaaS من $149/شهر، وإنتاج مشاريع جاهز.";
    if (arHome.featuredProducts) {
      for (const p of arHome.featuredProducts) {
        if (p.id === "showroom") {
          p.price = "من $199/شهر";
          p.highlights = [
            "صيغ حسابية مخصصة حتمية",
            "مولّد عروض PDF موثّق تلقائياً",
            "مزامنة CRM سلسة وتسليم للمدير",
          ];
        }
        if (p.id === "assistant") {
          p.price = "من $149/شهر";
          p.highlights = [
            "صندوق وارد موحّد: WhatsApp وTelegram وDirect والويب",
            "مرتكز بشكل صارم على قاعدة معارف الشركة",
            "تسليم فوري للمشغل البشري بنقرة واحدة",
          ];
        }
        if (p.id === "aime") {
          p.price = "من $1,200/شهر";
          p.highlights = [
            "معلومات السوق وتخطيط المحتوى وفق العلامة",
            "مسودات مرئية وسيناريوهات Reels عالية التحويل",
            "بوابة موافقة صارمة بنقرة واحدة في Telegram",
          ];
        }
      }
    }
  }

  const arShowcase = ar.aiProductsShowcase;
  if (arShowcase?.products && arHome?.featuredProducts) {
    arShowcase.products = structuredClone(arHome.featuredProducts);
  }

  ar.pricingPage.aiMarketingServices = "خدمات التسويق بالذكاء الاصطناعي";
  ar.pricingPage.fromPrice = "من $500+";
  ar.pricingPage.commercialFootnote =
    "بالدولار الأمريكي. أسعار المنتجات منشورة على صفحات المنتجات. العقود الشهرية: Starter $1,200 / Growth $2,200 / Scale $3,500 شهرياً حسب النطاق. لا نضمن ROI أو CAC أو ROAS.";
}

syncBundle(publicChromeCopy);
syncBundle(ideaToBusinessCopy);
syncBundle(operatingModelCopy);

for (const locale of site.locales) {
  fixShowroomFeaturedPrice(publicChromeCopy[locale]);
}

patchDeArCopy(publicChromeCopy);

writeSectionBundle(
  "content/sections/public-chrome.ts",
  "publicChromeCopy",
  publicChromeCopy,
);
writeSectionBundle(
  "content/sections/idea-to-business.ts",
  "ideaToBusinessCopy",
  ideaToBusinessCopy,
);
writeSectionBundle(
  "content/sections/operating-model.ts",
  "operatingModelCopy",
  operatingModelCopy,
);

console.log("Service fields synced and section bundles rewritten.");
