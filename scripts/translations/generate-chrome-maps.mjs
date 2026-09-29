#!/usr/bin/env node
/**
 * Builds per-locale string maps for public-chrome from EN strings + locale translators.
 * Run: node scripts/translations/generate-chrome-maps.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const strings = JSON.parse(
  readFileSync(path.join(root, "translations/en-chrome-strings.json"), "utf8"),
);

/** @typedef {(en: string) => string} TranslateFn */

/** @type {Record<string, TranslateFn>} */
const TRANSLATORS = {};

function registerLocale(code, fn) {
  TRANSLATORS[code] = fn;
}

// --- Spanish ---
registerLocale("es", (en) => {
  const exact = {
    Venture: "Venture",
    "How we think": "Cómo pensamos",
    "We don't promise profit.": "No prometemos beneficio.",
    "We reduce the cost of being wrong.": "Reducimos el coste de equivocarse.",
    "AI prepares — humans decide": "La IA prepara — deciden las personas",
    "Routine and drafts run on algorithms; strategy and the final call stay with people.":
      "La rutina y los borradores van con algoritmos; la estrategia y la decisión final quedan en manos humanas.",
    "One infrastructure": "Una infraestructura",
    "Venture creation, product, marketing and sales run as a single contour — not ten contractors.":
      "Creación de venture, producto, marketing y ventas en un solo contorno — no diez proveedores.",
    "Speed without losing control": "Velocidad sin perder control",
    "Faster where it is safe. Human approval where commitments and money are involved.":
      "Más rápido donde es seguro. Aprobación humana donde hay compromisos y dinero.",
    "Decisions from data": "Decisiones desde datos",
    "Demand, unit economics and competitors — before the budget, not after.":
      "Demanda, unit economics y competidores — antes del presupuesto, no después.",
    "Back to Home": "Volver al inicio",
    Close: "Cerrar",
    "Digital Core": "Núcleo digital",
    "Engineering Standards:": "Estándares de ingeniería:",
    "Request Scope Estimate →": "Solicitar estimación de alcance →",
    "From one starting point to a joined-up business":
      "Desde un punto de partida hasta un negocio integrado",
    Research: "Investigación",
    Product: "Producto",
    "AI infrastructure": "Infraestructura IA",
    "Marketing & sales": "Marketing y ventas",
    "Choose the work in front of you": "Elige el trabajo que tienes delante",
    "One team. Three ways in.": "Un equipo. Tres entradas.",
    "Details": "Detalles",
    "All stages": "Todas las etapas",
    "Next step": "Siguiente paso",
    Popular: "Popular",
    "/mo": "/mes",
    "Open chat": "Abrir chat",
    "Network sketch": "Esquema de red",
    "Network terms": "Condiciones de la red",
    "Global expansion": "Expansión global",
    "Leave your contacts": "Dejar contactos",
    "Payment instruction": "Instrucciones de pago",
    "Send to an AI MARK address": "Enviar a una dirección AI MARK",
    "Another product": "Otro producto",
    "All features": "Todas las funciones",
    "Production ready": "Listo para producción",
    Install: "Conectar",
    sections: "secciones",
  };
  if (exact[en]) return exact[en];
  if (en.startsWith("/") || en.length <= 3) return en;
  if (/USDT|USDC|AI MARK|SHOWROOM|RAG|Meta |Telegram|WhatsApp|Instagram|Facebook|Threads|Bitrix|Kommo|HubSpot|PDF|API|SaaS|Reels|CRM|1C|AIME|\$/.test(en))
    return en;
  return null;
});

for (const [loc, fn] of Object.entries(TRANSLATORS)) {
  const map = {};
  let hit = 0;
  for (const s of strings) {
    const t = fn(s);
    if (t && t !== s) {
      map[s] = t;
      hit++;
    }
  }
  const outDir = path.join(root, "translations/maps");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, `${loc}.json`), JSON.stringify(map, null, 2));
  console.log(loc, "mapped", hit, "of", strings.length);
}
