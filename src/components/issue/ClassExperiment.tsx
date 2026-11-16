import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FlaskConical,
  CheckCircle2,
  Circle,
  Eye,
  Award,
  ChevronDown,
  RotateCcw,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import type { Experiment } from "../../data/issuesExtra";

interface Props {
  experiment: Experiment;
  themeColor?: string;
}

export default function ClassExperiment({ experiment, themeColor = "#0284c7" }: Props) {
  // Checklists states
  const [checkedTools, setCheckedTools] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [showPrediction, setShowPrediction] = useState(false);

  const toggleTool = (idx: number) => {
    setCheckedTools((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toolDoneCount = Object.values(checkedTools).filter(Boolean).length;
  const stepDoneCount = Object.values(checkedSteps).filter(Boolean).length;
  const allToolsReady = toolDoneCount === experiment.tools.length;
  const allStepsReady = stepDoneCount === experiment.steps.length;

  const handleReset = () => {
    setCheckedTools({});
    setCheckedSteps({});
    setShowPrediction(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 border border-slate-800 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-amber-400/30">
            <FlaskConical className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Laboratorium Mini Kelas</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-white">
            {experiment.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">
            Kesiapan: {toolDoneCount + stepDoneCount} / {experiment.tools.length + experiment.steps.length}
          </span>
          {(toolDoneCount > 0 || stepDoneCount > 0 || showPrediction) && (
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1"
              title="Reset checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bagian 1: Alat & Bahan (Checklist Interaktif) */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <span>1. Persiapan Alat &amp; Bahan</span>
            <span className="text-[10px] font-bold text-slate-400 lowercase">
              ({toolDoneCount}/{experiment.tools.length} siap)
            </span>
          </h4>
          {allToolsReady && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> Lengkap!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {experiment.tools.map((tool, idx) => {
            const isChecked = !!checkedTools[idx];
            return (
              <button
                key={idx}
                onClick={() => toggleTool(idx)}
                className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-2.5 select-none ${
                  isChecked
                    ? "bg-emerald-950/70 border-emerald-500/60 text-emerald-200 line-through"
                    : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                }`}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className="truncate">{tool}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bagian 2: Langkah Percobaan (Checklist Tahapan) */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-sky-300 flex items-center gap-2">
            <span>2. Langkah-Langkah Percobaan</span>
            <span className="text-[10px] font-bold text-slate-400 lowercase">
              ({stepDoneCount}/{experiment.steps.length} selesai)
            </span>
          </h4>
          {allStepsReady && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Eksperimen Selesai!
            </span>
          )}
        </div>

        <div className="space-y-2">
          {experiment.steps.map((step, idx) => {
            const isChecked = !!checkedSteps[idx];
            return (
              <button
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? "bg-sky-950/40 border-sky-600/50 text-slate-300"
                    : "bg-slate-800/60 border-slate-700/80 text-slate-100 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isChecked
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {isChecked ? "✓" : idx + 1}
                </span>
                <span className={`flex-1 leading-relaxed ${isChecked ? "line-through opacity-80" : ""}`}>
                  {step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bagian 3: Curiosity Gate ("Lihat Hasil Prediksi & Kesimpulan") */}
      <div className="pt-2 relative z-10">
        {!showPrediction ? (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-800 to-emerald-500/10 border border-amber-400/30 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Tantangan Hipotesis Sains</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              Sebelum membuka jawaban, coba diskusikan bersama teman sebangkumu: apa yang kira-kira akan terjadi pada pengujian ini?
            </p>
            <button
              onClick={() => setShowPrediction(true)}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat Hasil Prediksi &amp; Kesimpulan</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Bagian Amati */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-400/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <Eye className="w-4 h-4" />
                <span>Hasil yang Diamati:</span>
              </div>
              <p className="text-sm text-amber-100 font-semibold leading-relaxed">
                {experiment.observe}
              </p>
            </div>

            {/* Bagian Kesimpulan */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-400/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-300">
                <Award className="w-4 h-4" />
                <span>Kesimpulan Ilmiah:</span>
              </div>
              <p className="text-sm text-emerald-100 font-semibold leading-relaxed">
                {experiment.lesson}
              </p>
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowPrediction(false)}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                Sembunyikan Hasil Prediksi ▲
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
