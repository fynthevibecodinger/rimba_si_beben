import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, Radio, Activity, Wifi, Sun, AlertTriangle, Satellite, Thermometer, Droplets, Wind } from "lucide-react";
import type { IssueSections } from "../../data/issuesData";

interface Props {
  trivia: IssueSections["greenTechTrivia"];
  slug: string;
}

const slugTechSpecs: Record<string, { specs: string[]; liveLabel: string }> = {
  banjir: {
    specs: ["Bertenaga Surya Mandiri", "Frekuensi Ultrasonik 40 kHz", "Latensi Kirim: 12ms"],
    liveLabel: "Telemetri IoT Sensor Ultrasonik",
  },
  "tanah-longsor": {
    specs: ["Sensor Extensometer Wire (EWS)", "Presisi Pergerakan ±0.1 mm", "Transmisi GSM/LoRa Real-time"],
    liveLabel: "Sensor EWS — PVMBG",
  },
  kekeringan: {
    specs: ["Sensor Kelembapan Tanah IoT", "Indeks Anomali El Niño (ONI)", "Data BMKG: Dasarian Curah Hujan"],
    liveLabel: "Telemetri Sensor Hidrometeorologi",
  },
  "kebakaran-hutan": {
    specs: ["Resolusi Spasial Satelit: 375 m", "Sensor Suhu Anomali: >45°C", "Sinkronisasi SiPongi KLHK Real-time"],
    liveLabel: "Pemantauan Satelit Terra/Aqua MODIS",
  },
};

const specIcons = [Sun, Activity, Wifi];

export default function IoTGreenTechCard({ trivia, slug }: Props) {
  const [telemetryVal, setTelemetryVal] = useState(1.42);
  const [isAlertSim, setIsAlertSim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAlertSim) {
        const jitter = (Math.random() - 0.5) * 0.06;
        setTelemetryVal((prev) => +(Math.max(1.2, Math.min(1.6, prev + jitter))).toFixed(2));
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [isAlertSim]);

  const toggleAlertSim = () => {
    setIsAlertSim((prev) => {
      const next = !prev;
      setTelemetryVal(next ? 3.48 : 1.42);
      return next;
    });
  };

  const tech = slugTechSpecs[slug] ?? slugTechSpecs.banjir;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#13382c] to-teal-950 text-white p-6 sm:p-8 shadow-2xl border border-emerald-800/40 relative overflow-hidden space-y-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div className="flex items-center gap-4">
          {/* Radar Pulse Sensor Icon */}
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <span className="absolute inset-0 rounded-2xl bg-emerald-400/20 animate-ping duration-1000" />
            <span className="absolute -inset-2 rounded-3xl bg-emerald-400/10 animate-pulse duration-700" />
            <div className="relative w-14 h-14 rounded-2xl bg-emerald-500/25 border-2 border-emerald-400/60 text-emerald-300 flex items-center justify-center shadow-lg backdrop-blur-md">
              {slug === "kebakaran-hutan" ? (
                <Satellite className="w-7 h-7" />
              ) : slug === "kekeringan" ? (
                <Thermometer className="w-7 h-7" />
              ) : slug === "tanah-longsor" ? (
                <Droplets className="w-7 h-7" />
              ) : (
                <Cpu className="w-7 h-7" />
              )}
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Tahukah Kamu?
              </span>
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" />
                <span>Teknologi Hijau: {trivia.category}</span>
              </span>
            </div>
            <h4 className="text-lg sm:text-2xl font-black font-['Fredoka'] text-white">
              {trivia.techName}
            </h4>
          </div>
        </div>

        {/* Live status badge + simulate button (banjir only) */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-black/30 border border-emerald-500/30 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-200 font-bold">IoT Online</span>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          {slug === "banjir" && (
            <button
              onClick={toggleAlertSim}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isAlertSim
                  ? "bg-rose-600/80 border-rose-400 text-white animate-pulse"
                  : "bg-emerald-800/60 hover:bg-emerald-700/60 border-emerald-500/30 text-emerald-100"
              }`}
            >
              {isAlertSim ? "Normalisasi Simulasi" : "Simulasikan Air Naik"}
            </button>
          )}
        </div>
      </div>

      {/* Description & Fact Highlight + Live Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {trivia.description}
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 text-xs font-bold text-amber-300 flex items-start gap-2">
            <span className="text-base flex-shrink-0">⚡</span>
            <span className="leading-relaxed">{trivia.factHighlight}</span>
          </div>

          {/* Per-slug tech specs footer */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-emerald-300/80 pt-1">
            {tech.specs.map((s, i) => {
              const Icon = specIcons[i] ?? Wind;
              return (
                <span key={i} className="flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  {s}
                </span>
              );
            })}
          </div>
        </div>

        {/* Live Telemetry / Gauge Panel */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-black/40 border border-emerald-500/30 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
            <span className="text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{tech.liveLabel}</span>
            </span>
            <span
              className={`font-black px-2 py-0.5 rounded-md text-[10px] ${
                isAlertSim && slug === "banjir"
                  ? "bg-rose-500 text-white"
                  : "bg-emerald-500/30 text-emerald-300"
              }`}
            >
              {isAlertSim && slug === "banjir" ? "⚠️ STATUS: SIAGA 2" : "NORMAL (AMAN)"}
            </span>
          </div>

          {/* Per-slug gauge content */}
          {slug === "banjir" ? (
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-white">
                    {telemetryVal} <span className="text-sm font-medium text-slate-300">meter</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Jarak sensor ke permukaan air</span>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <div>Ambang Siaga: 3.20 m</div>
                  <div>Ambang Banjir: 4.00 m</div>
                </div>
              </div>
              <div className="relative h-14 bg-slate-900 rounded-xl overflow-hidden border border-emerald-500/20">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${
                    isAlertSim
                      ? "bg-gradient-to-t from-rose-700 to-amber-500"
                      : "bg-gradient-to-t from-teal-700 to-cyan-500"
                  }`}
                  style={{ height: `${Math.min((telemetryVal / 4.0) * 100, 100)}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 animate-pulse" />
                </motion.div>
                <div className="absolute inset-0 flex flex-col justify-between p-1 opacity-20 pointer-events-none">
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                </div>
              </div>
            </div>
          ) : slug === "tanah-longsor" ? (
            <div className="space-y-2.5 py-1">
              {(
                [
                  ["Pergerakan Wire 1", "2.1 mm", 42],
                  ["Pergerakan Wire 2", "0.4 mm", 8],
                  ["Kelembapan Lereng", "87%", 87],
                ] as [string, string, number][]
              ).map(([label, val, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>{label}</span>
                    <span className="font-bold text-emerald-300">{val}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-amber-300 font-bold pt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Ambang Siaga EWS: 5 mm/hari
              </div>
            </div>
          ) : slug === "kekeringan" ? (
            <div className="space-y-2.5 py-1">
              {(
                [
                  ["Kelembapan Tanah", 23, "from-rose-600 to-amber-500"],
                  ["Realisasi Curah Hujan", 18, "from-rose-600 to-amber-500"],
                  ["Cadangan Air Tanah", 41, "from-sky-500 to-teal-400"],
                ] as [string, number, string][]
              ).map(([label, pct, grad]) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>{label}</span>
                    <span className={`font-bold ${pct < 30 ? "text-rose-300" : "text-sky-300"}`}>{pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${grad}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-sky-300 font-bold pt-1">
                📡 Sumber: BMKG Dasarian + Sensor AgriNode
              </div>
            </div>
          ) : (
            /* kebakaran-hutan */
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black font-['Fredoka'] text-orange-300">247</div>
                  <span className="text-[10px] text-emerald-400">Hotspot aktif (update 06:00 WIB)</span>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <div>Ambang Siaga: &gt;50 titik</div>
                  <div>Kritis: &gt;200 titik</div>
                </div>
              </div>
              {(
                [
                  ["Kepercayaan Tinggi", 78],
                  ["Kepercayaan Sedang", 42],
                ] as [string, number][]
              ).map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>{label}</span>
                    <span className="font-bold text-orange-300">{pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-orange-300 font-bold">
                🛰 Sumber: SiPongi KLHK / VIIRS S-NPP
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
