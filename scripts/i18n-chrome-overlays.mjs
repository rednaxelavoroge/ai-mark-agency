/**
 * Merges natural-language overlays for public-chrome key sections (non en/ru).
 * Run: node scripts/i18n-chrome-overlays.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const chromePath = path.join(root, "content/sections/public-chrome.ts");

function patchLocaleBlock(filePath, localeKey, newObj) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found`);
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
  writeFileSync(filePath, before + `"${localeKey}": ${JSON.stringify(newObj, null, 2)}` + after);
  console.log("Patched", localeKey);
}

function deepMerge(a, b) {
  if (b === null || typeof b !== "object" || Array.isArray(b)) return b;
  const out = { ...a };
  for (const k of Object.keys(b)) {
    out[k] =
      b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a[k] && typeof a[k] === "object"
        ? deepMerge(a[k], b[k])
        : b[k];
  }
  return out;
}

function mergeLocaleBlock(filePath, localeKey, partial) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const blockStr = text.slice(start, i + 1).replace(/^"\w+":\s*/, "");
  const obj = Function(`"use strict"; return (${blockStr});`)();
  patchLocaleBlock(filePath, localeKey, deepMerge(obj, partial));
}

const payEs = {
  metadataTitle: "Instrucciones de pago",
  title: "Enviar a una dirección AI MARK",
  lead: "Envíe el importe exacto a esta dirección. Los fondos van a la cartera del titular, no a un saldo de comerciante.",
  product: "Producto",
  listPrice: "Precio de lista",
  assetNetwork: "Activo / red",
  status: "Estado",
  amountUnique: "Importe a enviar (único)",
  treasuryAddress: "Dirección de tesorería",
  memo: "Memo / nota (si su wallet lo admite)",
  footnote:
    "Los céntimos únicos identifican este pago. El memo coincide con este enlace. No envíe desde otra red. Aquí no se aceptan tarjetas.",
  anotherProduct: "Otro producto",
};

const partnersEs = {
  heroSteps: ["Venta personal", "Ventas del equipo", "Hasta 5 niveles", "Hasta 80%"],
  networkSketch: "Esquema de red",
  networkTerms: "Condiciones de la red",
  globalExpansion: "Expansión global",
  leaveContacts: "Dejar contactos",
};

const pricingEs = {
  retainersHeading: "Retainers del departamento de marketing",
  retainersSub: "Alcance mensual recurrente",
  retainersNote:
    "Marketing continuo con humano en el bucle: la IA genera borradores, una persona senior aprueba. El gasto en anuncios se factura aparte.",
  popular: "Popular",
  perMonth: "/mes",
  customScope: "Alcance a medida — consultar",
  otherFormats: "Otros formatos de colaboración",
  formatLabel: "Formato",
  discussProject: "Hablar del proyecto →",
  aiProducts: "Productos IA",
  aiMarketingServices: "Servicios de marketing IA",
  fromPrice: "desde $500+",
  byScope: "según alcance",
  digitalProductionLink: "Producción digital →",
  customProposalTitle: "¿Necesita una propuesta a medida o alcance híbrido?",
  openChat: "Abrir chat",
  commercialFootnote:
    "USD. Los precios de productos están en las páginas dedicadas. Retainers: Starter $1,200 / Growth $2,200 / Scale $3,500 al mes según alcance. No garantizamos ROI, CAC ni ROAS.",
};

const footerEs = {
  ventureTagline: "Venture y marketing",
  taglineUpper: "Empresa de venture y marketing nativa en IA",
  blurb:
    "De la idea al negocio. Investigamos mercados, construimos productos digitales, desplegamos infraestructura IA propia y escalamos marketing y ventas.",
  capabilities: "Capacidades",
  businessCreation: "Creación de negocio",
  digitalProduction: "Producción digital",
  endToEndPipeline: "Proceso de extremo a extremo",
  aiOperatingModel: "Modelo operativo IA",
  commercialModel: "Modelo comercial",
  aiProducts: "Productos IA",
  showroomAi: "Showroom AI — agente de ventas IA",
  allProducts: "Todos los productos →",
  venture: "Venture",
  partnerNetwork: "Red de partners",
  investors: "Inversores",
  whyNow: "Por qué ahora",
  discussProject: "Hablar de un proyecto",
  payCrypto: "Pagar USDT / USDC",
  rights: "Todos los derechos reservados.",
  taglineShort: "De la idea al negocio",
};

const heroExtraEs = {
  lede:
    "AI MARK une investigación de mercado, productos digitales, infraestructura IA y marketing en un solo recorrido operativo — de la primera hipótesis al lanzamiento y crecimiento.",
  primaryCta: "Encuentre su punto de partida",
  secondaryCta: "Ver cómo funciona",
  footnote: "Un sistema conectado — no un paquete de proveedores desconectados.",
  pillarsLabel: "El trabajo avanza entre",
  pillars: ["Mercado y modelo", "Producto digital", "IA y crecimiento"],
  captionKicker: "EL BUCLE OPERATIVO",
  caption: "Investigar, construir, aprobar, lanzar — y seguir aprendiendo.",
  heroAlt: "Formas de vidrio esmeralda unidas por líneas de luz",
};

const locales = ["es", "pt", "fr", "de", "ar", "zh", "id", "vi", "ja", "tr"];

/** Per-locale overlays; es is fully filled, others reuse es structure with locale-specific pay/partners where noted. */
const OVERLAYS = {
  es: { footer: footerEs, heroExtra: heroExtraEs, pricingPage: pricingEs, partnersPage: partnersEs, payPage: payEs },
  pt: {
    footer: {
      ...footerEs,
      ventureTagline: "Venture e marketing",
      blurb:
        "Da ideia ao negócio. Pesquisamos mercados, construímos produtos digitais, implantamos infraestrutura de IA e escalamos marketing e vendas.",
      capabilities: "Capacidades",
      businessCreation: "Criação de negócio",
      digitalProduction: "Produção digital",
      partnerNetwork: "Rede de parceiros",
      investors: "Investidores",
      discussProject: "Falar sobre um projeto",
      payCrypto: "Pagar USDT / USDC",
      taglineShort: "Da ideia ao negócio",
    },
    heroExtra: {
      ...heroExtraEs,
      lede:
        "A AI MARK reúne pesquisa de mercado, produtos digitais, infraestrutura de IA e marketing num único percurso — da hipótese ao lançamento e crescimento.",
      primaryCta: "Encontre seu ponto de partida",
      secondaryCta: "Ver como funciona",
      footnote: "Um sistema conectado — não um pacote de fornecedores desconectados.",
      pillars: ["Mercado e modelo", "Produto digital", "IA e crescimento"],
      caption: "Pesquisar, construir, aprovar, lançar — e continuar aprendendo.",
    },
    pricingPage: {
      ...pricingEs,
      retainersHeading: "Retainers do departamento de marketing",
      perMonth: "/mês",
      openChat: "Abrir chat",
    },
    partnersPage: {
      heroSteps: ["Venda pessoal", "Vendas da equipa", "Até 5 níveis", "Até 80%"],
      networkSketch: "Esquema da rede",
      networkTerms: "Termos da rede",
      globalExpansion: "Expansão global",
      leaveContacts: "Deixar contactos",
    },
    payPage: {
      ...payEs,
      metadataTitle: "Instruções de pagamento",
      title: "Enviar para um endereço AI MARK",
      lead: "Envie o valor exato para este endereço. Os fundos vão para a carteira do titular, não para saldo de comerciante.",
      product: "Produto",
      listPrice: "Preço de tabela",
      anotherProduct: "Outro produto",
    },
  },
  fr: {
    footer: {
      ...footerEs,
      ventureTagline: "Venture et marketing",
      blurb:
        "De l'idée à l'entreprise. Nous étudions les marchés, construisons des produits digitaux, déployons une infra IA propriétaire et faisons croître marketing et ventes.",
      capabilities: "Capacités",
      businessCreation: "Création d'entreprise",
      digitalProduction: "Production digitale",
      partnerNetwork: "Réseau de partenaires",
      investors: "Investisseurs",
      discussProject: "Discuter d'un projet",
      taglineShort: "De l'idée à l'entreprise",
    },
    heroExtra: {
      ...heroExtraEs,
      lede:
        "AI MARK réunit étude de marché, produits digitaux, infrastructure IA et marketing dans un même parcours — de l'hypothèse au lancement et à la croissance.",
      primaryCta: "Trouvez votre point de départ",
      secondaryCta: "Voir comment ça marche",
      footnote: "Un système connecté — pas une pile de prestataires disjoints.",
      pillars: ["Marché et modèle", "Produit digital", "IA et croissance"],
      caption: "Étudier, construire, valider, lancer — puis continuer à apprendre.",
    },
    pricingPage: {
      ...pricingEs,
      retainersHeading: "Retainers du département marketing",
      perMonth: "/mois",
      openChat: "Ouvrir le chat",
    },
    partnersPage: {
      heroSteps: ["Vente personnelle", "Ventes d'équipe", "Jusqu'à 5 niveaux", "Jusqu'à 80 %"],
      networkSketch: "Schéma du réseau",
      networkTerms: "Conditions du réseau",
      globalExpansion: "Expansion mondiale",
      leaveContacts: "Laisser vos coordonnées",
    },
    payPage: {
      ...payEs,
      metadataTitle: "Instructions de paiement",
      title: "Envoyer à une adresse AI MARK",
      lead: "Envoyez le montant exact à cette adresse. Les fonds vont au portefeuille du propriétaire, pas à un solde marchand.",
      product: "Produit",
      listPrice: "Prix catalogue",
      anotherProduct: "Autre produit",
    },
  },
  de: {
    pricingPage: {
      commercialFootnote:
        "USD. Produktpreise stehen auf den Produktseiten. Retainer: Starter $1,200 / Growth $2,200 / Scale $3,500 pro Monat je Scope. ROI, CAC und ROAS werden nicht garantiert.",
    },
    partnersPage: {
      heroSteps: ["Persönlicher Verkauf", "Teamvertrieb", "Bis zu 5 Ebenen", "Bis zu 80 %"],
      networkSketch: "Netzwerk-Skizze",
      networkTerms: "Netzwerkbedingungen",
      globalExpansion: "Globale Expansion",
      leaveContacts: "Kontakt hinterlassen",
    },
    payPage: {
      metadataTitle: "Zahlungsanweisung",
      title: "An eine AI MARK-Adresse senden",
      lead: "Senden Sie den exakten Betrag an diese Adresse. Die Mittel gehen an die Owner-Wallet, nicht an ein Merchant-Guthaben.",
      product: "Produkt",
      listPrice: "Listenpreis",
      assetNetwork: "Asset / Netzwerk",
      status: "Status",
      amountUnique: "Zu sendender Betrag (eindeutig)",
      treasuryAddress: "Treasury-Adresse",
      memo: "Memo / Notiz (falls Ihre Wallet es unterstützt)",
      footnote:
        "Die eindeutigen Cent-Beträge identifizieren diese Zahlung. Das Memo passt zu diesem Link. Nicht über ein anderes Netzwerk senden. Karten werden hier nicht akzeptiert.",
      anotherProduct: "Anderes Produkt",
    },
  },
};

for (const loc of Object.keys(OVERLAYS)) {
  mergeLocaleBlock(chromePath, loc, OVERLAYS[loc]);
}

console.log("Chrome overlays applied");
