import type { Locale } from "@/lib/site";

/**
 * Published Partner Program terms. These are the approved contract rates,
 * shown as a schedule — not as a partner's earnings. Earnings are read from
 * the ledger and are never computed in the browser.
 */
export type PartnerProgramTerms = {
  note: string;
  launch: string;
  example: string;
  country: string;
  recurringQ: string;
  recurringA: string;
};

export const partnerProgramTerms: Record<Locale, PartnerProgramTerms> = {
  en: {
    note: "Base rates on a qualifying sale — a sale the customer has actually paid — are L1 15%, L2 5%, L3 3%, L4 2% and L5 1%. Together that is 26% of the amount collected.",
    launch:
      "For 90 days after the partner joins, qualifying payments inside that personal window use a 1.5× launch boost: 22.5%, 7.5%, 4.5%, 3% and 1.5% (39% in total). The window is not a calendar quarter, and it is not lifetime. A recurring payment inside the 90 days is launch; after day 90 it follows the base rates.",
    example:
      "On a $1,000 paid sale the direct partner receives $150 at the base rate. Commission is calculated on the amount collected, not on AI MARK profit. Cost, salaries, AI, API and infrastructure are not deducted. VAT, sales tax, refunds and chargebacks are excluded.",
    country:
      "Country Partner and Strategic Partner are a separate agreement. They are not paid from this affiliate schedule.",
    recurringQ: "Can subscriptions create recurring commissions?",
    recurringA:
      "Each qualifying payment is commissioned under the rule in force when it is paid. Payments in the first 90 days after the partner joins use the 1.5× launch rates. Later payments, including later subscription charges, use the base rates. The launch boost is not lifetime.",
  },
  ru: {
    note: "Базовые ставки на квалифицированную продажу — ту, которую клиент фактически оплатил: L1 15%, L2 5%, L3 3%, L4 2% и L5 1%. Вместе это 26% от полученной суммы.",
    launch:
      "В течение 90 дней после подключения партнёра квалифицированные платежи в этом личном окне идут с launch-множителем 1,5: 22,5%, 7,5%, 4,5%, 3% и 1,5% (вместе 39%). Это не календарный квартал и не пожизненная ставка. Повторяющийся платёж внутри 90 дней считается по launch, после 90-го дня — по базовым ставкам.",
    example:
      "С оплаченной продажи на $1000 прямой партнёр получает $150 по базовой ставке. Комиссия считается от полученной суммы, а не от прибыли AI MARK. Себестоимость, зарплаты, AI, API и инфраструктура не вычитаются. НДС, sales tax, возвраты и chargeback исключаются.",
    country:
      "Country Partner и Strategic Partner — отдельное соглашение. Они не оплачиваются по этой партнёрской сетке.",
    recurringQ: "Могут ли подписки давать повторяющуюся комиссию?",
    recurringA:
      "Каждый квалифицированный платёж считается по правилу, которое действует в день оплаты. Платежи в первые 90 дней после подключения партнёра идут по launch-ставкам с множителем 1,5. Более поздние платежи, включая следующие списания подписки, идут по базовым ставкам. Launch не пожизненный.",
  },
  es: {
    note: "Las tasas base de una venta cualificada — una venta que el cliente ya pagó — son L1 15%, L2 5%, L3 3%, L4 2% y L5 1%. En conjunto, el 26% del importe cobrado.",
    launch:
      "Durante 90 días desde que el partner se une, los pagos cualificados dentro de esa ventana personal usan un impulso de lanzamiento de 1,5×: 22,5%, 7,5%, 4,5%, 3% y 1,5% (39% en total). No es un trimestre de calendario ni es de por vida. Un pago recurrente dentro de los 90 días es de lanzamiento; después del día 90 sigue las tasas base.",
    example:
      "En una venta pagada de $1000 el partner directo recibe $150 con la tasa base. La comisión se calcula sobre el importe cobrado, no sobre el beneficio de AI MARK. No se descuentan coste, salarios, AI, API ni infraestructura. Quedan fuera el IVA, el sales tax, los reembolsos y los chargebacks.",
    country:
      "Country Partner y Strategic Partner son un acuerdo aparte. No se pagan con esta tabla de afiliación.",
    recurringQ: "¿Las suscripciones generan comisión recurrente?",
    recurringA:
      "Cada pago cualificado se comisiona con la regla vigente el día en que se cobra. Los pagos de los primeros 90 días desde el alta del partner usan las tasas de lanzamiento 1,5×. Los posteriores, incluidos los cargos siguientes de la suscripción, usan las tasas base. El impulso de lanzamiento no es de por vida.",
  },
  pt: {
    note: "As taxas base de uma venda qualificada — uma venda que o cliente de facto pagou — são L1 15%, L2 5%, L3 3%, L4 2% e L5 1%. No conjunto, 26% do valor recebido.",
    launch:
      "Durante 90 dias após a entrada do parceiro, os pagamentos qualificados nessa janela pessoal usam um impulso de lançamento de 1,5×: 22,5%, 7,5%, 4,5%, 3% e 1,5% (39% no total). Não é um trimestre de calendário e não é vitalício. Um pagamento recorrente dentro dos 90 dias é de lançamento; depois do dia 90 segue as taxas base.",
    example:
      "Numa venda paga de $1000 o parceiro direto recebe $150 à taxa base. A comissão incide sobre o valor recebido, não sobre o lucro da AI MARK. Custo, salários, AI, API e infraestrutura não são deduzidos. IVA, sales tax, reembolsos e chargebacks ficam de fora.",
    country:
      "Country Partner e Strategic Partner são um acordo à parte. Não são pagos por esta tabela de afiliados.",
    recurringQ: "As subscrições geram comissão recorrente?",
    recurringA:
      "Cada pagamento qualificado segue a regra em vigor no dia em que é pago. Os pagamentos dos primeiros 90 dias após a entrada do parceiro usam as taxas de lançamento de 1,5×. Os seguintes, incluindo as cobranças posteriores da subscrição, usam as taxas base. O impulso de lançamento não é vitalício.",
  },
  ar: {
    note: "النسب الأساسية على البيع المؤهل — وهو بيع دفعه العميل فعلًا — هي L1 15% وL2 5% وL3 3% وL4 2% وL5 1%. المجموع 26% من المبلغ المحصّل.",
    launch:
      "خلال 90 يومًا من انضمام الشريك، تُحتسب المدفوعات المؤهلة داخل هذه النافذة الشخصية بمعامل إطلاق 1.5: 22.5% و7.5% و4.5% و3% و1.5% (المجموع 39%). النافذة ليست ربعًا تقويميًا وليست مدى الحياة. الدفعة المتكررة داخل 90 يومًا تُحتسب بالإطلاق، وبعد اليوم 90 بالنسب الأساسية.",
    example:
      "في بيع مدفوع بقيمة $1000 يحصل الشريك المباشر على $150 بالنسبة الأساسية. تُحسب العمولة من المبلغ المحصّل، لا من ربح AI MARK. لا تُخصم التكلفة ولا الرواتب ولا AI ولا API ولا البنية التحتية. ضريبة القيمة المضافة وضريبة المبيعات والمبالغ المستردة وعمليات الاسترداد القسري مستبعدة.",
    country:
      "Country Partner وStrategic Partner اتفاق منفصل. لا يُدفعان من جدول العمولة هذا.",
    recurringQ: "هل يمكن أن تولّد الاشتراكات عمولة متكررة؟",
    recurringA:
      "كل دفعة مؤهلة تُحتسب بالقاعدة السارية يوم الدفع. الدفعات خلال أول 90 يومًا بعد انضمام الشريك تستخدم نسب الإطلاق 1.5×. الدفعات اللاحقة، بما فيها خصومات الاشتراك التالية، تستخدم النسب الأساسية. تعزيز الإطلاق ليس مدى الحياة.",
  },
  zh: {
    note: "合格销售（客户已经实际支付的销售）的基础比例为 L1 15%、L2 5%、L3 3%、L4 2%、L5 1%。合计为实收金额的 26%。",
    launch:
      "合伙人加入后的 90 天内，落在这个个人窗口里的合格付款使用 1.5 倍启动加成：22.5%、7.5%、4.5%、3% 和 1.5%（合计 39%）。这不是自然季度，也不是终身比例。90 天内的续费按启动比例；第 90 天之后按基础比例。",
    example:
      "一笔已支付的 $1000 销售，直接合伙人按基础比例获得 $150。佣金按实收金额计算，不是 AI MARK 的利润分成。成本、工资、AI、API 和基础设施不从中扣除。增值税、销售税、退款和拒付除外。",
    country:
      "Country Partner 与 Strategic Partner 是另行约定的合作，不走这张联盟佣金表。",
    recurringQ: "订阅会产生持续佣金吗？",
    recurringA:
      "每一笔合格付款按支付当日生效的规则计算。合伙人加入后前 90 天的付款使用 1.5 倍启动比例。其后的付款，包括后续订阅扣款，使用基础比例。启动加成不是终身的。",
  },
  id: {
    note: "Tarif dasar untuk penjualan yang lolos kualifikasi — penjualan yang benar-benar dibayar pelanggan — adalah L1 15%, L2 5%, L3 3%, L4 2%, dan L5 1%. Jumlahnya 26% dari dana yang diterima.",
    launch:
      "Selama 90 hari setelah partner bergabung, pembayaran yang lolos kualifikasi di dalam jendela pribadi itu memakai pengali peluncuran 1,5×: 22,5%, 7,5%, 4,5%, 3%, dan 1,5% (total 39%). Ini bukan kuartal kalender, dan bukan seumur hidup. Pembayaran berulang di dalam 90 hari dihitung sebagai peluncuran; setelah hari ke-90 mengikuti tarif dasar.",
    example:
      "Pada penjualan terbayar sebesar $1000, partner langsung menerima $150 dengan tarif dasar. Komisi dihitung dari jumlah yang diterima, bukan dari laba AI MARK. Modal, gaji, AI, API, dan infrastruktur tidak dipotong. PPN, sales tax, refund, dan chargeback tidak masuk.",
    country:
      "Country Partner dan Strategic Partner adalah perjanjian terpisah. Keduanya tidak dibayar dari tabel afiliasi ini.",
    recurringQ: "Apakah langganan menghasilkan komisi berulang?",
    recurringA:
      "Setiap pembayaran yang lolos kualifikasi mengikuti aturan yang berlaku pada hari pembayaran. Pembayaran dalam 90 hari pertama setelah partner bergabung memakai tarif peluncuran 1,5×. Pembayaran setelahnya, termasuk tagihan langganan berikutnya, memakai tarif dasar. Bonus peluncuran tidak seumur hidup.",
  },
  vi: {
    note: "Tỷ lệ cơ sở trên một giao dịch đủ điều kiện — giao dịch khách đã thanh toán — là L1 15%, L2 5%, L3 3%, L4 2% và L5 1%. Cộng lại là 26% số tiền đã thu.",
    launch:
      "Trong 90 ngày kể từ khi đối tác tham gia, các khoản thanh toán đủ điều kiện trong cửa sổ riêng đó được nhân 1,5 lần khi ra mắt: 22,5%, 7,5%, 4,5%, 3% và 1,5% (tổng 39%). Đây không phải quý lịch và không phải trọn đời. Khoản thanh toán định kỳ trong 90 ngày tính theo mức ra mắt; sau ngày thứ 90 tính theo tỷ lệ cơ sở.",
    example:
      "Với giao dịch đã thanh toán $1000, đối tác trực tiếp nhận $150 theo tỷ lệ cơ sở. Hoa hồng tính trên số tiền đã thu, không phải trên lợi nhuận của AI MARK. Giá vốn, lương, AI, API và hạ tầng không bị trừ. VAT, sales tax, hoàn tiền và chargeback nằm ngoài.",
    country:
      "Country Partner và Strategic Partner là thỏa thuận riêng. Hai hình thức này không được trả theo bảng hoa hồng liên kết này.",
    recurringQ: "Gói đăng ký có tạo hoa hồng định kỳ không?",
    recurringA:
      "Mỗi khoản thanh toán đủ điều kiện được tính theo quy tắc đang hiệu lực vào ngày thanh toán. Các khoản trong 90 ngày đầu sau khi đối tác tham gia dùng tỷ lệ ra mắt 1,5×. Các khoản sau đó, kể cả các lần trừ tiền đăng ký tiếp theo, dùng tỷ lệ cơ sở. Mức thưởng ra mắt không phải trọn đời.",
  },
  de: {
    note: "Basissätze auf einen qualifizierten Verkauf — einen Verkauf, den der Kunde tatsächlich bezahlt hat: L1 15%, L2 5%, L3 3%, L4 2% und L5 1%. Zusammen 26% des eingegangenen Betrags.",
    launch:
      "In den 90 Tagen nach dem Partnerstart gelten qualifizierte Zahlungen in diesem persönlichen Fenster mit dem Launch-Faktor 1,5: 22,5%, 7,5%, 4,5%, 3% und 1,5% (zusammen 39%). Das Fenster ist kein Kalenderquartal und nicht lebenslang. Eine wiederkehrende Zahlung innerhalb der 90 Tage ist Launch; nach Tag 90 gilt der Basissatz.",
    example:
      "Bei einem bezahlten Verkauf über $1000 erhält der direkte Partner $150 zum Basissatz. Die Provision wird auf den eingegangenen Betrag gerechnet, nicht auf den Gewinn von AI MARK. Kosten, Gehälter, AI, API und Infrastruktur werden nicht abgezogen. MwSt., Sales Tax, Erstattungen und Chargebacks sind ausgenommen.",
    country:
      "Country Partner und Strategic Partner sind eine eigene Vereinbarung. Sie werden nicht nach diesem Affiliate-Plan vergütet.",
    recurringQ: "Können Abos wiederkehrende Provision erzeugen?",
    recurringA:
      "Jede qualifizierte Zahlung folgt der Regel, die am Tag der Zahlung gilt. Zahlungen in den ersten 90 Tagen nach dem Partnerstart nutzen die Launch-Sätze mit Faktor 1,5. Spätere Zahlungen, auch weitere Abo-Abbuchungen, nutzen die Basissätze. Der Launch-Faktor ist nicht lebenslang.",
  },
  fr: {
    note: "Les taux de base sur une vente qualifiée — une vente que le client a réellement payée — sont L1 15%, L2 5%, L3 3%, L4 2% et L5 1%. Ensemble, 26% du montant encaissé.",
    launch:
      "Pendant 90 jours après l'entrée du partenaire, les paiements qualifiés dans cette fenêtre personnelle utilisent un coefficient de lancement de 1,5 : 22,5%, 7,5%, 4,5%, 3% et 1,5% (39% au total). Ce n'est pas un trimestre calendaire, et ce n'est pas à vie. Un paiement récurrent dans les 90 jours est au taux de lancement ; après le 90e jour, au taux de base.",
    example:
      "Sur une vente payée de 1 000 $, le partenaire direct reçoit 150 $ au taux de base. La commission se calcule sur le montant encaissé, pas sur le bénéfice d'AI MARK. Coût, salaires, IA, API et infrastructure ne sont pas déduits. TVA, sales tax, remboursements et chargebacks sont exclus.",
    country:
      "Country Partner et Strategic Partner relèvent d'un accord distinct. Ils ne sont pas rémunérés selon cette grille d'affiliation.",
    recurringQ: "Les abonnements peuvent-ils créer une commission récurrente ?",
    recurringA:
      "Chaque paiement qualifié suit la règle en vigueur le jour où il est encaissé. Les paiements des 90 premiers jours après l'entrée du partenaire utilisent les taux de lancement ×1,5. Les paiements suivants, y compris les échéances d'abonnement, utilisent les taux de base. Le boost de lancement n'est pas à vie.",
  },
  ja: {
    note: "適格セール（顧客が実際に支払った販売）の基本率は L1 15%、L2 5%、L3 3%、L4 2%、L5 1% です。合計は入金額の 26% です。",
    launch:
      "パートナー参加から 90 日間、その個人の期間内の適格な支払いはローンチ倍率 1.5 です。22.5% / 7.5% / 4.5% / 3% / 1.5%（合計 39%）。暦の四半期ではなく、生涯レートでもありません。90 日以内の継続課金はローンチ、90 日を過ぎた支払いは基本率です。",
    example:
      "支払済みの $1000 の販売では、直接のパートナーが基本率で $150 を受け取ります。報酬は入金額に対するもので、AI MARK の利益の分配ではありません。原価、人件費、AI、API、インフラは引きません。VAT、売上税、返金、チャージバックは対象外です。",
    country:
      "Country Partner と Strategic Partner は別契約です。このアフィリエイト表からは支払われません。",
    recurringQ: "サブスクリプションは継続報酬になりますか？",
    recurringA:
      "適格な支払いごとに、支払日に有効な規則で計算します。参加から 90 日以内の支払いは 1.5 倍のローンチ率です。それ以降の支払い（次回以降のサブスクリプション請求を含む）は基本率です。ローンチ倍率は生涯ではありません。",
  },
  tr: {
    note: "Nitelikli satışta — müşterinin gerçekten ödediği satışta — taban oranlar L1 %15, L2 %5, L3 %3, L4 %2 ve L5 %1'dir. Toplam, tahsil edilen tutarın %26'sıdır.",
    launch:
      "Partner katıldıktan sonraki 90 günde, bu kişisel pencere içindeki nitelikli ödemeler 1,5× lansman çarpanıyla hesaplanır: %22,5 / %7,5 / %4,5 / %3 / %1,5 (toplam %39). Bu bir takvim çeyreği değildir ve ömür boyu değildir. 90 gün içindeki yinelenen ödeme lansmandır; 90. günden sonra taban oran geçerlidir.",
    example:
      "Ödenmiş $1000'lık bir satışta doğrudan partner taban oranla $150 alır. Komisyon tahsil edilen tutar üzerinden hesaplanır, AI MARK kârından pay değildir. Maliyet, maaşlar, AI, API ve altyapı düşülmez. KDV, sales tax, iadeler ve chargeback kapsam dışıdır.",
    country:
      "Country Partner ve Strategic Partner ayrı bir anlaşmadır. Bu iş ortağı tablosundan ödenmez.",
    recurringQ: "Abonelikler yinelenen komisyon oluşturur mu?",
    recurringA:
      "Her nitelikli ödeme, tahsil edildiği gün yürürlükte olan kuralla hesaplanır. Partnerin katılımından sonraki ilk 90 günün ödemeleri 1,5× lansman oranlarını kullanır. Sonraki ödemeler, sonraki abonelik tahsilatları dahil, taban oranları kullanır. Lansman çarpanı ömür boyu değildir.",
  },
};
