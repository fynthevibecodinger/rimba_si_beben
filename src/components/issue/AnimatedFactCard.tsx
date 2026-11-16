import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, ArrowRight, Check, Compass, ShieldCheck, Zap, Activity } from "lucide-react";
import type { QuickFact } from "../../data/issuesData";

interface Props {
  facts: QuickFact[];
  themeColor: string;
  slug: string;
}

// In-depth educational facts mapping for the cards
const factDetails: Record<string, Record<string, string>> = {
  banjir: {
    "10 × 100 cm":
      "Lubang biopori berdiameter 10 cm sedalam 100 cm dapat menampung hingga puluhan liter air per jam. Cacing yang tertarik oleh sampah organik di dalamnya akan menggali liang-liang mikroskopis yang melipatgandakan daya serap tanah!",
    MCB:
      "Miniature Circuit Breaker wajib dimatikan sebelum air menggenangi stopkontak dinding. Air banjir yang bercampur lumpur adalah konduktor listrik yang berbahaya dan dapat memicu sengatan fatal jika arus belum diputus.",
    "Hulu–hilir":
      "Air bergerak menurut gravitasi dalam satu kesatuan DAS (Daerah Aliran Sungai). Banjir di kota pesisir seringkali dipicu oleh hilangnya tutupan pohon di pegunungan hulu yang berjarak puluhan kilometer.",
  },
  "tanah-longsor": {
    "> 20°":
      "Lereng dengan kemiringan di atas 20 derajat berada pada titik kritis stabilitas mekanis. Jika tanahnya jenuh air dan dipotong secara tegak tanpa terasering, gaya gravitasi mudah mengalahkan kohesi tanah.",
    "3–4 m":
      "Akar wangi (Chrysopogon zizanioides) memiliki daya tarik setara 1/6 kawat baja ringan. Akarnya yang lurus vertikal menembus hingga kedalaman 4 meter, mengunci lapisan tanah atas ke batuan dasar.",
    Samping:
      "Longsoran bergerak lurus menuruni lembah dengan kecepatan hingga 60 km/jam. Berlari ke samping (tegak lurus arah luncuran) adalah satu-satunya rute penyelamatan logis agar keluar dari corong longsoran.",
  },
  kekeringan: {
    "≤ 12 L":
      "Satu menit membiarkan keran air wastafel mengalir penuh sama dengan membuang 10 hingga 12 liter air bersih. Menutup keran saat menggosok gigi dapat menghemat ratusan liter air setiap minggunya!",
    "El Niño":
      "Anomali suhu permukaan laut Pasifik ekuator menghambat pembentukan awan konvektif di Indonesia. Akibatnya, awal musim hujan bisa tertunda hingga berbulan-bulan, menipiskan cadangan mata air.",
    Mulsa:
      "Lapisan mulsa organik dari dedaunan kering atau jerami menjaga suhu tanah tetap sejuk hingga 5°C lebih dingin dan menurunkan penguapan hingga 70%, menjaga tanah tetap gembur dan lembap.",
  },
  "kebakaran-hutan": {
    "PM2.5":
      "Partikel materi berdiameter kurang dari 2.5 mikron dapat menembus saringan hidung dan langsung masuk ke alveolus paru-paru hingga aliran darah, memicu sesak napas berat dan iritasi saluran pernapasan.",
    "N95 / KF94":
      "Masker kain biasa hanya mampu menyaring sekitar 20-30% partikel mikro asap. Masker standar N95 atau KF94 dengan kerapatan elektrostatik mampu menyaring hingga 95% partikel PM2.5 berbahaya.",
    "Di bawah tanah":
      "Gambut tersusun dari bahan organik kaya karbon hingga kedalaman 3-10 meter. Api merambat perlahan tanpa api menyala (smoldering) di bawah permukaan tanah dan dapat menyala kembali berminggu-minggu kemudian.",
  },
};

export default function AnimatedFactCard({ facts, themeColor, slug }: Props) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  const getDetailedInfo = (value: string) => {
    return (
      factDetails[slug]?.[value] ||
      "Fakta kunci ini merupakan parameter penting dalam pemantauan dan mitigasi bencana hidrometeorologi terpadu."
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-base sm:text-lg font-black text-slate-900 font-['Fredoka'] flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-700" />
          <span>Fakta Angka &amp; Kunci Cepat</span>
        </h4>
        <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
          💡 Klik kartu untuk penjelasan ilmiah detail
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {facts.map((f, i) => {
          const isFlipped = flippedIndex === i;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => toggleFlip(i)}
              className="group cursor-pointer select-none rounded-2xl border-2 transition-all duration-300 relative bg-white shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between"
              style={{
                borderColor: isFlipped ? themeColor : "#e2e8f0",
              }}
            >
              {/* Card Front & Back Toggle Content */}
              <div className="p-5 flex flex-col justify-between min-h-[148px]">
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 flex flex-col justify-between h-full"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Fakta #{i + 1}
                        </span>
                        <span
                          className="w-7 h-7 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110"
                          style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                        >
                          <Zap className="w-4 h-4" />
                        </span>
                      </div>

                      <div>
                        {/* Animated Value with Count-Up Scale Effect */}
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0, y: 8 }}
                          whileInView={{ scale: 1, opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 350, damping: 22 }}
                          className="text-2xl sm:text-3xl font-black font-['Fredoka'] leading-none tracking-tight flex items-baseline gap-1"
                          style={{ color: themeColor }}
                        >
                          <span>{f.value}</span>
                        </motion.div>
                        <p className="text-xs font-semibold text-slate-700 mt-2 leading-relaxed">
                          {f.label}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-emerald-800 transition-colors">
                        <span>Buka Penjelasan</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 flex flex-col justify-between h-full bg-emerald-50/70 -m-5 p-5 border-l-4"
                      style={{ borderLeftColor: themeColor }}
                    >
                      <div className="flex items-center justify-between text-xs font-black text-emerald-900">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Tahukah Kamu?</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">Klik untuk tutup</span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {getDetailedInfo(f.value)}
                      </p>

                      <div className="text-[10px] font-bold text-emerald-800">
                        Topik: {f.value}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom tiny color bar */}
              <div
                className="h-1 w-full transition-all duration-300"
                style={{
                  backgroundColor: isFlipped ? themeColor : "#f1f5f9",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
