import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Loader2 } from "lucide-react";
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
  // Langit dan pencahayaan dinamis mengikuti skenario bencana & intensitas cuaca
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

  return (
    <div className={`relative w-full h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b ${containerBg} border border-slate-200/90 shadow-inner select-none transition-colors duration-500`}>
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

          {/* Kamera Interaktif */}
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
            dampingFactor={0.08}
          />
        </Canvas>
      </Suspense>

      {/* Overlay Petunjuk Navigasi Interaksi */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold shadow-sm border border-white/10">
        <span>🖱️ Putar dengan geser mouse/layar</span>
        <span className="opacity-50">•</span>
        <span>🔍 Zoom scroll</span>
      </div>
    </div>
  );
}
