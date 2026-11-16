import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CloudRain,
  Sun,
  Flame,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  ArrowDown,
  Info,
} from "lucide-react";

interface InteractiveAnalogyProps {
  slug: "banjir" | "tanah-longsor" | "kekeringan" | "kebakaran-hutan";
  analogyText: string;
}

export default function InteractiveAnalogy({ slug, analogyText }: InteractiveAnalogyProps) {
  const [isActive, setIsActive] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);

  // Auto increment simulation step when active
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setStepProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 100);
    } else {
      setStepProgress(0);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleSimulation = () => {
    setIsActive((prev) => !prev);
  };

  const resetSimulation = () => {
    setIsActive(false);
    setStepProgress(0);
  };

  // 1. BANJIR: TANAH vs BETON
  if (slug === "banjir") {
    const soilAbsorbed = Math.min(stepProgress * 0.88, 88);
    const concreteRunoff = Math.min(stepProgress * 0.95, 95);
    const floodHeightPx = Math.min((concreteRunoff / 95) * 52, 52);

    return (
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-sky-50/90 via-emerald-50/60 to-white border border-sky-200/90 shadow-md space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200/80 text-sky-900 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Simulasi Mini: Gampangnya Begini</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
              Tanah &amp; Spons vs Lantai Beton &amp; Keramik
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isActive
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                  : "bg-sky-600 hover:bg-sky-700 text-white"
              }`}
            >
              <CloudRain className={`w-4 h-4 ${isActive ? "animate-bounce" : ""}`} />
              <span>{isActive ? "Hentikan Hujan" : "🌧️ Turunkan Hujan"}</span>
            </button>
            {isActive && (
              <button
                onClick={resetSimulation}
                title="Reset simulasi"
                className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Narrative Analogy */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-sky-100">
          💡 <strong>Analogi Alami:</strong> {analogyText}
        </p>

        {/* Interactive Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Sisi Kiri: Tanah Berpori (Spons Alam) */}
          <div className="rounded-2xl bg-white border-2 border-emerald-400/80 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-4 bg-emerald-500/10 border-b border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-bold text-sm text-emerald-950">Tanah Terbuka &amp; Rumput (Spons)</span>
              </div>
              <span className="text-[11px] font-black uppercase text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100">
                Air Masuk ke Tanah
              </span>
            </div>

            {/* Visual Box */}
            <div className="relative h-44 bg-gradient-to-b from-sky-100/40 via-emerald-50 to-amber-950/10 p-4 flex flex-col justify-between overflow-hidden">
              {/* Falling Rain Animation */}
              {isActive && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-4 bg-sky-500 rounded-full"
                      style={{ left: `${(i * 8.5) % 95}%`, top: "-10px" }}
                      animate={{ y: [0, 90] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: (i % 5) * 0.12,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Surface: Grass */}
              <div className="relative z-10 pt-2 flex items-center justify-between">
                <div className="flex gap-1 items-end">
                  <span className="text-xl">🌱</span>
                  <span className="text-lg">🌿</span>
                  <span className="text-xl">🌱</span>
                  <span className="text-lg">🪴</span>
                  <span className="text-xl">🌿</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-lg border border-emerald-200">
                  Genangan: 0 cm (Nol)
                </span>
              </div>

              {/* Porous Soil & Percolation */}
              <div className="relative z-10 space-y-1.5 mt-auto">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-emerald-800 font-bold">
                    <ArrowDown className={`w-3.5 h-3.5 ${isActive ? "animate-bounce" : ""}`} />
                    Air Meresap ke Akifer:
                  </span>
                  <span className="font-mono font-black text-emerald-700">{Math.round(soilAbsorbed)}%</span>
                </div>
                {/* Progress bar of absorption */}
                <div className="h-3 w-full bg-emerald-950/10 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                    style={{ width: `${soilAbsorbed}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Permukaan tanah berpori</span>
                  <span className="text-emerald-700 font-bold">Sumur warga terisi air bersih</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-[11px] font-medium text-emerald-900 border-t border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Air meresap 85%+ menjadi cadangan air tanah, mencegah banjir di hilir.</span>
            </div>
          </div>

          {/* Sisi Kanan: Beton & Keramik (Lantai Kedap) */}
          <div className="rounded-2xl bg-white border-2 border-rose-300 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-4 bg-rose-500/10 border-b border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="font-bold text-sm text-rose-950">Beton &amp; Aspal Padat (Lantai Kedap)</span>
              </div>
              <span className="text-[11px] font-black uppercase text-rose-700 px-2 py-0.5 rounded-full bg-rose-100">
                Air Mengalir Deras
              </span>
            </div>

            {/* Visual Box */}
            <div className="relative h-44 bg-gradient-to-b from-slate-100 to-slate-200 p-4 flex flex-col justify-between overflow-hidden">
              {/* Falling Rain Animation */}
              {isActive && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-4 bg-sky-600 rounded-full"
                      style={{ left: `${(i * 8.5) % 95}%`, top: "-10px" }}
                      animate={{ y: [0, 80] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: (i % 5) * 0.12,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Rising Flood Surface Puddle */}
              <motion.div
                className="absolute bottom-10 left-0 right-0 bg-sky-500/40 border-t-2 border-sky-400 backdrop-blur-xs flex items-center justify-center transition-all duration-300 z-10"
                style={{ height: `${floodHeightPx}px` }}
              >
                {floodHeightPx > 15 && (
                  <span className="text-[10px] font-black text-white bg-rose-600/90 px-2 py-0.5 rounded-full shadow-xs">
                    Air Meluap: {Math.round(floodHeightPx / 2.5)} cm!
                  </span>
                )}
              </motion.div>

              {/* Concrete Base */}
              <div className="relative z-10 pt-2 flex items-center justify-between">
                <div className="text-xl">🏢 🏠 🧱 🚗</div>
                <span className="text-[10px] font-bold text-rose-800 bg-white/90 px-2 py-0.5 rounded-lg border border-rose-200">
                  Infiltrasi: 0% (Kedap)
                </span>
              </div>

              {/* Concrete impermeable layer */}
              <div className="relative z-20 space-y-1.5 mt-auto">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="text-rose-800 font-bold">Air yang Mengalir di Permukaan:</span>
                  <span className="font-mono font-black text-rose-600">{Math.round(concreteRunoff)}%</span>
                </div>
                {/* Progress bar of runoff */}
                <div className="h-3 w-full bg-slate-300 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all"
                    style={{ width: `${concreteRunoff}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Permukaan tanpa resapan</span>
                  <span className="text-rose-700 font-bold">Air langsung menenggelamkan jalan</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-rose-50 text-[11px] font-medium text-rose-900 border-t border-rose-200 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Lebih dari 90% air mengalir deras ke selokan dan sungai.</span>
            </div>
          </div>
        </div>

        {/* Action Takeaway */}
        <div className="p-3.5 rounded-xl bg-sky-100/60 border border-sky-200 text-xs text-sky-950 flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-700 flex-shrink-0" />
          <span>
            <strong>Solusi Pelajar:</strong> Buat lubang biopori dan pertahankan halaman bertanah agar rumah kita bertindak sebagai spons alami penangkap air!
          </span>
        </div>
      </div>
    );
  }

  // 2. TANAH LONGSOR: LERENG BERAKAR vs GUNDUL
  if (slug === "tanah-longsor") {
    const rootStability = Math.min(85 + stepProgress * 0.1, 95);
    const bareSliding = Math.min(stepProgress * 1.1, 100);

    return (
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50/90 via-stone-50 to-white border border-amber-300/80 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulasi Mini: Gampangnya Begini</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
              Lereng Berakar (Vetiver) vs Lereng Gundul
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isActive
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-stone-800 hover:bg-stone-900 text-amber-100"
              }`}
            >
              <CloudRain className={`w-4 h-4 ${isActive ? "animate-bounce" : ""}`} />
              <span>{isActive ? "Hentikan Hujan" : "🌧️ Guyur Hujan Deras"}</span>
            </button>
            {isActive && (
              <button
                onClick={resetSimulation}
                className="p-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-amber-200">
          💡 <strong>Analogi Alami:</strong> {analogyText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Berakar */}
          <div className="rounded-2xl bg-white border-2 border-emerald-400 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-950">Lereng dengan Akar Pohon &amp; Vetiver</span>
              <span className="text-[10px] font-black uppercase text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100">
                Stabil 95%
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-sky-50 via-amber-50 to-amber-100 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🌲 🌳 🌾</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Akar Mengikat Tanah
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-emerald-900">
                  <span>Kekuatan Menahan Beban:</span>
                  <span>{Math.round(rootStability)}%</span>
                </div>
                <div className="h-3 w-full bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rootStability}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-[11px] font-medium text-emerald-900 border-t border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Akar bertindak sebagai paku bumi biologis yang menahan massa tanah tetap menyatu.</span>
            </div>
          </div>

          {/* Gundul */}
          <div className="rounded-2xl bg-white border-2 border-rose-300 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
              <span className="font-bold text-sm text-rose-950">Lereng Gundul / Tebing Terpotong</span>
              <span className="text-[10px] font-black uppercase text-rose-800 px-2 py-0.5 rounded-full bg-rose-100">
                Bahaya Longsor
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-stone-100 to-amber-200/80 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">⚠️ 🪨 🏚️</span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                  Bidang Gelincir Terbentuk
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span>Tingkat Pergeseran Massa Tanah:</span>
                  <span>{Math.round(bareSliding)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: `${bareSliding}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-rose-50 text-[11px] font-medium text-rose-900 border-t border-rose-200 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Air melumasi tanah tanpa penahan akar, menyebabkan longsoran masif menimbun lembah.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. KEKERINGAN: TANAH BERMULSA vs TERBUKA
  if (slug === "kekeringan") {
    const mulsaMoisture = Math.max(80 - stepProgress * 0.15, 68);
    const bareEvaporation = Math.min(stepProgress * 0.9, 90);

    return (
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50/70 to-white border border-amber-300 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulasi Mini: Gampangnya Begini</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
              Tanah Bertutup Mulsa Daun vs Tanah Terbuka Terik
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isActive
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-amber-500 hover:bg-amber-600 text-slate-950"
              }`}
            >
              <Sun className={`w-4 h-4 ${isActive ? "animate-spin" : ""}`} />
              <span>{isActive ? "Redupkan Terik" : "☀️ Nyalakan Terik Matahari"}</span>
            </button>
            {isActive && (
              <button
                onClick={resetSimulation}
                className="p-2.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-amber-200">
          💡 <strong>Analogi Alami:</strong> {analogyText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Bermulsa */}
          <div className="rounded-2xl bg-white border-2 border-emerald-400 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-950">Tanah Tertutup Mulsa (Daun Kering)</span>
              <span className="text-[10px] font-black uppercase text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100">
                Kelembapan Terjaga
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-amber-50 via-emerald-50 to-amber-950/20 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🍂 🍂 🌾 🪴</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Mulsa Menahan Evaporasi
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-emerald-900">
                  <span>Kadar Air Tanah Tersimpan:</span>
                  <span>{Math.round(mulsaMoisture)}%</span>
                </div>
                <div className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${mulsaMoisture}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-[11px] font-medium text-emerald-900 border-t border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Suhu tanah tetap sejuk dan mikroba tanah tetap hidup menghidupkan tanaman.</span>
            </div>
          </div>

          {/* Terbuka */}
          <div className="rounded-2xl bg-white border-2 border-rose-300 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
              <span className="font-bold text-sm text-rose-950">Tanah Gundul Terpapar Terik Langsung</span>
              <span className="text-[10px] font-black uppercase text-rose-800 px-2 py-0.5 rounded-full bg-rose-100">
                Penguapan Cepat
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-yellow-100 to-amber-200 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">☀️ 🌵 💨</span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                  Tanah Retak &amp; Berdebu
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span>Laju Penguapan (Air Hilang):</span>
                  <span>{Math.round(bareEvaporation)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: `${bareEvaporation}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-rose-50 text-[11px] font-medium text-rose-900 border-t border-rose-200 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Air cepat menguap ke udara tanpa sempat terserap akar, memicu gagal panen.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. KARHUTLA: GAMBUT BASAH (SEKAT KANAL) vs GAMBUT KERING
  if (slug === "kebakaran-hutan") {
    const wetSafety = Math.max(95 - stepProgress * 0.05, 90);
    const dryBurn = Math.min(stepProgress * 1.0, 95);

    return (
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-rose-50 via-orange-50/60 to-white border border-rose-200 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-200 text-rose-900 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              <span>Simulasi Mini: Gampangnya Begini</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
              Gambut Basah (Disekat Kanal) vs Gambut Kering Terbuka
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isActive
                  ? "bg-stone-800 hover:bg-stone-900 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              <Flame className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
              <span>{isActive ? "Padamkan Pengujian" : "🔥 Uji Percikan Bara"}</span>
            </button>
            {isActive && (
              <button
                onClick={resetSimulation}
                className="p-2.5 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-900 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-rose-200">
          💡 <strong>Analogi Alami:</strong> {analogyText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Basah */}
          <div className="rounded-2xl bg-white border-2 border-emerald-400 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-950">Gambut Terjaga Basah (Sekat Kanal)</span>
              <span className="text-[10px] font-black uppercase text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100">
                Aman Dari Bara
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-sky-50 via-teal-50 to-emerald-950/20 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">💧 🪵 🌿 🦧</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Muka Air Tinggi (&lt; 40cm)
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-emerald-900">
                  <span>Ketahanan Terhadap Percikan Api:</span>
                  <span>{Math.round(wetSafety)}%</span>
                </div>
                <div className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${wetSafety}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-[11px] font-medium text-emerald-900 border-t border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Bara rokok atau api unggun langsung mendesis padam terkena kandungan air gambut.</span>
            </div>
          </div>

          {/* Kering */}
          <div className="rounded-2xl bg-white border-2 border-rose-400 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-3.5 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
              <span className="font-bold text-sm text-rose-950">Gambut Kering Dikeringkan Kanal</span>
              <span className="text-[10px] font-black uppercase text-rose-800 px-2 py-0.5 rounded-full bg-rose-100">
                Bara Bawah Tanah
              </span>
            </div>
            <div className="relative h-44 bg-gradient-to-b from-amber-100 to-stone-800 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-2xl">🔥 💨 🌫️</span>
                <span className="text-[10px] font-bold text-rose-200 bg-rose-950 px-2 py-0.5 rounded-md">
                  Smoldering (Asap Tebal)
                </span>
              </div>
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-xs font-bold text-rose-200">
                  <span>Penyebaran Api Bawah Tanah:</span>
                  <span>{Math.round(dryBurn)}%</span>
                </div>
                <div className="h-3 w-full bg-stone-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full" style={{ width: `${dryBurn}%` }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-rose-50 text-[11px] font-medium text-rose-900 border-t border-rose-200 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Api menjalar tanpa terlihat di kedalaman 1-3 meter, melepas jutaan ton emisi karbon.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
