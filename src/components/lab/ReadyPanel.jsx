import { motion } from "motion/react";
import { Radio, Bot, Zap, Trees, ChevronRight, Check } from "lucide-react";

export default function ReadyPanel({ risk }) {
  return (
    <motion.div
      key="ready"
      className="ready-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      <div className="panel-title">
        <div>
          <span>TAHAP 3 · AKSI KOMUNITAS</span>
          <h3>Saat peringatan dini berbunyi</h3>
          <p>
            Teknologi memberi waktu. Kesiapan kita mengubah waktu menjadi keselamatan.
          </p>
        </div>
      </div>
      <div className="alert-flow">
        <div>
          <Radio />
          <span>SENSOR</span>
        </div>
        <i />
        <div>
          <Bot />
          <span>PUSAT DATA</span>
        </div>
        <i />
        <div>
          <Zap />
          <span>PERINGATAN</span>
        </div>
        <i />
        <div>
          <Trees />
          <span>WARGA</span>
        </div>
      </div>
      <div className="readiness-grid">
        {risk.readiness.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.12 }}
          >
            <span>0{index + 1}</span>
            <Check />
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </motion.div>
        ))}
      </div>
      <a className="lab-next" href="#mission">
        Uji Strategimu <ChevronRight />
      </a>
    </motion.div>
  );
}
