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
    {
      id: "betonPenuh",
      label: "Menutup Halaman dengan Beton",
      description: "Air hujan tidak memiliki tanah terbuka untuk meresap secara alami.",
      isPositive: false,
      impactBadge: "-35% Resapan",
      impactNote: "Limpasan air permukaan meningkat 300%, jalanan cepat tergenang banjir.",
    },
    {
      id: "sampahSungai",
      label: "Membuang Sampah ke Sungai",
      description: "Tumpukan sampah plastik menyumbat palung sungai dan gorong-gorong.",
      isPositive: false,
      impactBadge: "-25% Aliran",
      impactNote: "Aliran air tersendat parah dan langsung meluap ke badan jalan.",
    },
    {
      id: "biopori",
      label: "Membuat Lubang Resapan Biopori",
      description: "Pipa silinder mempercepat peresapan air langsung ke akuifer tanah.",
      isPositive: true,
      impactBadge: "+30% Resapan",
      impactNote: "Meningkatkan daya serap air tanah hingga 40% dan mengisi air tanah.",
    },
    {
      id: "tanamPohon",
      label: "Menanam Pohon Mangrove di Tepi Sungai",
      description: "Akar tunjang mangrove mengikat tebing sungai dan menahan laju air bah.",
      isPositive: true,
      impactBadge: "+25% Tegakan",
      impactNote: "Menahan kecepatan arus air dan mencegah erosi tanggul tanah.",
    },
  ],

  longsor: [
    {
      id: "tebangLiar",
      label: "Menebang Pohon di Lereng Curam",
      description: "Menghilangkan perakaran pohon yang membantu mengikat massa tanah.",
      isPositive: false,
      impactBadge: "-35% Kekuatan",
      impactNote: "Hilangnya ikatan akar membuat massa tanah labil saat hujan deras.",
    },
    {
      id: "potongTebing",
      label: "Mengeruk Kaki Lereng Tanpa Penahan",
      description: "Mengeruk dinding tebing secara vertikal tanpa dinding penahan.",
      isPositive: false,
      impactBadge: "-25% Stabilitas",
      impactNote: "Gaya penahan lereng hilang, memicu bidang gelincir mendadak.",
    },
    {
      id: "tanamPohon",
      label: "Menanam Pohon Berakar Dalam & Vetiver",
      description: "Akar tunjang pohon menembus lapisan lempung hingga batuan dasar sebagai paku bumi alami.",
      isPositive: true,
      impactBadge: "+35% Paku Bumi",
      impactNote: "Berfungsi sebagai paku bumi biologis berdaya cengkeram tinggi.",
    },
    {
      id: "terasering",
      label: "Membuat Terasering Berundak & Saluran Air",
      description: "Lereng dibuat undakan bertingkat agar air mengalir perlahan dan tidak mengikis tanah.",
      isPositive: true,
      impactBadge: "+25% Penahan",
      impactNote: "Mengurangi kecepatan air limpasan dan membuang kejenuhan air lereng.",
    },
  ],

  kekeringan: [
    {
      id: "borosAir",
      label: "Memompa Air Tanah Berlebihan (Boros Air)",
      description: "Air tanah dipompa terus-menerus tanpa waktu resapan pengisian ulang.",
      isPositive: false,
      impactBadge: "-35% Air Tanah",
      impactNote: "Muka air tanah turun drastis, sumur dangkal warga mengering total.",
    },
    {
      id: "bakarJerami",
      label: "Pembakaran Sisa Panen & Jerami",
      description: "Membakar mulsa jerami sehingga mikroba mati dan tanah mengeras gersang.",
      isPositive: false,
      impactBadge: "-20% Kelembapan",
      impactNote: "Tanah kehilangan bahan organik dan kemampuan menahan kelembapan.",
    },
    {
      id: "tandonHujan",
      label: "Tandon Pemanen Air Hujan (Rainwater Tank)",
      description: "Tangki penampung air hujan dari talang atap rumah untuk menyuplai air saat kemarau.",
      isPositive: true,
      impactBadge: "+30% Cadangan",
      impactNote: "Menyediakan cadangan ratusan liter air tawar tanpa menguras air tanah.",
    },
    {
      id: "irigasiTetes",
      label: "Irigasi Tetes Hemat Air (Drip Irrigation)",
      description: "Pipa mikro menyalurkan tetesan air langsung ke perakaran tanaman secara presisi.",
      isPositive: true,
      impactBadge: "+30% Efisiensi",
      impactNote: "Efisiensi penggunaan air mencapai 90%, tanaman tetap subur di musim kemarau.",
    },
  ],

  karhutla: [
    {
      id: "baraApi",
      label: "Membuka Lahan dengan Api & Puntung",
      description: "Menyulut vegetasi kering yang dengan cepat merambat ke kubah gambut bawah tanah.",
      isPositive: false,
      impactBadge: "-35% Keamanan",
      impactNote: "Bara api merambat diam-diam di bawah tanah gambut dan menghasilkan asap tebal.",
    },
    {
      id: "kanalKering",
      label: "Membuat Parit Drainase Tanpa Sekat",
      description: "Air keluar dari kubah gambut alami sehingga tanah menjadi kering kerontang.",
      isPositive: false,
      impactBadge: "-35% Air Gambut",
      impactNote: "Lapisan gambut tebal mengering bagaikan spons batu bara yang mudah terbakar.",
    },
    {
      id: "sekatKanal",
      label: "Membangun Sekat Kanal Kayu (Rewetting)",
      description: "Membendung parit drainase agar air tertahan dan membasahi kembali kubah gambut.",
      isPositive: true,
      impactBadge: "+35% Kebasahan",
      impactNote: "Muka air kanal naik, tanah gambut basah lembap dan memadamkan bara api.",
    },
    {
      id: "patroliHutan",
      label: "Patroli Hutan & Sensor Titik Panas",
      description: "Memantau titik api awal menggunakan menara pantau, patroli tim, dan sensor drone.",
      isPositive: true,
      impactBadge: "+20% Deteksi",
      impactNote: "Deteksi dini dan respon cepat sebelum percikan api membesar menjadi karhutla luas.",
    },
  ],
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

  // Status Aksi Aktif Tiap Skenario
  const [actions, setActions] = useState<Record<string, boolean>>({
    betonPenuh: false,
    sampahSungai: false,
    biopori: true,
    tanamPohon: true,
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

    if (newScen === "banjir") {
      setWeatherIntensity(55);
      setActions({ betonPenuh: false, sampahSungai: false, biopori: true, tanamPohon: true });
    } else if (newScen === "longsor") {
      setWeatherIntensity(50);
      setActions({ tebangLiar: false, potongTebing: false, tanamPohon: true, terasering: true });
    } else if (newScen === "kekeringan") {
      setWeatherIntensity(60);
      setActions({ borosAir: false, bakarJerami: false, tandonHujan: true, irigasiTetes: true });
    } else if (newScen === "karhutla") {
      setWeatherIntensity(65);
      setActions({ baraApi: false, kanalKering: false, sekatKanal: true, patroliHutan: true });
    }
  };

  const toggleAction = (id: string) => {
    setActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 3 Computed Metrics Calculation
  const { waterAbsorption, soilStrength, ecosystemHealth } = useMemo(() => {
    let absorption = 50;
    let strength = 50;

    if (scenario === "banjir") {
      if (actions.betonPenuh) absorption -= 35;
      if (actions.sampahSungai) absorption -= 25;
      if (actions.biopori) absorption += 30;
      if (actions.tanamPohon) absorption += 25;
      strength = 60 + (actions.tanamPohon ? 30 : 0) - (actions.betonPenuh ? 15 : 0);
    } else if (scenario === "longsor") {
      if (actions.tebangLiar) strength -= 35;
      if (actions.potongTebing) strength -= 25;
      if (actions.tanamPohon || actions.rumputVetiver) strength += 35;
      if (actions.terasering) strength += 25;
      absorption = 55 + ((actions.tanamPohon || actions.rumputVetiver) ? 25 : 0) + (actions.terasering ? 15 : 0) - (actions.tebangLiar ? 25 : 0);
    } else if (scenario === "kekeringan") {
      if (actions.borosAir || actions.sedotAirDalam) absorption -= 35;
      if (actions.bakarJerami) absorption -= 20;
      if (actions.tandonHujan || actions.tandonAir) absorption += 30;
      if (actions.irigasiTetes) absorption += 30;
      strength = 45 + ((actions.tandonHujan || actions.tandonAir) ? 25 : 0) + (actions.irigasiTetes ? 20 : 0) - ((actions.borosAir || actions.sedotAirDalam) ? 25 : 0);
    } else if (scenario === "karhutla") {
      if (actions.baraApi || actions.bakarLahan) strength -= 35;
      if (actions.kanalKering) absorption -= 35;
      if (actions.sekatKanal || actions.sekatGambut) {
        absorption += 35;
        strength += 25;
      }
      if (actions.patroliHutan || actions.patroliDrone) strength += 20;
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
      (actions.borosAir || actions.sedotAirDalam) &&
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
      (actions.baraApi || actions.bakarLahan) &&
      !actions.sekatKanal &&
      !actions.sekatGambut
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

  // Filter actions based on active filter
  const filteredActions = useMemo(() => {
    const list = SCENARIO_ACTIONS[scenario];
    if (actionFilter === "positive") return list.filter((a) => a.isPositive);
    if (actionFilter === "negative") return list.filter((a) => !a.isPositive);
    return list;
  }, [scenario, actionFilter]);

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
          <div className="lg:col-span-7 lg:sticky lg:top-6 space-y-4">
            
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
                <Suspense fallback={<div className="h-[460px] lg:h-[520px] bg-slate-100 rounded-2xl animate-pulse" />}>
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
                <Suspense fallback={<div className="h-[460px] lg:h-[520px] bg-slate-100 rounded-2xl animate-pulse" />}>
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
                <Suspense fallback={<div className="h-[460px] lg:h-[520px] bg-slate-100 rounded-2xl animate-pulse" />}>
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
                <Suspense fallback={<div className="h-[460px] lg:h-[520px] bg-slate-100 rounded-2xl animate-pulse" />}>
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
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Daya Serap Air</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-mono font-black text-xs border border-sky-200/50">
                    {waterAbsorption}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-1.5">
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
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Kekuatan Tanah</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-mono font-black text-xs border border-amber-200/50">
                    {soilStrength}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-1.5">
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
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        ecosystemHealth > 65
                          ? "bg-emerald-100 text-emerald-800"
                          : ecosystemHealth > 35
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <HeartPulse className="w-4 h-4" />
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
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-1.5">
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
              KOLOM KANAN: PENDAMPING RIMBA & PANEL KONTROL EKSPERIMEN (5/12 COLS)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
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

            {/* 3. AKSI MANUSIA & REKAYASA LINGKUNGAN DENGAN TOGGLE INTERAKTIF & PILL BADGES */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-4.5 sm:p-5 shadow-md space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Aksi Manusia &amp; Rekayasa
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Klik toggle untuk memicu efek visual 3D
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
                  <button
                    onClick={() => setActionFilter("all")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      actionFilter === "all"
                        ? "bg-white text-slate-900 shadow-xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setActionFilter("positive")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      actionFilter === "positive"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-emerald-700 hover:text-emerald-900"
                    }`}
                  >
                    Solusi
                  </button>
                  <button
                    onClick={() => setActionFilter("negative")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      actionFilter === "negative"
                        ? "bg-rose-600 text-white shadow-xs font-black"
                        : "text-rose-700 hover:text-rose-900"
                    }`}
                  >
                    Risiko
                  </button>
                </div>
              </div>

              {/* Daftar Aksi Interaktif */}
              <div className="space-y-2.5">
                {filteredActions.map((act) => {
                  const isActive = !!actions[act.id];
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleAction(act.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                        isActive
                          ? act.isPositive
                            ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-xs ring-1 ring-emerald-400/25"
                            : "bg-rose-50/90 border-rose-400 text-rose-950 shadow-xs ring-1 ring-rose-400/25"
                          : "bg-slate-50/80 border-slate-200/90 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="space-y-1 pr-1 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                              act.isPositive
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {act.isPositive ? "SOLUSI HIJAU" : "AKSI RISIKO"}
                          </span>

                          {/* Pill Badge Indikator Dampak Numerik */}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-black border shadow-2xs ${
                              act.isPositive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : "bg-rose-50 text-rose-700 border-rose-300"
                            }`}
                          >
                            {act.impactBadge}
                          </span>

                          <strong className="text-xs sm:text-sm font-bold block truncate">
                            {act.label}
                          </strong>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                          {act.description}
                        </p>
                        {isActive && (
                          <span
                            className={`text-[10px] font-bold block mt-0.5 ${
                              act.isPositive ? "text-emerald-800" : "text-rose-800"
                            }`}
                          >
                            ⚡ {act.impactNote}
                          </span>
                        )}
                      </div>

                      {/* iOS-Style Toggle Switch */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                            isActive
                              ? act.isPositive
                                ? "bg-emerald-600"
                                : "bg-rose-600"
                              : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                              isActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
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
