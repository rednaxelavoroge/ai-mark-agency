import type { CabinetCopy } from "../types";

export const cabinetDe: CabinetCopy = {
  "meta": {
    "platformTitle": "Partner Platform",
    "titleTemplate": "%s · Partner Platform"
  },
  "shell": {
    "navLabel": "Partner-Bereiche",
    "signOut": "Abmelden",
    "signedIn": "Angemeldet",
    "backToSite": "← ai-mark.agency",
    "ventureTagline": "Venture and Marketing",
    "themeLight": "Helles Theme",
    "themeDark": "Dunkles Theme",
    "backAriaLabel": "Zurück"
  },
  "nav": {
    "dashboard": "Dashboard",
    "customers": "Kunden",
    "sales": "Verkäufe",
    "network": "Netzwerk",
    "commissions": "Provisionen",
    "payouts": "Auszahlungen",
    "resources": "Ressourcen",
    "profile": "Profil"
  },
  "auth": {
    "ventureTagline": "Venture and Marketing",
    "login": {
      "metadataTitle": "Anmelden",
      "eyebrow": "Partner-Plattform",
      "title": "Anmelden",
      "lead": "Ihr AI-MARK-Partner-Dashboard: Empfehlungslink, Netzwerk, Kunden und Provisionen.",
      "footerBefore": "Noch kein Partner?",
      "footerLink": "Partnerprogramm ansehen"
    },
    "signup": {
      "metadataTitle": "Partnerkonto erstellen",
      "eyebrow": "Partner-Plattform",
      "title": "Partnerkonto erstellen",
      "lead": "Ein Konto gibt Ihnen Partner-ID, Empfehlungscode und das Partner-Dashboard.",
      "footerBefore": "Programmregeln werden im Onboarding vor dem Verkauf bestätigt. Lesen Sie die",
      "privacyLink": "Datenschutzhinweise",
      "footerAfter": "."
    },
    "setupNotice": {
      "title": "Anmeldung vorübergehend nicht verfügbar.",
      "body": "Schreiben Sie uns — wir helfen weiter. Die öffentliche Website bleibt erreichbar."
    },
    "callbackErrors": {
      "missing_code": "Dieser Anmeldelink ist unvollständig. Fordern Sie unten einen neuen an.",
      "exchange_failed": "Dieser Anmeldelink ist abgelaufen oder wurde bereits verwendet. Fordern Sie unten einen neuen an.",
      "provider_error": "Der Anmeldeanbieter hat die Anfrage nicht abgeschlossen.",
      "not_configured": "Anmeldung vorübergehend nicht verfügbar. Schreiben Sie uns — wir helfen weiter."
    },
    "signedOutNotice": "Sie wurden abgemeldet.",
    "genericSignInError": "Anmeldung konnte nicht abgeschlossen werden. Bitte erneut versuchen.",
    "form": {
      "email": "E-Mail",
      "password": "Passwort",
      "emailPlaceholder": "sie@firma.de",
      "passwordPlaceholder": "••••••••",
      "passwordNewPlaceholder": "Mindestens 8 Zeichen",
      "fullName": "Vollständiger Name",
      "fullNamePlaceholder": "Alex Morgan",
      "signIn": "Anmelden",
      "signInPending": "Anmeldung…",
      "signUp": "Anmelden",
      "signUpPending": "Anmeldung…",
      "createAccount": "Partnerkonto erstellen",
      "createAccountPending": "Konto wird erstellt…",
      "orDivider": "oder",
      "continueGoogle": "Mit Google fortfahren",
      "continueGooglePending": "Google wird geöffnet…",
      "magicLinkLabel": "Anmeldelink per E-Mail senden",
      "sendMagicLink": "Magic Link senden",
      "sendMagicLinkPending": "Wird gesendet…",
      "noAccountBefore": "Noch kein Konto?",
      "noAccountLink": "Partnerkonto erstellen",
      "hasAccountBefore": "Bereits ein Konto?",
      "hasAccountLink": "Anmelden"
    }
  },
  "pages": {
    "dashboard": {
      "metadataTitle": "Dashboard",
      "eyebrow": "Partner Platform"
    },
    "customers": {
      "metadataTitle": "Customers",
      "eyebrow": "Partner Platform",
      "title": "Customers",
      "lead": "People who submitted the contact form on the site while your referral link was still valid. Chat, Telegram, WhatsApp and email are not this list. A lead is not a sale and is not a commission."
    },
    "sales": {
      "metadataTitle": "Sales",
      "eyebrow": "Partner Platform",
      "title": "Sales",
      "lead": "Paid orders attributed to your referral code or partner id. Clicks and leads are not sales. Amounts are the amounts stored on the sale."
    },
    "network": {
      "metadataTitle": "Network",
      "eyebrow": "Partner Platform",
      "title": "Network",
      "lead": "Your sponsor, and how many partners signed up through your link. Names in the downline are not listed."
    },
    "commissions": {
      "metadataTitle": "Commissions",
      "eyebrow": "Partner Platform",
      "title": "Commissions",
      "lead": "Your commissions for each qualifying sale. Schedule: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, network pool 80%."
    },
    "payouts": {
      "metadataTitle": "Payouts",
      "eyebrow": "Partner Platform",
      "title": "Payouts",
      "lead": "Payouts recorded for you, and the USDC address saved on your profile. AI MARK sends the payout to that address."
    },
    "profile": {
      "metadataTitle": "Profile",
      "eyebrow": "Partner Platform",
      "title": "Profile",
      "lead": "Account and partner-record fields are read from your own row. Payout details are the only fields you can change here."
    },
    "resources": {
      "metadataTitle": "Resources",
      "eyebrow": "Partner Platform"
    },
    "noAccess": {
      "metadataTitle": "Partner access",
      "eyebrow": "Partner Platform",
      "title": "No partner access on this account",
      "lead": "Your account is signed in, but it has no partner record attached yet.",
      "footer": "Think this is wrong? Reply to any AI MARK email and we will link your partner record.",
      "signedInBefore": "Signed in as",
      "signedInAfter": "Partner records are issued by AI MARK; they are never created by the account owner."
    }
  },
  "dashboard": {
    "welcomeTitle": "Welcome, {name}",
    "welcomeLeadBefore": "Your Partner ID is",
    "welcomeLeadAfter": "Your referral link is live. Sales, commission, and payouts appear here as they are recorded.",
    "performanceTitle": "Performance",
    "performanceLead": "Qualifying sales and commission appear after a customer pays. A dash means that figure is not available yet.",
    "statQualifyingSales": "Qualifying sales",
    "statCommission": "Commission",
    "statReadyToPay": "Ready to pay",
    "statPaid": "Paid",
    "noCommissionsYet": "No commissions yet.",
    "currencyBreakdown": "{currency}: commission {commission}, payable {payable}, paid {paid}",
    "identityTitle": "Partner identity",
    "identityLead": "Issued by AI MARK. Partner ID, referral code and status are immutable from your account.",
    "labelPartnerId": "Partner ID",
    "labelPartnerStatus": "Partner status",
    "labelReferralCode": "Referral code",
    "labelCountry": "Country",
    "labelJoined": "Joined",
    "labelLanguage": "Language",
    "sponsorTitle": "Sponsor",
    "sponsorConfirmed": "Confirmed {date}.",
    "sponsorRecordedUnconfirmed": "Recorded, not yet confirmed by a qualifying sale.",
    "sponsorFromReferralLink": " Recorded from a referral link at signup.",
    "sponsorEmpty": "No sponsor recorded. Sponsor relationships are set by AI MARK from a referral link at signup, never by the partner, and are immutable once confirmed.",
    "historyTitle": "Status history",
    "historyLead": "Written by the database on every status change.",
    "historyEmpty": "No entries yet.",
    "hubTitle": "Demos, materials, knowledge, support",
    "hubLead": "Product pages, brand files, published prices, and support channels are on Resources.",
    "hubLinkDemos": "Demos and presentations",
    "hubLinkKnowledge": "Product knowledge",
    "hubLinkMaterials": "Brand files",
    "hubLinkSupport": "Support",
    "trackingFootnoteBefore": "How tracking works is on",
    "trackingFootnoteLink": "Resources",
    "trackingFootnoteAfter": ".",
    "launchActiveTitle": "Launch-period status",
    "launchEndedTitle": "Launch-period ended",
    "launchActiveBody": "The launch window runs until {date}. It lasts 90 days from when the partner account was created. Rates stay the same, and the network pool stays 80%.",
    "launchEndedBody": "The 90-day launch window ended {date}. Qualifying payments use the same rates, and the network pool stays 80%."
  },
  "referralPanel": {
    "title": "Referral program",
    "lead": "Visits through your link are recorded server-side and attribute a customer lead for 30 days. A partner who signs up through it is recorded as your referral. Sponsor relationships are set by AI MARK from the referral link only — never from your account, and never editable from the client.",
    "statClicks": "Referral clicks",
    "statLeads": "Attributed leads",
    "statSignups": "Partner signups",
    "footnote": "Clicks, leads, and partner signups. Commission and payouts are on the Commissions and Payouts pages."
  },
  "commissionSchedule": {
    "title": "Partner Commission Model",
    "lead": "50% for a direct sale. Up to 80% total partner rewards across the network. 80% is the aggregate pool across qualified L1–L5, not a single-partner payout. AI Mark retained share is 20% of the commissionable amount. Ledger totals above are stored values; this card does not recompute your earnings.",
    "levels": {
      "1": {
        "title": "Direct sale",
        "body": "The customer you personally introduce. This is 50% of the commissionable amount — not the whole 80% pool."
      },
      "2": {
        "title": "First network",
        "body": "Paid customer sales from your first-level partners."
      },
      "3": {
        "title": "Extended network",
        "body": "Paid sales one level deeper."
      },
      "4": {
        "title": "Market depth",
        "body": "The network beyond direct relationships."
      },
      "5": {
        "title": "Maximum depth",
        "body": "The deepest level of the standard schedule."
      }
    },
    "exampleHeading": "$1,000 commissionable sale · full network",
    "exampleRows": {
      "l1": "L1",
      "l2": "L2",
      "l3": "L3",
      "l4": "L4",
      "l5": "L5",
      "totalPool": "Total network pool",
      "retainedShare": "AI Mark retained share"
    },
    "exampleFootnote": "The direct partner receives $500, not $800. Total network pool 80%."
  },
  "dataTable": {
    "unreadable": "This list could not be read.",
    "customers": {
      "empty": "No attributed leads. A row appears when someone sends the contact form on the site while your referral cookie is still valid. An empty list is empty.",
      "columns": [
        "Name",
        "Company",
        "Email",
        "Scenario",
        "Page",
        "When"
      ]
    },
    "sales": {
      "empty": "No sales yet. A row appears after AI MARK records a payment the customer actually made. An empty list is empty — it is not a zero estimate of revenue.",
      "columns": [
        "Product",
        "Amount",
        "Status",
        "Paid",
        "Confirmed",
        "Locked",
        "Order"
      ]
    },
    "commissions": {
      "empty": "No commissions yet. An entry appears after a qualifying sale.",
      "columns": [
        "Status",
        "Type",
        "Level",
        "Amount",
        "Rate",
        "Base",
        "Posted"
      ]
    },
    "payouts": {
      "empty": "No payouts yet. AI MARK records a payout when commission is ready to pay.",
      "columns": [
        "Status",
        "Amount",
        "Created",
        "Confirmed",
        "Paid"
      ]
    }
  },
  "network": {
    "statClicks": "Referral clicks",
    "statLeads": "Attributed leads",
    "statRegistrations": "Partner registrations",
    "sponsorTitle": "Your sponsor",
    "labelSponsorPartnerId": "Sponsor Partner ID",
    "labelRecorded": "Recorded",
    "labelConfirmed": "Confirmed",
    "notConfirmed": "Not confirmed",
    "labelSource": "Source",
    "sponsorEmpty": "No sponsor recorded. A sponsor is set from a referral link at signup. You cannot assign one from this account.",
    "statusTitle": "Your status",
    "statusNone": "No partners have signed up through your link yet.",
    "statusUnreadable": "Partner registrations could not be read.",
    "statusCount": "{count} partner accounts were attributed to your link. The list of names is not shown."
  },
  "payouts": {
    "destinationTitle": "Where a payout is sent",
    "destinationLead": "The address you want payouts sent to.",
    "destinationUnreadable": "Payout details could not be read.",
    "editPayoutLink": "Edit payout details",
    "flowTitle": "How a payout moves",
    "flowSteps": [
      "1. A qualifying sale records your commission.",
      "2. That commission is held for 14 days after the sale is confirmed.",
      "3. After the hold, if the sale still stands, it is ready to pay.",
      "4. AI MARK records the payout and sends it to your USDC address.",
      "5. A refund or cancellation adjusts what is owed."
    ],
    "statReady": "Ready to pay",
    "statPaid": "Paid",
    "tableEmpty": "No payouts yet. AI MARK records a payout when commission is ready to pay."
  },
  "profile": {
    "savedNotice": "Payout details saved.",
    "accountTitle": "Account",
    "labelFullName": "Full name",
    "labelEmail": "Email",
    "labelPhone": "Phone",
    "labelLanguage": "Language",
    "labelCountry": "Country",
    "labelRegion": "Region",
    "labelAvatarUrl": "Avatar URL",
    "labelAccountCreated": "Account created",
    "partnerRecordTitle": "Partner record",
    "partnerRecordLead": "Platform-owned. These values cannot be changed from a partner session by design.",
    "labelStatus": "Status",
    "labelPartnerSince": "Partner since",
    "payoutTitle": "Payout details",
    "payoutLead": "Partner payouts are USDC. Default network is Solana. This form stores the destination on your profile. It does not send tokens.",
    "payoutUnreadable": "Payout details could not be read, so they cannot be saved from this page.",
    "labelRecipientName": "Recipient name",
    "labelPayoutAsset": "Payout asset",
    "labelNetwork": "Network",
    "labelUsdcAddress": "USDC address",
    "usdcPlaceholder": "Solana address",
    "labelNotes": "Notes (optional)",
    "savePayout": "Save payout details",
    "referralTitle": "Referral link",
    "referralLead": "Issued with the account. The partner record above stays read-only."
  },
  "copyReferralLink": {
    "label": "Your referral link",
    "copy": "Copy referral link",
    "copied": "Copied",
    "copiedStatus": "Referral link copied to your clipboard.",
    "failedStatus": "Copying was blocked — select the link and copy it manually.",
    "hint": "The link is live. Every visit is recorded and attributes a customer lead for 30 days; a partner who signs up through it is recorded as your referral. Add campaign parameters (for example ?utm_source=newsletter) to see where your clicks come from."
  },
  "copyLine": {
    "copy": "Copy",
    "copied": "Copied"
  },
  "copyText": {
    "copy": "Copy",
    "copied": "Copied"
  },
  "partnerStatus": {
    "partner": "Partner",
    "growth": "Growth",
    "regional": "Regional",
    "strategic": "Strategic",
    "suspended": "Suspended"
  },
  "defaultPartnerName": "Partner"
} as CabinetCopy;
