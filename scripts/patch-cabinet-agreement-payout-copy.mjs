#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = path.join(root, "content/cabinet/locales");

/** @type {Record<string, Record<string, unknown>>} */
const PATCH = {
  ru: {
    signup: {
      agreementLink: "партнёрское соглашение",
      footerMiddle: "и",
    },
    form: {
      acceptAgreementBefore: "Я принимаю ",
      acceptAgreementLink: "партнёрское соглашение",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Запросить выплату",
      minimumNote: "Минимальная сумма к выплате: USD {min}.00",
      availableLabel: "Доступно к выплате",
      requestButton: "Запросить выплату",
      requestedNotice: "Запрос на выплату отправлен.",
      openBlocked: "У вас уже есть открытый запрос выплаты.",
      destBlocked: "Сначала сохраните реквизиты в профиле.",
      belowMinimum: "Сумма ниже минимального порога.",
    },
  },
  de: {
    signup: {
      agreementLink: "Partnervereinbarung",
      footerMiddle: "und die",
    },
    form: {
      acceptAgreementBefore: "Ich akzeptiere die ",
      acceptAgreementLink: "Partnervereinbarung",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Auszahlung anfordern",
      minimumNote: "Mindestauszahlungsbetrag: USD {min}.00",
      availableLabel: "Verfügbar zur Auszahlung",
      requestButton: "Auszahlung anfordern",
      requestedNotice: "Auszahlungsanfrage eingereicht.",
      openBlocked: "Sie haben bereits eine offene Auszahlungsanfrage.",
      destBlocked: "Speichern Sie zuerst die Auszahlungsdaten im Profil.",
      belowMinimum: "Guthaben liegt unter dem Mindestbetrag.",
    },
  },
  es: {
    signup: {
      agreementLink: "acuerdo de socio",
      footerMiddle: "y el",
    },
    form: {
      acceptAgreementBefore: "Acepto el ",
      acceptAgreementLink: "acuerdo de socio",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Solicitar pago",
      minimumNote: "Saldo mínimo pagable: USD {min}.00",
      availableLabel: "Disponible para pagar",
      requestButton: "Solicitar pago",
      requestedNotice: "Solicitud de pago enviada.",
      openBlocked: "Ya tiene una solicitud de pago abierta.",
      destBlocked: "Guarde los datos de pago en el perfil antes de solicitar.",
      belowMinimum: "El saldo está por debajo del umbral mínimo.",
    },
  },
  pt: {
    signup: {
      agreementLink: "acordo de parceiro",
      footerMiddle: "e o",
    },
    form: {
      acceptAgreementBefore: "Aceito o ",
      acceptAgreementLink: "acordo de parceiro",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Solicitar pagamento",
      minimumNote: "Saldo mínimo pagável: USD {min}.00",
      availableLabel: "Disponível para pagar",
      requestButton: "Solicitar pagamento",
      requestedNotice: "Pedido de pagamento enviado.",
      openBlocked: "Já existe um pedido de pagamento aberto.",
      destBlocked: "Salve os dados de pagamento no perfil antes de solicitar.",
      belowMinimum: "O saldo está abaixo do limite mínimo.",
    },
  },
  fr: {
    signup: {
      agreementLink: "accord partenaire",
      footerMiddle: "et l’",
    },
    form: {
      acceptAgreementBefore: "J’accepte l’",
      acceptAgreementLink: "accord partenaire",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Demander un paiement",
      minimumNote: "Solde minimum payable : USD {min}.00",
      availableLabel: "Disponible à payer",
      requestButton: "Demander un paiement",
      requestedNotice: "Demande de paiement envoyée.",
      openBlocked: "Vous avez déjà une demande de paiement ouverte.",
      destBlocked: "Enregistrez les coordonnées de paiement dans le profil avant de demander.",
      belowMinimum: "Le solde est inférieur au seuil minimum.",
    },
  },
  ar: {
    signup: {
      agreementLink: "اتفاقية الشريك",
      footerMiddle: "و",
    },
    form: {
      acceptAgreementBefore: "أوافق على ",
      acceptAgreementLink: "اتفاقية الشريك",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "طلب دفع",
      minimumNote: "الحد الأدنى للرصيد القابل للدفع: USD {min}.00",
      availableLabel: "متاح للدفع",
      requestButton: "طلب دفع",
      requestedNotice: "تم إرسال طلب الدفع.",
      openBlocked: "لديك بالفعل طلب دفع مفتوح.",
      destBlocked: "احفظ تفاصيل الدفع في الملف الشخصي قبل الطلب.",
      belowMinimum: "الرصيد أقل من الحد الأدنى.",
    },
  },
  zh: {
    signup: {
      agreementLink: "合作伙伴协议",
      footerMiddle: "和",
    },
    form: {
      acceptAgreementBefore: "我接受",
      acceptAgreementLink: "合作伙伴协议",
      acceptAgreementAfter: "。",
    },
    payoutsRequest: {
      sectionTitle: "申请付款",
      minimumNote: "最低可支付余额：USD {min}.00",
      availableLabel: "可支付金额",
      requestButton: "申请付款",
      requestedNotice: "付款申请已提交。",
      openBlocked: "您已有未处理的付款申请。",
      destBlocked: "请先在个人资料中保存付款信息。",
      belowMinimum: "余额低于最低门槛。",
    },
  },
  ja: {
    signup: {
      agreementLink: "パートナー契約",
      footerMiddle: "および",
    },
    form: {
      acceptAgreementBefore: "",
      acceptAgreementLink: "パートナー契約",
      acceptAgreementAfter: "に同意します。",
    },
    payoutsRequest: {
      sectionTitle: "支払いをリクエスト",
      minimumNote: "最低支払可能残高：USD {min}.00",
      availableLabel: "支払可能額",
      requestButton: "支払いをリクエスト",
      requestedNotice: "支払いリクエストを送信しました。",
      openBlocked: "未処理の支払いリクエストが既にあります。",
      destBlocked: "リクエスト前にプロフィールで支払い情報を保存してください。",
      belowMinimum: "残高が最低しきい値を下回っています。",
    },
  },
  tr: {
    signup: {
      agreementLink: "ortaklık sözleşmesi",
      footerMiddle: "ve",
    },
    form: {
      acceptAgreementBefore: "",
      acceptAgreementLink: "ortaklık sözleşmesini",
      acceptAgreementAfter: " kabul ediyorum.",
    },
    payoutsRequest: {
      sectionTitle: "Ödeme talep et",
      minimumNote: "Minimum ödenebilir bakiye: USD {min}.00",
      availableLabel: "Ödenebilir tutar",
      requestButton: "Ödeme talep et",
      requestedNotice: "Ödeme talebi gönderildi.",
      openBlocked: "Zaten açık bir ödeme talebiniz var.",
      destBlocked: "Talep etmeden önce profilde ödeme bilgilerini kaydedin.",
      belowMinimum: "Bakiye minimum eşiğin altında.",
    },
  },
  id: {
    signup: {
      agreementLink: "perjanjian mitra",
      footerMiddle: "dan",
    },
    form: {
      acceptAgreementBefore: "Saya menerima ",
      acceptAgreementLink: "perjanjian mitra",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Minta pembayaran",
      minimumNote: "Saldo minimum yang dapat dibayar: USD {min}.00",
      availableLabel: "Tersedia untuk dibayar",
      requestButton: "Minta pembayaran",
      requestedNotice: "Permintaan pembayaran dikirim.",
      openBlocked: "Anda sudah memiliki permintaan pembayaran terbuka.",
      destBlocked: "Simpan detail pembayaran di Profil sebelum meminta.",
      belowMinimum: "Saldo di bawah ambang minimum.",
    },
  },
  vi: {
    signup: {
      agreementLink: "thỏa thuận đối tác",
      footerMiddle: "và",
    },
    form: {
      acceptAgreementBefore: "Tôi chấp nhận ",
      acceptAgreementLink: "thỏa thuận đối tác",
      acceptAgreementAfter: ".",
    },
    payoutsRequest: {
      sectionTitle: "Yêu cầu thanh toán",
      minimumNote: "Số dư tối thiểu có thể thanh toán: USD {min}.00",
      availableLabel: "Có thể thanh toán",
      requestButton: "Yêu cầu thanh toán",
      requestedNotice: "Đã gửi yêu cầu thanh toán.",
      openBlocked: "Bạn đã có yêu cầu thanh toán đang mở.",
      destBlocked: "Lưu chi tiết thanh toán trong Hồ sơ trước khi yêu cầu.",
      belowMinimum: "Số dư dưới ngưỡng tối thiểu.",
    },
  },
};

import { cabinetEn } from "../content/cabinet/en.ts";

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      if (!target[k] || typeof target[k] !== "object") target[k] = {};
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
}

const enRequest = cabinetEn.payouts.request;

for (const file of readdirSync(localesDir).filter((f) => f.endsWith(".ts"))) {
  const loc = file.replace(/\.ts$/, "");
  const mod = await import(path.join(localesDir, file));
  const exportName = `cabinet${loc.charAt(0).toUpperCase()}${loc.slice(1)}`;
  const data = structuredClone(mod[exportName]);

  const patch = PATCH[loc] ?? {
    signup: {
      agreementLink: cabinetEn.auth.signup.agreementLink,
      footerMiddle: cabinetEn.auth.signup.footerMiddle,
    },
    form: {
      acceptAgreementBefore: cabinetEn.auth.form.acceptAgreementBefore,
      acceptAgreementLink: cabinetEn.auth.form.acceptAgreementLink,
      acceptAgreementAfter: cabinetEn.auth.form.acceptAgreementAfter,
    },
    payoutsRequest: enRequest,
  };

  deepMerge(data.auth.signup, patch.signup);
  deepMerge(data.auth.form, patch.form);
  data.payouts.request = { ...enRequest, ...patch.payoutsRequest };

  const body = `import type { CabinetCopy } from "../types";

export const ${exportName}: CabinetCopy = ${JSON.stringify(data, null, 2)} as CabinetCopy;
`;
  writeFileSync(path.join(localesDir, file), body);
  console.log("Patched", file);
}
