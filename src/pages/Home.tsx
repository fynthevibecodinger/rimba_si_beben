import { useState, useRef } from "react";
import { motion } from "motion/react";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import LiveDisasterStats from "../components/home/LiveDisasterStats";
import IssueCard from "../components/home/IssueCard";
import EcoLandscape from "../components/hero/EcoLandscape";
import { Link } from "../router";
import { useGaspAnimation } from "../hooks/useGaspAnimation";
import { getIssuesData } from "../data/getIssuesData";
import { useLanguage } from "../context/LanguageContext";
import {
  Sparkles,
  ArrowDown,
  BookOpen,
  Shield,
  Compass,
  Activity,
  Volume2,
  Leaf,
  Recycle,
  TreePine,
  Check,
  RotateCcw,
  Camera,
} from "lucide-react";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mascotMood, setMascotMood] = useState<RimbaMood>("wave");
  const [speechIndex, setSpeechIndex] = useState(0);
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const { language, t } = useLanguage();

  const isEn = language === "en";

  const ecoActions = isEn
    ? [
        "Sort organic and non-organic waste at home or school",
        "Bring reusable water bottles and eco-friendly shopping bags",
        "Plant and care for at least one tree or plant in your neighborhood",
      ]
    : [
        "Pilah sampah organik dan anorganik di rumah atau lingkungan sekitar",
        "Bawa botol minum dan tas belanja yang dapat digunakan kembali",
        "Rawat satu tanaman atau pohon di lingkungan sekitar",
      ];

  const speechList: { mood: RimbaMood; text: string }[] = isEn
    ? [
        {
          mood: "wave",
          text: "Let's explore our eco lab! Take positive actions and watch nature heal!",
        },
        {
          mood: "celebrate",
          text: "Nature always gives signs. If we protect it, nature protects us too!",
        },
        {
          mood: "scan",
          text: "Check out real-time alerts on floods, landslides, droughts, and forest fires!",
        },
        {
          mood: "alert",
          text: "Watch out for natural signals: ground cracks or rapidly rising river waters.",
        },
        {
          mood: "think",
          text: "Did you know? Deep vetiver roots act as natural anchors on hilly slopes!",
        },
        {
          mood: "celebrate",
          text: "Biopore infiltration holes help rainwater soak into aquifers instead of flooding!",
        },
        {
          mood: "scan",
          text: "Keeping peatlands wet and rehydrated prevents widespread forest fires!",
        },
      ]
    : [
        {
          mood: "wave",
          text: "Ayo coba permainan alam kami. Kamu bisa memilih aksi baik dan melihat hasilnya!",
        },
        {
          mood: "celebrate",
          text: "Alam selalu memberi tanda. Kalau kita menjaganya, alam juga membantu menjaga kita!",
        },
        {
          mood: "scan",
          text: "Yuk lihat kabar terbaru tentang banjir, longsor, kekeringan, dan kebakaran hutan!",
        },
        {
          mood: "alert",
          text: "Perhatikan tanda alam, seperti tanah retak atau air sungai yang naik terlalu cepat.",
        },
        {
          mood: "think",
          text: "Tahukah kamu? Akar rumput akar wangi bisa membantu menahan tanah di lereng bukit!",
        },
        {
          mood: "celebrate",
          text: "Lubang resapan di lingkungan sekitar membantu air hujan masuk ke tanah, bukan menggenang!",
        },
        {
          mood: "scan",
          text: "Lahan gambut yang tetap basah tidak mudah terbakar. Yuk ikut menjaganya!",
        },
      ];

  const currentSpeech = speechList[speechIndex % speechList.length];

  // Hook up GSAP entrance & mountain parallax
  useGaspAnimation(rootRef);

  const handleMascotClick = () => {
    const nextIndex = (speechIndex + 1) % speechList.length;
    setSpeechIndex(nextIndex);
    setMascotMood(speechList[nextIndex].mood);
  };

  const scrollToMission = () => {
    const el = document.getElementById("misi-lingkungan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAction = (index: number) => {
    setCompletedActions((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  return (
    <div ref={rootRef} className="w-full">
      {/* 1. HERO SECTION DENGAN BACKGROUND INTERAKTIF & TATA LETAK LAPANG */}
      <section
        data-reveal
        className="eco-hero relative overflow-hidden bg-gradient-to-b from-[#dff4ec] via-[#e9f5e9] to-[#f7f5ee] min-h-[620px] lg:min-h-[680px] pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-emerald-900/10 flex flex-col justify-center"
      >
        {/* Animated Eco Landscape (Pegunungan Parallax, Satelit Orbit, Awan, Kincir Angin, Rumah, Sungai) */}
        <EcoLandscape />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Kolom Kiri: Judul, Deskripsi & Tombol Aksi */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Identitas */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-700/20 shadow-md shadow-emerald-950/5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 backdrop-blur-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                {isEn ? "Environmental Education & Awareness Hub" : "Portal Edukasi & Kampanye Peduli Lingkungan"}
              </div>

              {/* Headline Bersih & Rapi Tanpa Font Terpotong */}
              <h1 className="font-['Fredoka'] text-4xl sm:text-5xl lg:text-6xl font-black text-[#173a2d] tracking-tight leading-[1.14]">
                {isEn ? (
                  <>
                    Nurture Nature, <br />
                    <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">
                      Start Real Action
                    </span>{" "}
                    <br />
                    for Earth!
                  </>
                ) : (
                  <>
                    Rawat Alam, <br />
                    <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">
                      Mulai Aksi Nyata
                    </span>{" "}
                    <br />
                    untuk Bumi!
                  </>
                )}
              </h1>

              {/* Deskripsi Jelas & Terbaca */}
              <p className="text-base sm:text-lg text-[#305345] font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {isEn
                  ? "Understand the links between climate shifts and disasters through interactive learning, virtual simulations, and practical eco-actions."
                  : "Kenali hubungan antara perubahan lingkungan dan bencana melalui materi yang mudah dipahami, simulasi ekosistem, serta panduan aksi sederhana untuk menjaga alam, pengelolaan sampah, dan penghijauan."}
              </p>

              {/* Tombol Aksi Utama Bersih */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToMission}
                  className="px-8 py-4 rounded-2xl bg-[#173a2d] hover:bg-[#1f4e3c] text-white font-extrabold text-base shadow-xl shadow-emerald-950/20 inline-flex items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-emerald-300" />
                  <span>{t("btn_start_mission", "Mulai Misi Lingkungan")}</span>
                  <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                </button>
              </div>

              {/* Lencana Terpercaya */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-700 font-bold">
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white shadow-xs">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>{t("btn_learn_action", "Belajar Berbasis Aksi")}</span>
                </div>
                <Link
                  to="/simulasi"
                  className="flex items-center gap-2 bg-white/85 hover:bg-emerald-50 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white shadow-xs text-emerald-900 transition-colors"
                  title={isEn ? "Enter Ecosystem Simulation Lab" : "Masuk ke Lab Simulasi Ekosistem"}
                >
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <span>{isEn ? "Try Ecosystem Simulation →" : "Coba Simulasi Ekosistem →"}</span>
                </Link>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white shadow-xs">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>{t("stat_eco_action", "Peduli Alam Indonesia")}</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Maskot Rimba dengan Balon Ucapan Tips Tepat di Atasnya */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-2 lg:pt-0">
              <div className="relative flex flex-col items-center w-full max-w-sm">
                {/* Balon Ucapan Tips Interaktif */}
                <motion.div
                  key={speechIndex}
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={handleMascotClick}
                  className="w-full max-w-xs bg-white/95 backdrop-blur-xs rounded-2xl p-4 shadow-xl border-2 border-emerald-800/15 cursor-pointer hover:border-emerald-500 transition-all mb-4 select-none relative group hover:scale-[1.02] z-20"
                  title={isEn ? "Click to hear new eco tips!" : "Klik untuk mendengar tips siaga baru!"}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 font-['Fredoka'] font-black text-emerald-800 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      {t("mascot_greeting", "Hai, aku Rimba!")}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                      Tips {(speechIndex % speechList.length) + 1}/{speechList.length}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {currentSpeech.text}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      {t("mascot_tips_category", "Tips Peduli Alam")}
                    </span>
                    <span className="text-slate-400 font-normal group-hover:text-emerald-600 transition-colors">
                      {t("mascot_click_change", "Klik untuk ganti ↻")}
                    </span>
                  </div>

                  {/* Penunjuk Segitiga Balon Ucapan */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-emerald-800/15 transform rotate-45 pointer-events-none" />
                </motion.div>

                {/* Maskot Rimba Interaktif */}
                <div
                  onClick={handleMascotClick}
                  className="cursor-pointer group select-none flex flex-col items-center relative z-10"
                  title={isEn ? "Click me for eco tips!" : "Klik aku untuk tips siaga baru!"}
                >
                  <RimbaMascot
                    mood={mascotMood}
                    size="lg"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE DISASTER STATS (PetaBencana.id API Integration) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <LiveDisasterStats />
      </div>

      {/* 3. PORTAL 4 KARTU ISU BENCANA */}
      <section data-reveal id="daftar-materi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            {isEn ? "Explore Environmental Issues" : "Jelajah Isu Lingkungan"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Fredoka']">
            {isEn ? "Understand the Risks, Protect the Ecosystem" : "Pahami Risiko, Lindungi Ekosistem"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {isEn
              ? "Every challenge is tied to how we interact with our environment. Explore topics below to understand root causes, prevention strategies, and take action quizzes."
              : "Setiap isu memiliki hubungan dengan cara kita memperlakukan alam. Pilih materi di bawah untuk memahami penyebab bencana, cara mencegahnya, dan aksi nyata melalui kuis."}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(getIssuesData(language)).map((issue, idx) => (
            <IssueCard key={issue.slug} issue={issue} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. KAMPANYE AKSI LINGKUNGAN */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-[#e8f5ed] border border-emerald-200/80 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                {isEn ? "Eco Care Campaign" : "Kampanye Peduli Lingkungan"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#173a2d] font-['Fredoka'] mt-2">
                {isEn ? "One good habit creates impact for countless lives" : "Satu kebiasaan baik, dampak untuk banyak kehidupan"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                {isEn
                  ? "Start with small, consistent actions at home and school. A preserved ecosystem actively reduces natural disaster risks."
                  : "Lakukan aksi kecil yang bisa dimulai dari rumah, lingkungan sekitar, atau destinasi wisata. Alam yang terjaga juga membantu mengurangi risiko bencana."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Leaf,
                  title: isEn ? "Protect Nature" : "Menjaga Alam",
                  text: isEn
                    ? "Keep forests, rivers, and outdoor tourist spots clean and pristine."
                    : "Pelajari cara menjaga hutan, sungai, dan tempat wisata tetap bersih.",
                },
                {
                  icon: Recycle,
                  title: isEn ? "Waste Management" : "Kelola Sampah",
                  text: isEn
                    ? "Sort, reuse, and reduce waste generation directly from the source."
                    : "Pilah, gunakan kembali, dan kurangi sampah dari sumbernya.",
                },
                {
                  icon: TreePine,
                  title: isEn ? "Green the Earth" : "Hijaukan Lingkungan",
                  text: isEn
                    ? "Plant and nurture green foliage around residential and school spaces."
                    : "Tanam dan rawat pohon di sekitar rumah dan lingkungan tempat tinggal.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white/85 rounded-2xl border border-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALERI AKSI DAN ALAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
              {isEn ? "Visualize & Inspire" : "Lihat dan Bayangkan"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#173a2d] font-['Fredoka'] mt-2">
              {isEn ? "The Nature We Seek to Protect" : "Alam yang ingin kita jaga"}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
            <Camera className="w-4 h-4 text-emerald-700" />{" "}
            {isEn ? "Eco Action Gallery" : "Galeri aksi lingkungan"}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: isEn ? "Lush Rainforest" : "Hutan Lestari",
              label: isEn ? "Sanctuary for biodiversity" : "Rumah bagi banyak hewan",
              emoji: "🌳",
              tone: "from-emerald-800 to-lime-600",
            },
            {
              title: isEn ? "Clear River" : "Sungai Bersih",
              label: isEn ? "Lifeblood of communities" : "Air untuk semua kehidupan",
              emoji: "🌊",
              tone: "from-sky-700 to-cyan-400",
            },
            {
              title: isEn ? "Green Community" : "Lingkungan Hijau",
              label: isEn ? "Thriving with nature" : "Tumbuh bersama alam",
              emoji: "🌱",
              tone: "from-teal-800 to-emerald-400",
            },
            {
              title: isEn ? "Responsible Eco-Trip" : "Wisata Bijak",
              label: isEn ? "Leave no footprint" : "Datang, nikmati, jaga",
              emoji: "🏞️",
              tone: "from-amber-700 to-orange-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`min-h-44 rounded-3xl bg-gradient-to-br ${item.tone} p-5 text-white relative overflow-hidden shadow-lg group`}
            >
              <div className="absolute -right-3 -bottom-5 text-7xl opacity-30 group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>
              <div className="relative z-10">
                <span className="text-3xl" role="img" aria-label={item.title}>
                  {item.emoji}
                </span>
                <h3 className="font-bold text-lg mt-4">{item.title}</h3>
                <p className="text-xs text-white/80 mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MISI AKSI NYATA */}
      <section data-reveal id="misi-lingkungan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 scroll-mt-24">
        <div className="rounded-3xl bg-[#173a2d] text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-24 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                Rimba Eco Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] mt-2">
                {isEn ? "Start with one action today" : "Mulai dari satu aksi hari ini"}
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed mt-3">
                {isEn
                  ? "Check off actions you've completed. Perfection isn't required—consistency and collaboration are what matter."
                  : "Centang aksi yang sudah kamu lakukan. Tidak perlu sempurna—yang penting dimulai dan dilakukan bersama."}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{ width: `${(completedActions.length / ecoActions.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-amber-300">
                  {completedActions.length}/{ecoActions.length}
                </span>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-3">
              {ecoActions.map((action, index) => {
                const completed = completedActions.includes(index);
                return (
                  <button
                    key={action}
                    type="button"
                    onClick={() => toggleAction(index)}
                    className={`w-full flex items-center gap-3 text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                      completed
                        ? "bg-emerald-400/20 border-emerald-300/60"
                        : "bg-white/5 border-white/15 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        completed
                          ? "bg-emerald-300 text-emerald-950"
                          : "border border-emerald-300/60 text-transparent"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </span>
                    <span className={`text-sm ${completed ? "text-emerald-100 line-through" : "text-white"}`}>
                      {action}
                    </span>
                  </button>
                );
              })}
              {completedActions.length === ecoActions.length && (
                <div className="flex items-center gap-2 text-sm text-amber-300 font-bold pt-1">
                  <Leaf className="w-4 h-4" />
                  {isEn
                    ? "All missions completed—thank you for protecting our Earth!"
                    : "Semua misi selesai—terima kasih sudah menjaga bumi!"}
                </div>
              )}
              {completedActions.length > 0 && completedActions.length < ecoActions.length && (
                <button
                  type="button"
                  onClick={() => setCompletedActions([])}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isEn ? "Reset missions" : "Mulai ulang misi"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BANNER FITUR SIMULASI EKOSISTEM */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#173a2d] via-[#1b4332] to-[#2d6a4f] text-white p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Background decorative glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isEn ? "Interactive Ecosystem Sandbox" : "Tempat Mencoba dan Belajar Interaktif"}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black font-['Fredoka'] leading-tight">
                {isEn
                  ? "Test the Impact of Our Actions on the Ecosystem"
                  : "Uji Dampak Aksi Kita terhadap Ekosistem"}
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                {isEn
                  ? "What happens when heavy torrential rains hit a city without water absorption areas? How do tree roots, biopores, and canal dams protect our environment? Test your scenarios live on our simulation canvas!"
                  : "Apa yang terjadi jika hujan deras turun di kota tanpa area resapan? Bagaimana akar pohon, biopori, dan sekat kanal membantu menjaga alam? Uji pilihanmu langsung di kanvas simulasi kami!"}
              </p>
              <div className="pt-2">
                <Link
                  to="/simulasi"
                  className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-xl inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  {isEn ? "Launch Ecosystem Simulation" : "Coba Simulasi Ekosistem"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <RimbaMascot
                mood="scan"
                size="lg"
                speech={
                  isEn
                    ? "Experience firsthand the power of tree roots and biopores!"
                    : "Buktikan sendiri kekuatan akar pohon dan biopori!"
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
