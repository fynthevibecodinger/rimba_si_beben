import { useState, useMemo } from "react";
import SimulationCanvas, { SimulationScenario } from "../components/simulation/SimulationCanvas";
import RimbaMascot, { RimbaMood } from "../components/mascot/RimbaMascot";
import {
  Sparkles,
  Waves,
  Mountain,
  SunMedium,
  Flame,
  RotateCcw,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ActionConfig {
  id: string;
  label: string;
  description: string;
  isPositive: boolean;
  impactNote: string;
}

const SCENARIO_ACTIONS: Record<SimulationScenario, ActionConfig[]> = {
  banjir: [
    {
      id: "betonPenuh",
      label: "Menutup Semua Halaman dengan Beton",
      description: "Air hujan tidak punya tanah untuk meresap.",
      isPositive: false,
       impactNote: "Air lebih sulit masuk ke tanah, sehingga banyak air mengalir di permukaan.",
    },
    {
      id: "sampahSungai",
      label: "Membuang Sampah ke Sungai",
      description: "Sampah menyumbat saluran dan membuat sungai lebih dangkal.",
      isPositive: false,
      impactNote: "Ruang sungai untuk menampung air berkurang banyak, air cepat meluap ke jalan.",
    },
    {
      id: "biopori",
      label: "Membuat Banyak Lubang Resapan",
      description: "Lubang berisi kompos membantu air masuk ke tanah.",
      isPositive: true,
      impactNote: "Meningkatkan daya serap air tanah hingga 40%.",
    },
    {
      id: "tanamPohon",
       label: "Menanam Pohon di Tepi Sungai",
       description: "Menanam pohon di tepi sungai untuk memperkuat tanah dan menjaga air tetap mengalir.",
      isPositive: true,
      impactNote: "Menahan kecepatan air bah dan mencegah erosi tanggul tanah.",
    },
  ],

  longsor: [
    {
      id: "tebangLiar",
      label: "Menebang Pohon di Lereng Curam",
      description: "Menghilangkan pohon yang membantu menahan tanah.",
      isPositive: false,
      impactNote: "Hilangnya ikatan akar membuat massa tanah labil saat hujan.",
    },
    {
      id: "potongTebing",
      label: "Memotong Kaki Lereng Terlalu Tegak",
      description: "Membuat tebing tegak tanpa penahan.",
      isPositive: false,
      impactNote: "Gaya penahan lereng hilang, memicu bidang gelincir mendadak.",
    },
    {
      id: "rumputVetiver",
      label: "Menanam Rumput Berakar Kuat",
      description: "Akar yang panjang membantu menahan tanah di lereng.",
      isPositive: true,
      impactNote: "Berfungsi sebagai paku bumi biologis berdaya cengkeram tinggi.",
    },
    {
      id: "terasering",
      label: "Membuat Teras dan Saluran Air",
      description: "Lereng dibuat bertingkat agar air mengalir lebih pelan.",
      isPositive: true,
      impactNote: "Mengurangi kecepatan air limpasan dan membuang terlalu banyak air di lereng.",
    },
  ],

  kekeringan: [
    {
      id: "sedotAirDalam",
      label: "Mengambil Air Tanah Berlebihan",
      description: "Air tanah terus diambil tanpa diberi waktu untuk terisi kembali.",
      isPositive: false,
      impactNote: "Muka air tanah turun drastis, sumur dangkal warga mengering.",
    },
    {
      id: "bakarJerami",
      label: "Pembakaran Sisa Panen / Lahan Terbuka",
      description: "Membakar mulsa jerami sehingga mikroba tanah mati dan tanah menjadi tandus.",
      isPositive: false,
      impactNote: "Tanah kehilangan bahan organik dan kemampuan menahan kelembapan.",
    },
    {
      id: "tandonAir",
      label: "Membuat Kolam dan Menampung Air Hujan",
      description: "Air hujan disimpan untuk dipakai saat musim kemarau.",
      isPositive: true,
      impactNote: "Menyediakan cadangan ratusan ribu liter air untuk masa paceklik.",
    },
    {
      id: "irigasiTetes",
       label: "Penyiraman Tetes Hemat Air",
       description: "Menyalurkan air pelan-pelan langsung ke akar tanaman agar tidak boros.",
      isPositive: true,
      impactNote: "Efisiensi penggunaan air mencapai 90%, hemat cadangan air tawar.",
    },
  ],

  karhutla: [
    {
      id: "kanalKering",
      label: "Membuat Parit yang Mengeringkan Gambut",
      description: "Air keluar dari lahan gambut sehingga tanah menjadi kering.",
      isPositive: false,
      impactNote: "Lapisan gambut tebal mengering bagaikan spons batu bara muda.",
    },
    {
      id: "bakarLahan",
      label: "Membuka Lahan dengan Membakar",
      description: "Api untuk membersihkan lahan bisa menyebar tanpa terkendali.",
      isPositive: false,
       impactNote: "Bara api bisa merambat diam-diam di bawah tanah.",
    },
    {
      id: "sekatGambut",
       label: "Menjaga Lahan Gambut Tetap Basah",
       description: "Air ditahan agar gambut tidak mudah terbakar.",
      isPositive: true,
      impactNote: "Mencegah gambut kering sehingga api tidak dapat menyala di bawah tanah.",
    },
    {
      id: "patroliDrone",
       label: "Mencari Titik Api dari Udara",
       description: "Titik api dicari lebih awal dengan sensor dan drone.",
      isPositive: true,
      impactNote: "Memadamkan percikan api sebelum membesar menjadi bencana asap lintas batas.",
    },
  ],
};

export default function EcosystemSimulation() {
  const [scenario, setScenario] = useState<SimulationScenario>("banjir");
  const [weatherIntensity, setWeatherIntensity] = useState<number>(50);
  const [actions, setActions] = useState<Record<string, boolean>>({
    betonPenuh: false,
    sampahSungai: false,
    biopori: true,
    tanamPohon: false,
  });

  const scenarioMeta: Record<
    SimulationScenario,
    { title: string; subtitle: string; icon: any; weatherLabel: string; weatherUnit: string }
  > = {
    banjir: {
      title: "Banjir: Sungai dan Kota",
      subtitle: "Lihat bagaimana beton dan sampah dapat membuat air lebih cepat menggenang.",
      icon: Waves,
      weatherLabel: "Curah Hujan Ekstrem",
      weatherUnit: "mm / hari",
    },
    longsor: {
      title: "Tanah Longsor: Lereng yang Kuat",
      subtitle: "Lihat perbedaan lereng yang ditanami pohon dan lereng yang gundul saat hujan.",
      icon: Mountain,
      weatherLabel: "Banyaknya Hujan",
      weatherUnit: "% kejenuhan",
    },
    kekeringan: {
      title: "Kekeringan: Desa & Lahan Pertanian",
      subtitle: "Lihat bagaimana menampung air dan menyiram dengan hemat membantu tanaman saat kemarau.",
      icon: SunMedium,
      weatherLabel: "Panas dan Kemarau",
      weatherUnit: "tingkat panas",
    },
    karhutla: {
      title: "Kebakaran Hutan: Lahan Gambut",
      subtitle: "Lihat bagaimana menjaga lahan gambut tetap basah dapat mencegah kebakaran.",
      icon: Flame,
      weatherLabel: "Kemarau dan Angin Kering",
      weatherUnit: "% kekeringan",
    },
  };

  const handleScenarioChange = (newScen: SimulationScenario) => {
    setScenario(newScen);
    setWeatherIntensity(50);
    // Set sensible defaults
    if (newScen === "banjir") {
      setActions({ betonPenuh: false, sampahSungai: false, biopori: true, tanamPohon: false });
    } else if (newScen === "longsor") {
      setActions({ tebangLiar: false, potongTebing: false, rumputVetiver: true, terasering: false });
    } else if (newScen === "kekeringan") {
      setActions({ sedotAirDalam: false, bakarJerami: false, tandonAir: true, irigasiTetes: false });
    } else if (newScen === "karhutla") {
      setActions({ kanalKering: false, bakarLahan: false, sekatGambut: true, patroliDrone: false });
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
      if (actions.sampahSungai) absorption -= 20;
      if (actions.biopori) absorption += 25;
      if (actions.tanamPohon) absorption += 20;
      strength = 60 + (actions.tanamPohon ? 25 : 0) - (actions.betonPenuh ? 15 : 0);
    } else if (scenario === "longsor") {
      if (actions.tebangLiar) strength -= 35;
      if (actions.potongTebing) strength -= 25;
      if (actions.rumputVetiver) strength += 30;
      if (actions.terasering) strength += 20;
      absorption = 55 + (actions.rumputVetiver ? 20 : 0) - (actions.tebangLiar ? 25 : 0);
    } else if (scenario === "kekeringan") {
      if (actions.sedotAirDalam) absorption -= 30;
      if (actions.bakarJerami) absorption -= 20;
      if (actions.tandonAir) absorption += 30;
      if (actions.irigasiTetes) absorption += 25;
      strength = 45 + (actions.tandonAir ? 25 : 0) - (actions.bakarJerami ? 20 : 0);
    } else if (scenario === "karhutla") {
      if (actions.kanalKering) absorption -= 35;
      if (actions.bakarLahan) strength -= 35;
      if (actions.sekatGambut) {
        absorption += 35;
        strength += 20;
      }
      if (actions.patroliDrone) strength += 15;
    }

    // Weather impact
    const weatherPenalty = (weatherIntensity - 50) * 0.4;
    absorption = Math.max(10, Math.min(100, Math.round(absorption - weatherPenalty * 0.5)));
    strength = Math.max(10, Math.min(100, Math.round(strength - weatherPenalty * 0.5)));

    const health = Math.max(
      5,
      Math.min(100, Math.round(absorption * 0.45 + strength * 0.45 - weatherPenalty * 0.3))
    );

    return { waterAbsorption: absorption, soilStrength: strength, ecosystemHealth: health };
  }, [scenario, weatherIntensity, actions]);

  // Dynamic Mascot Feedback Dialogue
  const { mascotMood, mascotSpeech }: { mascotMood: RimbaMood; mascotSpeech: string } = useMemo(() => {
    if (ecosystemHealth < 30) {
      if (scenario === "banjir") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Gawat! Genangan air meluap tinggi karena beton menutup resapan dan saluran mampet! Ayo aktifkan biopori dan tanam pohon!",
        };
      }
      if (scenario === "longsor") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Peringatan bahaya! Lereng curam tanpa akar pohon mengalami kejenuhan air dan berisiko longsor mendadak!",
        };
      }
      if (scenario === "kekeringan") {
        return {
          mascotMood: "alert",
          mascotSpeech:
            "Tanah pecah-pecah dan tanaman puso! Air tanah terkuras habis tanpa adanya tandon tampungan hujan.",
        };
      }
      return {
        mascotMood: "alert",
        mascotSpeech:
          "Bahaya asap pekat! Kanal mengeringkan kubah gambut hingga bara api menyebar di bawah tanah!",
      };
    }

    if (ecosystemHealth > 75) {
      return {
        mascotMood: "celebrate",
        mascotSpeech:
          "Luar biasa! Kombinasi solusi alam dan teknologi membuat ekosistem kita sangat tangguh dan aman dari bencana!",
      };
    }

    return {
      mascotMood: "scan",
      mascotSpeech:
        "Ekosistem dalam kondisi stabil sedang. Coba geser intensitas cuaca atau aktifkan aksi hijau untuk melihat respon lingkungan!",
    };
  }, [ecosystemHealth, scenario]);

  const currentMeta = scenarioMeta[scenario];

  return (
    <div className="w-full pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#1b4332] to-[#173a2d] text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                 Ruang Bermain dan Belajar
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka']">
                 Coba dan Lihat Dampaknya!
              </h1>
              <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                 Atur cuaca, pilih tindakan baik atau buruk, lalu lihat apa yang terjadi pada alam di gambar ini.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleScenarioChange(scenario)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                 Mulai Lagi
              </button>
            </div>
          </div>

          {/* 4 Scenario Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {(["banjir", "longsor", "kekeringan", "karhutla"] as SimulationScenario[]).map((scen) => {
              const Icon = scenarioMeta[scen].icon;
              const isActive = scenario === scen;
              return (
                <button
                  key={scen}
                  onClick={() => handleScenarioChange(scen)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isActive
                      ? "bg-white text-slate-900 border-white shadow-xl scale-[1.02] font-black"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl ${
                      isActive ? "bg-emerald-100 text-emerald-900" : "bg-white/10 text-emerald-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                 <span className="text-xs uppercase tracking-wider block opacity-75">Pilih masalah</span>
                    <strong className="text-sm capitalize">{scen}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Simulation Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas & Computed Gauges (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Reactive SVG Canvas */}
            <SimulationCanvas
              scenario={scenario}
              weatherIntensity={weatherIntensity}
              actions={actions}
              waterAbsorption={waterAbsorption}
              soilStrength={soilStrength}
              ecosystemHealth={ecosystemHealth}
            />

             {/* 3 Hasil yang Terlihat Sekarang */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Metric 1: Kemampuan Tanah Menyerap Air */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                  <span>Kemampuan Tanah Menyerap Air</span>
                  <span className="font-mono text-slate-800">{waterAbsorption}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-300"
                    style={{ width: `${waterAbsorption}%` }}
                  />
                </div>
                 <span className="text-[11px] text-slate-400 mt-1 block">Air yang bisa masuk ke tanah</span>
              </div>

              {/* Metric 2: Kekuatan Tanah/Akar */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                  <span>Kekuatan Tanah dan Akar</span>
                  <span className="font-mono text-slate-800">{soilStrength}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${soilStrength}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Kekuatan lereng dan akar</span>
              </div>

              {/* Metric 3: Kesehatan Ekosistem */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                  <span>Kesehatan Ekosistem</span>
                  <span className={`font-mono font-bold ${ecosystemHealth > 60 ? "text-emerald-700" : "text-rose-600"}`}>
                    {ecosystemHealth}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ecosystemHealth > 60
                        ? "bg-emerald-600"
                        : ecosystemHealth > 35
                        ? "bg-amber-500"
                        : "bg-rose-600"
                    }`}
                    style={{ width: `${ecosystemHealth}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Seberapa kuat alam menghadapi gangguan</span>
              </div>
            </div>
          </div>

          {/* Right Control Panel & Rimba Mascot (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Weather Slider Control */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Sliders className="w-4 h-4 text-emerald-700" />
                  <span>Seberapa Buruk Cuacanya</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                  {weatherIntensity} {currentMeta.weatherUnit}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>{currentMeta.weatherLabel}</span>
                  <span className="text-slate-700 font-mono">{weatherIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weatherIntensity}
                  onChange={(e) => setWeatherIntensity(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Tenang (0)</span>
                  <span>Normal (50)</span>
                  <span>Sangat Buruk (100)</span>
                </div>
              </div>
            </div>

            {/* Action Toggles Control */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm text-slate-800">
                  Aksi Manusia &amp; Intervensi
                </h4>
                <span className="text-[11px] text-slate-400">Klik untuk ubah</span>
              </div>

              <div className="space-y-3">
                {SCENARIO_ACTIONS[scenario].map((act) => {
                  const isActive = !!actions[act.id];
                  return (
                    <button
                      key={act.id}
                      onClick={() => toggleAction(act.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 ${
                        isActive
                          ? act.isPositive
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                            : "bg-rose-50 border-rose-400 text-rose-950"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {act.isPositive ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-black uppercase">
                              Pilihan Baik
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-rose-200/80 text-rose-900 text-[10px] font-black uppercase">
                              Pilihan yang Merusak
                            </span>
                          )}
                          <strong className="text-xs sm:text-sm font-bold block">{act.label}</strong>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{act.description}</p>
                        {isActive && (
                          <span className="text-[11px] font-semibold text-emerald-800 block mt-1">
                            ℹ️ {act.impactNote}
                          </span>
                        )}
                      </div>

                      <div className="mt-1">
                        {isActive ? (
                          act.isPositive ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reactive Rimba Mascot Feedback */}
            <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200">
              <RimbaMascot mood={mascotMood} speech={mascotSpeech} size="md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
