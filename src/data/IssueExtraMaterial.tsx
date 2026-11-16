import { useState } from "react";
import { Lightbulb, FlaskConical, BookOpen, CheckCircle, Sparkles, HelpCircle } from "lucide-react";
import type { IssueContent } from "../data/issuesData";
import type { IssueExtra } from "../data/issuesExtra";

interface Props {
  issue: IssueContent;
  extra?: IssueExtra;
  tab: "sebab" | "dampak" | "aksi";
}

export default function IssueExtraMaterial({ issue, extra, tab }: Props) {
  const [openMyth, setOpenMyth] = useState<number | null>(null);
  const [done, setDone] = useState<boolean[]>(extra?.challenge7Days.map(() => false) ?? []);

  const { quickFacts, mythsAndFacts, readiness } = issue.sections;
  const doneCount = done.filter(Boolean).length;

  const toggleDay = (i: number) =>
    setDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="space-y-8">
      {/* ================= TAB SEBAB-AKIBAT ================= */}
      {tab === "sebab" && (
        <>
          {extra && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-sky-800">
                  <Lightbulb className="w-4 h-4" /> Gampangnya Begini
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{extra.analogy}</p>
              </div>
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <BookOpen className="w-4 h-4" /> {extra.story.title}
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{extra.story.text}</p>
              </div>
            </div>
          )}

          {quickFacts && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickFacts.map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl font-black font-['Fredoka']" style={{ color: issue.themeColor }}>
                    {f.value}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{f.label}</p>
                </div>
              ))}
            </div>
          )}

          {extra && (
            <>
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                  <FlaskConical className="w-4 h-4" /> Coba Sendiri di Kelas
                </div>
                <h4 className="text-lg font-bold font-['Fredoka']">{extra.experiment.title}</h4>
                <p className="text-xs text-slate-300">
                  <strong>Alat:</strong> {extra.experiment.tools.join(", ")}
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-100">
                  {extra.experiment.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <p className="text-sm text-amber-200">
                  <strong>Amati:</strong> {extra.experiment.observe}
                </p>
                <p className="text-sm text-emerald-200">
                  <strong>Kesimpulan:</strong> {extra.experiment.lesson}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xl font-black text-slate-900 font-['Fredoka']">Kamus Mini</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {extra.glossary.map((g) => (
                    <div key={g.term} className="p-3 rounded-xl bg-white border border-slate-200">
                      <dt className="text-sm font-bold text-slate-900">{g.term}</dt>
                      <dd className="text-xs sm:text-sm text-slate-600">{g.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </>
          )}
        </>
      )}

      {/* ================= TAB DAMPAK ================= */}
      {tab === "dampak" && (
        <>
          {mythsAndFacts && (
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
                <HelpCircle className="w-5 h-5" /> Mitos atau Fakta?
              </h3>
              <p className="text-xs text-slate-500">Klik kartu untuk melihat jawabannya.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mythsAndFacts.map((m, i) => {
                  const open = openMyth === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setOpenMyth(open ? null : i)}
                      className={`text-left p-5 rounded-2xl border transition-all ${
                        open ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-200 hover:border-rose-400"
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {open ? "✅ Fakta" : "❓ Mitos"}
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-1">{m.myth}</p>
                      {open && <p className="text-sm text-slate-700 mt-2 leading-relaxed">{m.fact}</p>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {extra && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
                Diskusikan Bersama Teman
              </div>
              <ul className="space-y-1 text-sm text-slate-800">
                {extra.askYourself.map((q, i) => (
                  <li key={i}>💬 {q}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* ================= TAB AKSI NYATA ================= */}
      {tab === "aksi" && (
        <>
          {readiness && (
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 font-['Fredoka']">Sebelum, Saat, dan Sesudah</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Sebelum", items: readiness.before, cls: "bg-emerald-50 border-emerald-200" },
                  { label: "Saat Kejadian", items: readiness.during, cls: "bg-amber-50 border-amber-200" },
                  { label: "Sesudah", items: readiness.after, cls: "bg-sky-50 border-sky-200" },
                ].map((col) => (
                  <div key={col.label} className={`p-5 rounded-2xl border ${col.cls}`}>
                    <div className="text-xs font-black uppercase tracking-wider mb-2">{col.label}</div>
                    <ul className="space-y-2">
                      {col.items.map((t, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-800 flex gap-2">
                          <span>•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {extra && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" /> Tantangan 7 Hari
                </h3>
                <span className="text-xs font-bold text-slate-600">
                  {doneCount}/{extra.challenge7Days.length} selesai
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(doneCount / extra.challenge7Days.length) * 100}%`,
                    background: issue.themeColor,
                  }}
                />
              </div>
              <ul className="space-y-2">
                {extra.challenge7Days.map((t, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggleDay(i)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border text-sm transition-all ${
                        done[i]
                          ? "bg-emerald-50 border-emerald-300 text-slate-500 line-through"
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-400"
                      }`}
                    >
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${done[i] ? "text-emerald-600" : "text-slate-300"}`} />
                      <span>{t}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}