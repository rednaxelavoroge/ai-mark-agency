import type { Locale } from "@/lib/site";

export type { Locale };

export type CommissionLevelCopy = {
  title: string;
  body: string;
};

export type CabinetCopy = {
  meta: {
    platformTitle: string;
    titleTemplate: string;
  };
  shell: {
    navLabel: string;
    signOut: string;
    signedIn: string;
    backToSite: string;
    ventureTagline: string;
    themeLight: string;
    themeDark: string;
    backAriaLabel: string;
  };
  nav: {
    dashboard: string;
    customers: string;
    sales: string;
    network: string;
    commissions: string;
    payouts: string;
    resources: string;
    profile: string;
  };
  auth: {
    ventureTagline: string;
    login: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
      footerBefore: string;
      footerLink: string;
    };
    signup: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
      footerBefore: string;
      privacyLink: string;
      footerAfter: string;
    };
    setupNotice: {
      title: string;
      body: string;
    };
    callbackErrors: {
      missing_code: string;
      exchange_failed: string;
      provider_error: string;
      not_configured: string;
    };
    signedOutNotice: string;
    genericSignInError: string;
    form: {
      email: string;
      password: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      passwordNewPlaceholder: string;
      fullName: string;
      fullNamePlaceholder: string;
      signIn: string;
      signInPending: string;
      signUp: string;
      signUpPending: string;
      createAccount: string;
      createAccountPending: string;
      orDivider: string;
      continueGoogle: string;
      continueGooglePending: string;
      magicLinkLabel: string;
      sendMagicLink: string;
      sendMagicLinkPending: string;
      noAccountBefore: string;
      noAccountLink: string;
      hasAccountBefore: string;
      hasAccountLink: string;
    };
  };
  pages: {
    dashboard: { metadataTitle: string; eyebrow: string };
    customers: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    sales: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    network: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    commissions: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    payouts: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    profile: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
    };
    resources: { metadataTitle: string; eyebrow: string };
    noAccess: {
      metadataTitle: string;
      eyebrow: string;
      title: string;
      lead: string;
      footer: string;
      signedInBefore: string;
      signedInAfter: string;
    };
  };
  dashboard: {
    welcomeTitle: string;
    welcomeLeadBefore: string;
    welcomeLeadAfter: string;
    performanceTitle: string;
    performanceLead: string;
    statQualifyingSales: string;
    statCommission: string;
    statReadyToPay: string;
    statPaid: string;
    noCommissionsYet: string;
    currencyBreakdown: string;
    identityTitle: string;
    identityLead: string;
    labelPartnerId: string;
    labelPartnerStatus: string;
    labelReferralCode: string;
    labelCountry: string;
    labelJoined: string;
    labelLanguage: string;
    sponsorTitle: string;
    sponsorConfirmed: string;
    sponsorRecordedUnconfirmed: string;
    sponsorFromReferralLink: string;
    sponsorEmpty: string;
    historyTitle: string;
    historyLead: string;
    historyEmpty: string;
    hubTitle: string;
    hubLead: string;
    hubLinkDemos: string;
    hubLinkKnowledge: string;
    hubLinkMaterials: string;
    hubLinkSupport: string;
    trackingFootnoteBefore: string;
    trackingFootnoteLink: string;
    trackingFootnoteAfter: string;
    launchActiveTitle: string;
    launchEndedTitle: string;
    launchActiveBody: string;
    launchEndedBody: string;
  };
  referralPanel: {
    title: string;
    lead: string;
    statClicks: string;
    statLeads: string;
    statSignups: string;
    footnote: string;
  };
  commissionSchedule: {
    title: string;
    lead: string;
    levels: Record<"1" | "2" | "3" | "4" | "5", CommissionLevelCopy>;
    exampleHeading: string;
    exampleRows: {
      l1: string;
      l2: string;
      l3: string;
      l4: string;
      l5: string;
      totalPool: string;
      retainedShare: string;
    };
    exampleFootnote: string;
  };
  dataTable: {
    unreadable: string;
    customers: {
      empty: string;
      columns: string[];
    };
    sales: {
      empty: string;
      columns: string[];
    };
    commissions: {
      empty: string;
      columns: string[];
    };
    payouts: {
      empty: string;
      columns: string[];
    };
  };
  network: {
    statClicks: string;
    statLeads: string;
    statRegistrations: string;
    sponsorTitle: string;
    labelSponsorPartnerId: string;
    labelRecorded: string;
    labelConfirmed: string;
    notConfirmed: string;
    labelSource: string;
    sponsorEmpty: string;
    statusTitle: string;
    statusNone: string;
    statusUnreadable: string;
    statusCount: string;
  };
  payouts: {
    destinationTitle: string;
    destinationLead: string;
    destinationUnreadable: string;
    editPayoutLink: string;
    flowTitle: string;
    flowSteps: string[];
    statReady: string;
    statPaid: string;
    tableEmpty: string;
  };
  profile: {
    savedNotice: string;
    accountTitle: string;
    labelFullName: string;
    labelEmail: string;
    labelPhone: string;
    labelLanguage: string;
    labelCountry: string;
    labelRegion: string;
    labelAvatarUrl: string;
    labelAccountCreated: string;
    partnerRecordTitle: string;
    partnerRecordLead: string;
    labelStatus: string;
    labelPartnerSince: string;
    payoutTitle: string;
    payoutLead: string;
    payoutUnreadable: string;
    labelRecipientName: string;
    labelPayoutAsset: string;
    labelNetwork: string;
    labelUsdcAddress: string;
    usdcPlaceholder: string;
    labelNotes: string;
    savePayout: string;
    referralTitle: string;
    referralLead: string;
  };
  copyReferralLink: {
    label: string;
    copy: string;
    copied: string;
    copiedStatus: string;
    failedStatus: string;
    hint: string;
  };
  copyLine: {
    copy: string;
    copied: string;
  };
  copyText: {
    copy: string;
    copied: string;
  };
  partnerStatus: {
    partner: string;
    growth: string;
    regional: string;
    strategic: string;
    suspended: string;
  };
  defaultPartnerName: string;
};
