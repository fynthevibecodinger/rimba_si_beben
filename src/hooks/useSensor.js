import { useState, useEffect } from "react";
import risks from "../data/risks";

export function useSensor({ riskId, activeStage, adaptations, activeSensor }) {
  const [signal, setSignal] = useState(0);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const currentRisk = risks.find((item) => item.id === riskId);
    setRisk(currentRisk);
  }, [riskId]);

  useEffect(() => {
    const timer = window.setInterval(() => setSignal((value) => (value + 1) % 8), 1200);
    return () => window.clearInterval(timer);
  }, []);

  if (!risk) {
    return {
      risk: null,
      signal: 0,
      sensorValue: 0,
      dialogue: "Memuat data risiko...",
      restored: false,
    };
  }

  const restored = adaptations.length === risk.actions.length;
  const sensorValue = Math.round(
    risk.base + Math.sin(signal) * (risk.id === "banjir" ? 7 : 3) + activeSensor * 2,
  );

  const dialogue =
    activeStage === "detect"
      ? `Sensor ${activeSensor + 1} aktif! Data ${risk.sensor.toLowerCase()} dikirim ke pusat prediksi setiap 60 detik.`
      : activeStage === "adapt"
        ? restored
          ? "Luar biasa! Alam dan teknologi bekerja bersama. Indeks risiko turun 72%!"
          : `Tambahkan ${risk.actions.length - adaptations.length} solusi lagi agar ekosistem pulih.`
        : "Peringatan dini hanya efektif jika seluruh komunitas tahu harus berbuat apa.";

  return {
    risk,
    signal,
    sensorValue,
    dialogue,
    restored,
  };
}
