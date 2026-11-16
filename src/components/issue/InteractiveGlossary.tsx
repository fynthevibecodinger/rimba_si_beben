import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Waves,
  Layers,
  CircleDot,
  Mountain,
  Shield,
  TrendingDown,
  Droplets,
  Sprout,
  Sun,
  DropletOff,
  Wind,
  Leaf,
  Flame,
  Gauge,
  Search,
  Sparkles,
  HelpCircle,
  RotateCw,
} from "lucide-react";
import type { GlossaryItem } from "../../data/issuesExtra";

interface Props {
  glossary: GlossaryItem[];
  themeColor?: string;
}

// Icon helper for diverse hydrometeorological glossary terms
function getTermIcon(term: string) {
  const lower = term.toLowerCase();
  if (lower.includes("limpasan")) return Waves;
  if (lower.includes("infiltrasi")) return Layers;
  if (lower.includes("biopori")) return CircleDot;
  if (lower.includes("aliran sungai") || lower.includes("das")) return Mountain;
  if (lower.includes("retensi")) return Shield;
  if (lower.includes("gelincir")) return TrendingDown;
  if (lower.includes("terasering")) return Layers;
  if (lower.includes("jenuh")) return Droplets;
  if (lower.includes("vetiver") || lower.includes("akar")) return Sprout;
  if (lower.includes("meteorologis")) return Sun;
  if (lower.includes("hidrologis")) return DropletOff;
  if (lower.includes("el niño")) return Wind;
  if (lower.includes("mulsa")) return Leaf;
  if (lower.includes("gambut")) return Layers;
  if (lower.includes("hotspot")) return Flame;
  if (lower.includes("pm2.5") || lower.includes("ispu")) return Gauge;
  if (lower.includes("sekat")) return Shield;
  return BookOpen;
}

export default function InteractiveGlossary({ glossary, themeColor = "#0284c7" }: Props) {
  const [flippedTerms, setFlippedTerms] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFlip = (term: string) => {
    setFlippedTerms((prev) => ({ ...prev, [term]: !prev[term] }));
  };

  const filtered = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus Istilah Pelajar</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
            Kamus Mini Interaktif
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik kartu istilah untuk membalik dan membaca artinya. Uji pemahamanmu sebelum membukanya!
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-60">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari istilah..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Grid of Interactive 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => {
          const Icon = getTermIcon(g.term);
          const isFlipped = !!flippedTerms[g.term];

          return (
            <motion.div
              key={g.term}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => toggleFlip(g.term)}
              className="cursor-pointer select-none group min-h-[140px] rounded-2xl border-2 transition-all duration-300 relative bg-white shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between"
              style={{
                borderColor: isFlipped ? themeColor : "#e2e8f0",
              }}
            >
              <div className="p-4 flex-1 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3 h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 group-hover:text-emerald-700">
                          <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                          <span>Balik kartu</span>
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {g.term}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Tebak definisinya, lalu klik untuk memastikan!
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                          Definisi:
                        </span>
                        <span className="text-[10px] text-slate-400">Klik untuk balik</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {g.meaning}
                      </p>

                      <div className="text-[10px] font-bold text-slate-500 truncate">
                        {g.term}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom active line */}
              <div
                className="h-1 w-full transition-colors"
                style={{ backgroundColor: isFlipped ? themeColor : "transparent" }}
              />
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-500">
          Istilah tidak ditemukan untuk kata kunci &ldquo;{searchQuery}&rdquo;.
        </div>
      )}
    </div>
  );
}
