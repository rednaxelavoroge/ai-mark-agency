import type { Locale } from "@/lib/site";

/**
 * Published Partner Program terms. These are the approved contract rates,
 * shown as a schedule — not as a partner's earnings. Earnings are read from
 * the ledger and are never computed in the browser.
 *
 * Numbers come from Partner Commission Model v2
 * (`lib/partner/commission-model.ts`). 80% is the aggregate network pool.
 */
export type PartnerProgramTerms = {
  note: string;
  launch: string;
  example: string;
  country: string;
  lock: string;
  payout: string;
  join: string;
  signup: string;
  recurringQ: string;
  recurringA: string;
};

export const partnerProgramTerms: Record<Locale, PartnerProgramTerms> = {
  en: {
    note: "Rates on a qualifying sale — a sale the customer has actually paid — are L1 50%, L2 15%, L3 7%, L4 5% and L5 3%. Together that is an 80% aggregate partner pool across the network of qualified levels, not a payout to one partner. AI Mark retained share is 20% of the commissionable amount.",
    launch:
      "The first 90 days after a partner joins are a launch period. It is not a calendar quarter and it is not lifetime. It does not change commission rates. Qualifying payments inside and after that window use the same rates: L1 50%, L2 15%, L3 7%, L4 5% and L5 3% (80% aggregate pool).",
    example:
      "On a $1,000 commissionable sale with a full five-level network: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner pool $800. AI Mark retained share $200. The direct (L1) partner receives $500, not $800 — 80% is the total across the network. Commission is calculated on the amount collected. Cost, salaries, AI, API and infrastructure are not deducted. VAT, sales tax, refunds and chargebacks are excluded.",
    country:
      "Country Partner and Strategic Partner are a separate agreement. They are not paid from this affiliate schedule.",
    lock: "Commission is held for 14 days after the sale is confirmed, then it is ready to pay if the sale still stands.",
    payout:
      "AI MARK records and pays commission. A refund or cancellation is recorded separately and adjusts what is owed.",
    join: "Create a partner account. Your Partner ID and referral link are on the dashboard as soon as you sign in.",
    signup: "Create a partner account",
    recurringQ: "Can subscriptions create recurring commissions?",
    recurringA:
      "Each qualifying payment, including a renewal, uses the same schedule: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, with an 80% aggregate pool across qualified levels. The first 90 days do not change those rates.",
  },
  ru: {
    note: "Ставки на квалифицированную продажу — ту, которую клиент фактически оплатил: L1 50%, L2 15%, L3 7%, L4 5% и L5 3%. Вместе это совокупный партнёрский пул 80% по сети квалифицированных уровней, а не выплата одному партнёру. Доля AI Mark — 20% от комиссионной базы.",
    launch:
      "Первые 90 дней после подключения — период запуска. Это не календарный квартал и не пожизненная ставка. Квалифицированные платежи внутри этого срока и после него считаются по одним и тем же ставкам: L1 50%, L2 15%, L3 7%, L4 5% и L5 3% (совокупный пул 80%).",
    example:
      "С комиссионной продажи на $1000 при полной сети из пяти уровней: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Партнёрский пул $800. Доля AI Mark $200. Прямой партнёр (L1) получает $500, не $800 — 80% это итог по сети. Комиссия считается от полученной суммы. Себестоимость, зарплаты, AI, API и инфраструктура не вычитаются. НДС, sales tax, возвраты и chargeback исключаются.",
    country:
      "Country Partner и Strategic Partner — отдельное соглашение. Они не оплачиваются по этой партнёрской сетке.",
    lock: "Комиссия удерживается 14 дней после подтверждения продажи, затем готова к выплате, если продажа в силе.",
    payout:
      "AI MARK записывает и выплачивает комиссию. Возврат или отмена учитываются отдельно и меняют сумму к выплате.",
    join: "Создайте аккаунт партнёра. Partner ID и referral-ссылка появляются в кабинете сразу после входа.",
    signup: "Создать аккаунт партнёра",
    recurringQ: "Могут ли подписки давать повторяющуюся комиссию?",
    recurringA:
      "Каждый квалифицированный платёж, включая продление, идёт по той же сетке: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, с совокупным пулом 80% по квалифицированным уровням. Первые 90 дней ставки не меняют.",
  },
  es: {
    note: "Las tasas de una venta cualificada — una venta que el cliente ya pagó — son L1 50%, L2 15%, L3 7%, L4 5% y L5 3%. En conjunto, un pool agregado del 80% a través de la red de niveles cualificados, no un pago a un solo partner. La parte retenida de AI Mark es el 20% del importe comisionable.",
    launch:
      "Los primeros 90 días tras el alta son un periodo de lanzamiento. No es un trimestre de calendario ni es de por vida. No cambia las tasas. Los pagos cualificados dentro y después de ese plazo usan las mismas tasas: L1 50%, L2 15%, L3 7%, L4 5% y L5 3% (pool agregado 80%).",
    example:
      "En una venta comisionable de $1000 con una red completa de cinco niveles: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool de partners $800. Parte retenida de AI Mark $200. El partner directo (L1) recibe $500, no $800: el 80% es el total de la red. La comisión se calcula sobre el importe cobrado. No se descuentan coste, salarios, AI, API ni infraestructura. Quedan fuera el IVA, el sales tax, los reembolsos y los chargebacks.",
    country:
      "Country Partner y Strategic Partner son un acuerdo aparte. No se pagan con esta tabla de afiliación.",
    lock: "La comisión se retiene 14 días después de confirmar la venta y luego está lista para pagarse si la venta sigue en pie.",
    payout:
      "AI MARK registra y paga la comisión. Un reembolso o una cancelación se anota aparte y ajusta lo que se debe.",
    join: "Crea una cuenta de partner. Tu Partner ID y el enlace de referido están en el panel en cuanto inicias sesión.",
    signup: "Crear cuenta de partner",
    recurringQ: "¿Las suscripciones generan comisión recurrente?",
    recurringA:
      "Cada pago cualificado, incluida la renovación, usa la misma tabla: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, con un pool agregado del 80% en los niveles cualificados. Los primeros 90 días no cambian esas tasas.",
  },
  pt: {
    note: "As taxas de uma venda qualificada — uma venda que o cliente de facto pagou — são L1 50%, L2 15%, L3 7%, L4 5% e L5 3%. No conjunto, um pool agregado de 80% na rede de níveis qualificados, não um pagamento a um único parceiro. A parte retida da AI Mark é 20% do valor comissionável.",
    launch:
      "Os primeiros 90 dias após a entrada são um período de lançamento. Não é um trimestre de calendário e não é vitalício. Não altera as taxas. Os pagamentos qualificados dentro e depois desse prazo usam as mesmas taxas: L1 50%, L2 15%, L3 7%, L4 5% e L5 3% (pool agregado 80%).",
    example:
      "Numa venda comissionável de $1000 com uma rede completa de cinco níveis: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool de parceiros $800. Parte retida da AI Mark $200. O parceiro direto (L1) recebe $500, não $800 — 80% é o total da rede. A comissão incide sobre o valor recebido. Custo, salários, AI, API e infraestrutura não são deduzidos. IVA, sales tax, reembolsos e chargebacks ficam de fora.",
    country:
      "Country Partner e Strategic Partner são um acordo à parte. Não são pagos por esta tabela de afiliados.",
    lock: "A comissão fica retida 14 dias após a confirmação da venda e depois fica pronta a pagar se a venda se mantiver.",
    payout:
      "A AI MARK regista e paga a comissão. Um reembolso ou um cancelamento fica registado à parte e ajusta o valor em dívida.",
    join: "Crie uma conta de parceiro. O Partner ID e a ligação de referência ficam no painel assim que entrar.",
    signup: "Criar conta de parceiro",
    recurringQ: "As subscrições geram comissão recorrente?",
    recurringA:
      "Cada pagamento qualificado, incluindo a renovação, usa a mesma tabela: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, com um pool agregado de 80% nos níveis qualificados. Os primeiros 90 dias não alteram essas taxas.",
  },
  ar: {
    note: "النسب على البيع المؤهل — وهو بيع دفعه العميل فعلًا — هي L1 50% وL2 15% وL3 7% وL4 5% وL5 3%. المجموع مجمع شركاء 80% عبر شبكة المستويات المؤهلة، وليس دفعة لشريك واحد. حصة AI Mark المحتجزة 20% من المبلغ الخاضع للعمولة.",
    launch:
      "أول 90 يومًا بعد الانضمام فترة إطلاق. ليست ربعًا تقويميًا وليست مدى الحياة، ولا تغيّر النسب. المدفوعات المؤهلة داخل هذه المدة وبعدها تستخدم النسب نفسها: L1 50% وL2 15% وL3 7% وL4 5% وL5 3% (مجمع 80%).",
    example:
      "في بيع خاضع للعمولة بقيمة $1000 مع شبكة كاملة من خمسة مستويات: L1 $500 وL2 $150 وL3 $70 وL4 $50 وL5 $30. مجمع الشركاء $800. حصة AI Mark المحتجزة $200. الشريك المباشر (L1) يحصل على $500 لا $800 — و80% هو الإجمالي عبر الشبكة. تُحسب العمولة من المبلغ المحصّل. لا تُخصم التكلفة ولا الرواتب ولا AI ولا API ولا البنية التحتية. ضريبة القيمة المضافة وضريبة المبيعات والمبالغ المستردة وعمليات الاسترداد القسري مستبعدة.",
    country:
      "Country Partner وStrategic Partner اتفاق منفصل. لا يُدفعان من جدول العمولة هذا.",
    lock: "تُحجز العمولة 14 يومًا بعد تأكيد البيع، ثم تصبح جاهزة للدفع إذا بقي البيع قائمًا.",
    payout:
      "تسجّل AI MARK العمولة وتدفعها. يُسجَّل الاسترداد أو الإلغاء على حدة ويعدّل المبلغ المستحق.",
    join: "أنشئ حساب شريك. يظهر معرّف الشريك ورابط الإحالة في اللوحة فور تسجيل الدخول.",
    signup: "إنشاء حساب شريك",
    recurringQ: "هل يمكن أن تولّد الاشتراكات عمولة متكررة؟",
    recurringA:
      "كل دفعة مؤهلة، بما فيها التجديد، تستخدم الجدول نفسه: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%، بمجمع 80% عبر المستويات المؤهلة. أول 90 يومًا لا تغيّر هذه النسب.",
  },
  zh: {
    note: "合格销售（客户已经实际支付的销售）的比例为 L1 50%、L2 15%、L3 7%、L4 5%、L5 3%。合计为合格层级网络的 80% 汇总伙伴池，不是付给单一伙伴。AI Mark 留存份额为可计佣金额的 20%。",
    launch:
      "加入后的前 90 天是启动期。这不是自然季度，也不是终身比例，也不改变费率。这段时间之内和之后的合格付款都使用同一套比例：L1 50%、L2 15%、L3 7%、L4 5%、L5 3%（汇总池 80%）。",
    example:
      "一笔可计佣 $1000 销售、完整五级网络：L1 $500、L2 $150、L3 $70、L4 $50、L5 $30。伙伴池 $800。AI Mark 留存份额 $200。直接（L1）合伙人得到 $500，不是 $800 — 80% 是全网合计。佣金按实收金额计算。成本、工资、AI、API 和基础设施不从中扣除。增值税、销售税、退款和拒付除外。",
    country:
      "Country Partner 与 Strategic Partner 是另行约定的合作，不走这张联盟佣金表。",
    lock: "佣金在销售确认后保留 14 天，若销售仍然有效，随后即可支付。",
    payout:
      "AI MARK 记录并支付佣金。退款或取消另行记录，并调整应付金额。",
    join: "创建合伙人账户。登录后，看板里立即有 Partner ID 和推荐链接。",
    signup: "创建合伙人账户",
    recurringQ: "订阅会产生持续佣金吗？",
    recurringA:
      "每一笔合格付款，包括续费，都使用同一套比例：L1 50% / L2 15% / L3 7% / L4 5% / L5 3%，合格层级汇总池为 80%。前 90 天不改变这些比例。",
  },
  id: {
    note: "Tarif penjualan yang lolos kualifikasi — penjualan yang benar-benar dibayar pelanggan — adalah L1 50%, L2 15%, L3 7%, L4 5%, dan L5 3%. Jumlahnya pool mitra agregat 80% di seluruh jaringan tingkat yang memenuhi syarat, bukan pembayaran ke satu mitra. Bagian yang ditahan AI Mark adalah 20% dari jumlah yang dapat dikomisi.",
    launch:
      "90 hari pertama setelah bergabung adalah masa peluncuran. Ini bukan kuartal kalender dan bukan seumur hidup, dan tidak mengubah tarif. Pembayaran yang lolos kualifikasi di dalam dan setelah masa itu memakai tarif yang sama: L1 50%, L2 15%, L3 7%, L4 5%, dan L5 3% (pool agregat 80%).",
    example:
      "Pada penjualan yang dapat dikomisi sebesar $1000 dengan jaringan lima tingkat penuh: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool mitra $800. Bagian yang ditahan AI Mark $200. Partner langsung (L1) menerima $500, bukan $800 — 80% adalah total di seluruh jaringan. Komisi dihitung dari jumlah yang diterima. Modal, gaji, AI, API, dan infrastruktur tidak dipotong. PPN, sales tax, refund, dan chargeback tidak masuk.",
    country:
      "Country Partner dan Strategic Partner adalah perjanjian terpisah. Keduanya tidak dibayar dari tabel afiliasi ini.",
    lock: "Komisi ditahan 14 hari setelah penjualan dikonfirmasi, lalu siap dibayar jika penjualan masih berlaku.",
    payout:
      "AI MARK mencatat dan membayar komisi. Refund atau pembatalan dicatat terpisah dan menyesuaikan jumlah yang harus dibayar.",
    join: "Buat akun partner. Partner ID dan tautan referral ada di dasbor begitu Anda masuk.",
    signup: "Buat akun partner",
    recurringQ: "Apakah langganan menghasilkan komisi berulang?",
    recurringA:
      "Setiap pembayaran yang lolos kualifikasi, termasuk perpanjangan, memakai tabel yang sama: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, dengan pool agregat 80% di tingkat yang memenuhi syarat. 90 hari pertama tidak mengubah tarif itu.",
  },
  vi: {
    note: "Tỷ lệ trên giao dịch đủ điều kiện — giao dịch khách đã thanh toán — là L1 50%, L2 15%, L3 7%, L4 5% và L5 3%. Cộng lại là quỹ đối tác tổng hợp 80% trên mạng các cấp đủ điều kiện, không phải khoản trả cho một đối tác. Phần AI Mark giữ lại là 20% số tiền được tính hoa hồng.",
    launch:
      "90 ngày đầu sau khi tham gia là giai đoạn ra mắt. Đây không phải quý lịch và không phải trọn đời, và không đổi tỷ lệ. Các khoản thanh toán đủ điều kiện trong và sau giai đoạn đó dùng cùng tỷ lệ: L1 50%, L2 15%, L3 7%, L4 5% và L5 3% (quỹ tổng hợp 80%).",
    example:
      "Với giao dịch được tính hoa hồng $1000 và mạng đủ năm cấp: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Quỹ đối tác $800. Phần AI Mark giữ lại $200. Đối tác trực tiếp (L1) nhận $500, không phải $800 — 80% là tổng trên toàn mạng. Hoa hồng tính trên số tiền đã thu. Giá vốn, lương, AI, API và hạ tầng không bị trừ. VAT, sales tax, hoàn tiền và chargeback nằm ngoài.",
    country:
      "Country Partner và Strategic Partner là thỏa thuận riêng. Hai hình thức này không được trả theo bảng hoa hồng liên kết này.",
    lock: "Hoa hồng được giữ 14 ngày sau khi giao dịch được xác nhận, rồi sẵn sàng chi trả nếu giao dịch vẫn còn hiệu lực.",
    payout:
      "AI MARK ghi nhận và chi trả hoa hồng. Hoàn tiền hoặc hủy được ghi riêng và điều chỉnh số phải trả.",
    join: "Tạo tài khoản đối tác. Partner ID và liên kết giới thiệu có trên bảng điều khiển ngay khi bạn đăng nhập.",
    signup: "Tạo tài khoản đối tác",
    recurringQ: "Gói đăng ký có tạo hoa hồng định kỳ không?",
    recurringA:
      "Mỗi khoản thanh toán đủ điều kiện, kể cả gia hạn, dùng cùng bảng: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, với quỹ tổng hợp 80% trên các cấp đủ điều kiện. 90 ngày đầu không đổi các tỷ lệ này.",
  },
  de: {
    note: "Sätze auf einen qualifizierten Verkauf — einen Verkauf, den der Kunde tatsächlich bezahlt hat: L1 50%, L2 15%, L3 7%, L4 5% und L5 3%. Zusammen ein aggregierter Partner-Pool von 80% über das Netzwerk der qualifizierten Ebenen, keine Auszahlung an einen einzelnen Partner. Der einbehaltene Anteil von AI Mark beträgt 20% des provisionsfähigen Betrags.",
    launch:
      "Die ersten 90 Tage nach dem Start sind eine Einführungsphase. Sie ist kein Kalenderquartal und nicht lebenslang und ändert die Sätze nicht. Qualifizierte Zahlungen in dieser Zeit und danach nutzen dieselben Sätze: L1 50%, L2 15%, L3 7%, L4 5% und L5 3% (aggregierter Pool 80%).",
    example:
      "Bei einem provisionsfähigen Verkauf über $1000 mit vollständigem Fünf-Ebenen-Netzwerk: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner-Pool $800. Einbehaltener Anteil von AI Mark $200. Der direkte Partner (L1) erhält $500, nicht $800 — 80% ist die Summe über das Netzwerk. Die Provision wird auf den eingegangenen Betrag gerechnet. Kosten, Gehälter, AI, API und Infrastruktur werden nicht abgezogen. MwSt., Sales Tax, Erstattungen und Chargebacks sind ausgenommen.",
    country:
      "Country Partner und Strategic Partner sind eine eigene Vereinbarung. Sie werden nicht nach diesem Affiliate-Plan vergütet.",
    lock: "Die Provision wird 14 Tage nach der Bestätigung des Verkaufs einbehalten und ist danach auszahlbar, wenn der Verkauf bestehen bleibt.",
    payout:
      "AI MARK erfasst und zahlt die Provision. Eine Erstattung oder Stornierung wird getrennt erfasst und passt den geschuldeten Betrag an.",
    join: "Legen Sie ein Partnerkonto an. Partner-ID und Empfehlungslink stehen im Dashboard, sobald Sie sich anmelden.",
    signup: "Partnerkonto erstellen",
    recurringQ: "Können Abos wiederkehrende Provision erzeugen?",
    recurringA:
      "Jede qualifizierte Zahlung, auch eine Verlängerung, nutzt dieselbe Tabelle: L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, mit einem aggregierten Pool von 80% über die qualifizierten Ebenen. Die ersten 90 Tage ändern diese Sätze nicht.",
  },
  fr: {
    note: "Les taux sur une vente qualifiée — une vente que le client a réellement payée — sont L1 50%, L2 15%, L3 7%, L4 5% et L5 3%. Ensemble, un pool partenaire agrégé de 80% à travers le réseau des niveaux qualifiés, pas un versement à un seul partenaire. La part retenue d'AI Mark est 20% du montant commissionnable.",
    launch:
      "Les 90 premiers jours après l'entrée sont une période de lancement. Ce n'est pas un trimestre calendaire, ce n'est pas à vie, et cela ne change pas les taux. Les paiements qualifiés pendant cette période et après utilisent les mêmes taux : L1 50%, L2 15%, L3 7%, L4 5% et L5 3% (pool agrégé 80%).",
    example:
      "Sur une vente commissionnable de 1 000 $ avec un réseau complet à cinq niveaux : L1 500 $, L2 150 $, L3 70 $, L4 50 $, L5 30 $. Pool partenaires 800 $. Part retenue d'AI Mark 200 $. Le partenaire direct (L1) reçoit 500 $, pas 800 $ — 80% est le total du réseau. La commission se calcule sur le montant encaissé. Coût, salaires, IA, API et infrastructure ne sont pas déduits. TVA, sales tax, remboursements et chargebacks sont exclus.",
    country:
      "Country Partner et Strategic Partner relèvent d'un accord distinct. Ils ne sont pas rémunérés selon cette grille d'affiliation.",
    lock: "La commission est retenue 14 jours après la confirmation de la vente, puis elle est prête à être versée si la vente tient toujours.",
    payout:
      "AI MARK enregistre et verse la commission. Un remboursement ou une annulation est noté à part et ajuste le montant dû.",
    join: "Créez un compte partenaire. Votre Partner ID et votre lien de parrainage sont dans le tableau de bord dès la connexion.",
    signup: "Créer un compte partenaire",
    recurringQ: "Les abonnements peuvent-ils créer une commission récurrente ?",
    recurringA:
      "Chaque paiement qualifié, y compris un renouvellement, utilise la même grille : L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, avec un pool agrégé de 80% sur les niveaux qualifiés. Les 90 premiers jours ne changent pas ces taux.",
  },
  ja: {
    note: "適格セール（顧客が実際に支払った販売）の率は L1 50%、L2 15%、L3 7%、L4 5%、L5 3% です。合計は適格レベルのネットワーク全体の 80% の合算パートナープールであり、一人のパートナーへの支払いではありません。AI Mark の留保分はコミッション対象額の 20% です。",
    launch:
      "参加から 90 日間は開始期間です。暦の四半期でも生涯レートでもなく、率は変わりません。この期間の内外の適格な支払いは同じ率です。L1 50% / L2 15% / L3 7% / L4 5% / L5 3%（合算プール 80%）。",
    example:
      "コミッション対象 $1000 の販売で五階層が揃う場合: L1 $500、L2 $150、L3 $70、L4 $50、L5 $30。パートナープール $800。AI Mark の留保分 $200。直接（L1）パートナーが受け取るのは $500 であり $800 ではありません。80% はネットワーク全体の合計です。報酬は入金額に対するものです。原価、人件費、AI、API、インフラは引きません。VAT、売上税、返金、チャージバックは対象外です。",
    country:
      "Country Partner と Strategic Partner は別契約です。このアフィリエイト表からは支払われません。",
    lock: "報酬は販売確定後 14 日間保留され、その販売が有効ならその後支払われます。",
    payout:
      "AI MARK は報酬を記録して支払います。返金や取消は別に記録され、支払額を調整します。",
    join: "パートナーアカウントを作成してください。ログインすると、ダッシュボードに Partner ID と紹介リンクがあります。",
    signup: "パートナーアカウントを作成",
    recurringQ: "サブスクリプションは継続報酬になりますか？",
    recurringA:
      "更新を含む適格な支払いは同じ表です。L1 50% / L2 15% / L3 7% / L4 5% / L5 3%、適格レベル全体の合算プールは 80% です。最初の 90 日は率を変えません。",
  },
  tr: {
    note: "Nitelikli satışta — müşterinin gerçekten ödediği satışta — oranlar L1 %50, L2 %15, L3 %7, L4 %5 ve L5 %3'tür. Toplam, nitelikli seviyeler ağındaki %80 toplu partner havuzudur; tek bir partnere ödeme değildir. AI Mark'ın alıkoyduğu pay, komisyona konu tutarın %20'sidir.",
    launch:
      "Katıldıktan sonraki ilk 90 gün bir başlangıç dönemidir. Takvim çeyreği değildir, ömür boyu değildir ve oranları değiştirmez. Bu süre içinde ve sonrasında nitelikli ödemeler aynı oranları kullanır: L1 %50, L2 %15, L3 %7, L4 %5 ve L5 %3 (toplu havuz %80).",
    example:
      "Komisyona konu $1000'lık bir satışta tam beş seviyeli ağ: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner havuzu $800. AI Mark'ın alıkoyduğu pay $200. Doğrudan (L1) partner $500 alır, $800 değil — %80 ağın toplamıdır. Komisyon tahsil edilen tutar üzerinden hesaplanır. Maliyet, maaşlar, AI, API ve altyapı düşülmez. KDV, sales tax, iadeler ve chargeback kapsam dışıdır.",
    country:
      "Country Partner ve Strategic Partner ayrı bir anlaşmadır. Bu iş ortağı tablosundan ödenmez.",
    lock: "Komisyon, satış onayından sonra 14 gün tutulur; satış geçerliyse ardından ödemeye hazırdır.",
    payout:
      "AI MARK komisyonu kaydeder ve öder. İade veya iptal ayrı kaydedilir ve ödenecek tutarı günceller.",
    join: "Bir partner hesabı oluşturun. Giriş yaptığınızda Partner ID ve referral bağlantısı panelde hazırdır.",
    signup: "Partner hesabı oluştur",
    recurringQ: "Abonelikler yinelenen komisyon oluşturur mu?",
    recurringA:
      "Yenileme dahil her nitelikli ödeme aynı tabloyu kullanır: L1 %50 / L2 %15 / L3 %7 / L4 %5 / L5 %3, nitelikli seviyelerde %80 toplu havuz. İlk 90 gün bu oranları değiştirmez.",
  },
};
