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
      "The first 90 days after a partner joins are a launch-period status flag on the ledger. The window is not a calendar quarter and it is not lifetime. It does not multiply commission rates. Qualifying payments inside and after that window use the same v2 rates: L1 50%, L2 15%, L3 7%, L4 5% and L5 3% (80% aggregate pool).",
    example:
      "On a $1,000 commissionable sale with a full five-level network: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner pool $800. AI Mark retained share $200. The direct (L1) partner receives $500, not $800 — 80% is the total across the network. Commission is calculated on the amount collected. Cost, salaries, AI, API and infrastructure are not deducted. VAT, sales tax, refunds and chargebacks are excluded.",
    country:
      "Country Partner and Strategic Partner are a separate agreement. They are not paid from this affiliate schedule.",
    lock: "Commission stays confirmed for 14 days after the sale is confirmed. It is not paid during that hold. With no refund, chargeback or cancellation, the entry becomes payable.",
    payout:
      "AI MARK records a payout from payable commission. An open payout becomes paid when it is confirmed. A refund or chargeback does not change the original entry: a separate reversal with a negative amount is written.",
    join: "Create a partner account. Your Partner ID and referral link are on the dashboard as soon as you sign in.",
    signup: "Create a partner account",
    recurringQ: "Can subscriptions create recurring commissions?",
    recurringA:
      "Each qualifying payment is commissioned under the rule in force when it is paid. The 90-day launch window is a status flag only. Recurring payments use the same L1 50% / L2 15% / L3 7% / L4 5% / L5 3% schedule, with an 80% aggregate pool across qualified levels.",
  },
  ru: {
    note: "Ставки на квалифицированную продажу — ту, которую клиент фактически оплатил: L1 50%, L2 15%, L3 7%, L4 5% и L5 3%. Вместе это совокупный партнёрский пул 80% по сети квалифицированных уровней, а не выплата одному партнёру. Доля AI Mark — 20% от комиссионной базы.",
    launch:
      "Первые 90 дней после подключения партнёра — это статусный флаг launch в журнале, а не множитель ставок. Это не календарный квартал и не пожизненная ставка. Квалифицированные платежи внутри окна и после него считаются по одним и тем же ставкам v2: L1 50%, L2 15%, L3 7%, L4 5% и L5 3% (совокупный пул 80%).",
    example:
      "С комиссионной продажи на $1000 при полной сети из пяти уровней: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Партнёрский пул $800. Доля AI Mark $200. Прямой партнёр (L1) получает $500, не $800 — 80% это итог по сети. Комиссия считается от полученной суммы. Себестоимость, зарплаты, AI, API и инфраструктура не вычитаются. НДС, sales tax, возвраты и chargeback исключаются.",
    country:
      "Country Partner и Strategic Partner — отдельное соглашение. Они не оплачиваются по этой партнёрской сетке.",
    lock: "Комиссия остаётся confirmed 14 дней после подтверждения продажи и в этот срок не выплачивается. Если нет возврата, chargeback или отмены, запись становится payable.",
    payout:
      "AI MARK записывает выплату из payable-комиссии. Выплата со статусом open становится paid после подтверждения. Возврат и chargeback не меняют исходную запись: пишется отдельная reversal с отрицательной суммой.",
    join: "Создайте аккаунт партнёра. Partner ID и referral-ссылка появляются в кабинете сразу после входа.",
    signup: "Создать аккаунт партнёра",
    recurringQ: "Могут ли подписки давать повторяющуюся комиссию?",
    recurringA:
      "Каждый квалифицированный платёж считается по правилу, которое действует в день оплаты. Окно launch 90 дней — только статусный флаг. Повторяющиеся платежи идут по той же сетке L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, с совокупным пулом 80% по квалифицированным уровням.",
  },
  es: {
    note: "Las tasas de una venta cualificada — una venta que el cliente ya pagó — son L1 50%, L2 15%, L3 7%, L4 5% y L5 3%. En conjunto, un pool agregado del 80% a través de la red de niveles cualificados, no un pago a un solo partner. La parte retenida de AI Mark es el 20% del importe comisionable.",
    launch:
      "Los primeros 90 días tras el alta del partner son una marca de estado de lanzamiento en el libro, no un multiplicador de tasas. No es un trimestre de calendario ni es de por vida. Los pagos cualificados dentro y después de esa ventana usan las mismas tasas v2: L1 50%, L2 15%, L3 7%, L4 5% y L5 3% (pool agregado 80%).",
    example:
      "En una venta comisionable de $1000 con una red completa de cinco niveles: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool de partners $800. Parte retenida de AI Mark $200. El partner directo (L1) recibe $500, no $800: el 80% es el total de la red. La comisión se calcula sobre el importe cobrado. No se descuentan coste, salarios, AI, API ni infraestructura. Quedan fuera el IVA, el sales tax, los reembolsos y los chargebacks.",
    country:
      "Country Partner y Strategic Partner son un acuerdo aparte. No se pagan con esta tabla de afiliación.",
    lock: "La comisión permanece confirmed durante 14 días después de confirmar la venta y no se paga en ese plazo. Sin reembolso, chargeback o cancelación, la entrada pasa a payable.",
    payout:
      "AI MARK registra un pago a partir de la comisión payable. Un pago open pasa a paid cuando se confirma. Un reembolso o chargeback no cambia la entrada original: se escribe una reversal aparte con importe negativo.",
    join: "Crea una cuenta de partner. Tu Partner ID y el enlace de referido están en el panel en cuanto inicias sesión.",
    signup: "Crear cuenta de partner",
    recurringQ: "¿Las suscripciones generan comisión recurrente?",
    recurringA:
      "Cada pago cualificado se comisiona con la regla vigente el día en que se cobra. La ventana de 90 días es solo una marca de estado. Los pagos posteriores, incluidos los cargos de suscripción, usan la misma tabla L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, con un pool agregado del 80% en los niveles cualificados.",
  },
  pt: {
    note: "As taxas de uma venda qualificada — uma venda que o cliente de facto pagou — são L1 50%, L2 15%, L3 7%, L4 5% e L5 3%. No conjunto, um pool agregado de 80% na rede de níveis qualificados, não um pagamento a um único parceiro. A parte retida da AI Mark é 20% do valor comissionável.",
    launch:
      "Os primeiros 90 dias após a entrada do parceiro são uma marca de estado de lançamento no razão, não um multiplicador de taxas. Não é um trimestre de calendário e não é vitalício. Os pagamentos qualificados dentro e depois dessa janela usam as mesmas taxas v2: L1 50%, L2 15%, L3 7%, L4 5% e L5 3% (pool agregado 80%).",
    example:
      "Numa venda comissionável de $1000 com uma rede completa de cinco níveis: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool de parceiros $800. Parte retida da AI Mark $200. O parceiro direto (L1) recebe $500, não $800 — 80% é o total da rede. A comissão incide sobre o valor recebido. Custo, salários, AI, API e infraestrutura não são deduzidos. IVA, sales tax, reembolsos e chargebacks ficam de fora.",
    country:
      "Country Partner e Strategic Partner são um acordo à parte. Não são pagos por esta tabela de afiliados.",
    lock: "A comissão fica confirmed durante 14 dias após a confirmação da venda e não é paga nesse prazo. Sem reembolso, chargeback ou cancelamento, o lançamento passa a payable.",
    payout:
      "A AI MARK regista um pagamento a partir da comissão payable. Um pagamento open passa a paid quando é confirmado. Um reembolso ou chargeback não altera o lançamento original: escreve-se uma reversal separada com valor negativo.",
    join: "Crie uma conta de parceiro. O Partner ID e a ligação de referência ficam no painel assim que entrar.",
    signup: "Criar conta de parceiro",
    recurringQ: "As subscrições geram comissão recorrente?",
    recurringA:
      "Cada pagamento qualificado segue a regra em vigor no dia em que é pago. A janela de 90 dias é apenas uma marca de estado. Os pagamentos seguintes, incluindo as cobranças da subscrição, usam a mesma tabela L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, com um pool agregado de 80% nos níveis qualificados.",
  },
  ar: {
    note: "النسب على البيع المؤهل — وهو بيع دفعه العميل فعلًا — هي L1 50% وL2 15% وL3 7% وL4 5% وL5 3%. المجموع مجمع شركاء 80% عبر شبكة المستويات المؤهلة، وليس دفعة لشريك واحد. حصة AI Mark المحتجزة 20% من المبلغ الخاضع للعمولة.",
    launch:
      "أول 90 يومًا بعد انضمام الشريك علامة حالة إطلاق في الدفتر وليست معامل ضرب للنسب. النافذة ليست ربعًا تقويميًا وليست مدى الحياة. المدفوعات المؤهلة داخل النافذة وبعدها تستخدم نسب v2 نفسها: L1 50% وL2 15% وL3 7% وL4 5% وL5 3% (مجمع 80%).",
    example:
      "في بيع خاضع للعمولة بقيمة $1000 مع شبكة كاملة من خمسة مستويات: L1 $500 وL2 $150 وL3 $70 وL4 $50 وL5 $30. مجمع الشركاء $800. حصة AI Mark المحتجزة $200. الشريك المباشر (L1) يحصل على $500 لا $800 — و80% هو الإجمالي عبر الشبكة. تُحسب العمولة من المبلغ المحصّل. لا تُخصم التكلفة ولا الرواتب ولا AI ولا API ولا البنية التحتية. ضريبة القيمة المضافة وضريبة المبيعات والمبالغ المستردة وعمليات الاسترداد القسري مستبعدة.",
    country:
      "Country Partner وStrategic Partner اتفاق منفصل. لا يُدفعان من جدول العمولة هذا.",
    lock: "تبقى العمولة confirmed لمدة 14 يومًا بعد تأكيد البيع ولا تُدفع خلال هذه المدة. إذا لم يكن هناك استرداد أو chargeback أو إلغاء، تصبح الحركة payable.",
    payout:
      "تسجّل AI MARK دفعة من العمولة payable. تنتقل الدفعة من open إلى paid عند التأكيد. الاسترداد وchargeback لا يغيّران الحركة الأصلية: تُكتب reversal منفصلة بمبلغ سالب.",
    join: "أنشئ حساب شريك. يظهر معرّف الشريك ورابط الإحالة في اللوحة فور تسجيل الدخول.",
    signup: "إنشاء حساب شريك",
    recurringQ: "هل يمكن أن تولّد الاشتراكات عمولة متكررة؟",
    recurringA:
      "كل دفعة مؤهلة تُحتسب بالقاعدة السارية يوم الدفع. نافذة الإطلاق لـ 90 يومًا علامة حالة فقط. الدفعات اللاحقة، بما فيها خصومات الاشتراك، تستخدم الجدول نفسه L1 50% / L2 15% / L3 7% / L4 5% / L5 3%، بمجمع 80% عبر المستويات المؤهلة.",
  },
  zh: {
    note: "合格销售（客户已经实际支付的销售）的比例为 L1 50%、L2 15%、L3 7%、L4 5%、L5 3%。合计为合格层级网络的 80% 汇总伙伴池，不是付给单一伙伴。AI Mark 留存份额为可计佣金额的 20%。",
    launch:
      "合伙人加入后的 90 天是账本上的启动状态标记，不是费率乘数。这不是自然季度，也不是终身比例。窗口内外的合格付款都使用同一套 v2 比例：L1 50%、L2 15%、L3 7%、L4 5%、L5 3%（汇总池 80%）。",
    example:
      "一笔可计佣 $1000 销售、完整五级网络：L1 $500、L2 $150、L3 $70、L4 $50、L5 $30。伙伴池 $800。AI Mark 留存份额 $200。直接（L1）合伙人得到 $500，不是 $800 — 80% 是全网合计。佣金按实收金额计算。成本、工资、AI、API 和基础设施不从中扣除。增值税、销售税、退款和拒付除外。",
    country:
      "Country Partner 与 Strategic Partner 是另行约定的合作，不走这张联盟佣金表。",
    lock: "佣金在销售确认后保持 confirmed 14 天，在此期间不支付。若没有退款、拒付或取消，该记录变为 payable。",
    payout:
      "AI MARK 从 payable 佣金记一笔 payout。open 的 payout 在确认后变为 paid。退款和拒付不改原记录：另记一笔金额为负的 reversal。",
    join: "创建合伙人账户。登录后，看板里立即有 Partner ID 和推荐链接。",
    signup: "创建合伙人账户",
    recurringQ: "订阅会产生持续佣金吗？",
    recurringA:
      "每一笔合格付款按支付当日生效的规则计算。90 天启动窗口只是状态标记。其后的付款，包括后续订阅扣款，使用同一套 L1 50% / L2 15% / L3 7% / L4 5% / L5 3%，合格层级汇总池为 80%。",
  },
  id: {
    note: "Tarif penjualan yang lolos kualifikasi — penjualan yang benar-benar dibayar pelanggan — adalah L1 50%, L2 15%, L3 7%, L4 5%, dan L5 3%. Jumlahnya pool mitra agregat 80% di seluruh jaringan tingkat yang memenuhi syarat, bukan pembayaran ke satu mitra. Bagian yang ditahan AI Mark adalah 20% dari jumlah yang dapat dikomisi.",
    launch:
      "90 hari pertama setelah partner bergabung adalah bendera status peluncuran di buku besar, bukan pengali tarif. Ini bukan kuartal kalender, dan bukan seumur hidup. Pembayaran yang lolos kualifikasi di dalam dan setelah jendela itu memakai tarif v2 yang sama: L1 50%, L2 15%, L3 7%, L4 5%, dan L5 3% (pool agregat 80%).",
    example:
      "Pada penjualan yang dapat dikomisi sebesar $1000 dengan jaringan lima tingkat penuh: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Pool mitra $800. Bagian yang ditahan AI Mark $200. Partner langsung (L1) menerima $500, bukan $800 — 80% adalah total di seluruh jaringan. Komisi dihitung dari jumlah yang diterima. Modal, gaji, AI, API, dan infrastruktur tidak dipotong. PPN, sales tax, refund, dan chargeback tidak masuk.",
    country:
      "Country Partner dan Strategic Partner adalah perjanjian terpisah. Keduanya tidak dibayar dari tabel afiliasi ini.",
    lock: "Komisi tetap confirmed selama 14 hari setelah penjualan dikonfirmasi dan tidak dibayar dalam masa itu. Jika tidak ada refund, chargeback, atau pembatalan, entri menjadi payable.",
    payout:
      "AI MARK mencatat payout dari komisi payable. Payout open menjadi paid saat dikonfirmasi. Refund atau chargeback tidak mengubah entri asli: ditulis reversal terpisah dengan jumlah negatif.",
    join: "Buat akun partner. Partner ID dan tautan referral ada di dasbor begitu Anda masuk.",
    signup: "Buat akun partner",
    recurringQ: "Apakah langganan menghasilkan komisi berulang?",
    recurringA:
      "Setiap pembayaran yang lolos kualifikasi mengikuti aturan yang berlaku pada hari pembayaran. Jendela peluncuran 90 hari hanya bendera status. Pembayaran setelahnya, termasuk tagihan langganan, memakai tabel yang sama L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, dengan pool agregat 80% di tingkat yang memenuhi syarat.",
  },
  vi: {
    note: "Tỷ lệ trên giao dịch đủ điều kiện — giao dịch khách đã thanh toán — là L1 50%, L2 15%, L3 7%, L4 5% và L5 3%. Cộng lại là quỹ đối tác tổng hợp 80% trên mạng các cấp đủ điều kiện, không phải khoản trả cho một đối tác. Phần AI Mark giữ lại là 20% số tiền được tính hoa hồng.",
    launch:
      "90 ngày đầu sau khi đối tác tham gia là cờ trạng thái ra mắt trên sổ cái, không phải hệ số nhân tỷ lệ. Đây không phải quý lịch và không phải trọn đời. Các khoản thanh toán đủ điều kiện trong và sau cửa sổ đó dùng cùng tỷ lệ v2: L1 50%, L2 15%, L3 7%, L4 5% và L5 3% (quỹ tổng hợp 80%).",
    example:
      "Với giao dịch được tính hoa hồng $1000 và mạng đủ năm cấp: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Quỹ đối tác $800. Phần AI Mark giữ lại $200. Đối tác trực tiếp (L1) nhận $500, không phải $800 — 80% là tổng trên toàn mạng. Hoa hồng tính trên số tiền đã thu. Giá vốn, lương, AI, API và hạ tầng không bị trừ. VAT, sales tax, hoàn tiền và chargeback nằm ngoài.",
    country:
      "Country Partner và Strategic Partner là thỏa thuận riêng. Hai hình thức này không được trả theo bảng hoa hồng liên kết này.",
    lock: "Hoa hồng giữ trạng thái confirmed trong 14 ngày sau khi giao dịch được xác nhận và không được trả trong thời gian đó. Nếu không có hoàn tiền, chargeback hoặc hủy, bút toán chuyển thành payable.",
    payout:
      "AI MARK ghi một payout từ hoa hồng payable. Payout open thành paid khi được xác nhận. Hoàn tiền hoặc chargeback không sửa bút toán gốc: một reversal riêng với số âm được ghi thêm.",
    join: "Tạo tài khoản đối tác. Partner ID và liên kết giới thiệu có trên bảng điều khiển ngay khi bạn đăng nhập.",
    signup: "Tạo tài khoản đối tác",
    recurringQ: "Gói đăng ký có tạo hoa hồng định kỳ không?",
    recurringA:
      "Mỗi khoản thanh toán đủ điều kiện được tính theo quy tắc đang hiệu lực vào ngày thanh toán. Cửa sổ ra mắt 90 ngày chỉ là cờ trạng thái. Các khoản sau đó, kể cả các lần trừ tiền đăng ký, dùng cùng bảng L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, với quỹ tổng hợp 80% trên các cấp đủ điều kiện.",
  },
  de: {
    note: "Sätze auf einen qualifizierten Verkauf — einen Verkauf, den der Kunde tatsächlich bezahlt hat: L1 50%, L2 15%, L3 7%, L4 5% und L5 3%. Zusammen ein aggregierter Partner-Pool von 80% über das Netzwerk der qualifizierten Ebenen, keine Auszahlung an einen einzelnen Partner. Der einbehaltene Anteil von AI Mark beträgt 20% des provisionsfähigen Betrags.",
    launch:
      "Die ersten 90 Tage nach dem Partnerstart sind eine Launch-Statusmarkierung im Ledger, kein Satzmultiplikator. Das Fenster ist kein Kalenderquartal und nicht lebenslang. Qualifizierte Zahlungen innerhalb und nach diesem Fenster nutzen dieselben v2-Sätze: L1 50%, L2 15%, L3 7%, L4 5% und L5 3% (aggregierter Pool 80%).",
    example:
      "Bei einem provisionsfähigen Verkauf über $1000 mit vollständigem Fünf-Ebenen-Netzwerk: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner-Pool $800. Einbehaltener Anteil von AI Mark $200. Der direkte Partner (L1) erhält $500, nicht $800 — 80% ist die Summe über das Netzwerk. Die Provision wird auf den eingegangenen Betrag gerechnet. Kosten, Gehälter, AI, API und Infrastruktur werden nicht abgezogen. MwSt., Sales Tax, Erstattungen und Chargebacks sind ausgenommen.",
    country:
      "Country Partner und Strategic Partner sind eine eigene Vereinbarung. Sie werden nicht nach diesem Affiliate-Plan vergütet.",
    lock: "Die Provision bleibt 14 Tage nach der Bestätigung des Verkaufs confirmed und wird in dieser Frist nicht ausgezahlt. Ohne Erstattung, Chargeback oder Storno wird der Eintrag payable.",
    payout:
      "AI MARK erfasst eine Auszahlung aus payable Provision. Eine open Auszahlung wird mit der Bestätigung paid. Erstattung und Chargeback ändern den ursprünglichen Eintrag nicht: es wird eine eigene reversal mit negativem Betrag geschrieben.",
    join: "Legen Sie ein Partnerkonto an. Partner-ID und Empfehlungslink stehen im Dashboard, sobald Sie sich anmelden.",
    signup: "Partnerkonto erstellen",
    recurringQ: "Können Abos wiederkehrende Provision erzeugen?",
    recurringA:
      "Jede qualifizierte Zahlung folgt der Regel, die am Tag der Zahlung gilt. Das 90-Tage-Launch-Fenster ist nur eine Statusmarkierung. Spätere Zahlungen, auch Abo-Abbuchungen, nutzen dieselbe Tabelle L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, mit einem aggregierten Pool von 80% über die qualifizierten Ebenen.",
  },
  fr: {
    note: "Les taux sur une vente qualifiée — une vente que le client a réellement payée — sont L1 50%, L2 15%, L3 7%, L4 5% et L5 3%. Ensemble, un pool partenaire agrégé de 80% à travers le réseau des niveaux qualifiés, pas un versement à un seul partenaire. La part retenue d'AI Mark est 20% du montant commissionnable.",
    launch:
      "Les 90 premiers jours après l'entrée du partenaire sont un indicateur de statut de lancement dans le grand livre, pas un multiplicateur de taux. Ce n'est pas un trimestre calendaire, et ce n'est pas à vie. Les paiements qualifiés dans cette fenêtre et après utilisent les mêmes taux v2 : L1 50%, L2 15%, L3 7%, L4 5% et L5 3% (pool agrégé 80%).",
    example:
      "Sur une vente commissionnable de 1 000 $ avec un réseau complet à cinq niveaux : L1 500 $, L2 150 $, L3 70 $, L4 50 $, L5 30 $. Pool partenaires 800 $. Part retenue d'AI Mark 200 $. Le partenaire direct (L1) reçoit 500 $, pas 800 $ — 80% est le total du réseau. La commission se calcule sur le montant encaissé. Coût, salaires, IA, API et infrastructure ne sont pas déduits. TVA, sales tax, remboursements et chargebacks sont exclus.",
    country:
      "Country Partner et Strategic Partner relèvent d'un accord distinct. Ils ne sont pas rémunérés selon cette grille d'affiliation.",
    lock: "La commission reste confirmed pendant 14 jours après la confirmation de la vente et n'est pas versée pendant ce délai. Sans remboursement, chargeback ou annulation, l'écriture devient payable.",
    payout:
      "AI MARK enregistre un versement à partir de la commission payable. Un versement open devient paid lorsqu'il est confirmé. Un remboursement ou un chargeback ne modifie pas l'écriture d'origine : une reversal séparée, d'un montant négatif, est ajoutée.",
    join: "Créez un compte partenaire. Votre Partner ID et votre lien de parrainage sont dans le tableau de bord dès la connexion.",
    signup: "Créer un compte partenaire",
    recurringQ: "Les abonnements peuvent-ils créer une commission récurrente ?",
    recurringA:
      "Chaque paiement qualifié suit la règle en vigueur le jour où il est encaissé. La fenêtre de lancement de 90 jours n'est qu'un indicateur de statut. Les paiements suivants, y compris les échéances d'abonnement, utilisent la même grille L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, avec un pool agrégé de 80% sur les niveaux qualifiés.",
  },
  ja: {
    note: "適格セール（顧客が実際に支払った販売）の率は L1 50%、L2 15%、L3 7%、L4 5%、L5 3% です。合計は適格レベルのネットワーク全体の 80% の合算パートナープールであり、一人のパートナーへの支払いではありません。AI Mark の留保分はコミッション対象額の 20% です。",
    launch:
      "パートナー参加から 90 日間は台帳上のローンチ状態フラグであり、レートの倍率ではありません。暦の四半期ではなく、生涯レートでもありません。窓の内外の適格な支払いは同じ v2 率です。L1 50% / L2 15% / L3 7% / L4 5% / L5 3%（合算プール 80%）。",
    example:
      "コミッション対象 $1000 の販売で五階層が揃う場合: L1 $500、L2 $150、L3 $70、L4 $50、L5 $30。パートナープール $800。AI Mark の留保分 $200。直接（L1）パートナーが受け取るのは $500 であり $800 ではありません。80% はネットワーク全体の合計です。報酬は入金額に対するものです。原価、人件費、AI、API、インフラは引きません。VAT、売上税、返金、チャージバックは対象外です。",
    country:
      "Country Partner と Strategic Partner は別契約です。このアフィリエイト表からは支払われません。",
    lock: "報酬は販売確定後 14 日間 confirmed のままで、その間は支払われません。返金、チャージバック、取消がなければ payable になります。",
    payout:
      "AI MARK は payable の報酬から payout を記録します。open の payout は確認されると paid になります。返金とチャージバックは元の記録を変えません。負の金額の reversal が別に書かれます。",
    join: "パートナーアカウントを作成してください。ログインすると、ダッシュボードに Partner ID と紹介リンクがあります。",
    signup: "パートナーアカウントを作成",
    recurringQ: "サブスクリプションは継続報酬になりますか？",
    recurringA:
      "適格な支払いごとに、支払日に有効な規則で計算します。90 日のローンチ窓は状態フラグだけです。それ以降の支払い（サブスクリプション請求を含む）は同じ L1 50% / L2 15% / L3 7% / L4 5% / L5 3% で、適格レベル全体の合算プールは 80% です。",
  },
  tr: {
    note: "Nitelikli satışta — müşterinin gerçekten ödediği satışta — oranlar L1 %50, L2 %15, L3 %7, L4 %5 ve L5 %3'tür. Toplam, nitelikli seviyeler ağındaki %80 toplu partner havuzudur; tek bir partnere ödeme değildir. AI Mark'ın alıkoyduğu pay, komisyona konu tutarın %20'sidir.",
    launch:
      "Partner katıldıktan sonraki ilk 90 gün defterde bir lansman durum bayrağıdır, oran çarpanı değildir. Bu bir takvim çeyreği değildir ve ömür boyu değildir. Bu pencerenin içindeki ve sonraki nitelikli ödemeler aynı v2 oranlarını kullanır: L1 %50, L2 %15, L3 %7, L4 %5 ve L5 %3 (toplu havuz %80).",
    example:
      "Komisyona konu $1000'lık bir satışta tam beş seviyeli ağ: L1 $500, L2 $150, L3 $70, L4 $50, L5 $30. Partner havuzu $800. AI Mark'ın alıkoyduğu pay $200. Doğrudan (L1) partner $500 alır, $800 değil — %80 ağın toplamıdır. Komisyon tahsil edilen tutar üzerinden hesaplanır. Maliyet, maaşlar, AI, API ve altyapı düşülmez. KDV, sales tax, iadeler ve chargeback kapsam dışıdır.",
    country:
      "Country Partner ve Strategic Partner ayrı bir anlaşmadır. Bu iş ortağı tablosundan ödenmez.",
    lock: "Komisyon, satış onayından sonra 14 gün confirmed kalır ve bu sürede ödenmez. İade, chargeback veya iptal yoksa kayıt payable olur.",
    payout:
      "AI MARK, payable komisyondan bir payout kaydeder. open payout onaylanınca paid olur. İade ve chargeback özgün kaydı değiştirmez: negatif tutarlı ayrı bir reversal yazılır.",
    join: "Bir partner hesabı oluşturun. Giriş yaptığınızda Partner ID ve referral bağlantısı panelde hazırdır.",
    signup: "Partner hesabı oluştur",
    recurringQ: "Abonelikler yinelenen komisyon oluşturur mu?",
    recurringA:
      "Her nitelikli ödeme, tahsil edildiği gün yürürlükte olan kuralla hesaplanır. 90 günlük lansman penceresi yalnızca bir durum bayrağıdır. Sonraki ödemeler, abonelik tahsilatları dahil, aynı tabloyu kullanır: L1 %50 / L2 %15 / L3 %7 / L4 %5 / L5 %3, nitelikli seviyelerde %80 toplu havuz.",
  },
};
