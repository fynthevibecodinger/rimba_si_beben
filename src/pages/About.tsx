import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "../router";
import RimbaMascot from "../components/mascot/RimbaMascot";
import EcoLandscape from "../components/hero/EcoLandscape";
import { useLanguage } from "../context/LanguageContext";
import {
  Compass,
  Feather,
  TabletSmartphone,
  HardHat,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  BookOpen,
} from "lucide-react";

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface TeamMember {
  initials: string;
  name: string;
  roleId: string;
  roleEn: string;
  bioId: string;
  bioEn: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  socials?: {
    instagram?: { label: string; url: string };
    linkedin?: { label: string; url: string };
    github?: { label: string; url: string };
  };
}

export default function About() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [selectedGear, setSelectedGear] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const mascotGear = isEn
    ? [
        {
          id: "hat",
          title: "Safari Explorer Hat",
          tag: "Field Observation",
          icon: HardHat,
          desc: "Symbolizing the spirit of field research, weather awareness, and careful observation of forest canopies and riverbanks.",
        },
        {
          id: "vest",
          title: "Forest-Green Ranger Vest",
          tag: "Ecosystem Stewardship",
          icon: Feather,
          desc: "Embodying the commitment to safeguard tropical biodiversity, peatlands, and watershed ecosystems across Indonesia.",
        },
        {
          id: "tablet",
          title: "Smart Field Tablet",
          tag: "Early Warning Data",
          icon: TabletSmartphone,
          desc: "Delivering real-time satellite insights, rainfall indicators, and remote sensor alerts for early disaster preparedness.",
        },
      ]
    : [
        {
          id: "hat",
          title: "Topi Penjelajah Safari",
          tag: "Observasi Lapangan",
          icon: HardHat,
          desc: "Melambangkan semangat riset lapangan, kepekaan terhadap cuaca, dan pengamatan cermat pada ekosistem hutan maupun sungai.",
        },
        {
          id: "vest",
          title: "Rompi Hijau Penjaga Hutan",
          tag: "Pelestarian Alam",
          icon: Feather,
          desc: "Mewujudkan komitmen menjaga kelestarian hutan hujan tropis, lahan gambut, dan daerah aliran sungai Nusantara.",
        },
        {
          id: "tablet",
          title: "Tablet Lapangan Cerdas",
          tag: "Data Peringatan Dini",
          icon: TabletSmartphone,
          desc: "Menyajikan data satelit, indikator curah hujan, dan sensor jarak jauh untuk deteksi dini risiko bencana.",
        },
      ];

  const coreValues = isEn
    ? [
        {
          num: "01",
          title: "Resilient",
          desc: "Boldly prepare, respond calmly to environmental risks, and rise together as an informed community.",
        },
        {
          num: "02",
          title: "Care for Nature",
          desc: "Protect living ecosystems as the strongest natural defense in disaster risk reduction.",
        },
        {
          num: "03",
          title: "Science-Based",
          desc: "Prioritize sensible, verifiable, and accountable environmental data over fatalistic myths.",
        },
        {
          num: "04",
          title: "Collaborative",
          desc: "Build lasting readiness through empathy, local wisdom, and cross-community action.",
        },
      ]
    : [
        {
          num: "01",
          title: "Tangguh (Resilient)",
          desc: "Berani bersiap sejak dini, merespons risiko lingkungan dengan sigap, dan bangkit bersama.",
        },
        {
          num: "02",
          title: "Peduli Alam",
          desc: "Menjaga keseimbangan ekosistem sebagai benteng alami utama dalam pengurangan risiko bencana.",
        },
        {
          num: "03",
          title: "Berbasis Sains",
          desc: "Mengutamakan informasi ilmiah yang masuk akal, relevan, dan dapat dipertanggungjawabkan.",
        },
        {
          num: "04",
          title: "Kolaboratif",
          desc: "Membangun kesiapsiagaan melalui kepedulian, kearifan lokal, dan kerja sama lintas komunitas.",
        },
      ];

  const learningPillars = isEn
    ? [
        {
          step: "Stage 01",
          title: "Science & Cause-Effect",
          subtitle: "Understand the Root",
          desc: "Correct misconceptions that disasters are purely fate. Students trace how natural hazards interact with vulnerable human conditions.",
        },
        {
          step: "Stage 02",
          title: "Interactive Simulation",
          subtitle: "Test & Experiment",
          desc: "Students don't just read static text—they adjust climate variables, manage land use, and observe immediate ecosystem responses.",
        },
        {
          step: "Stage 03",
          title: "Real Student Action",
          subtitle: "Practice at Home",
          desc: "Practical field guides for digging biopore infiltration holes, assembling a 3-day emergency bag, and protecting families.",
        },
      ]
    : [
        {
          step: "Tahap 01",
          title: "Sains & Sebab-Akibat",
          subtitle: "Pahami Akar Masalah",
          desc: "Meluruskan anggapan bahwa bencana semata-mata takdir. Pelajar memahami hubungan antara bahaya alam dan kerentanan lingkungan.",
        },
        {
          step: "Tahap 02",
          title: "Simulasi Interaktif",
          subtitle: "Uji & Eksperimen",
          desc: "Pelajar tidak sekadar membaca teks, melainkan bereksperimen dengan variabel iklim dan melihat dampak langsung pada ekosistem.",
        },
        {
          step: "Tahap 03",
          title: "Aksi Nyata Pelajar",
          subtitle: "Terapkan di Sekitar",
          desc: "Panduan praktis membuat lubang resapan biopori, menyiapkan tas siaga bencana 3 hari, dan melindungi keluarga.",
        },
      ];

  const teamMembers: TeamMember[] = [
    {
      initials: "AM",
      name: "Aziefa Maharani Gitaatmaja",
      roleId: "Riset Konten & Kearifan Lokal",
      roleEn: "Content & Cultural Research",
      bioId: "Menyusun materi literasi kebencanaan, galeri komunitas hijau, serta integrasi kearifan lokal Nusantara.",
      bioEn: "Curates disaster literacy materials, green community showcases, and Indonesian local wisdom integration.",
      accentBg: "bg-emerald-900",
      accentText: "text-amber-300",
      accentBorder: "border-emerald-900/15",
      socials: {
        instagram: {
          label: "@aziefamaharani",
          url: "https://instagram.com/aziefamaharani",
        },
      },
    },
    {
      initials: "AN",
      name: "Adnan Nur Kholis",
      roleId: "Pengembang Utama & Simulasi",
      roleEn: "Lead Developer & Simulation",
      bioId: "Merancang arsitektur aplikasi interaktif, laboratorium simulasi ekosistem, dan pengalaman belajar berbasis web.",
      bioEn: "Architects the interactive web platform, ecosystem simulation lab, and responsive learning experience.",
      accentBg: "bg-amber-400",
      accentText: "text-emerald-950",
      accentBorder: "border-amber-500/30",
      socials: {
        instagram: {
          label: "@adnkh06._",
          url: "https://instagram.com/adnkh06._",
        },
        linkedin: {
          label: "Adnan Nur Kholis",
          url: "https://www.linkedin.com/search/results/all/?keywords=Adnan%20Nur%20Kholis",
        },
        github: {
          label: "ItsAdnkh",
          url: "https://github.com/ItsAdnkh",
        },
      },
    },
    {
      initials: "AC",
      name: "Alfian Chandra Putra Ardhiansyah",
      roleId: "Desain Visual & Aset Edukasi",
      roleEn: "Visual Design & Learning Assets",
      bioId: "Mengembangkan identitas visual ramah pelajar, struktur informasi modul, dan aset pendukung pembelajaran.",
      bioEn: "Crafts student-friendly visual storytelling, module information hierarchy, and educational assets.",
      accentBg: "bg-teal-800",
      accentText: "text-emerald-100",
      accentBorder: "border-teal-800/20",
      socials: {
        instagram: {
          label: "@alf.chan_",
          url: "https://instagram.com/alf.chan_",
        },
      },
    },
  ];

  const currentGear = mascotGear[selectedGear];
  const CurrentGearIcon = currentGear.icon;

  return (
    <div className="w-full bg-[#f7f4eb] text-emerald-950 pb-24 overflow-x-clip">
      {/* 1. HERO BANNER */}
      <section className="eco-hero relative overflow-visible bg-gradient-to-b from-[#dff4ec] via-[#e9f5e9] to-[#f7f4eb]">
        <EcoLandscape />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-emerald-900/15 text-emerald-900 text-xs font-extrabold tracking-wider uppercase shadow-xs">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              {isEn ? "About Rimba Sanctuary" : "Tentang Ruang Belajar Rimba"}
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-[3.4rem] font-black font-['Fredoka'] text-white drop-shadow-[0_2px_12px_rgba(10,38,28,0.45)] leading-[1.12] tracking-tight max-w-4xl mx-auto">
              {isEn
                ? "Empowering Eco-Conscious & Climate-Resilient Generations"
                : "Membangun Generasi Peduli Alam & Tangguh Menghadapi Bencana"}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/95 drop-shadow-[0_1px_6px_rgba(10,38,28,0.5)] max-w-2xl mx-auto leading-relaxed font-medium">
              {isEn
                ? "An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges."
                : "Ruang belajar web interaktif yang membantu generasi muda menjaga ekosistem, mencintai alam, dan siap menghadapi tantangan lingkungan."}
            </p>

            {/* Quick Anchor Pills */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
              {[
                { label: isEn ? "Learn" : "Pelajari", target: "about-mascot" },
                { label: isEn ? "Explore" : "Jelajahi", target: "about-pillars" },
                { label: isEn ? "Act" : "Bertindak", target: "about-cta" },
              ].map((pill) => (
                <button
                  key={pill.target}
                  type="button"
                  onClick={() => scrollToSection(pill.target)}
                  className="px-5 py-2 rounded-full bg-emerald-950/45 hover:bg-emerald-950/70 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/25 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MASCOT FIELD NOTEBOOK (Rimba si Rangkong) */}
      <section
        id="about-mascot"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-16 scroll-mt-24"
      >
        <div className="border-t border-b border-emerald-950/15 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Kolom Kiri: Visual Maskot & Specimen Stamp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex flex-col items-center"
            >
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-900/10 via-amber-200/35 to-teal-700/10 border border-dashed border-emerald-900/25" />
                <motion.div
                  key={selectedGear}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 scale-110"
                >
                  <RimbaMascot size="lg" />
                </motion.div>

                {/* Specimen Label Tag */}
                <div className="absolute -bottom-2 left-2 sm:left-4 bg-[#f7f4eb] border border-emerald-900/20 px-3.5 py-2 rounded-2xl shadow-xs">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                    {isEn ? "Species Inspiration" : "Inspirasi Spesies"}
                  </p>
                  <p className="text-xs font-bold italic text-emerald-950">
                    Buceros rhinoceros
                  </p>
                </div>

                {/* Habitat Tag */}
                <div className="absolute top-3 right-2 sm:right-3 bg-emerald-900 text-amber-300 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  <span>{isEn ? "Tropical Canopy" : "Kanopi Tropis"}</span>
                </div>
              </div>
            </motion.div>

            {/* Kolom Kanan: Narasi Editorial & Gear Interaktif */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? "Field Guide Companion • Mascot Profile"
                      : "Sahabat Penjelajah • Profil Maskot"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-emerald-950 leading-tight">
                  {isEn
                    ? "Rimba the Hornbill Eco-Ranger"
                    : "Rimba si Rangkong Eco-Ranger"}
                </h2>

                <p className="text-emerald-900/85 text-sm sm:text-base leading-relaxed">
                  {isEn ? (
                    <>
                      Rimba is inspired by the{" "}
                      <strong className="text-emerald-950 font-bold">
                        Hornbill (Burung Rangkong)
                      </strong>
                      , a vital umbrella species in Indonesian tropical
                      rainforests known as the{" "}
                      <span className="italic">“farmer of the forest”</span>{" "}
                      for dispersing large canopy tree seeds across dozens of
                      kilometers.
                    </>
                  ) : (
                    <>
                      Rimba terinspirasi dari{" "}
                      <strong className="text-emerald-950 font-bold">
                        Burung Rangkong (Hornbill)
                      </strong>
                      , satwa kunci hutan hujan tropis Indonesia yang dijuluki{" "}
                      <span className="italic">“petani hutan”</span> karena
                      perannya menyebarkan biji pohon besar hingga puluhan
                      kilometer.
                    </>
                  )}
                </p>
              </div>

              {/* Pemilih Perlengkapan Interaktif */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800/80">
                  {isEn
                    ? "Inspect Rimba's Field Equipment:"
                    : "Periksa Perlengkapan Lapangan Rimba:"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {mascotGear.map((gear, index) => {
                    const Icon = gear.icon;
                    const active = selectedGear === index;
                    return (
                      <button
                        key={gear.id}
                        type="button"
                        onClick={() => setSelectedGear(index)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                          active
                            ? "bg-emerald-900 text-white border-emerald-900 shadow-xs"
                            : "bg-transparent text-emerald-900 border-emerald-900/20 hover:border-emerald-900/50 hover:bg-emerald-900/5"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{gear.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Perlengkapan Terpilih */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/[0.04] border-l-4 border-amber-500 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-emerald-950 flex items-center gap-2">
                      <CurrentGearIcon className="w-4 h-4 text-emerald-700" />
                      {currentGear.title}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-400/25 px-2.5 py-0.5 rounded-full">
                      {currentGear.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900/85 leading-relaxed">
                    {currentGear.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM BACKGROUND & VISION-MISSION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Blok Kiri: Latar Belakang Masalah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 rounded-3xl bg-[#0f3d2e] text-white p-7 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-emerald-500/10 pointer-events-none" />

            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-300 mb-3">
              {isEn ? "Problem Background" : "Latar Belakang Masalah"}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] leading-snug mb-5">
              {isEn
                ? "Preparedness Starts with Knowledge"
                : "Kesiapsiagaan Dimulai dari Pemahaman"}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              <p>
                {isEn
                  ? "Indonesia faces high disaster risks, yet understanding of climate change, risk reduction, and personal safety measures remains uneven. Overly theoretical textbooks also make it difficult for students to connect threats in their vicinity to concrete actions."
                  : "Indonesia memiliki tingkat kerawanan bencana yang tinggi, namun literasi perubahan iklim, mitigasi risiko, dan langkah keselamatan diri masih belum merata. Materi yang terlalu teoritis membuat pelajar sulit mengaitkan ancaman di sekitar dengan tindakan nyata."}
              </p>
              <p className="pt-2 border-t border-white/15 text-white font-medium">
                {isEn
                  ? "Rimba serves as a welcoming, engaging, and easy-to-understand learning sanctuary so every student can recognize risks, make sound decisions, and actively protect their surrounding environment."
                  : "Rimba hadir sebagai ruang belajar yang hangat, interaktif, dan mudah dipahami agar setiap pelajar mampu mengenali risiko, mengambil keputusan tepat, dan aktif menjaga lingkungan sekitarnya."}
              </p>
            </div>
          </motion.div>

          {/* Blok Kanan: Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 py-2 sm:px-2 space-y-8"
          >
            <div>
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 mb-2">
                {isEn ? "Rimba's Direction" : "Arah Gerak Rimba"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-emerald-950">
                {isEn ? "Vision & Mission" : "Visi & Misi"}
              </h2>
            </div>

            {/* Vision */}
            <div className="pl-5 border-l-2 border-emerald-800 space-y-1.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                {isEn ? "Our Vision" : "Visi Kami"}
              </h3>
              <p className="text-base sm:text-lg font-bold text-emerald-950 leading-relaxed">
                {isEn
                  ? "Create an Indonesian generation resilient to disasters, caring for the environment, and capable of knowledge-based action."
                  : "Mewujudkan generasi Indonesia yang tangguh bencana, peduli kelestarian alam, dan mampu bertindak berbasis pengetahuan."}
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                {isEn ? "Our Mission" : "Misi Kami"}
              </h3>
              <ul className="space-y-3">
                {(isEn
                  ? [
                      "Provide easy-to-understand disaster and climate literacy.",
                      "Offer interactive simulations to train reasoning and decision-making.",
                      "Encourage small daily actions that protect families, communities, and nature.",
                    ]
                  : [
                      "Menyediakan literasi kebencanaan dan iklim yang mudah dipahami.",
                      "Menghadirkan simulasi interaktif untuk melatih nalar dan pengambilan keputusan.",
                      "Mendorong aksi kecil sehari-hari yang berdampak bagi keluarga, komunitas, dan alam.",
                    ]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-emerald-900/90"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-emerald-950/15">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              {isEn ? "Our Principles" : "Prinsip Utama"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-emerald-950 mt-1">
              {isEn ? "Core Values" : "Nilai-Nilai Inti"}
            </h2>
          </div>
          <p className="text-sm text-emerald-900/75 max-w-md">
            {isEn
              ? "The guiding principles embedded in every material, story, and simulation experience at Rimba."
              : "Prinsip dasar yang tertanam di setiap materi, cerita, dan pengalaman simulasi di Rimba."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {coreValues.map((val, idx) => (
            <motion.div
              key={val.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className={`py-7 sm:py-9 flex items-start gap-5 border-b border-emerald-950/15 ${
                idx % 2 === 0 ? "md:pr-10 md:border-r" : "md:pl-10"
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-emerald-900/25 select-none leading-none pt-1">
                {val.num}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                  {val.title}
                </h3>
                <p className="text-sm text-emerald-900/80 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. 3 SUSTAINABLE LEARNING PILLARS */}
      <section
        id="about-pillars"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14 scroll-mt-24"
      >
        <div className="max-w-2xl mb-10 md:mb-12">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-800">
            {isEn ? "Educational Approach" : "Pendekatan Edukasi"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-emerald-950 mt-1">
            {isEn
              ? "3 Sustainable Learning Pillars"
              : "3 Pilar Pembelajaran Berkelanjutan"}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Garis Penghubung Horizontal pada Layar Desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-emerald-800/30 via-amber-500/50 to-emerald-800/30"
          />

          {learningPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col ${
                idx === 1 ? "md:mt-6" : idx === 2 ? "md:mt-12" : ""
              }`}
            >
              {/* Node Langkah */}
              <div className="relative z-10 flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-2xl bg-[#0f3d2e] text-amber-300 font-['Fredoka'] font-black text-base flex items-center justify-center shadow-xs">
                  0{idx + 1}
                </span>
                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                    {pillar.step}
                  </span>
                  <span className="text-xs font-semibold text-emerald-900/70">
                    {pillar.subtitle}
                  </span>
                </div>
              </div>

              {/* Konten Pilar */}
              <div className="pl-4 border-l-2 border-emerald-900/15 space-y-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                  {pillar.title}
                </h3>
                <p className="text-sm text-emerald-900/80 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. DEVELOPMENT TEAM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-8 border-b border-emerald-950/15">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              {isEn ? "Behind Rimba" : "Di Balik Rimba"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-emerald-950 mt-1">
              {isEn ? "Development Team" : "Tim Pengembang"}
            </h2>
          </div>
          <p className="text-sm text-emerald-900/75">
            {isEn
              ? "Built together to help youth learn, play, and protect nature."
              : "Dikembangkan bersama untuk membantu generasi muda belajar dan menjaga alam."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-2xl bg-white/70 backdrop-blur-xs border ${member.accentBorder} p-6 flex flex-col justify-between gap-5 transition-colors hover:bg-white`}
            >
              <div className="space-y-4">
                {/* Header Avatar Inisial & Peran */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${member.accentBg} ${member.accentText} font-['Fredoka'] font-black text-base flex items-center justify-center flex-shrink-0`}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-base text-emerald-950 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                      {isEn ? member.roleEn : member.roleId}
                    </p>
                  </div>
                </div>

                {/* Bio Singkat */}
                <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
                  {isEn ? member.bioEn : member.bioId}
                </p>
              </div>

              {/* Sosial Media: Hanya tampil jika tersedia */}
              {member.socials && (
                <div className="pt-3 border-t border-emerald-950/10 flex flex-wrap gap-2">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>{member.socials.instagram.label}</span>
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>{member.socials.linkedin.label}</span>
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{member.socials.github.label}</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section
        id="about-cta"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 scroll-mt-24"
      >
        <div className="rounded-3xl bg-[#0b3b2c] text-white p-8 sm:p-12 relative overflow-hidden border border-emerald-800/60">
          {/* Dekorasi Organik Halus */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2.5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? "Start Your Journey" : "Mulai Langkahmu"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-['Fredoka'] leading-tight">
                {isEn
                  ? "Ready to Become a Disaster-Preparedness Hero?"
                  : "Siap Menjadi Pahlawan Siaga Bencana?"}
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/85">
                {isEn
                  ? "Start by exploring an environmental topic or testing your decisions in the interactive simulation lab."
                  : "Mulai dengan mempelajari topik lingkungan sekitar atau uji keputusanmu di laboratorium simulasi interaktif."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/isu/banjir"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-sm transition-all hover:-translate-y-0.5"
              >
                <span>{isEn ? "Explore Materials" : "Jelajahi Materi"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to="/simulasi"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <span>{isEn ? "Enter Simulation" : "Masuk Simulasi"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}