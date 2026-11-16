import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind,
  Eye,
  HeartPulse,
  GraduationCap,
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
} from "lucide-react";

interface ISPULevel {
  id: string;
  name: string;
  range: string;
  pm25: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  visibility: string;
  healthImpact: string;
  schoolAction: string;
  maskRecommendation: string;
  skyGradient: string;
  hazeOpacity: number;
}

const ispuLevels: ISPULevel[] = [
  {
    id: "baik",
    name: "Baik",
    range: "0 – 50",
    pm25: "0 – 15 µg/m³",
    color: "#10b981",
    badgeBg: "bg-emerald-500/20 text-emerald-300",
    badgeBorder: "border-emerald-400/30",
    visibility: "> 10 km (Sangat jernih, langit biru cerah)",
    healthImpact: "Kualitas udara optimal. Tidak ada risiko kesehatan bagi seluruh pelajar.",
    schoolAction: "Aktivitas belajar dan olahraga luar ruangan berlangsung normal 100%.",
    maskRecommendation: "Tidak memerlukan masker.",
    skyGradient: "from-sky-400 via-sky-300 to-emerald-100",
    hazeOpacity: 0,
  },
  {
    id: "sedang",
    name: "Sedang",
    range: "51 – 100",
    pm25: "16 – 55 µg/m³",
    color: "#0ea5e9",
    badgeBg: "bg-sky-500/20 text-sky-300",
    badgeBorder: "border-sky-400/30",
    visibility: "5 – 8 km (Sedikit berkabut tipis)",
    healthImpact: "Aman untuk sebagian besar orang. Siswa dengan asma perlu mulai berhati-hati.",
    schoolAction: "Kegiatan sekolah tetap berlangsung normal.",
    maskRecommendation: "Masker kain opsional untuk penderita alergi debu.",
    skyGradient: "from-slate-400 via-sky-200 to-amber-50",
    hazeOpacity: 0.2,
  },
  {
    id: "tidak-sehat",
    name: "Tidak Sehat",
    range: "101 – 200",
    pm25: "56 – 150 µg/m³",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/20 text-amber-300",
    badgeBorder: "border-amber-400/30",
    visibility: "1 – 3 km (Langit kelabu buram, matahari tampak redup)",
    healthImpact: "Mata mulai terasa perih, tenggorokan gatal, batuk pada anak-anak.",
    schoolAction: "Upacara bendera, jam istirahat, dan olahraga di luar ruangan ditiadakan.",
    maskRecommendation: "Wajib menggunakan masker standar N95 atau KF94.",
    skyGradient: "from-amber-700/60 via-amber-600/40 to-stone-400",
    hazeOpacity: 0.5,
  },
  {
    id: "sangat-tidak-sehat",
    name: "Sangat Tidak Sehat",
    range: "201 – 300",
    pm25: "151 – 250 µg/m³",
    color: "#ef4444",
    badgeBg: "bg-rose-500/20 text-rose-300",
    badgeBorder: "border-rose-400/30",
    visibility: "500 m – 1 km (Kabut asap menyengat bau hangus gambut)",
    healthImpact: "Penurunan fungsi paru, risiko serangan asma akut melonjak, sesak napas berat.",
    schoolAction: "Jam belajar dipersingkat atau dialihkan secara daring (belajar di rumah).",
    maskRecommendation: "Wajib masker N95 berfilter rapat bahkan di dalam ruangan berongga.",
    skyGradient: "from-red-950 via-orange-900/80 to-amber-900/60",
    hazeOpacity: 0.75,
  },
  {
    id: "berbahaya",
    name: "Berbahaya",
    range: "> 300",
    pm25: "> 250 µg/m³ (Toksik)",
    color: "#831843",
    badgeBg: "bg-pink-950/60 text-rose-200",
    badgeBorder: "border-rose-500/60",
    visibility: "< 200 meter (Langit gelap oranye-kelabu pekat, jarak pandang kritis)",
    healthImpact: "Darurat toksik berbahaya! Partikel racun PM2.5 menembus langsung ke aliran darah.",
    schoolAction: "SEKOLAH DILIBURKAN TOTAL. Warga dievakuasi ke ruang aman ber-filter HEPA.",
    maskRecommendation: "Masker N95/KF94 wajib mutlak. Segel celah ventilasi rumah dengan kain basah.",
    skyGradient: "from-rose-950 via-stone-950 to-orange-950",
    hazeOpacity: 0.92,
  },
];

export default function ISPUSimulator() {
  const [selectedLevel, setSelectedLevel] = useState<ISPULevel>(ispuLevels[2]); // Default: Tidak Sehat

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border-2 border-amber-500/30 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-amber-400/30">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulator Interaktif Dampak Karhutla</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-white">
            Indeks Standar Pencemar Udara (ISPU / AQI)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Klik tingkatan indeks udara di bawah untuk menyimulasikan jarak pandang, dampak kesehatan, dan kebijakan sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Tingkat Terpilih:</span>
          <span
            className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm"
            style={{ backgroundColor: `${selectedLevel.color}25`, color: selectedLevel.color }}
          >
            {selectedLevel.name}
          </span>
        </div>
      </div>

      {/* Interactive Level Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {ispuLevels.map((lvl) => {
          const isSelected = selectedLevel.id === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center gap-1 select-none ${
                isSelected
                  ? "bg-slate-800 shadow-md scale-102"
                  : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 text-slate-300"
              }`}
              style={{
                borderColor: isSelected ? lvl.color : undefined,
              }}
            >
              <span
                className="w-3 h-3 rounded-full mb-0.5"
                style={{ backgroundColor: lvl.color }}
              />
              <span className="text-xs font-black text-white">{lvl.name}</span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">
                ISPU {lvl.range}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Simulated Skyline Viewport */}
      <div className="rounded-2xl border-2 border-slate-700 overflow-hidden relative shadow-inner">
        {/* Background Sky Viewport */}
        <div
          className={`h-48 sm:h-56 bg-gradient-to-b ${selectedLevel.skyGradient} transition-colors duration-700 relative p-4 flex flex-col justify-between overflow-hidden`}
        >
          {/* Simulated Haze Smoke Overlay */}
          <motion.div
            className="absolute inset-0 bg-stone-900/80 pointer-events-none transition-opacity duration-700"
            style={{ opacity: selectedLevel.hazeOpacity }}
          />

          {/* Drifting PM2.5 Micro Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: Math.round(selectedLevel.hazeOpacity * 40) }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/60 filter blur-[0.5px]"
                style={{
                  left: `${(i * 7) % 96}%`,
                  top: `${(i * 11) % 85}%`,
                }}
                animate={{
                  x: [0, (i % 2 === 0 ? 25 : -25), 0],
                  y: [0, (i % 3 === 0 ? 15 : -15), 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Top Info Bar inside Viewport */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-white border border-white/20">
              Simulasi Pandangan Mata Pelajar di Lingkungan Sekolah
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-black shadow-md border"
              style={{
                backgroundColor: `${selectedLevel.color}30`,
                borderColor: selectedLevel.color,
                color: selectedLevel.color,
              }}
            >
              PM2.5: {selectedLevel.pm25}
            </span>
          </div>

          {/* Skyline Silhouette (Buildings & Trees that fade with haze) */}
          <div
            className="relative z-10 flex items-end justify-between transition-opacity duration-700"
            style={{
              opacity: Math.max(0.08, 1 - selectedLevel.hazeOpacity * 0.92),
            }}
          >
            {/* Left School Building */}
            <div className="text-3xl sm:text-4xl">🏫 📚 🌳</div>
            {/* Center Skyline */}
            <div className="text-2xl sm:text-3xl">🏢 🏢 🏣 🌲</div>
            {/* Right Horizon */}
            <div className="text-3xl sm:text-4xl">🌳 🌲 🏡</div>
          </div>
        </div>

        {/* Visibility Distance Metric Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-2 font-bold text-amber-300">
            <Eye className="w-4 h-4" />
            <span>Jarak Pandang Aman:</span>
          </span>
          <span className="font-mono font-black text-white">{selectedLevel.visibility}</span>
        </div>
      </div>

      {/* In-Depth Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Dampak Kesehatan Paru-Paru */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-300">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>Kesehatan &amp; Pernapasan</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {selectedLevel.healthImpact}
          </p>
        </div>

        {/* Card 2: Kebijakan Sekolah */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-300">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>Aktivitas Belajar Sekolah</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {selectedLevel.schoolAction}
          </p>
        </div>

        {/* Card 3: Rekomendasi Masker & Perlindungan */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Perlindungan Diri</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {selectedLevel.maskRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
