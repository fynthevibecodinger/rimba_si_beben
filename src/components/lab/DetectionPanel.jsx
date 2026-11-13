import { motion } from "motion/react";
import { Satellite, Gauge, Radio, Check, Bot, ChevronRight } from "lucide-react";

export default function DetectionPanel({
  risk,
  activeSensor,
  setActiveSensor,
  setMood,
  sensorValue,
}) {
  return (
    <motion.div
      key="detect"
      className="detection-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      <div className="panel-title">
        <div>
          <span>TAHAP 1 · GREEN TECH</span>
          <h3>Jaringan Deteksi Dini</h3>
          <p>Klik titik sensor untuk melihat data lapangan secara real-time.</p>
        </div>
        <div className="online-indicator">
          <i /> SISTEM ONLINE
        </div>
      </div>
      <div className="sensor-dashboard">
        <div className="sensor-map">
          <div className="map-sky">
            <motion.div
              animate={{ x: [0, 260, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            >
              <Satellite />
            </motion.div>
          </div>
          <div className="map-hills hill-back" />
          <div className="map-hills hill-front" />
          <div className="map-water" />
          <div className="map-trees">♠ ♠ ♠</div>
          {[0, 1, 2].map((sensor) => (
            <button
              key={sensor}
              className={`sensor-node sensor-${sensor} ${activeSensor === sensor ? "active" : ""}`}
              onClick={() => {
                setActiveSensor(sensor);
                setMood("scan");
              }}
              aria-label={`Buka data sensor ${sensor + 1}`}
            >
              <i />
              <Radio />
              <span>S{sensor + 1}</span>
            </button>
          ))}
          <div className="satellite-beam" />
          <div className="map-label">
            AREA PEMANTAUAN · {risk.title.toUpperCase()}
          </div>
        </div>
        <div className="data-stack">
          <div className="live-data">
            <span>
              <Gauge /> {risk.sensor}
            </span>
            <div>
              <motion.strong
                key={sensorValue}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {sensorValue}
              </motion.strong>
              <b>{risk.unit}</b>
            </div>
            <div className="data-bar">
              <motion.i
                animate={{
                  width: `${Math.min(92, (sensorValue / risk.threshold) * 82)}%`,
                }}
              />
            </div>
            <small>
              Ambang waspada: {risk.threshold}
              {risk.unit}
            </small>
          </div>
          <div className="tech-process">
            <div>
              <Satellite />
              <span>
                <strong>Satelit</strong>
                <small>Memindai area</small>
              </span>
              <Check />
            </div>
            <i />
            <div>
              <Radio />
              <span>
                <strong>Sensor IoT</strong>
                <small>Mengirim data</small>
              </span>
              <Check />
            </div>
            <i />
            <div>
              <Bot />
              <span>
                <strong>Prediksi AI</strong>
                <small>Risiko dianalisis</small>
              </span>
              <span className="processing">•••</span>
            </div>
          </div>
        </div>
      </div>
      <button className="lab-next" onClick={() => setMood("wave")}>
        Mulai Aksi Adaptasi <ChevronRight />
      </button>
    </motion.div>
  );
}
