import { listPublicMessengers } from "@/lib/contact";
import { PAYABLE_SKUS, PAY_PAGE_PATH, PAY_SKU_PARAM } from "@/lib/crypto/catalog";
import { buildSalesKit, type SalesKit } from "@/lib/partner/catalog";
import {
  PARTNER_BRAND_ASSETS,
  PARTNER_DEMO_CHANNELS,
  PARTNER_PRODUCT_LIMITS,
  type PartnerProductId,
} from "@/lib/partner/facts";
import { HUB_LABELS, type HubLabels } from "@/lib/partner/hub-labels";
import { referralUrl, referralUrlTo } from "@/lib/partner/format";
import { localePath, site, type Locale } from "@/lib/site";

export type { HubLabels } from "@/lib/partner/hub-labels";

export type PartnerDemo = {
  id: PartnerProductId;
  name: string;
  pageReferral: string;
  payReferrals: { skuId: string; name: string; href: string }[];
  liveChat: boolean;
  panelDemo: boolean;
};

export type PartnerKnowledge = {
  id: PartnerProductId;
  name: string;
  who: string;
  offer: string;
  price: string;
  extra: string;
  limits: string[];
  message: string;
  pageReferral: string;
};

export type PartnerHub = {
  labels: HubLabels;
  kit: SalesKit;
  demos: PartnerDemo[];
  knowledge: PartnerKnowledge[];
  assets: typeof PARTNER_BRAND_ASSETS;
  support: { email: string; messengers: ReturnType<typeof listPublicMessengers> };
  referralHome: string;
};

export function buildPartnerHub(locale: Locale, referralCode: string): PartnerHub {
  const kit = buildSalesKit(locale, referralCode);
  const labels = HUB_LABELS[locale];
  const payPath = localePath(locale, PAY_PAGE_PATH);

  const demos: PartnerDemo[] = kit.products.map((product) => {
    const id = product.id as PartnerProductId;
    const channel = PARTNER_DEMO_CHANNELS[id];
    return {
      id,
      name: product.name,
      pageReferral: product.referral,
      payReferrals: PAYABLE_SKUS.filter((sku) => sku.productRef === id).map((sku) => ({
        skuId: sku.id,
        name: sku.name,
        href: referralUrlTo(referralCode, `${payPath}?${PAY_SKU_PARAM}=${sku.id}`),
      })),
      liveChat: channel.liveChat,
      panelDemo: channel.panelDemo,
    };
  });

  const knowledge: PartnerKnowledge[] = kit.products.map((product) => {
    const id = product.id as PartnerProductId;
    return {
      id,
      name: product.name,
      who: product.who,
      offer: product.offer,
      price: product.price,
      extra: product.extra,
      limits: PARTNER_PRODUCT_LIMITS[id][locale],
      message: product.message,
      pageReferral: product.referral,
    };
  });

  return {
    labels,
    kit,
    demos,
    knowledge,
    assets: PARTNER_BRAND_ASSETS,
    support: { email: site.email, messengers: listPublicMessengers() },
    referralHome: referralUrl(referralCode),
  };
}

export function hubLabels(locale: Locale): HubLabels {
  return HUB_LABELS[locale];
}
