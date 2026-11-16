import { Suspense, ReactNode, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Loader2, Plus, Minus, RotateCcw, ZoomIn } from "lucide-react";
import { ScenarioId } from "./types";

interface DioramaCanvasProps {
  children: ReactNode;
  weatherIntensity?: number;
  scenario?: ScenarioId;
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-xs z-20 pointer-events-none">
      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      <span className="text-xs font-bold text-slate-700 mt-2">Memuat Diorama 3D...</span>
    </div>
  );
}

export default function DioramaCanvas({
  children,
  weatherIntensity = 50,
  scenario = "banjir",
}: DioramaCanvasProps) {
  const controlsRef = useRef<any>(null);
  const [enableWheelZoom, setEnableWheelZoom] = useState(false);

  // Dynamic sky & lighting depending on scenario & weather
  const isExtreme = weatherIntensity > 65;

  let skyColor = "#e6f5ef";
  let lightColor = "#fff8e7";
  let containerBg = "from-[#eaf6f0] to-[#f4f7f5]";

  if (scenario === "banjir") {
    skyColor = isExtreme ? "#94a3b8" : "#e0f2fe";
    lightColor = isExtreme ? "#cbd5e1" : "#f0f9ff";
    containerBg = "from-[#e0f2fe]/60 to-[#f0f9ff]";
  } else if (scenario === "longsor") {
    skyColor = isExtreme ? "#64748b" : "#e8ede6";
    lightColor = isExtreme ? "#cbd5e1" : "#faf5ef";
    containerBg = "from-[#f1f5f1] to-[#faf5ee]";
  } else if (scenario === "kekeringan") {
    skyColor = isExtreme ? "#fed7aa" : "#fef3c7";
    lightColor = isExtreme ? "#fef08a" : "#fffbeb";
    containerBg = "from-[#fef3c7]/60 to-[#fffbeb]";
  } else if (scenario === "karhutla") {
    skyColor = isExtreme ? "#78716c" : "#fed7aa";
    lightColor = isExtreme ? "#fca5a5" : "#fef2f2";
    containerBg = "from-[#fee2e2]/60 to-[#fff1f2]";
  }

  const lightIntensity = isExtreme ? 1.4 : 2.0;

  // Zoom handlers using controls object to avoid wheel trapping
  const handleZoomIn = () => {
    if (controlsRef.current) {
      const cam = controlsRef.current.object;
      cam.position.multiplyScalar(0.85);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const cam = controlsRef.current.object;
      cam.position.multiplyScalar(1.18);
      controlsRef.current.update();
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative w-full h-[380px] sm:h-[400px] lg:h-[420px] xl:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-b ${containerBg} border border-slate-200/90 shadow-inner select-none transition-colors duration-500`}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows
          camera={{ position: [7.5, 6.5, 7.5], fov: 45 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: false }}
        >
          {/* Warna Langit 3D */}
          <color attach="background" args={[skyColor]} />
          <fog attach="fog" args={[skyColor, 12, 30]} />

          {/* Pencahayaan Lembut & Hangat Stylized */}
          <ambientLight intensity={0.8} />
          <directionalLight
            castShadow
            position={[8, 12, 6]}
            intensity={lightIntensity}
            color={lightColor}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={25}
            shadow-camera-top={6}
            shadow-camera-right={6}
            shadow-camera-bottom={-6}
            shadow-camera-left={-6}
            shadow-bias={-0.0005}
          />
          <hemisphereLight args={["#dff3e9", "#785c49", 0.5]} />

          {/* Konten Diorama 3D */}
          {children}

          {/* Bayangan Kontak Realistis di Bawah Diorama */}
          <ContactShadows
            position={[0, -1.82, 0]}
            opacity={0.45}
            scale={12}
            blur={2.4}
            far={4}
          />

          {/* Kamera Interaktif: enableZoom default false agar wheel tidak menjebak scrolling halaman */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={enableWheelZoom}
            minDistance={4.5}
            maxDistance={16}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
            dampingFactor={0.08}
          />
        </Canvas>
      </Suspense>

      {/* Overlay Petunjuk Navigasi Kiri Bawah */}
      <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-bold shadow-sm border border-white/10">
        <span>🖱️ Geser untuk putar 3D</span>
      </div>

      {/* Floating Toolbar Zoom & Reset Kamera Kanan Bawah */}
      <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/15 shadow-lg text-white">
        <button
          onClick={handleZoomIn}
          className="p-1 rounded-lg hover:bg-white/20 active:scale-90 transition-all text-white cursor-pointer"
          title="Zoom Mendekat (+)"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1 rounded-lg hover:bg-white/20 active:scale-90 transition-all text-white cursor-pointer"
          title="Zoom Menjauh (-)"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetCamera}
          className="p-1 rounded-lg hover:bg-white/20 active:scale-90 transition-all text-white cursor-pointer"
          title="Reset Sudut Pandang Kamera"
          aria-label="Reset kamera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />
        <button
          onClick={() => setEnableWheelZoom(!enableWheelZoom)}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
            enableWheelZoom
              ? "bg-amber-400 text-slate-950 font-black shadow-xs"
              : "bg-white/10 hover:bg-white/20 text-white/80"
          }`}
          title={
            enableWheelZoom
              ? "Wheel Zoom Aktif: Scroll mouse akan zoom 3D. Klik untuk membebaskan scroll halaman."
              : "Wheel Zoom Mati: Scroll mouse bebas menggulir halaman. Gunakan tombol +/- untuk zoom."
          }
        >
          <ZoomIn className="w-3 h-3" />
          <span className="hidden sm:inline">{enableWheelZoom ? "Wheel Zoom: ON" : "Wheel Zoom: OFF"}</span>
          <span className="sm:hidden">{enableWheelZoom ? "Zoom ON" : "Zoom OFF"}</span>
        </button>
      </div>
    </div>
  );
}
