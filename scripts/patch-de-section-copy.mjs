/**
 * Patches DE (and ES/PT/FR) section bundles with proper translations.
 * Run: node scripts/patch-de-section-copy.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const ideaDe = {
  eyebrow: "Durchgängiger Kontur",
  title: "Wie aus einer Idee ein funktionierendes Business wird.",
  lead: "Kein Stapel an Dienstleistern — ein steuerbarer Kontur: Markt, Modell, Produkt, KI, Nachfrage.",
  stagesOverviewTitle: "Alle Phasen des Konturs",
  artifactMicro: { seed: "Idee · Hypothese" },
  stages: [
    {
      kicker: "Einstieg",
      title: "Idee oder Kapital",
      body: "Wir starten mit Hypothese, laufendem Unternehmen oder Kapitalrahmen — und fixieren das Ziel.",
      artifact: "seed",
    },
    {
      kicker: "01",
      title: "Marktforschung",
      body: "Nachfrage, Wettbewerber, Markteintrittsbarrieren und Unit Economics auf Basis realer Daten.",
      artifact: "bars",
    },
    {
      kicker: "02",
      title: "Geschäftsmodell",
      body: "Wir bauen das Modell: Segmente, Monetarisierung, Kanäle, Customer-Acquisition-Kosten.",
      artifact: "grid",
    },
    {
      kicker: "03",
      title: "Marke",
      body: "Positionierung, Identität und Stimme — ein System, kein nachträgliches Logo.",
      artifact: "brand",
    },
    {
      kicker: "04",
      title: "Digitales Produkt",
      body: "Plattform, Workspaces, Kalkulationen und Integrationen, auf denen das Business operiert.",
      artifact: "product",
    },
    {
      kicker: "05",
      title: "KI-Infrastruktur",
      body: "Eigene KI-Agenten in den Betrieb eingebettet: Content, Sales-Inbox, Angebotskalkulation.",
      artifact: "ai",
    },
    {
      kicker: "06",
      title: "Marketing & Vertrieb",
      body: "Nachfrage, Qualifizierung und Abschlüsse auf derselben Infrastruktur — nicht verstreute Tools.",
      artifact: "funnel",
    },
    {
      kicker: "07",
      title: "Wachstum",
      body: "Analytics, Optimierung und das Partnernetzwerk skalieren ein bereits funktionierendes Modell.",
      artifact: "growth",
    },
  ],
  artifactCaption: {
    seed: "Einstieg: Idee, laufendes Unternehmen oder Kapitalrahmen.",
    bars: "Marktanalyse: Nachfrage, Wettbewerber und Unit Economics.",
    grid: "Modell: Segmente, Monetarisierung, Kanäle und Akquisitionskosten.",
    brand: "Identität: Positionierung, Stimme und visuelles System.",
    product: "Digitales Produkt: Workspaces, Kalkulationen, Integrationen und Daten.",
    ai: "KI-Agenten im Betrieb: Content, Sales-Inbox, Katalog-Angebote.",
    funnel: "Vertrieb: Anfragefluss, Qualifizierung und Abschlüsse.",
    growth: "Wachstum: Kennzahlen, Optimierung und Partnernetzwerk.",
  },
  artifactLabel: {
    bars: "Nachfrage · Wettbewerb",
    product: "Workspaces · Angebote",
    ai: "RAG · Agenten",
    funnel: "Anfragen → Deals",
    growth: "Kennzahlen · Netzwerk",
  },
};

const operatingDe = {
  stages: [
    { n: "01", t: "Research & Daten", d: "KI überwacht kontinuierlich Wettbewerber und Nachfrage" },
    { n: "02", t: "Strategie & Modell", d: "Menschliche Führung setzt Ziele und Grenzen" },
    { n: "03", t: "Produktions-Entwürfe", d: "KI erstellt Code, Assets, Texte und Angebote" },
    { n: "04", t: "Freigabe durch Menschen", d: "1-Klick-Review via Telegram oder Unified Inbox" },
    { n: "05", t: "Ausführung", d: "Automatisierte Auslieferung über Meta- und API-Pipelines" },
    { n: "06", t: "Optimierung", d: "Closed-Loop-Verfeinerung anhand von Conversions" },
  ],
  aiColumn: {
    kicker: "KI-Kern (Tempo & Routine)",
    title: "Durchsatz und Geschwindigkeit",
    lead: "Wiederkehrende Aufgaben, Marktmonitoring, Content-Entwürfe und sofortige Anfragenbearbeitung ohne menschliche Verzögerung.",
    items: [
      "Kontinuierliche Wettbewerbs- und Trend-Intelligence",
      "Automatisierte Content-, Visual- und Reels-Storyboards",
      "Erste Antwort in Messengern und auf der Website, dann Übergabe an eine Person",
      "Vorqualifizierung eingehender kommerzieller Anfragen",
      "Deterministische Angebots- und Spezifikationskalkulationen per Formeln",
      "Automatisierte Analytics-Reports und Kohortenanalyse",
    ],
  },
  humanColumn: {
    kicker: "Menschliche Kontrolle (Strategie & Vertrauen)",
    title: "Business-Urteil & Hard-Floor",
    lead: "Eine Person gibt verbindliche Zusagen und Preise frei, bevor sie live gehen.",
    items: [
      "Strategische Geschäftsentscheidungen, Modellstruktur und Positionierung",
      "Finale Freigabe von Marketing-Posts und Angeboten in Telegram",
      "Verhandlung von Enterprise-Verträgen und Meilensteinen",
      "Aufsicht über Brand Voice, Guidelines und Ethik",
      "Freigabe rechtlich bindender kommerzieller Zusagen",
      "Kapitalallokation und Steuerung des Partnernetzwerks",
    ],
  },
};

function patchLocaleBlock(filePath, localeKey, newObj) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found in ${filePath}`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const before = text.slice(0, start);
  const after = text.slice(i);
  const injected = `"${localeKey}": ${JSON.stringify(newObj, null, 2).replaceAll('"', '"')}`;
  writeFileSync(filePath, before + injected + after);
  console.log(`Patched ${localeKey} in ${path.basename(filePath)}`);
}

patchLocaleBlock(path.join(root, "content/sections/idea-to-business.ts"), "de", ideaDe);
patchLocaleBlock(path.join(root, "content/sections/operating-model.ts"), "de", operatingDe);
