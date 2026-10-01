/**
 * One-off generator for cabinet locale modules. Run:
 *   node --experimental-strip-types scripts/generate-cabinet-locales.mjs
 */
import { writeFileSync } from "node:fs";
import { cabinetEn } from "../content/cabinet/en.ts";

const LOCALES = ["ru", "de", "es", "pt", "ar", "zh", "id", "vi", "fr", "ja", "tr"];

function deepMerge(base, patch) {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(patch)) return patch.slice();
  if (typeof patch !== "object") return patch;
  const out = { ...base };
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    const bv = base?.[key];
    if (
      pv &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(bv, pv);
    } else {
      out[key] = pv;
    }
  }
  return out;
}

/** Locale-specific overrides (natural translations). English base fills gaps. */
const PATCHES = {
  ru: {
    meta: { platformTitle: "Partner Platform", titleTemplate: "%s · Partner Platform" },
    shell: {
      navLabel: "Разделы кабинета",
      signOut: "Выйти",
      signedIn: "Вы вошли",
      backToSite: "← ai-mark.agency",
      ventureTagline: "Venture and Marketing",
      themeLight: "Светлая тема",
      themeDark: "Тёмная тема",
      backAriaLabel: "Назад",
    },
    nav: {
      dashboard: "Главная",
      customers: "Клиенты",
      sales: "Продажи",
      network: "Сеть",
      commissions: "Комиссии",
      payouts: "Выплаты",
      resources: "Материалы",
      profile: "Профиль",
    },
    auth: {
      login: {
        metadataTitle: "Вход",
        title: "Вход",
        lead: "Кабинет партнёра AI MARK: referral-ссылка, сеть, клиенты и комиссии.",
        footerBefore: "Ещё не партнёр?",
        footerLink: "Партнёрская программа",
      },
      signup: {
        metadataTitle: "Регистрация партнёра",
        title: "Создать аккаунт партнёра",
        lead: "Один аккаунт — Partner ID, referral-код и кабинет партнёра.",
        footerBefore: "Правила программы подтверждаем на подключении, до первых продаж. Читайте",
        privacyLink: "политику конфиденциальности",
      },
      setupNotice: {
        title: "Вход временно недоступен.",
        body: "Напишите нам — поможем войти. Публичный сайт работает.",
      },
      callbackErrors: {
        missing_code: "Ссылка для входа неполная. Запросите новую ниже.",
        exchange_failed: "Ссылка истекла или уже использована. Запросите новую ниже.",
        provider_error: "Провайдер входа не завершил запрос.",
        not_configured: "Вход временно недоступен. Напишите нам — поможем войти.",
      },
      signedOutNotice: "Вы вышли из аккаунта.",
      genericSignInError: "Не удалось завершить вход. Попробуйте снова.",
      form: {
        email: "Email",
        password: "Пароль",
        fullName: "Имя",
        signIn: "Войти",
        signInPending: "Вход…",
        createAccount: "Создать аккаунт партнёра",
        createAccountPending: "Создание…",
        continueGoogle: "Продолжить с Google",
        continueGooglePending: "Открываем Google…",
        magicLinkLabel: "Прислать ссылку для входа",
        sendMagicLink: "Отправить magic link",
        sendMagicLinkPending: "Отправка…",
        noAccountBefore: "Нет аккаунта?",
        noAccountLink: "Создать аккаунт партнёра",
        hasAccountBefore: "Уже есть аккаунт?",
        hasAccountLink: "Войти",
      },
    },
    pages: {
      customers: {
        title: "Клиенты",
        lead: "Люди, отправившие форму на сайте, пока действовала ваша referral-ссылка. Чат, Telegram, WhatsApp и email сюда не попадают. Лид — не продажа и не комиссия.",
      },
      sales: {
        title: "Продажи",
        lead: "Оплаченные заказы с вашим referral-кодом или Partner ID. Клики и лиды — не продажи. Суммы — как записаны в продаже.",
      },
      network: {
        title: "Сеть",
        lead: "Ваш спонсор и сколько партнёров зарегистрировалось по вашей ссылке. Имена в даунлайне не показываются.",
      },
      commissions: {
        title: "Комиссии",
        lead:
          "Launch bonus до 31.12.2026 (месяцы 1–3): L1 50% … L5 3%, пул 80%. С 4-го месяца: L1 20% + L2 5%. С 01.01.2027 месяцы 1–3: L1 35% / L2 10% / L3 5%.",
      },
      payouts: {
        title: "Выплаты",
        lead: "Записанные выплаты и USDC-адрес в профиле. AI MARK отправляет выплату на этот адрес.",
      },
      profile: {
        title: "Профиль",
        lead: "Поля аккаунта и партнёрской записи — только чтение. Менять можно только реквизиты выплат.",
      },
      noAccess: {
        metadataTitle: "Доступ партнёра",
        title: "Нет доступа партнёра для этого аккаунта",
        lead: "Вы вошли, но к аккаунту не привязана партнёрская запись.",
        footer: "Ошибка? Ответьте на любое письмо AI MARK — привяжем запись партнёра.",
        signedInAfter:
          "Записи партнёра выдаёт AI MARK; владелец аккаунта не создаёт их сам.",
      },
    },
    dashboard: {
      welcomeTitle: "Добро пожаловать, {name}",
      welcomeLeadAfter:
        "Referral-ссылка активна. Продажи, комиссии и выплаты появляются здесь по мере записи.",
      performanceTitle: "Показатели",
      performanceLead:
        "Квалифицированные продажи и комиссия — после оплаты клиентом. Прочерк — данных пока нет.",
      statQualifyingSales: "Квалифицированные продажи",
      statCommission: "Комиссия",
      statReadyToPay: "К выплате",
      statPaid: "Выплачено",
      noCommissionsYet: "Комиссий пока нет.",
      identityTitle: "Идентичность партнёра",
      identityLead:
        "Выдано AI MARK. Partner ID, referral-код и статус из аккаунта не меняются.",
      labelPartnerStatus: "Статус партнёра",
      labelReferralCode: "Referral-код",
      labelCountry: "Страна",
      labelJoined: "Подключён",
      labelLanguage: "Язык",
      sponsorTitle: "Спонсор",
      sponsorRecordedUnconfirmed: "Записан, ещё не подтверждён квалифицированной продажей.",
      sponsorFromReferralLink: " Записан по referral-ссылке при регистрации.",
      sponsorEmpty:
        "Спонсор не записан. Связь задаёт AI MARK по referral-ссылке при регистрации, не партнёр; после подтверждения не меняется.",
      historyTitle: "История статусов",
      historyLead: "Пишется базой при каждом изменении статуса.",
      historyEmpty: "Записей пока нет.",
      hubTitle: "Демо, материалы, знания, поддержка",
      hubLead: "Страницы продуктов, файлы бренда, цены и каналы поддержки — в разделе «Материалы».",
      hubLinkDemos: "Демо и презентации",
      hubLinkKnowledge: "База по продуктам",
      hubLinkMaterials: "Файлы бренда",
      hubLinkSupport: "Поддержка",
      trackingFootnoteBefore: "Как работает атрибуция — в",
      trackingFootnoteLink: "Материалах",
      launchActiveTitle: "Launch bonus активен",
      launchEndedTitle: "Launch bonus завершён",
      launchActiveBody:
        "Launch bonus · до 31.12.2026: до 80% пула на первые 3 месяца оплат клиента. С 4-го месяца: L1 20% + L2 5%.",
      launchEndedBody:
        "Launch bonus завершился 31.12.2026. Новые продажи — стандартная сетка (50% на месяцы 1–3; продления L1 20% + L2 5%).",
    },
    referralPanel: {
      title: "Referral-программа",
      lead: "Визиты по ссылке записываются на сервере; лид клиента атрибутируется 30 дней. Партнёр, зарегистрировавшийся по ссылке, идёт в вашу сеть. Спонсор задаётся AI MARK только по referral-ссылке — не из вашего аккаунта и не редактируется в клиенте.",
      statClicks: "Клики по ссылке",
      statLeads: "Атрибутированные лиды",
      statSignups: "Регистрации партнёров",
      footnote: "Клики, лиды и регистрации партнёров. Комиссии и выплаты — на страницах «Комиссии» и «Выплаты».",
    },
    commissionSchedule: {
      title: "Partner Commission Model",
      lead: "50% за прямую продажу. До 80% суммарно партнёрам по сети. 80% — агрегированный пул L1–L5, не выплата одному партнёру. Доля AI Mark — 20% от commissionable amount. Цифры в ledger — сохранённые значения; карточка не пересчитывает ваш доход.",
      levels: {
        "1": {
          title: "Прямая продажа",
          body: "Клиент, которого вы лично привели. 50% от commissionable amount — не весь пул 80%.",
        },
        "2": { title: "Первая линия сети", body: "Оплаченные продажи партнёров первого уровня." },
        "3": { title: "Расширенная сеть", body: "Оплаченные продажи на уровень глубже." },
        "4": { title: "Глубина рынка", body: "Сеть за пределами прямых связей." },
        "5": { title: "Максимальная глубина", body: "Самый глубокий уровень стандартной сетки." },
      },
      exampleFootnote: "Прямой партнёр получает $500, не $800. Total network pool 80%.",
    },
    dataTable: {
      unreadable: "Не удалось прочитать список.",
      customers: {
        empty:
          "Нет атрибутированных лидов. Строка появляется, когда форму отправляют при активной referral-cookie. Пустой список — просто пусто.",
        columns: ["Имя", "Компания", "Email", "Сценарий", "Страница", "Когда"],
      },
      sales: {
        empty:
          "Продаж пока нет. Строка — после записи AI MARK реальной оплаты. Пустой список — не нулевая оценка выручки.",
        columns: ["Продукт", "Сумма", "Статус", "Оплачено", "Подтверждено", "Заблокировано", "Заказ"],
      },
      commissions: {
        empty: "Комиссий пока нет. Запись — после квалифицированной продажи.",
        columns: ["Статус", "Тип", "Уровень", "Сумма", "Ставка", "База", "Запись"],
      },
      payouts: {
        empty: "Выплат пока нет. AI MARK записывает выплату, когда комиссия готова к выплате.",
        columns: ["Статус", "Сумма", "Создано", "Подтверждено", "Выплачено"],
      },
    },
    network: {
      statRegistrations: "Регистрации партнёров",
      sponsorTitle: "Ваш спонсор",
      labelSponsorPartnerId: "Partner ID спонсора",
      labelRecorded: "Записан",
      labelConfirmed: "Подтверждён",
      notConfirmed: "Не подтверждён",
      labelSource: "Источник",
      sponsorEmpty:
        "Спонсор не записан. Спонсор задаётся referral-ссылкой при регистрации. Назначить здесь нельзя.",
      statusTitle: "Ваш статус",
      statusNone: "По вашей ссылке ещё никто не зарегистрировался как партнёр.",
      statusUnreadable: "Не удалось прочитать регистрации партнёров.",
      statusCount:
        "{count} аккаунтов партнёров атрибутировано вашей ссылке. Список имён не показывается.",
    },
    payouts: {
      destinationTitle: "Куда отправляется выплата",
      destinationLead: "Адрес для выплат.",
      destinationUnreadable: "Не удалось прочитать реквизиты выплат.",
      editPayoutLink: "Изменить реквизиты выплат",
      flowTitle: "Как движется выплата",
      flowSteps: [
        "1. Квалифицированная продажа записывает комиссию.",
        "2. Комиссия удерживается 14 дней после подтверждения продажи.",
        "3. После удержания, если продажа сохраняется, сумма готова к выплате.",
        "4. AI MARK записывает выплату и отправляет USDC на ваш адрес.",
        "5. Возврат или отмена корректируют задолженность.",
      ],
    },
    profile: {
      savedNotice: "Реквизиты выплат сохранены.",
      accountTitle: "Аккаунт",
      labelFullName: "Имя",
      labelPhone: "Телефон",
      labelRegion: "Регион",
      labelAvatarUrl: "URL аватара",
      labelAccountCreated: "Аккаунт создан",
      partnerRecordTitle: "Партнёрская запись",
      partnerRecordLead: "Принадлежит платформе. Из сессии партнёра не меняется.",
      labelPartnerSince: "Партнёр с",
      payoutTitle: "Реквизиты выплат",
      payoutLead:
        "Выплаты партнёрам — USDC. Сеть по умолчанию — Solana. Форма сохраняет адрес в профиле. Токены не отправляет.",
      payoutUnreadable: "Не удалось прочитать реквизиты — сохранить с этой страницы нельзя.",
      labelRecipientName: "Имя получателя",
      labelPayoutAsset: "Актив выплаты",
      labelNetwork: "Сеть",
      labelUsdcAddress: "USDC-адрес",
      usdcPlaceholder: "Адрес Solana",
      labelNotes: "Заметки (необязательно)",
      savePayout: "Сохранить реквизиты выплат",
      referralTitle: "Referral-ссылка",
      referralLead: "Выдана с аккаунтом. Партнёрская запись выше — только чтение.",
    },
    copyReferralLink: {
      label: "Ваша referral-ссылка",
      copy: "Скопировать referral-ссылку",
      copied: "Скопировано",
      copiedStatus: "Referral-ссылка скопирована в буфер обмена.",
      failedStatus: "Копирование заблокировано — выделите ссылку и скопируйте вручную.",
      hint: "Ссылка активна. Каждый визит записывается; лид клиента — 30 дней; партнёр по ссылке — в вашу сеть. Добавляйте UTM (например ?utm_source=newsletter), чтобы видеть источники кликов.",
    },
    copyLine: { copy: "Копировать", copied: "Скопировано" },
    copyText: { copy: "Копировать", copied: "Скопировано" },
    defaultPartnerName: "Партнёр",
  },
};

const ES_PATCH = {
  shell: {
    navLabel: "Secciones del partner",
    signOut: "Cerrar sesión",
    signedIn: "Sesión iniciada",
    themeLight: "Tema claro",
    themeDark: "Tema oscuro",
    backAriaLabel: "Atrás",
  },
  nav: {
    dashboard: "Panel",
    customers: "Clientes",
    sales: "Ventas",
    network: "Red",
    commissions: "Comisiones",
    payouts: "Pagos",
    resources: "Recursos",
    profile: "Perfil",
  },
  auth: {
    login: {
      metadataTitle: "Iniciar sesión",
      title: "Iniciar sesión",
      lead: "Panel de partner de AI MARK: enlace de referido, red, clientes y comisiones.",
      footerBefore: "¿Aún no eres partner?",
      footerLink: "Ver el programa de partners",
    },
    signup: {
      metadataTitle: "Crear cuenta de partner",
      title: "Crear cuenta de partner",
      lead: "Una cuenta te da tu Partner ID, código de referido y el panel de partner.",
      footerBefore: "Las reglas del programa se confirman contigo en la incorporación, antes de vender. Lee el",
      privacyLink: "aviso de privacidad",
    },
    setupNotice: {
      title: "El inicio de sesión no está disponible temporalmente.",
      body: "Escríbenos y te ayudaremos. El sitio público sigue abierto.",
    },
    signedOutNotice: "Has cerrado sesión.",
    genericSignInError: "No pudimos completar ese inicio de sesión. Inténtalo de nuevo.",
    form: {
      email: "Correo",
      password: "Contraseña",
      fullName: "Nombre completo",
      signIn: "Iniciar sesión",
      signInPending: "Iniciando sesión…",
      createAccount: "Crear cuenta de partner",
      createAccountPending: "Creando cuenta…",
      continueGoogle: "Continuar con Google",
      continueGooglePending: "Abriendo Google…",
      magicLinkLabel: "Enviarme un enlace de acceso",
      sendMagicLink: "Enviar magic link",
      sendMagicLinkPending: "Enviando…",
      noAccountBefore: "¿Sin cuenta?",
      noAccountLink: "Crear cuenta de partner",
      hasAccountBefore: "¿Ya tienes cuenta?",
      hasAccountLink: "Iniciar sesión",
    },
  },
};

PATCHES.es = ES_PATCH;
PATCHES.pt = deepMerge(structuredClone(ES_PATCH), {
  shell: { navLabel: "Secções do partner", signOut: "Terminar sessão", signedIn: "Sessão iniciada" },
  nav: {
    dashboard: "Painel",
    customers: "Clientes",
    sales: "Vendas",
    network: "Rede",
    commissions: "Comissões",
    payouts: "Pagamentos",
    resources: "Recursos",
    profile: "Perfil",
  },
});
PATCHES.de = {
  shell: {
    navLabel: "Partner-Bereiche",
    signOut: "Abmelden",
    signedIn: "Angemeldet",
    themeLight: "Helles Theme",
    themeDark: "Dunkles Theme",
  },
  nav: {
    dashboard: "Dashboard",
    customers: "Kunden",
    sales: "Verkäufe",
    network: "Netzwerk",
    commissions: "Provisionen",
    payouts: "Auszahlungen",
    resources: "Ressourcen",
    profile: "Profil",
  },
};
PATCHES.fr = {
  shell: { navLabel: "Sections partner", signOut: "Se déconnecter", signedIn: "Connecté" },
  nav: {
    dashboard: "Tableau de bord",
    customers: "Clients",
    sales: "Ventes",
    network: "Réseau",
    commissions: "Commissions",
    payouts: "Paiements",
    resources: "Ressources",
    profile: "Profil",
  },
};
PATCHES.ja = {
  shell: { navLabel: "パートナーメニュー", signOut: "ログアウト", signedIn: "ログイン中" },
  nav: {
    dashboard: "ダッシュボード",
    customers: "顧客",
    sales: "売上",
    network: "ネットワーク",
    commissions: "コミッション",
    payouts: "支払い",
    resources: "リソース",
    profile: "プロフィール",
  },
};
PATCHES.tr = {
  shell: { navLabel: "Partner bölümleri", signOut: "Çıkış", signedIn: "Oturum açık" },
  nav: {
    dashboard: "Panel",
    customers: "Müşteriler",
    sales: "Satışlar",
    network: "Ağ",
    commissions: "Komisyonlar",
    payouts: "Ödemeler",
    resources: "Kaynaklar",
    profile: "Profil",
  },
};
PATCHES.ar = {
  shell: { navLabel: "أقسام الشريك", signOut: "تسجيل الخروج", signedIn: "مسجل الدخول" },
  nav: {
    dashboard: "لوحة التحكم",
    customers: "العملاء",
    sales: "المبيعات",
    network: "الشبكة",
    commissions: "العمولات",
    payouts: "المدفوعات",
    resources: "الموارد",
    profile: "الملف",
  },
};
PATCHES.zh = {
  shell: { navLabel: "合作伙伴栏目", signOut: "退出", signedIn: "已登录" },
  nav: {
    dashboard: "仪表盘",
    customers: "客户",
    sales: "销售",
    network: "网络",
    commissions: "佣金",
    payouts: "付款",
    resources: "资源",
    profile: "资料",
  },
};
PATCHES.id = {
  shell: { navLabel: "Bagian partner", signOut: "Keluar", signedIn: "Masuk" },
  nav: {
    dashboard: "Dasbor",
    customers: "Pelanggan",
    sales: "Penjualan",
    network: "Jaringan",
    commissions: "Komisi",
    payouts: "Pencairan",
    resources: "Sumber daya",
    profile: "Profil",
  },
};
PATCHES.vi = {
  shell: { navLabel: "Mục partner", signOut: "Đăng xuất", signedIn: "Đã đăng nhập" },
  nav: {
    dashboard: "Bảng điều khiển",
    customers: "Khách hàng",
    sales: "Doanh số",
    network: "Mạng lưới",
    commissions: "Hoa hồng",
    payouts: "Thanh toán",
    resources: "Tài nguyên",
    profile: "Hồ sơ",
  },
};

for (const loc of LOCALES) {
  const patch = PATCHES[loc] ?? {};
  const merged = deepMerge(cabinetEn, patch);
  const exportName = `cabinet${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  const body = `import type { CabinetCopy } from "../types";

export const ${exportName}: CabinetCopy = ${JSON.stringify(merged, null, 2)} as CabinetCopy;
`;
  writeFileSync(new URL(`../content/cabinet/locales/${loc}.ts`, import.meta.url), body);
}

console.log("Wrote cabinet locales:", LOCALES.join(", "));
