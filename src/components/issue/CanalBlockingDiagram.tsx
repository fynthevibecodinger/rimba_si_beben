import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Droplets,
  CheckCircle2,
  Circle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

interface ConstructionStep {
  title: string;
  desc: string;
  graphic: string;
}

const steps: ConstructionStep[] = [
  {
    title: "1. Pemetaan Kanal Drainase Kering",
    desc: "Mengidentifikasi saluran atau parit yang mengeringkan kubah gambut menuju sungai utama.",
    graphic: "📉 Saluran terbuka membuat air mengalir keluar bebas, gambut menyusut dan mudah terbakar.",
  },
  {
    title: "2. Pemasangan Cerucuk Kayu Gelam Lokal",
    desc: "Menancapkan tiang-tiang kayu gelam rapat melintang di dasar kanal sebagai pondasi alami yang tahan air.",
    graphic: "🪵 Kayu gelam kuat dalam kondisi terendam air dan tidak merusak keasaman gambut.",
  },
  {
    title: "3. Penimbunan Karung Pasir & Tanah Lempung",
    desc: "Menyusun karung tanah liat padat di antara cerucuk kayu untuk menahan aliran deras air kanal.",
    graphic: "🧱 Dinding sekat menahan laju air dan membentuk kolam retensi alami di hulu kanal.",
  },
  {
    title: "4. Pembasahan Kembali (Rewetting) Tercapai",
    desc: "Muka air tanah naik hingga kurang dari 40 cm di bawah permukaan, mengembalikan fungsi spons alami gambut.",
    graphic: "💧 Hutan gambut kembali basah kuyup, mencegah kebakaran hutan menjalar selamanya!",
  },
];

export default function CanalBlockingDiagram() {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const doneCount = Object.values(completedSteps).filter(Boolean).length;
  const isAllDone = doneCount === steps.length;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-stone-900 text-white border-2 border-emerald-500/30 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-emerald-400/30">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contoh Aksi Nyata</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-white">
            Simulasi Pembangunan Sekat Kanal (Canal Blocking)
          </h3>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            Pelajari bagaimana bendungan sederhana menahan air dan membasahi kembali kubah gambut (rewetting).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-300">
            Tahapan Selesai: {doneCount} / {steps.length}
          </span>
          {doneCount > 1 && (
            <button
              onClick={() => setCompletedSteps({ 0: true })}
              className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-xs transition-colors"
              title="Reset tahapan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Construction Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-stone-800 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          initial={{ width: "25%" }}
          animate={{ width: `${(doneCount / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Visual Diagram Box */}
      <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between text-xs font-bold border-b border-emerald-500/20 pb-2">
          <span className="text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Kondisi Kanal &amp; Kelembapan Gambut</span>
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-black ${
              isAllDone
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/40"
                : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
            }`}
          >
            {isAllDone ? "💧 PEMBASAHAN OPTIMAL (AMAN)" : "⚙️ DALAM PROSES PENYEKATAN"}
          </span>
        </div>

        {/* Cross-section canal diagram */}
        <div className="h-40 rounded-xl bg-gradient-to-b from-stone-900 to-teal-950/80 border border-emerald-800/40 p-4 relative flex flex-col justify-between overflow-hidden">
          {/* Surface Trees */}
          <div className="flex justify-between items-end relative z-10">
            <span className="text-2xl">🌲 🌳 🌾</span>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-400/30">
              Kubah Gambut Terlindungi
            </span>
            <span className="text-2xl">🌾 🌳 🌲</span>
          </div>

          {/* Dynamic Water Table in Canal */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/90 via-sky-800/70 to-cyan-500/50 border-t-2 border-dashed border-cyan-400 transition-all duration-500"
            style={{
              height: `${Math.min(90, 25 + doneCount * 16)}%`,
            }}
          >
            <div className="p-2 text-right text-[10px] text-cyan-200 font-bold">
              Tinggi Muka Air Naik: +{(doneCount * 15)} cm
            </div>
          </motion.div>

          {/* Canal Dam Barrier (Sekat Kanal) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-28 bg-gradient-to-t from-amber-950 to-stone-700 border-2 border-amber-500/60 rounded-t-lg z-15 flex flex-col items-center justify-center p-1 shadow-lg">
            <span className="text-[9px] font-black uppercase text-amber-200 text-center leading-tight">
              Sekat Kanal
            </span>
            <span className="text-xs mt-1">🪵🧱</span>
          </div>

          <div className="relative z-10 flex justify-between text-[10px] text-stone-400 font-mono">
            <span>Hulu Kanal (Air Tertahan)</span>
            <span>Hilir Kanal</span>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Construction List */}
      <div className="space-y-2.5">
        {steps.map((st, i) => {
          const isDone = !!completedSteps[i];
          return (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 select-none ${
                isDone
                  ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-100"
                  : "bg-stone-800/50 border-stone-700/60 text-stone-300 hover:bg-stone-800 hover:border-stone-600"
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-500 flex-shrink-0" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-white">{st.title}</h5>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {isDone ? "Selesai" : "Klik untuk selesaikan"}
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                  {st.desc}
                </p>
                <div className="text-[11px] text-amber-300 font-medium pt-0.5">
                  {st.graphic}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
