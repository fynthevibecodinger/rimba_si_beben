import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Leaf, ChevronRight, Check } from "lucide-react";

export default function AdaptPanel({
  risk,
  adaptations,
  setAdaptations,
  setMood,
  restored,
}) {
  const toggleAdaptation = (index) => {
    const next = adaptations.includes(index)
      ? adaptations.filter((item) => item !== index)
      : [...adaptations, index];
    setAdaptations(next);
    setMood(next.length === risk.actions.length ? "celebrate" : "wave");
  };

  return (
    <motion.div
      key="adapt"
      className="adapt-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      <div className="panel-title">
        <div>
          <span>TAHAP 2 · INTERACTIVE SANDBOX</span>
          <h3>{risk.actionTitle}</h3>
          <p>{risk.actionCopy}</p>
        </div>
        <div className="impact-score">
          <small>INDEKS KETAHANAN</small>
          <strong>{28 + adaptations.length * 24}%</strong>
        </div>
      </div>
      <div className={`restoration-scene ${restored ? "restored" : ""}`}>
        <div className="scene-sun" />
        <div className="scene-cloud" />
        <div className="scene-ground" />
        <div className="dry-cracks">╱╲ ╱╲</div>
        <div className="scene-water" />
        <AnimatePresence>
          {adaptations.map((item) => (
            <motion.div
              className={`added-solution added-${item}`}
              key={item}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
            >
              {risk.actions[item].icon}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="scene-status">
          <i />
          <span>{restored ? "EKOSISTEM PULIH" : "AREA KRITIS"}</span>
        </div>
        {restored && (
          <motion.div
            className="impact-badge"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
          >
            <Leaf /> Risiko turun 72%
          </motion.div>
        )}
      </div>
      <div className="adapt-controls">
        {risk.actions.map((action, index) => {
          const active = adaptations.includes(index);
          return (
            <motion.button
              key={action.label}
              className={active ? "active" : ""}
              onClick={() => toggleAdaptation(index)}
              whileTap={{ scale: 0.95 }}
            >
              <span>{action.icon}</span>
              <div>
                <small>AKSI {index + 1}</small>
                <strong>{action.label}</strong>
              </div>
              <i>{active ? <Check /> : "+"}</i>
            </motion.button>
          );
        })}
      </div>
      <button
        className="lab-next"
        disabled={!restored}
        onClick={() => setMood("celebrate")}
      >
        Siapkan Komunitas <ChevronRight />
      </button>
    </motion.div>
  );
}
