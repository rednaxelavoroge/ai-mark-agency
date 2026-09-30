/**
 * Patch pillars, pipeline, tech, and hero soft/extra strings in public copy locales.
 * Keeps the same structure and key count as en.ts (parity-safe).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const locales = ["es", "pt", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const patches = {
  de: {
    navWhatWeDo: "Leistungen",
    hero: {
      extra:
        "Wir schaffen und skalieren digitale Unternehmen auf eigener KI-Infrastruktur.",
      soft:
        "Wir begleiten Sie von einer Idee oder einer Research-Briefing bis zu etwas, das gebaut, gestartet und betrieben wird.",
    },
    pillars: {
      eyebrow: "Was wir tun",
      title: "Fünf Teile derselben Schleife.",
      items: [
        {
          title: "Unternehmensgründung",
          body:
            "Von einer Idee, einem bestehenden Unternehmen oder Kapital — wir formen ein Modell, das der Markt tragen kann.",
        },
        {
          title: "Digitale Produktion",
          body:
            "Websites, Apps, Plattformen, Kundenportale, Integrationen und KI-Systeme, auf denen das Unternehmen läuft.",
        },
        {
          title: "KI-Marketing",
          body:
            "Strategie, Content, Creatives, Ads und Analytics als kontinuierlicher Zyklus — kein monatlicher Stapel.",
        },
        {
          title: "KI-Vertrieb",
          body:
            "Vom ersten Kontakt über Qualifizierung und Angebot bis zur Kalkulation — AI Business Assistant und SHOWROOM AI.",
        },
        {
          title: "Wachstum",
          body: "Analytics, Optimierung, Automatisierung und Skalierung auf derselben Infrastruktur.",
        },
      ],
    },
    pipeline: {
      eyebrow: "Der Weg",
      title: "Eine Sequenz. Einstieg in jedem Schritt.",
      steps: [
        "Idee / Kapital",
        "Marktforschung",
        "Geschäftsmodell",
        "Marke",
        "Produkt / Plattform",
        "KI-Infrastruktur",
        "Marketing",
        "Vertrieb",
        "Wachstum",
      ],
    },
    tech: {
      eyebrow: "Technische Basis",
      title: "Kern-KI-Infrastruktur — bereits gebaut und kommerziell im Einsatz.",
      lead:
        "Wir verkaufen keinen Stack, den wir später zusammenbauen wollen. Drei Produkte sitzen heute im Loop — als Betriebssystem der Delivery und als SKUs, die Sie betreiben können.",
    },
    creation: { eyebrow: "Unternehmensgründung" },
    production: { eyebrow: "Digitale Produktion" },
  },
  es: {
    navWhatWeDo: "Qué hacemos",
    hero: {
      extra:
        "Creamos y escalamos negocios digitales utilizando nuestra propia infraestructura de IA.",
      soft:
        "Le ayudamos a pasar de una idea o un brief de investigación a algo construido, lanzado y operado.",
    },
    pillars: {
      eyebrow: "Qué hacemos",
      title: "Cinco partes del mismo circuito.",
      items: [
        {
          title: "Creación de negocios",
          body:
            "Desde una idea, una empresa existente o capital — formamos un modelo que el mercado puede sostener.",
        },
        {
          title: "Producción digital",
          body:
            "Sitios, apps, plataformas, paneles, integraciones y sistemas de IA sobre los que opera el negocio.",
        },
        {
          title: "Marketing con IA",
          body:
            "Estrategia, contenido, creativos, anuncios y analítica como ciclo continuo — no un volcado mensual.",
        },
        {
          title: "Ventas con IA",
          body:
            "Desde la primera consulta hasta la calificación, el encaje de solución y la propuesta — AI Business Assistant y SHOWROOM AI.",
        },
        {
          title: "Crecimiento",
          body: "Analítica, optimización, automatización y escala en la misma infraestructura.",
        },
      ],
    },
    pipeline: {
      eyebrow: "El camino",
      title: "Una secuencia. Entra en cualquier paso.",
      steps: [
        "Idea / capital",
        "Investigación de mercado",
        "Modelo de negocio",
        "Marca",
        "Producto / plataforma",
        "Infraestructura de IA",
        "Marketing",
        "Ventas",
        "Crecimiento",
      ],
    },
    tech: {
      eyebrow: "Base tecnológica",
      title: "Infraestructura de IA central ya construida y usada comercialmente.",
      lead:
        "No vendemos un stack que planeamos armar después. Tres productos están en el circuito hoy — como sistema operativo de entrega y como SKUs que puede operar.",
    },
    creation: { eyebrow: "Creación de negocios" },
    production: { eyebrow: "Producción digital" },
  },
  pt: {
    navWhatWeDo: "O que fazemos",
    hero: {
      extra:
        "Criamos e escalamos negócios digitais utilizando nossa própria infraestrutura de IA.",
      soft:
        "Ajudamos você a ir de uma ideia ou briefing de pesquisa a algo construído, lançado e operado.",
    },
    pillars: {
      eyebrow: "O que fazemos",
      title: "Cinco partes do mesmo ciclo.",
      items: [
        {
          title: "Criação de negócios",
          body:
            "De uma ideia, empresa existente ou capital — formamos um modelo que o mercado consegue sustentar.",
        },
        {
          title: "Produção digital",
          body:
            "Sites, apps, plataformas, portais, integrações e sistemas de IA nos quais o negócio opera.",
        },
        {
          title: "Marketing com IA",
          body:
            "Estratégia, conteúdo, criativos, anúncios e analytics em ciclo contínuo — não um pacote mensal.",
        },
        {
          title: "Vendas com IA",
          body:
            "Do primeiro contato à qualificação, encaixe de solução e proposta — AI Business Assistant e SHOWROOM AI.",
        },
        {
          title: "Crescimento",
          body: "Analytics, otimização, automação e escala na mesma infraestrutura.",
        },
      ],
    },
    pipeline: {
      eyebrow: "O caminho",
      title: "Uma sequência. Entre em qualquer etapa.",
      steps: [
        "Ideia / capital",
        "Pesquisa de mercado",
        "Modelo de negócio",
        "Marca",
        "Produto / plataforma",
        "Infraestrutura de IA",
        "Marketing",
        "Vendas",
        "Crescimento",
      ],
    },
    tech: {
      eyebrow: "Base tecnológica",
      title: "Infraestrutura central de IA já construída e usada comercialmente.",
      lead:
        "Não vendemos um stack que vamos montar depois. Três produtos já estão no circuito — como sistema operacional de entrega e como SKUs que você pode operar.",
    },
    creation: { eyebrow: "Criação de negócios" },
    production: { eyebrow: "Produção digital" },
  },
  fr: {
    navWhatWeDo: "Notre offre",
    hero: {
      extra:
        "Nous créons et faisons évoluer des entreprises digitales sur notre propre infrastructure IA.",
      soft:
        "Nous pouvons vous accompagner d'une idée ou d'un brief de recherche jusqu'à quelque chose de construit, lancé et exploité.",
    },
    pillars: {
      eyebrow: "Ce que nous faisons",
      title: "Cinq parties de la même boucle.",
      items: [
        {
          title: "Création d'entreprise",
          body:
            "À partir d'une idée, d'une entreprise existante ou de capital — nous formons un modèle que le marché peut porter.",
        },
        {
          title: "Production digitale",
          body:
            "Sites, apps, plateformes, portails, intégrations et systèmes IA sur lesquels l'entreprise fonctionne.",
        },
        {
          title: "Marketing IA",
          body:
            "Stratégie, contenu, créations, publicités et analytics en cycle continu — pas un empilement mensuel.",
        },
        {
          title: "Ventes IA",
          body:
            "De la première demande à la qualification, l'adéquation de l'offre et la proposition — AI Business Assistant et SHOWROOM AI.",
        },
        {
          title: "Croissance",
          body: "Analytics, optimisation, automatisation et montée en charge sur la même infrastructure.",
        },
      ],
    },
    pipeline: {
      eyebrow: "Le parcours",
      title: "Une séquence. Rejoignez à n'importe quelle étape.",
      steps: [
        "Idée / capital",
        "Étude de marché",
        "Modèle économique",
        "Marque",
        "Produit / plateforme",
        "Infrastructure IA",
        "Marketing",
        "Ventes",
        "Croissance",
      ],
    },
    tech: {
      eyebrow: "Base technique",
      title: "Infrastructure IA centrale déjà construite et utilisée commercialement.",
      lead:
        "Nous ne vendons pas une stack que nous assemblerons plus tard. Trois produits sont déjà dans la boucle — comme OS de delivery et comme SKU que vous pouvez exploiter.",
    },
    creation: { eyebrow: "Création d'entreprise" },
    production: { eyebrow: "Production digitale" },
  },
  ar: {
    navWhatWeDo: "خدماتنا",
    hero: {
      extra: "ننشئ ونوسّع أعمالًا رقمية على بنيتنا التحتية للذكاء الاصطناعي.",
      soft: "نساعدك من فكرة أو موجز بحث إلى شيء مُبنى ومُطلق ومُدار.",
    },
    pillars: {
      eyebrow: "ما الذي نفعله",
      title: "خمس وظائف. بنية تحتية واحدة.",
      items: [
        { title: "إنشاء الأعمال", body: "من فكرة أو شركة قائمة أو رأس مال — نبني نموذجًا يستطيع السوق استيعابه." },
        { title: "الإنتاج الرقمي", body: "مواقع وتطبيقات ومنصات وبوابات وتكاملات وأنظمة ذكاء اصطناعي يعمل عليها العمل." },
        { title: "التسويق بالذكاء الاصطناعي", body: "استراتيجية ومحتوى وإعلانات وتحليلات في دورة مستمرة — وليس دفعة شهرية." },
        { title: "المبيعات بالذكاء الاصطناعي", body: "من أول استفسار إلى التأهيل والعرض — AI Business Assistant وSHOWROOM AI." },
        { title: "النمو", body: "تحليلات وتحسين وأتمتة وتوسع على نفس البنية." },
      ],
    },
    pipeline: {
      eyebrow: "المسار",
      title: "تسلسل واحد. انضم في أي خطوة.",
      steps: [
        "فكرة / رأس مال",
        "بحث السوق",
        "نموذج العمل",
        "العلامة",
        "المنتج / المنصة",
        "بنية الذكاء الاصطناعي",
        "التسويق",
        "المبيعات",
        "النمو",
      ],
    },
    tech: {
      eyebrow: "الأساس التقني",
      title: "بنية ذكاء اصطناعي أساسية مبنية ومستخدمة تجاريًا.",
      lead: "لا نبيع مكدسًا سنبنيه لاحقًا. ثلاثة منتجات في الحلقة اليوم — كنظام تشغيل للتنفيذ وكمنتجات يمكنك تشغيلها.",
    },
    creation: { eyebrow: "إنشاء الأعمال" },
    production: { eyebrow: "الإنتاج الرقمي" },
  },
  zh: {
    navWhatWeDo: "核心业务",
    hero: {
      extra: "我们基于自研 AI 基础设施创建并扩展数字业务。",
      soft: "我们可以从想法或研究简报，一路做到可上线、可运营的业务。",
    },
    pillars: {
      eyebrow: "我们能做什么",
      title: "五个环节，同一套闭环。",
      items: [
        { title: "业务创建", body: "从想法、现有公司或资本出发 — 构建市场能够承载的模型。" },
        { title: "数字制作", body: "网站、应用、平台、客户门户、集成与 AI 系统，业务在此运行。" },
        { title: "AI 营销", body: "策略、内容、创意、投放与分析形成持续循环 — 而非每月堆内容。" },
        { title: "AI 销售", body: "从首次咨询到资格判断与方案 — AI Business Assistant 与 SHOWROOM AI。" },
        { title: "增长", body: "在同一基础设施上做分析、优化、自动化与规模化。" },
      ],
    },
    pipeline: {
      eyebrow: "路径",
      title: "一条链路，可在任一步加入。",
      steps: [
        "想法 / 资本",
        "市场研究",
        "商业模式",
        "品牌",
        "产品 / 平台",
        "AI 基础设施",
        "营销",
        "销售",
        "增长",
      ],
    },
    tech: {
      eyebrow: "技术底座",
      title: "核心 AI 基础设施已构建并在商业中使用。",
      lead: "我们不会推销尚未组装的栈。三款产品已在闭环中 — 既是交付操作系统，也是你可运行的 SKU。",
    },
    creation: { eyebrow: "业务创建" },
    production: { eyebrow: "数字制作" },
  },
  id: {
    navWhatWeDo: "Layanan",
    hero: {
      extra: "Kami membangun dan menskalakan bisnis digital dengan infrastruktur AI sendiri.",
      soft: "Kami bisa membantu dari ide atau riset hingga sesuatu yang dibangun, diluncurkan, dan dioperasikan.",
    },
    pillars: {
      eyebrow: "Apa yang kami lakukan",
      title: "Lima bagian dari siklus yang sama.",
      items: [
        { title: "Pembuatan bisnis", body: "Dari ide, perusahaan yang ada, atau modal — kami bentuk model yang pasar bisa menampung." },
        { title: "Produksi digital", body: "Situs, aplikasi, platform, portal, integrasi, dan sistem AI tempat bisnis berjalan." },
        { title: "Pemasaran AI", body: "Strategi, konten, kreatif, iklan, dan analitik sebagai siklus berkelanjutan." },
        { title: "Penjualan AI", body: "Dari pertanyaan pertama hingga kualifikasi dan proposal — AI Business Assistant & SHOWROOM AI." },
        { title: "Pertumbuhan", body: "Analitik, optimasi, otomatisasi, dan skala pada infrastruktur yang sama." },
      ],
    },
    pipeline: {
      eyebrow: "Jalur",
      title: "Satu urutan. Masuk di langkah mana pun.",
      steps: [
        "Ide / modal",
        "Riset pasar",
        "Model bisnis",
        "Brand",
        "Produk / platform",
        "Infrastruktur AI",
        "Pemasaran",
        "Penjualan",
        "Pertumbuhan",
      ],
    },
    tech: {
      eyebrow: "Basis teknologi",
      title: "Infrastruktur AI inti sudah dibangun dan dipakai secara komersial.",
      lead: "Kami tidak menjual stack yang akan dirakit nanti. Tiga produk sudah dalam loop — sebagai OS delivery dan SKU yang bisa Anda jalankan.",
    },
    creation: { eyebrow: "Pembuatan bisnis" },
    production: { eyebrow: "Produksi digital" },
  },
  vi: {
    navWhatWeDo: "Dịch vụ",
    hero: {
      extra: "Chúng tôi tạo và mở rộng doanh nghiệp số trên hạ tầng AI riêng.",
      soft: "Chúng tôi có thể đưa bạn từ ý tưởng hoặc brief nghiên cứu đến thứ được xây, ra mắt và vận hành.",
    },
    pillars: {
      eyebrow: "Chúng tôi làm gì",
      title: "Năm phần trong cùng một vòng lặp.",
      items: [
        { title: "Tạo doanh nghiệp", body: "Từ ý tưởng, công ty hiện có hoặc vốn — chúng tôi dựng mô hình thị trường có thể gánh được." },
        { title: "Sản xuất số", body: "Website, app, nền tảng, portal, tích hợp và hệ thống AI doanh nghiệp chạy trên đó." },
        { title: "Marketing AI", body: "Chiến lược, nội dung, creative, quảng cáo và phân tích theo chu kỳ liên tục." },
        { title: "Bán hàng AI", body: "Từ câu hỏi đầu tiên đến đánh giá và đề xuất — AI Business Assistant & SHOWROOM AI." },
        { title: "Tăng trưởng", body: "Phân tích, tối ưu, tự động hóa và mở rộng trên cùng hạ tầng." },
      ],
    },
    pipeline: {
      eyebrow: "Lộ trình",
      title: "Một chuỗi. Tham gia ở bất kỳ bước nào.",
      steps: [
        "Ý tưởng / vốn",
        "Nghiên cứu thị trường",
        "Mô hình kinh doanh",
        "Thương hiệu",
        "Sản phẩm / nền tảng",
        "Hạ tầng AI",
        "Marketing",
        "Bán hàng",
        "Tăng trưởng",
      ],
    },
    tech: {
      eyebrow: "Nền tảng công nghệ",
      title: "Hạ tầng AI lõi đã được xây và dùng thương mại.",
      lead: "Chúng tôi không bán một stack sẽ lắp sau. Ba sản phẩm đã trong vòng — vừa là hệ điều hành delivery, vừa là SKU bạn có thể chạy.",
    },
    creation: { eyebrow: "Tạo doanh nghiệp" },
    production: { eyebrow: "Sản xuất số" },
  },
  ja: {
    navWhatWeDo: "事業内容",
    hero: {
      extra: "自社のAIインフラでデジタルビジネスを立ち上げ、スケールします。",
      soft: "アイデアやリサーチブリーフから、構築・ローンチ・運用まで伴走します。",
    },
    pillars: {
      eyebrow: "できること",
      title: "同じループの5つの機能。",
      items: [
        { title: "ビジネス創出", body: "アイデア・既存企業・資本から、市場が支えられるモデルを組み立てます。" },
        { title: "デジタル制作", body: "サイト、アプリ、プラットフォーム、ポータル、連携、AIシステム。" },
        { title: "AIマーケティング", body: "戦略、コンテンツ、クリエイティブ、広告、分析を継続的なサイクルで。" },
        { title: "AIセールス", body: "最初の問い合わせから提案まで — AI Business Assistant と SHOWROOM AI。" },
        { title: "グロース", body: "同じインフラ上で分析・最適化・自動化・スケール。" },
      ],
    },
    pipeline: {
      eyebrow: "道筋",
      title: "ひとつの連続。どの段階からでも参加できます。",
      steps: [
        "アイデア / 資本",
        "市場調査",
        "ビジネスモデル",
        "ブランド",
        "プロダクト / プラットフォーム",
        "AIインフラ",
        "マーケティング",
        "セールス",
        "グロース",
      ],
    },
    tech: {
      eyebrow: "技術基盤",
      title: "中核のAIインフラはすでに構築され、商用運用されています。",
      lead: "後から組み立てるスタックは売りません。3つのプロダクトが今日のループにあります。",
    },
    creation: { eyebrow: "ビジネス創出" },
    production: { eyebrow: "デジタル制作" },
  },
  tr: {
    navWhatWeDo: "Hizmetlerimiz",
    hero: {
      extra: "Kendi yapay zeka altyapımızla dijital işletmeler kurar ve ölçeklendiririz.",
      soft: "Bir fikir veya araştırma özetinden, kurulmuş ve işletilen bir sonuca kadar yardımcı oluruz.",
    },
    pillars: {
      eyebrow: "Ne yapıyoruz",
      title: "Aynı döngünün beş parçası.",
      items: [
        { title: "İş kurma", body: "Fikir, mevcut şirket veya sermayeden — pazarın taşıyabileceği bir model kurarız." },
        { title: "Dijital üretim", body: "Siteler, uygulamalar, platformlar, portallar, entegrasyonlar ve AI sistemleri." },
        { title: "AI pazarlama", body: "Strateji, içerik, kreatif, reklam ve analitik sürekli bir döngüde." },
        { title: "AI satış", body: "İlk talepten nitelendirmeye ve teklife — AI Business Assistant ve SHOWROOM AI." },
        { title: "Büyüme", body: "Aynı altyapıda analitik, optimizasyon, otomasyon ve ölçek." },
      ],
    },
    pipeline: {
      eyebrow: "Yol",
      title: "Tek bir sıra. Her adımda katılın.",
      steps: [
        "Fikir / sermaye",
        "Pazar araştırması",
        "İş modeli",
        "Marka",
        "Ürün / platform",
        "AI altyapısı",
        "Pazarlama",
        "Satış",
        "Büyüme",
      ],
    },
    tech: {
      eyebrow: "Teknik temel",
      title: "Çekirdek AI altyapısı kuruldu ve ticari olarak kullanılıyor.",
      lead: "Sonra kuracağımız bir yığını satmıyoruz. Üç ürün bugün döngüde — hem delivery OS hem de çalıştırabileceğiniz SKU.",
    },
    creation: { eyebrow: "İş kurma" },
    production: { eyebrow: "Dijital üretim" },
  },
};

function applyPatch(copy, code) {
  const p = patches[code];
  if (!p) return copy;
  copy.hero.extra = p.hero.extra;
  copy.hero.soft = p.hero.soft;
  copy.pillars.eyebrow = p.pillars.eyebrow;
  copy.pillars.title = p.pillars.title;
  p.pillars.items.forEach((item, i) => {
    copy.pillars.items[i].title = item.title;
    copy.pillars.items[i].body = item.body;
  });
  copy.pipeline.eyebrow = p.pipeline.eyebrow;
  copy.pipeline.title = p.pipeline.title;
  copy.pipeline.steps = p.pipeline.steps;
  copy.tech.eyebrow = p.tech.eyebrow;
  copy.tech.title = p.tech.title;
  copy.tech.lead = p.tech.lead;
  copy.creation.eyebrow = p.creation.eyebrow;
  copy.production.eyebrow = p.production.eyebrow;
  const navItem = copy.nav.items.find((i) => i.href === "#what-we-do");
  if (navItem && p.navWhatWeDo) navItem.label = p.navWhatWeDo;
  return copy;
}

for (const code of locales) {
  const cap = code.charAt(0).toUpperCase() + code.slice(1);
  const mod = await import(pathToFileURL(path.join(process.cwd(), "content/locales", `${code}.ts`)).href);
  const key = `copy${cap}`;
  const data = applyPatch(JSON.parse(JSON.stringify(mod[key])), code);
  const fileContent = `import type { Copy } from "../copy";\n\nexport const copy${cap}: Copy = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "content/locales", `${code}.ts`), fileContent);
  console.log(`Patched ${code}.ts`);
}
