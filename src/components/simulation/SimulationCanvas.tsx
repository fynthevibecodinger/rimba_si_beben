import { useMemo } from "react";

export type SimulationScenario = "banjir" | "longsor" | "kekeringan" | "karhutla";

interface SimulationCanvasProps {
  scenario: SimulationScenario;
  weatherIntensity: number; // 0 to 100
  actions: Record<string, boolean>;
  waterAbsorption: number; // 0 to 100
  soilStrength: number; // 0 to 100
  ecosystemHealth: number; // 0 to 100
}

export default function SimulationCanvas({
  scenario,
  weatherIntensity,
  actions,
  waterAbsorption,
  soilStrength,
  ecosystemHealth,
}: SimulationCanvasProps) {
  // Compute visual values
  const rainOpacity = useMemo(() => {
    if (scenario === "kekeringan") return 0;
    return Math.min(Math.max(weatherIntensity / 100, 0.1), 0.95);
  }, [scenario, weatherIntensity]);

  const waterLevelHeight = useMemo(() => {
    // Higher weather intensity + low absorption = deep flood (0 to 120px)
    const factor = (weatherIntensity / 100) * (1 - waterAbsorption / 100);
    return Math.round(factor * 110);
  }, [weatherIntensity, waterAbsorption]);

  const heatGlow = useMemo(() => {
    if (scenario !== "kekeringan" && scenario !== "karhutla") return 0;
    return weatherIntensity / 100;
  }, [scenario, weatherIntensity]);

  return (
    <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-emerald-900/15 shadow-2xl relative bg-slate-900 select-none">
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGradBanjir" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="skyGradDrought" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          <linearGradient id="skyGradKarhutla" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#450a0a" />
            <stop offset="50%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="mudWaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. SKY BACKGROUND */}
        {scenario === "kekeringan" ? (
          <rect width="800" height="450" fill="url(#skyGradDrought)" />
        ) : scenario === "karhutla" ? (
          <rect width="800" height="450" fill="url(#skyGradKarhutla)" />
        ) : (
          <rect width="800" height="450" fill="url(#skyGradBanjir)" />
        )}

        {/* Sun in Drought/Normal */}
        {scenario === "kekeringan" && (
          <g transform={`scale(${1 + heatGlow * 0.4}) translate(600, 70)`} style={{ transformOrigin: "600px 70px" }}>
            <circle cx="0" cy="0" r="45" fill="#fef08a" opacity="0.9" />
            <circle cx="0" cy="0" r="70" fill="#fde047" opacity="0.35" />
            <circle cx="0" cy="0" r="110" fill="#fbbf24" opacity="0.15" />
          </g>
        )}

        {/* ========================================================= */}
        {/* SCENARIO 1: BANJIR (Perkotaan & Sungai) */}
        {/* ========================================================= */}
        {scenario === "banjir" && (
          <g>
            {/* Background Mountains */}
            <path d="M-20 280 L120 180 L250 290 L420 160 L620 300 L820 200 L820 350 L-20 350 Z" fill="#334155" opacity="0.5" />

            {/* City Ground / Embankment */}
            {/* Concrete vs Soil ground */}
            {actions.betonPenuh ? (
              <path d="M0 310 L800 310 L800 450 L0 450 Z" fill="#64748b" />
            ) : (
              <path d="M0 310 L800 310 L800 450 L0 450 Z" fill="#2d6a4f" />
            )}

            {/* River Channel in the Middle */}
            <path d="M260 310 L540 310 L490 450 L310 450 Z" fill="#1e293b" />

            {/* River Water Base */}
            <path d="M270 340 L530 340 L485 450 L315 450 Z" fill="url(#waterGrad)" />

            {/* City Buildings Left */}
            <g transform="translate(40, 180)">
              <rect x="0" y="40" width="55" height="90" rx="3" fill="#475569" />
              <rect x="65" y="10" width="70" height="120" rx="3" fill="#334155" />
              <rect x="145" y="55" width="60" height="75" rx="3" fill="#64748b" />
              {/* Windows */}
              <circle cx="20" cy="65" r="4" fill="#fef08a" opacity="0.8" />
              <circle cx="40" cy="65" r="4" fill="#fef08a" opacity="0.8" />
              <circle cx="90" cy="35" r="5" fill="#fef08a" opacity="0.8" />
              <circle cx="115" cy="35" r="5" fill="#fef08a" opacity="0.8" />
            </g>

            {/* Trees (Positive Action: tanamPohon) */}
            {actions.tanamPohon && (
              <g transform="translate(200, 245)">
                <circle cx="0" cy="0" r="28" fill="#15803d" />
                <rect x="-4" y="25" width="8" height="40" fill="#78350f" />
                <circle cx="400" cy="0" r="28" fill="#15803d" />
                <rect x="396" y="25" width="8" height="40" fill="#78350f" />
              </g>
            )}

            {/* Biopori Holes Indicators */}
            {actions.biopori && (
              <g transform="translate(180, 315)">
                <ellipse cx="0" cy="0" rx="7" ry="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <ellipse cx="40" cy="15" rx="7" ry="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <ellipse cx="420" cy="5" rx="7" ry="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <ellipse cx="460" cy="20" rx="7" ry="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              </g>
            )}

            {/* Trash in River (Negative Action: sampahSungai) */}
            {actions.sampahSungai && (
              <g transform="translate(360, 345)" fill="#e11d48">
                <rect x="0" y="0" width="16" height="8" rx="2" fill="#e2e8f0" />
                <circle cx="35" cy="5" r="5" fill="#facc15" />
                <rect x="60" y="-2" width="22" height="10" rx="3" fill="#ef4444" />
              </g>
            )}

            {/* Dynamic Flood Overlay Level */}
            {waterLevelHeight > 5 && (
              <g>
                <rect
                  x="0"
                  y={310 - waterLevelHeight}
                  width="800"
                  height={140 + waterLevelHeight}
                  fill="url(#waterGrad)"
                  opacity={actions.sampahSungai ? 0.9 : 0.75}
                />
                {/* Surface ripple waves */}
                <path
                  d={`M0 ${310 - waterLevelHeight} Q200 ${305 - waterLevelHeight} 400 ${310 - waterLevelHeight} T800 ${310 - waterLevelHeight}`}
                  stroke="#ffffff"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.7"
                />
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* SCENARIO 2: TANAH LONGSOR (Lereng Bukit) */}
        {/* ========================================================= */}
        {scenario === "longsor" && (
          <g>
            {/* Steep Hill Slope */}
            <path
              d={actions.potongTebing ? "M0 160 L380 160 L400 340 L800 380 L800 450 L0 450 Z" : "M0 140 L500 350 L800 380 L800 450 L0 450 Z"}
              fill={soilStrength > 50 ? "#1b4332" : "#78350f"}
            />

            {/* Bedrock slip surface layer */}
            <path d="M0 240 L500 380 L800 410" stroke="#334155" strokeWidth="6" strokeDasharray="8 6" fill="none" opacity="0.7" />

            {/* Trees or Deforestation */}
            {!actions.tebangLiar ? (
              <g fill="#15803d">
                <circle cx="80" cy="120" r="22" />
                <circle cx="140" cy="160" r="20" />
                <circle cx="210" cy="205" r="24" />
                <circle cx="280" cy="245" r="22" />
                <circle cx="350" cy="285" r="20" />
              </g>
            ) : (
              <g fill="#451a03">
                {/* Tree stumps */}
                <rect x="75" y="140" width="12" height="10" rx="2" />
                <rect x="135" y="180" width="12" height="10" rx="2" />
                <rect x="205" y="225" width="12" height="10" rx="2" />
                <rect x="275" y="265" width="12" height="10" rx="2" />
              </g>
            )}

            {/* Vetiver Roots (Positive Action) */}
            {actions.rumputVetiver && (
              <g stroke="#10b981" strokeWidth="2.5">
                <path d="M120 180 L120 240 M120 240 L110 260 M120 240 L130 260" />
                <path d="M190 220 L190 280 M190 280 L180 300 M190 280 L200 300" />
                <path d="M260 260 L260 320 M260 320 L250 340 M260 320 L270 340" />
              </g>
            )}

            {/* Terasering (Positive Action) */}
            {actions.terasering && (
              <g stroke="#52b788" strokeWidth="4" fill="none">
                <path d="M100 170 h40 v25 h40 v25 h40 v25 h40 v25" />
              </g>
            )}

            {/* Houses at the bottom of the slope */}
            <g transform="translate(620, 330)">
              <rect x="0" y="15" width="40" height="35" fill="#f8fafc" rx="2" />
              <polygon points="-5,15 20,-5 45,15" fill="#b91c1c" />
              <rect x="60" y="10" width="45" height="40" fill="#f8fafc" rx="2" />
              <polygon points="55,10 82.5,-12 110,10" fill="#b91c1c" />
            </g>

            {/* Mudslide Trigger when soilStrength is critical & rain is high */}
            {soilStrength < 40 && weatherIntensity > 50 && (
              <g>
                <path d="M220 220 Q320 270 450 330 Q600 380 720 390 L800 450 L300 450 Z" fill="url(#mudWaterGrad)" opacity="0.9" />
                <text x="360" y="290" fill="#fef08a" fontSize="16" fontWeight="bold" transform="rotate(22 360 290)">
                  ⚠️ BAHAYA LONGSOR AKTIF
                </text>
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* SCENARIO 3: KEKERINGAN (Desa & Lahan Pertanian) */}
        {/* ========================================================= */}
        {scenario === "kekeringan" && (
          <g>
            {/* Parched Earth vs Green Earth */}
            <path d="M0 260 Q400 240 800 270 L800 450 L0 450 Z" fill={ecosystemHealth > 50 ? "#3f6212" : "#92400e"} />

            {/* Soil Cracks if very dry */}
            {ecosystemHealth < 40 && (
              <g stroke="#451a03" strokeWidth="2.5" fill="none" opacity="0.8">
                <path d="M120 320 l30 20 l-10 25 l35 15" />
                <path d="M320 340 l20 30 l-15 20 l40 10" />
                <path d="M540 310 l25 25 l-20 20 l30 35" />
                <path d="M680 350 l30 15 l-10 25" />
              </g>
            )}

            {/* Crops (Padi/Jagung) */}
            <g fill={ecosystemHealth > 50 ? "#84cc16" : "#b45309"}>
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d={`M${80 + i * 55} 290 Q${90 + i * 55} 250 ${75 + i * 55} 230 Q${100 + i * 55} 260 ${80 + i * 55} 290`}
                />
              ))}
            </g>

            {/* Rainwater Harvesting Tank (Positive: tandonAir) */}
            {actions.tandonAir && (
              <g transform="translate(680, 220)">
                <rect x="0" y="0" width="60" height="75" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
                <rect x="5" y="10" width="50" height="55" rx="4" fill="#0369a1" />
                <path d="M15 35 h30" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
                <text x="14" y="55" fill="#ffffff" fontSize="10" fontWeight="bold">TANDON</text>
              </g>
            )}

            {/* Precision Drip Irrigation (Positive: irigasiTetes) */}
            {actions.irigasiTetes && (
              <g stroke="#38bdf8" strokeWidth="2.5" fill="none">
                <path d="M60 300 H720" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle key={i} cx={80 + i * 55} cy="305" r="3" fill="#38bdf8" />
                ))}
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* SCENARIO 4: KARHUTLA (Hutan Rawa Gambut) */}
        {/* ========================================================= */}
        {scenario === "karhutla" && (
          <g>
            {/* Peat Surface Layer */}
            <path d="M0 240 L800 240 L800 450 L0 450 Z" fill="#29180f" />

            {/* Peat Water Table Level */}
            <rect
              x="0"
              y={actions.sekatGambut ? 270 : 380}
              width="800"
              height="180"
              fill="#0f3728"
              opacity="0.8"
            />
            <text x="30" y={actions.sekatGambut ? 290 : 400} fill="#6ee7b7" fontSize="12" fontWeight="bold">
              {actions.sekatGambut ? "Muka Air Gambut Basah (Aman)" : "Muka Air Kritis Turun (Kering)"}
            </text>

            {/* Peat Canal / Parit */}
            <path d="M350 240 L450 240 L460 450 L340 450 Z" fill="#1c1917" />
            <path d="M360 270 L440 270 L450 450 L350 450 Z" fill={actions.sekatGambut ? "#0d9488" : "#44403c"} />

            {/* Sekat Kanal (Positive Action) */}
            {actions.sekatGambut && (
              <g transform="translate(350, 310)">
                <rect x="0" y="0" width="100" height="25" fill="#78350f" stroke="#b45309" strokeWidth="3" rx="4" />
                <circle cx="50" cy="12" r="5" fill="#f59e0b" />
                <text x="18" y="42" fill="#fde68a" fontSize="11" fontWeight="bold">SEKAT KANAL</text>
              </g>
            )}

            {/* Forest Vegetation */}
            <g fill="#14532d">
              <circle cx="100" cy="170" r="35" />
              <circle cx="170" cy="190" r="30" />
              <circle cx="620" cy="175" r="32" />
              <circle cx="700" cy="190" r="36" />
            </g>

            {/* Fire and Smoldering Smoke when dry and baraApi is on */}
            {(actions.bakarLahan || (weatherIntensity > 60 && !actions.sekatGambut)) && (
              <g>
                {/* Smoke haze overlay */}
                <rect width="800" height="450" fill="#78350f" opacity="0.45" />

                {/* Subsurface Peat Embers */}
                <ellipse cx="220" cy="280" rx="40" ry="15" fill="#ea580c" opacity="0.9" />
                <ellipse cx="580" cy="275" rx="55" ry="18" fill="#ea580c" opacity="0.9" />

                {/* Fire Flames */}
                <path d="M210 270 Q220 230 230 270 Z" fill="#facc15" />
                <path d="M570 265 Q585 220 600 265 Z" fill="#facc15" />
              </g>
            )}
          </g>
        )}

        {/* RAIN DROPS OVERLAY FOR WET SCENARIOS */}
        {scenario !== "kekeringan" && rainOpacity > 0.2 && (
          <g stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" opacity={rainOpacity}>
            {Array.from({ length: 45 }).map((_, i) => (
              <line
                key={i}
                x1={(i * 37) % 800}
                y1={(i * 29) % 360}
                x2={((i * 37) % 800) - 8}
                y2={((i * 29) % 360) + 24}
              />
            ))}
          </g>
        )}

        {/* HUD OVERLAY BADGE */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="220" height="75" rx="16" fill="#0f172a" opacity="0.85" stroke="#334155" strokeWidth="1.5" />
          <text x="14" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            SKENARIO AKTIF:
          </text>
          <text x="14" y="44" fill="#ffffff" fontSize="15" fontWeight="900" fontFamily="Fredoka, sans-serif">
            {scenario.toUpperCase()}
          </text>
          <text x="14" y="62" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
            Intensitas Cuaca: {weatherIntensity}%
          </text>
        </g>
      </svg>
    </div>
  );
}
