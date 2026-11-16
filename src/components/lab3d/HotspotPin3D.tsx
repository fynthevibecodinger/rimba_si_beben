import { Html } from "@react-three/drei";
import { Sparkles, Info } from "lucide-react";

interface HotspotPin3DProps {
  position: [number, number, number];
  title: string;
  description: string;
  badge?: string;
  color?: string;
  showLabel?: boolean;
  onSelect: (title: string, description: string) => void;
}

export default function HotspotPin3D({
  position,
  title,
  description,
  badge,
  color = "bg-emerald-600",
  showLabel = true,
  onSelect,
}: HotspotPin3DProps) {
  return (
    <group position={position}>
      <Html center distanceFactor={8} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(title, description);
          }}
          className="group cursor-pointer select-none pointer-events-auto flex flex-col items-center transform -translate-y-2 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          {/* Tag Card floating above pin */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-xs font-black shadow-md border border-white/20 backdrop-blur-md whitespace-nowrap mb-0.5 transition-all duration-200 ${
              showLabel
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${color} animate-ping`} />
            <span>{badge || title}</span>
            <Info className="w-3 h-3 text-emerald-400 opacity-80 group-hover:opacity-100" />
          </div>

          {/* Pin needle / stalk */}
          <div className="relative flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full ${color} text-white flex items-center justify-center shadow-md ring-2 ring-white animate-bounce`}>
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="w-0.5 h-2.5 bg-slate-800 -mt-0.5" />
          </div>
        </div>
      </Html>
    </group>
  );
}
