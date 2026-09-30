import type { CabinetCopy } from "../types";

export const cabinetPt: CabinetCopy = {
  "meta": {
    "platformTitle": "Partner Platform",
    "titleTemplate": "%s · Partner Platform"
  },
  "shell": {
    "navLabel": "Seções de parceiros",
    "signOut": "sair",
    "signedIn": "Conectado",
    "backToSite": "← ai-mark.agency",
    "ventureTagline": "Venture and Marketing",
    "themeLight": "Mudar para tema claro",
    "themeDark": "Mudar para tema escuro",
    "backAriaLabel": "Voltar"
  },
  "nav": {
    "dashboard": "Painel",
    "customers": "Clientes",
    "sales": "Vendas",
    "network": "Rede",
    "commissions": "Comissões",
    "payouts": "Pagamentos",
    "resources": "Recursos",
    "profile": "Perfil"
  },
  "auth": {
    "ventureTagline": "Venture and Marketing",
    "login": {
      "metadataTitle": "Entrar",
      "eyebrow": "Partner Platform",
      "title": "Entrar",
      "lead": "Seu painel de parceiro AI MARK: link de referência, rede, clientes e comissões.",
      "footerBefore": "Ainda não é parceiro?",
      "footerLink": "Veja o programa de parceria"
    },
    "signup": {
      "metadataTitle": "Crie uma conta de parceiro",
      "eyebrow": "Partner Platform",
      "title": "Crie uma conta de parceiro",
      "lead": "Uma conta fornece seu ID de parceiro, um código de referência e o painel do parceiro.",
      "footerBefore": "As regras do programa são confirmadas com você durante a integração, antes da venda. Leia o",
      "privacyLink": "aviso de privacidade",
      "footerAfter": ".",
      "agreementLink": "acordo de parceiro",
      "footerMiddle": "e o"
    },
    "setupNotice": {
      "title": "O login está temporariamente indisponível.",
      "body": "Escreva-nos e nós o ajudaremos. O site público permanece aberto."
    },
    "callbackErrors": {
      "missing_code": "Esse link de login está incompleto. Solicite um novo abaixo.",
      "exchange_failed": "Esse link de login expirou ou já foi usado. Solicite um novo abaixo.",
      "provider_error": "O provedor de login não concluiu a solicitação.",
      "not_configured": "O login está temporariamente indisponível. Escreva para nós e nós o ajudaremos."
    },
    "signedOutNotice": "Você foi desconectado.",
    "genericSignInError": "Não foi possível concluir esse login. Por favor, tente novamente.",
    "form": {
      "email": "E-mail",
      "password": "Senha",
      "emailPlaceholder": "you@company.com",
      "passwordPlaceholder": "••••••••",
      "passwordNewPlaceholder": "Pelo menos 8 caracteres",
      "fullName": "Nome completo",
      "fullNamePlaceholder": "Alex Morgan",
      "signIn": "Entrar",
      "signInPending": "Fazendo login…",
      "signUp": "Entrar",
      "signUpPending": "Fazendo login…",
      "createAccount": "Criar conta de parceiro",
      "createAccountPending": "Criando conta…",
      "orDivider": "or",
      "continueGoogle": "Continuar com o Google",
      "continueGooglePending": "Abrindo o Google…",
      "magicLinkLabel": "Envie-me um link de login por e-mail",
      "sendMagicLink": "Enviar link mágico",
      "sendMagicLinkPending": "Enviando…",
      "noAccountBefore": "Ainda não tem conta?",
      "noAccountLink": "Crie uma conta de parceiro",
      "hasAccountBefore": "Já tem uma conta?",
      "hasAccountLink": "Entrar",
      "acceptAgreementBefore": "Aceito o ",
      "acceptAgreementLink": "acordo de parceiro",
      "acceptAgreementAfter": "."
    }
  },
  "pages": {
    "dashboard": {
      "metadataTitle": "Painel",
      "eyebrow": "Partner Platform"
    },
    "customers": {
      "metadataTitle": "Clientes",
      "eyebrow": "Partner Platform",
      "title": "Clientes",
      "lead": "Pessoas que enviaram o formulário de contato do site enquanto seu link de indicação ainda era válido. Chat, Telegram, WhatsApp e e-mail não estão nesta lista. Um lead não é uma venda e não é uma comissão."
    },
    "sales": {
      "metadataTitle": "Vendas",
      "eyebrow": "Partner Platform",
      "title": "Vendas",
      "lead": "Pedidos pagos atribuídos ao seu código de referência ou ID de parceiro. Cliques e leads não são vendas. Valores são os valores armazenados na venda."
    },
    "network": {
      "metadataTitle": "Rede",
      "eyebrow": "Partner Platform",
      "title": "Rede",
      "lead": "Seu patrocinador e quantos parceiros se inscreveram através do seu link. Os nomes na linha descendente não estão listados."
    },
    "commissions": {
      "metadataTitle": "Comissões",
      "eyebrow": "Partner Platform",
      "title": "Comissões",
      "lead": "Suas comissões para cada venda qualificada. Cronograma: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, pool de rede 80%."
    },
    "payouts": {
      "metadataTitle": "Pagamentos",
      "eyebrow": "Partner Platform",
      "title": "Pagamentos",
      "lead": "Pagamentos registrados para você e o endereço USDC salvo em seu perfil. AI MARK envia o pagamento para esse endereço."
    },
    "profile": {
      "metadataTitle": "Perfil",
      "eyebrow": "Partner Platform",
      "title": "Perfil",
      "lead": "Os campos de conta e registro de parceiro são lidos em sua própria linha. Os detalhes de pagamento são os únicos campos que você pode alterar aqui."
    },
    "resources": {
      "metadataTitle": "Recursos",
      "eyebrow": "Partner Platform"
    },
    "noAccess": {
      "metadataTitle": "Acesso de parceiro",
      "eyebrow": "Partner Platform",
      "title": "Nenhum acesso de parceiro nesta conta",
      "lead": "Sua conta está conectada, mas ainda não possui registro de parceiro anexado.",
      "footer": "Acha que isso está errado? Responda a qualquer e-mail da AI MARK e vincularemos seu registro de parceiro.",
      "signedInBefore": "Conectado como",
      "signedInAfter": "Os registros de parceiros são emitidos pela AI MARK; eles nunca são criados pelo proprietário da conta."
    }
  },
  "dashboard": {
    "welcomeTitle": "Bem-vindo, {name}",
    "welcomeLeadBefore": "Seu ID de parceiro é",
    "welcomeLeadAfter": "Seu link de indicação está ativo. Vendas, comissões e pagamentos aparecem aqui à medida que são registrados.",
    "performanceTitle": "Desempenho",
    "performanceLead": "As vendas qualificadas e a comissão aparecem depois que o cliente paga. Um travessão significa que o valor ainda não está disponível.",
    "statQualifyingSales": "Vendas qualificadas",
    "statCommission": "Comissão",
    "statReadyToPay": "Pronto para pagar",
    "statPaid": "Pago",
    "noCommissionsYet": "Ainda não há comissões.",
    "currencyBreakdown": "{currency}: comissão {commission}, a pagar {payable}, pago {paid}",
    "identityTitle": "Identidade do parceiro",
    "identityLead": "Emitido por AI MARK. O ID do parceiro, o código de referência e o status são imutáveis ​​na sua conta.",
    "labelPartnerId": "ID do parceiro",
    "labelPartnerStatus": "Status de parceiro",
    "labelReferralCode": "Código de referência",
    "labelCountry": "País",
    "labelJoined": "Ingressou",
    "labelLanguage": "Linguagem",
    "sponsorTitle": "Patrocinador",
    "sponsorConfirmed": "Confirmado em {date}.",
    "sponsorRecordedUnconfirmed": "Gravado, ainda não confirmado por uma venda qualificada.",
    "sponsorFromReferralLink": "Gravado a partir de um link de referência na inscrição.",
    "sponsorEmpty": "Nenhum patrocinador registrado. Os relacionamentos com patrocinadores são definidos pela AI MARK a partir de um link de referência no momento da inscrição, nunca pelo parceiro, e são imutáveis ​​uma vez confirmados.",
    "historyTitle": "Histórico de status",
    "historyLead": "Escrito pelo banco de dados em cada mudança de status.",
    "historyEmpty": "Nenhuma entrada ainda.",
    "hubTitle": "Demonstrações, materiais, conhecimento, suporte",
    "hubLead": "Páginas de produtos, arquivos de marcas, preços publicados e canais de suporte estão em Recursos.",
    "hubLinkDemos": "Demonstrações e apresentações",
    "hubLinkKnowledge": "Conhecimento do produto",
    "hubLinkMaterials": "Arquivos de marca",
    "hubLinkSupport": "Apoiar",
    "trackingFootnoteBefore": "Como funciona o rastreamento está ativado",
    "trackingFootnoteLink": "Recursos",
    "trackingFootnoteAfter": ".",
    "launchActiveTitle": "Status do período de lançamento",
    "launchEndedTitle": "Período de lançamento encerrado",
    "launchActiveBody": "O período de lançamento vai até {date}: 90 dias a partir da criação da conta de parceiro. As taxas não mudam e o fundo da rede continua em 80%.",
    "launchEndedBody": "O período de lançamento de 90 dias terminou em {date}. Pagamentos elegíveis usam as mesmas taxas e o fundo da rede continua em 80%."
  },
  "referralPanel": {
    "title": "Programa de referência",
    "lead": "As visitas através do seu link são registradas no servidor e atribuem um lead de cliente por 30 dias. Um parceiro que se inscreve por meio dele é registrado como sua indicação. Os relacionamentos com patrocinadores são definidos pela AI MARK apenas a partir do link de indicação – nunca da sua conta e nunca editáveis ​​do cliente.",
    "statClicks": "Cliques de referência",
    "statLeads": "Leads atribuídos",
    "statSignups": "Inscrições de parceiros",
    "footnote": "Cliques, leads e inscrições de parceiros. Comissões e pagamentos estão nas páginas Comissões e Pagamentos."
  },
  "commissionSchedule": {
    "title": "Modelo de comissão de parceiro",
    "lead": "50% para venda direta. Até 80% do total de recompensas para parceiros em toda a rede. 80% é o pool agregado entre níveis qualificados de 1 a 5, e não um pagamento de parceiro único. A participação retida da AI Mark é de 20% do valor comissionável. Os totais contábeis acima são valores armazenados; este cartão não recalcula seus ganhos.",
    "levels": {
      "1": {
        "title": "Venda direta",
        "body": "O cliente que você apresenta pessoalmente. Isso representa 50% do valor comissionável – e não todo o conjunto de 80%."
      },
      "2": {
        "title": "Primeira rede",
        "body": "Vendas pagas ao cliente de seus parceiros de primeiro nível."
      },
      "3": {
        "title": "Rede estendida",
        "body": "Vendas pagas um nível mais profundo."
      },
      "4": {
        "title": "Profundidade do mercado",
        "body": "A rede além das relações diretas."
      },
      "5": {
        "title": "Profundidade máxima",
        "body": "O nível mais profundo da programação padrão."
      }
    },
    "exampleHeading": "Venda comissionável de US$ 1.000 · rede completa",
    "exampleRows": {
      "l1": "L1",
      "l2": "L2",
      "l3": "L3",
      "l4": "L4",
      "l5": "L5",
      "totalPool": "Conjunto total de redes",
      "retainedShare": "AI Mark manteve participação"
    },
    "exampleFootnote": "O parceiro direto recebe US$ 500, não US$ 800. Pool total de rede 80%."
  },
  "dataTable": {
    "unreadable": "Esta lista não pôde ser lida.",
    "customers": {
      "empty": "Nenhum lead atribuído. Uma linha aparece quando alguém envia o formulário de contato no site enquanto seu cookie de referência ainda é válido. Uma lista vazia está vazia.",
      "columns": [
        "Nome",
        "Empresa",
        "E-mail",
        "Cenário",
        "Página",
        "Quando"
      ]
    },
    "sales": {
      "empty": "Nenhuma venda ainda. Uma linha aparece depois que AI MARK registra um pagamento que o cliente realmente fez. Uma lista vazia é vazia – não é uma estimativa zero de receita.",
      "columns": [
        "Produto",
        "Quantia",
        "Status",
        "Pago",
        "Confirmado",
        "Bloqueado",
        "Ordem"
      ]
    },
    "commissions": {
      "empty": "Ainda não há comissões. Uma entrada aparece após uma venda qualificada.",
      "columns": [
        "Status",
        "Tipo",
        "Nível",
        "Quantia",
        "Avaliar",
        "Base de cálculo",
        "Postado"
      ]
    },
    "payouts": {
      "empty": "Ainda não há pagamentos. AI MARK registra um pagamento quando a comissão está pronta para ser paga.",
      "columns": [
        "Status",
        "Quantia",
        "Criado",
        "Confirmado",
        "Pago"
      ]
    }
  },
  "network": {
    "statClicks": "Cliques de referência",
    "statLeads": "Leads atribuídos",
    "statRegistrations": "Cadastros de parceiros",
    "sponsorTitle": "Seu patrocinador",
    "labelSponsorPartnerId": "ID do parceiro patrocinador",
    "labelRecorded": "Gravado",
    "labelConfirmed": "Confirmado",
    "notConfirmed": "Não confirmado",
    "labelSource": "Fonte",
    "sponsorEmpty": "Nenhum patrocinador registrado. Um patrocinador é definido a partir de um link de referência no momento da inscrição. Você não pode atribuir um desta conta.",
    "statusTitle": "Seu status",
    "statusNone": "Nenhum parceiro se inscreveu através do seu link ainda.",
    "statusUnreadable": "Não foi possível ler os registros de parceiros.",
    "statusCount": "{count} contas de parceiro foram atribuídas ao seu link. A lista de nomes não é exibida."
  },
  "payouts": {
    "destinationTitle": "Para onde um pagamento é enviado",
    "destinationLead": "O endereço para o qual você deseja que os pagamentos sejam enviados.",
    "destinationUnreadable": "Não foi possível ler os detalhes do pagamento.",
    "editPayoutLink": "Editar detalhes de pagamento",
    "flowTitle": "Como um pagamento se move",
    "flowSteps": [
      "1. Uma venda qualificada registra sua comissão.",
      "2. Essa comissão é retida por 14 dias após a confirmação da venda.",
      "3. Após a espera, se a venda ainda for válida, ela estará pronta para pagar.",
      "4. AI MARK registra o pagamento e o envia para seu endereço USDC.",
      "5. Um reembolso ou cancelamento ajusta o que é devido."
    ],
    "statReady": "Pronto para pagar",
    "statPaid": "Pago",
    "tableEmpty": "Ainda não há pagamentos. AI MARK registra um pagamento quando a comissão está pronta para ser paga.",
    "request": {
      "sectionTitle": "Solicitar pagamento",
      "minimumNote": "Saldo mínimo pagável: USD {min}.00",
      "availableLabel": "Disponível para pagar",
      "requestButton": "Solicitar pagamento",
      "requestedNotice": "Pedido de pagamento enviado.",
      "openBlocked": "Já existe um pedido de pagamento aberto.",
      "destBlocked": "Salve os dados de pagamento no perfil antes de solicitar.",
      "belowMinimum": "O saldo está abaixo do limite mínimo."
    }
  },
  "profile": {
    "savedNotice": "Detalhes de pagamento salvos.",
    "accountTitle": "Conta",
    "labelFullName": "Nome completo",
    "labelEmail": "E-mail",
    "labelPhone": "Telefone",
    "labelLanguage": "Linguagem",
    "labelCountry": "País",
    "labelRegion": "Região",
    "labelAvatarUrl": "URL do avatar",
    "labelAccountCreated": "Conta criada",
    "partnerRecordTitle": "Registro de parceiro",
    "partnerRecordLead": "Propriedade da plataforma. Esses valores não podem ser alterados em uma sessão de parceiro por design.",
    "labelStatus": "Status",
    "labelPartnerSince": "Parceiro desde",
    "payoutTitle": "Detalhes de pagamento",
    "payoutLead": "Os pagamentos dos parceiros são USDC. A rede padrão é Solana. Este formulário armazena o destino em seu perfil. Não envia tokens.",
    "payoutUnreadable": "Os detalhes do pagamento não puderam ser lidos, portanto não podem ser salvos nesta página.",
    "labelRecipientName": "Nome do destinatário",
    "labelPayoutAsset": "Ativo de pagamento",
    "labelNetwork": "Rede",
    "labelUsdcAddress": "Endereço USDC",
    "usdcPlaceholder": "Endereço Solana",
    "labelNotes": "Notas (opcional)",
    "savePayout": "Salvar detalhes de pagamento",
    "referralTitle": "Link de referência",
    "referralLead": "Emitido com a conta. O registro do parceiro acima permanece somente leitura."
  },
  "copyReferralLink": {
    "label": "Seu link de indicação",
    "copy": "Copiar link de referência",
    "copied": "Copiado",
    "copiedStatus": "Link de referência copiado para sua área de transferência.",
    "failedStatus": "A cópia foi bloqueada — selecione o link e copie-o manualmente.",
    "hint": "O link está ativo. Cada visita é registrada e atribui um lead de cliente por 30 dias; um parceiro que se inscreve por meio dele é registrado como sua indicação. Adicione parâmetros de campanha (por exemplo?utm_source=newsletter) para ver de onde vêm seus cliques."
  },
  "copyLine": {
    "copy": "Cópia",
    "copied": "Copiado"
  },
  "copyText": {
    "copy": "Cópia",
    "copied": "Copiado"
  },
  "partnerStatus": {
    "partner": "Parceiro",
    "growth": "Crescimento",
    "regional": "Regional",
    "strategic": "Estratégico",
    "suspended": "Suspenso"
  },
  "defaultPartnerName": "Parceiro"
} as CabinetCopy;
