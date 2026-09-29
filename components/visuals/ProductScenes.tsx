/**
 * On-topic schematic visuals. SVG/CSS only — not screenshots, not client work.
 * Published partner rates (L1–L5) are the ones already on the public program.
 */

const levels = [
  { id: "L1", rate: "50%" },
  { id: "L2", rate: "15%" },
  { id: "L3", rate: "7%" },
  { id: "L4", rate: "5%" },
  { id: "L5", rate: "3%" },
];

export function AimeScene() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="AIME content calendar with a Telegram approval">
      <rect width="320" height="180" rx="16" fill="#14291f" />
      <rect x="16" y="16" width="188" height="148" rx="12" fill="#fffefa" />
      <text x="28" y="36" fill="#3e5146" fontSize="11" fontFamily="Manrope, sans-serif">Content calendar</text>
      {[0, 1, 2, 3, 4].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={28 + col * 34}
            y={48 + row * 34}
            width="28"
            height="26"
            rx="6"
            fill={col === 2 && row === 1 ? "#d4f27e" : "#e9ede3"}
          />
        )),
      )}
      <rect x="214" y="28" width="90" height="124" rx="12" fill="#21392c" />
      <text x="226" y="50" fill="#d4f27e" fontSize="11" fontFamily="Manrope, sans-serif">Telegram</text>
      <rect x="226" y="62" width="66" height="36" rx="8" fill="#fffefa" />
      <text x="234" y="84" fill="#17261f" fontSize="11" fontFamily="Manrope, sans-serif">Approve</text>
      <circle cx="248" cy="124" r="8" fill="#d4f27e" />
      <path d="M244 124 l3 3 6-7" fill="none" stroke="#14291f" strokeWidth="1.6" />
    </svg>
  );
}

export function AssistantScene() {
  const channels = ["Web", "TG", "WA"];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Messages from several channels merging into one inbox">
      <rect width="320" height="180" rx="16" fill="#13271f" />
      {channels.map((label, i) => (
        <g key={label}>
          <rect x={18 + i * 70} y="18" width="58" height="28" rx="14" fill="#fffefa" />
          <text x={32 + i * 70} y="36" fill="#17261f" fontSize="12" fontFamily="Manrope, sans-serif">{label}</text>
          <path
            className="stroke-draw"
            d={`M${47 + i * 70} 46 C ${47 + i * 70} 80, 150 70, 168 96`}
            fill="none"
            stroke="#d4f27e"
            strokeWidth="1.6"
          />
        </g>
      ))}
      <rect x="150" y="92" width="152" height="70" rx="12" fill="#fffefa" />
      <text x="164" y="114" fill="#3e5146" fontSize="11" fontFamily="Manrope, sans-serif">One inbox</text>
      <rect x="164" y="122" width="90" height="10" rx="5" fill="#e9ede3" />
      <rect x="164" y="138" width="64" height="10" rx="5" fill="#d4f27e" />
    </svg>
  );
}

export function ShowroomScene() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Catalog, quote calculation, and a PDF proposal">
      <rect width="320" height="180" rx="16" fill="#1a3026" />
      <rect x="16" y="28" width="78" height="124" rx="12" fill="#fffefa" />
      <text x="26" y="48" fill="#3e5146" fontSize="11" fontFamily="Manrope, sans-serif">Catalog</text>
      <rect x="26" y="58" width="58" height="22" rx="6" fill="#e9ede3" />
      <rect x="26" y="86" width="58" height="22" rx="6" fill="#e7eedf" />
      <rect x="26" y="114" width="58" height="22" rx="6" fill="#e9ede3" />
      <path className="stroke-draw" d="M94 90 H118" stroke="#d4f27e" strokeWidth="1.6" />
      <rect x="118" y="40" width="84" height="100" rx="12" fill="#21392c" />
      <text x="128" y="62" fill="#d4f27e" fontSize="11" fontFamily="Manrope, sans-serif">Calc</text>
      <text x="128" y="88" fill="#f4f6ee" fontSize="13" fontFamily="Manrope, sans-serif">qty × rule</text>
      <text x="128" y="112" fill="#f4f6ee" fontSize="13" fontFamily="Manrope, sans-serif">= offer</text>
      <path className="stroke-draw" d="M202 90 H226" stroke="#d4f27e" strokeWidth="1.6" />
      <rect x="226" y="36" width="78" height="108" rx="8" fill="#fffefa" />
      <text x="238" y="58" fill="#17261f" fontSize="12" fontFamily="Manrope, sans-serif">PDF</text>
      <rect x="238" y="70" width="54" height="6" rx="3" fill="#dce2d8" />
      <rect x="238" y="82" width="42" height="6" rx="3" fill="#dce2d8" />
      <rect x="238" y="100" width="54" height="22" rx="6" fill="#d4f27e" />
    </svg>
  );
}

export function FinanceFlow() {
  const steps = ["USDT", "USDC", "Net", "Wallet", "Match"];
  return (
    <svg viewBox="0 0 640 120" className="h-auto w-full" role="img" aria-label="USDT and USDC move across a network into an AI MARK wallet and a reference match">
      <rect width="640" height="120" rx="18" fill="#14291f" />
      {steps.map((label, i) => (
        <g key={label}>
          {i < steps.length - 1 ? (
            <path
              className="stroke-draw"
              d={`M${78 + i * 120} 60 H${128 + i * 120}`}
              stroke="#d4f27e"
              strokeWidth="2"
              fill="none"
            />
          ) : null}
          <rect x={16 + i * 120} y="36" width="70" height="48" rx="14" fill={i === 3 ? "#d4f27e" : "#fffefa"} />
          <text
            x={51 + i * 120}
            y="65"
            textAnchor="middle"
            fill="#14291f"
            fontSize="13"
            fontFamily="Manrope, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function LevelRings() {
  return (
    <svg viewBox="0 0 280 280" className="mx-auto h-auto w-full max-w-[280px]" role="img" aria-label="Five partner levels, L1 50 percent through L5 3 percent">
      {levels.map((level, i) => {
        const r = 118 - i * 20;
        return (
          <g key={level.id}>
            <circle cx="140" cy="140" r={r} fill="none" stroke="#d4f27e" strokeOpacity={0.35 + i * 0.1} strokeWidth="10" />
            <text x="140" y={140 - r + 4} textAnchor="middle" fill="#17261f" fontSize="12" fontFamily="Manrope, sans-serif">
              {level.id} {level.rate}
            </text>
          </g>
        );
      })}
      <circle cx="140" cy="140" r="16" fill="#14291f" />
    </svg>
  );
}

export function InvestorStreams() {
  return (
    <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label="Abstract diagram of separate revenue streams joining one company">
      <rect width="360" height="160" rx="16" fill="#e9ede3" />
      {["Products", "Retainers", "Production"].map((label, i) => (
        <g key={label}>
          <rect x="16" y={18 + i * 46} width="110" height="32" rx="16" fill="#fffefa" />
          <text x="28" y={39 + i * 46} fill="#17261f" fontSize="13" fontFamily="Manrope, sans-serif">{label}</text>
          <path
            className="stroke-draw"
            d={`M126 ${34 + i * 46} C 180 ${34 + i * 46}, 200 80, 230 80`}
            fill="none"
            stroke="#14291f"
            strokeWidth="1.6"
          />
        </g>
      ))}
      <rect x="230" y="58" width="112" height="44" rx="16" fill="#14291f" />
      <text x="246" y="85" fill="#d4f27e" fontSize="13" fontFamily="Manrope, sans-serif">AI MARK</text>
    </svg>
  );
}
