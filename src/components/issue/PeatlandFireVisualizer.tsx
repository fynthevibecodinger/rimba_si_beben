import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
  RotateCcw,
} from "lucide-react";

export default function PeatlandFireVisualizer() {
  // Water table depth in cm (0 to 100 cm)
  // Optimal safe level: <= 40 cm (PP No. 57/2016 mensyaratkan tinggi muka air gambut maksimal 40 cm)
  const [waterDepth, setWaterDepth] = useState<number>(25);
  const [isSparkTriggered, setIsSparkTriggered] = useState<boolean>(false);

  const isSafe = waterDepth <= 40;
  const isModerate = waterDepth > 40 && waterDepth <= 60;
  const isCritical = waterDepth > 60;

  // Percentage height for visual water table (0cm depth = 100% water height, 100cm depth = 15% water height)
  const waterLevelPercent = Math.max(15, 100 - waterDepth * 0.85);

  const handleSparkTest = () => {
    setIsSparkTriggered(true);
    setTimeout(() => {
      setIsSparkTriggered(false);
    }, 4500);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white border-2 border-orange-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background ambient red-orange glow if critical */}
      {isCritical && (
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-orange-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Simulasi Lapisan Gambut (Peatland Visualizer)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-white">
            Muka Air Tanah &amp; Bahaya Api Bawah Tanah (Smoldering)
          </h3>
        </div>

        {/* Quick Preset Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWaterDepth(20)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              waterDepth <= 40
                ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Sekat Kanal (20 cm)</span>
          </button>

          <button
            onClick={() => setWaterDepth(75)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              waterDepth > 60
                ? "bg-red-600 text-white shadow-md ring-2 ring-red-400/50"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Kanal Bocor (75 cm)</span>
          </button>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="p-4 rounded-2xl bg-black/40 border border-orange-500/20 text-xs sm:text-sm text-amber-200/90 italic leading-relaxed relative z-10">
        &ldquo;Gambut yang terbakar melepas karbon yang tersimpan ribuan tahun. Sekali menyala di bawah tanah, apinya merayap tanpa terlihat dan sangat sulit dipadamkan.&rdquo;
      </div>

      {/* Interactive Water Depth Slider */}
      <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs sm:text-sm font-bold text-stone-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Geser Kedalaman Muka Air Gambut:</span>
            <span
              className={`font-mono font-black text-sm px-2.5 py-0.5 rounded-lg ${
                isSafe
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                  : isModerate
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                  : "bg-red-500/20 text-red-300 border border-red-400/30"
              }`}
            >
              {waterDepth} cm di bawah tanah
            </span>
          </label>

          <span className="text-[11px] font-semibold text-stone-400">
            Standar Aman Nasional: &le; 40 cm
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="95"
          value={waterDepth}
          onChange={(e) => setWaterDepth(Number(e.target.value))}
          className="w-full h-2.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        <div className="flex justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider">
          <span className="text-emerald-400">0 cm (Basah Tergenang)</span>
          <span className="text-amber-400">40 cm (Batas Kritis)</span>
          <span className="text-red-400">100 cm (Kering Ekstrem)</span>
        </div>
      </div>

      {/* Cross-Section Soil Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Soil Layers Graphic */}
        <div className="lg:col-span-8 rounded-2xl border-2 border-stone-700 overflow-hidden bg-stone-900 relative">
          {/* Surface Atmosphere: Trees & Sky */}
          <div className="h-24 bg-gradient-to-b from-stone-800 to-amber-950/40 p-3 relative flex items-end justify-between border-b-2 border-emerald-900/60 overflow-hidden">
            {/* Sky Smoke effect if dry and critical */}
            {!isSafe && (
              <div className="absolute inset-0 bg-orange-950/30 pointer-events-none flex items-center">
                <motion.div
                  className="w-full text-center text-xs font-bold text-amber-300/80 bg-red-950/60 py-1"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🌫️ Kabut Asap Pekat Membumbung ke Permukaan (PM2.5 Tinggi)
                </motion.div>
              </div>
            )}

            {/* Surface Vegetation */}
            <div className="flex items-end gap-3 z-10">
              <span className="text-3xl filter drop-shadow">
                {isSafe ? "🌲" : "🍂"}
              </span>
              <span className="text-2xl filter drop-shadow">
                {isSafe ? "🌿" : "🔥"}
              </span>
              <span className="text-3xl filter drop-shadow">
                {isSafe ? "🌳" : "💨"}
              </span>
              <span className="text-2xl filter drop-shadow">
                {isSafe ? "🪴" : "🪵"}
              </span>
            </div>

            <div className="z-10 text-right">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                  isSafe
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "bg-red-500/30 text-red-300 border border-red-500/50 animate-pulse"
                }`}
              >
                {isSafe ? "Vegetasi Hutan Lembap" : "Lahan Rawan Terbakar"}
              </span>
            </div>
          </div>

          {/* Subsurface Peat Cross-Section Box */}
          <div className="h-56 relative bg-gradient-to-b from-amber-950 via-stone-950 to-stone-900 p-4 overflow-hidden flex flex-col justify-between">
            {/* Dry Aerated Peat Zone (Top) */}
            <div className="text-[11px] text-amber-300/70 font-mono font-bold flex justify-between z-20">
              <span>0 cm (Permukaan Gambut)</span>
              <span>Lapisan Organik Tebal</span>
            </div>

            {/* Underground Smoldering Fire Animation (Only in dry zone!) */}
            {!isSafe && (
              <div
                className="absolute left-6 right-6 z-15 rounded-xl border border-dashed border-red-500/60 bg-red-950/40 p-2.5 flex items-center justify-between"
                style={{
                  top: "35px",
                  height: `${Math.max(40, waterDepth * 1.1)}px`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                    Zona Bara Bawah Tanah (Smoldering Peat Fire)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-300">
                  <Flame className="w-4 h-4 animate-bounce text-red-500" />
                  <span className="font-bold">Suhu 300°C–600°C</span>
                </div>
              </div>
            )}

            {/* Rising smoke puffs from smoldering peat */}
            {!isSafe && (
              <div className="absolute inset-0 pointer-events-none z-16">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-6 rounded-full bg-amber-400/20 filter blur-sm"
                    style={{ left: `${15 + i * 8}%`, bottom: "70px" }}
                    animate={{
                      y: [0, -90],
                      x: [0, (i % 2 === 0 ? 15 : -15)],
                      opacity: [0.8, 0],
                      scale: [0.5, 2.2],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Saturated Ground Water Level Fill (Moves with Slider) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-950/90 via-sky-950/70 to-teal-800/40 border-t-2 border-dashed border-cyan-400/80 z-10 transition-all duration-300"
              style={{ height: `${waterLevelPercent}%` }}
            >
              <div className="p-2.5 flex items-center justify-between text-xs text-cyan-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Muka Air Tanah Gambut ({waterDepth} cm)</span>
                </span>
                <span className="text-[10px] font-black uppercase text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-400/30">
                  Lapisan Jenuh Air (Aman Dari Api)
                </span>
              </div>
            </motion.div>

            <div className="text-[11px] text-stone-500 font-mono font-bold flex justify-between z-20 mt-auto">
              <span>-100 cm (Kedalaman Gambut Bawah)</span>
              <span>Cadangan Karbon Ribuan Tahun</span>
            </div>
          </div>
        </div>

        {/* Realtime Impact Summary Cards */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Status Box */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all ${
              isSafe
                ? "bg-emerald-950/50 border-emerald-400/60 text-emerald-100"
                : "bg-red-950/60 border-red-500/80 text-red-100"
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1 uppercase tracking-wider">
              {isSafe ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Kondisi: Terlindungi</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                  <span>Kondisi: Kritis Terbakar</span>
                </>
              )}
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isSafe
                ? "Sekat kanal berfungsi baik! Air membasahi rongga gambut sehingga bara tidak dapat menyala atau menjalar."
                : "Air tanah terlalu surut! Gambut kering bertindak layaknya spons bahan bakar padat yang terbakar di kedalaman 1–2 meter."}
            </p>
          </div>

          {/* Metric Indicators */}
          <div className="p-4 rounded-2xl bg-black/40 border border-stone-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 font-medium">Potensi Bara Bawah Tanah:</span>
              <span
                className={`font-black font-mono ${
                  isSafe ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isSafe ? "5% (Sangat Rendah)" : "95% (Ekstrem)"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-400 font-medium">Pelepasan Gas Karbon:</span>
              <span
                className={`font-black font-mono ${
                  isSafe ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {isSafe ? "0 ton CO₂" : "550 ton CO₂ / ha"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-400 font-medium">Kerapatan Asap PM2.5:</span>
              <span
                className={`font-black font-mono ${
                  isSafe ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isSafe ? "Normal (< 15 µg/m³)" : "Berbahaya (> 250 µg/m³)"}
              </span>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={handleSparkTest}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102 active:scale-98"
          >
            <Flame className="w-4 h-4" />
            <span>🔥 Uji Percikan Api ke Gambut</span>
          </button>

          {isSparkTriggered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-xs font-bold ${
                isSafe
                  ? "bg-emerald-900/60 text-emerald-200 border border-emerald-500/40"
                  : "bg-red-900/60 text-red-200 border border-red-500/40 animate-pulse"
              }`}
            >
              {isSafe
                ? "💨 Percikan api jatuh ke gambut basah dan langsung padam mendesis! Sekat kanal berhasil melindungi hutan."
                : "🔥 Percikan api masuk ke pori-pori gambut kering dan menyalakan bara di bawah tanah! Asap tebal mulai keluar."}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
