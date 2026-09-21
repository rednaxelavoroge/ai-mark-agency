import type { Locale } from "@/lib/site";
import type { PackageId } from "@/content/packages";

export type NavItem = { href: string; label: string };

export type Copy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    keywords: string[];
  };
  nav: {
    items: NavItem[];
    cta: string;
    langEn: string;
    langRu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    notes: string[];
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    lead: string;
    perMonth: string;
    featured: string;
    cta: string;
    items: Record<
      PackageId,
      { name: string; summary: string; points: string[] }
    >;
    footnote: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    lead: string;
    readyTitle: string;
    ready: { title: string; body: string }[];
    laterTitle: string;
    later: { title: string; body: string }[];
    toolsTitle: string;
    toolsLead: string;
    tools: Record<string, string>;
  };
  fit: {
    eyebrow: string;
    title: string;
    forTitle: string;
    forItems: string[];
    notTitle: string;
    notItems: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    email: string;
    messenger: string;
    messengerHint: string;
    company: string;
    budget: string;
    budgetOptions: { value: string; label: string }[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
  };
  footer: {
    blurb: string;
    privacy: string;
    rights: string;
    poweredBy: string;
  };
  privacy: {
    title: string;
    updated: string;
    paragraphs: string[];
  };
  jsonLd: {
    description: string;
  };
};

export const copy: Record<Locale, Copy> = {
  en: {
    meta: {
      title: "AI Mark Agency — AI-native marketing, human approval",
      description:
        "AI-native marketing agency for Meta-first brands. One senior operator plus an AI stack: research, strategy, content, human approval, publish, learn. Retainers from $1,200/mo.",
      ogTitle: "AI Mark Agency — Meta-first, human-approved marketing",
      keywords: [
        "AI marketing agency",
        "Meta marketing",
        "Instagram agency",
        "Facebook content",
        "human in the loop",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "#how", label: "How it works" },
        { href: "#packages", label: "Packages" },
        { href: "#stack", label: "Stack" },
        { href: "#fit", label: "Fit" },
      ],
      cta: "Start a brief",
      langEn: "EN",
      langRu: "RU",
    },
    hero: {
      eyebrow: "AI-native marketing agency · Meta-first",
      title: "One operator. An AI stack. Nothing ships without you.",
      lead: "AI Mark Agency runs research, strategy, and Meta content as a retainer — not a SaaS dashboard. You stay in the approval path. We stay accountable for the work.",
      primaryCta: "See retainers",
      secondaryCta: "Talk to us",
      notes: [
        "Instagram on Starter. Full Meta on Growth.",
        "Human-in-the-loop on every publish.",
        "One senior operator — not a bait-and-switch junior bench.",
      ],
    },
    how: {
      eyebrow: "Operating system",
      title: "How the work actually moves",
      lead: "A closed loop, not a content dump. We research, decide, draft, wait for your yes, publish, then feed results back into the next cycle.",
      steps: [
        {
          title: "Research",
          body: "Audience, offers, competitors, and what already earns attention in your category — captured before we write a line.",
        },
        {
          title: "Strategy",
          body: "A tight brief: who we talk to, what we say, and which Meta surfaces we will actually use this month.",
        },
        {
          title: "Content",
          body: "Drafts from the AI stack, steered by the operator. Volume without turning your brand into generic sludge.",
        },
        {
          title: "Human approval",
          body: "You (or your named approver) sign off. No silent posting. If it is not approved, it does not go live.",
        },
        {
          title: "Publish",
          body: "Scheduled and shipped on the agreed Meta channels with naming, captions, and tracking that we can learn from.",
        },
        {
          title: "Learn",
          body: "What landed, what stalled, what we cut. The next research cycle starts from evidence, not vibes.",
        },
      ],
    },
    packages: {
      eyebrow: "Retainers",
      title: "USD retainers. Clear scope. No fake lift numbers.",
      lead: "Pick the operating weight. All packages keep a human in the loop. Prices are monthly USD and exclude paid media spend.",
      perMonth: "/mo",
      featured: "Most teams start here",
      cta: "Request this package",
      items: {
        starter: {
          name: "Starter",
          summary: "Instagram plus an approval path. One brand.",
          points: [
            "One brand, Instagram as the working channel",
            "Content calendar and draft pipeline",
            "Named approval path before publish",
            "Operator-led QA on every asset",
          ],
        },
        growth: {
          name: "Growth",
          summary: "Full Meta (Instagram + Facebook), HITL, weekly research loop.",
          points: [
            "Instagram and Facebook as a paired Meta system",
            "Weekly research → strategy → content cycle",
            "Human-in-the-loop on every publish",
            "Tighter feedback from what actually ran",
          ],
        },
        scale: {
          name: "Scale",
          summary: "Multi-brand or heavier volume. Still HITL — no autopilot.",
          points: [
            "More brands or a heavier content load",
            "Same approval discipline as Growth",
            "Capacity for parallel calendars",
            "Still one accountable operator, not a black box",
          ],
        },
      },
      footnote:
        "Paid ads budget is yours. We can brief and iterate creative; media buying is scoped separately if you need it.",
    },
    stack: {
      eyebrow: "Readiness — honest",
      title: "Meta-first. Other channels earn a seat.",
      lead: "We will not sell you a ten-platform operating system on day one. Starter is Instagram. Growth is full Meta. Everything else is added when it has a job.",
      readyTitle: "Ready now",
      ready: [
        {
          title: "Instagram",
          body: "Core publishing path on Starter. Reels, feed, and stories as the brief requires — always through approval.",
        },
        {
          title: "Facebook",
          body: "Paired with Instagram on Growth and Scale. Page content and Meta-native distribution, not a neglected clone.",
        },
        {
          title: "HITL workflow",
          body: "Draft → review → approve → publish. Built so a founder can stay in control without writing every caption.",
        },
        {
          title: "Research loop",
          body: "Weekly on Growth and Scale. We do not pretend a single kickoff workshop is a strategy.",
        },
      ],
      laterTitle: "Not the default (yet)",
      later: [
        {
          title: "TikTok, LinkedIn, YouTube, email",
          body: "Available when they serve a specific offer — not bundled as theatre. Ask if you already have a reason.",
        },
        {
          title: "Full-funnel paid media",
          body: "Creative support yes; running large ad accounts is a separate scope, not smuggled into the retainer.",
        },
        {
          title: "Self-serve SaaS",
          body: "This is an agency. You hire the operator. You do not get a login that replaces the work.",
        },
      ],
      toolsTitle: "Tools we may run inside the retainer",
      toolsLead:
        "Software shows up as part of delivery — not a storefront price list. If a tool helps the loop, we use it. If it does not, we do not.",
      tools: {
        aime: "Internal marketing employee: research notes, drafts, calendars.",
        assistant: "Business-side briefs, follow-ups, and operating memory.",
        showroom: "Product or offer presentation when the brand needs a visual layer.",
      },
    },
    fit: {
      eyebrow: "Fit",
      title: "Who this is for — and who should walk away",
      forTitle: "Good fit",
      forItems: [
        "A founder or marketer who will actually approve content on a cadence",
        "One brand (Starter) or a small set of brands (Scale) with a real offer",
        "Meta as the primary public surface — Instagram first, Facebook when useful",
        "You want an operator with an AI stack, not a 12-person pitch deck",
      ],
      notTitle: "Not a fit",
      notItems: [
        "Set-and-forget posting with no human in the loop",
        "Guaranteed viral, guaranteed ROAS, or any invented percentage",
        "Ten channels from week one with no one to approve the work",
        "A SaaS subscription that is supposed to replace a marketer overnight",
      ],
    },
    contact: {
      eyebrow: "Brief",
      title: "Tell us the brand. We will tell you if we should work.",
      lead: "Short form. If the fit is wrong, we will say so. Telegram or WhatsApp is enough if you live in messengers.",
      name: "Name",
      email: "Email",
      messenger: "Telegram or WhatsApp",
      messengerHint: "Handle or number",
      company: "Company / brand",
      budget: "Budget",
      budgetOptions: [
        { value: "starter", label: "Starter · ~$1,200/mo" },
        { value: "growth", label: "Growth · ~$2,200/mo" },
        { value: "scale", label: "Scale · ~$3,500/mo" },
        { value: "unsure", label: "Not sure yet" },
      ],
      submit: "Send brief",
      sending: "Sending…",
      success: "Received. We will reply to the email or messenger you left.",
      error: "Could not send. Email hello@ai-mark.agency or try again.",
      privacy: "By sending, you agree we may contact you about this brief. See Privacy.",
    },
    footer: {
      blurb:
        "AI-native marketing agency. Research → strategy → content → human approval → publish → learn.",
      privacy: "Privacy",
      rights: "AI Mark Agency. All rights reserved.",
      poweredBy: "Tech partner: AlexDev",
    },
    privacy: {
      title: "Privacy",
      updated: "Last updated: 21 September 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) collects the information you submit through the contact form: name, email, messenger handle, company, and budget range. We use it only to reply to your brief and to decide whether we can take the work.",
        "We do not sell your data. We do not run a public analytics product on this site beyond what the hosting platform needs to keep the site up. Form submissions are emailed to our operator inbox.",
        "You can ask us to delete a brief by writing to hello@ai-mark.agency. This page is a stub and will be expanded if we add more processing (newsletters, ads pixels, hiring).",
        "Hosting may be provided by Vercel. Email delivery may be provided by a transactional email vendor. Those processors see only what is required to deliver the service.",
      ],
    },
    jsonLd: {
      description:
        "AI-native marketing agency. One senior operator and an AI stack delivering Meta-first content with human approval on every publish.",
    },
  },
  ru: {
    meta: {
      title: "AI Mark Agency — AI-native маркетинг с человеческим апрувом",
      description:
        "AI-native маркетинговое агентство с упором на Meta. Один старший оператор и AI-стек: исследование, стратегия, контент, апрув человека, публикация, обучение. Ретейнеры от $1,200/мес.",
      ogTitle: "AI Mark Agency — Meta-first, контент только после апрува",
      keywords: [
        "AI маркетинговое агентство",
        "продвижение в Instagram",
        "Facebook контент",
        "Meta маркетинг",
        "human in the loop",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "#how", label: "Как работаем" },
        { href: "#packages", label: "Пакеты" },
        { href: "#stack", label: "Стек" },
        { href: "#fit", label: "Кому подходит" },
      ],
      cta: "Оставить бриф",
      langEn: "EN",
      langRu: "RU",
    },
    hero: {
      eyebrow: "AI-native маркетинговое агентство · Meta-first",
      title: "Один оператор. AI-стек. В эфир — только после вас.",
      lead: "AI Mark Agency ведёт исследование, стратегию и Meta-контент на ретейнере — это не витрина SaaS. Вы остаётесь в контуре апрува. Мы отвечаем за работу.",
      primaryCta: "Смотреть ретейнеры",
      secondaryCta: "Написать",
      notes: [
        "Instagram на Starter. Полная Meta — на Growth.",
        "Человек в контуре на каждой публикации.",
        "Один старший оператор — не подмена джуниорской скамейкой.",
      ],
    },
    how: {
      eyebrow: "Операционная система",
      title: "Как работа реально движется",
      lead: "Замкнутый цикл, а не свалка постов. Исследуем, решаем, готовим, ждём ваше «да», публикуем, возвращаем выводы в следующий круг.",
      steps: [
        {
          title: "Исследование",
          body: "Аудитория, оффер, конкуренты и то, что уже собирает внимание в категории — до первой строки текста.",
        },
        {
          title: "Стратегия",
          body: "Короткий бриф: с кем говорим, что говорим, какие поверхности Meta реально используем в этом месяце.",
        },
        {
          title: "Контент",
          body: "Черновики из AI-стека под управлением оператора. Объём без превращения бренда в серую кашу.",
        },
        {
          title: "Апрув человека",
          body: "Вы (или названный апрувер) подтверждаете. Тихих публикаций нет. Нет апрува — нет эфира.",
        },
        {
          title: "Публикация",
          body: "В согласованные каналы Meta: подписи, нейминг, метки, по которым потом можно учиться.",
        },
        {
          title: "Обучение",
          body: "Что зашло, что встало, что режем. Следующее исследование начинается с фактов, не с настроения.",
        },
      ],
    },
    packages: {
      eyebrow: "Ретейнеры",
      title: "Ретейнеры в USD. Понятный скоуп. Без выдуманных процентов.",
      lead: "Выберите вес работы. Во всех пакетах человек в контуре. Цены — в долларах США в месяц, без медиабюджета.",
      perMonth: "/мес",
      featured: "Чаще начинают отсюда",
      cta: "Запросить пакет",
      items: {
        starter: {
          name: "Starter",
          summary: "Instagram и путь апрува. Один бренд.",
          points: [
            "Один бренд, Instagram как рабочий канал",
            "Календарь и пайплайн черновиков",
            "Именной путь апрува до публикации",
            "Операторский контроль каждого материала",
          ],
        },
        growth: {
          name: "Growth",
          summary: "Полная Meta (Instagram + Facebook), HITL, еженедельное исследование.",
          points: [
            "Instagram и Facebook как одна Meta-система",
            "Еженедельный цикл исследование → стратегия → контент",
            "Человек в контуре на каждой публикации",
            "Обратная связь с того, что реально вышло",
          ],
        },
        scale: {
          name: "Scale",
          summary: "Несколько брендов или больший объём. HITL остаётся — автопилота нет.",
          points: [
            "Больше брендов или тяжелее контент-нагрузка",
            "Та же дисциплина апрува, что на Growth",
            "Параллельные календари",
            "По-прежнему один ответственный оператор, не чёрный ящик",
          ],
        },
      },
      footnote:
        "Медиабюджет — ваш. Креативы можем брифровать и итерировать; байинг, если нужен, выносится в отдельный скоуп.",
    },
    stack: {
      eyebrow: "Готовность — честно",
      title: "Meta-first. Остальные каналы зарабатывают место.",
      lead: "Мы не продаём операционку на десять площадок в первый день. Starter — Instagram. Growth — полная Meta. Остальное подключается, когда у канала есть задача.",
      readyTitle: "Готово сейчас",
      ready: [
        {
          title: "Instagram",
          body: "Основной путь публикации на Starter. Reels, лента, сторис — по брифу и только через апрув.",
        },
        {
          title: "Facebook",
          body: "В паре с Instagram на Growth и Scale. Контент страницы и Meta-дистрибуция, а не заброшенный клон.",
        },
        {
          title: "HITL-процесс",
          body: "Черновик → ревью → апрув → публикация. Основатель контролирует без написания каждой подписи.",
        },
        {
          title: "Исследовательский цикл",
          body: "Еженедельно на Growth и Scale. Один воркшоп на старте стратегией не считаем.",
        },
      ],
      laterTitle: "Не по умолчанию (пока)",
      later: [
        {
          title: "TikTok, LinkedIn, YouTube, email",
          body: "Если под конкретный оффер — да. Не кладём в пакет «для галочки». Спросите, если причина уже есть.",
        },
        {
          title: "Полный paid-funnel",
          body: "Поддержка креатива — да; вести крупный рекламный кабинет — отдельный скоуп, не спрятанный в ретейнере.",
        },
        {
          title: "Self-serve SaaS",
          body: "Это агентство. Вы нанимаете оператора. Логин, который «заменяет маркетолога», здесь не продаётся.",
        },
      ],
      toolsTitle: "Инструменты, которые можем вести внутри ретейнера",
      toolsLead:
        "Софт появляется как часть поставки — не как витрина с прайсом. Помогает циклу — используем. Нет — не тащим.",
      tools: {
        aime: "Внутренний маркетинговый сотрудник: заметки, черновики, календари.",
        assistant: "Бизнес-брифы, фоллоу-апы и операционная память.",
        showroom: "Витрина продукта или оффера, когда бренду нужен визуальный слой.",
      },
    },
    fit: {
      eyebrow: "Совпадение",
      title: "Кому это нужно — и кому лучше уйти",
      forTitle: "Хороший фит",
      forItems: [
        "Фаундер или маркетолог, который реально апрувит контент по ритму",
        "Один бренд (Starter) или небольшая пачка брендов (Scale) с живым оффером",
        "Meta как основная публичная поверхность — сначала Instagram, Facebook по смыслу",
        "Нужен оператор с AI-стеком, а не колода из двенадцати человек",
      ],
      notTitle: "Не фит",
      notItems: [
        "Постинг «поставь и забудь» без человека в контуре",
        "Гарантия виральности, ROAS или любой выдуманный процент",
        "Десять каналов с первой недели без того, кто апрувит",
        "SaaS-подписка, которая якобы заменяет маркетолога overnight",
      ],
    },
    contact: {
      eyebrow: "Бриф",
      title: "Назовите бренд. Мы скажем, стоит ли работать.",
      lead: "Короткая форма. Если фит плохой — так и напишем. Telegram или WhatsApp достаточно, если вы живёте в мессенджерах.",
      name: "Имя",
      email: "Email",
      messenger: "Telegram или WhatsApp",
      messengerHint: "Ник или номер",
      company: "Компания / бренд",
      budget: "Бюджет",
      budgetOptions: [
        { value: "starter", label: "Starter · ~$1,200/мес" },
        { value: "growth", label: "Growth · ~$2,200/мес" },
        { value: "scale", label: "Scale · ~$3,500/мес" },
        { value: "unsure", label: "Пока не уверен(а)" },
      ],
      submit: "Отправить бриф",
      sending: "Отправляем…",
      success: "Получили. Ответим на email или в мессенджер, который вы оставили.",
      error: "Не отправилось. Напишите hello@ai-mark.agency или попробуйте ещё раз.",
      privacy: "Отправляя, вы соглашаетесь, что мы свяжемся по этому брифу. См. Privacy.",
    },
    footer: {
      blurb:
        "AI-native маркетинговое агентство. Исследование → стратегия → контент → апрув человека → публикация → обучение.",
      privacy: "Конфиденциальность",
      rights: "AI Mark Agency. Все права защищены.",
      poweredBy: "Технический партнёр: AlexDev",
    },
    privacy: {
      title: "Конфиденциальность",
      updated: "Обновлено: 21 сентября 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) собирает данные, которые вы отправляете в форме: имя, email, мессенджер, компанию и диапазон бюджета. Используем их только чтобы ответить на бриф и решить, берём ли работу.",
        "Мы не продаём данные. На сайте нет отдельного аналитического продукта сверх того, что нужно хостингу. Заявки уходят на почту оператора.",
        "Попросить удалить бриф можно на hello@ai-mark.agency. Это заглушка политики; расширим, если появится рассылка, пиксели или найм.",
        "Хостинг может быть на Vercel. Доставка писем — через транзакционного провайдера. Они видят только то, что нужно для доставки сервиса.",
      ],
    },
    jsonLd: {
      description:
        "AI-native маркетинговое агентство. Один старший оператор и AI-стек: Meta-first контент с апрувом человека на каждой публикации.",
    },
  },
};

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}
