/**
 * Patch hero lede, homeRest leftovers, and businessCreationVisual tabs for non-EN locales.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const locales = ["es", "pt", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const heroLedes = {
  pt: "A AI MARK une pesquisa de mercado, produtos digitais, infraestrutura de IA e marketing num único percurso operacional — da primeira hipótese ao lançamento e crescimento.",
  ar: "يجمع AI MARK أبحاث السوق والمنتجات الرقمية والبنية التحتية للذكاء الاصطناعي والتسويق في مسار تشغيل واحد — من أول فرضية إلى الإطلاق والنمو.",
  zh: "AI MARK 将市场研究、数字产品、AI 基础设施与营销整合为一条运营路径——从最初假设到上线与增长。",
  id: "AI MARK menyatukan riset pasar, produk digital, infrastruktur AI, dan pemasaran dalam satu jalur operasi — dari hipotesis pertama hingga peluncuran dan pertumbuhan.",
  vi: "AI MARK gộp nghiên cứu thị trường, sản phẩm số, hạ tầng AI và marketing thành một lộ trình vận hành — từ giả thuyết đầu tiên đến ra mắt và tăng trưởng.",
  de: "AI MARK vereint Marktforschung, digitale Produkte, KI-Infrastruktur und Marketing in einem Betriebsweg — von der ersten Hypothese bis zu Launch und Wachstum.",
  fr: "AI MARK réunit étude de marché, produits numériques, infrastructure IA et marketing dans un même parcours opérationnel — de la première hypothèse au lancement et à la croissance.",
  ja: "AI MARKは市場調査、デジタルプロダクト、AIインフラ、マーケティングを一つの運用パスに統合します — 最初の仮説からローンチと成長まで。",
  tr: "AI MARK pazar araştırması, dijital ürünler, AI altyapısı ve pazarlamayı tek bir operasyon yolunda birleştirir — ilk hipotezden lansmana ve büyümeye.",
};

const homeRestPatch = {
  de: {
    entries0Body:
      "AI Marketing Employee, AI Business Assistant und SHOWROOM AI übernehmen jeweils einen anderen Teil der Arbeit.",
    retainerTitle: "KI-Marketing und Wachstum",
    retainerBody:
      "Teamarbeit zu Strategie, Marketing, Vertrieb und Automatisierung. Der Umfang folgt der Aufgabe.",
    stagesLead:
      "Starten Sie mit einer Idee, einem laufenden Unternehmen oder Kapital. Forschung und Ökonomie stehen vor jeder Skalierungsaussage.",
    ideaOrCapital: "Idee oder Kapital",
  },
  es: {
    ideaOrCapital: "Idea o capital",
    stagesLead:
      "Empiece con una idea, un negocio en marcha o capital. La investigación y la economía van antes de cualquier afirmación sobre escala.",
    retainerTitle: "Marketing y crecimiento con IA",
    retainerBody:
      "Trabajo en equipo en estrategia, marketing, ventas y automatización. El alcance sigue la tarea.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant y SHOWROOM AI cubren partes distintas del trabajo.",
  },
  pt: {
    ideaOrCapital: "Ideia ou capital",
    stagesLead:
      "Comece com uma ideia, um negócio em operação ou capital. Pesquisa e economia vêm antes de qualquer promessa de escala.",
    retainerTitle: "Marketing e crescimento com IA",
    retainerBody:
      "Trabalho em equipe em estratégia, marketing, vendas e automação. O escopo segue a tarefa.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant e SHOWROOM AI cobrem partes diferentes do trabalho.",
  },
  ar: {
    ideaOrCapital: "فكرة أو رأس مال",
    stagesLead:
      "ابدأ بفكرة أو عمل قائم أو رأس مال. البحث والاقتصاد قبل أي ادعاء بالحجم.",
    retainerTitle: "تسويق ونمو بالذكاء الاصطناعي",
    retainerBody: "عمل جماعي في الاستراتيجية والتسويق والمبيعات والأتمتة. النطاق يتبع المهمة.",
    entries0Body:
      "AI Marketing Employee وAI Business Assistant وSHOWROOM AI يغطي كلٌّ جزءاً مختلفاً من العمل.",
  },
  zh: {
    ideaOrCapital: "想法或资本",
    stagesLead: "从想法、在营业务或资本出发。研究与经济模型优先于任何规模承诺。",
    retainerTitle: "AI 营销与增长",
    retainerBody: "团队在战略、营销、销售与自动化上协作，范围随任务而定。",
    entries0Body: "AI Marketing Employee、AI Business Assistant 与 SHOWROOM AI 各负责工作中的不同环节。",
  },
  id: {
    ideaOrCapital: "Ide atau modal",
    stagesLead:
      "Mulai dari ide, bisnis yang berjalan, atau modal. Riset dan ekonomi mendahului klaim skala.",
    retainerTitle: "Pemasaran dan pertumbuhan AI",
    retainerBody:
      "Kerja tim pada strategi, pemasaran, penjualan, dan otomasi. Ruang lingkup mengikuti tugas.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant, dan SHOWROOM AI menangani bagian berbeda dari pekerjaan.",
  },
  vi: {
    ideaOrCapital: "Ý tưởng hoặc vốn",
    stagesLead:
      "Bắt đầu từ ý tưởng, doanh nghiệp đang vận hành hoặc vốn. Nghiên cứu và kinh tế đứng trước mọi tuyên bố về quy mô.",
    retainerTitle: "Marketing và tăng trưởng AI",
    retainerBody:
      "Làm việc nhóm về chiến lược, marketing, bán hàng và tự động hóa. Phạm vi theo nhiệm vụ.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant và SHOWROOM AI đảm nhận các phần khác nhau của công việc.",
  },
  fr: {
    ideaOrCapital: "Idée ou capital",
    stagesLead:
      "Partez d'une idée, d'une entreprise en activité ou de capital. La recherche et l'économie précèdent toute promesse d'échelle.",
    retainerTitle: "Marketing et croissance IA",
    retainerBody:
      "Travail d'équipe sur la stratégie, le marketing, les ventes et l'automatisation. Le périmètre suit la tâche.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant et SHOWROOM AI couvrent des parties différentes du travail.",
  },
  ja: {
    ideaOrCapital: "アイデアまたは資本",
    stagesLead:
      "アイデア、稼働中のビジネス、または資本から始めます。スケールの前提より先に調査とユニットエコノミクス。",
    retainerTitle: "AIマーケティングとグロース",
    retainerBody: "戦略、マーケ、販売、自動化をチームで進めます。範囲はタスクに沿います。",
    entries0Body:
      "AI Marketing Employee、AI Business Assistant、SHOWROOM AI が仕事の異なる部分を担います。",
  },
  tr: {
    ideaOrCapital: "Fikir veya sermaye",
    stagesLead:
      "Bir fikir, faal bir işletme veya sermayeden başlayın. Ölçek iddiasından önce araştırma ve ekonomi gelir.",
    retainerTitle: "AI pazarlama ve büyüme",
    retainerBody:
      "Strateji, pazarlama, satış ve otomasyonda ekip çalışması. Kapsam göreve göre şekillenir.",
    entries0Body:
      "AI Marketing Employee, AI Business Assistant ve SHOWROOM AI işin farklı bölümlerini üstlenir.",
  },
};

const businessVisualPatch = {
  de: {
    tabCapital: "💼 Kapital vorhanden, Idee gesucht",
    chainLine:
      "Idee / Kapital → Forschung → Modell → Marke → Produkt → KI → Marketing → Vertrieb → Wachstum",
    chainNote:
      "Kunden müssen nicht zehn getrennte Auftragnehmer zusammenstellen. AI MARK liefert ein einheitliches, eng integriertes Betriebssystem.",
  },
  es: {
    tabCapital: "💼 Tengo capital, necesito una idea",
    chainLine:
      "Idea / capital → investigación → modelo → marca → producto → IA → marketing → ventas → crecimiento",
    chainNote:
      "Los clientes no necesitan reunir diez contratistas separados. AI MARK ofrece un sistema operativo unificado e integrado.",
  },
  pt: {
    tabCapital: "💼 Tenho capital, preciso de uma ideia",
    chainLine:
      "Ideia / capital → pesquisa → modelo → marca → produto → IA → marketing → vendas → crescimento",
    chainNote:
      "Os clientes não precisam montar dez fornecedores separados. A AI MARK entrega um sistema operacional unificado e integrado.",
  },
  ar: {
    tabCapital: "💼 لدي رأس مال وأحتاج فكرة",
    chainLine:
      "فكرة / رأس مال → بحث → نموذج → علامة → منتج → ذكاء اصطناعي → تسويق → مبيعات → نمو",
    chainNote:
      "لا يحتاج العملاء إلى تجميع عشرة مقاولين منفصلين. AI MARK يقدم نظام تشغيل موحّداً ومتكاملاً.",
  },
  zh: {
    tabCapital: "💼 有资本，需要想法",
    chainLine: "想法/资本 → 调研 → 模式 → 品牌 → 产品 → AI → 营销 → 销售 → 增长",
    chainNote: "客户无需拼凑十个独立供应商。AI MARK 提供统一、深度集成的运营系统。",
  },
  id: {
    tabCapital: "💼 Punya modal, butuh ide",
    chainLine:
      "Ide / modal → riset → model → merek → produk → AI → pemasaran → penjualan → pertumbuhan",
    chainNote:
      "Klien tidak perlu merakit sepuluh vendor terpisah. AI MARK menyediakan sistem operasi terpadu dan terintegrasi.",
  },
  vi: {
    tabCapital: "💼 Có vốn, cần ý tưởng",
    chainLine:
      "Ý tưởng / vốn → nghiên cứu → mô hình → thương hiệu → sản phẩm → AI → marketing → bán hàng → tăng trưởng",
    chainNote:
      "Khách hàng không cần ghép mười nhà thầu riêng. AI MARK cung cấp hệ điều hành thống nhất, tích hợp chặt.",
  },
  fr: {
    tabCapital: "💼 J'ai du capital, il me faut une idée",
    chainLine:
      "Idée / capital → recherche → modèle → marque → produit → IA → marketing → ventes → croissance",
    chainNote:
      "Les clients n'ont pas besoin d'assembler dix prestataires séparés. AI MARK fournit un système d'exploitation unifié et intégré.",
  },
  ja: {
    tabCapital: "💼 資本はあるがアイデアが必要",
    chainLine:
      "アイデア/資本 → 調査 → モデル → ブランド → プロダクト → AI → マーケ → 営業 → 成長",
    chainNote:
      "クライアントは10の別々の業者を組み立てる必要はありません。AI MARKは統合されたOSを提供します。",
  },
  tr: {
    tabCapital: "💼 Sermayem var, fikre ihtiyacım var",
    chainLine:
      "Fikir / sermaye → araştırma → model → marka → ürün → AI → pazarlama → satış → büyüme",
    chainNote:
      "Müşterilerin on ayrı tedarikçiyi bir araya getirmesine gerek yok. AI MARK bütünleşik bir işletim sistemi sunar.",
  },
};

const mod = await import(pathToFileURL(path.join(process.cwd(), "content/sections/public-chrome.ts")).href);
const data = JSON.parse(JSON.stringify(mod.publicChromeCopy));

for (const code of locales) {
  const block = data[code];
  if (heroLedes[code]) block.heroExtra.lede = heroLedes[code];
  const hp = homeRestPatch[code];
  if (hp) {
    if (hp.entries0Body) block.homeRest.entries[0].body = hp.entries0Body;
    if (hp.retainerTitle) block.homeRest.retainerTitle = hp.retainerTitle;
    if (hp.retainerBody) block.homeRest.retainerBody = hp.retainerBody;
    if (hp.stagesLead) block.homeRest.stagesLead = hp.stagesLead;
    if (hp.ideaOrCapital) block.homeRest.stageCards[0][0] = hp.ideaOrCapital;
  }
  const bp = businessVisualPatch[code];
  if (bp) {
    block.businessCreationVisual.tabCapital = bp.tabCapital;
    block.businessCreationVisual.chainLine = bp.chainLine;
    block.businessCreationVisual.chainNote = bp.chainNote;
  }
}

const out = `import type { Locale } from "@/lib/site";

export const publicChromeCopy = ${JSON.stringify(data, null, 2)} as const satisfies Record<Locale, unknown>;

export type PublicChromeCopy = (typeof publicChromeCopy)["en"];

export function getPublicChromeCopy(locale: Locale): PublicChromeCopy {
  return (publicChromeCopy[locale] ?? publicChromeCopy.en) as PublicChromeCopy;
}
`;

fs.writeFileSync(path.join(process.cwd(), "content/sections/public-chrome.ts"), out);
console.log("Patched public-chrome.ts for", locales.join(", "));
