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
        "t": "Investigación y datos",
        "d": "La IA monitoriza competidores e intención de forma continua"
      },
      {
        "n": "02",
        "t": "Estrategia y modelo",
        "d": "Las personas fijan objetivos y límites económicos"
      },
      {
        "n": "03",
        "t": "Borradores de producción",
        "d": "La IA sintetiza código, assets, textos y presupuestos"
      },
      {
        "n": "04",
        "t": "Aprobación humana",
        "d": "Revisión en 1 clic vía Telegram o inbox unificado"
      },
      {
        "n": "05",
        "t": "Ejecución",
        "d": "Distribución automatizada vía Meta y pipelines API"
      },
      {
        "n": "06",
        "t": "Optimización",
        "d": "Refinamiento en bucle cerrado según conversiones"
      }
    ],
    "aiColumn": {
      "kicker": "Núcleo IA (velocidad y rutina)",
      "title": "Rendimiento y velocidad continuos",
      "lead": "Tareas repetitivas, monitorización de mercado, borradores de contenido y respuesta inmediata a consultas sin retraso humano.",
      "items": [
        "Inteligencia continua de competidores y tendencias",
        "Borradores automatizados de contenido, visuales y storyboards Reels",
        "Primera respuesta en mensajería y web, luego traspaso a una persona",
        "Precalificación de consultas comerciales entrantes",
        "Cálculos deterministas de presupuestos y especificaciones por fórmulas",
        "Informes analíticos automatizados y análisis de cohortes"
      ]
    },
    "humanColumn": {
      "kicker": "Control humano (estrategia y confianza)",
      "title": "Criterio de negocio y límite duro",
      "lead": "Una persona aprueba compromisos vinculantes y precios antes de publicarlos.",
      "items": [
        "Decisiones estratégicas, estructura del modelo y posicionamiento",
        "Aprobación final de posts de marketing y presupuestos en Telegram",
        "Negociación de contratos enterprise e hitos a medida",
        "Supervisión de voz de marca, guías y ética",
        "Aprobación de compromisos comerciales legalmente vinculantes",
        "Asignación de capital y gobernanza de la red de partners"
      ]
    }
  },
  "pt": {
    "stages": [
      {
        "n": "01",
        "t": "Pesquisa e dados",
        "d": "A IA monitoriza concorrentes e intenção de forma contínua"
      },
      {
        "n": "02",
        "t": "Estratégia e modelo",
        "d": "Pessoas definem metas e limites económicos"
      },
      {
        "n": "03",
        "t": "Rascunhos de produção",
        "d": "A IA sintetiza código, assets, textos e orçamentos"
      },
      {
        "n": "04",
        "t": "Aprovação humana",
        "d": "Revisão em 1 clique via Telegram ou inbox unificado"
      },
      {
        "n": "05",
        "t": "Execução",
        "d": "Distribuição automatizada via Meta e pipelines API"
      },
      {
        "n": "06",
        "t": "Otimização",
        "d": "Refinamento em loop fechado com base em conversões"
      }
    ],
    "aiColumn": {
      "kicker": "Núcleo IA (velocidade e rotina)",
      "title": "Throughput e velocidade contínuos",
      "lead": "Tarefas repetitivas, monitorização de mercado, rascunhos de conteúdo e resposta imediata a pedidos sem atraso humano.",
      "items": [
        "Inteligência contínua de concorrentes e tendências",
        "Rascunhos automatizados de conteúdo, visuais e storyboards Reels",
        "Primeira resposta em mensagens e no site, depois passagem a uma pessoa",
        "Pré-qualificação de pedidos comerciais recebidos",
        "Cálculos deterministas de orçamentos e especificações por fórmulas",
        "Relatórios analíticos automatizados e análise de cohorts"
      ]
    },
    "humanColumn": {
      "kicker": "Controlo humano (estratégia e confiança)",
      "title": "Julgamento de negócio e barreira dura",
      "lead": "Uma pessoa aprova compromissos vinculativos e preços antes de irem ao ar.",
      "items": [
        "Decisões estratégicas, estrutura do modelo e posicionamento",
        "Aprovação final de posts de marketing e orçamentos no Telegram",
        "Negociação de contratos enterprise e marcos personalizados",
        "Supervisão da voz da marca, guidelines e ética",
        "Aprovação de compromissos comerciais legalmente vinculativos",
        "Alocação de capital e governação da rede de parceiros"
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
        "t": "البحث والبيانات",
        "d": "الذكاء الاصطناعي يراقب المنافسين والنية باستمرار"
      },
      {
        "n": "02",
        "t": "الاستراتيجية والنموذج",
        "d": "القيادة البشرية تحدد الأهداف والحدود"
      },
      {
        "n": "03",
        "t": "مسودات الإنتاج",
        "d": "الذكاء الاصطناعي يُنشئ الكود والأصول والنصوص والعروض"
      },
      {
        "n": "04",
        "t": "موافقة بشرية",
        "d": "مراجعة بنقرة واحدة عبر Telegram أو inbox موحد"
      },
      {
        "n": "05",
        "t": "التنفيذ",
        "d": "توزيع آلي عبر Meta وخطوط API"
      },
      {
        "n": "06",
        "t": "التحسين",
        "d": "تحسين مغلق الحلقة بناءً على التحويلات"
      }
    ],
    "aiColumn": {
      "kicker": "نواة IA (السرعة والروتين)",
      "title": "إنتاجية وسرعة مستمرة",
      "lead": "المهام المتكررة ومراقبة السوق ومسودات المحتوى والرد الفوري على الاستفسارات دون تأخير بشري.",
      "items": [
        "استخبارات مستمرة للمنافسين والاتجاهات",
        "مسودات آلية للمحتوى والمرئيات وstoryboards Reels",
        "رد أول في المراسلة والموقع ثم تسليم لشخص",
        "تأهيل مسبق للاستفسارات التجارية الواردة",
        "حسابات حتمية للعروض والمواصفات بالمعادلات",
        "تقارير تحليلية آلية وتحليل cohorts"
      ]
    },
    "humanColumn": {
      "kicker": "التحكم البشري (الاستراتيجية والثقة)",
      "title": "حكم الأعمال وحاجز صلب",
      "lead": "شخص يوافق على الالتزامات والأسعار قبل النشر.",
      "items": [
        "قرارات استراتيجية وبنية النموذج والتموضع",
        "موافقة نهائية على منشورات التسويق والعروض في Telegram",
        "تفاوض عقود enterprise ومعالم مخصصة",
        "إشراف على صوت العلامة والإرشادات والأخلاق",
        "موافقة على التزامات تجارية ملزمة قانوناً",
        "تخصيص رأس المال وحوكمة شبكة الشركاء"
      ]
    }
  },
  "zh": {
    "stages": [
      {
        "n": "01",
        "t": "研究与数据",
        "d": "AI 持续监测竞争对手与意图"
      },
      {
        "n": "02",
        "t": "战略与模型",
        "d": "人设定目标与边界"
      },
      {
        "n": "03",
        "t": "生产草稿",
        "d": "AI 合成代码、素材、文案与报价"
      },
      {
        "n": "04",
        "t": "人工审批",
        "d": "通过 Telegram 或统一 inbox 一键审核"
      },
      {
        "n": "05",
        "t": "执行",
        "d": "经 Meta 与 API 管道自动分发"
      },
      {
        "n": "06",
        "t": "优化",
        "d": "基于转化的闭环优化"
      }
    ],
    "aiColumn": {
      "kicker": "AI 核心（速度与重复运营）",
      "title": "持续吞吐与速度",
      "lead": "重复任务、市场监测、内容草稿与即时 inquiry 处理无需人工延迟。",
      "items": [
        "持续的竞争与趋势情报",
        "自动化内容、视觉草稿与 Reels 分镜",
        "在 messenger 与网站先回复，再转交给人",
        "入站商业 inquiry 预 qualification",
        "按公式的确定性报价与规格计算",
        "自动化分析报告与 cohort 分析"
      ]
    },
    "humanColumn": {
      "kicker": "人工控制（战略与信任）",
      "title": "商业判断与硬底线",
      "lead": "人在上线前批准具有约束力的承诺与价格。",
      "items": [
        "战略决策、模型结构与定位",
        "在 Telegram 最终批准营销帖与报价",
        "enterprise 合同与定制里程碑谈判",
        "品牌语调、规范与伦理监督",
        "批准具有法律约束力的商业承诺",
        "资本配置与 partner 网络治理"
      ]
    }
  },
  "id": {
    "stages": [
      {
        "n": "01",
        "t": "Riset & data",
        "d": "AI memantau pesaing dan intent secara terus-menerus"
      },
      {
        "n": "02",
        "t": "Strategi & model",
        "d": "Manusia menetapkan target dan batas ekonomi"
      },
      {
        "n": "03",
        "t": "Draf produksi",
        "d": "AI mensintesis kode, aset, copy, dan penawaran"
      },
      {
        "n": "04",
        "t": "Persetujuan manusia",
        "d": "Review 1-klik via Telegram atau inbox terpadu"
      },
      {
        "n": "05",
        "t": "Eksekusi",
        "d": "Distribusi otomatis via Meta & pipeline API"
      },
      {
        "n": "06",
        "t": "Optimasi",
        "d": "Penyempurnaan loop tertutup berdasarkan konversi"
      }
    ],
    "aiColumn": {
      "kicker": "Inti AI (kecepatan & rutin)",
      "title": "Throughput & kecepatan berkelanjutan",
      "lead": "Tugas berulang, pemantauan pasar, draf konten, dan penanganan inquiry langsung tanpa delay manusia.",
      "items": [
        "Intelijen pesaing dan tren berkelanjutan",
        "Draf otomatis konten, visual & storyboard Reels",
        "Balasan pertama di messenger dan situs, lalu handoff ke orang",
        "Pra-kualifikasi inquiry komersial masuk",
        "Kalkulasi penawaran & spesifikasi deterministik by formula",
        "Laporan analitik otomatis & analisis cohort"
      ]
    },
    "humanColumn": {
      "kicker": "Kontrol manusia (strategi & kepercayaan)",
      "title": "Penilaian bisnis & guard keras",
      "lead": "Orang menyetujui komitmen mengikat dan harga sebelum live.",
      "items": [
        "Keputusan strategis, struktur model, dan positioning",
        "Persetujuan akhir post marketing & penawaran di Telegram",
        "Negosiasi kontrak enterprise & milestone kustom",
        "Pengawasan suara brand, guideline, dan etika",
        "Persetujuan komitmen komersial mengikat secara hukum",
        "Alokasi modal dan tata kelola jaringan partner"
      ]
    }
  },
  "vi": {
    "stages": [
      {
        "n": "01",
        "t": "Nghiên cứu & dữ liệu",
        "d": "AI theo dõi đối thủ và ý định liên tục"
      },
      {
        "n": "02",
        "t": "Chiến lược & mô hình",
        "d": "Con người đặt mục tiêu và ranh giới kinh tế"
      },
      {
        "n": "03",
        "t": "Bản nháp sản xuất",
        "d": "AI tổng hợp code, asset, copy và báo giá"
      },
      {
        "n": "04",
        "t": "Phê duyệt con người",
        "d": "Review 1 cú nhấp qua Telegram hoặc inbox thống nhất"
      },
      {
        "n": "05",
        "t": "Thực thi",
        "d": "Phân phối tự động qua Meta & pipeline API"
      },
      {
        "n": "06",
        "t": "Tối ưu",
        "d": "Tinh chỉnh vòng kín dựa trên conversion"
      }
    ],
    "aiColumn": {
      "kicker": "Lõi AI (tốc độ & vận hành lặp)",
      "title": "Thông lượng & tốc độ liên tục",
      "lead": "Tác vụ lặp, theo dõi thị trường, bản nháp nội dung và xử lý inquiry ngay không trễ con người.",
      "items": [
        "Tình báo đối thủ và xu hướng liên tục",
        "Bản nháp tự động nội dung, visual & storyboard Reels",
        "Trả lời đầu trên messenger và site, rồi handoff cho người",
        "Tiền qualification inquiry thương mại đến",
        "Tính báo giá & spec deterministic theo công thức",
        "Báo cáo phân tích tự động & phân tích cohort"
      ]
    },
    "humanColumn": {
      "kicker": "Kiểm soát con người (chiến lược & tin cậy)",
      "title": "Phán quyết kinh doanh & guard cứng",
      "lead": "Một người duyệt cam kết ràng buộc và giá trước khi live.",
      "items": [
        "Quyết định chiến lược, cấu trúc mô hình và positioning",
        "Duyệt cuối bài marketing & báo giá trên Telegram",
        "Đàm phán hợp đồng enterprise & milestone tùy chỉnh",
        "Giám sát giọng thương hiệu, guideline và đạo đức",
        "Duyệt cam kết thương mại ràng buộc pháp lý",
        "Phân bổ vốn và quản trị mạng partner"
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
        "d": "Menschen setzen Ziele und wirtschaftliche Grenzen"
      },
      {
        "n": "03",
        "t": "Produktionsentwürfe",
        "d": "KI erstellt Code, Assets, Texte und Angebote"
      },
      {
        "n": "04",
        "t": "Freigabe durch Menschen",
        "d": "1-Klick-Freigabe via Telegram oder Unified Inbox"
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
        "t": "Recherche et données",
        "d": "L'IA surveille en continu concurrents et intention"
      },
      {
        "n": "02",
        "t": "Stratégie et modèle",
        "d": "Les humains fixent cibles et limites économiques"
      },
      {
        "n": "03",
        "t": "Brouillons de production",
        "d": "L'IA synthétise code, assets, textes et devis"
      },
      {
        "n": "04",
        "t": "Validation humaine",
        "d": "Revue en 1 clic via Telegram ou inbox unifié"
      },
      {
        "n": "05",
        "t": "Exécution",
        "d": "Distribution automatisée via Meta et pipelines API"
      },
      {
        "n": "06",
        "t": "Optimisation",
        "d": "Affinage en boucle fermée selon les conversions"
      }
    ],
    "aiColumn": {
      "kicker": "Cœur IA (vitesse et routine)",
      "title": "Débit et vitesse continus",
      "lead": "Tâches répétitives, veille marché, brouillons contenu et réponse immédiate aux demandes sans délai humain.",
      "items": [
        "Veille concurrentielle et tendances en continu",
        "Brouillons automatisés contenu, visuels et storyboards Reels",
        "Première réponse messagerie et site, puis transfert à une personne",
        "Pré-qualification des demandes commerciales entrantes",
        "Calculs déterministes de devis et specs par formules",
        "Rapports analytics automatisés et analyse de cohortes"
      ]
    },
    "humanColumn": {
      "kicker": "Contrôle humain (stratégie et confiance)",
      "title": "Jugement métier et garde-fou dur",
      "lead": "Une personne valide engagements contraignants et prix avant publication.",
      "items": [
        "Décisions stratégiques, structure du modèle et positionnement",
        "Validation finale des posts marketing et devis sur Telegram",
        "Négociation de contrats enterprise et jalons sur mesure",
        "Supervision voix de marque, guidelines et éthique",
        "Validation d'engagements commerciaux juridiquement contraignants",
        "Allocation de capital et gouvernance du réseau partenaires"
      ]
    }
  },
  "ja": {
    "stages": [
      {
        "n": "01",
        "t": "リサーチとデータ",
        "d": "AIが競合とインテントを継続監視"
      },
      {
        "n": "02",
        "t": "戦略とモデル",
        "d": "人が目標と経済的な境界を設定"
      },
      {
        "n": "03",
        "t": "制作ドラフト",
        "d": "AIがコード、アセット、コピー、見積を合成"
      },
      {
        "n": "04",
        "t": "人の承認",
        "d": "Telegramまたは統合inboxで1クリックレビュー"
      },
      {
        "n": "05",
        "t": "実行",
        "d": "MetaとAPIパイプラインで自動配信"
      },
      {
        "n": "06",
        "t": "最適化",
        "d": "コンバージョンに基づく閉ループ改善"
      }
    ],
    "aiColumn": {
      "kicker": "AIコア（速度と反復運用）",
      "title": "継続的なスループットと速度",
      "lead": "反復タスク、市場監視、コンテンツ草案、問い合わせへの即時対応を人の遅延なく。",
      "items": [
        "競合・トレンドの継続インテリジェンス",
        "コンテンツ、ビジュアル、Reels storyboardの自動草案",
        "メッセンジャーとサイトで最初に返信し、その後人へ handoff",
        "流入商業問い合わせの事前 qualification",
        "公式による決定論的見積・仕様計算",
        "自動分析レポートと cohort 分析"
      ]
    },
    "humanColumn": {
      "kicker": "人のコントロール（戦略と信頼）",
      "title": "ビジネス判断とハードフロア",
      "lead": "公開前に拘束力のある約束と価格を人が承認。",
      "items": [
        "戦略的意思決定、モデル構造、ポジショニング",
        "Telegramでのマーケ投稿・見積の最終承認",
        "エンタープライズ契約とカスタムマイルストーン交渉",
        "ブランドボイス、ガイドライン、倫理の監督",
        "法的拘束力のある商業約束の承認",
        "資本配分とパートナーネットワークガバナンス"
      ]
    }
  },
  "tr": {
    "stages": [
      {
        "n": "01",
        "t": "Araştırma ve veri",
        "d": "AI rakipleri ve niyeti sürekli izler"
      },
      {
        "n": "02",
        "t": "Strateji ve model",
        "d": "İnsanlar hedef ve sınırları belirler"
      },
      {
        "n": "03",
        "t": "Üretim taslakları",
        "d": "AI kod, varlık, metin ve teklif üretir"
      },
      {
        "n": "04",
        "t": "İnsan onayı",
        "d": "Telegram veya birleşik inbox ile 1 tık inceleme"
      },
      {
        "n": "05",
        "t": "Yürütme",
        "d": "Meta ve API hatlarıyla otomatik dağıtım"
      },
      {
        "n": "06",
        "t": "Optimizasyon",
        "d": "Dönüşümlere dayalı kapalı döngü iyileştirme"
      }
    ],
    "aiColumn": {
      "kicker": "AI çekirdeği (hız ve tekrarlayan iş)",
      "title": "Sürekli throughput ve hız",
      "lead": "Tekrarlayan görevler, pazar izleme, içerik taslakları ve anında talep yanıtı insan gecikmesi olmadan.",
      "items": [
        "Sürekli rakip ve trend istihbaratı",
        "Otomatik içerik, görsel taslaklar ve Reels storyboard",
        "Messenger ve sitede ilk yanıt, sonra insana devir",
        "Gelen ticari taleplerin ön nitelendirilmesi",
        "Formüllerle deterministik teklif ve spec hesapları",
        "Otomatik analitik raporlar ve cohort analizi"
      ]
    },
    "humanColumn": {
      "kicker": "İnsan kontrolü (strateji ve güven)",
      "title": "İş yargısı ve sert taban",
      "lead": "Bir kişi bağlayıcı taahhütleri ve fiyatları yayına almadan onaylar.",
      "items": [
        "Stratejik kararlar, model yapısı ve konumlandırma",
        "Telegram'da pazarlama gönderileri ve tekliflerin nihai onayı",
        "Kurumsal sözleşmeler ve özel kilometre taşları müzakere",
        "Marka sesi, kılavuzlar ve etik denetimi",
        "Hukuken bağlayıcı ticari taahhütlerin onayı",
        "Sermaye tahsisi ve partner ağı yönetişimi"
      ]
    }
  }
};

export function getOperatingModelCopy(locale: Locale): OperatingModelCopy {
  return operatingModelCopy[locale] ?? operatingModelCopy.en;
}