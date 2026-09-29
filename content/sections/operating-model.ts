import type { Locale } from "@/lib/site";

export type OperatingModelCopy = {
  stages: { n: string; t: string; d: string }[];
  aiColumn: { kicker: string; title: string; lead: string; items: string[] };
  humanColumn: { kicker: string; title: string; lead: string; items: string[] };
};

export const operatingModelCopy: Record<Locale, OperatingModelCopy> = {
  "en": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "es": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "pt": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "ru": {
    "stages": [
      {
        "n": "01",
        "t": "Исследование и данные",
        "d": "AI непрерывно анализирует рынок и аудиторию"
      },
      {
        "n": "02",
        "t": "Стратегия и модель",
        "d": "Человек определяет цели и экономические рамки"
      },
      {
        "n": "03",
        "t": "Черновики производства",
        "d": "AI формирует код, тексты, визуалы и расчёты"
      },
      {
        "n": "04",
        "t": "Согласование человеком",
        "d": "Апрув в 1 клик через Telegram или рабочий инбокс"
      },
      {
        "n": "05",
        "t": "Исполнение",
        "d": "Автоматическая публикация и доставка клиентам"
      },
      {
        "n": "06",
        "t": "Оптимизация",
        "d": "Самообучение алгоритмов на конверсиях"
      }
    ],
    "aiColumn": {
      "kicker": "AI берёт на себя (скорость и рутина)",
      "title": "Скорость, объём и автоматизация 24/7",
      "lead": "Рутинные операции, сбор данных, черновики контента и моментальные ответы не требуют ручного труда.",
      "items": [
        "Непрерывный мониторинг конкурентов и трендов",
        "Генерация контента, визуалов и сценариев Reels",
        "Первый ответ в мессенджерах и на сайте, затем передача человеку",
        "Первичная квалификация входящих обращений",
        "Расчёт сложных спецификаций по каталогам и формулам",
        "Формирование регулярных аналитических отчётов"
      ]
    },
    "humanColumn": {
      "kicker": "Человек контролирует (стратегия и доверие)",
      "title": "Контроль качества и юридический барьер",
      "lead": "Обязательства и цены публикуются после согласования человеком.",
      "items": [
        "Утверждение ключевых бизнес-стратегий и позиционирования",
        "Финальный аппрув коммерческих предложений и постов в Telegram",
        "Ведение переговоров по крупным контрактам и спецпроектам",
        "Контроль соблюдения бренд-гайдов и тональности",
        "Принятие юридических и финансовых обязательств",
        "Управление структурой капитала и партнёрской сетью"
      ]
    }
  },
  "ar": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "zh": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "id": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "vi": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "de": {
  "stages": [
    {
      "n": "01",
      "t": "Research & Daten",
      "d": "KI überwacht kontinuierlich Wettbewerber und Nachfrage"
    },
    {
      "n": "02",
      "t": "Strategie & Modell",
      "d": "Menschliche Führung setzt Ziele und Grenzen"
    },
    {
      "n": "03",
      "t": "Produktions-Entwürfe",
      "d": "KI erstellt Code, Assets, Texte und Angebote"
    },
    {
      "n": "04",
      "t": "Freigabe durch Menschen",
      "d": "1-Klick-Review via Telegram oder Unified Inbox"
    },
    {
      "n": "05",
      "t": "Ausführung",
      "d": "Automatisierte Auslieferung über Meta- und API-Pipelines"
    },
    {
      "n": "06",
      "t": "Optimierung",
      "d": "Closed-Loop-Verfeinerung anhand von Conversions"
    }
  ],
  "aiColumn": {
    "kicker": "KI-Kern (Tempo & Routine)",
    "title": "Durchsatz und Geschwindigkeit",
    "lead": "Wiederkehrende Aufgaben, Marktmonitoring, Content-Entwürfe und sofortige Anfragenbearbeitung ohne menschliche Verzögerung.",
    "items": [
      "Kontinuierliche Wettbewerbs- und Trend-Intelligence",
      "Automatisierte Content-, Visual- und Reels-Storyboards",
      "Erste Antwort in Messengern und auf der Website, dann Übergabe an eine Person",
      "Vorqualifizierung eingehender kommerzieller Anfragen",
      "Deterministische Angebots- und Spezifikationskalkulationen per Formeln",
      "Automatisierte Analytics-Reports und Kohortenanalyse"
    ]
  },
  "humanColumn": {
    "kicker": "Menschliche Kontrolle (Strategie & Vertrauen)",
    "title": "Business-Urteil & Hard-Floor",
    "lead": "Eine Person gibt verbindliche Zusagen und Preise frei, bevor sie live gehen.",
    "items": [
      "Strategische Geschäftsentscheidungen, Modellstruktur und Positionierung",
      "Finale Freigabe von Marketing-Posts und Angeboten in Telegram",
      "Verhandlung von Enterprise-Verträgen und Meilensteinen",
      "Aufsicht über Brand Voice, Guidelines und Ethik",
      "Freigabe rechtlich bindender kommerzieller Zusagen",
      "Kapitalallokation und Steuerung des Partnernetzwerks"
    ]
  }
},
  "fr": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "ja": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  },
  "tr": {
    "stages": [
      {
        "n": "01",
        "t": "Research & Data",
        "d": "AI continuously monitors competitors and intent"
      },
      {
        "n": "02",
        "t": "Strategy & Model",
        "d": "Human leadership sets targets and boundaries"
      },
      {
        "n": "03",
        "t": "Production Drafts",
        "d": "AI synthesizes code, assets, copy, and quotes"
      },
      {
        "n": "04",
        "t": "Human Approval",
        "d": "1-click review via Telegram or unified inbox"
      },
      {
        "n": "05",
        "t": "Execution",
        "d": "Automated distribution via Meta & API pipelines"
      },
      {
        "n": "06",
        "t": "Optimization",
        "d": "Closed-loop refinement based on conversions"
      }
    ],
    "aiColumn": {
      "kicker": "AI Core (Speed & Repetitive Ops)",
      "title": "Continuous Throughput & Speed",
      "lead": "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
      "items": [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis"
      ]
    },
    "humanColumn": {
      "kicker": "Human Control (Strategy & Trust)",
      "title": "Business Judgment & Hard-Floor Guard",
      "lead": "A person approves binding commitments and prices before they go live.",
      "items": [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance"
      ]
    }
  }
} as Record<Locale, OperatingModelCopy>;

export function getOperatingModelCopy(locale: Locale): OperatingModelCopy {
  return operatingModelCopy[locale] ?? operatingModelCopy.en;
}
