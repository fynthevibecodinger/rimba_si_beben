import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Sparkles,
  HelpCircle,
  MessageSquareQuote,
  Lightbulb,
  MapPin,
  ArrowRight,
  Award,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { IssueContent } from "../data/issuesData";
import type { IssueExtra } from "../data/issuesExtra";
import AnimatedFactCard from "../components/issue/AnimatedFactCard";
import InteractiveGlossary from "../components/issue/InteractiveGlossary";

interface Props {
  issue: IssueContent;
  extra?: IssueExtra;
  tab: "sebab" | "dampak" | "aksi";
}

const caseStudies: Record<
  string,
  {
    region: string;
    tag: string;
    statBadge: string;
    title: string;
    chronology: string;
    rootCause: string;
    solution: string;
  }
> = {
  banjir: {
    region: "DAS Ciliwung • Bogor – Jakarta",
    tag: "Studi Kasus Ekosistem Hulu–Hilir",
    statBadge: "6–9 Jam Waktu Aliran Hulu ke Hilir",
    title: "Mengapa Hujan Lebat di Puncak Bisa Merendam Permukiman Jakarta?",
    chronology:
      "Saat hujan ekstrem mengguyur kawasan hulu Puncak Bogor, jutaan meter kubik air mengalir memasuki Sungai Ciliwung. Di sepanjang aliran tengah hingga hilir, sempadan sungai menyempit akibat bangunan dan sampah plastik sehingga air meluap ke permukiman dalam hitungan jam.",
    rootCause:
      "Berkurangnya tutupan hutan resapan di hulu dan tertutupnya permukaan tanah kota oleh beton menghambat proses infiltrasi alami tanah.",
    solution:
      "Revitalisasi daerah resapan hulu, pembangunan kolam retensi & sumur biopori warga, serta sistem sensor tinggi muka air EWS di pintu air.",
  },
  "tanah-longsor": {
    region: "Perbukitan Banjarnegara • Jawa Tengah",
    tag: "Studi Kasus Geohidrologi Lereng",
    statBadge: "3–4 Meter Kedalaman Akar Vetiver",
    title: "Mengunci Lereng Curam dengan Sabuk Hijau Rumput Vetiver",
    chronology:
      "Hujan berintensitas tinggi selama beberapa hari berturut-turut membuat lapisan tanah pelapukan di lereng perbukitan menjadi jenuh air. Air yang tertahan di atas batuan kedap melicinkan bidang gelincir hingga lereng runtuh menimbun jalur di bawahnya.",
    rootCause:
      "Alih fungsi lahan hutan berakar dalam menjadi kebun sayuran semusim berakar dangkal tanpa saluran drainase terarah.",
    solution:
      "Penanaman rumput akar wangi (vetiver) sebagai paku bumi alami, pembuatan terasering berundak, dan pemasangan sensor retakan ekstensometer.",
  },
  kekeringan: {
    region: "Kawasan Karst Gunungkidul & Nusa Tenggara",
    tag: "Studi Kasus Adaptasi Kemarau",
    statBadge: "100 Liter/Malam dari Jaring Embun",
    title: "Menabung Air Hujan dan Kabut di Tengah Kemarau Panjang El Niño",
    chronology:
      "Pada puncak fenomena El Niño, wilayah perbukitan kapur (karst) dan kepulauan kering mengalami kemarau lebih dari 5 bulan. Sungai permukaan mengering dan sumur dangkal warga menyusut drastis.",
    rootCause:
      "Curah hujan rendah diperparah laju penguapan tinggi pada lahan terbuka tanpa penutup tanah serta minimnya penampungan air saat musim hujan.",
    solution:
      "Pembangunan embung desa, instalasi Pemanenan Air Hujan (PAH) di atap rumah, mulsa daun kering di kebun, dan gerakan hemat air harian.",
  },
  "kebakaran-hutan": {
    region: "Kubah Gambut Riau & Kalimantan Tengah",
    tag: "Studi Kasus Restorasi Gambut",
    statBadge: "40 cm Batas Aman Muka Air Gambut",
    title: "Menghentikan Api Bawah Tanah dengan Restorasi Sekat Kanal",
    chronology:
      "Pada musim kemarau, gambut yang mengering mudah tersulut percikan api dan membara tanpa nyala di kedalaman 1–3 meter bawah tanah, menghasilkan kabut asap pekat PM2.5 yang melumpuhkan sekolah dan penerbangan.",
    rootCause:
      "Pembuatan kanal drainase liar menguras air alami kubah gambut sehingga lapisan bahan organik purba berubah kering seperti bahan bakar.",
    solution:
      "Pembangunan sekat kanal (canal blocking) untuk membasahi kembali gambut (rewetting) serta pemantauan titik panas satelit SiPongi KLHK.",
  },
};

export default function IssueExtraMaterial({ issue, extra, tab }: Props) {
  const [openMyth, setOpenMyth] = useState<number | null>(0);
  const [caseTab, setCaseTab] = useState<"chronology" | "rootCause" | "solution">("chronology");
  const [done, setDone] = useState<boolean[]>(
    extra?.challenge7Days.map(() => false) ?? []
  );

  const { quickFacts, mythsAndFacts, readiness } = issue.sections;
  const doneCount = done.filter(Boolean).length;
  const progressPercent = extra?.challenge7Days.length
    ? Math.round((doneCount / extra.challenge7Days.length) * 100)
    : 0;

  const toggleDay = (i: number) =>
    setDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const currentCase = caseStudies[issue.slug];

  return (
    <div className="space-y-10">
      {/* ================= TAB 1: SEBAB-AKIBAT ================= */}
      {tab === "sebab" && (
        <motion.div
          key="tab-sebab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {/* 1. Kartu Analogi & Cerita Ilustrasi dengan Visual Editorial */}
          {extra && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Kartu Gampangnya Begini (5 kolom) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-cyan-50/70 border-2 border-sky-200/80 shadow-sm flex flex-col justify-between"
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-sky-200/30 pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-600 text-white text-xs font-black uppercase tracking-wider shadow-xs">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Gampangnya Begini</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                    &ldquo;{extra.analogy}&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-sky-200/70 flex items-center gap-2 text-xs text-sky-900 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Konsep Sains Sederhana • {issue.heroBadge}</span>
                </div>
              </motion.div>

              {/* Kartu Cerita Ilustrasi (7 kolom) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="lg:col-span-7 relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-2 border-amber-200/80 shadow-sm flex flex-col justify-between"
              >
                <div className="absolute -right-4 -bottom-6 text-8xl font-black text-amber-500/10 select-none pointer-events-none font-['Fredoka']">
                  P5
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Kisah Pelajar Siaga</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Ilustrasi Edukatif
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 font-['Fredoka']">
                    {extra.story.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {extra.story.text}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-amber-200/70 text-xs text-amber-900 font-bold">
                  💡 Refleksi: Perubahan besar selalu dimulai dari kebiasaan kecil di sekitar kita.
                </div>
              </motion.div>
            </div>
          )}

          {/* 2. Kartu Fakta Angka & Statistik Kunci */}
          {quickFacts && (
            <AnimatedFactCard
              facts={quickFacts}
              themeColor={issue.themeColor}
              slug={issue.slug}
            />
          )}

          {/* 3. Studi Kasus Nyata Nusantara (Interaktif 3 Tab: Kronologi, Akar Masalah, Solusi) */}
          {currentCase && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white border-2 border-slate-200/90 shadow-md overflow-hidden"
            >
              {/* Header Banner Studi Kasus */}
              <div
                className="p-6 sm:p-7 text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${issue.themeColor}, #0f172a)`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    {currentCase.region}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                    ⚡ {currentCase.statBadge}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-white/75 font-bold mb-1">
                  {currentCase.tag}
                </p>
                <h4 className="text-xl sm:text-2xl font-black font-['Fredoka'] leading-snug">
                  {currentCase.title}
                </h4>
              </div>

              {/* Tombol Navigasi Studi Kasus */}
              <div className="p-6 sm:p-7 space-y-5 bg-slate-50/60">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "chronology", label: "1. Kronologi Peristiwa" },
                    { id: "rootCause", label: "2. Akar Masalah" },
                    { id: "solution", label: "3. Solusi & Pelajaran" },
                  ].map((item) => {
                    const active = caseTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          setCaseTab(item.id as "chronology" | "rootCause" | "solution")
                        }
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          active
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Isi Tab Studi Kasus */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={caseTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
                  >
                    {caseTab === "chronology" && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-sky-700 block">
                          Bagaimana Peristiwa Terjadi:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {currentCase.chronology}
                        </p>
                      </div>
                    )}
                    {caseTab === "rootCause" && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                          Faktor Utama Penyebab Bencana:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {currentCase.rootCause}
                        </p>
                      </div>
                    )}
                    {caseTab === "solution" && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block">
                          Langkah Mitigasi yang Terbukti Efektif:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {currentCase.solution}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* 4. Kamus Mini Istilah Sains Bencana */}
          {extra?.glossary && (
            <InteractiveGlossary
              glossary={extra.glossary}
              themeColor={issue.themeColor}
            />
          )}
        </motion.div>
      )}

      {/* ================= TAB 2: DAMPAK BENCANA ================= */}
      {tab === "dampak" && (
        <motion.div
          key="tab-dampak"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Kartu Mitos atau Fakta */}
          {mythsAndFacts && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <span>Uji Pemahaman: Mitos atau Fakta?</span>
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Klik kartu untuk membuka fakta ilmiahnya
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mythsAndFacts.map((m, i) => {
                  const open = openMyth === i;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setOpenMyth(open ? null : i)}
                      className={`text-left p-6 rounded-3xl border-2 transition-all shadow-xs ${
                        open
                          ? "bg-gradient-to-br from-emerald-50 to-teal-50/70 border-emerald-400 text-emerald-950"
                          : "bg-gradient-to-br from-rose-50/80 to-orange-50/50 border-rose-200 hover:border-rose-300 text-rose-950"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                            open
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                          }`}
                        >
                          {open ? "✅ Fakta Ilmiah" : "❓ Mitos Populer"}
                        </span>
                        <span className="text-xs text-slate-500 font-bold">
                          {open ? "Sembunyikan ▲" : "Cek Fakta ▼"}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        &ldquo;{m.myth}&rdquo;
                      </p>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pt-3 mt-3 border-t border-emerald-200 text-xs sm:text-sm text-slate-700 leading-relaxed overflow-hidden"
                          >
                            <strong className="text-emerald-900">Faktanya:</strong>{" "}
                            {m.fact}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pemantik Diskusi Kelompok P5 */}
          {extra?.askYourself && (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Pojok Diskusi &amp; Refleksi P5</span>
                </div>
                <span className="text-[11px] text-emerald-200 font-semibold">
                  Bahas bersama teman sebangku
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {extra.askYourself.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-white font-medium"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                      ?
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ================= TAB 3: AKSI NYATA ================= */}
      {tab === "aksi" && (
        <motion.div
          key="tab-aksi"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Timeline Kesiapsiagaan: Sebelum, Saat, Sesudah */}
          {readiness && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
                  Peta Waktu Kesiapsiagaan Bencana
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: "01",
                    label: "Sebelum Bencana",
                    badge: "Pencegahan & Mitigasi",
                    items: readiness.before,
                    cls: "bg-emerald-50/90 border-emerald-300 text-emerald-950",
                    badgeCls: "bg-emerald-600 text-white",
                  },
                  {
                    step: "02",
                    label: "Saat Kejadian",
                    badge: "Tanggap Darurat",
                    items: readiness.during,
                    cls: "bg-amber-50/90 border-amber-300 text-amber-950",
                    badgeCls: "bg-amber-600 text-white",
                  },
                  {
                    step: "03",
                    label: "Sesudah Kejadian",
                    badge: "Pemulihan & Evaluasi",
                    items: readiness.after,
                    cls: "bg-sky-50/90 border-sky-300 text-sky-950",
                    badgeCls: "bg-sky-600 text-white",
                  },
                ].map((col, colIdx) => (
                  <motion.div
                    key={col.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: colIdx * 0.1, duration: 0.35 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`relative overflow-hidden p-5 rounded-3xl border-2 ${col.cls} flex flex-col justify-between shadow-xs`}
                  >
                    <span className="absolute right-4 top-2 text-4xl font-black opacity-10 font-['Fredoka'] select-none">
                      {col.step}
                    </span>
                    <div className="space-y-3 relative z-10">
                      <div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${col.badgeCls}`}
                        >
                          {col.badge}
                        </span>
                        <h4 className="font-black text-base text-slate-900 mt-1.5 font-['Fredoka']">
                          {col.label}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {col.items.map((t, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm text-slate-800 flex items-start gap-2"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-1" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tantangan Aksi 7 Hari */}
          {extra?.challenge7Days && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border-2 border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Tantangan Aksi 7 Hari Pelajar</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Centang setiap misi harian yang berhasil kamu terapkan di rumah atau sekolah.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {progressPercent === 100 && (
                    <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950">
                      <Award className="w-4 h-4" /> Lencana Tuntas!
                    </span>
                  )}
                  <span className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white">
                    {doneCount} / {extra.challenge7Days.length} Misi ({progressPercent}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                    background: issue.themeColor,
                  }}
                />
              </div>

              {/* Checkable List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {extra.challenge7Days.map((t, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleDay(i)}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 text-xs sm:text-sm transition-all select-none ${
                      done[i]
                        ? "bg-emerald-100/80 border-emerald-400 text-emerald-950 font-medium"
                        : "bg-white border-slate-200 text-slate-800 hover:border-emerald-300 shadow-2xs"
                    }`}
                  >
                    <CheckCircle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                        done[i] ? "text-emerald-600" : "text-slate-300"
                      }`}
                    />
                    <span className={`leading-snug ${done[i] ? "line-through opacity-75" : ""}`}>
                      {t}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}