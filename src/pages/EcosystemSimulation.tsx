import { useState, useMemo, lazy, Suspense } from "react";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import {
  Sparkles,
  Waves,
  Mountain,
  SunMedium,
  Flame,
  RotateCcw,
  Eye,
  Layers,
  X,
  Droplets,
  ShieldCheck,
  HeartPulse,
  Info,
  CloudRain,
  Sun,
  Tag,
  Sliders,
} from "lucide-react";
import { ScenarioId } from "../components/lab3d/types";

// Lazy load 3D Canvas & Diorama Components
const DioramaCanvas = lazy(() => import("../components/lab3d/DioramaCanvas"));
const FloodDiorama3D = lazy(() => import("../components/lab3d/FloodDiorama3D"));
const LandslideDiorama3D = lazy(() => import("../components/lab3d/LandslideDiorama3D"));
const DroughtDiorama3D = lazy(() => import("../components/lab3d/DroughtDiorama3D"));
const WildfireDiorama3D = lazy(() => import("../components/lab3d/WildfireDiorama3D"));

interface ActionConfig {
  id: string;
  label: string;
  description: string;
  isPositive: boolean;
  impactBadge: string;
  impactNote: string;
}

const SCENARIO_ACTIONS: Record<ScenarioId, ActionConfig[]> = {
  banjir: [
    // 5 Aksi Risiko
    {
      id: "betonPenuh",
      label: "Menutup Halaman dengan Beton",
      description: "Air hujan kehilangan ruang tanah terbuka untuk meresap alami.",
      isPositive: false,
      impactBadge: "-25% Resapan",
      impactNote: "Limpasan air permukaan meningkat 250%, memicu genangan jalanan.",
    },
    {
      id: "sampahSungai",
      label: "Membuang Sampah ke Sungai",
      description: "Tumpukan sampah menyumbat gorong-gorong dan memperdangkal sungai.",
      isPositive: false,
      impactBadge: "-25% Aliran",
      impactNote: "Debit air tersendat parah dan meluap cepat ke pemukiman.",
    },
    {
      id: "tebangHulu",
      label: "Menebang Pohon di Daerah Hulu",
      description: "Air hujan dari dataran tinggi langsung meluncur deras ke kota.",
      isPositive: false,
      impactBadge: "-20% Resapan",
      impactNote: "Kecepatan air bah meningkat tajam tanpa hambatan vegetasi.",
    },
    {
      id: "bangunanBantaran",
      label: "Mendirikan Bangunan di Bantaran Sungai",
      description: "Menyempitkan lebar sungai sehingga air mudah meluap ke pemukiman.",
      isPositive: false,
      impactBadge: "-20% Kapasitas",
      impactNote: "Kapasitas palung sungai menyempit 40%, memperparah banjir luapan.",
    },
    {
      id: "tutupDrainase",
      label: "Menutup Saluran Drainase Jalan",
      description: "Air hujan menggenang di permukaan jalan tanpa jalur pembuangan.",
      isPositive: false,
      impactBadge: "-15% Aliran",
      impactNote: "Air terperangkap di aspal dan merusak pondasi jalan.",
    },
    // 5 Solusi Hijau
    {
      id: "biopori",
      label: "Membuat Lubang Resapan Biopori",
      description: "Pipa silinder berlubang mempercepat peresapan air hujan ke akuifer tanah.",
      isPositive: true,
      impactBadge: "+25% Resapan",
      impactNote: "Meningkatkan daya serap air tanah 35% dan mengisi akuifer.",
    },
    {
      id: "mangrove",
      label: "Menanam Pohon Mangrove di Muara",
      description: "Akar tunjang mangrove menahan gelombang pasang dan banjir rob.",
      isPositive: true,
      impactBadge: "+25% Tegakan",
      impactNote: "Mengikat tebing sungai dan menahan kecepatan arus air bah.",
    },
    {
      id: "sumurResapan",
      label: "Membangun Sumur Resapan Warga",
      description: "Menampung air hujan dari talang atap rumah langsung ke dalam tanah.",
      isPositive: true,
      impactBadge: "+20% Resapan",
      impactNote: "Mencegah air hujan terbuang percuma dan mengisi cadangan sumur.",
    },
    {
      id: "rainGarden",
      label: "Membuat Taman Hujan (Rain Garden)",
      description: "Cekungan tanaman hijau yang menyaring sekaligus menyerap limpasan air.",
      isPositive: true,
      impactBadge: "+15% Kesehatan",
      impactNote: "Menyerap polutan limpasan air dan mempercantik tata kota.",
    },
    {
      id: "bersihSungai",
      label: "Normalisasi & Bersihkan Sungai",
      description: "Mengangkat sedimen lumpur dan sampah agar kapasitas sungai optimal.",
      isPositive: true,
      impactBadge: "+20% Aliran",
      impactNote: "Memulihkan daya tampung sungai dan memperlancar arus menuju laut.",
    },
  ],

  longsor: [
    // 5 Aksi Risiko
    {
      id: "tebangLiar",
      label: "Menebang Pohon di Lereng (Deforestasi)",
      description: "Hilangnya akar membuat lapisan tanah atas mudah terlepas saat hujan.",
      isPositive: false,
      impactBadge: "-30% Kekuatan",
      impactNote: "Lereng kehilangan paku bumi biologis dan memicu retakan tanah.",
    },
    {
      id: "potongTebing",
      label: "Memotong Lereng Tanpa Dinding Penahan",
      description: "Membuat sudut kemiringan tebing terlalu curam dan labil.",
      isPositive: false,
      impactBadge: "-25% Kekuatan",
      impactNote: "Sudut bidang gelincir lereng menjadi terjal dan rawan runtuh.",
    },
    {
      id: "rumahKakiBukit",
      label: "Membangun Rumah Tepat di Bawah Tebing",
      description: "Berisiko tinggi tertimpa material luncuran tanah saat cuaca ekstrem.",
      isPositive: false,
      impactBadge: "-20% Keamanan",
      impactNote: "Pemukiman berada tepat di zona luncuran berbahaya (run-out zone).",
    },
    {
      id: "limbahLereng",
      label: "Mengalirkan Air Limbah ke Permukaan Tebing",
      description: "Membuat tanah terus-menerus basah, berat, dan licin.",
      isPositive: false,
      impactBadge: "-15% Kekuatan",
      impactNote: "Tanah menjadi cepat jenuh air dan meningkatkan beban lereng.",
    },
    {
      id: "lahanMonokultur",
      label: "Membuka Kebun Sayur Semusim di Lereng Curam",
      description: "Akar tanaman semusim terlalu pendek untuk mengikat lapisan tanah dalam.",
      isPositive: false,
      impactBadge: "-20% Kekuatan",
      impactNote: "Permukaan tanah terbuka mudah tergerus erosi saat hujan lebat.",
    },
    // 5 Solusi Hijau
    {
      id: "tanamPohon",
      label: "Menanam Pohon Vetiver & Bambu",
      description: "Akar serabut dalam menjalar mengikat tanah hingga lapisan batuan dasar.",
      isPositive: true,
      impactBadge: "+30% Kekuatan",
      impactNote: "Berfungsi sebagai paku bumi alami berdaya cengkeram kuat.",
    },
    {
      id: "terasering",
      label: "Membuat Sistem Terasering (Sengkedan)",
      description: "Membentuk lereng berundak untuk memperlambat kecepatan aliran air hujan.",
      isPositive: true,
      impactBadge: "+25% Kekuatan",
      impactNote: "Memecah energi kinetik air limpasan dan mengurangi erosi.",
    },
    {
      id: "bronjong",
      label: "Memasang Dinding Penahan (Bronjong Batu)",
      description: "Struktur batu berkawat menahan tekanan tanah di kaki tebing curam.",
      isPositive: true,
      impactBadge: "+20% Kekuatan",
      impactNote: "Menopang kaki lereng dan mencegah bidang gelincir mendadak.",
    },
    {
      id: "drainaseLereng",
      label: "Membuat Saluran Pembuangan Air Lereng",
      description: "Mengarahkan aliran air hujan agar tidak mengumpul di retakan tanah.",
      isPositive: true,
      impactBadge: "+15% Resapan",
      impactNote: "Membuang kelebihan air permukaan sebelum menjenuhkan lereng.",
    },
    {
      id: "sensorLereng",
      label: "Memasang Ekstensometer Peringatan Dini",
      description: "Sensor mendeteksi pergeseran tanah milimeter dan membunyikan sirine warga.",
      isPositive: true,
      impactBadge: "+15% Keamanan",
      impactNote: "Memberikan waktu evakuasi dini sebelum longsor besar terjadi.",
    },
  ],

  kekeringan: [
    // 5 Aksi Risiko
    {
      id: "borosAir",
      label: "Memboroskan Air Bersih Sehari-hari",
      description: "Penggunaan air berlebihan mempercepat habisnya debit sumur desa.",
      isPositive: false,
      impactBadge: "-25% Cadangan",
      impactNote: "Cadangan air bersih di tangki dan sumur menyusut drastis.",
    },
    {
      id: "tebangMataAir",
      label: "Menebang Pohon di Sekitar Mata Air",
      description: "Tanah kehilangan kemampuan menyimpan cadangan air tanah saat kemarau.",
      isPositive: false,
      impactBadge: "-30% Resapan",
      impactNote: "Sumber mata air alami mengering dan debit akuifer anjlok.",
    },
    {
      id: "sedotAirTanah",
      label: "Menyedot Air Tanah Dalam Berlebihan",
      description: "Menurunkan permukaan akuifer secara drastis dan memicu kekeringan.",
      isPositive: false,
      impactBadge: "-25% Cadangan",
      impactNote: "Muka air tanah turun belasan meter dan sumur dangkal mati total.",
    },
    {
      id: "cemarSungai",
      label: "Mencemari Aliran Sungai dengan Limbah",
      description: "Air sungai yang tersisa tidak layak pakai untuk warga maupun pertanian.",
      isPositive: false,
      impactBadge: "-20% Kesehatan",
      impactNote: "Kualitas air memburuk dan mematikan mikroorganisme penyubur.",
    },
    {
      id: "lahanTerbuka",
      label: "Membiarkan Tanah Kebun Terbuka Tanpa Pelindung",
      description: "Terik matahari menguapkan kelembapan tanah jauh lebih cepat.",
      isPositive: false,
      impactBadge: "-15% Kelembapan",
      impactNote: "Permukaan tanah cepat merekah gersang dan tanaman layu.",
    },
    // 5 Solusi Hijau
    {
      id: "tandonHujan",
      label: "Memasang Tandon Pemanen Air Hujan",
      description: "Menampung air saat musim hujan sebagai cadangan stok air kemarau.",
      isPositive: true,
      impactBadge: "+25% Cadangan",
      impactNote: "Menyediakan ratusan liter air tawar mandiri tanpa boros sumur.",
    },
    {
      id: "irigasiTetes",
      label: "Menggunakan Irigasi Tetes Pintar",
      description: "Meneteskan air langsung ke akar tanaman sehingga hemat air hingga 50%.",
      isPositive: true,
      impactBadge: "+25% Efisiensi",
      impactNote: "Efisiensi air hingga 90%, tanaman tetap subur di cuaca terik.",
    },
    {
      id: "reboisasiHulu",
      label: "Reboisasi Hutan Hulu & Area Mata Air",
      description: "Memulihkan spons alami hutan untuk mengisi kembali akuifer air tanah.",
      isPositive: true,
      impactBadge: "+30% Resapan",
      impactNote: "Mengembalikan resapan air tanah dan menjaga debit mata air.",
    },
    {
      id: "embungDesa",
      label: "Membangun Embung / Kolam Retensi Desa",
      description: "Waduk mini penampung air permukaan untuk mengairi sawah saat kemarau.",
      isPositive: true,
      impactBadge: "+20% Cadangan",
      impactNote: "Menjaga kelembapan mikro lingkungan dan pasokan irigasi warga.",
    },
    {
      id: "mulsaOrganik",
      label: "Menutup Tanah dengan Mulsa Daun Kering",
      description: "Mengurangi penguapan air tanah akibat panas terik matahari.",
      isPositive: true,
      impactBadge: "+15% Kelembapan",
      impactNote: "Mempertahankan kelembapan tanah dan melindungi akar tanaman.",
    },
  ],

  karhutla: [
    // 5 Aksi Risiko
    {
      id: "baraApi",
      label: "Meninggalkan Bara Api Unggun Menyala",
      description: "Percikan api tertiup angin kering dan membakar serasah hutan.",
      isPositive: false,
      impactBadge: "-30% Keamanan",
      impactNote: "Percikan api dengan cepat merambat ke semak belukar kering.",
    },
    {
      id: "bakarLahan",
      label: "Membuka Lahan dengan Cara Membakar",
      description: "Api cepat merambat tak terkendali dan menghasilkan kabut asap pekat.",
      isPositive: false,
      impactBadge: "-35% Kesehatan",
      impactNote: "Bara api menyulut kubah gambut tebal dan mengeluarkan asap racun.",
    },
    {
      id: "kanalKering",
      label: "Membuat Parit Pengering Lahan Gambut",
      description: "Gambut yang kering berubah menjadi bahan bakar mudah terbakar di bawah tanah.",
      isPositive: false,
      impactBadge: "-25% Kelembapan",
      impactNote: "Kubah gambut mengering seperti spons batu bara rawan terbakar.",
    },
    {
      id: "sampahKaca",
      label: "Membuang Botol Kaca & Puntung di Hutan",
      description: "Botol kaca memfokuskan sinar matahari terik menjadi titik api.",
      isPositive: false,
      impactBadge: "-20% Keamanan",
      impactNote: "Efek lensa kaca memicu titik api spontan pada serasah kering.",
    },
    {
      id: "bakarSemak",
      label: "Membakar Sampah di Dekat Semak Belukar",
      description: "Rumput ilalang kering sangat mudah menyambar api dalam hitungan detik.",
      isPositive: false,
      impactBadge: "-20% Keamanan",
      impactNote: "Api liar menjalar ke area hutan lindung dan mengancam satwa.",
    },
    // 5 Solusi Hijau
    {
      id: "sekatKanal",
      label: "Membangun Sekat Kanal Pembasah Gambut",
      description: "Menahan air di parit agar lahan gambut tetap basah dan tidak mudah terbakar.",
      isPositive: true,
      impactBadge: "+35% Kelembapan",
      impactNote: "Muka air kanal naik dan membasahi kubah gambut bawah tanah.",
    },
    {
      id: "patroliHutan",
      label: "Patroli & Menara Pantau Titik Panas",
      description: "Mendeteksi kepulan asap lebih awal sebelum api meluas ke hutan lindung.",
      isPositive: true,
      impactBadge: "+20% Keamanan",
      impactNote: "Deteksi dini titik api memutus kebakaran sebelum menyebar.",
    },
    {
      id: "sekatBakar",
      label: "Membuat Jalur Sekat Bakar Hijau",
      description: "Menanam jalur tanaman tahan api berair banyak untuk memutus rambatan api.",
      isPositive: true,
      impactBadge: "+20% Keamanan",
      impactNote: "Memutus jalur perambatan api permukaan antar blok hutan.",
    },
    {
      id: "embungHutan",
      label: "Menyiapkan Embung Air Pemadam Hutan",
      description: "Sumber pasokan air cepat di tengah kawasan hutan rawan kebakaran.",
      isPositive: true,
      impactBadge: "+25% Cadangan",
      impactNote: "Menyediakan pasokan air pemadaman tanggap darurat di hutan.",
    },
    {
      id: "papanEdukasi",
      label: "Memasang Papan Peringatan & Zona Bebas Api",
      description: "Mengingatkan pengunjung dan warga untuk menjaga ekosistem dan satwa hutan.",
      isPositive: true,
      impactBadge: "+15% Kesehatan",
      impactNote: "Mencegah kelalaian manusia dan menjaga habitat satwa liar.",
    },
  ],
};

const DEFAULT_ACTIONS: Record<ScenarioId, Record<string, boolean>> = {
  banjir: {
    biopori: true,
    mangrove: true,
    sumurResapan: true,
    bersihSungai: true,
    rainGarden: false,
    betonPenuh: false,
    sampahSungai: false,
    tebangHulu: false,
    bangunanBantaran: false,
    tutupDrainase: false,
  },
  longsor: {
    tanamPohon: true,
    terasering: true,
    bronjong: true,
    drainaseLereng: true,
    sensorLereng: false,
    tebangLiar: false,
    potongTebing: false,
    rumahKakiBukit: false,
    limbahLereng: false,
    lahanMonokultur: false,
  },
  kekeringan: {
    tandonHujan: true,
    irigasiTetes: true,
    reboisasiHulu: true,
    embungDesa: true,
    mulsaOrganik: false,
    borosAir: false,
    tebangMataAir: false,
    sedotAirTanah: false,
    cemarSungai: false,
    lahanTerbuka: false,
  },
  karhutla: {
    sekatKanal: true,
    patroliHutan: true,
    sekatBakar: true,
    embungHutan: true,
    papanEdukasi: false,
    baraApi: false,
    bakarLahan: false,
    kanalKering: false,
    sampahKaca: false,
    bakarSemak: false,
  },
};

interface ScenarioTheme {
  headerGradient: string;
  headerBorder: string;
  badgeBg: string;
  badgeIconColor: string;
  resetIconColor: string;
  activeTabRing: string;
  activeTabIconBg: string;
  activeTabBadge: string;
  viewportBadgeBg: string;
  viewportPingColor: string;
  hintIconColor: string;
  companionBubbleBg: string;
  companionTitleColor: string;
  companionPingColor: string;
  weatherIconBg: string;
  weatherValueBadge: string;
  weatherSliderAccent: string;
  weatherPresetActiveLight: string;
}

const SCENARIO_THEMES: Record<ScenarioId, ScenarioTheme> = {
  banjir: {
    headerGradient: "from-[#0c243c] via-[#091b2e] to-[#061220]",
    headerBorder: "border-sky-900/40",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    badgeIconColor: "text-sky-300",
    resetIconColor: "text-sky-300",
    activeTabRing: "ring-sky-400/50",
    activeTabIconBg: "bg-sky-100 text-sky-900",
    activeTabBadge: "bg-sky-600 text-white",
    viewportBadgeBg: "bg-sky-100 text-sky-950",
    viewportPingColor: "bg-sky-500",
    hintIconColor: "text-sky-600",
    companionBubbleBg: "bg-sky-50/80 border-sky-200/80",
    companionTitleColor: "text-sky-950",
    companionPingColor: "bg-sky-500",
    weatherIconBg: "bg-sky-50 text-sky-700 border-sky-200/60",
    weatherValueBadge: "text-sky-400",
    weatherSliderAccent: "accent-sky-600",
    weatherPresetActiveLight: "bg-sky-50 text-sky-800 border-sky-300 ring-1 ring-sky-300",
  },
  longsor: {
    headerGradient: "from-[#291e14] via-[#20170f] to-[#17100a]",
    headerBorder: "border-amber-900/40",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    badgeIconColor: "text-amber-400",
    resetIconColor: "text-amber-300",
    activeTabRing: "ring-amber-500/50",
    activeTabIconBg: "bg-amber-100 text-amber-950",
    activeTabBadge: "bg-amber-700 text-white",
    viewportBadgeBg: "bg-amber-100 text-amber-950",
    viewportPingColor: "bg-amber-600",
    hintIconColor: "text-amber-700",
    companionBubbleBg: "bg-amber-50/80 border-amber-200/80",
    companionTitleColor: "text-amber-950",
    companionPingColor: "bg-amber-600",
    weatherIconBg: "bg-amber-50 text-amber-800 border-amber-200/60",
    weatherValueBadge: "text-amber-400",
    weatherSliderAccent: "accent-amber-700",
    weatherPresetActiveLight: "bg-amber-50 text-amber-900 border-amber-400 ring-1 ring-amber-300",
  },
  kekeringan: {
    headerGradient: "from-[#351e08] via-[#2a1705] to-[#1e1003]",
    headerBorder: "border-orange-900/40",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    badgeIconColor: "text-amber-300",
    resetIconColor: "text-orange-300",
    activeTabRing: "ring-orange-400/50",
    activeTabIconBg: "bg-orange-100 text-orange-950",
    activeTabBadge: "bg-orange-600 text-white",
    viewportBadgeBg: "bg-orange-100 text-orange-950",
    viewportPingColor: "bg-orange-500",
    hintIconColor: "text-orange-600",
    companionBubbleBg: "bg-orange-50/80 border-orange-200/80",
    companionTitleColor: "text-orange-950",
    companionPingColor: "bg-orange-500",
    weatherIconBg: "bg-orange-50 text-orange-700 border-orange-200/60",
    weatherValueBadge: "text-orange-400",
    weatherSliderAccent: "accent-orange-600",
    weatherPresetActiveLight: "bg-orange-50 text-orange-900 border-orange-300 ring-1 ring-orange-300",
  },
  karhutla: {
    headerGradient: "from-[#3a0c0c] via-[#2c0808] to-[#1c0404]",
    headerBorder: "border-rose-900/40",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    badgeIconColor: "text-rose-300",
    resetIconColor: "text-rose-300",
    activeTabRing: "ring-rose-400/50",
    activeTabIconBg: "bg-rose-100 text-rose-950",
    activeTabBadge: "bg-rose-600 text-white",
    viewportBadgeBg: "bg-rose-100 text-rose-950",
    viewportPingColor: "bg-rose-500",
    hintIconColor: "text-rose-600",
    companionBubbleBg: "bg-rose-50/80 border-rose-200/80",
    companionTitleColor: "text-rose-950",
    companionPingColor: "bg-rose-500",
    weatherIconBg: "bg-rose-50 text-rose-700 border-rose-200/60",
    weatherValueBadge: "text-rose-400",
    weatherSliderAccent: "accent-rose-600",
    weatherPresetActiveLight: "bg-rose-50 text-rose-900 border-rose-300 ring-1 ring-rose-300",
  },
};

export default function EcosystemSimulation() {
  const [scenario, setScenario] = useState<ScenarioId>("banjir");
  const [weatherIntensity, setWeatherIntensity] = useState<number>(55);
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [showHotspotLabels, setShowHotspotLabels] = useState<boolean>(true);
  const [actionFilter, setActionFilter] = useState<"all" | "positive" | "negative">("all");
  const [selectedHotspot, setSelectedHotspot] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // Status Aksi Aktif Tiap Skenario (Default 10 item per skenario)
  const [actions, setActions] = useState<Record<string, boolean>>({
    ...DEFAULT_ACTIONS.banjir,
  });

  const scenarioMeta: Record<
    ScenarioId,
    { title: string; subtitle: string; icon: any; weatherLabel: string; weatherUnit: string; has3D: boolean }
  > = {
    banjir: {
      title: "Diorama 3D Banjir: Sungai, Pemukiman & Akuifer",
      subtitle: "Uji bagaimana resapan biopori, sampah sungai, dan pohon mangrove mempengaruhi debit air dan akuifer tanah.",
      icon: Waves,
      weatherLabel: "Curah Hujan Ekstrem",
      weatherUnit: "mm / hari",
      has3D: true,
    },
    longsor: {
      title: "Diorama 3D Tanah Longsor: Lereng Curam & Geologi",
      subtitle: "Uji bagaimana terasering berundak, penebangan pohon lereng, dan jaring akar paku bumi menahan massa tanah saat hujan deras.",
      icon: Mountain,
      weatherLabel: "Curah Hujan & Kejenuhan Lereng",
      weatherUnit: "% kejenuhan",
      has3D: true,
    },
    kekeringan: {
      title: "Diorama 3D Kekeringan: Pertanian & Cadangan Air Tanah",
      subtitle: "Uji bagaimana tandon pemanen hujan, irigasi tetes hemat air, dan pompa air boros mempengaruhi sawah dan cadangan akuifer saat kemarau terik.",
      icon: SunMedium,
      weatherLabel: "Intensitas Terik & Kemarau",
      weatherUnit: "°C indeks panas",
      has3D: true,
    },
    karhutla: {
      title: "Diorama 3D Kebakaran Hutan: Lahan Gambut & Sekat Kanal",
      subtitle: "Uji bagaimana sekat kanal kayu menaikkan air untuk membasahi gambut dan mencegah api bawah tanah menjalar ke habitat satwa.",
      icon: Flame,
      weatherLabel: "Suhu Udara & Kekeringan",
      weatherUnit: "°C indeks panas",
      has3D: true,
    },
  };

  const handleScenarioChange = (newScen: ScenarioId) => {
    setScenario(newScen);
    setSelectedHotspot(null);
    setActionFilter("all");
    setActions({ ...DEFAULT_ACTIONS[newScen] });

    if (newScen === "banjir") {
      setWeatherIntensity(55);
    } else if (newScen === "longsor") {
      setWeatherIntensity(50);
    } else if (newScen === "kekeringan") {
      setWeatherIntensity(60);
    } else if (newScen === "karhutla") {
      setWeatherIntensity(65);
    }
  };

  const handleResetActions = () => {
    setActions({ ...DEFAULT_ACTIONS[scenario] });
  };

  const toggleAction = (id: string) => {
    setActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 3 Computed Metrics Calculation (Skala proporsional 10 Aksi)
  const { waterAbsorption, soilStrength, ecosystemHealth } = useMemo(() => {
    let absorption = 50;
    let strength = 50;

    if (scenario === "banjir") {
      // 5 Aksi Risiko
      if (actions.betonPenuh) absorption -= 20;
      if (actions.sampahSungai) absorption -= 15;
      if (actions.tebangHulu) absorption -= 15;
      if (actions.bangunanBantaran) strength -= 15;
      if (actions.tutupDrainase) absorption -= 10;

      // 5 Solusi Hijau
      if (actions.biopori) absorption += 20;
      if (actions.mangrove) {
        strength += 20;
        absorption += 10;
      }
      if (actions.sumurResapan) absorption += 15;
      if (actions.rainGarden) {
        absorption += 10;
        strength += 10;
      }
      if (actions.bersihSungai) {
        absorption += 10;
        strength += 10;
      }
    } else if (scenario === "longsor") {
      // 5 Aksi Risiko
      if (actions.tebangLiar) strength -= 25;
      if (actions.potongTebing) strength -= 20;
      if (actions.rumahKakiBukit) strength -= 15;
      if (actions.limbahLereng) {
        strength -= 15;
        absorption -= 10;
      }
      if (actions.lahanMonokultur) {
        strength -= 15;
        absorption -= 10;
      }

      // 5 Solusi Hijau
      if (actions.tanamPohon) {
        strength += 25;
        absorption += 15;
      }
      if (actions.terasering) {
        strength += 20;
        absorption += 10;
      }
      if (actions.bronjong) strength += 20;
      if (actions.drainaseLereng) {
        absorption += 15;
        strength += 10;
      }
      if (actions.sensorLereng) strength += 15;
    } else if (scenario === "kekeringan") {
      // 5 Aksi Risiko
      if (actions.borosAir) absorption -= 20;
      if (actions.tebangMataAir) {
        absorption -= 25;
        strength -= 15;
      }
      if (actions.sedotAirTanah) absorption -= 25;
      if (actions.cemarSungai) strength -= 20;
      if (actions.lahanTerbuka) {
        strength -= 15;
        absorption -= 10;
      }

      // 5 Solusi Hijau
      if (actions.tandonHujan) absorption += 20;
      if (actions.irigasiTetes) {
        strength += 20;
        absorption += 15;
      }
      if (actions.reboisasiHulu) {
        absorption += 25;
        strength += 15;
      }
      if (actions.embungDesa) absorption += 20;
      if (actions.mulsaOrganik) strength += 15;
    } else if (scenario === "karhutla") {
      // 5 Aksi Risiko
      if (actions.baraApi) strength -= 25;
      if (actions.bakarLahan) {
        strength -= 30;
        absorption -= 20;
      }
      if (actions.kanalKering) absorption -= 25;
      if (actions.sampahKaca) strength -= 15;
      if (actions.bakarSemak) strength -= 15;

      // 5 Solusi Hijau
      if (actions.sekatKanal) {
        absorption += 30;
        strength += 15;
      }
      if (actions.patroliHutan) strength += 20;
      if (actions.sekatBakar) strength += 20;
      if (actions.embungHutan) absorption += 20;
      if (actions.papanEdukasi) strength += 10;
    }

    // Weather impact penalty
    const weatherPenalty = (weatherIntensity - 50) * 0.45;
    absorption = Math.max(10, Math.min(100, Math.round(absorption - weatherPenalty * 0.5)));
    strength = Math.max(10, Math.min(100, Math.round(strength - weatherPenalty * 0.5)));

    const health = Math.max(
      5,
      Math.min(100, Math.round(absorption * 0.5 + strength * 0.5 - weatherPenalty * 0.25))
    );

    return { waterAbsorption: absorption, soilStrength: strength, ecosystemHealth: health };
  }, [scenario, weatherIntensity, actions]);

  // Mascot dynamic dialogue reacting to simulation conditions or hotspots
  const { mascotMood, mascotSpeech }: { mascotMood: RimbaMood; mascotSpeech: string } = useMemo(() => {
    if (selectedHotspot) {
      return {
        mascotMood: "think",
        mascotSpeech: `Tahukah kamu tentang ${selectedHotspot.title}? ${selectedHotspot.description}`,
      };
    }

    if (xrayMode) {
      if (scenario === "longsor") {
        return {
          mascotMood: "scan",
          mascotSpeech:
            "Keren! Mode X-Ray aktif. Perhatikan bagaimana jaring-jaring akar pohon menembus lapisan lempung hingga mencengkeram batuan dasar di bawahnya!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "scan",
          mascotSpeech:
            "Keren! Mode X-Ray aktif. Perhatikan kedalaman sumur desa dan tangki cadangan air tanah di bawah lapisan batuan yang menjaga kehidupan di permukaan!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "scan",
          mascotSpeech:
            "Keren! Mode X-Ray aktif. Perhatikan bagaimana api gambut dapat menjalar membara di bawah tanah kering dan bagaimana pembasahan dari sekat kanal menghentikannya!",
        };
      }
      return {
        mascotMood: "scan",
        mascotSpeech:
          "Keren! Mode X-Ray aktif. Sekarang kamu bisa melihat saluran pipa gorong-gorong bawah tanah dan lapisan akuifer yang menampung air bersih!",
      };
    }

    if (scenario === "longsor" && actions.tebangLiar && weatherIntensity > 65 && !actions.tanamPohon) {
      return {
        mascotMood: "alert",
        mascotSpeech:
          "BAHAYA LONGSOR! Lereng bukit gundul tanpa akar penahan! Guyuran hujan lebat membuat tanah jenuh air dan massa tanah meluncur ke arah rumah warga di kaki bukit!",
      };
    }

    if (
      scenario === "kekeringan" &&
      (actions.borosAir || actions.sedotAirTanah || actions.sedotAirDalam || actions.tebangMataAir) &&
      weatherIntensity > 60 &&
      !actions.tandonHujan &&
      !actions.irigasiTetes
    ) {
      return {
        mascotMood: "alert",
        mascotSpeech:
          "BAHAYA KEKERINGAN! Cadangan air tanah habis terkuras, sumur mengering, dan sawah retak-retak layu! Segera pasang tandon pemanen air hujan dan gunakan irigasi tetes!",
      };
    }

    if (
      scenario === "karhutla" &&
      (actions.baraApi || actions.bakarLahan || actions.bakarSemak || actions.sampahKaca) &&
      !actions.sekatKanal &&
      !actions.sekatGambut &&
      !actions.embungHutan
    ) {
      return {
        mascotMood: "alert",
        mascotSpeech:
          "BAHAYA KARHUTLA! Api membakar kubah gambut kering dan asap pekat membubung tinggi! Segera bangun sekat kanal untuk membasahi gambut dan selamatkan satwa hutan!",
      };
    }

    if (ecosystemHealth < 35) {
      if (scenario === "banjir") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Awas bahaya! Air sungai meluap membanjiri jalan karena curah hujan tinggi dan saluran tersumbat sampah! Coba pasang lubang biopori dan tanam mangrove!",
        };
      }
      if (scenario === "longsor") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Perhatian! Lereng bukit sangat labil dan rawan longsor! Segera tanam kembali pohon berakar dalam dan buat terasering berundak!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Lahan pertanian mengalami defisit air kritis! Tanaman terancam puso dan gagal panen karena kemarau panjang!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Hutan rawa gambut dalam kondisi kritis! Kabut asap pekat mengancam pernapasan warga dan habitat Orangutan!",
        };
      }
      return {
        mascotMood: "alert",
        mascotSpeech: "Peringatan bahaya! Kondisi alam sedang kritis! Segera terapkan aksi konservasi hijau di panel sebelah kanan!",
      };
    }

    if (ecosystemHealth > 75) {
      if (scenario === "longsor") {
        return {
          mascotMood: "celebrate",
          mascotSpeech:
            "Hebat sekali! Berkat terasering dan jaring akar pohon yang menembus batuan dasar, lereng bukit berdiri kokoh dan pemukiman warga aman terlindungi!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "celebrate",
          mascotSpeech:
            "Luar biasa! Berkat tandon pemanen hujan dan irigasi tetes presisi, tanaman tetap hijau subur dan cadangan air tanah terlindungi!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "celebrate",
          mascotSpeech:
            "Luar biasa! Berkat sekat kanal dan patroli rutin, gambut tetap basah berair dan satwa hutan hidup damai tanpa ancaman api!",
        };
      }
      return {
        mascotMood: "celebrate",
        mascotSpeech:
          "Luar biasa! Berkat biopori dan mangrove, air hujan meresap sempurna ke akuifer dan sungai mengalir lancar tanpa banjir!",
      };
    }

    if (weatherIntensity > 75) {
      if (scenario === "longsor") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Curah hujan sangat deras mengguyur perbukitan! Pastikan akar pohon dan terasering siap memecah air agar lereng tidak jenuh!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Matahari bersinar terik membakar! Indeks panas tinggi memicu penguapan air yang sangat cepat di permukaan lahan!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Cuaca panas ekstrem meningkatkan kerentanan kebakaran! Pastikan kanal air terisi penuh untuk menjaga kelembapan gambut!",
        };
      }
      return {
        mascotMood: "alert",
        mascotSpeech:
          "Hujan tropis lebat sedang mengguyur diorama! Perhatikan apakah air mulai menggenang atau terserap dengan baik ke tanah.",
      };
    }

    return {
      mascotMood: "wave",
      mascotSpeech:
        "Selamat datang di Laboratorium 3D Rimba! Putar diorama dengan mouse/layar, geser cuaca, dan klik pin edukasi untuk mempelajari sainsnya!",
    };
  }, [ecosystemHealth, scenario, weatherIntensity, xrayMode, selectedHotspot, actions]);

  const handleSelectHotspot = (title: string, description: string) => {
    setSelectedHotspot({ title, description });
  };

  const currentMeta = scenarioMeta[scenario];
  const currentTheme = SCENARIO_THEMES[scenario];

  const currentScenarioActions = SCENARIO_ACTIONS[scenario];
  const positiveCount = useMemo(
    () => currentScenarioActions.filter((a) => a.isPositive).length,
    [currentScenarioActions]
  );
  const negativeCount = useMemo(
    () => currentScenarioActions.filter((a) => !a.isPositive).length,
    [currentScenarioActions]
  );

  // Filter actions based on active filter
  const filteredActions = useMemo(() => {
    if (actionFilter === "positive") return currentScenarioActions.filter((a) => a.isPositive);
    if (actionFilter === "negative") return currentScenarioActions.filter((a) => !a.isPositive);
    return currentScenarioActions;
  }, [currentScenarioActions, actionFilter]);

  // Weather icon selector
  const WeatherIcon = useMemo(() => {
    if (scenario === "banjir" || scenario === "longsor") return CloudRain;
    if (scenario === "kekeringan") return Sun;
    return Flame;
  }, [scenario]);

  return (
    <div className="w-full pb-20 bg-slate-50/50">
      {/* =========================================================================
          1. HEADER BANNER UTAMA LABORATORIUM 3D
         ========================================================================= */}
      <section className={`bg-gradient-to-b ${currentTheme.headerGradient} text-white pt-8 pb-14 border-b ${currentTheme.headerBorder} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentTheme.badgeBg}`}>
                <Sparkles className={`w-3.5 h-3.5 ${currentTheme.badgeIconColor}`} />
                Laboratorium Simulasi 3D Ekosistem
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Fredoka'] tracking-tight">
                Diorama Interaktif Sains Bencana
              </h1>
              <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                Eksplorasi potongan balok lanskap 3D secara *real-time*. Uji bagaimana cuaca ekstrem,
                kebiasaan manusia, dan solusi konservasi mempengaruhi aliran air, tanah, dan akuifer bumi.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleScenarioChange(scenario)}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title="Atur ulang skenario ke kondisi awal"
              >
                <RotateCcw className={`w-4 h-4 ${currentTheme.resetIconColor}`} />
                <span>Mulai Ulang Skenario</span>
              </button>
            </div>
          </div>

          {/* 4 Scenario Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
            {(["banjir", "longsor", "kekeringan", "karhutla"] as ScenarioId[]).map((scen) => {
              const Icon = scenarioMeta[scen].icon;
              const isActive = scenario === scen;
              const scenTheme = SCENARIO_THEMES[scen];

              return (
                <button
                  key={scen}
                  onClick={() => handleScenarioChange(scen)}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer select-none group ${
                    isActive
                      ? `bg-white text-slate-900 border-white shadow-xl scale-[1.02] ring-2 ${scenTheme.activeTabRing} font-black`
                      : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive ? scenTheme.activeTabIconBg : "bg-white/10 text-white/80 group-hover:bg-white/15"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block opacity-70 font-bold">
                        Diorama 3D
                      </span>
                      <strong className="text-xs sm:text-sm capitalize block font-['Fredoka']">
                        {scen}
                      </strong>
                    </div>
                  </div>

                  {/* State Badge: Hanya tampilkan badge AKTIF pada tab yang aktif */}
                  {isActive ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-xs ${scenTheme.activeTabBadge}`}>
                      AKTIF
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-wider border border-white/10 hidden sm:inline group-hover:text-white/80 transition-colors">
                      Eksplorasi
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WORKSPACE UTAMA: SPLIT-SCREEN RESPONSIVE (3D CANVAS + KONTROL)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =========================================================================
              KOLOM KIRI: KANVAS DIORAMA 3D & TELEMETRI GAUGES (7/12 COLS - STICKY)
             ========================================================================= */}
          <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-3.5 self-start">
            
            {/* Kartu Kanvas 3D Interaktif */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-3.5 sm:p-4 relative">
              
              {/* Toolbar Atas Kanvas 3D */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${currentTheme.viewportBadgeBg}`}>
                    <span className={`w-2 h-2 rounded-full animate-ping ${currentTheme.viewportPingColor}`} />
                    <span>Diorama 3D Interaktif</span>
                  </span>
                  <span className="text-xs text-slate-600 font-bold hidden sm:inline">
                    {currentMeta.title.split(":")[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Tombol Toggle Label Pin Hotspot */}
                  <button
                    onClick={() => setShowHotspotLabels(!showHotspotLabels)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                      showHotspotLabels
                        ? "bg-slate-900 text-white border-slate-700 shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/70"
                    }`}
                    title={
                      showHotspotLabels
                        ? "Sembunyikan label teks pada pin 3D"
                        : "Tampilkan label teks pada pin 3D"
                    }
                  >
                    <Tag className={`w-3.5 h-3.5 ${showHotspotLabels ? "text-amber-300" : "text-slate-400"}`} />
                    <span>{showHotspotLabels ? "Label Pin: Tampil" : "Label Pin: Sembunyi"}</span>
                  </button>

                  {/* Tombol Toggle Mode X-Ray Tanah */}
                  <button
                    onClick={() => setXrayMode(!xrayMode)}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                      xrayMode
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-cyan-900/25 ring-2 ring-cyan-300/40"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/70"
                    }`}
                    title="Lihat tembus pandang ke lapisan struktur bawah tanah"
                  >
                    {xrayMode ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-cyan-200" />
                        <span>Mode X-Ray: AKTIF</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                        <span>X-Ray Lapisan Tanah</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* RENDER KANVAS 3D DENGAN SUSPENSE */}
              {scenario === "banjir" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="banjir">
                    <FloodDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={{ ...actions, mangrove: actions.mangrove ?? actions.tanamPohon }}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : scenario === "longsor" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="longsor">
                    <LandslideDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : scenario === "kekeringan" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="kekeringan">
                    <DroughtDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="karhutla">
                    <WildfireDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                    />
                  </DioramaCanvas>
                </Suspense>
              )}

              {/* Banner Info Hotspot yang Sedang Terpilih atau Tips Edukasi */}
              {selectedHotspot ? (
                <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white flex items-start justify-between gap-3 shadow-lg border border-emerald-500/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hotspot Edukasi Sains:</span>
                    </div>
                    <strong className="text-sm font-bold text-white block">
                      {selectedHotspot.title}
                    </strong>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      {selectedHotspot.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                    title="Tutup info hotspot"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 py-2 px-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-500 text-[11px] font-medium flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Info className={`w-3.5 h-3.5 flex-shrink-0 ${currentTheme.hintIconColor}`} />
                    <span>
                      Klik salah satu <strong>pin bersinar</strong> pada diorama 3D untuk membedah penjelasan sainsnya.
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                    Rotasi 360° • Zoom Scroll
                  </span>
                </div>
              )}
            </div>

            {/* =========================================================================
                TIGA (3) GAUGES METRIK TELEMETRI REAL-TIME
               ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Metric 1: Daya Serap Air */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Droplets className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Daya Serap Air</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-mono font-black text-xs border border-sky-200/50">
                    {waterAbsorption}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${waterAbsorption}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Infiltrasi ke tanah</span>
                  <span
                    className={`font-bold ${
                      waterAbsorption > 65
                        ? "text-emerald-600"
                        : waterAbsorption > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {waterAbsorption > 65 ? "Optimal" : waterAbsorption > 35 ? "Sedang" : "Kritis"}
                  </span>
                </div>
              </div>

              {/* Metric 2: Kekuatan Tanah & Struktur Lereng */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Kekuatan Tanah</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-mono font-black text-xs border border-amber-200/50">
                    {soilStrength}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${soilStrength}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Cengkeraman akar</span>
                  <span
                    className={`font-bold ${
                      soilStrength > 65
                        ? "text-emerald-600"
                        : soilStrength > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {soilStrength > 65 ? "Sangat Kokoh" : soilStrength > 35 ? "Cukup Stabil" : "Labil"}
                  </span>
                </div>
              </div>

              {/* Metric 3: Kesehatan Ekosistem */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center ${
                        ecosystemHealth > 65
                          ? "bg-emerald-100 text-emerald-800"
                          : ecosystemHealth > 35
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <HeartPulse className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Kesehatan Alam</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono font-black text-xs border ${
                      ecosystemHealth > 65
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200/50"
                        : ecosystemHealth > 35
                        ? "bg-amber-50 text-amber-800 border-amber-200/50"
                        : "bg-rose-50 text-rose-800 border-rose-200/50"
                    }`}
                  >
                    {ecosystemHealth}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ecosystemHealth > 65
                        ? "bg-gradient-to-r from-teal-500 to-emerald-600"
                        : ecosystemHealth > 35
                        ? "bg-gradient-to-r from-amber-400 to-amber-600"
                        : "bg-gradient-to-r from-rose-500 to-rose-700"
                    }`}
                    style={{ width: `${ecosystemHealth}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Ketahanan ekologis</span>
                  <span
                    className={`font-bold ${
                      ecosystemHealth > 65
                        ? "text-emerald-600"
                        : ecosystemHealth > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {ecosystemHealth > 65 ? "Lestari & Aman" : ecosystemHealth > 35 ? "Waspada" : "Kritis Bahaya"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              KOLOM KANAN: PENDAMPING RIMBA & PANEL KONTROL EKSPERIMEN (5/12 COLS - INDEPENDENT SCROLL)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-3.5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto lg:pr-1.5 scrollbar-thin self-start">
            
            {/* Visual Column Header */}
            <div className="flex items-center justify-between px-1 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-100 text-emerald-800">
                  <Sliders className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Panel Kontrol &amp; Rekayasa
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                Scroll untuk kontrol penuh
              </span>
            </div>
            
            {/* 1. MASKOT RIMBA HORIZONTAL COMPANION CARD (SERAGAM DENGAN CARD LAIN) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-4.5 sm:p-5 shadow-md">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Avatar Maskot Kiri - Fixed w-24 h-24 */}
                <div className="w-24 h-24 shrink-0 flex items-center justify-center relative">
                  <RimbaMascot mood={mascotMood} size="sm" />
                </div>

                {/* Dialog Bubble Kanan - Full Flex-1 Width */}
                <div className={`flex-1 min-w-0 ${currentTheme.companionBubbleBg} rounded-2xl p-3.5 shadow-xs relative border transition-colors duration-300`}>
                  <div className="flex items-center justify-between gap-1.5 mb-1 flex-wrap">
                    <div className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider ${currentTheme.companionTitleColor}`}>
                      <span className={`w-2 h-2 rounded-full animate-ping ${currentTheme.companionPingColor}`} />
                      <span>Rimba si Eco-Guide</span>
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0 ${
                        mascotMood === "alert"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : mascotMood === "celebrate"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : mascotMood === "scan"
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-200"
                          : "bg-white/90 text-slate-700 border border-slate-200/60"
                      }`}
                    >
                      {mascotMood === "alert"
                        ? "Peringatan"
                        : mascotMood === "celebrate"
                        ? "Prestasi"
                        : mascotMood === "scan"
                        ? "Mode X-Ray"
                        : "Edukasi"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug">
                    {mascotSpeech}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. KONTROL INTENSITAS CUACA ALAM DENGAN PRESET CEPAT */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-4.5 sm:p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${currentTheme.weatherIconBg}`}>
                    <WeatherIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-none">
                      {currentMeta.weatherLabel}
                    </h4>
                    <span className="text-[10px] text-slate-400">Parameter iklim real-time</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-xs shadow-xs">
                  <span>{weatherIntensity}</span>
                  <span className={`text-[10px] font-sans font-bold ${currentTheme.weatherValueBadge}`}>
                    {currentMeta.weatherUnit}
                  </span>
                </div>
              </div>

              {/* Slider Input Cuaca */}
              <div className="space-y-1.5 pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weatherIntensity}
                  onChange={(e) => setWeatherIntensity(Number(e.target.value))}
                  className={`w-full h-2.5 bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-300 rounded-lg appearance-none cursor-pointer shadow-inner ${currentTheme.weatherSliderAccent}`}
                  aria-label="Pengatur intensitas cuaca"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
                  <span>Rendah (0)</span>
                  <span>Normal (50)</span>
                  <span className="text-rose-600">Ekstrem (100)</span>
                </div>
              </div>

              {/* Tombol Preset Cepat */}
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                <button
                  onClick={() => setWeatherIntensity(25)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    weatherIntensity <= 35
                      ? `${currentTheme.weatherPresetActiveLight} font-black shadow-xs`
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  <span>🌿</span>
                  <span>Ringan (25)</span>
                </button>
                <button
                  onClick={() => setWeatherIntensity(50)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    weatherIntensity > 35 && weatherIntensity <= 70
                      ? "bg-amber-50 text-amber-800 border-amber-300 shadow-xs ring-1 ring-amber-300 font-black"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  <span>🌦️</span>
                  <span>Normal (50)</span>
                </button>
                <button
                  onClick={() => setWeatherIntensity(85)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    weatherIntensity > 70
                      ? "bg-rose-50 text-rose-800 border-rose-300 shadow-xs ring-1 ring-rose-300 font-black"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  <span>⚡</span>
                  <span>Ekstrem (85)</span>
                </button>
              </div>
            </div>

            {/* 3. AKSI MANUSIA & REKAYASA LINGKUNGAN (10 ITEM: 5 SOLUSI + 5 RISIKO) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-4.5 shadow-md space-y-3">
              {/* Header Kontrol & Filter Sticky */}
              <div className="space-y-2.5 pb-2.5 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      Aksi Manusia &amp; Rekayasa
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      10 parameter interaktif (5 Solusi + 5 Risiko)
                    </p>
                  </div>

                  {/* Tombol Reset Toggle Cepat */}
                  <button
                    onClick={handleResetActions}
                    className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90 transition-all inline-flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                    title="Atur ulang toggle ke kondisi awal skenario"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span>Reset Toggle</span>
                  </button>
                </div>

                {/* Filter Tabs dengan Counter Dinamis */}
                <div className="flex items-center justify-between gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => setActionFilter("all")}
                    className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      actionFilter === "all"
                        ? "bg-white text-slate-900 shadow-xs font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Semua ({currentScenarioActions.length})
                  </button>
                  <button
                    onClick={() => setActionFilter("positive")}
                    className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      actionFilter === "positive"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-emerald-700 hover:text-emerald-900"
                    }`}
                  >
                    Solusi ({positiveCount})
                  </button>
                  <button
                    onClick={() => setActionFilter("negative")}
                    className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      actionFilter === "negative"
                        ? "bg-rose-600 text-white shadow-xs font-black"
                        : "text-rose-700 hover:text-rose-900"
                    }`}
                  >
                    Risiko ({negativeCount})
                  </button>
                </div>
              </div>

              {/* List Container 10 Aksi (Mengalir Alami Tanpa Inner Scroll Trap) */}
              <div className="space-y-2.5">
                {filteredActions.map((act) => {
                  const isActive = !!actions[act.id];
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleAction(act.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                        isActive
                          ? act.isPositive
                            ? "bg-emerald-50/80 border-emerald-400 text-emerald-950 shadow-xs ring-1 ring-emerald-400/25"
                            : "bg-rose-50/80 border-rose-400 text-rose-950 shadow-xs ring-1 ring-rose-400/25"
                          : "bg-slate-50/80 border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70"
                      }`}
                    >
                      {/* Baris 1: Badge Status & Pill Dampak */}
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                            act.isPositive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {act.isPositive ? "SOLUSI HIJAU" : "AKSI RISIKO"}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-black border shadow-2xs ${
                            act.isPositive
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-rose-50 text-rose-700 border-rose-300"
                          }`}
                        >
                          {act.impactBadge}
                        </span>
                      </div>

                      {/* Baris 2: Judul Aksi Sejajar Toggle Switch */}
                      <div className="flex items-center justify-between gap-2.5">
                        <strong className="text-xs sm:text-sm font-bold text-slate-900 leading-tight flex-1 min-w-0 pr-1">
                          {act.label}
                        </strong>

                        {/* iOS-Style Toggle Switch */}
                        <div className="shrink-0">
                          <div
                            className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                              isActive
                                ? act.isPositive
                                  ? "bg-emerald-600"
                                  : "bg-rose-600"
                                : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${
                                isActive ? "translate-x-4.5" : "translate-x-0"
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Baris 3: Deskripsi Singkat */}
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mt-1">
                        {act.description}
                      </p>

                      {/* Baris 4: Efek Aktif (Progressive Disclosure - Muncul Hanya Saat ON) */}
                      {isActive && (
                        <div className="mt-2 pt-1.5 border-t border-slate-200/60 animate-in fade-in slide-in-from-top-1 duration-200">
                          <span
                            className={`text-[10px] font-bold block ${
                              act.isPositive ? "text-emerald-800" : "text-rose-800"
                            }`}
                          >
                            ⚡ {act.impactNote}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
