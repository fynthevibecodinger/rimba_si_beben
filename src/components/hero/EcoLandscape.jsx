import { motion } from "motion/react";
import { Satellite } from "lucide-react";

export default function EcoLandscape() {
  return (
    <div className="eco-landscape" aria-hidden="true">
      <motion.div
        className="orbit-satellite"
        animate={{ x: [0, 20, 0], y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Satellite />
        <i />
      </motion.div>
      <motion.div
        className="eco-cloud cloud-a"
        animate={{ x: [0, 35, 0] }}
        transition={{ duration: 11, repeat: Infinity }}
      />
      <motion.div
        className="eco-cloud cloud-b"
        animate={{ x: [0, -45, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <div className="eco-sun" />
      <div className="mountain-layer mountain-far" />
      <div className="mountain-layer mountain-near" />
      <div className="forest-layer">
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} style={{ left: `${i * 11}%`, scale: `${0.7 + (i % 3) * 0.18}` }} />
        ))}
      </div>
      <div className="eco-river" />
      <div className="eco-house">
        <span />
        <i />
      </div>
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
      <div className="sensor-tower">
        <span />
        <i />
      </div>
      <div className="landscape-fade" />
    </div>
  );
}
