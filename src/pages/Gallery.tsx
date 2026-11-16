import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "../router";
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
} from "lucide-react";

interface RangerProfile {
  id: number;
  name: string;
  roleTag: string;
  category: "sungai" | "hutan" | "plastik" | "konservasi";
  categoryLabel: string;
  location: string;
  impactStat: string;
  image: string;
  summary: string;
  fullStory: string;
  quote: string;
  instagram?: string;
  website?: string;
  disasterConnection: string;
}

const rangersData: RangerProfile[] = [
  {
    id: 1,
    name: "Pandawara Group",
    roleTag: "Pemuda Pembersih Sungai & Pesisir",
    category: "sungai",
    categoryLabel: "Bersih Sungai & Cegah Banjir",
    location: "Bandung & Seluruh Nusantara",
    impactStat: "Ratusan Ton Sampah Sungai & Pantai Terangkat",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80",
    summary:
      "Kelompok lima pemuda asal Bandung yang viral karena aksi nyata turun langsung membersihkan sungai-sungai penuh sampah hingga pesisir pantai terkotor di Indonesia.",
    fullStory:
      "Berawal dari keresahan terhadap banjir yang kerap melanda lingkungan tempat tinggal mereka akibat saluran air tersumbat, Pandawara Group membuktikan bahwa anak muda bisa menjadi garda terdepan pencegahan banjir. Aksi mereka berhasil menggerakkan ribuan relawan lintas daerah untuk ikut turun ke sungai.",
    quote:
      "Jangan tunggu banjir datang baru menyalahkan alam. Mulai dari sampah kecil di sekitar kita, bersihkan sekarang juga.",
    instagram: "pandawaragroup",
    website: "https://www.instagram.com/pandawaragroup/",
    disasterConnection: "Mencegah penyumbatan aliran sungai pemicu banjir perkotaan.",
  },
  {
    id: 2,
    name: "Sungai Watch",
    roleTag: "Gerakan Restorasi & Jaring Penghalang Sampah",
    category: "sungai",
    categoryLabel: "Bersih Sungai & Cegah Banjir",
    location: "Bali & Banyuwangi, Jawa Timur",
    impactStat: "100+ Penghalang Sungai & Jutaan Kg Sampah Terkelola",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    summary:
      "Organisasi lingkungan yang memasang jaring penghalang sampah (trash barriers) di aliran sungai serta memilah sampah secara sistematis sebelum hanyut ke laut.",
    fullStory:
      "Sungai Watch menggabungkan teknologi penghalang aliran sampah sederhana dengan pemberdayaan tim pemilah harian. Selain mencegah luapan sungai akibat tumpukan limbah, mereka memetakan sumber pencemaran sungai dan mengedukasi warga desa di sepanjang daerah aliran sungai.",
    quote:
      "Melindungi lautan dan mencegah banjir selalu dimulai dari menjaga kebersihan sungai-sungai kecil di hulu.",
    instagram: "sungaiwatch",
    website: "https://sungai.watch/",
    disasterConnection: "Menjaga kapasitas aliran sungai agar tidak meluap saat hujan deras.",
  },
  {
    id: 3,
    name: "Bye Bye Plastic Bags",
    roleTag: "Gerakan Pelajar Bebas Plastik Sekali Pakai",
    category: "plastik",
    categoryLabel: "Pengurangan Limbah & Drainase",
    location: "Bali & Cabang Pelajar Nasional",
    impactStat: "Digerakkan Pelajar di 50+ Lokasi Dunia",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    summary:
      "Gerakan yang didirikan oleh dua kakak-beradik pelajar di Bali untuk mengedukasi generasi muda mengurangi kantong plastik sekali pakai yang menyumbat selokan dan mencemari tanah.",
    fullStory:
      "Dimulai sejak usia remaja, gerakan ini membuktikan bahwa pelajar sekolah punya suara kuat untuk mengubah kebijakan dan kebiasaan masyarakat. Kampanye mereka mengajak siswa membawa botol minum dan tas belanja sendiri guna menekan limbah plastik penyumbat saluran air.",
    quote:
      "Anak muda memang hanya sebagian kecil dari populasi saat ini, tetapi kita adalah 100% masa depan bumi.",
    instagram: "byebyeplasticbags",
    website: "https://www.byebyeplasticbags.org/",
    disasterConnection: "Mengurangi sampah plastik penyumbat gorong-gorong dan saluran drainase.",
  },
  {
    id: 4,
    name: "Manggala Agni",
    roleTag: "Brigade Pengendalian Kebakaran Hutan & Gambut",
    category: "hutan",
    categoryLabel: "Penjaga Hutan & Gambut",
    location: "Sumatera, Kalimantan & Sulawesi",
    impactStat: "Garda Terdepan Pemadaman & Patroli Karhutla",
    image:
      "https://images.unsplash.com/photo-1602980085566-6c459f23fa46?auto=format&fit=crop&w=900&q=80",
    summary:
      "Brigade pengendalian kebakaran hutan dan lahan dari KLHK yang berjuang memadamkan api bawah tanah gambut serta berpatroli menjaga langit Nusantara tetap bebas kabut asap.",
    fullStory:
      "Manggala Agni bekerja siang dan malam di medan gambut ekstrem saat puncak musim kemarau. Selain memadamkan titik panas (hotspot), mereka aktif membangun sekat kanal untuk membasahi kembali lahan gambut dan menyuluh masyarakat desa agar membuka lahan tanpa membakar.",
    quote:
      "Satu percikan api di lahan gambut kering dapat merenggut udara bersih jutaan saudara kita.",
    instagram: "manggalaagni_klhk",
    website: "https://sipongi.menlhk.go.id/",
    disasterConnection: "Mencegah dan memadamkan kebakaran hutan serta kabut asap PM2.5.",
  },
  {
    id: 5,
    name: "Hutan Itu Indonesia",
    roleTag: "Kampanye Kreatif Pelestarian Hutan Tropis",
    category: "hutan",
    categoryLabel: "Penjaga Hutan & Gambut",
    location: "Jakarta & Jaringan Relawan Nusantara",
    impactStat: "Ribuan Pohon Teradopsi & Edukasi Publik",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    summary:
      "Gerakan terbuka yang mengajak anak muda kota mengenal, mencintai, dan ikut menjaga hutan Indonesia lewat musik, seni, lari amal, dan program adopsi pohon.",
    fullStory:
      "Banyak pelajar perkotaan merasa hutan terasa jauh dari kehidupan sehari-hari. Hutan Itu Indonesia menjembatani hal tersebut dengan cara-cara kreatif, mengingatkan bahwa air bersih yang kita minum dan udara sejuk yang kita hirup berasal dari hutan yang terjaga di hulu.",
    quote:
      "Menjaga hutan bukan cuma tugas penjaga hutan di pedalaman, tapi tugas kita semua yang masih bernapas.",
    instagram: "hutanituid",
    website: "https://hutanitu.id/",
    disasterConnection: "Menjaga tutupan hutan hulu untuk mencegah banjir bandang, longsor, dan kekeringan.",
  },
  {
    id: 6,
    name: "Gerakan Sabuk Hijau & Vetiver Nusantara",
    roleTag: "Konservasi Lereng & Pemanenan Air Hujan",
    category: "konservasi",
    categoryLabel: "Konservasi Lereng & Air",
    location: "Perbukitan Jawa & Nusa Tenggara",
    impactStat: "Penguatan Tebing Rawan Longsor & Embung Warga",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    summary:
      "Kolaborasi relawan desa, mahasiswa, dan pegiat konservasi tanah yang menanam rumput vetiver berakar dalam di tebing curam serta membangun penampungan air hujan di wilayah kering.",
    fullStory:
      "Melalui pendekatan solusi berbasis alam (Nature-based Solutions), komunitas konservasi lereng membantu warga desa mengubah tebing gundul yang rawan longsor menjadi sabuk hijau produktif sekaligus menabung air hujan di akuifer tanah untuk menghadapi kemarau panjang.",
    quote:
      "Akar yang kuat mengunci tanah saat hujan lebat, dan menyimpan cadangan air saat kemarau tiba.",
    instagram: "konservasialam.id",
    disasterConnection: "Mencegah tanah longsor lereng curam dan kekeringan air bersih.",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [activeRanger, setActiveRanger] = useState<RangerProfile | null>(null);

  const categories = [
    { id: "semua", label: "Semua Ranger" },
    { id: "sungai", label: "Bersih Sungai & Banjir" },
    { id: "hutan", label: "Penjaga Hutan & Gambut" },
    { id: "plastik", label: "Gerakan Bebas Plastik" },
    { id: "konservasi", label: "Konservasi Lereng & Air" },
  ];

  const filteredRangers =
    selectedCategory === "semua"
      ? rangersData
      : rangersData.filter((r) => r.category === selectedCategory);

  return (
    <div className="w-full pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white pt-14 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-black uppercase tracking-wider text-amber-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Jejak Ranger Lingkungan Nusantara</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka'] leading-tight max-w-3xl">
            Galeri Ranger &amp; Komunitas Penjaga Alam
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            Kenali para pejuang lingkungan di Indonesia yang bergerak nyata membersihkan sungai, menjaga hutan gambut, dan merawat lereng. Ikuti gerakan mereka dan jadilah bagian dari perubahan!
          </p>
        </div>
      </section>

      {/* 2. FILTER & GRID KARTU RANGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-8">
        {/* Filter Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>Fokus Gerakan:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRangers.map((ranger) => (
            <motion.div
              key={ranger.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveRanger(ranger)}
              className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Foto & Badge */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={ranger.image}
                    alt={ranger.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-xs text-amber-300 text-[11px] font-black">
                    {ranger.categoryLabel}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[11px] font-semibold text-emerald-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      {ranger.location}
                    </p>
                    <h3 className="text-xl font-black font-['Fredoka'] leading-tight">
                      {ranger.name}
                    </h3>
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className="p-5 space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-900">
                    <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{ranger.impactStat}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ranger.summary}
                  </p>

                  {/* Quote Mini */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic flex items-start gap-2">
                    <Quote className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>&ldquo;{ranger.quote}&rdquo;</span>
                  </div>
                </div>
              </div>

              {/* Footer Promosi Akun & Detail */}
              <div className="px-5 py-3.5 bg-emerald-50/60 border-t border-emerald-100 flex items-center justify-between gap-2">
                {ranger.instagram ? (
                  <a
                    href={`https://instagram.com/${ranger.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900 hover:text-emerald-700 transition-colors"
                  >
                    <AtSign className="w-4 h-4 text-pink-600" />
                    <span>{ranger.instagram}</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-emerald-900">
                    Komunitas Hijau
                  </span>
                )}

                <span className="text-xs font-black text-emerald-800 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Profil &amp; Aksi <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. BANNER AJAKAN PELAJAR JADI RANGER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-slate-950 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-950 bg-white/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Giliran Kamu Beraksi!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
              Siap Menjadi Ranger Lingkungan di Sekolahmu?
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              Mulai dari memilah sampah plastik, membuat lubang biopori, hingga menghemat air di rumah. Pelajari panduan lengkap mitigasi 4 bencana sekarang!
            </p>
          </div>
          <Link
            to="/isu/banjir"
            className="px-6 py-3.5 rounded-2xl bg-emerald-950 text-white font-black text-xs sm:text-sm hover:bg-emerald-900 transition-colors inline-flex items-center gap-2 shadow-md flex-shrink-0"
          >
            <span>Mulai Aksi Nyata</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl bg-white overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 sm:h-72 bg-slate-900">
                <img
                  src={activeRanger.image}
                  alt={activeRanger.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <button
                  onClick={() => setActiveRanger(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
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
                  🛡️ <strong>Kaitan Mitigasi Bencana:</strong>{" "}
                  {activeRanger.disasterConnection}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeRanger.fullStory}
                </p>

                <blockquote className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;{activeRanger.quote}&rdquo;
                </blockquote>

                {/* Tombol Ikuti / Promosi Akun Ranger */}
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
                      <span>Kunjungi Gerakan</span>
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