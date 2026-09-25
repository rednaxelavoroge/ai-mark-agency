import fs from "node:fs";
import path from "node:path";

const en = (await import("../content/locales/en.ts")).copyEn;

// Helper to deep clone
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 1. Spanish (Latin America)
const es = clone(en);
es.meta.title = "AI MARK — De la Idea a un Negocio Rentable";
es.meta.description = "Empresa de capital de riesgo y marketing impulsada por IA. Investigamos el mercado, estructuramos el modelo, desarrollamos el producto digital y operamos marketing, ventas y crecimiento con nuestra propia infraestructura de IA.";
es.meta.ogTitle = "AI MARK — De la Idea al Negocio Rentable";
es.meta.keywords = ["empresa nativa de IA", "creación de empresas", "marketing con IA", "producción digital", "AIME", "Showroom.pro", "ai-mark.agency"];

es.nav.items = [
  { href: "/", label: "Inicio" },
  { href: "#what-we-do", label: "Qué hacemos" },
  { href: "#business-creation", label: "Creación de negocios" },
  { href: "/products", label: "Productos de IA" },
  { href: "#how", label: "Cómo funciona" },
  { href: "/partners", label: "Socios" },
  { href: "/investors", label: "Inversores" },
  { href: "#contact", label: "Contacto" }
];
es.nav.cta = "Consultar proyecto";
es.nav.menu = "Menú";
es.nav.close = "Cerrar";
es.nav.themeLight = "Modo claro";
es.nav.themeDark = "Modo oscuro";

es.hero.eyebrow = "AI-NATIVE VENTURE & MARKETING COMPANY";
es.hero.title = "De la idea a una empresa en funcionamiento.";
es.hero.lead = "Investigamos el mercado, estructuramos el modelo, desarrollamos el producto digital y ejecutamos marketing y ventas — escalando la operación con IA.";
es.hero.extra = "Creamos y escalamos negocios digitales utilizando nuestra propia infraestructura de IA.";
es.hero.soft = "Le ayudamos a pasar de una idea o un brief de investigación a una empresa desarrollada, lanzada y operando.";
es.hero.primaryCta = "Consultar proyecto";
es.hero.secondaryCta = "Cómo funciona";
es.hero.investorCta = "Para inversores";

es.pillars.eyebrow = "Lo que construimos";
es.pillars.title = "Cinco partes del mismo circuito integrado.";
es.pillars.items = [
  { n: "01", title: "Creación de negocios", body: "Desde una idea, una empresa existente o capital disponible: estructuramos un modelo validado por el mercado." },
  { n: "02", title: "Producción digital", body: "Sitios web, aplicaciones, plataformas, paneles, integraciones y sistemas de IA sobre los que opera el negocio." },
  { n: "03", title: "Marketing con IA", body: "Estrategia, contenido, creativos, pauta publicitaria y analítica como un ciclo continuo, no un reporte mensual." },
  { n: "04", title: "Ventas con IA", body: "Calificación de prospectos, respuestas omnicanal en tiempo real, cotizaciones automáticas y traspaso directo a cierre." },
  { n: "05", title: "Operaciones y escala", body: "Infraestructura propia, agentes autónomos y supervisión humana (HITL) para crecer sin multiplicar la plantilla." }
];

es.creation.eyebrow = "Creación de empresas";
es.creation.title = "Dos caminos para lanzar una empresa.";
es.creation.lead = "Trabajamos tanto con fundadores que tienen una visión clara como con inversores que buscan desplegar capital en modelos probados.";
es.creation.withoutIdea = "Si no tiene una idea:";
es.creation.steps = [
  { title: "Con una idea", body: "Auditoría de mercado, arquitectura del producto, desarrollo MVP, despliegue de IA y puesta en marcha comercial." },
  { title: "Desde el capital", body: "Identificación de nichos de alta rentabilidad, selección de modelos validados y construcción integral llave en mano." }
];

es.pipeline.eyebrow = "Flujo de trabajo";
es.pipeline.title = "De la hipótesis al flujo de caja.";
es.pipeline.steps = ["Investigación y Modelo", "Producto y Plataforma", "Agentes de IA y Contenido", "Lanzamiento y Campañas", "Ventas y Retención", "Escalabilidad"];

es.tech.eyebrow = "Infraestructura tecnológica";
es.tech.title = "Pila de IA patentada y lista para producción.";
es.tech.lead = "No usamos demos frágiles. Cada solución se ejecuta en microservicios auditados y conectados a las APIs oficiales de Meta, Telegram y OpenAI.";

es.products.eyebrow = "Productos de IA propios";
es.products.title = "Software listo para instalar y generar ingresos.";
es.products.lead = "Nuestras soluciones propietarias de IA operan autónomamente con supervisión humana.";
es.products.whoLabel = "Para quién";
es.products.extraLabel = "Ventaja clave";
es.products.detailCta = "Ver detalles";
es.products.installCta = "Conectar";
es.products.hubCta = "Ver todos los productos";
es.products.hubTitle = "Catálogo de productos de IA";
es.products.hubLead = "Sistemas autónomos listos para integrarse en su flujo de trabajo comercial.";
es.products.items = {
  aime: { value: "AIME — Empleado de marketing con IA", who: "Marcas, tiendas de e-commerce y agencias", extra: "Planificación, diseño y publicación autónoma en Instagram, Facebook y Threads con aprobación vía Telegram.", price: "Desde $199/mes" },
  assistant: { value: "AI Business Assistant", who: "Empresas de servicios, inmobiliarias, B2B y retail", extra: "Asistente omnicanal 24/7 en WhatsApp, Telegram y web con calificación y captura de leads en CRM.", price: "Desde $149/mes" },
  showroom: { value: "Showroom.pro", who: "Fabricantes, concesionarios, interiorismo y proyectos a medida", extra: "Generador interactivo de especificaciones técnicas y propuestas comerciales en PDF en segundos.", price: "Desde $299/mes" }
};

es.commercial.tiers = [
  { name: "Starter", price: "$1,200", body: "Para empresas que inician su automatización: configuración de 1 producto de IA y canal clave." },
  { name: "Growth", price: "$2,200", body: "Para negocios en aceleración: despliegue de AIME + AIBA y gestión activa de campañas." },
  { name: "Scale", price: "$3,500", body: "Solución completa: infraestructura omnicanal, Showroom.pro y soporte prioritario 24/7." }
];
es.commercial.perMonth = "/mes";
es.commercial.featured = "Más popular";
es.commercial.retainerCta = "Comenzar ahora";
es.commercial.custom = "A medida";

es.contact.eyebrow = "Inicie su proyecto";
es.contact.title = "Hablemos de su próxima etapa de crecimiento.";
es.contact.lead = "Déjenos sus datos y programaremos una sesión estratégica de 20 minutos con nuestros fundadores.";
es.contact.name = "Nombre completo";
es.contact.email = "Correo electrónico corporativo";
es.contact.messenger = "Telegram o WhatsApp";
es.contact.company = "Empresa o proyecto";
es.contact.scenario = "Objetivo principal";
es.contact.submit = "Enviar solicitud";
es.contact.sending = "Enviando...";
es.contact.success = "¡Solicitud recibida! Le responderemos en menos de 2 horas hábiles.";
es.contact.error = "Ocurrió un error. Por favor escriba a hello@ai-mark.agency";

es.footer.blurb = "Empresa de capital riesgo y marketing nativa de IA. De la idea al negocio rentable sobre infraestructura propietaria.";
es.footer.privacy = "Privacidad";
es.footer.rights = "AI MARK. Todos los derechos reservados.";

// 2. Portuguese (Brazil)
const pt = clone(es);
pt.meta.title = "AI MARK — Da Ideia ao Negócio em Operação";
pt.meta.description = "Empresa de venture builder e marketing nativa em IA. Pesquisamos o mercado, estruturamos o modelo, desenvolvemos o produto digital e operamos marketing, vendas e escala com infraestrutura proprietária de IA.";
pt.meta.ogTitle = "AI MARK — Da Ideia ao Negócio em Operação";
pt.meta.keywords = ["empresa nativa em IA", "criação de negócios", "marketing com IA", "produção digital", "AIME", "Showroom.pro", "ai-mark.agency"];

pt.nav.items = [
  { href: "/", label: "Início" },
  { href: "#what-we-do", label: "O que fazemos" },
  { href: "#business-creation", label: "Criação de negócios" },
  { href: "/products", label: "Produtos de IA" },
  { href: "#how", label: "Como funciona" },
  { href: "/partners", label: "Parceiros" },
  { href: "/investors", label: "Investidores" },
  { href: "#contact", label: "Contato" }
];
pt.nav.cta = "Falar sobre projeto";
pt.nav.menu = "Menu";
pt.nav.close = "Fechar";
pt.nav.themeLight = "Modo claro";
pt.nav.themeDark = "Modo escuro";

pt.hero.title = "Da ideia a um negócio em operação.";
pt.hero.lead = "Pesquisamos o mercado, estruturamos o modelo, construímos o produto digital e operamos marketing e vendas — escalando a operação com IA.";
pt.hero.extra = "Criamos e escalamos negócios digitais utilizando nossa própria infraestrutura de IA.";
pt.hero.soft = "Ajudamos você a ir de uma ideia ou tese de pesquisa a um negócio desenvolvido, lançado e faturando.";
pt.hero.primaryCta = "Falar sobre projeto";
pt.hero.secondaryCta = "Como funciona";
pt.hero.investorCta = "Para investidores";

pt.pillars.eyebrow = "O que construímos";
pt.pillars.title = "Cinco elos do mesmo ciclo integrado.";
pt.pillars.items = [
  { n: "01", title: "Criação de negócios", body: "A partir de uma ideia, empresa existente ou capital: estruturamos um modelo validado pelo mercado." },
  { n: "02", title: "Produção digital", body: "Sites, aplicativos, plataformas, painéis, integrações e sistemas de IA sobre os quais o negócio roda." },
  { n: "03", title: "Marketing com IA", body: "Estratégia, conteúdo, criativos, tráfego pago e métricas em ciclo contínuo, não em relatório mensal." },
  { n: "04", title: "Vendas com IA", body: "Qualificação de leads, respostas imediatas multicanal, propostas automáticas e repasse direto para fechamento." },
  { n: "05", title: "Operações e escala", body: "Infraestrutura própria, agentes autônomos e supervisão humana (HITL) para crescer sem inchar a equipe." }
];

pt.creation.eyebrow = "Criação de empresas";
pt.creation.title = "Dois caminhos para lançar um negócio.";
pt.creation.lead = "Trabalhamos tanto com fundadores que possuem uma ideia clara quanto com investidores que desejam aplicar capital em teses comprovadas.";
pt.creation.withoutIdea = "Se você não tem uma ideia definida:";
pt.creation.steps = [
  { title: "Com uma ideia", body: "Auditoria de mercado, arquitetura do produto, MVP ágil, infraestrutura de IA e lançamento comercial." },
  { title: "A partir do capital", body: "Mapeamento de nichos rentáveis, seleção de modelos validados e construção completa turnkey." }
];

pt.pipeline.eyebrow = "Fluxo de execução";
pt.pipeline.title = "Da hipótese ao fluxo de caixa real.";
pt.pipeline.steps = ["Pesquisa e Modelo", "Produto e Plataforma", "Agentes de IA e Conteúdo", "Lançamento e Campanhas", "Vendas e Retenção", "Escala"];

pt.tech.eyebrow = "Infraestrutura de tecnologia";
pt.tech.title = "Stack proprietário de IA pronto para produção.";
pt.tech.lead = "Sem demos frágeis. Cada solução roda em microsserviços auditados e integrados com as APIs oficiais do WhatsApp (Meta Cloud API), Telegram e OpenAI.";

pt.products.eyebrow = "Produtos proprietários de IA";
pt.products.title = "Software pronto para plugar e gerar receita.";
pt.products.lead = "Soluções proprietárias de IA que operam de forma autônoma com controle humano.";
pt.products.items = {
  aime: { value: "AIME — Funcionário de marketing com IA", who: "Marcas, e-commerces e agências", extra: "Planejamento, redação, design e postagem automática no Instagram, Facebook e Threads com aprovação no Telegram.", price: "A partir de $199/mês" },
  assistant: { value: "AI Business Assistant", who: "Prestadores de serviços, imobiliárias, B2B e varejo", extra: "Atendente omnicanal 24/7 no WhatsApp, Telegram e site com qualificação e envio de leads para CRM.", price: "A partir de $149/mês" },
  showroom: { value: "Showroom.pro", who: "Indústrias, fabricantes, móveis planejados e projetos sob medida", extra: "Gerador instantâneo de especificações técnicas e propostas comerciais em PDF com regras de negócio.", price: "A partir de $299/mês" }
};

pt.commercial.tiers = [
  { name: "Starter", price: "$1,200", body: "Para empresas iniciando automação: configuração de 1 produto de IA e canal principal." },
  { name: "Growth", price: "$2,200", body: "Para aceleração de vendas: AIME + AIBA integrados e gestão ativa de campanhas." },
  { name: "Scale", price: "$3,500", body: "Ecossistema completo: atendimento multicanal, Showroom.pro e suporte prioritário 24/7." }
];
pt.commercial.perMonth = "/mês";
pt.commercial.featured = "Mais escolhido";
pt.commercial.retainerCta = "Começar agora";

pt.contact.eyebrow = "Inicie seu projeto";
pt.contact.title = "Vamos conversar sobre o seu próximo salto de crescimento.";
pt.contact.lead = "Deixe seus dados e agendaremos uma sessão estratégica de 20 minutos com nossos fundadores.";
pt.contact.name = "Nome completo";
pt.contact.email = "E-mail corporativo";
pt.contact.messenger = "WhatsApp ou Telegram";
pt.contact.company = "Empresa ou projeto";
pt.contact.scenario = "Objetivo principal";
pt.contact.submit = "Enviar solicitação";
pt.contact.sending = "Enviando...";
pt.contact.success = "Solicitação recebida! Responderemos em até 2 horas úteis.";
pt.contact.error = "Ocorreu um erro. Por favor, envie e-mail para hello@ai-mark.agency";

pt.footer.blurb = "Venture builder e marketing nativa em IA. Da ideia ao negócio em operação sobre infraestrutura proprietária.";
pt.footer.privacy = "Privacidade";
pt.footer.rights = "AI MARK. Todos os direitos reservados.";

// 3. Arabic (Middle East / GCC)
const ar = clone(en);
ar.meta.title = "AI MARK — من الفكرة إلى شركة ناجحة";
ar.meta.description = "شركة تسويق واستثمار ريادي معتمدة على الذكاء الاصطناعي الأصيل. ندرس السوق، ونبني النموذج، ونطور المنتجات الرقمية، ثم ندير التسويق والمبيعات عبر بنيتنا التحتية الخاصة.";
ar.meta.ogTitle = "AI MARK — من الفكرة إلى شركة ناشئة ناجحة";
ar.meta.keywords = ["ذكاء اصطناعي", "تأسيس شركات", "تسويق بالذكاء الاصطناعي", "برمجة وتطوير", "AIME", "Showroom.pro", "ai-mark.agency"];

ar.nav.items = [
  { href: "/", label: "الرئيسية" },
  { href: "#what-we-do", label: "خدماتنا" },
  { href: "#business-creation", label: "تأسيس الأعمال" },
  { href: "/products", label: "منتجات الذكاء الاصطناعي" },
  { href: "#how", label: "كيف نعمل" },
  { href: "/partners", label: "الشركاء" },
  { href: "/investors", label: "المستثمرون" },
  { href: "#contact", label: "تواصل معنا" }
];
ar.nav.cta = "ناقش مشروعك";
ar.nav.menu = "القائمة";
ar.nav.close = "إغلاق";
ar.nav.themeLight = "الوضع النهاري";
ar.nav.themeDark = "الوضع الليلي";

ar.hero.eyebrow = "AI-NATIVE VENTURE & MARKETING COMPANY";
ar.hero.title = "من الفكرة إلى شركة تعمل على أرض الواقع.";
ar.hero.lead = "ندرس السوق، ونبني نموذج العمل، ونطور المنتج الرقمي، ثم ندير التسويق والمبيعات — ونوسع نطاق العمل بالكامل باستخدام الذكاء الاصطناعي.";
ar.hero.extra = "نؤسس ونوسع الأعمال الرقمية بالاعتماد على بنيتنا التحتية المتقدمة للذكاء الاصطناعي.";
ar.hero.soft = "نساعدك على الانتقال من مجرد فكرة أو دراسة جدوى إلى مشروع متكامل يعمل ويدر عوائد مالية.";
ar.hero.primaryCta = "ناقش مشروعك";
ar.hero.secondaryCta = "كيف نعمل";
ar.hero.investorCta = "للمستثمرين";

ar.pillars.eyebrow = "ما الذي نقدمه";
ar.pillars.title = "خمس مراحل مترابطة لدورة نمو متكاملة.";
ar.pillars.items = [
  { n: "01", title: "تأسيس الأعمال", body: "سواء كنت تملك فكرة أو شركة قائمة أو رأس مال للاستثمار: نبني نموذجاً يحقق طلباً حقيقياً في السوق." },
  { n: "02", title: "الإنتاج الرقمي", body: "مواقع إلكترونية، تطبيقات، منصات، لوحات تحكم، وأنظمة ذكاء اصطناعي متطورة يعتمد عليها العمل." },
  { n: "03", title: "التسويق بالذكاء الاصطناعي", body: "استراتيجية، محتوى، تصاميم، حملات إعلانية مدفوعة وتحليلات مستمرة على مدار الساعة." },
  { n: "04", title: "المبيعات الذكية", body: "فرز وتأهيل العملاء، رد فوري عبر كافة القنوات، وإصدار عروض أسعار آلية والإغلاق السريع." },
  { n: "05", title: "العمليات والتوسع", body: "بنية تحتية سحابية، عملاء أذكياء مستقلون وإشراف بشري احترافي لتحقيق التوسع دون أعباء إضافية." }
];

ar.creation.eyebrow = "تأسيس المشاريع";
ar.creation.title = "مساران متكاملان لإطلاق مشروعك التجاري.";
ar.creation.lead = "نعمل مع رواد الأعمال أصحاب الأفكار المبتكرة ومع المستثمرين الباحثين عن فرص مجدية لرؤوس أموالهم.";
ar.creation.withoutIdea = "إذا لم تكن تمتلك فكرة محددة:";
ar.creation.steps = [
  { title: "الانطلاق من فكرة", body: "تحليل السوق، وتصميم وتطوير النموذج الأولي (MVP)، وإطلاق العمليات التشغيلية والتسويقية." },
  { title: "الانطلاق من رأس المال", body: "تحديد المجالات الأكثر ربحية، واختيار النماذج المثبتة، وبناء وتشغيل المشروع بنظام تسليم المفتاح." }
];

ar.pipeline.eyebrow = "مسار العمل";
ar.pipeline.title = "من مرحلة الفرضية إلى التدفق النقدي الفعلي.";
ar.pipeline.steps = ["البحث والنموذج", "المنتج والمنصة", "وكلاء الذكاء والمحتوى", "الإطلاق والحملات", "المبيعات والاستبقاء", "التوسع العالمي"];

ar.tech.eyebrow = "البنية التحتية التقنية";
ar.tech.title = "أنظمة ذكاء اصطناعي جاهزة للاستخدام التجاري الفوري.";
ar.tech.lead = "حلول مستقرة تعمل عبر خوادم سحابية آمنة ومربوطة بالواجهات الرسمية لـ WhatsApp Cloud API و Telegram و OpenAI.";

ar.products.eyebrow = "منتجات الذكاء الاصطناعي الخاصة بنا";
ar.products.title = "برمجيات جاهزة للنشر الفوري وتوليد الإيرادات.";
ar.products.lead = "منتجات تقنية متطورة تعمل باستقلالية مع ضمان الرقابة البشرية.";
ar.products.whoLabel = "الفئة المستهدفة";
ar.products.extraLabel = "الميزة الأساسية";
ar.products.detailCta = "عرض التفاصيل";
ar.products.installCta = "طلب النظام";
ar.products.hubCta = "جميع المنتجات";
ar.products.hubTitle = "كتالوج منتجات الذكاء الاصطناعي";
ar.products.hubLead = "أنظمة ذاتية القيادة مجهزة لتسريع عمليات البيع والتسويق لشركتك.";
ar.products.items = {
  aime: { value: "AIME — موظف التسويق بالذكاء الاصطناعي", who: "العلامات التجارية، المتاجر الإلكترونية والوكالات", extra: "تخطيط المحتوى وتوليد المنشورات والنشر التلقائي في Instagram و Facebook و Threads بموافقة عبر تليجرام.", price: "يبدأ من 199$ / شهرياً" },
  assistant: { value: "مساعد الأعمال الذكي (AIBA)", who: "الشركات العقارية، قطاع الخدمات، التجارة والشركات B2B", extra: "خدمة عملاء ومبيعات فورية 24/7 عبر واتساب وتليجرام والموقع الإلكتروني وتأهيل العملاء للـ CRM.", price: "يبدأ من 149$ / شهرياً" },
  showroom: { value: "Showroom.pro — حاسبة المواصفات وعروض الأسعار", who: "المصانع، معارض السيارات، التصميم الداخلي ومصنعو الأثاث", extra: "تحويل متطلبات العميل المعقدة إلى عروض أسعار ومواصفات هندسية بصيغة PDF في ثوانٍ معدودة.", price: "يبدأ من 299$ / شهرياً" }
};

ar.commercial.tiers = [
  { name: "Starter", price: "$1,200", body: "للشركات الراغبة في بدء الأتمتة: تشغيل منتج ذكاء اصطناعي واحد على قناة أساسية." },
  { name: "Growth", price: "$2,200", body: "للشركات النامية: ربط AIME و AIBA وإدارة الحملات التسويقية النشطة." },
  { name: "Scale", price: "$3,500", body: "حل شامل ومتكامل: أتمتة كاملة للقنوات، نظام Showroom.pro ودعم فني مخصص 24/7." }
];
ar.commercial.perMonth = "/ شهرياً";
ar.commercial.featured = "الأكثر طلباً";
ar.commercial.retainerCta = "ابدأ الآن";

ar.contact.eyebrow = "تواصل مع خبرائنا";
ar.contact.title = "دعنا نناقش المرحلة القادمة من نمو أعمالك.";
ar.contact.lead = "أدخل بياناتك وسنقوم بجدولة جلسة استراتيجية مدتها 20 دقيقة مع مؤسسي الشركة.";
ar.contact.name = "الاسم الكامل";
ar.contact.email = "البريد الإلكتروني للعمل";
ar.contact.messenger = "واتساب أو تليجرام";
ar.contact.company = "الشركة أو المشروع";
ar.contact.scenario = "الهدف الرئيسي";
ar.contact.submit = "إرسال الطلب";
ar.contact.sending = "جاري الإرسال...";
ar.contact.success = "تم استلام طلبك بنجاح! سنعاود التواصل معك خلال ساعتي عمل.";
ar.contact.error = "حدث خطأ غير متوقع. يرجى مراسلتنا على hello@ai-mark.agency";

ar.footer.blurb = "شركة استثمار وتسويق بالذكاء الاصطناعي الأصيل. من الفكرة إلى شركة ناجحة على بنية تحتية خاصة ومحمية.";
ar.footer.privacy = "سياسة الخصوصية";
ar.footer.rights = "AI MARK. جميع الحقوق محفوظة.";

// 4. Simplified Chinese
const zh = clone(en);
zh.meta.title = "AI MARK — 从商业创意到落地盈利";
zh.meta.description = "AI原生创业孵化与数字营销公司。我们深入调研市场，打磨商业模型，打造数字化产品，并通过自主研发的 AI 基础设施驱动营销、销售与全流程增长。";
zh.meta.ogTitle = "AI MARK — 从创意到成熟商业模式";
zh.meta.keywords = ["AI原生企业", "商业孵化", "AI营销", "数字化开发", "AIME", "Showroom.pro", "ai-mark.agency"];

zh.nav.items = [
  { href: "/", label: "首页" },
  { href: "#what-we-do", label: "核心业务" },
  { href: "#business-creation", label: "商业孵化" },
  { href: "/products", label: "AI 产品矩阵" },
  { href: "#how", label: "运作机制" },
  { href: "/partners", label: "合作伙伴" },
  { href: "/investors", label: "投资者关系" },
  { href: "#contact", label: "联系咨询" }
];
zh.nav.cta = "预约项目探讨";
zh.nav.menu = "菜单";
zh.nav.close = "关闭";
zh.nav.themeLight = "浅色模式";
zh.nav.themeDark = "深色模式";

zh.hero.eyebrow = "AI-NATIVE VENTURE & MARKETING COMPANY";
zh.hero.title = "从商业创意到成熟盈利的企业。";
zh.hero.lead = "我们调研市场、构建商业模型、开发数字化产品，并运用 AI 全面接管营销与销售流程，实现业务的高效规模化增长。";
zh.hero.extra = "依托专有 AI 基础设施，为您从零打造并规模化拓展数字化业务。";
zh.hero.soft = "无论您处于概念构思阶段还是手握资本，我们都能助您完成产品研发、商业上线与日常稳定运营。";
zh.hero.primaryCta = "预约项目探讨";
zh.hero.secondaryCta = "运作机制";
zh.hero.investorCta = "面向投资者";

zh.pillars.eyebrow = "业务全景";
zh.pillars.title = "五大核心闭环，驱动商业飞轮。";
zh.pillars.items = [
  { n: "01", title: "商业孵化", body: "从概念雏形、现有业务重塑到资本驱动投资：构建受市场真正验证且具备壁垒的模型。" },
  { n: "02", title: "数字化开发", body: "高并发网站、移动端应用、业务中台、跨系统集成与支撑业务运转的 AI 智能系统。" },
  { n: "03", title: "AI 智能营销", body: "战略定位、深度内容、动态创意、广告投放与数据归因形成全自动日更闭环。" },
  { n: "04", title: "AI 自动化销售", body: "全天候线索清洗与多渠道即时响应，自动输出精准报价单并无缝流转至销售成单。" },
  { n: "05", title: "精细运营与扩张", body: "专有底层系统、自主运行智能体协同人机回环（HITL），无需膨胀团队即可高速扩张。" }
];

zh.creation.eyebrow = "企业孵化机制";
zh.creation.title = "启动数字化业务的两种高效路径。";
zh.creation.lead = "无论是拥有明确愿景的创业者，还是希望将闲置资本投入高回报成熟赛道的战略投资者，我们均提供成熟方案。";
zh.creation.withoutIdea = "如果您尚未确定具体方向：";
zh.creation.steps = [
  { title: "基于创意立项", body: "行业深度调研、商业模式打磨、敏捷 MVP 研发、AI 智能体部署及商业化上线。" },
  { title: "基于资本驱动", body: "发掘高毛利蓝海赛道、筛选已验证盈利模型，全流程交钥匙工程搭建并交付运营。" }
];

zh.pipeline.eyebrow = "推进流程";
zh.pipeline.title = "从商业假设到稳定正向现金流。";
zh.pipeline.steps = ["市场调研与建模", "产品与架构开发", "AI 智能体与内容", "上线与全域推广", "销售转化与复购", "跨国规模化扩张"];

zh.tech.eyebrow = "技术基石";
zh.tech.title = "企业级可用、安全合规的专有 AI 技术栈。";
zh.tech.lead = "拒绝不稳定的概念 Demo。所有方案均运行在合规微服务架构上，直连 Meta、Telegram 与 OpenAI 官方生产级 API。";

zh.products.eyebrow = "自主研发 AI 产品矩阵";
zh.products.title = "开箱即用、快速赋能商业营收的软件系统。";
zh.products.lead = "具备自主决策能力的专业智能体系统，并在关键节点接受人工审核保障。";
zh.products.items = {
  aime: { value: "AIME — AI 营销数字员工", who: "消费品牌、出海跨境电商与营销机构", extra: "自主完成 Instagram、Facebook、Threads 内容策划、排版与发布，通过 Telegram 一键审核。", price: "199 美元/月起" },
  assistant: { value: "AI Business Assistant 业务助手", who: "房产顾问、高端服务业、B2B 外贸与企业客发", extra: "7×24 全渠道在线（WhatsApp / Telegram / 网页），智能初筛潜客并自动归档至 CRM 系统。", price: "149 美元/月起" },
  showroom: { value: "Showroom.pro 智能配置展厅", who: "制造业工厂、汽车销售、全屋定制及工程总包", extra: "将复杂的客制化需求即时转化为精准工业级技术规格书与商业报价 PDF，耗时仅需数十秒。", price: "299 美元/月起" }
};

zh.commercial.tiers = [
  { name: "Starter 入门版", price: "$1,200", body: "适合初步尝试业务自动化：部署 1 款核心 AI 智能体及单一主渠道对接。" },
  { name: "Growth 成长版", price: "$2,200", body: "适合加速销售扩张：组合部署 AIME 与 AIBA，并由专业团队持续调优营销。" },
  { name: "Scale 规模版", price: "$3,500", body: "企业级完整方案：全渠道自动化、Showroom.pro 深度定制与 24/7 优先支持。" }
];
zh.commercial.perMonth = "/月";
zh.commercial.featured = "最多客户选择";
zh.commercial.retainerCta = "立即开启合作";

zh.contact.eyebrow = "开启合作";
zh.contact.title = "共同探讨您的下一阶段业务跃迁。";
zh.contact.lead = "留下您的联系方式，我们的创始团队将在 2 小时内与您预约 20 分钟战略沟通会。";
zh.contact.name = "您的姓名";
zh.contact.email = "工作邮箱";
zh.contact.messenger = "Telegram / WhatsApp / 微信";
zh.contact.company = "公司或项目名称";
zh.contact.scenario = "核心目标";
zh.contact.submit = "提交合作需求";
zh.contact.sending = "正在提交...";
zh.contact.success = "我们已成功收到您的咨询！专家将在 2 小时内主动联系您。";
zh.contact.error = "提交失败，请直接发送邮件至 hello@ai-mark.agency";

zh.footer.blurb = "AI 原生创业孵化与营销科技公司。依托自研智能基座，实现从创意到成熟盈利业务的高速落地。";
zh.footer.privacy = "隐私合规政策";
zh.footer.rights = "AI MARK. 保留所有权利。";

// 5. Indonesian (Bahasa Indonesia)
const id = clone(en);
id.meta.title = "AI MARK — Dari Ide Menjadi Bisnis Nyata";
id.meta.description = "Perusahaan venture builder dan pemasaran AI-native. Kami meriset pasar, merumuskan model, membangun produk digital, lalu menjalankan pemasaran, penjualan, dan pertumbuhan dengan infrastruktur AI kami sendiri.";
id.meta.ogTitle = "AI MARK — Dari Ide Menjadi Bisnis Nyata";
id.nav.items = [
  { href: "/", label: "Beranda" },
  { href: "#what-we-do", label: "Layanan" },
  { href: "#business-creation", label: "Pembangunan Bisnis" },
  { href: "/products", label: "Produk AI" },
  { href: "#how", label: "Cara Kerja" },
  { href: "/partners", label: "Mitra" },
  { href: "/investors", label: "Investor" },
  { href: "#contact", label: "Kontak" }
];
id.nav.cta = "Konsultasi Proyek";
id.hero.title = "Dari ide menjadi bisnis yang berjalan nyata.";
id.hero.lead = "Kami meriset pasar, merumuskan model bisnis, membangun produk digital, lalu mengoperasikan pemasaran dan penjualan — meningkatkan skala operasi dengan AI.";
id.hero.primaryCta = "Konsultasi Proyek";
id.hero.secondaryCta = "Cara Kerja";
id.hero.investorCta = "Untuk Investor";
id.footer.blurb = "Perusahaan venture builder & pemasaran AI-native. Dari ide menjadi bisnis nyata di atas infrastruktur mandiri.";

// 6. Vietnamese (Tiếng Việt)
const vi = clone(en);
vi.meta.title = "AI MARK — Từ Ý Tưởng Đến Doanh Nghiệp Hoạt Động";
vi.meta.description = "Công ty phát triển liên doanh và tiếp thị AI-native. Chúng tôi nghiên cứu thị trường, xây dựng mô hình, phát triển sản phẩm kỹ thuật số, sau đó vận hành tiếp thị và bán hàng bằng hạ tầng AI độc quyền.";
vi.meta.ogTitle = "AI MARK — Từ Ý Tưởng Đến Doanh Nghiệp Hoạt Động";
vi.nav.items = [
  { href: "/", label: "Trang chủ" },
  { href: "#what-we-do", label: "Dịch vụ" },
  { href: "#business-creation", label: "Xây dựng doanh nghiệp" },
  { href: "/products", label: "Sản phẩm AI" },
  { href: "#how", label: "Quy trình" },
  { href: "/partners", label: "Đối tác" },
  { href: "/investors", label: "Nhà đầu tư" },
  { href: "#contact", label: "Liên hệ" }
];
vi.nav.cta = "Trao đổi dự án";
vi.hero.title = "Từ ý tưởng đến doanh nghiệp hoạt động thực tế.";
vi.hero.lead = "Chúng tôi nghiên cứu thị trường, hoàn thiện mô hình, lập trình sản phẩm số và tự động hóa quy trình tiếp thị & bán hàng bằng AI.";
vi.hero.primaryCta = "Trao đổi dự án";
vi.hero.secondaryCta = "Quy trình";
vi.hero.investorCta = "Dành cho nhà đầu tư";
vi.footer.blurb = "Công ty khởi tạo doanh nghiệp & tiếp thị AI-native. Từ ý tưởng đến doanh nghiệp thành công trên hạ tầng AI.";

// 7. German (DACH)
const de = clone(en);
de.meta.title = "AI MARK — Von der Idee zum laufenden Unternehmen";
de.meta.description = "AI-native Venture- und Marketinggesellschaft. Wir analysieren Märkte, strukturieren Geschäftsmodelle, entwickeln digitale Produkte und steuern Marketing, Vertrieb und Skalierung über eigene KI-Infrastruktur.";
de.meta.ogTitle = "AI MARK — Von der Idee zum laufenden Unternehmen";
de.nav.items = [
  { href: "/", label: "Startseite" },
  { href: "#what-we-do", label: "Leistungen" },
  { href: "#business-creation", label: "Unternehmensaufbau" },
  { href: "/products", label: "KI-Produkte" },
  { href: "#how", label: "Funktionsweise" },
  { href: "/partners", label: "Partner" },
  { href: "/investors", label: "Investoren" },
  { href: "#contact", label: "Kontakt" }
];
de.nav.cta = "Projekt besprechen";
de.hero.title = "Von der Idee zum profitablen Unternehmen.";
de.hero.lead = "Wir analysieren den Markt, entwickeln das Modell, bauen das digitale Produkt und steuern Vertrieb und Marketing — skaliert durch eigene KI-Infrastruktur.";
de.hero.primaryCta = "Projekt besprechen";
de.hero.secondaryCta = "Funktionsweise";
de.hero.investorCta = "Für Investoren";
de.commercial.tiers = [
  { name: "Starter", price: "$1,200", body: "Für den Einstieg in die Automatisierung: Einrichtung von 1 KI-System auf dem Hauptkanal." },
  { name: "Growth", price: "$2,200", body: "Für wachstumsorientierte Unternehmen: AIME + AIBA und aktive Kampagnensteuerung." },
  { name: "Scale", price: "$3,500", body: "Komplettlösung: Vollständige Omnichannel-Infrastruktur, Showroom.pro und 24/7 Premium-Support." }
];
de.commercial.perMonth = "/Monat";
de.commercial.featured = "Beliebteste Wahl";
de.commercial.retainerCta = "Jetzt starten";
de.footer.blurb = "AI-native Venture & Marketing Company. Von der Idee zum rentablen Unternehmen auf eigener KI-Infrastruktur.";

// 8. French (France / Europe)
const fr = clone(en);
fr.meta.title = "AI MARK — De l'Idée à l'Entreprise Opérationnelle";
fr.meta.description = "Société de capital-risque et de marketing native IA. Nous étudions le marché, concevons le modèle, développons le produit digital et gérons le marketing et les ventes grâce à notre propre infrastructure d'IA.";
fr.meta.ogTitle = "AI MARK — De l'Idée à l'Entreprise Opérationnelle";
fr.nav.items = [
  { href: "/", label: "Accueil" },
  { href: "#what-we-do", label: "Notre offre" },
  { href: "#business-creation", label: "Création d'entreprise" },
  { href: "/products", label: "Produits IA" },
  { href: "#how", label: "Méthode" },
  { href: "/partners", label: "Partenaires" },
  { href: "/investors", label: "Investisseurs" },
  { href: "#contact", label: "Contact" }
];
fr.nav.cta = "Échanger sur un projet";
fr.hero.title = "De l'idée à l'entreprise opérationnelle.";
fr.hero.lead = "Nous analysons le marché, structurons le modèle, concevons le produit numérique et orchestrons les ventes et le marketing — propulsés par l'IA.";
fr.hero.primaryCta = "Échanger sur un projet";
fr.hero.secondaryCta = "Méthode";
fr.hero.investorCta = "Pour les investisseurs";
fr.footer.blurb = "Société de venture building et marketing native IA. De l'idée à l'entreprise rentable sur notre propre infrastructure.";

// 9. Japanese (Japan)
const ja = clone(en);
ja.meta.title = "AI MARK — アイデアから稼働するビジネスへ";
ja.meta.description = "AIネイティブのベンチャー創出・マーケティング企業。市場調査からビジネスモデル構築、プロダクト開発、AI主導のマーケティング・営業までを一気通貫で支援します。";
ja.meta.ogTitle = "AI MARK — アイデアから持続可能な事業へ";
ja.nav.items = [
  { href: "/", label: "ホーム" },
  { href: "#what-we-do", label: "事業内容" },
  { href: "#business-creation", label: "事業立ち上げ" },
  { href: "/products", label: "AIプロダクト" },
  { href: "#how", label: "仕組み" },
  { href: "/partners", label: "パートナー" },
  { href: "/investors", label: "投資家の皆様へ" },
  { href: "#contact", label: "お問い合わせ" }
];
ja.nav.cta = "プロジェクト相談";
ja.hero.title = "アイデアから持続可能な事業の立ち上げまで。";
ja.hero.lead = "市場調査、ビジネスモデル検証、デジタルプロダクト開発、そしてAIによるマーケティングと営業の自動化を通じて、ビジネスの急成長を実現します。";
ja.hero.primaryCta = "プロジェクト相談";
ja.hero.secondaryCta = "仕組みを見る";
ja.hero.investorCta = "投資家向け情報";
ja.footer.blurb = "AIネイティブのベンチャー創出＆マーケティング企業。独自のAIインフラでアイデアを確かな事業へ。";

// 10. Turkish (Turkey)
const tr = clone(en);
tr.meta.title = "AI MARK — Fikirden Çalışan Bir İşletmeye";
tr.meta.description = "Yapay zeka odaklı girişim kurucu ve pazarlama şirketi. Pazar araştırması yapıyor, modeli kuruyor, dijital ürünü geliştiriyor ve pazarlama ile satış operasyonlarını kendi yapay zeka altyapımızla büyütüyoruz.";
tr.meta.ogTitle = "AI MARK — Fikirden Çalışan Bir İşletmeye";
tr.nav.items = [
  { href: "/", label: "Ana Sayfa" },
  { href: "#what-we-do", label: "Hizmetlerimiz" },
  { href: "#business-creation", label: "İş Kurulumu" },
  { href: "/products", label: "Yapay Zeka Ürünleri" },
  { href: "#how", label: "Nasıl Çalışır" },
  { href: "/partners", label: "İş Ortakları" },
  { href: "/investors", label: "Yatırımcılar" },
  { href: "#contact", label: "İletişim" }
];
tr.nav.cta = "Proje Görüşmesi";
tr.hero.title = "Fikirden çalışan ve büyüyen bir işletmeye.";
tr.hero.lead = "Pazarı araştırıyor, iş modelini oluşturuyor, dijital ürünü geliştiriyor ve pazarlama ile satış süreçlerini yapay zeka ile otomatikleştiriyoruz.";
tr.hero.primaryCta = "Proje Görüşmesi";
tr.hero.secondaryCta = "Nasıl Çalışır";
tr.hero.investorCta = "Yatırımcılar İçin";
tr.footer.blurb = "Yapay zeka odaklı girişim kurucu ve pazarlama şirketi. Kendi altyapımızla fikirden karlı bir işletmeye.";

// Write out all files
const map = { es, pt, ar, zh, id, vi, de, fr, ja, tr };

for (const [code, data] of Object.entries(map)) {
  const codeCap = code.charAt(0).toUpperCase() + code.slice(1);
  const fileContent = `import type { Copy } from "../copy";\n\nexport const copy${codeCap}: Copy = ${JSON.stringify(data, null, 2)};\n`;
  const filePath = path.join(process.cwd(), "content", "locales", `${code}.ts`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated ${code}.ts`);
}

console.log("All 10 locale files generated successfully!");
