import { useState, useEffect } from "react";
import { useParams, Link } from "../router";
import { issuesData, IssueContent } from "../data/issuesData";
import { getExtra } from "../data/issuesExtra";
import IssueExtraMaterial from "../data/IssueExtraMaterial";
import QuizSection from "../components/quiz/QuizSection";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import LandslideIcon from "../components/icons/LandslideIcon";
import HeroThematicEffect from "../components/issue/HeroThematicEffect";
import IoTGreenTechCard from "../components/issue/IoTGreenTechCard";
import { motion, AnimatePresence } from "motion/react";
import {
  CloudRainWind,
  DropletOff,
  FlameKindling,
  Waves,
  Mountain,
  SunMedium,
  Flame,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Volume2,
  ArrowDown,
  CloudLightning,
  Users,
  HeartPulse,
  Leaf,
  Building2,
} from "lucide-react";

const disasterTips: Record<string, { mood: RimbaMood; text: string }[]> = {
  banjir: [
    {
      mood: "alert",
      text: "Matikan sakelar MCB listrik utama segera bila air mulai masuk rumah! Air banjir dan aliran listrik adalah kombinasi mematikan.",
    },
    {
      mood: "think",
      text: "Arus air setinggi 15 cm (setinggi betis) sudah bisa merobohkan orang dewasa. Jangan pernah nekat menerobos banjir deras!",
    },
    {
      mood: "scan",
      text: "Sensor ultrasonik IoT di hulu memantau tinggi muka air sungai secara otomatis dan mengirim peringatan dini sebelum banjir tiba di hilir.",
    },
    {
      mood: "celebrate",
      text: "Satu lubang biopori (10 × 100 cm) di pekarangan bisa menyerap jutaan liter air hujan sekaligus mengubah sampah daun menjadi kompos!",
    },
    {
      mood: "wave",
      text: "Siapkan Tas Siaga Bencana: simpan dokumen penting dalam plastik kedap air, senter, peluit, obat pribadi, dan cadangan baterai.",
    },
  ],
  "tanah-longsor": [
    {
      mood: "alert",
      text: "Waspadai tanda bahaya longsor: retakan baru melengkung di lereng, tiang listrik/pohon miring, dan mata air tiba-tiba menjadi keruh!",
    },
    {
      mood: "think",
      text: "Bila bukit bergemuruh dan lereng mulai bergerak, lari tegak lurus ke samping menjauhi jalur longsoran. Jangan lari ke arah bawah!",
    },
    {
      mood: "scan",
      text: "Sensor kelembapan tanah EWS memantau tingkat kejenuhan air pada lapisan bidang gelincir lereng secara real-time.",
    },
    {
      mood: "celebrate",
      text: "Akar rumput Vetiver menembus tanah hingga 4 meter dan bekerja bagai 'paku bumi hidup' yang mengunci kestabilan lereng curam.",
    },
    {
      mood: "wave",
      text: "Jangan memotong tebing bukit sembarangan untuk lahan parkir atau rumah tanpa dinding penahan tanah dan drainase lereng.",
    },
  ],
  kekeringan: [
    {
      mood: "alert",
      text: "Air tanah adalah tabungan alami kita! Mematikan keran saat menggosok gigi bisa menghemat hingga 12 liter air bersih setiap hari.",
    },
    {
      mood: "think",
      text: "Lapisi permukaan tanah kebun atau pot dengan mulsa daun kering. Mulsa menahan panas dan mengurangi penguapan air tanah hingga 40%!",
    },
    {
      mood: "scan",
      text: "Satelit cuaca memantau indeks anomali El Niño dan kelembapan lapisan vegetasi untuk mendeteksi potensi kemarau ekstrem.",
    },
    {
      mood: "celebrate",
      text: "Gunakan irigasi tetes sederhana dari botol bekas untuk mengalirkan air perlahan langsung ke akar tanpa ada air yang terbuang sia-sia.",
    },
    {
      mood: "wave",
      text: "Tampung air hujan saat musim basah dengan tandon bersih dan tertutup agar terlindung dari perkembangbiakan jentik nyamuk.",
    },
  ],
  "kebakaran-hutan": [
    {
      mood: "alert",
      text: "Gunakan masker respiratorik standar N95 atau KF94 saat indeks ISPU memerah. Masker kain biasa tidak mampu menyaring partikel mikroskopis PM2.5!",
    },
    {
      mood: "think",
      text: "Api kebakaran gambut membara tanpa nyala di kedalaman 1–3 meter bawah tanah. Asap permukaan hilang bukan berarti api sudah padam!",
    },
    {
      mood: "scan",
      text: "Sistem satelit SiPongi KLHK mendeteksi titik panas (hotspot) anomali suhu tanah di atas 45°C dengan ketelitian spasial tinggi.",
    },
    {
      mood: "celebrate",
      text: "Sekat kanal (canal blocking) menaikkan tinggi muka air tanah gambut agar tetap lembap (rewetting) dan kebal dari rambatan api.",
    },
    {
      mood: "wave",
      text: "Buat ruang aman di rumah: tutup rapat ventilasi jendela dengan handuk basah dan nyalakan penyaring udara (air purifier).",
    },
  ],
};

const heroContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 24 },
  },
};

export default function IssueDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<"sebab" | "dampak" | "aksi">("sebab");
  const [actionFilter, setActionFilter] = useState<"semua" | "rumah" | "sekolah" | "lingkungan">("semua");
  const [tipIndex, setTipIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const normalizedSlug = slug === "kekeringan-air" ? "kekeringan" : slug;
  const issue: IssueContent | undefined = normalizedSlug
    ? issuesData[normalizedSlug]
    : undefined;

  const issueKeys = Object.keys(issuesData);
  const currentIndex = issueKeys.indexOf(normalizedSlug || "");
  const nextKey =
    currentIndex >= 0 && currentIndex + 1 < issueKeys.length
      ? issueKeys[currentIndex + 1]
      : issueKeys[0];
  const nextIssue = issuesData[nextKey];

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleMascotClick = () => {
    const tips = disasterTips[issue?.slug ?? ""] ?? [];
    setTipIndex((prev) => (prev + 1) % (tips.length || 1));
  };

  useEffect(() => {
    setTipIndex(0);
    setActiveTab("sebab");
    setActionFilter("semua");
  }, [normalizedSlug]);

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
            className="px-6 py-3 rounded-2xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const extra = getExtra(issue.slug);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    CloudRainWind,
    Landslide: LandslideIcon,
    DropletOff,
    FlameKindling,
    Waves,
    Mountain,
    SunMedium,
    Flame,
  };
  const MainIcon = iconMap[issue.icon] || Waves;

  const filteredActions = issue.sections.studentActions.filter((act) =>
    actionFilter === "semua" ? true : act.location === actionFilter
  );

  return (
    <div className="w-full pb-20">
      {/* 1. HERO BANNER — ILLUSTRATED SVG LANDSCAPE + MASCOT SPEECH BUBBLE */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="w-full pt-10 pb-20 relative overflow-hidden text-white min-h-[520px] flex flex-col justify-center"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: mouseOffset.x * -16,
            y: mouseOffset.y * -10,
          }}
        >
          <HeroThematicEffect slug={issue.slug} />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Breadcrumbs */}
          <motion.nav
            key={`breadcrumb-${issue.slug}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs font-semibold text-white/80 mb-6"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">Materi Isu</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{issue.title}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: Staggered Text Content */}
            <motion.div
              key={`hero-text-${issue.slug}`}
              variants={heroContentVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-4"
            >
              <motion.div variants={heroItemVariants}>
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-wider text-white border transition-all ${
                    issue.slug === "kebakaran-hutan"
                      ? "bg-red-950/70 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.5)] ring-2 ring-orange-500/30"
                      : "bg-white/20 border-white/20 shadow-xs"
                  }`}
                >
                  <span
                    className={
                      issue.slug === "kebakaran-hutan"
                        ? "text-amber-300 animate-pulse filter drop-shadow-[0_0_8px_#f59e0b]"
                        : ""
                    }
                  >
                    <MainIcon className="w-4 h-4" />
                  </span>
                  <span>
                    {issue.heroBadge} • Tingkat Ancaman: {issue.threatLevel}
                  </span>
                  {issue.slug === "kebakaran-hutan" && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping ml-1" />
                  )}
                </div>
              </motion.div>

              <motion.h1
                variants={heroItemVariants}
                className="text-3xl sm:text-5xl font-black font-['Fredoka'] leading-tight drop-shadow-sm"
              >
                {issue.title}
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed"
              >
                {issue.subtitle}
              </motion.p>

              <motion.div
                variants={heroItemVariants}
                className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-emerald-100 italic"
              >
                &ldquo;{issue.tagline}&rdquo;
              </motion.div>
            </motion.div>

            {/* RIGHT: Rimba Mascot + Speech Bubble */}
            <motion.div
              className="lg:col-span-5 flex flex-col items-center justify-center"
              style={{
                x: mouseOffset.x * 20,
                y: mouseOffset.y * 14,
              }}
            >
              {(() => {
                const tips = disasterTips[issue.slug] ?? [];
                const currentTip = tips[tipIndex % (tips.length || 1)];
                return currentTip ? (
                  <motion.div
                    key={tipIndex}
                    initial={{ opacity: 0, scale: 0.92, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={handleMascotClick}
                    className="w-full max-w-[280px] sm:max-w-[300px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-3.5 shadow-xl border border-emerald-800/15 cursor-pointer hover:border-emerald-400 transition-all mb-2 select-none relative group hover:scale-[1.02] z-20"
                    title="Klik untuk tips siaga berikutnya!"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 font-['Fredoka'] font-black text-emerald-800 text-xs sm:text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Hai, aku Rimba!
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                        Tips {(tipIndex % (tips.length || 1)) + 1}/{tips.length}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                      {currentTip.text}
                    </p>
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                      <span className="inline-flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> Tips Siaga
                      </span>
                      <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                        Klik untuk ganti ↻
                      </span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-emerald-800/15 transform rotate-45 pointer-events-none" />
                  </motion.div>
                ) : null;
              })()}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                onClick={handleMascotClick}
                className="cursor-pointer select-none"
                title="Klik Rimba untuk tips siaga berikutnya!"
              >
                <RimbaMascot
                  mood={
                    disasterTips[issue.slug]?.[
                      tipIndex % (disasterTips[issue.slug]?.length || 1)
                    ]?.mood ?? "idle"
                  }
                  size="lg"
                />
              </motion.div>

              <div
                className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-sm cursor-pointer select-none"
                onClick={handleMascotClick}
              >
                💬 Klik Rimba untuk Tips Siaga!
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TABBED CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-10">
          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 max-w-2xl relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("sebab")}
              className={`relative flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 z-10 ${
                activeTab === "sebab"
                  ? "text-emerald-950 font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              {activeTab === "sebab" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-xl shadow-md z-[-1] border border-slate-200/60"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Sebab-Akibat</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("dampak")}
              className={`relative flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 z-10 ${
                activeTab === "dampak"
                  ? "text-emerald-950 font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              {activeTab === "dampak" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-xl shadow-md z-[-1] border border-slate-200/60"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Dampak Bencana</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("aksi")}
              className={`relative flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 z-10 ${
                activeTab === "aksi"
                  ? "text-emerald-950 font-black"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              {activeTab === "aksi" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-xl shadow-md z-[-1] border border-slate-200/60"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Aksi Nyata Pelajar</span>
            </motion.button>
          </div>

          {/* Smooth Tab Content Transitions */}
          <AnimatePresence mode="wait">
            {/* TAB 1: SEBAB & AKIBAT */}
            {activeTab === "sebab" && (
              <motion.div
                key="sebab-main"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Narasi Pembuka dengan Aksen Garis Samping */}
                <div className="pl-5 border-l-4 border-emerald-600 space-y-2 max-w-4xl">
                  <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700">
                    Memahami Akar Permasalahan
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
                    {issue.sections.causeAndEffect.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {issue.sections.causeAndEffect.description}
                  </p>
                </div>

                {/* Dua Kolom Kontras: Faktor Alam vs Aktivitas Manusia */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {issue.sections.causeAndEffect.naturalFactors && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-sky-50 to-white border-2 border-sky-200/80 p-6 space-y-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                          <CloudLightning className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                            Pemicu Alami
                          </span>
                          <h4 className="font-black text-sm sm:text-base text-slate-900 font-['Fredoka']">
                            Dinamika Alam &amp; Cuaca
                          </h4>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {issue.sections.causeAndEffect.naturalFactors.map((nat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-sky-100"
                          >
                            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{nat}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`${
                      issue.sections.causeAndEffect.naturalFactors
                        ? "lg:col-span-7"
                        : "lg:col-span-12"
                    } rounded-3xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200/80 p-6 space-y-4 shadow-2xs`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                          Faktor Memperparah
                        </span>
                        <h4 className="font-black text-sm sm:text-base text-slate-900 font-['Fredoka']">
                          Aktivitas Manusia yang Mengganggu Alam
                        </h4>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {issue.sections.causeAndEffect.humanActivities.map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 bg-white p-3.5 rounded-xl border border-amber-100"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{act}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Alur Efek Domino Ekosistem */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <strong className="text-[11px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                        Dampak Rantai Ekosistem (Efek Domino):
                      </strong>
                      <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                        {issue.sections.causeAndEffect.ecologicalProcess}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DAMPAK BENCANA */}
            {activeTab === "dampak" && (
              <motion.div
                key="dampak-main"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="pl-5 border-l-4 border-rose-500">
                  <span className="text-[11px] font-black uppercase tracking-widest text-rose-600">
                    Analisis 3 Aspek Kehidupan
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
                    Dampak Nyata terhadap Alam, Kesehatan &amp; Masyarakat
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 space-y-4 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                        1. Ekologis &amp; Alam
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {issue.sections.impact.environmental.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-emerald-100"
                        >
                          <span className="text-emerald-600 font-black">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {issue.sections.impact.healthSafety && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.06 }}
                      className="p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200 space-y-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                          <HeartPulse className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
                          2. Kesehatan &amp; Keselamatan
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {issue.sections.impact.healthSafety.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-amber-100"
                          >
                            <span className="text-amber-600 font-black">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 }}
                    className="p-6 rounded-3xl bg-gradient-to-b from-rose-50 to-white border-2 border-rose-200 space-y-4 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-rose-900 uppercase tracking-wider">
                        3. Sosial &amp; Pelajar
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {issue.sections.impact.socialEconomic.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-rose-100"
                        >
                          <span className="text-rose-600 font-black">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Zona &amp; Kelompok Paling Rentan: </strong>
                    <span className="text-slate-200">{issue.sections.impact.vulnerabilityNote}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: AKSI NYATA PELAJAR (Dengan Filter Lokasi Interaktif) */}
            {activeTab === "aksi" && (
              <motion.div
                key="aksi-main"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="pl-5 border-l-4 border-emerald-600">
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700">
                      Panduan Praktis Pelajar
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
                      Langkah Konkret Kesiapsiagaan
                    </h3>
                  </div>

                  {/* Filter Lokasi */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 self-start">
                    {[
                      { id: "semua", label: "Semua Lokasi" },
                      { id: "rumah", label: "🏠 Di Rumah" },
                      { id: "sekolah", label: "🏫 Di Sekolah" },
                      { id: "lingkungan", label: "🌳 Di Lingkungan" },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() =>
                          setActionFilter(
                            loc.id as "semua" | "rumah" | "sekolah" | "lingkungan"
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          actionFilter === loc.id
                            ? "bg-emerald-800 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredActions.map((act, idx) => {
                    const isPencegahan = act.type === "pencegahan";
                    const locationLabels: Record<string, string> = {
                      rumah: "🏠 Di Rumah",
                      sekolah: "🏫 Di Sekolah",
                      lingkungan: "🌳 Di Lingkungan",
                    };
                    return (
                      <motion.div
                        key={`${act.title}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className={`p-5 rounded-3xl border-2 transition-all shadow-2xs ${
                          isPencegahan
                            ? "bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200 hover:border-emerald-400"
                            : "bg-gradient-to-br from-amber-50/80 to-white border-amber-200 hover:border-amber-400"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          {act.location && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                              {locationLabels[act.location] || act.location}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isPencegahan
                                ? "bg-emerald-600 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                          >
                            {isPencegahan ? "Langkah Pencegahan" : "Penyelamatan Diri"}
                          </span>
                        </div>
                        <h4 className="font-black text-base text-slate-900 mb-1.5 font-['Fredoka']">
                          {act.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {act.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extra Material */}
          <AnimatePresence mode="wait">
            <IssueExtraMaterial
              key={`extra-${issue.slug}-${activeTab}`}
              issue={issue}
              extra={extra}
              tab={activeTab}
            />
          </AnimatePresence>

          {/* 3. TAHUKAH KAMU? KARTU TEKNOLOGI HIJAU */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <IoTGreenTechCard
              trivia={issue.sections.greenTechTrivia}
              slug={issue.slug}
            />
          </motion.div>
        </div>
      </section>

      {/* 4. QUIZ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizSection
          quiz={issue.quiz}
          issueTitle={issue.title}
          nextSlug={nextIssue?.slug}
          nextTitle={nextIssue?.title}
          issueSlug={issue.slug}
        />
      </section>
    </div>
  );
}