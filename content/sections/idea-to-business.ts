import type { Locale } from "@/lib/site";

export type IdeaStageCopy = {
  kicker: string;
  title: string;
  body: string;
  artifact: string;
};

export type IdeaToBusinessCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  stagesOverviewTitle: string;
  stages: IdeaStageCopy[];
  artifactCaption: Record<string, string>;
  artifactLabel: Record<string, string>;
  artifactMicro: { seed: string };
};

export const ideaToBusinessCopy: Record<Locale, IdeaToBusinessCopy> = {
  "en": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "es": {
    "eyebrow": "Contorno continuo",
    "title": "Cómo una idea se convierte en un negocio en marcha.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Cada etapa del contorno",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "pt": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "ru": {
    "eyebrow": "Сквозной контур",
    "title": "Как идея становится работающим бизнесом.",
    "lead": "Не набор подрядчиков, а один управляемый контур: рынок, модель, продукт, AI, спрос.",
    "stagesOverviewTitle": "Все этапы контура",
    "artifactMicro": {
      "seed": "идея · гипотеза"
    },
    "stages": [
      {
        "kicker": "Вход",
        "title": "Идея или капитал",
        "body": "Начинаем с гипотезы, действующего бизнеса или объёма капитала — фиксируем цель.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Исследование рынка",
        "body": "Спрос, конкуренты, барьеры входа и юнит-экономика на объективных данных.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Бизнес-модель",
        "body": "Собираем модель: сегменты, монетизация, каналы, стоимость привлечения.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Бренд",
        "body": "Позиционирование, айдентика и голос — система, а не логотип-заплатка.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Цифровой продукт",
        "body": "Платформа, кабинеты, расчёты и интеграции, на которых бизнес ведёт операции.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI-инфраструктура",
        "body": "Собственные AI-агенты встроены в операции: контент, инбокс продаж, расчёты.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Маркетинг и продажи",
        "body": "Спрос, квалификация и сделки — на той же инфраструктуре, а не в разрозненных сервисах.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Рост",
        "body": "Аналитика, оптимизация и партнёрская сеть масштабируют уже работающую модель.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Вход: идея, действующий бизнес или объём капитала.",
      "bars": "Аналитика рынка: спрос, конкуренты и юнит-экономика.",
      "grid": "Модель: сегменты, монетизация, каналы и стоимость привлечения.",
      "brand": "Айдентика: позиционирование, голос и визуальная система.",
      "product": "Цифровой продукт: кабинеты, расчёты, интеграции и данные.",
      "ai": "AI-агенты в операциях: контент, инбокс продаж, расчёты по каталогу.",
      "funnel": "Продажи: поток обращений, квалификация и сделки.",
      "growth": "Рост: метрики, оптимизация и партнёрская сеть."
    },
    "artifactLabel": {
      "bars": "спрос · конкуренты",
      "product": "кабинеты · расчёты",
      "ai": "RAG · агенты",
      "funnel": "обращения → сделки",
      "growth": "метрики · сеть"
    }
  },
  "ar": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "zh": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "id": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "vi": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "de": {
  "eyebrow": "Durchgängiger Kontur",
  "title": "Wie aus einer Idee ein funktionierendes Business wird.",
  "lead": "Kein Stapel an Dienstleistern — ein steuerbarer Kontur: Markt, Modell, Produkt, KI, Nachfrage.",
  "stagesOverviewTitle": "Alle Phasen des Konturs",
  "artifactMicro": {
    "seed": "Idee · Hypothese"
  },
  "stages": [
    {
      "kicker": "Einstieg",
      "title": "Idee oder Kapital",
      "body": "Wir starten mit Hypothese, laufendem Unternehmen oder Kapitalrahmen — und fixieren das Ziel.",
      "artifact": "seed"
    },
    {
      "kicker": "01",
      "title": "Marktforschung",
      "body": "Nachfrage, Wettbewerber, Markteintrittsbarrieren und Unit Economics auf Basis realer Daten.",
      "artifact": "bars"
    },
    {
      "kicker": "02",
      "title": "Geschäftsmodell",
      "body": "Wir bauen das Modell: Segmente, Monetarisierung, Kanäle, Customer-Acquisition-Kosten.",
      "artifact": "grid"
    },
    {
      "kicker": "03",
      "title": "Marke",
      "body": "Positionierung, Identität und Stimme — ein System, kein nachträgliches Logo.",
      "artifact": "brand"
    },
    {
      "kicker": "04",
      "title": "Digitales Produkt",
      "body": "Plattform, Workspaces, Kalkulationen und Integrationen, auf denen das Business operiert.",
      "artifact": "product"
    },
    {
      "kicker": "05",
      "title": "KI-Infrastruktur",
      "body": "Eigene KI-Agenten in den Betrieb eingebettet: Content, Sales-Inbox, Angebotskalkulation.",
      "artifact": "ai"
    },
    {
      "kicker": "06",
      "title": "Marketing & Vertrieb",
      "body": "Nachfrage, Qualifizierung und Abschlüsse auf derselben Infrastruktur — nicht verstreute Tools.",
      "artifact": "funnel"
    },
    {
      "kicker": "07",
      "title": "Wachstum",
      "body": "Analytics, Optimierung und das Partnernetzwerk skalieren ein bereits funktionierendes Modell.",
      "artifact": "growth"
    }
  ],
  "artifactCaption": {
    "seed": "Einstieg: Idee, laufendes Unternehmen oder Kapitalrahmen.",
    "bars": "Marktanalyse: Nachfrage, Wettbewerber und Unit Economics.",
    "grid": "Modell: Segmente, Monetarisierung, Kanäle und Akquisitionskosten.",
    "brand": "Identität: Positionierung, Stimme und visuelles System.",
    "product": "Digitales Produkt: Workspaces, Kalkulationen, Integrationen und Daten.",
    "ai": "KI-Agenten im Betrieb: Content, Sales-Inbox, Katalog-Angebote.",
    "funnel": "Vertrieb: Anfragefluss, Qualifizierung und Abschlüsse.",
    "growth": "Wachstum: Kennzahlen, Optimierung und Partnernetzwerk."
  },
  "artifactLabel": {
    "bars": "Nachfrage · Wettbewerb",
    "product": "Workspaces · Angebote",
    "ai": "RAG · Agenten",
    "funnel": "Anfragen → Deals",
    "growth": "Kennzahlen · Netzwerk"
  }
},
  "fr": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "ja": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  },
  "tr": {
    "eyebrow": "Continuous contour",
    "title": "How an idea becomes a working business.",
    "lead": "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    "stagesOverviewTitle": "Every stage of the contour",
    "artifactMicro": {
      "seed": "idea · hypothesis"
    },
    "stages": [
      {
        "kicker": "Input",
        "title": "Idea or capital",
        "body": "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Market research",
        "body": "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Business model",
        "body": "We assemble the model: segments, monetization, channels, cost of acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Brand",
        "body": "Positioning, identity and voice — a system, not a logo patched on afterward.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Digital product",
        "body": "Platform, workspaces, calculations and integrations the business actually runs on.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI infrastructure",
        "body": "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & sales",
        "body": "Demand capture, qualification and deals on the same infra — not scattered tools.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Growth",
        "body": "Analytics, optimization and the partner network scale an already working model.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Input: an idea, an operating company, or a capital range.",
      "bars": "Market analytics: demand, competitors and unit economics.",
      "grid": "Model: segments, monetization, channels and cost of acquisition.",
      "brand": "Identity: positioning, voice and the visual system.",
      "product": "Digital product: workspaces, calculations, integrations and data.",
      "ai": "AI agents in operations: content, sales inbox, catalog quoting.",
      "funnel": "Sales: inquiry flow, qualification and closed deals.",
      "growth": "Growth: metrics, optimization and the partner network."
    },
    "artifactLabel": {
      "bars": "demand · competitors",
      "product": "workspaces · quoting",
      "ai": "RAG · agents",
      "funnel": "inquiries → deals",
      "growth": "metrics · network"
    }
  }
} as Record<Locale, IdeaToBusinessCopy>;

export function getIdeaToBusinessCopy(locale: Locale): IdeaToBusinessCopy {
  return ideaToBusinessCopy[locale] ?? ideaToBusinessCopy.en;
}
