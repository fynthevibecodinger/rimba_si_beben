import { motion } from "motion/react";
import { Satellite, Radio } from "lucide-react";

export default function EcoLandscape() {
  return (
    <div
      className="eco-landscape pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Orbiting IoT Weather Satellite */}
      <motion.div
        className="orbit-satellite"
        animate={{ x: [0, 24, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Satellite />
        <i />
      </motion.div>

      {/* 2. Floating Clouds */}
      <motion.div
        className="eco-cloud cloud-a"
        animate={{ x: [0, 45, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
      </motion.div>
      <motion.div
        className="eco-cloud cloud-b"
        animate={{ x: [0, -55, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
      </motion.div>

      {/* 3. Golden Sun */}
      <div className="eco-sun" />

      {/* 4. Layered Mountains */}
      <div className="mountain-layer mountain-far opacity-90" />
      <div className="mountain-layer mountain-near opacity-95" />

      {/* 5. Rainforest Tree Canopy */}
      <div className="forest-layer opacity-95">
        {Array.from({ length: 12 }).map((_, i) => (
          <i
            key={i}
            style={{
              left: `${i * 8.8}%`,
              transform: `scale(${0.75 + (i % 3) * 0.18})`,
            }}
          />
        ))}
      </div>

      {/* 6. River Flow */}
      <div className="eco-river opacity-90" />

      {/* 7. Sustainable Eco House */}
      <div className="eco-house opacity-100">
        <span />
        <i />
      </div>

      {/* 8. Windmills with Spinning Propellers */}
      <div className="windmill windmill-one">
        <span>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="windmill windmill-two">
        <span>
          <i />
          <i />
          <i />
        </span>
      </div>

      {/* 9. Telemetry Early Warning Sensor Tower */}
      <div className="sensor-tower">
        <Radio />
      </div>

      {/* 10. Soft text readability fade on left side only */}
      <div className="absolute top-0 bottom-0 left-0 w-full sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#dff4ec]/90 via-[#e9f5e9]/70 to-transparent z-[2] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f5ee] to-transparent z-[3] pointer-events-none" />
    </div>
  );
}
