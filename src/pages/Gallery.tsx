import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "../router";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import EcoLandscape from "../components/hero/EcoLandscape";
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
  MessageCircle,
  Trees,
  Leaf,
  Compass,
  Volume2,
} from "lucide-react";

interface RangerProfile {
  id: number;
  name: string;
  roleTag: string;
  category: "sungai" | "hutan" | "plastik" | "konservasi";
  categoryLabel: string;
  location: string;
  impactStat: string;
  featured?: boolean;
  image: string;
  fallbackImage: string;
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
    featured: true,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
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
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
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
    fallbackImage:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
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
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
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
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
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

/* Maskot Rimba Full-Body Lengkap */
function OfficialRimbaMascot({ size = "lg" }: { size?: "sm" | "lg" }) {
  const isLarge = size === "lg";

  return (
    <div className="relative flex items-center justify-center select-none">
      {isLarge && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-dashed border-amber-300/35 pointer-events-none"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-emerald-900 border border-amber-300/60 flex items-center justify-center text-amber-300 shadow-md">
              <Leaf className="w-3.5 h-3.5" />
            </span>
            <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-emerald-900 border border-sky-300/60 flex items-center justify-center text-sky-300 shadow-md">
              <Waves className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border border-emerald-300/20 pointer-events-none"
          >
            <span className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-900 border border-emerald-300/60 flex items-center justify-center text-emerald-300 shadow-md">
              <Trees className="w-3.5 h-3.5" />
            </span>
            <span className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-900 border border-amber-300/60 flex items-center justify-center text-amber-300 shadow-md">
              <Compass className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        </>
      )}

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className={`relative z-10 flex items-center justify-center ${
          isLarge ? "w-48 h-52 sm:w-56 sm:h-60" : "w-28 h-32"
        }`}
      >
        <div className="absolute inset-6 rounded-full bg-amber-300/20 blur-2xl -z-10" />

        <svg
          viewBox="0 0 280 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          <polygon points="88,215 54,258 98,238" fill="#182b23" />
          <polygon points="94,225 76,252 104,238" fill="#fef3c7" />

          <motion.g
            animate={{ rotate: [0, -9, 2, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "92px 175px" }}
          >
            <path
              d="M94 166 C62 162, 42 140, 26 116 C20 108, 12 114, 18 124 C32 148, 46 172, 56 184 L42 196 C38 202, 46 208, 54 202 L66 192 C76 196, 88 192, 96 184 Z"
              fill="#182b23"
            />
          </motion.g>

          <rect x="122" y="246" width="12" height="24" rx="4" fill="#e59a24" />
          <rect x="104" y="264" width="36" height="11" rx="5.5" fill="#e59a24" />
          <rect x="162" y="246" width="12" height="24" rx="4" fill="#e59a24" />
          <rect x="158" y="264" width="36" height="11" rx="5.5" fill="#e59a24" />

          <ellipse cx="146" cy="196" rx="58" ry="56" fill="#182b23" />

          <path
            d="M104 156 C126 148, 166 148, 188 156 L192 232 C164 244, 128 244, 100 232 Z"
            fill="#23533a"
          />
          <path
            d="M114 164 L146 184 L178 164"
            stroke="#52b788"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="146"
            y1="184"
            x2="146"
            y2="238"
            stroke="#52b788"
            strokeWidth="4"
          />
          <circle cx="146" cy="184" r="5.5" fill="#fbbf24" />
          <rect x="116" y="198" width="20" height="18" rx="3" fill="#163a28" />
          <rect x="156" y="198" width="20" height="18" rx="3" fill="#163a28" />

          <circle cx="136" cy="96" r="52" fill="#182b23" />

          <path
            d="M104 96 C104 64, 162 64, 164 100 C164 132, 112 134, 104 96 Z"
            fill="#f8f6ee"
          />

          <circle cx="116" cy="112" r="8.5" fill="#f3cfc3" />

          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              times: [0, 0.46, 0.5, 0.54, 1],
            }}
            style={{ transformOrigin: "136px 88px" }}
          >
            <circle cx="136" cy="88" r="11" fill="#132a1e" />
            <circle cx="132" cy="84" r="3.5" fill="#ffffff" />
          </motion.g>

          <path
            d="M150 76 C192 68, 244 82, 262 104 C228 118, 184 120, 152 114 Z"
            fill="#f4b333"
            stroke="#9c5a25"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <path
            d="M148 72 C174 52, 224 54, 244 74 C216 82, 182 86, 154 88 Z"
            fill="#e59a24"
            stroke="#9c5a25"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <path
            d="M168 68 C190 60, 214 62, 226 70 C206 74, 186 76, 168 74 Z"
            fill="#fbd36b"
          />

          <path
            d="M98 56 C102 22, 172 22, 176 56 Z"
            fill="#9c6644"
          />
          <path
            d="M97 50 Q137 56 177 50 L178 58 Q137 64 96 58 Z"
            fill="#2d6a4f"
          />
          <path
            d="M84 62 Q137 52 190 62 L185 72 Q137 62 89 72 Z"
            fill="#7f4f24"
          />
          <path
            d="M150 48 C154 34, 174 30, 184 34 C178 46, 162 52, 150 48 Z"
            fill="#40916c"
          />

          <g transform="translate(178, 172)">
            <rect
              x="0"
              y="0"
              width="78"
              height="62"
              rx="14"
              fill="#132a1e"
            />
            <rect
              x="9"
              y="8"
              width="60"
              height="40"
              rx="8"
              fill="#d8f3dc"
            />
            <polygon points="39,14 51,28 39,42 27,28" fill="#10b981" />
            <line
              x1="31"
              y1="36"
              x2="47"
              y2="20"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="54"
              x2="32"
              y2="54"
              stroke="#40916c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="39" cy="54" r="3" fill="#10b981" />
            <line
              x1="46"
              y1="54"
              x2="64"
              y2="54"
              stroke="#40916c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRanger, setActiveRanger] = useState<RangerProfile | null>(null);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [mascotMood, setMascotMood] = useState<RimbaMood>("wave");

  const mascotTips = [
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

  const categories = [
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
              <span>Jejak Ranger Lingkungan Nusantara</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Fredoka'] leading-[1.14] tracking-tight"
            >
              Galeri Ranger &amp;{" "}
              <span className="text-[#2d6a4f] underline decoration-emerald-400/60 decoration-wavy decoration-2">Komunitas Penjaga Alam</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-base sm:text-lg text-[#305345] font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              Kenali para pejuang lingkungan di Indonesia yang bergerak nyata membersihkan sungai, menjaga hutan gambut, dan merawat lereng. Ikuti gerakan mereka dan jadilah bagian dari perubahan!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <div className="px-3.5 py-2 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-xs flex items-center gap-2 text-xs font-bold">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>6+ Gerakan Inspiratif</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-xs flex items-center gap-2 text-xs font-bold">
                <Waves className="w-4 h-4 text-sky-700" />
                <span>Mitigasi 4 Bencana Ekologis</span>
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
              title="Klik Rimba untuk mengganti pesan"
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
                title="Klik untuk mengganti pesan Rimba"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="flex items-center gap-2 font-['Fredoka'] font-black text-sm text-emerald-800">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    Hai, aku Rimba!
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/50">
                    Tips {tipIndex + 1}/{mascotTips.length}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{mascotTips[tipIndex]}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span className="inline-flex items-center gap-1"><Volume2 className="h-3.5 w-3.5" /> Tips Peduli Alam</span>
                  <span className="text-slate-400 font-normal">Klik untuk ganti ↻</span>
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
              <span>Fokus Gerakan Ranger:</span>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari komunitas atau kota..."
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
              Komunitas tidak ditemukan
            </p>
            <p className="text-xs text-slate-500">
              Coba kata kunci lain atau pilih filter &ldquo;Semua Ranger&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("semua");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold cursor-pointer"
            >
              Reset Filter
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
                            Sorotan
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
                        Komunitas Hijau
                      </span>
                    )}

                    <span className="text-xs font-black text-emerald-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Lihat Kisah <ArrowRight className="w-3.5 h-3.5" />
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
                <span>Giliran Kamu Beraksi!</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
                Siap Menjadi Ranger Lingkungan di Sekolahmu?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Mulai dari memilah sampah plastik, membuat lubang biopori, hingga menghemat air di rumah. Pelajari panduan lengkap mitigasi 4 bencana sekarang!
              </p>
            </div>
          </div>

          <Link
            to="/isu/banjir"
            className="relative z-10 px-6 py-3.5 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xs sm:text-sm hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shadow-lg flex-shrink-0"
          >
            <span>Mulai Aksi Nyata</span>
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
                  🛡️ <strong>Kaitan Mitigasi Bencana:</strong>{" "}
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
