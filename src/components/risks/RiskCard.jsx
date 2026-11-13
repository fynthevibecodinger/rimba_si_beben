import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function RiskCard({ risk, index, onPick }) {
  return (
    <motion.button
      className="risk-card"
      style={{ "--risk": risk.color, "--risk-pale": risk.pale }}
      onClick={onPick}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ y: -9 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="risk-index">0{index + 1}</span>
      <div className="risk-art">
        <risk.Icon />
        <span>{risk.sceneIcon}</span>
        <i />
      </div>
      <div className="risk-copy">
        <h3>{risk.title}</h3>
        <p>{risk.subtitle}</p>
        <small>{risk.stat}</small>
      </div>
      <span className="risk-arrow">
        <ArrowRight />
      </span>
    </motion.button>
  );
}
