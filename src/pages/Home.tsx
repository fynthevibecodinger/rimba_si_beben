import { useState, useRef } from "react";
import { motion } from "motion/react";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import LiveDisasterStats from "../components/home/LiveDisasterStats";
import IssueCard from "../components/home/IssueCard";
import EcoLandscape from "../components/hero/EcoLandscape";
import RootSnakeScroll from "../components/common/RootSnakeScroll";
import { Link } from "../router";
import { useGaspAnimation } from "../hooks/useGaspAnimation";
import { issuesData } from "../data/issuesData";
import { Sparkles, ArrowDown, BookOpen, Shield, Compass, Activity, Volume2 } from "lucide-react";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mascotMood, setMascotMood] = useState<RimbaMood>("wave");
  const [speechIndex, setSpeechIndex] = useState(0);

  const speechList: { mood: RimbaMood; text: string }[] = [
    {
      mood: "wave",
      text: "Coba laboratorium virtual simulasi ekosistem kami, seru banget lho!",
    },
    {
      mood: "celebrate",
      text: "Alam memberi tanda sebelum bahaya datang. Bersama teknologi hijau, kita bisa selamat!",
    },
    {
      mood: "scan",
      text: "Sedang memindai curah hujan & titik panas satelit... Yuk periksa data pantauan di bawah!",
    },
    {
      mood: "alert",
      text: "Waspada tanda alam! Kenali retakan tanah dan tinggi muka air sebelum bahaya tiba.",
    },
    {
      mood: "think",
      text: "Tahukah kamu? Akar rumput Vetiver bisa menembus tanah hingga 4 meter mengunci lereng!",
    },
    {
      mood: "celebrate",
      text: "Lubang biopori di halaman sekolah bisa meningkatkan daya serap air hujan hingga 40%!",
    },
    {
      mood: "scan",
      text: "Sekat kanal di lahan gambut menjaga air tetap tinggi agar api bawah tanah tidak menyala.",
    },
  ];

  const currentSpeech = speechList[speechIndex];

  // Hook up GSAP entrance & mountain parallax
  useGaspAnimation(rootRef);

  const handleMascotClick = () => {
    const nextIndex = (speechIndex + 1) % speechList.length;
    setSpeechIndex(nextIndex);
    setMascotMood(speechList[nextIndex].mood);
  };

  const scrollToIssues = () => {
    const el = document.getElementById("daftar-materi");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={rootRef} className="w-full relative">
      {/* Indikator Interaktif Akar Rimba & Ular Melata (Khusus Halaman Beranda) */}
      <RootSnakeScroll />

      {/* 1. HERO SECTION DENGAN BACKGROUND INTERAKTIF & TATA LETAK LAPANG (PAS DI LAYAR) */}
      <section className="eco-hero relative overflow-hidden bg-gradient-to-b from-[#dff4ec] via-[#e9f5e9] to-[#f7f5ee] min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16 border-b border-emerald-900/10">
        {/* Animated Eco Landscape (Pegunungan Parallax, Satelit Orbit, Awan, Kincir Angin, Rumah, Sungai) */}
        <EcoLandscape />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Kolom Kiri: Judul, Deskripsi & Tombol Aksi */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-3.5 lg:space-y-4 text-center lg:text-left">
              {/* Badge Identitas */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-emerald-700/20 shadow-xs text-xs font-extrabold uppercase tracking-wider text-emerald-800 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Laboratorium Literasi Bencana Pelajar</span>
              </div>

              {/* Headline Bersih & Rapi Tanpa Font Terpotong */}
              <h1 className="font-['Fredoka'] text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-black text-[#173a2d] tracking-tight leading-[1.14]">
                Jaga Bumi dengan <br />
                <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">
                  Teknologi Hijau
                </span> <br />
                &amp; Aksi Nyata!
              </h1>

              {/* Deskripsi Jelas & Terbaca */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-[#305345] font-medium max-w-xl leading-relaxed mx-auto lg:mx-0">
                Jelajahi bagaimana sensor IoT, pemantauan satelit, dan kecerdasan ekologis 
                membantu kita memitigasi bencana hidrometeorologi di Indonesia. Belajar sains, uji skenario virtual, dan raih sertifikat kesiapsiagaan!
              </p>

              {/* Tombol Aksi Utama Bersih */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  onClick={scrollToIssues}
                  className="px-6 py-3 rounded-xl sm:px-7 sm:py-3.5 sm:rounded-2xl bg-[#173a2d] hover:bg-[#1f4e3c] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/15 inline-flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                  <span>Eksplorasi 4 Materi Isu</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-bounce" />
                </button>
              </div>

              {/* Lencana Terpercaya (P5, Virtual Lab, & PetaBencana) */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-[11px] text-slate-700 font-bold">
                <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white shadow-2xs">
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Sesuai P5 Kurikulum Merdeka</span>
                </div>
                <Link
                  to="/simulasi"
                  className="flex items-center gap-1.5 bg-white/85 hover:bg-emerald-50 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white shadow-2xs text-emerald-900 transition-colors"
                  title="Masuk ke Lab Simulasi Ekosistem"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Laboratorium Virtual →</span>
                </Link>
                <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white shadow-2xs">
                  <Activity className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Data Real-time PetaBencana.id</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Maskot Rimba dengan Balon Ucapan Tips Tepat di Atasnya */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-1 lg:pt-0">
              <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm">
                
                {/* Balon Ucapan Tips Interaktif - Ditempatkan di Atas Maskot dengan Panah Menunjuk ke Topi Rimba */}
                <motion.div
                  key={speechIndex}
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={handleMascotClick}
                  className="w-full max-w-[270px] sm:max-w-[290px] bg-white/95 backdrop-blur-xs rounded-2xl p-3 sm:p-3.5 shadow-lg border border-emerald-800/15 cursor-pointer hover:border-emerald-500 transition-all mb-2 select-none relative group hover:scale-[1.02] z-20"
                  title="Klik untuk mendengar tips siaga baru!"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-['Fredoka'] font-black text-emerald-800 text-xs sm:text-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Hai, aku Rimba!
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                      Tips {speechIndex + 1}/{speechList.length}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                    {currentSpeech.text}
                  </p>

                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />
                      Tips Siaga
                    </span>
                    <span className="text-slate-400 font-normal group-hover:text-emerald-600 transition-colors">
                      Klik untuk ganti ↻
                    </span>
                  </div>

                  {/* Penunjuk Segitiga Balon Ucapan Mengarah ke Topi Rimba di Bawahnya */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-emerald-800/15 transform rotate-45 pointer-events-none" />
                </motion.div>

                {/* Maskot Rimba Interaktif (Terlihat Jelas 100% Tanpa Terhalang Apapun) */}
                <div
                  onClick={handleMascotClick}
                  className="cursor-pointer group select-none flex flex-col items-center relative z-10"
                  title="Klik aku untuk tips siaga baru!"
                >
                  <RimbaMascot
                    mood={mascotMood}
                    size="md"
                    className="w-44 h-48 sm:w-48 sm:h-52 lg:w-52 lg:h-56 transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Jarak bernapas di bagian bawah untuk pemandangan eco landscape */}
        <div className="w-full h-4 sm:h-6 lg:h-8 relative z-10 pointer-events-none" />
      </section>

      {/* 2. LIVE DISASTER STATS (PetaBencana.id API Integration) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <LiveDisasterStats />
      </div>

      {/* 3. PORTAL 4 KARTU ISU BENCANA */}
      <section id="daftar-materi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            Materi Pembelajaran Mitigasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Fredoka']">
            Pahami 4 Ancaman Hidrometeorologi Terbesar
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Setiap bencana memiliki siklus sebab-akibat ekologis. Pilih salah satu materi di bawah 
            untuk mempelajari sainsnya, langkah pencegahannya, dan uji pemahamanmu lewat kuis interaktif!
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(issuesData).map((issue, idx) => (
            <IssueCard key={issue.slug} issue={issue} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. BANNER FITUR SIMULASI EKOSISTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#173a2d] via-[#1b4332] to-[#2d6a4f] text-white p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Background decorative glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Laboratorium Virtual Interaktif
              </span>
              <h3 className="text-3xl sm:text-4xl font-black font-['Fredoka'] leading-tight">
                Uji Ketahanan Lingkungan di Simulasi Ekosistem
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                Apa yang terjadi jika hujan 100 mm mengguyur kota yang 100% dibeton tanpa biopori? 
                Bagaimana sekat kanal menyelamatkan lahan gambut dari bara api? 
                Kendalikan cuaca dan aksi pelestarian secara langsung di kanvas simulasi reaktif kami!
              </p>
              <div className="pt-2">
                <Link
                  to="/simulasi"
                  className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-xl inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  Masuk ke Ruang Simulasi Sekarang
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <RimbaMascot mood="scan" size="lg" speech="Buktikan sendiri kekuatan akar pohon dan biopori!" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
