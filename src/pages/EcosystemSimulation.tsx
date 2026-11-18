import { useState, useMemo, useEffect, lazy, Suspense } from "react";
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
import { getScenarioActions, ActionConfig } from "../data/simulationData";
import { useLanguage } from "../context/LanguageContext";

// Lazy load 3D Canvas & Diorama Components
const DioramaCanvas = lazy(() => import("../components/lab3d/DioramaCanvas"));
const FloodDiorama3D = lazy(() => import("../components/lab3d/FloodDiorama3D"));
const LandslideDiorama3D = lazy(() => import("../components/lab3d/LandslideDiorama3D"));
const DroughtDiorama3D = lazy(() => import("../components/lab3d/DroughtDiorama3D"));
const WildfireDiorama3D = lazy(() => import("../components/lab3d/WildfireDiorama3D"));

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
  const { language } = useLanguage();
  const isEn = language === "en";

  const [scenario, setScenario] = useState<ScenarioId>("banjir");
  const [weatherIntensity, setWeatherIntensity] = useState<number>(55);
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [showHotspotLabels, setShowHotspotLabels] = useState<boolean>(true);
  const [actionFilter, setActionFilter] = useState<"all" | "positive" | "negative">("all");
  const [selectedHotspot, setSelectedHotspot] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // Reset selected hotspot when language toggles to avoid stale language display
  useEffect(() => {
    setSelectedHotspot(null);
  }, [language]);

  // Status Aksi Aktif Tiap Skenario (Default 10 item per skenario)
  const [actions, setActions] = useState<Record<string, boolean>>({
    ...DEFAULT_ACTIONS.banjir,
  });

  const scenarioMeta: Record<
    ScenarioId,
    { title: string; subtitle: string; icon: any; weatherLabel: string; weatherUnit: string; has3D: boolean; name: string }
  > = {
    banjir: {
      name: isEn ? "Flood" : "Banjir",
      title: isEn
        ? "3D Flood Diorama: River, Settlements & Aquifer"
        : "Diorama 3D Banjir: Sungai, Rumah, dan Cadangan Air Tanah",
      subtitle: isEn
        ? "Observe how biopore holes, river trash, and mangrove trees affect runoff speed and underground water storage."
        : "Lihat bagaimana biopori, sampah sungai, dan pohon mangrove memengaruhi aliran air dan simpanan air di tanah.",
      icon: Waves,
      weatherLabel: isEn ? "Extreme Rainfall" : "Curah Hujan Ekstrem",
      weatherUnit: isEn ? "mm / day" : "mm / hari",
      has3D: true,
    },
    longsor: {
      name: isEn ? "Landslide" : "Tanah Longsor",
      title: isEn
        ? "3D Landslide Diorama: Steep Slopes & Geology"
        : "Diorama 3D Tanah Longsor: Lereng Curam & Geologi",
      subtitle: isEn
        ? "Test how stepped terraces, hillside logging, and deep-root anchors retain soil mass during heavy rainfall."
        : "Uji bagaimana terasering berundak, penebangan pohon lereng, dan jaring akar paku bumi menahan massa tanah saat hujan deras.",
      icon: Mountain,
      weatherLabel: isEn ? "Rain & Slope Wetness" : "Hujan & Kebasahan Lereng",
      weatherUnit: isEn ? "% wetness" : "% basah",
      has3D: true,
    },
    kekeringan: {
      name: isEn ? "Drought" : "Kekeringan",
      title: isEn
        ? "3D Drought Diorama: Agriculture & Groundwater Reserve"
        : "Diorama 3D Kekeringan: Pertanian & Cadangan Air Tanah",
      subtitle: isEn
        ? "Test how rainwater harvesting, precision drip irrigation, and overpumping impact crops and aquifer reserves."
        : "Uji bagaimana tandon pemanen hujan, irigasi tetes hemat air, dan pompa air boros mempengaruhi sawah dan cadangan akuifer saat kemarau terik.",
      icon: SunMedium,
      weatherLabel: isEn ? "Heat & Drought Severity" : "Intensitas Terik & Kemarau",
      weatherUnit: isEn ? "°C heat index" : "°C indeks panas",
      has3D: true,
    },
    karhutla: {
      name: isEn ? "Wildfire" : "Kebakaran Hutan",
      title: isEn
        ? "3D Wildfire Diorama: Peatlands & Canal Blocking"
        : "Diorama 3D Kebakaran Hutan: Lahan Gambut & Sekat Kanal",
      subtitle: isEn
        ? "Test how peat canal blocking raises water tables to rewet dried peat and stop underground smoldering fires."
        : "Uji bagaimana sekat kanal kayu menaikkan air untuk membasahi gambut dan mencegah api bawah tanah menjalar ke habitat satwa.",
      icon: Flame,
      weatherLabel: isEn ? "Air Temp & Dryness" : "Suhu Udara & Kekeringan",
      weatherUnit: isEn ? "°C heat index" : "°C indeks panas",
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
        mascotSpeech: isEn
          ? `Did you know about ${selectedHotspot.title}? ${selectedHotspot.description}`
          : `Tahukah kamu tentang ${selectedHotspot.title}? ${selectedHotspot.description}`,
      };
    }

    if (xrayMode) {
      if (scenario === "longsor") {
        return {
          mascotMood: "scan",
          mascotSpeech: isEn
            ? "Awesome! X-Ray mode active. Look at how deep tree roots penetrate clay layers to anchor the bedrock beneath!"
            : "Keren! Mode X-Ray aktif. Perhatikan bagaimana jaring-jaring akar pohon menembus lapisan lempung hingga mencengkeram batuan dasar di bawahnya!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "scan",
          mascotSpeech: isEn
            ? "Awesome! X-Ray mode active. Notice the village well depth and groundwater aquifer layers storing vital fresh water below!"
            : "Keren! Mode X-Ray aktif. Perhatikan kedalaman sumur desa dan tangki cadangan air tanah di bawah lapisan batuan yang menjaga kehidupan di permukaan!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "scan",
          mascotSpeech: isEn
            ? "Awesome! X-Ray mode active. Notice how peat fires can smolder underground in dry peat and how canal blocking rewets the soil!"
            : "Keren! Mode X-Ray aktif. Perhatikan bagaimana api gambut dapat menjalar membara di bawah tanah kering dan bagaimana pembasahan dari sekat kanal menghentikannya!",
        };
      }
      return {
        mascotMood: "scan",
        mascotSpeech: isEn
          ? "Awesome! X-Ray mode active. You can now see underground drainage pipes and aquifer layers absorbing runoff!"
          : "Keren! Mode X-Ray aktif. Sekarang kamu bisa melihat saluran pipa gorong-gorong bawah tanah dan lapisan akuifer yang menampung air bersih!",
      };
    }

    if (scenario === "longsor" && actions.tebangLiar && weatherIntensity > 65 && !actions.tanamPohon) {
      return {
        mascotMood: "alert",
        mascotSpeech: isEn
          ? "LANDSLIDE HAZARD! The hillside is bare without roots! Heavy rain saturates the soil and triggers a mudslide toward village homes!"
          : "BAHAYA LONGSOR! Lereng bukit gundul tanpa akar penahan! Guyuran hujan lebat membuat tanah jenuh air dan massa tanah meluncur ke arah rumah warga di kaki bukit!",
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
        mascotSpeech: isEn
          ? "DROUGHT HAZARD! Aquifer reserves depleted, wells run dry, and crops wilt! Install rainwater tanks and drip irrigation now!"
          : "BAHAYA KEKERINGAN! Cadangan air tanah habis terkuras, sumur mengering, dan sawah retak-retak layu! Segera pasang tandon pemanen air hujan dan gunakan irigasi tetes!",
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
        mascotSpeech: isEn
          ? "WILDFIRE HAZARD! Dried peat dome is catching fire with toxic haze billowing! Build canal blocks immediately to rewet peat!"
          : "BAHAYA KARHUTLA! Api membakar kubah gambut kering dan asap pekat membubung tinggi! Segera bangun sekat kanal untuk membasahi gambut dan selamatkan satwa hutan!",
      };
    }

    if (ecosystemHealth < 35) {
      if (scenario === "banjir") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Flood warning! River is overflowing onto streets due to torrential rain and blocked drainage! Install biopores and plant mangroves!"
            : "Awas bahaya! Air sungai meluap membanjiri jalan karena curah hujan tinggi dan saluran tersumbat sampah! Coba pasang lubang biopori dan tanam mangrove!",
        };
      }
      if (scenario === "longsor") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Attention! Slopes are unstable and prone to collapse! Replant deep-rooted trees and construct stepped terraces!"
            : "Perhatian! Lereng bukit sangat labil dan rawan longsor! Segera tanam kembali pohon berakar dalam dan buat terasering berundak!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Severe agricultural water deficit! Crops are wilting due to extended severe drought!"
            : "Lahan pertanian mengalami defisit air kritis! Tanaman terancam puso dan gagal panen karena kemarau panjang!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Peat swamp in critical condition! Thick smoke haze threatens air quality and Orangutan habitats!"
            : "Hutan rawa gambut dalam kondisi kritis! Kabut asap pekat mengancam pernapasan warga dan habitat Orangutan!",
        };
      }
      return {
        mascotMood: "alert",
        mascotSpeech: isEn
          ? "Danger alert! Nature is in poor condition. Try selecting positive conservation actions on the right!"
          : "Peringatan bahaya! Alam sedang dalam kondisi buruk. Coba pilih cara menjaga alam di sebelah kanan!",
      };
    }

    if (ecosystemHealth > 75) {
      if (scenario === "longsor") {
        return {
          mascotMood: "celebrate",
          mascotSpeech: isEn
            ? "Brilliant! Thanks to terraces and deep-root anchors, the hillside stands firm and homes are fully protected!"
            : "Hebat sekali! Berkat terasering dan jaring akar pohon yang menembus batuan dasar, lereng bukit berdiri kokoh dan pemukiman warga aman terlindungi!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "celebrate",
          mascotSpeech: isEn
            ? "Amazing! Thanks to rainwater harvesting and precision drip irrigation, crops stay green and groundwater stays protected!"
            : "Luar biasa! Berkat tandon pemanen hujan dan irigasi tetes presisi, tanaman tetap hijau subur dan cadangan air tanah terlindungi!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "celebrate",
          mascotSpeech: isEn
            ? "Outstanding! Thanks to canal blocks and regular patrols, peat remains wet and forest wildlife thrives peacefully!"
            : "Luar biasa! Berkat sekat kanal dan patroli rutin, gambut tetap basah berair dan satwa hutan hidup damai tanpa ancaman api!",
        };
      }
      return {
        mascotMood: "celebrate",
        mascotSpeech: isEn
          ? "Superb! Thanks to biopores and mangroves, rainwater infiltrates the aquifer smoothly with zero flooding!"
          : "Luar biasa! Berkat biopori dan mangrove, air hujan meresap sempurna ke akuifer dan sungai mengalir lancar tanpa banjir!",
      };
    }

    if (weatherIntensity > 75) {
      if (scenario === "longsor") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Torrential rain is pouring on the hills! Ensure roots and terraces are ready to disperse water so slopes do not saturate!"
            : "Curah hujan sangat deras mengguyur perbukitan! Pastikan akar pohon dan terasering siap memecah air agar lereng tidak jenuh!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Scorching sun is blazing! High heat index causes rapid surface water evaporation!"
            : "Matahari bersinar terik membakar! Indeks panas tinggi memicu penguapan air yang sangat cepat di permukaan lahan!",
        };
      }
      if (scenario === "karhutla") {
        return {
          mascotMood: "alert",
          mascotSpeech: isEn
            ? "Extreme heat increases fire vulnerability! Ensure water canals are full to maintain peat moisture!"
            : "Cuaca panas ekstrem meningkatkan kerentanan kebakaran! Pastikan kanal air terisi penuh untuk menjaga kelembapan gambut!",
        };
      }
      return {
        mascotMood: "alert",
        mascotSpeech: isEn
          ? "Heavy tropical downpour in the diorama! Observe whether water starts pooling or infiltrates well into the ground."
          : "Hujan tropis lebat sedang mengguyur diorama! Perhatikan apakah air mulai menggenang atau terserap dengan baik ke tanah.",
      };
    }

    return {
      mascotMood: "wave",
      mascotSpeech: isEn
        ? "Welcome to Rimba's 3D Laboratory! Rotate the diorama with your mouse/touch, adjust weather intensity, and click glowing pins to learn the science!"
        : "Selamat datang di Laboratorium 3D Rimba! Putar diorama dengan mouse/layar, geser cuaca, dan klik pin edukasi untuk mempelajari sainsnya!",
    };
  }, [ecosystemHealth, scenario, weatherIntensity, xrayMode, selectedHotspot, actions, isEn]);

  const handleSelectHotspot = (title: string, description: string) => {
    setSelectedHotspot({ title, description });
  };

  const currentMeta = scenarioMeta[scenario];
  const currentTheme = SCENARIO_THEMES[scenario];

  const scenarioActionsMap = useMemo(() => getScenarioActions(language), [language]);
  const currentScenarioActions = scenarioActionsMap[scenario];
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
    <div className="w-full pb-20 bg-slate-50/50 overflow-x-clip">
      {/* =========================================================================
          1. HEADER BANNER UTAMA LABORATORIUM 3D
         ========================================================================= */}
      <section className={`bg-gradient-to-b ${currentTheme.headerGradient} text-white pt-8 pb-14 border-b ${currentTheme.headerBorder} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentTheme.badgeBg}`}>
                <Sparkles className={`w-3.5 h-3.5 ${currentTheme.badgeIconColor}`} />
                {isEn ? "3D Ecosystem Simulation Lab" : "Laboratorium Simulasi 3D Ekosistem"}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Fredoka'] tracking-tight">
                {isEn ? "Disaster Learning Diorama" : "Diorama Belajar Bencana"}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                {isEn ? (
                  <>
                    Explore real-time 3D landscape cross-sections. Test how extreme weather,
                    human activities, and conservation solutions affect water runoff, soil stability, and groundwater aquifers.
                  </>
                ) : (
                  <>
                    Eksplorasi potongan balok lanskap 3D secara <em className="not-italic font-semibold text-white">real-time</em>. Uji bagaimana cuaca ekstrem,
                    kebiasaan manusia, dan solusi konservasi mempengaruhi aliran air, tanah, dan akuifer bumi.
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleScenarioChange(scenario)}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title={isEn ? "Reset scenario to initial state" : "Atur ulang skenario ke kondisi awal"}
              >
                <RotateCcw className={`w-4 h-4 ${currentTheme.resetIconColor}`} />
                <span>{isEn ? "Reset Scenario" : "Mulai Ulang Skenario"}</span>
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
                        {scenarioMeta[scen].name}
                      </strong>
                    </div>
                  </div>

                  {/* State Badge */}
                  {isActive ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-xs ${scenTheme.activeTabBadge}`}>
                      {isEn ? "ACTIVE" : "AKTIF"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-wider border border-white/10 hidden sm:inline group-hover:text-white/80 transition-colors">
                      {isEn ? "Explore" : "Eksplorasi"}
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
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-3.5 self-start">
            
            {/* Kartu Kanvas 3D Interaktif */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-3.5 sm:p-4 relative">
              
              {/* Toolbar Atas Kanvas 3D: Judul Skenario Aktif & View Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 px-1">
                {/* Judul Skenario Aktif + Status Singkat */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs shrink-0 ${currentTheme.viewportBadgeBg}`}>
                    <span className={`w-2 h-2 rounded-full animate-ping ${currentTheme.viewportPingColor}`} />
                     <span>Diorama 3D</span>
                  </span>
                  <span className="text-xs text-slate-600 font-bold hidden sm:inline">
                    {currentMeta.title.split(":")[0]}
                  </span>
                  <strong className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {currentMeta.title.replace(/^Diorama 3D\s*/, "")}
                  </strong>
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
                        ? (isEn ? "Hide text labels on 3D pins" : "Sembunyikan label teks pada pin 3D")
                        : (isEn ? "Show text labels on 3D pins" : "Tampilkan label teks pada pin 3D")
                    }
                  >
                    <Tag className={`w-3.5 h-3.5 ${showHotspotLabels ? "text-amber-300" : "text-slate-400"}`} />
                    <span>{showHotspotLabels ? (isEn ? "Pins: On" : "Pin: Tampil") : (isEn ? "Pins: Off" : "Pin: Sembunyi")}</span>
                  </button>

                  {/* Tombol Toggle Mode X-Ray Tanah */}
                  <button
                    onClick={() => setXrayMode(!xrayMode)}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                      xrayMode
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-cyan-900/25 ring-2 ring-cyan-300/40"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/70"
                    }`}
                    title={isEn ? "View transparent cross-section of underground layers" : "Lihat tembus pandang ke lapisan struktur bawah tanah"}
                  >
                    {xrayMode ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-cyan-200" />
                        <span>X-Ray: ON</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                        <span>X-Ray</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* RENDER KANVAS 3D DENGAN SUSPENSE */}
              {scenario === "banjir" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="banjir" isEn={isEn}>
                    <FloodDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={{ ...actions, mangrove: actions.mangrove ?? actions.tanamPohon }}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                      isEn={isEn}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : scenario === "longsor" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="longsor" isEn={isEn}>
                    <LandslideDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                      isEn={isEn}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : scenario === "kekeringan" ? (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="kekeringan" isEn={isEn}>
                    <DroughtDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                      isEn={isEn}
                    />
                  </DioramaCanvas>
                </Suspense>
              ) : (
                <Suspense fallback={<div className="h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] bg-slate-100 rounded-2xl animate-pulse" />}>
                  <DioramaCanvas weatherIntensity={weatherIntensity} scenario="karhutla" isEn={isEn}>
                    <WildfireDiorama3D
                      weatherIntensity={weatherIntensity}
                      xrayMode={xrayMode}
                      actions={actions}
                      showLabels={showHotspotLabels}
                      onSelectHotspot={handleSelectHotspot}
                      isEn={isEn}
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
                      <span>{isEn ? "Science Learning Hotspot:" : "Hotspot Edukasi Sains:"}</span>
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
                    title={isEn ? "Close hotspot info" : "Tutup info hotspot"}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 py-2 px-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-500 text-[11px] font-medium flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Info className={`w-3.5 h-3.5 flex-shrink-0 ${currentTheme.hintIconColor}`} />
                    <span>
                      {isEn ? (
                        <>Click any <strong>glowing pin</strong> on the 3D diorama to explore its science explanation.</>
                      ) : (
                        <>Klik salah satu <strong>pin bersinar</strong> pada diorama 3D untuk membedah penjelasan sainsnya.</>
                      )}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                    {isEn ? "360° Rotation • Scroll to Zoom" : "Rotasi 360° • Zoom Scroll"}
                  </span>
                </div>
              )}
            </div>

            {/* =========================================================================
                TIGA (3) UKURAN DATA LANGSUNG
               ========================================================================= */}
            <div className="grid grid-cols-3 gap-3">
              {/* Metric 1: Daya Serap Air */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <Droplets className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {isEn ? "Water Infiltration" : "Daya Serap Air"}
                    </span>
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
                  <span>{isEn ? "Rainwater absorbed" : "Air masuk ke tanah"}</span>
                  <span
                    className={`font-bold ${
                      waterAbsorption > 65
                        ? "text-emerald-600"
                        : waterAbsorption > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {waterAbsorption > 65 ? (isEn ? "Optimal" : "Optimal") : waterAbsorption > 35 ? (isEn ? "Moderate" : "Sedang") : (isEn ? "Critically Low" : "Kritis Rendah")}
                  </span>
                </div>
              </div>

              {/* Metric 2: Kekuatan Tanah & Struktur Lereng */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {isEn ? "Soil Stability" : "Kekuatan Tanah"}
                    </span>
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
                  <span>{isEn ? "Root binding hold" : "Cengkeraman akar"}</span>
                  <span
                    className={`font-bold ${
                      soilStrength > 65
                        ? "text-emerald-600"
                        : soilStrength > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {soilStrength > 65 ? (isEn ? "Very Solid" : "Sangat Kokoh") : soilStrength > 35 ? (isEn ? "Fairly Stable" : "Cukup Stabil") : (isEn ? "Unstable" : "Labil")}
                  </span>
                </div>
              </div>

              {/* Metric 3: Kesehatan Ekosistem */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        ecosystemHealth > 65
                          ? "bg-emerald-100 text-emerald-800"
                          : ecosystemHealth > 35
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <HeartPulse className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {isEn ? "Ecosystem Health" : "Kesehatan Alam"}
                    </span>
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
                  <span>{isEn ? "Natural resilience" : "Ketahanan alam"}</span>
                  <span
                    className={`font-bold ${
                      ecosystemHealth > 65
                        ? "text-emerald-600"
                        : ecosystemHealth > 35
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {ecosystemHealth > 65 ? (isEn ? "Thriving & Safe" : "Lestari & Aman") : ecosystemHealth > 35 ? (isEn ? "Watch / Warning" : "Waspada") : (isEn ? "Critical Hazard" : "Kritis Bahaya")}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              KOLOM KANAN: PENDAMPING RIMBA & PANEL KONTROL EKSPERIMEN (5/12 COLS - UNIFIED PAGE SCROLL)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-3.5 self-start">
            
            {/* Visual Column Header */}
            <div className="flex items-center justify-between px-1 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-100 text-emerald-800">
                  <Sliders className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {isEn ? "Control & Engineering Panel" : "Panel Kontrol & Rekayasa"}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                {isEn ? "10 Interactive Parameters" : "10 Parameter Interaktif"}
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
                        ? (isEn ? "Alert" : "Peringatan")
                        : mascotMood === "celebrate"
                        ? (isEn ? "Achievement" : "Prestasi")
                        : mascotMood === "scan"
                        ? (isEn ? "X-Ray Mode" : "Mode X-Ray")
                        : (isEn ? "Education" : "Edukasi")}
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
                    <span className="text-[10px] text-slate-400">
                      {isEn ? "Live weather metric" : "Ukuran cuaca langsung"}
                    </span>
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
                  aria-label={isEn ? "Weather intensity slider" : "Pengatur intensitas cuaca"}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
                  <span>{isEn ? "Low (0)" : "Rendah (0)"}</span>
                  <span>Normal (50)</span>
                  <span className="text-rose-600">{isEn ? "Extreme (100)" : "Ekstrem (100)"}</span>
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
                  <span>{isEn ? "Mild (25)" : "Ringan (25)"}</span>
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
                  <span>{isEn ? "Extreme (85)" : "Ekstrem (85)"}</span>
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
                      {isEn ? "Human Actions & Engineering" : "Aksi Manusia & Rekayasa"}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isEn ? "10 choices (5 Green Solutions + 5 Risks)" : "10 pilihan (5 Cara Baik + 5 Risiko)"}
                    </p>
                  </div>

                  {/* Tombol Reset Toggle Cepat */}
                  <button
                    onClick={handleResetActions}
                    className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90 transition-all inline-flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                    title={isEn ? "Reset toggles to initial scenario state" : "Atur ulang toggle ke kondisi awal skenario"}
                  >
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span>{isEn ? "Reset Toggles" : "Reset Toggle"}</span>
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
                    {isEn ? "All" : "Semua"} ({currentScenarioActions.length})
                  </button>
                  <button
                    onClick={() => setActionFilter("positive")}
                    className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      actionFilter === "positive"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-emerald-700 hover:text-emerald-900"
                    }`}
                  >
                    {isEn ? "Solutions" : "Solusi"} ({positiveCount})
                  </button>
                  <button
                    onClick={() => setActionFilter("negative")}
                    className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      actionFilter === "negative"
                        ? "bg-rose-600 text-white shadow-xs font-black"
                        : "text-rose-700 hover:text-rose-900"
                    }`}
                  >
                    {isEn ? "Risks" : "Risiko"} ({negativeCount})
                  </button>
                </div>
              </div>

              {/* List Container 10 Aksi (Maksimal 360px dengan Scrollbar Tipis) */}
              <div className="max-h-[360px] overflow-y-auto pr-2 space-y-2.5 scrollbar-thin">
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
                          {act.isPositive ? (isEn ? "GREEN SOLUTION" : "SOLUSI HIJAU") : (isEn ? "RISK ACTION" : "AKSI RISIKO")}
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
