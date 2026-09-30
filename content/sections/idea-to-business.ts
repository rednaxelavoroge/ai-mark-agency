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
  artifactGrid: string[];
  artifactBrandSubtitle: string;
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
    "artifactGrid": [
      "Segments",
      "Pricing",
      "Channels",
      "CAC / LTV"
    ],
    "artifactBrandSubtitle": "identity system",
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
    "lead": "No es una pila de proveedores — un contorno gobernado: mercado, modelo, producto, IA y demanda.",
    "stagesOverviewTitle": "Cada etapa del contorno",
    "artifactMicro": {
      "seed": "idea · hipótesis"
    },
    "artifactGrid": [
      "Segmentos",
      "Monetización",
      "Canales",
      "Coste adq. / LTV"
    ],
    "artifactBrandSubtitle": "sistema de identidad",
    "stages": [
      {
        "kicker": "Entrada",
        "title": "Idea o capital",
        "body": "Partimos de una hipótesis, una empresa en marcha o un rango de capital — y fijamos el objetivo.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Investigación de mercado",
        "body": "Demanda, competidores, barreras de entrada y unit economics basados en datos reales.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Modelo de negocio",
        "body": "Armamos el modelo: segmentos, monetización, canales y coste de adquisición.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Marca",
        "body": "Posicionamiento, identidad y voz — un sistema, no un logo añadido después.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Producto digital",
        "body": "Plataforma, workspaces, cálculos e integraciones sobre los que opera el negocio.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "Infraestructura IA",
        "body": "Agentes IA propios integrados en operaciones: contenido, inbox de ventas y cotizaciones.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing y ventas",
        "body": "Captación, calificación y cierre en la misma infra — no herramientas dispersas.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Crecimiento",
        "body": "Analítica, optimización y la red de partners escalan un modelo que ya funciona.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Entrada: una idea, una empresa en marcha o un rango de capital.",
      "bars": "Analítica de mercado: demanda, competidores y unit economics.",
      "grid": "Modelo: segmentos, monetización, canales y coste de adquisición.",
      "brand": "Identidad: posicionamiento, voz y sistema visual.",
      "product": "Producto digital: workspaces, cálculos, integraciones y datos.",
      "ai": "Agentes IA en operaciones: contenido, inbox de ventas, cotizaciones por catálogo.",
      "funnel": "Ventas: flujo de consultas, calificación y cierres.",
      "growth": "Crecimiento: métricas, optimización y red de partners."
    },
    "artifactLabel": {
      "bars": "demanda · competidores",
      "product": "workspaces · cotizaciones",
      "ai": "RAG · agentes",
      "funnel": "consultas → cierres",
      "growth": "métricas · red"
    }
  },
  "pt": {
    "eyebrow": "Contorno contínuo",
    "title": "Como uma ideia se torna um negócio em funcionamento.",
    "lead": "Não é uma pilha de fornecedores — um contorno governado: mercado, modelo, produto, IA e procura.",
    "stagesOverviewTitle": "Cada fase do contorno",
    "artifactMicro": {
      "seed": "ideia · hipótese"
    },
    "artifactGrid": [
      "Segmentos",
      "Monetização",
      "Canais",
      "Custo de aquisição / LTV"
    ],
    "artifactBrandSubtitle": "sistema de identidade",
    "stages": [
      {
        "kicker": "Entrada",
        "title": "Ideia ou capital",
        "body": "Começamos com hipótese, empresa em operação ou volume de capital — e fixamos o objetivo.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Pesquisa de mercado",
        "body": "Procura, concorrentes, barreiras de entrada e unit economics com dados reais.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Modelo de negócio",
        "body": "Montamos o modelo: segmentos, monetização, canais e custo de aquisição.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Marca",
        "body": "Posicionamento, identidade e voz — um sistema, não um logótipo colado depois.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Produto digital",
        "body": "Plataforma, workspaces, cálculos e integrações em que o negócio opera.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "Infraestrutura IA",
        "body": "Agentes IA próprios nas operações: conteúdo, inbox de vendas e orçamentos.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing e vendas",
        "body": "Captação, qualificação e fecho na mesma infra — não ferramentas soltas.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Crescimento",
        "body": "Analytics, otimização e a rede de parceiros escalam um modelo que já funciona.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Entrada: ideia, negócio em operação ou volume de capital.",
      "bars": "Análise de mercado: procura, concorrentes e unit economics.",
      "grid": "Modelo: segmentos, monetização, canais e custo de aquisição.",
      "brand": "Identidade: posicionamento, voz e sistema visual.",
      "product": "Produto digital: workspaces, cálculos, integrações e dados.",
      "ai": "Agentes IA nas operações: conteúdo, inbox de vendas, orçamentos por catálogo.",
      "funnel": "Vendas: fluxo de pedidos, qualificação e fechos.",
      "growth": "Crescimento: métricas, otimização e rede de parceiros."
    },
    "artifactLabel": {
      "bars": "procura · concorrentes",
      "product": "workspaces · orçamentos",
      "ai": "RAG · agentes",
      "funnel": "pedidos → fechos",
      "growth": "métricas · rede"
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
    "artifactGrid": [
      "Сегменты",
      "Монетизация",
      "Каналы",
      "Стоимость привлечения / LTV"
    ],
    "artifactBrandSubtitle": "система айдентики",
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
    "eyebrow": "مسار متصل",
    "title": "كيف تتحول الفكرة إلى عمل قائم.",
    "lead": "ليس مجموعة مقاولين — مسار واحد مُدار: السوق، النموذج، المنتج، الذكاء الاصطناعي والطلب.",
    "stagesOverviewTitle": "كل مرحلة في المسار",
    "artifactMicro": {
      "seed": "فكرة · فرضية"
    },
    "artifactGrid": [
      "الشرائح",
      "تحقيق الدخل",
      "القنوات",
      "تكلفة الاكتساب / LTV"
    ],
    "artifactBrandSubtitle": "نظام الهوية",
    "stages": [
      {
        "kicker": "المدخل",
        "title": "فكرة أو رأس مال",
        "body": "نبدأ من فرضية أو شركة قائمة أو حجم رأس مال — ونحدد الهدف.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "بحث السوق",
        "body": "الطلب والمنافسون وحواجز الدخول واقتصاديات الوحدة على بيانات حقيقية.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "نموذج العمل",
        "body": "نبني النموذج: الشرائح، تحقيق الدخل، القنوات وتكلفة الاكتساب.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "العلامة",
        "body": "الت positioning والهوية والصوت — نظام وليس شعاراً لاحقاً.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "المنتج الرقمي",
        "body": "منصة ومساحات عمل وحسابات وتكاملات يعمل عليها العمل.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "بنية الذكاء الاصطناعي",
        "body": "وكلاء IA ملكيون مدمجون في التشغيل: المحتوى، صندوق المبيعات والعروض.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "التسويق والمبيعات",
        "body": "جذب الطلب والتأهيل والصفقات على نفس البنية.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "النمو",
        "body": "التحليلات والتحسين وشبكة الشركاء توسّع نموذجاً يعمل بالفعل.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "المدخل: فكرة أو شركة قائمة أو حجم رأس مال.",
      "bars": "تحليلات السوق: الطلب والمنافسون واقتصاديات الوحدة.",
      "grid": "النموذج: الشرائح، تحقيق الدخل، القنوات وتكلفة الاكتساب.",
      "brand": "الهوية: الت positioning والصوت والنظام البصري.",
      "product": "المنتج الرقمي: مساحات العمل والحسابات والتكاملات والبيانات.",
      "ai": "وكلاء IA في التشغيل: المحتوى، صندوق المبيعات، عروض الكatalog.",
      "funnel": "المبيعات: تدفق الاستفسارات والتأهيل والصفقات.",
      "growth": "النمو: المقاييس والتحسين وشبكة الشركاء."
    },
    "artifactLabel": {
      "bars": "الطلب · المنافسون",
      "product": "مساحات · عروض",
      "ai": "RAG · وكلاء",
      "funnel": "استفسارات → صفقات",
      "growth": "مقاييس · شبكة"
    }
  },
  "zh": {
    "eyebrow": "连贯路径",
    "title": "想法如何变成可运转的业务。",
    "lead": "不是一堆外包商——一条可治理的路径：市场、模型、产品、AI 与需求。",
    "stagesOverviewTitle": "路径的每个阶段",
    "artifactMicro": {
      "seed": "想法 · 假设"
    },
    "artifactGrid": [
      "细分",
      "变现",
      "渠道",
      "获客成本 / LTV"
    ],
    "artifactBrandSubtitle": "识别体系",
    "stages": [
      {
        "kicker": "入口",
        "title": "想法或资本",
        "body": "从假设、在营企业或资本规模出发——明确目标。",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "市场研究",
        "body": "基于真实数据的需求、竞争、进入壁垒与单位经济。",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "商业模式",
        "body": "搭建模型：细分、变现、渠道与获客成本。",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "品牌",
        "body": "定位、识别与语调——体系而非事后补丁的 logo。",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "数字产品",
        "body": "业务实际运行的平台、工作区、计算与集成。",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI 基础设施",
        "body": "自研 AI 代理嵌入运营：内容、销售 inbox、报价。",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "营销与销售",
        "body": "在同一基础设施上获客、 qualification 与成交。",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "增长",
        "body": "分析、优化与 partner 网络放大已验证的模型。",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "入口：想法、在营企业或资本规模。",
      "bars": "市场分析：需求、竞争与单位经济。",
      "grid": "模型：细分、变现、渠道与获客成本。",
      "brand": "识别：定位、语调与视觉体系。",
      "product": "数字产品：工作区、计算、集成与数据。",
      "ai": "运营中的 AI 代理：内容、销售 inbox、目录报价。",
      "funnel": "销售：咨询流、qualification 与成交。",
      "growth": "增长：指标、优化与 partner 网络。"
    },
    "artifactLabel": {
      "bars": "需求 · 竞争",
      "product": "工作区 · 报价",
      "ai": "RAG · 代理",
      "funnel": "咨询 → 成交",
      "growth": "指标 · 网络"
    }
  },
  "id": {
    "eyebrow": "Kontur berkelanjutan",
    "title": "Bagaimana ide menjadi bisnis yang berjalan.",
    "lead": "Bukan tumpukan vendor — satu kontur terkendali: pasar, model, produk, AI, dan permintaan.",
    "stagesOverviewTitle": "Setiap tahap kontur",
    "artifactMicro": {
      "seed": "ide · hipotesis"
    },
    "artifactGrid": [
      "Segmen",
      "Monetisasi",
      "Saluran",
      "Biaya akuisisi / LTV"
    ],
    "artifactBrandSubtitle": "sistem identitas",
    "stages": [
      {
        "kicker": "Masuk",
        "title": "Ide atau modal",
        "body": "Kami mulai dari hipotesis, perusahaan berjalan, atau kisaran modal — lalu menetapkan tujuan.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Riset pasar",
        "body": "Permintaan, pesaing, hambatan masuk, dan unit economics berbasis data nyata.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Model bisnis",
        "body": "Kami susun model: segmen, monetisasi, saluran, dan biaya akuisisi.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Merek",
        "body": "Positioning, identitas, dan suara — sistem, bukan logo tempelan.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Produk digital",
        "body": "Platform, workspace, kalkulasi, dan integrasi tempat bisnis beroperasi.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "Infrastruktur AI",
        "body": "Agen AI proprietary di operasi: konten, inbox penjualan, penawaran.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & penjualan",
        "body": "Permintaan, kualifikasi, dan deal di infra yang sama.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Pertumbuhan",
        "body": "Analitik, optimasi, dan jaringan partner memperbesar model yang sudah jalan.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Masuk: ide, bisnis berjalan, atau kisaran modal.",
      "bars": "Analitik pasar: permintaan, pesaing, unit economics.",
      "grid": "Model: segmen, monetisasi, saluran, biaya akuisisi.",
      "brand": "Identitas: positioning, suara, sistem visual.",
      "product": "Produk digital: workspace, kalkulasi, integrasi, data.",
      "ai": "Agen AI di operasi: konten, inbox penjualan, penawaran katalog.",
      "funnel": "Penjualan: alur inquiry, kualifikasi, deal.",
      "growth": "Pertumbuhan: metrik, optimasi, jaringan partner."
    },
    "artifactLabel": {
      "bars": "permintaan · pesaing",
      "product": "workspace · penawaran",
      "ai": "RAG · agen",
      "funnel": "inquiry → deal",
      "growth": "metrik · jaringan"
    }
  },
  "vi": {
    "eyebrow": "Chuỗi liên tục",
    "title": "Ý tưởng trở thành doanh nghiệp vận hành thế nào.",
    "lead": "Không phải chồng nhà thầu — một chuỗi được quản trị: thị trường, mô hình, sản phẩm, AI và nhu cầu.",
    "stagesOverviewTitle": "Mọi giai đoạn của chuỗi",
    "artifactMicro": {
      "seed": "ý tưởng · giả thuyết"
    },
    "artifactGrid": [
      "Phân khúc",
      "Monet hóa",
      "Kênh",
      "Chi phí thu hút / LTV"
    ],
    "artifactBrandSubtitle": "hệ thống nhận diện",
    "stages": [
      {
        "kicker": "Đầu vào",
        "title": "Ý tưởng hoặc vốn",
        "body": "Bắt đầu từ giả thuyết, doanh nghiệp đang chạy hoặc quy mô vốn — rồi chốt mục tiêu.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Nghiên cứu thị trường",
        "body": "Nhu cầu, đối thủ, rào cản gia nhập và unit economics trên dữ liệu thật.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Mô hình kinh doanh",
        "body": "Lắp mô hình: phân khúc, monet hóa, kênh và chi phí acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Thương hiệu",
        "body": "Đ positioning, nhận diện và giọng — hệ thống, không phải logo vá sau.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Sản phẩm số",
        "body": "Nền tảng, workspace, tính toán và tích hợp doanh nghiệp chạy trên đó.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "Hạ tầng AI",
        "body": "Agent AI proprietary trong vận hành: nội dung, inbox bán hàng, báo giá.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing & bán hàng",
        "body": "Thu nhu cầu, qualification và chốt deal trên cùng hạ tầng.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Tăng trưởng",
        "body": "Phân tích, tối ưu và mạng partner mở rộng mô hình đã chạy.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Đầu vào: ý tưởng, doanh nghiệp đang chạy hoặc quy mô vốn.",
      "bars": "Phân tích thị trường: nhu cầu, đối thủ, unit economics.",
      "grid": "Mô hình: phân khúc, monet hóa, kênh, chi phí acquisition.",
      "brand": "Nhận diện: positioning, giọng, hệ thống visual.",
      "product": "Sản phẩm số: workspace, tính toán, tích hợp, dữ liệu.",
      "ai": "Agent AI trong vận hành: nội dung, inbox bán hàng, báo giá catalog.",
      "funnel": "Bán hàng: luồng inquiry, qualification, deal.",
      "growth": "Tăng trưởng: metric, tối ưu, mạng partner."
    },
    "artifactLabel": {
      "bars": "nhu cầu · đối thủ",
      "product": "workspace · báo giá",
      "ai": "RAG · agent",
      "funnel": "inquiry → deal",
      "growth": "metric · mạng"
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
    "artifactGrid": [
      "Segmente",
      "Monetarisierung",
      "Kanäle",
      "Akquisitionskosten / LTV"
    ],
    "artifactBrandSubtitle": "Identitätssystem",
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
    "eyebrow": "Contour continu",
    "title": "Comment une idée devient une entreprise qui fonctionne.",
    "lead": "Pas une pile de prestataires — un contour piloté : marché, modèle, produit, IA et demande.",
    "stagesOverviewTitle": "Chaque étape du contour",
    "artifactMicro": {
      "seed": "idée · hypothèse"
    },
    "artifactGrid": [
      "Segments marché",
      "Monétisation",
      "Canaux",
      "Coût d'acquisition / LTV"
    ],
    "artifactBrandSubtitle": "système d'identité",
    "stages": [
      {
        "kicker": "Entrée",
        "title": "Idée ou capital",
        "body": "Nous partons d'une hypothèse, d'une entreprise en activité ou d'une enveloppe de capital — et fixons l'objectif.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Étude de marché",
        "body": "Demande, concurrents, barrières à l'entrée et unit economics sur des données réelles.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "Modèle économique",
        "body": "Nous construisons le modèle : segments, monétisation, canaux et coût d'acquisition.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Marque",
        "body": "Positionnement, identité et voix — un système, pas un logo ajouté après coup.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Produit digital",
        "body": "Plateforme, workspaces, calculs et intégrations sur lesquels l'entreprise opère.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "Infrastructure IA",
        "body": "Agents IA propriétaires intégrés aux opérations : contenu, inbox ventes, devis.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Marketing et ventes",
        "body": "Capture, qualification et deals sur la même infra — pas d'outils éparpillés.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Croissance",
        "body": "Analytics, optimisation et le réseau partenaires font monter un modèle déjà viable.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Entrée : idée, entreprise en activité ou enveloppe de capital.",
      "bars": "Analyse marché : demande, concurrents et unit economics.",
      "grid": "Modèle : segments, monétisation, canaux et coût d'acquisition.",
      "brand": "Identité : positionnement, voix et système visuel.",
      "product": "Produit digital : workspaces, calculs, intégrations et données.",
      "ai": "Agents IA en opérations : contenu, inbox ventes, devis catalogue.",
      "funnel": "Ventes : flux de demandes, qualification et signatures.",
      "growth": "Croissance : métriques, optimisation et réseau partenaires."
    },
    "artifactLabel": {
      "bars": "demande · concurrents",
      "product": "workspaces · devis",
      "ai": "RAG · agents",
      "funnel": "demandes → deals",
      "growth": "métriques · réseau"
    }
  },
  "ja": {
    "eyebrow": "連続するコンター",
    "title": "アイデアが動くビジネスになるまで。",
    "lead": "業者の寄せ集めではなく、市場・モデル・プロダクト・AI・需要をつなぐ一つの管理されたコンター。",
    "stagesOverviewTitle": "コンターの各段階",
    "artifactMicro": {
      "seed": "アイデア · 仮説"
    },
    "artifactGrid": [
      "セグメント",
      "マネタイズ",
      "チャネル",
      "獲得コスト / LTV"
    ],
    "artifactBrandSubtitle": "アイデンティティ体系",
    "stages": [
      {
        "kicker": "入力",
        "title": "アイデアまたは資本",
        "body": "仮説、稼働中の会社、または資本規模から始め、目標を定めます。",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "市場調査",
        "body": "需要、競合、参入障壁、ユニットエコノミクスを実データで。",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "ビジネスモデル",
        "body": "セグメント、マネタイズ、チャネル、獲得コストを組み立てます。",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "ブランド",
        "body": "ポジショニング、アイデンティティ、トーン — 後付けロゴではなく体系。",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "デジタルプロダクト",
        "body": "事業が実際に動くプラットフォーム、ワークスペース、計算、連携。",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AIインフラ",
        "body": "自社AIエージェントを運用に組み込み：コンテンツ、セールス inbox、見積。",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "マーケとセールス",
        "body": "同じインフラ上で需要獲得、 qualification、成約。",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "成長",
        "body": "分析、最適化、パートナーネットワークで稼働モデルを拡大。",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "入力：アイデア、稼働中の会社、または資本規模。",
      "bars": "市場分析：需要、競合、ユニットエコノミクス。",
      "grid": "モデル：セグメント、マネタイズ、チャネル、獲得コスト。",
      "brand": "アイデンティティ：ポジショニング、トーン、ビジュアル体系。",
      "product": "デジタルプロダクト：ワークスペース、計算、連携、データ。",
      "ai": "運用のAIエージェント：コンテンツ、セールス inbox、カタログ見積。",
      "funnel": "セールス：問い合わせフロー、 qualification、成約。",
      "growth": "成長：指標、最適化、パートナーネットワーク。"
    },
    "artifactLabel": {
      "bars": "需要 · 競合",
      "product": "workspace · 見積",
      "ai": "RAG · エージェント",
      "funnel": "問い合わせ → 成約",
      "growth": "指標 · ネットワーク"
    }
  },
  "tr": {
    "eyebrow": "Sürekli kontur",
    "title": "Bir fikir nasıl çalışan bir işletmeye dönüşür.",
    "lead": "Yüklenici yığını değil — yönetilen tek kontur: pazar, model, ürün, AI ve talep.",
    "stagesOverviewTitle": "Konturun her aşaması",
    "artifactMicro": {
      "seed": "fikir · hipotez"
    },
    "artifactGrid": [
      "Segmentler",
      "Monetizasyon",
      "Kanallar",
      "Edinme maliyeti / LTV"
    ],
    "artifactBrandSubtitle": "kimlik sistemi",
    "stages": [
      {
        "kicker": "Giriş",
        "title": "Fikir veya sermaye",
        "body": "Hipotez, faal bir şirket veya sermaye aralığından başlarız — hedefi netleştiririz.",
        "artifact": "seed"
      },
      {
        "kicker": "01",
        "title": "Pazar araştırması",
        "body": "Gerçek verilere dayalı talep, rakipler, giriş engelleri ve unit economics.",
        "artifact": "bars"
      },
      {
        "kicker": "02",
        "title": "İş modeli",
        "body": "Modeli kurarız: segmentler, monetizasyon, kanallar ve edinme maliyeti.",
        "artifact": "grid"
      },
      {
        "kicker": "03",
        "title": "Marka",
        "body": "Konumlandırma, kimlik ve ses — sonradan yapıştırılan logo değil sistem.",
        "artifact": "brand"
      },
      {
        "kicker": "04",
        "title": "Dijital ürün",
        "body": "İşletmenin çalıştığı platform, workspace, hesaplamalar ve entegrasyonlar.",
        "artifact": "product"
      },
      {
        "kicker": "05",
        "title": "AI altyapısı",
        "body": "Operasyona gömülü özel AI ajanları: içerik, satış inbox, teklif.",
        "artifact": "ai"
      },
      {
        "kicker": "06",
        "title": "Pazarlama ve satış",
        "body": "Aynı altyapıda talep, nitelendirme ve anlaşmalar.",
        "artifact": "funnel"
      },
      {
        "kicker": "07",
        "title": "Büyüme",
        "body": "Analitik, optimizasyon ve partner ağı çalışan modeli ölçekler.",
        "artifact": "growth"
      }
    ],
    "artifactCaption": {
      "seed": "Giriş: fikir, faal işletme veya sermaye aralığı.",
      "bars": "Pazar analitiği: talep, rakipler, unit economics.",
      "grid": "Model: segmentler, monetizasyon, kanallar, edinme maliyeti.",
      "brand": "Kimlik: konumlandırma, ses, görsel sistem.",
      "product": "Dijital ürün: workspace, hesaplamalar, entegrasyonlar, veri.",
      "ai": "Operasyondaki AI ajanları: içerik, satış inbox, katalog teklifi.",
      "funnel": "Satış: talep akışı, nitelendirme, anlaşmalar.",
      "growth": "Büyüme: metrikler, optimizasyon, partner ağı."
    },
    "artifactLabel": {
      "bars": "talep · rakipler",
      "product": "workspace · teklif",
      "ai": "RAG · ajanlar",
      "funnel": "talepler → anlaşmalar",
      "growth": "metrikler · ağ"
    }
  }
};

export function getIdeaToBusinessCopy(locale: Locale): IdeaToBusinessCopy {
  return ideaToBusinessCopy[locale] ?? ideaToBusinessCopy.en;
}