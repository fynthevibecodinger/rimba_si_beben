import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Activity, Satellite, Sprout, ShieldCheck } from "lucide-react";
import RimbaMascot from "../components/mascot/RimbaMascot";
import DetectionPanel from "../components/lab/DetectionPanel";
import AdaptPanel from "../components/lab/AdaptPanel";
import ReadyPanel from "../components/lab/ReadyPanel";

export default function Lab({
  risk,
  stage,
  setStage,
  activeSensor,
  setActiveSensor,
  adaptations,
  setAdaptations,
  mood,
  setMood,
  dialogue,
  sensorValue,
}) {
  const restored = adaptations.length === risk.actions.length;

  return (
    <section
      className="lab-section"
      id="lab"
      style={{ "--risk": risk.color, "--risk-pale": risk.pale }}
    >
      <div className="page-shell">
        <div className="lab-heading" data-reveal>
          <div>
            <span className="section-tag">
              <Activity /> LABORATORIUM MITIGASI
            </span>
            <h2>
              Eksperimen: <em>{risk.title}</em>
            </h2>
            <p>Gabungkan data, alam, dan aksi warga untuk menurunkan risiko.</p>
          </div>
          <div className="selected-risk">
            <risk.Icon />
            <span>
              <small>RISIKO AKTIF</small>
              <strong>{risk.title}</strong>
            </span>
          </div>
        </div>

        <div className="lab-tabs">
          {[
            ["detect", "01", "Deteksi Dini", "Baca data sensor", Satellite],
            ["adapt", "02", "Aksi Adaptasi", "Pulihkan lanskap", Sprout],
            ["ready", "03", "Kesiapsiagaan", "Bergerak bersama", ShieldCheck],
          ].map(([key, number, title, sub, Icon]) => (
            <button
              key={key}
              className={stage === key ? "active" : ""}
              onClick={() => setStage(key)}
            >
              <span>{number}</span>
              <Icon />
              <div>
                <strong>{title}</strong>
                <small>{sub}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="lab-workspace">
          <aside className="rimba-guide">
            <div className="guide-dialogue">{dialogue}</div>
            <RimbaMascot mood={mood} />
            <div className="rimba-name">
              <i />
              <span>
                <strong>RIMBA</strong>
                <small>ECO-RANGER ONLINE</small>
              </span>
            </div>
          </aside>

          <div className="lab-panel">
            <AnimatePresence mode="wait">
              {stage === "detect" && (
                <DetectionPanel
                  risk={risk}
                  activeSensor={activeSensor}
                  setActiveSensor={setActiveSensor}
                  setMood={setMood}
                  sensorValue={sensorValue}
                />
              )}

              {stage === "adapt" && (
                <AdaptPanel
                  risk={risk}
                  adaptations={adaptations}
                  setAdaptations={setAdaptations}
                  setMood={setMood}
                  restored={restored}
                />
              )}

              {stage === "ready" && (
                <ReadyPanel risk={risk} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
