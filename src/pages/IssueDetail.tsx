import { useState } from "react";
import { useParams, Link } from "../router";
import { issuesData, IssueContent } from "../data/issuesData";
import QuizSection from "../components/quiz/QuizSection";
import RimbaMascot from "../components/mascot/RimbaMascot";
import {
  Waves,
  Mountain,
  SunMedium,
  Flame,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Cpu,
  BookOpen,
} from "lucide-react";

export default function IssueDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<"sebab" | "dampak" | "aksi">("sebab");

  const issue: IssueContent | undefined = slug ? issuesData[slug] : undefined;

  // Determine next issue in the list
  const issueKeys = Object.keys(issuesData);
  const currentIndex = issueKeys.indexOf(slug || "");
  const nextKey = currentIndex >= 0 && currentIndex + 1 < issueKeys.length ? issueKeys[currentIndex + 1] : issueKeys[0];
  const nextIssue = issuesData[nextKey];

  if (!issue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-black font-['Fredoka'] text-slate-800">
          Materi Bencana Tidak Ditemukan
        </h2>
        <p className="text-slate-600">
          Maaf, topik bencana dengan alamat &ldquo;{slug}&rdquo; belum terdaftar.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-emerald-800 text-white font-bold text-sm"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Waves,
    Mountain,
    SunMedium,
    Flame,
  };
  const MainIcon = iconMap[issue.icon] || Waves;

  return (
    <div className="w-full pb-20">
      {/* 1. HERO BANNER */}
      <section
        className="w-full pt-10 pb-16 relative overflow-hidden text-white"
        style={{
          background: `linear-gradient(135deg, ${issue.themeColor} 0%, #153B2D 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-white/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">Materi Isu</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{issue.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-white border border-white/20">
                <MainIcon className="w-4 h-4" />
                {issue.heroBadge} • Tingkat Ancaman: {issue.threatLevel}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka'] leading-tight">
                {issue.title}
              </h1>

              <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                {issue.subtitle}
              </p>

              <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-emerald-100 italic">
                &ldquo;{issue.tagline}&rdquo;
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <RimbaMascot
                mood="scan"
                speech={`Mari pelajari cara kerja ${issue.title} dan teknologi mitigasinya!`}
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABBED CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/60 max-w-2xl">
            <button
              onClick={() => setActiveTab("sebab")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "sebab"
                  ? "bg-white text-emerald-950 shadow-md font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Sebab-Akibat</span>
            </button>

            <button
              onClick={() => setActiveTab("dampak")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "dampak"
                  ? "bg-white text-emerald-950 shadow-md font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Dampak Bencana</span>
            </button>

            <button
              onClick={() => setActiveTab("aksi")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "aksi"
                  ? "bg-white text-emerald-950 shadow-md font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Aksi Nyata Pelajar</span>
            </button>
          </div>

          {/* Tab 1: Sebab & Akibat */}
          {activeTab === "sebab" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-3xl">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] mb-2">
                  {issue.sections.causeAndEffect.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {issue.sections.causeAndEffect.description}
                </p>
              </div>

              {/* Human Activities List */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200/70 p-6 space-y-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Aktivitas Manusia yang Memperparah Risiko:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {issue.sections.causeAndEffect.humanActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecological Process */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                    Prinsip Keseimbangan Ekosistem:
                  </strong>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    {issue.sections.causeAndEffect.ecologicalProcess}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Dampak Bencana */}
          {activeTab === "dampak" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
                Dampak Nyata terhadap Lingkungan &amp; Kehidupan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Environmental Impacts */}
                <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Dampak Ekologis &amp; Lingkungan Hidup
                  </span>
                  <ul className="space-y-2">
                    {issue.sections.impact.environmental.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socio-economic Impacts */}
                <div className="p-6 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    Dampak Sosial &amp; Aktivitas Pelajar
                  </span>
                  <ul className="space-y-2">
                    {issue.sections.impact.socialEconomic.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
                <strong>Catatan Kerentanan:</strong> {issue.sections.impact.vulnerabilityNote}
              </div>
            </div>
          )}

          {/* Tab 3: Aksi Nyata Pelajar */}
          {activeTab === "aksi" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
                  Langkah Konkret Kesiapsiagaan Pelajar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Bencana tidak dapat dihindari sepenuhnya, tetapi risikonya bisa kita minimalkan bersama.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {issue.sections.studentActions.map((act, idx) => {
                  const isPencegahan = act.type === "pencegahan";
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        isPencegahan
                          ? "bg-emerald-50/60 border-emerald-200 hover:border-emerald-400"
                          : "bg-amber-50/60 border-amber-200 hover:border-amber-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isPencegahan
                              ? "bg-emerald-200 text-emerald-900"
                              : "bg-amber-200 text-amber-900"
                          }`}
                        >
                          {isPencegahan ? "Langkah Pencegahan" : "Penyelamatan Diri"}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
                        {act.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. TAHUKAH KAMU? KOTAK TEKNOLOGI HIJAU */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-8 h-8" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Tahukah Kamu?
                </span>
                <span className="text-xs text-emerald-300 font-semibold">
                  Teknologi Hijau Nusantara: {issue.sections.greenTechTrivia.category}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-['Fredoka']">
                {issue.sections.greenTechTrivia.techName}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {issue.sections.greenTechTrivia.description}
              </p>
              <div className="text-xs font-bold text-amber-300 pt-1">
                ⚡ {issue.sections.greenTechTrivia.factHighlight}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUIZ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizSection
          quiz={issue.quiz}
          issueTitle={issue.title}
          nextSlug={nextIssue?.slug}
          nextTitle={nextIssue?.title}
        />
      </section>
    </div>
  );
}
