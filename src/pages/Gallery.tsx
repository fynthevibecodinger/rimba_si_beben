import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "../router";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import EcoLandscape from "../components/hero/EcoLandscape";
import { useLanguage } from "../context/LanguageContext";
import { getRangersData, RangerProfile } from "../data/galleryData";
import {
  Sparkles,
  MapPin,
  AtSign,
  Globe,
  ExternalLink,
  X,
  Filter,
  ShieldCheck,
  Quote,
  ArrowRight,
  Award,
  Search,
  Users,
  Waves,
  Star,
  Volume2,
} from "lucide-react";

export default function Gallery() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRanger, setActiveRanger] = useState<RangerProfile | null>(null);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [mascotMood, setMascotMood] = useState<RimbaMood>("wave");

  const rangersData = getRangersData(language);

  const mascotTips = isEn
    ? [
        "Hello Forest Friend! Click any ranger card to see their inspiring environmental actions!",
        "Did you know? Clearing just 1 storm drain from plastics can prevent severe flash floods in your town!",
        "Follow your favorite eco community to get inspired for your green school and local projects!",
      ]
    : [
        "Halo Sobat Rimba! Klik salah satu kartu ranger untuk lihat aksi keren mereka!",
        "Tau nggak? Membersihkan 1 selokan dari plastik bisa cegah banjir di lingkunganmu!",
        "Yuk follow akun komunitas favoritmu biar makin terinspirasi aksi P5!",
      ];

  const mascotTipMoods: RimbaMood[] = ["wave", "celebrate", "scan"];

  const handleRimbaClick = () => {
    const nextIndex = (tipIndex + 1) % mascotTips.length;
    setTipIndex(nextIndex);
    setMascotMood(mascotTipMoods[nextIndex]);
  };

  const categories = isEn
    ? [
        { id: "semua", label: "All Rangers" },
        { id: "sungai", label: "Clean Rivers & Floods" },
        { id: "hutan", label: "Forest & Peat Guardians" },
        { id: "plastik", label: "Plastic-Free Movement" },
        { id: "konservasi", label: "Slope & Water Conservation" },
      ]
    : [
        { id: "semua", label: "Semua Ranger" },
        { id: "sungai", label: "Bersih Sungai & Banjir" },
        { id: "hutan", label: "Penjaga Hutan & Gambut" },
        { id: "plastik", label: "Gerakan Bebas Plastik" },
        { id: "konservasi", label: "Konservasi Lereng & Air" },
      ];

  const filteredRangers = rangersData.filter((r) => {
    const matchesCategory =
      selectedCategory === "semua" || r.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full pb-24 overflow-x-clip">
      {/* 1. HERO BANNER */}
      <section className="eco-hero relative overflow-visible bg-gradient-to-b from-[#dff4ec] via-[#e9f5e9] to-[#f7f5ee] text-[#173a2d] min-h-[620px] lg:min-h-[680px] pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-emerald-900/10 flex flex-col justify-center">
        <EcoLandscape />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#2d6a4f 1.1px, transparent 1.1px), radial-gradient(#52b788 1.1px, #eef4eb 1.1px)",
            backgroundSize: "36px 36px",
            backgroundPosition: "0 0, 18px 18px",
          }}
        />

        <div className="absolute -top-28 -left-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#8d5b4c]/10 blur-3xl pointer-events-none" />

        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-24 sm:h-32 object-cover pointer-events-none opacity-30"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 L180 55 L340 105 L520 35 L740 110 L960 40 L1180 95 L1340 48 L1440 85 L1440 160 L0 160 Z"
            fill="#c6dfcd"
          />
          <path
            d="M0 135 Q240 85 480 125 T960 115 T1440 125 L1440 160 L0 160 Z"
            fill="#b5d5c0"
          />
        </svg>

        {[
          { top: "16%", left: "8%", delay: 0, size: "w-2.5 h-2.5" },
          { top: "64%", left: "26%", delay: 1.1, size: "w-2 h-2" },
          { top: "22%", left: "50%", delay: 0.6, size: "w-3 h-3" },
          { top: "70%", left: "88%", delay: 1.6, size: "w-2.5 h-2.5" },
          { top: "32%", left: "92%", delay: 0.9, size: "w-2 h-2" },
        ].map((dot, idx) => (
          <motion.span
            key={idx}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{
              duration: 3.8 + idx,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
            style={{ top: dot.top, left: dot.left }}
            className={`absolute rounded-full bg-emerald-600/50 blur-[1px] pointer-events-none ${dot.size}`}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-700/20 shadow-md shadow-emerald-950/5 text-xs font-extrabold uppercase tracking-widest text-emerald-800"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isEn
                    ? "Nusantara Eco Ranger Chronicles"
                    : "Jejak Ranger Lingkungan Nusantara"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Fredoka'] leading-[1.14] tracking-tight"
              >
                {isEn ? (
                  <>
                    Eco Ranger Gallery &amp;{" "}
                    <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">
                      Nature Guardians
                    </span>
                  </>
                ) : (
                  <>
                    Galeri Ranger &amp;{" "}
                    <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">
                      Komunitas Penjaga Alam
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="text-base sm:text-lg text-[#305345] font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                {isEn
                  ? "Meet real grassroots environmental heroes in Indonesia actively cleaning polluted rivers, protecting peatland forests, and stabilizing fragile slopes. Follow their initiatives and become part of the change!"
                  : "Kenali para pejuang lingkungan di Indonesia yang bergerak nyata membersihkan sungai, menjaga hutan gambut, dan merawat lereng. Ikuti gerakan mereka dan jadilah bagian dari perubahan!"}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <div className="px-3.5 py-2 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-xs flex items-center gap-2 text-xs font-bold">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isEn ? "6+ Inspiring Movements" : "6+ Gerakan Inspiratif"}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-xs flex items-center gap-2 text-xs font-bold">
                  <Waves className="w-4 h-4 text-sky-700" />
                  <span>
                    {isEn
                      ? "4 Disaster Mitigations"
                      : "Mitigasi 4 Bencana Ekologis"}
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 140 }}
              className="lg:col-span-5 flex flex-col items-center justify-center relative pt-2 lg:pt-0 z-20 overflow-visible"
            >
              <div
                className="relative flex flex-col items-center w-full max-w-sm cursor-pointer select-none overflow-visible"
                onClick={handleRimbaClick}
                title={isEn ? "Click Rimba to switch message" : "Klik Rimba untuk mengganti pesan"}
              >
                <motion.div
                  key={tipIndex}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRimbaClick();
                  }}
                  className="relative z-30 w-full max-w-sm rounded-2xl bg-white/95 px-4 py-3.5 shadow-xl border-2 border-emerald-800/15 text-left cursor-pointer hover:border-emerald-500 transition-all select-none"
                  title={isEn ? "Click to change Rimba's tip" : "Klik untuk mengganti pesan Rimba"}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="flex items-center gap-2 font-['Fredoka'] font-black text-sm text-emerald-800">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                      {isEn ? "Hi, I'm Rimba!" : "Hai, aku Rimba!"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                      {isEn ? `Tip ${tipIndex + 1}/${mascotTips.length}` : `Tips ${tipIndex + 1}/${mascotTips.length}`}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {mascotTips[tipIndex]}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5" />
                      {isEn ? "Eco Care Tip" : "Tips Peduli Alam"}
                    </span>
                    <span className="text-slate-400 font-normal">
                      {isEn ? "Click to change ↻" : "Klik untuk ganti ↻"}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-emerald-800/10 bg-white" />
                </motion.div>
                <RimbaMascot mood={mascotMood} size="lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FILTER, PENCARIAN & GRID KARTU RANGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-3xl bg-white/90 border border-emerald-900/10 shadow-xl shadow-emerald-950/5 space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-900">
              <Filter className="w-4 h-4 text-emerald-700" />
              <span>{isEn ? "Ranger Action Focus:" : "Fokus Gerakan Ranger:"}</span>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? "Search community or city..." : "Cari komunitas atau kota..."}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    active
                      ? "text-white"
                      : "bg-slate-100/90 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeGalleryTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-emerald-700 shadow-md shadow-emerald-900/20"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {filteredRangers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3"
          >
            <p className="text-lg font-black font-['Fredoka'] text-slate-800">
              {isEn ? "No communities found" : "Komunitas tidak ditemukan"}
            </p>
            <p className="text-xs text-slate-500">
              {isEn
                ? "Try other keywords or select the \"All Rangers\" filter."
                : "Coba kata kunci lain atau pilih filter \"Semua Ranger\"."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("semua");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold cursor-pointer"
            >
              {isEn ? "Reset Filter" : "Reset Filter"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredRangers.map((ranger, index) => (
                <motion.div
                  key={ranger.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveRanger(ranger)}
                  className={`group rounded-3xl bg-white overflow-hidden transition-shadow duration-300 cursor-pointer flex flex-col justify-between ${
                    ranger.featured
                      ? "border-2 border-amber-400 shadow-lg shadow-amber-500/10 hover:shadow-2xl"
                      : "border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400"
                  }`}
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-emerald-900">
                      <img
                        src={ranger.image}
                        alt={ranger.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = ranger.fallbackImage;
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-900/90 backdrop-blur-xs text-emerald-100 text-[11px] font-black shadow-xs">
                          {ranger.categoryLabel}
                        </span>
                        {ranger.featured && (
                          <motion.span
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black inline-flex items-center gap-1 shadow-xs"
                          >
                            <Star className="w-3 h-3 fill-emerald-700" />
                            {isEn ? "Featured" : "Sorotan"}
                          </motion.span>
                        )}
                      </div>

                      <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-0.5">
                        <p className="text-[11px] font-semibold text-emerald-100 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
                          <span>{ranger.location}</span>
                        </p>
                        <h3 className="text-xl font-black font-['Fredoka'] leading-tight group-hover:text-emerald-200 transition-colors">
                          {ranger.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7f5ee] border border-emerald-900/10 text-[11px] font-bold text-emerald-950 w-full">
                        <Award className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="truncate">{ranger.impactStat}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {ranger.summary}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-[#f7f5ee] border border-emerald-900/10 text-xs text-slate-700 italic flex items-start gap-2">
                        <Quote className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>&ldquo;{ranger.quote}&rdquo;</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between gap-2">
                    {ranger.instagram ? (
                      <a
                        href={`https://instagram.com/${ranger.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-950 hover:text-pink-600 transition-colors"
                      >
                        <AtSign className="w-3.5 h-3.5 text-pink-600" />
                        <span>{ranger.instagram}</span>
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-emerald-900">
                        {isEn ? "Eco Community" : "Komunitas Hijau"}
                      </span>
                    )}

                    <span className="text-xs font-black text-emerald-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {isEn ? "View Story" : "Lihat Kisah"}{" "}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 3. BANNER AJAKAN PELAJAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/40"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 text-center sm:text-left">
            <RimbaMascot mood="celebrate" size="sm" />
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-950 bg-amber-300 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEn ? "Your Turn to Act!" : "Giliran Kamu Beraksi!"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
                {isEn
                  ? "Ready to Become an Eco Ranger in Your School?"
                  : "Siap Menjadi Ranger Lingkungan di Sekolahmu?"}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {isEn
                  ? "Start by sorting plastic waste, making biopore absorption holes, to conserving clean water at home. Explore complete mitigation guides for 4 ecological hazards now!"
                  : "Mulai dari memilah sampah plastik, membuat lubang biopori, hingga menghemat air di rumah. Pelajari panduan lengkap mitigasi 4 bencana sekarang!"}
              </p>
            </div>
          </div>

          <Link
            to="/isu/banjir"
            className="relative z-10 px-6 py-3.5 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xs sm:text-sm hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shadow-lg flex-shrink-0"
          >
            <span>{isEn ? "Start Real Action" : "Mulai Aksi Nyata"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* 4. MODAL DETAIL PROFIL & PROMOSI RANGER */}
      <AnimatePresence>
        {activeRanger && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveRanger(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl bg-white overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 sm:h-72 bg-emerald-950">
                <img
                  src={activeRanger.image}
                  alt={activeRanger.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = activeRanger.fallbackImage;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <button
                  onClick={() => setActiveRanger(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black">
                    {activeRanger.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
                    {activeRanger.name}
                  </h3>
                  <p className="text-xs text-emerald-200 font-semibold">
                    {activeRanger.roleTag} • {activeRanger.location}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-semibold">
                  🛡️ <strong>{isEn ? "Disaster Mitigation Link:" : "Kaitan Mitigasi Bencana:"}</strong>{" "}
                  {activeRanger.disasterConnection}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeRanger.fullStory}
                </p>

                <blockquote className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;{activeRanger.quote}&rdquo;
                </blockquote>

                <div className="pt-2 flex flex-wrap gap-3">
                  {activeRanger.instagram && (
                    <a
                      href={`https://instagram.com/${activeRanger.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[180px] py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
                    >
                      <AtSign className="w-4 h-4" />
                      <span>Follow @{activeRanger.instagram}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeRanger.website && (
                    <a
                      href={activeRanger.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[180px] py-3 px-4 rounded-2xl bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{isEn ? "Visit Movement" : "Kunjungi Gerakan"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
