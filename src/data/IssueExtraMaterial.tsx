import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Sparkles,
  HelpCircle,
  MessageSquareQuote,
  Lightbulb,
  MapPin,
  Award,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { IssueContent } from "../data/issuesData";
import type { IssueExtra } from "../data/issuesExtra";
import AnimatedFactCard from "../components/issue/AnimatedFactCard";
import InteractiveGlossary from "../components/issue/InteractiveGlossary";
import { useLanguage } from "../context/LanguageContext";

interface Props {
  issue: IssueContent;
  extra?: IssueExtra;
  tab: "sebab" | "dampak" | "aksi";
}

const caseStudiesId: Record<
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
      "Saat hujan sangat deras di daerah atas Puncak Bogor, banyak air mengalir ke Sungai Ciliwung. Di sepanjang sungai, tepinya menyempit karena bangunan dan sampah plastik. Akibatnya, air meluap ke rumah warga dalam beberapa jam.",
    rootCause:
      "Berkurangnya hutan di daerah atas dan banyaknya beton di kota membuat air hujan sulit masuk ke tanah.",
    solution:
      "Revitalisasi daerah resapan hulu, pembangunan kolam retensi & sumur biopori warga, serta sistem sensor tinggi muka air EWS di pintu air.",
  },
  "tanah-longsor": {
    region: "Perbukitan Banjarnegara • Jawa Tengah",
    tag: "Contoh Tanah Longsor",
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

const caseStudiesEn: Record<
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
    region: "Ciliwung Watershed • Bogor – Jakarta",
    tag: "Upstream-Downstream Ecosystem Case Study",
    statBadge: "6–9 Hours Water Travel Time from Upstream to Coast",
    title: "Why Does Torrential Rain in Puncak Submerge Downstream Jakarta?",
    chronology:
      "When extreme downpours strike the steep highlands of Puncak Bogor, immense volumes of water discharge into the Ciliwung River. Along the urban channel, natural riverbanks are constricted by concrete and plastic refuse, triggering residential inundations within hours.",
    rootCause:
      "Severe deforestation in upstream catchment zones combined with extensive impermeable concrete surfaces in the metropolis drastically impairs natural infiltration.",
    solution:
      "Restoration of upstream conservation zones, construction of community retention basins & biopores, and solar-powered ultrasonic Early Warning Sensor (EWS) networks.",
  },
  "tanah-longsor": {
    region: "Banjarnegara Highlands • Central Java",
    tag: "Landslide Dynamics Case Study",
    statBadge: "3–4 Meters Deep Vetiver Root Tensile Grid",
    title: "Locking Fragile Mountain Slopes with Vetiver Living Soil Nails",
    chronology:
      "Successive days of heavy rainfall completely saturated the weathered soil mantles along steep hillside plantations. Water pooling along the impermeable bedrock shear plane liquefied the friction boundary, sending tons of earth crashing into valley settlements.",
    rootCause:
      "Conversion of deep-rooted native montane rainforest into shallow-rooted seasonal cash crops without engineered contour drainage trenches.",
    solution:
      "Planting deep-rooted vetiver grass bio-hedges, constructing terraced benches, and deploying solar extensometer fissure warning sensors.",
  },
  kekeringan: {
    region: "Gunungkidul Karst & Lesser Sunda Islands",
    tag: "Drought Adaptation Case Study",
    statBadge: "100 Liters/Night Harvested from Fog Nets",
    title: "Harvesting Rainwater and Fog During Prolonged El Niño Droughts",
    chronology:
      "During peak El Niño climatic anomalies, porous limestone karst formations and arid archipelagos suffer dry periods exceeding 5 continuous months. Surface creeks dry up and household dug wells drop to bone-dry levels.",
    rootCause:
      "Naturally low rainfall exacerbated by high solar evaporation rates over bare, un-mulched soils and an absence of wet-season water retention infrastructure.",
    solution:
      "Building village retention basins (embung), installing Rooftop Rainwater Harvesting (RWH) reservoirs, applying thick organic mulch, and implementing drip irrigation.",
  },
  "kebakaran-hutan": {
    region: "Riau Peat Domes & Central Kalimantan",
    tag: "Peatland Restoration Case Study",
    statBadge: "40 cm Safe Water Table Boundary",
    title: "Halting Subsurface Peat Fires Through Canal Blocking Rewetting",
    chronology:
      "In the dry season, artificially drained peatlands dry out and catch fire from minute sparks, smoldering flamelessly at depths of 1 to 3 meters and discharging suffocating PM2.5 haze across borders.",
    rootCause:
      "Unregulated drainage canals drained the natural water table of peat domes, turning ancient wet biomass into dry subterranean combustible tinder.",
    solution:
      "Erecting engineered canal blocks to raise groundwater tables (rewetting) coupled with satellite hotspot tracking from KLHK SiPongi.",
  },
};

export default function IssueExtraMaterial({ issue, extra, tab }: Props) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [mythIndex, setMythIndex] = useState(0);
  const [mythAnswer, setMythAnswer] = useState<"mitos" | "fakta" | null>(null);
  const [caseTab, setCaseTab] = useState<"chronology" | "rootCause" | "solution" | null>("chronology");
  const [storyOpen, setStoryOpen] = useState(false);
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

  const currentCase = isEn ? caseStudiesEn[issue.slug] : caseStudiesId[issue.slug];

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
          {/* 1. Penjelasan utama dan cerita tambahan */}
          {extra && (
            <div className="space-y-4">
              {/* Penjelasan utama */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-white text-xs font-black uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{isEn ? "Easy Analogy" : "Pahami dengan mudah"}</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-semibold mt-4">
                    &ldquo;{extra.analogy}&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* Cerita tambahan */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setStoryOpen((open) => !open)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block text-sm font-black text-slate-900">
                        {isEn ? "Read Illustrative Story" : "Baca contoh ceritanya"}
                      </strong>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {isEn ? "A practical story from student daily life." : "Contoh sederhana dari kehidupan pelajar."}
                      </span>
                    </span>
                  </span>
                  <span className="text-xl text-slate-400" aria-hidden="true">
                    {storyOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {storyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-4 sm:px-5 pb-5 pt-4 space-y-3">
                        <h4 className="text-base font-black text-slate-900 font-['Fredoka']">
                          {extra.story.title}
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {extra.story.text}
                        </p>
                        <p className="text-xs text-slate-500 font-semibold">
                          {isEn
                            ? "💡 Big changes start from small everyday habits."
                            : "💡 Perubahan besar bisa dimulai dari kebiasaan kecil."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

          {/* 3. Studi Kasus Nyata Nusantara */}
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

              {/* Isi studi kasus accordion */}
              <div className="p-4 sm:p-6 space-y-2 bg-slate-50/60">
                {[
                  {
                    id: "chronology" as const,
                    number: "01",
                    title: isEn ? "Event Chronology" : "Kronologi peristiwa",
                    description: isEn ? "What happened?" : "Apa yang terjadi?",
                    text: currentCase.chronology,
                  },
                  {
                    id: "rootCause" as const,
                    number: "02",
                    title: isEn ? "Root Cause" : "Akar masalah",
                    description: isEn ? "Why did this occur?" : "Mengapa hal ini bisa terjadi?",
                    text: currentCase.rootCause,
                  },
                  {
                    id: "solution" as const,
                    number: "03",
                    title: isEn ? "Action & Solution" : "Solusi",
                    description: isEn ? "What can be done?" : "Apa yang bisa dilakukan?",
                    text: currentCase.solution,
                  },
                ].map((item) => {
                  const open = caseTab === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setCaseTab(open ? null : item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                            open ? "text-white" : "bg-slate-100 text-slate-500"
                          }`}
                          style={open ? { backgroundColor: issue.themeColor } : undefined}
                        >
                          {item.number}
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-sm font-black text-slate-900">
                            {item.title}
                          </strong>
                          <span className="block text-xs text-slate-500 mt-0.5">
                            {item.description}
                          </span>
                        </span>
                        <span className="text-lg text-slate-400" aria-hidden="true">
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-slate-100 px-4 pb-4 pt-3 pl-[4.25rem] text-sm text-slate-700 leading-relaxed">
                              {item.text}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="flex items-start gap-2.5 px-1 pt-3 text-xs text-slate-500">
                  <span className="text-base" aria-hidden="true">
                    💡
                  </span>
                  <p>
                    <strong className="text-slate-700">
                      {isEn ? "Key Takeaway:" : "Pembelajaran:"}
                    </strong>{" "}
                    {isEn
                      ? "understanding the event sequence empowers us to take swift, effective mitigation actions."
                      : "memahami urutan peristiwa membantu kita memilih tindakan yang tepat."}
                  </p>
                </div>
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
          {mythsAndFacts && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{ backgroundColor: issue.themeColor }}
                >
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.16em]"
                    style={{ color: issue.themeColor }}
                  >
                    {isEn ? "Quick Challenge" : "Tantangan singkat"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] mt-0.5">
                    {isEn ? "Myth or Fact in your opinion?" : "Menurutmu, mitos atau fakta?"}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {isEn
                      ? "Pick a statement, then check the scientific facts."
                      : "Pilih pernyataan, lalu buka jawabannya."}
                  </p>
                </div>
              </div>

              {(() => {
                const current = mythsAndFacts[mythIndex];
                const answered = mythAnswer !== null;
                const isCorrect = mythAnswer === "mitos";
                return (
                  <div
                    className="rounded-3xl border-2 bg-white p-5 sm:p-7 shadow-sm"
                    style={{ borderColor: `${issue.themeColor}45` }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span
                        className="text-xs font-black uppercase tracking-wider"
                        style={{ color: issue.themeColor }}
                      >
                        {isEn
                          ? `Statement ${mythIndex + 1} of ${mythsAndFacts.length}`
                          : `Pernyataan ${mythIndex + 1} dari ${mythsAndFacts.length}`}
                      </span>
                      <div className="flex gap-1.5" aria-label="Progress">
                        {mythsAndFacts.map((_, index) => (
                          <span
                            key={index}
                            className="h-1.5 w-6 rounded-full"
                            style={{
                              backgroundColor:
                                index <= mythIndex
                                  ? issue.themeColor
                                  : `${issue.themeColor}20`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 leading-relaxed text-center max-w-2xl mx-auto">
                      &ldquo;{current.myth}&rdquo;
                    </p>
                    <p className="text-xs text-slate-500 text-center mt-5">
                      {isEn ? "Choose your answer:" : "Pilih jawabanmu:"}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-2 max-w-sm mx-auto">
                      {(["mitos", "fakta"] as const).map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          disabled={answered}
                          onClick={() => setMythAnswer(answer)}
                          className={`rounded-2xl px-4 py-3 text-sm font-black capitalize transition-all cursor-pointer ${
                            answered && mythAnswer === answer
                              ? isCorrect
                                ? "bg-emerald-600 text-white"
                                : "bg-rose-500 text-white"
                              : answered
                              ? "bg-slate-100 text-slate-400"
                              : "bg-slate-100 text-slate-800 hover:text-white"
                          }`}
                          onMouseEnter={(event) => {
                            if (!answered)
                              event.currentTarget.style.backgroundColor =
                                issue.themeColor;
                          }}
                          onMouseLeave={(event) => {
                            if (!answered)
                              event.currentTarget.style.backgroundColor = "";
                          }}
                        >
                          {answer === "mitos"
                            ? isEn
                              ? "❓ Myth"
                              : "❓ Mitos"
                            : isEn
                            ? "✅ Fact"
                            : "✅ Fakta"}
                        </button>
                      ))}
                    </div>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 rounded-2xl p-4 text-sm leading-relaxed"
                        style={{ backgroundColor: `${issue.themeColor}10` }}
                      >
                        <strong
                          className="block font-black mb-1"
                          style={{ color: isCorrect ? "#15803d" : "#be123c" }}
                        >
                          {isEn
                            ? isCorrect
                              ? "Correct! 🎉"
                              : "Not quite, keep learning!"
                            : isCorrect
                            ? "Benar! 🎉"
                            : "Belum tepat, tidak apa-apa!"}
                        </strong>
                        <span className="text-slate-700">{current.fact}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (mythIndex < mythsAndFacts.length - 1) {
                              setMythIndex((index) => index + 1);
                              setMythAnswer(null);
                            } else {
                              setMythIndex(0);
                              setMythAnswer(null);
                            }
                          }}
                          className="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-black text-white cursor-pointer"
                          style={{ backgroundColor: issue.themeColor }}
                        >
                          {mythIndex < mythsAndFacts.length - 1
                            ? isEn
                              ? "Next statement →"
                              : "Pernyataan berikutnya →"
                            : isEn
                            ? "Restart challenge ↻"
                            : "Ulangi dari awal ↻"}
                        </button>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Pemantik Diskusi Kelompok P5 */}
          {extra?.askYourself && (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>
                    {isEn
                      ? "Discussion & Reflection Corner"
                      : "Pojok Diskusi & Refleksi P5"}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-200 font-semibold">
                  {isEn
                    ? "Discuss with your peers"
                    : "Bahas bersama teman sebangku"}
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
          {/* Timeline Kesiapsiagaan */}
          {readiness && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                    style={{ backgroundColor: issue.themeColor }}
                  >
                    <Layers className="h-5 w-5" />
                  </span>
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.16em]"
                      style={{ color: issue.themeColor }}
                    >
                      {isEn ? "Preparedness Timeline" : "Urutan kesiapsiagaan"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] mt-0.5">
                      {isEn
                        ? "Before, during, and after the disaster"
                        : "Sebelum, saat, dan sesudah bencana"}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 sm:pb-1">
                  {isEn ? "Follow left to right" : "Ikuti dari kiri ke kanan"}
                </span>
              </div>

              <div
                className="relative rounded-3xl p-4 sm:p-6 overflow-hidden"
                style={{
                  backgroundColor: `${issue.themeColor}09`,
                  border: `1px solid ${issue.themeColor}30`,
                }}
              >
                <div
                  className="hidden md:block absolute left-[12%] right-[12%] top-[3.25rem] h-px"
                  style={{ backgroundColor: `${issue.themeColor}45` }}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                  {[
                    {
                      step: "01",
                      label: isEn ? "Before Disaster" : "Sebelum Bencana",
                      badge: isEn ? "Prevention & Safety" : "Pencegahan & Keselamatan",
                      items: readiness.before,
                    },
                    {
                      step: "02",
                      label: isEn ? "During Event" : "Saat Kejadian",
                      badge: isEn ? "Emergency Response" : "Tanggap Darurat",
                      items: readiness.during,
                    },
                    {
                      step: "03",
                      label: isEn ? "After Event" : "Sesudah Kejadian",
                      badge: isEn ? "Recovery & Review" : "Pemulihan & Evaluasi",
                      items: readiness.after,
                    },
                  ].map((col, colIdx) => (
                    <motion.div
                      key={col.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: colIdx * 0.08, duration: 0.3 }}
                      className="relative rounded-2xl bg-white border p-5 shadow-sm"
                      style={{ borderColor: `${issue.themeColor}30` }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm"
                          style={{ backgroundColor: issue.themeColor }}
                        >
                          {col.step}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {isEn ? `Phase ${colIdx + 1}` : `Fase ${colIdx + 1}`}
                        </span>
                      </div>
                      <div className="min-w-0 space-y-4">
                        <div>
                          <span
                            className="text-[10px] font-black uppercase tracking-wider"
                            style={{ color: issue.themeColor }}
                          >
                            {col.badge}
                          </span>
                          <h4 className="font-black text-lg text-slate-900 mt-1 font-['Fredoka']">
                            {col.label}
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {col.items.map((t, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-700 flex items-start gap-2.5"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: issue.themeColor }}
                              />
                              <span className="leading-relaxed">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                    <span>
                      {isEn
                        ? "7-Day Student Eco Action Challenge"
                        : "Tantangan Aksi 7 Hari Pelajar"}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {isEn
                      ? "Check off each daily mission you accomplish at home or school."
                      : "Centang setiap misi harian yang berhasil kamu terapkan di rumah atau sekolah."}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {progressPercent === 100 && (
                    <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950">
                      <Award className="w-4 h-4" /> {isEn ? "Mission Complete!" : "Lencana Tuntas!"}
                    </span>
                  )}
                  <span className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white">
                    {doneCount} / {extra.challenge7Days.length}{" "}
                    {isEn ? "Missions" : "Misi"} ({progressPercent}%)
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
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 text-xs sm:text-sm transition-all select-none cursor-pointer ${
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
                    <span
                      className={`leading-snug ${
                        done[i] ? "line-through opacity-75" : ""
                      }`}
                    >
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
