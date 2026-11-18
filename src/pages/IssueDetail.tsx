import { useState, useEffect } from "react";
import { useParams, Link } from "../router";
import { issuesData, IssueContent } from "../data/issuesData";
import { getIssuesData } from "../data/getIssuesData";
import { useLanguage } from "../context/LanguageContext";
import { getExtra } from "../data/issuesExtra";
import IssueExtraMaterial from "../data/IssueExtraMaterial";
import { translateIssueData } from "../utils/translateIssue";
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
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export const ALL_ISSUES = [
  {
    slug: "banjir",
    title: "Banjir & Genangan",
    subtitle: "Infiltrasi air hujan, sumur resapan, dan biopori perkotaan",
    icon: Waves,
    accent: "text-sky-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
  },
  {
    slug: "tanah-longsor",
    title: "Tanah Longsor",
    subtitle: "Kestabilan lereng kritis, akar pohon vetiver, dan bidang gelincir",
    icon: Mountain,
    accent: "text-amber-800",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
  },
  {
    slug: "kekeringan",
    title: "Kekeringan Air",
    subtitle: "Konservasi akuifer tanah, panen air hujan, dan irigasi tetes presisi",
    icon: SunMedium,
    accent: "text-amber-600",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-200",
  },
  {
    slug: "kebakaran-hutan",
    title: "Kebakaran Hutan",
    subtitle: "Ekosistem gambut, pembasahan sekat kanal, dan mitigasi kabut asap",
    icon: Flame,
    accent: "text-rose-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
  },
];

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
      text: "Sensor tanah memantau seberapa basah lereng. Jika terlalu basah, warga bisa mendapat peringatan lebih awal.",
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
      text: "Satelit cuaca melihat perubahan musim dan kondisi tanaman untuk mengetahui kemungkinan kemarau panjang.",
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
      text: "Pakai masker N95 atau KF94 saat udara penuh asap. Masker kain biasa belum cukup untuk menyaring debu asap yang sangat kecil!",
    },
    {
      mood: "think",
      text: "Api kebakaran gambut membara tanpa nyala di kedalaman 1–3 meter bawah tanah. Asap permukaan hilang bukan berarti api sudah padam!",
    },
    {
      mood: "scan",
      text: "Satelit SiPongi KLHK mencari titik tanah yang sangat panas agar kebakaran bisa diketahui lebih cepat.",
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

const disasterTipsEn: Record<string, { mood: RimbaMood; text: string }[]> = {
  banjir: [
    {
      mood: "alert",
      text: "Turn off the main electrical MCB breaker immediately if water enters the house! Floodwater and live electricity are a deadly mix.",
    },
    {
      mood: "think",
      text: "A water current just 15 cm deep can easily sweep an adult off their feet. Never attempt to wade through rushing floodwaters!",
    },
    {
      mood: "scan",
      text: "Upstream IoT ultrasonic sensors monitor river heights automatically and broadcast early warnings hours before flood crests reach downstream settlements.",
    },
    {
      mood: "celebrate",
      text: "A single biopore infiltration hole (10 × 100 cm) in your yard can absorb thousands of liters of rainwater while turning leaf litter into compost!",
    },
    {
      mood: "wave",
      text: "Pack an Emergency Go-Bag: seal essential documents in watertight pouches, pack a flashlight, whistle, first aid kit, and spare batteries.",
    },
  ],
  "tanah-longsor": [
    {
      mood: "alert",
      text: "Watch for landslide warning signs: fresh curved ground fissures, leaning utility poles/trees, and natural spring water suddenly turning muddy!",
    },
    {
      mood: "think",
      text: "If a hillside rumbles and ground starts moving, flee sideways perpendicular to the slide path. Never run downhill in the path of the slide!",
    },
    {
      mood: "scan",
      text: "Soil sensors monitor slope moisture levels. If water saturation reaches critical limits, community early warning sirens sound automatically.",
    },
    {
      mood: "celebrate",
      text: "Vetiver grass roots penetrate 3–4 meters deep, functioning like living underground soil nails that lock steep slope stability.",
    },
    {
      mood: "wave",
      text: "Never excavate hillside slope toes vertically for parking or buildings without engineered retaining walls and proper slope drainage.",
    },
  ],
  kekeringan: [
    {
      mood: "alert",
      text: "Groundwater is our natural savings account! Turning off the tap while brushing teeth saves up to 12 liters of clean water every single day.",
    },
    {
      mood: "think",
      text: "Cover garden beds and plant pots with dry leaf mulch. Mulch shields soil from solar heat and slashes water evaporation by up to 70%!",
    },
    {
      mood: "scan",
      text: "Weather satellites track seasonal shifts and vegetation health to detect prolonged drought periods months in advance.",
    },
    {
      mood: "celebrate",
      text: "Use simple DIY drip irrigation from recycled bottles to deliver moisture directly to plant roots without wasting a single drop.",
    },
    {
      mood: "wave",
      text: "Harvest rainwater during wet months into clean, tightly covered tanks so disease-carrying mosquito larvae cannot breed.",
    },
  ],
  "kebakaran-hutan": [
    {
      mood: "alert",
      text: "Wear an N95 or KF94 respirator mask when air is filled with smoke. Standard cloth masks cannot filter microscopic toxic PM2.5 dust!",
    },
    {
      mood: "think",
      text: "Peatland fires smolder flamelessly 1–3 meters underground. Just because surface flames disappear does not mean the fire is out!",
    },
    {
      mood: "scan",
      text: "KLHK SiPongi thermal satellites spot ground hotspots across forests so response crews can dispatch before fires spread underground.",
    },
    {
      mood: "celebrate",
      text: "Canal blocking raises peatland water tables to keep subterranean bogs saturated (rewetting) and immune to fire outbreaks.",
    },
    {
      mood: "wave",
      text: "Create a clean-air room at home: seal window and door crevices with damp towels and run an indoor HEPA air purifier.",
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
  const { language } = useLanguage();
  const isEn = language === "en";
  const [activeTab, setActiveTab] = useState<"sebab" | "dampak" | "aksi">("sebab");
  const [actionFilter, setActionFilter] = useState<"semua" | "rumah" | "sekolah" | "lingkungan">("semua");
  const [tipIndex, setTipIndex] = useState(0);
  const [openImpact, setOpenImpact] = useState<"environmental" | "health" | "social">("environmental");

  const normalizedSlug = slug === "kekeringan-air" ? "kekeringan" : slug;
  const currentIssues = getIssuesData(language);
  const issue: IssueContent | undefined = normalizedSlug
    ? currentIssues[normalizedSlug] || issuesData[normalizedSlug]
    : undefined;

  const currentIndex = ALL_ISSUES.findIndex((item) => item.slug === normalizedSlug);
  const nextItem =
    currentIndex >= 0 && currentIndex + 1 < ALL_ISSUES.length
      ? ALL_ISSUES[currentIndex + 1]
      : ALL_ISSUES[0];
  const nextIssue = currentIssues[nextItem.slug] || issuesData[nextItem.slug];

  const prevItem =
    currentIndex > 0
      ? ALL_ISSUES[currentIndex - 1]
      : ALL_ISSUES[ALL_ISSUES.length - 1];
  const prevIssue = currentIssues[prevItem.slug] || issuesData[prevItem.slug];

  const activeTips = (isEn ? disasterTipsEn[issue?.slug ?? ""] : disasterTips[issue?.slug ?? ""]) ?? [];

  const handleMascotClick = () => {
    setTipIndex((prev) => (prev + 1) % (activeTips.length || 1));
  };

  useEffect(() => {
    setTipIndex(0);
    setActiveTab("sebab");
    setActionFilter("semua");
  }, [normalizedSlug, language]);

  if (!issue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-black font-['Fredoka'] text-slate-800">
          {isEn ? "Disaster Topic Not Found" : "Materi Bencana Tidak Ditemukan"}
        </h2>
        <p className="text-slate-600">
          {isEn
            ? `Sorry, topic "${slug}" is not yet registered.`
            : `Maaf, topik bencana dengan alamat "${slug}" belum terdaftar.`}
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-colors"
          >
            {isEn ? "Back to Home" : "Kembali ke Beranda"}
          </Link>
        </div>
      </div>
    );
  }

  const extra = getExtra(issue.slug, language);

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
      {/* 1. HERO BANNER — ILLUSTRATED SVG LANDSCAPE + MASCOT SPEECH BUBBLE (STABIL TANPA HOVER JITTER) */}
      <section className="w-full pt-10 pb-20 relative overflow-hidden text-white min-h-[520px] flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <HeroThematicEffect slug={issue.slug} />
        </div>

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
              {isEn ? "Home" : "Beranda"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{isEn ? "Issue Topics" : "Materi Isu"}</span>
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
                    {issue.heroBadge} • {isEn ? "Threat Level: " : "Tingkat Ancaman: "}{issue.threatLevel}
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
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              {(() => {
                const currentTip = activeTips[tipIndex % (activeTips.length || 1)];
                return currentTip ? (
                  <motion.div
                    key={tipIndex}
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={handleMascotClick}
                    className="w-full max-w-[280px] sm:max-w-[300px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-3.5 shadow-xl border border-emerald-800/15 cursor-pointer transition-all mb-2 select-none relative group z-20"
                    title={isEn ? "Click for next eco tip!" : "Klik untuk tips siaga berikutnya!"}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 font-['Fredoka'] font-black text-emerald-800 text-xs sm:text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        {isEn ? "Hi, I'm Rimba!" : "Hai, aku Rimba!"}
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                        {isEn ? "Tip" : "Tips"} {(tipIndex % (activeTips.length || 1)) + 1}/{activeTips.length}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                      {currentTip.text}
                    </p>
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                      <span className="inline-flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> {isEn ? "Eco Tips" : "Tips Siaga"}
                      </span>
                      <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                        {isEn ? "Click to change ↻" : "Klik untuk ganti ↻"}
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
                title={isEn ? "Click Rimba for eco tips!" : "Klik Rimba untuk tips siaga berikutnya!"}
              >
                <RimbaMascot
                  mood={
                    activeTips[
                      tipIndex % (activeTips.length || 1)
                    ]?.mood ?? "idle"
                  }
                  size="lg"
                />
              </motion.div>

              <div
                className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 transition-all shadow-sm cursor-pointer select-none"
                onClick={handleMascotClick}
              >
                💬 {isEn ? "Click Rimba for Eco Tips!" : "Klik Rimba untuk Tips Siaga!"}
              </div>
            </div>
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
              <span>{isEn ? "Cause & Effect" : "Sebab-Akibat"}</span>
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
              <span>{isEn ? "Disaster Impact" : "Dampak Bencana"}</span>
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
              <span>{isEn ? "Youth Action Guide" : "Aksi Nyata Pelajar"}</span>
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
                    {isEn ? "Understanding Root Causes" : "Memahami Akar Permasalahan"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
                    {issue.sections.causeAndEffect.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {issue.sections.causeAndEffect.description}
                  </p>
                </div>

                 {/* Penyebab dibuat menjadi satu alur sederhana, bukan dua kumpulan card. */}
                 <motion.div
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 space-y-7"
                 >
                   {issue.sections.causeAndEffect.naturalFactors && (
                     <div className="space-y-3">
                       <div className="flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                           <CloudLightning className="h-5 w-5" />
                         </span>
                         <div>
                           <h4 className="font-black text-base text-slate-900 font-['Fredoka']">
                             {isEn ? "Natural triggers" : "Pemicu alami"}
                           </h4>
                           <p className="text-xs text-slate-500">
                             {isEn ? "Natural environmental processes initiating the hazard." : "Hal dari alam yang memulai bencana."}
                           </p>
                         </div>
                       </div>
                       <ul className="space-y-2 pl-12">
                         {issue.sections.causeAndEffect.naturalFactors.map((nat, i) => (
                           <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                             <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                             <span>{nat}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}

                   <div className="border-t border-slate-200 pt-7 space-y-3">
                     <div className="flex items-center gap-3">
                       <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                         <Users className="h-5 w-5" />
                       </span>
                       <div>
                         <h4 className="font-black text-base text-slate-900 font-['Fredoka']">
                           {isEn ? "Human exacerbating factors" : "Faktor memperparah"}
                         </h4>
                         <p className="text-xs text-slate-500">
                           {isEn ? "Human activities and habits that amplify impacts." : "Kebiasaan manusia yang membuat dampaknya lebih besar."}
                         </p>
                       </div>
                     </div>
                     <ul className="space-y-2 pl-12">
                       {issue.sections.causeAndEffect.humanActivities.map((act, i) => (
                         <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                           <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                           <span>{act}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </motion.div>

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
                        {isEn ? "Ecosystem Domino Effect:" : "Dampak Rantai Ekosistem (Efek Domino):"}
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
                 <div className="max-w-2xl">
                   <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700">
                     {isEn ? "What is impacted?" : "Apa yang terdampak?"}
                   </span>
                   <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka'] mt-1">
                     {isEn ? "Disaster impacts around us" : "Dampak bencana di sekitar kita"}
                   </h3>
                   <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                     {isEn ? "Explore three impact dimensions one by one for clarity." : "Lihat tiga bagian dampaknya satu per satu supaya lebih mudah dipahami."}
                   </p>
                 </div>

                 <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6 space-y-2">
                   {[
                     { id: "environmental" as const, title: isEn ? "Nature & Environment" : "Alam dan lingkungan", hint: isEn ? "What shifts in our natural ecosystems?" : "Apa yang berubah di alam?", icon: Leaf, items: issue.sections.impact.environmental },
                     ...(issue.sections.impact.healthSafety ? [{ id: "health" as const, title: isEn ? "Health & Safety" : "Kesehatan dan keselamatan", hint: isEn ? "How does it affect human bodies and safety?" : "Apa pengaruhnya bagi tubuh dan keamanan?", icon: HeartPulse, items: issue.sections.impact.healthSafety }] : []),
                     { id: "social" as const, title: isEn ? "Society & Students" : "Masyarakat dan pelajar", hint: isEn ? "How are daily routines and schooling disrupted?" : "Bagaimana kegiatan sehari-hari terdampak?", icon: Building2, items: issue.sections.impact.socialEconomic },
                   ].map((section) => {
                     const open = openImpact === section.id;
                     const Icon = section.icon;
                     return (
                       <div key={section.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                         <button
                           type="button"
                           onClick={() => setOpenImpact(open ? "environmental" : section.id)}
                           className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                         >
                           <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${open ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                             <Icon className="h-4.5 w-4.5" />
                           </span>
                           <span className="min-w-0 flex-1">
                             <strong className="block text-sm font-black text-slate-900">{section.title}</strong>
                             <span className="block text-xs text-slate-500 mt-0.5">{section.hint}</span>
                           </span>
                           <span className="text-lg text-slate-400" aria-hidden="true">{open ? "−" : "+"}</span>
                         </button>
                         {open && (
                           <div className="border-t border-slate-100 px-4 pb-4 pt-3 pl-16">
                             <ul className="space-y-2">
                               {section.items.map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                                   <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                   <span>{item}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>

                 <div
                   className="p-5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3"
                   style={{
                     backgroundColor: `${issue.themeColor}12`,
                     borderColor: `${issue.themeColor}45`,
                   }}
                 >
                   <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: issue.themeColor }} />
                   <div>
                     <strong className="font-black" style={{ color: issue.themeColor }}>
                       {isEn ? "Most Vulnerable Zones & Groups: " : "Zona & Kelompok Paling Rentan: "}
                     </strong>
                     <span className="text-slate-700">{issue.sections.impact.vulnerabilityNote}</span>
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
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                        {isEn ? "Actionable steps" : "Aksi yang bisa dilakukan"}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka'] mt-0.5">
                        {isEn ? "Preparedness measures" : "Langkah kesiapsiagaan"}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {isEn ? "Choose habits tailored to your immediate environment." : "Pilih kebiasaan yang sesuai dengan tempatmu."}
                      </p>
                    </div>
                  </div>

                  {/* Filter Lokasi */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 self-start">
                    {[
                      { id: "semua", label: isEn ? "All Locations" : "Semua Lokasi" },
                      { id: "rumah", label: isEn ? "🏠 At Home" : "🏠 Di Rumah" },
                      { id: "sekolah", label: isEn ? "🏫 At School" : "🏫 Di Sekolah" },
                      { id: "lingkungan", label: isEn ? "🌳 In Community" : "🌳 Di Lingkungan" },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() =>
                          setActionFilter(
                            loc.id as "semua" | "rumah" | "sekolah" | "lingkungan"
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
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

                <div className="space-y-2">
                  {filteredActions.map((act, idx) => {
                    const isPencegahan = act.type === "pencegahan" || act.type === "prevention";
                    const locationLabels: Record<string, string> = {
                      rumah: isEn ? "🏠 At Home" : "🏠 Di Rumah",
                      home: isEn ? "🏠 At Home" : "🏠 Di Rumah",
                      sekolah: isEn ? "🏫 At School" : "🏫 Di Sekolah",
                      school: isEn ? "🏫 At School" : "🏫 Di Sekolah",
                      lingkungan: isEn ? "🌳 In Community" : "🌳 Di Lingkungan",
                      environment: isEn ? "🌳 In Community" : "🌳 Di Lingkungan",
                    };
                    return (
                      <motion.div
                        key={`${act.title}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: issue.themeColor }}>
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          {act.location && (
                            <span className="text-[10px] font-bold text-slate-500">
                              {locationLabels[act.location] || act.location}
                            </span>
                          )}
                          <span
                            className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: issue.themeColor }}
                          >
                            {isPencegahan
                              ? (isEn ? "Prevention Measure" : "Langkah Pencegahan")
                              : (isEn ? "Safety & Rescue" : "Penyelamatan Diri")}
                          </span>
                        </div>
                        <h4 className="font-black text-base text-slate-900 mb-1 font-['Fredoka']">
                          {act.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {act.description}
                        </p>
                        </div>
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

      {/* 5. NAVIGASI MATERI DIPALING BAWAH: TOMBOL NEXT & PILIHAN ISU LAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 sm:p-8">
          
          {/* Header & Quick Next Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300/60 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {isEn ? "Nature Exploration" : "Eksplorasi Jelajah Alam"}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {isEn ? `Topic ${currentIndex + 1} of ${ALL_ISSUES.length}` : `Topik ${currentIndex + 1} dari ${ALL_ISSUES.length}`}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-slate-900 tracking-tight">
                {isEn ? "Continue to Next Disaster Topic" : "Lanjut ke Isu Bencana Berikutnya"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {isEn
                  ? "Select a topic below or click the button to proceed to the next module."
                  : "Pilih topik di bawah ini atau langsung tekan tombol untuk melanjutkan ke materi selanjutnya."}
              </p>
            </div>

            {/* Tombol Utama Next ke Isu Selanjutnya */}
            <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
              <Link
                to={`/isu/${prevItem.slug}`}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                title={`${isEn ? "Back to previous topic: " : "Kembali ke isu sebelumnya: "}${prevIssue?.title || prevItem.title}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{isEn ? "Previous" : "Sebelumnya"}</span>
              </Link>

              <Link
                to={`/isu/${nextItem.slug}`}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20 active:scale-95 group"
                title={`${isEn ? "Proceed to next topic: " : "Lanjut ke isu berikutnya: "}${nextIssue?.title || nextItem.title}`}
              >
                <span>{isEn ? "Next: " : "Lanjut: "}{nextIssue?.title || nextItem.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
              </Link>
            </div>
          </div>

          {/* Grid 4 Pilihan Isu Bencana (Pilihan Mau Next ke Mananya) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {ALL_ISSUES.map((item, idx) => {
              const Icon = item.icon;
               const isCurrent = item.slug === normalizedSlug;
               const isNext = item.slug === nextItem.slug;
               const itemTheme = issuesData[item.slug]?.themeColor ?? "#64748b";

              return (
                <Link
                  key={item.slug}
                  to={`/isu/${item.slug}`}
                   className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col justify-between group ${
                     isCurrent
                       ? "text-white shadow-lg cursor-default"
                       : isNext
                       ? "bg-white text-slate-800 shadow-md hover:shadow-lg cursor-pointer"
                       : "bg-slate-50/60 hover:bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 hover:shadow-md cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: isCurrent ? itemTheme : `${itemTheme}0d`,
                    borderColor: isCurrent ? itemTheme : `${itemTheme}55`,
                    boxShadow: isCurrent
                      ? `0 0 0 3px ${itemTheme}35`
                      : isNext
                        ? `0 0 0 1px ${itemTheme}25`
                        : undefined,
                  }}
                >
                  <div>
                    {/* Top row: Icon & Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                           isCurrent
                             ? "bg-white/15 text-white"
                             : `${item.bgLight} ${item.accent} border ${item.borderLight}`
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {isCurrent ? (
                         <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 shadow-xs" style={{ color: itemTheme }}>
                          Sedang Dibaca
                        </span>
                      ) : isNext ? (
                         <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-xs" style={{ backgroundColor: itemTheme }}>
                          Selanjutnya →
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">
                          Topik {idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h4
                      className={`font-black text-sm sm:text-base font-['Fredoka'] mb-1 ${
                        isCurrent
                          ? "text-white"
                           : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isCurrent ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Bottom link indicator */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                      isCurrent
                         ? "border-white/20 text-white/80"
                         : "border-slate-100 text-slate-500"
                    }`}
                  >
                    <span>{isCurrent ? "Materi Aktif" : isNext ? "Pilihan Disarankan" : "Buka Topik Ini"}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isCurrent
                           ? "text-white"
                           : "text-slate-400 group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-900 font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <span>← Beranda Utama</span>
            </Link>

            <Link
              to="/simulasi"
              className="text-emerald-800 hover:text-emerald-950 font-black inline-flex items-center gap-1.5 transition-colors bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulasikan Bencana di Laboratorium 3D →</span>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
