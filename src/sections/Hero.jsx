import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import EcoLandscape from "../components/hero/EcoLandscape";
import MagneticButton from "../components/hero/MagneticButton";
import RimbaMascot from "../components/mascot/RimbaMascot";

export default function Hero() {
  return (
    <section className="eco-hero">
      <EcoLandscape />
      <div className="hero-grid">
        <div className="eco-hero-copy">
          <motion.div
            className="live-pill"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i />
            Laboratorium Iklim Nusantara
            <span>LIVE</span>
          </motion.div>
          <h1>
            <span className="title-mask">
              <span>Jaga Bumi dengan</span>
            </span>
            <span className="title-mask accent">
              <span>Teknologi Hijau</span>
            </span>
            <span className="title-mask">
              <span>&amp; Aksi Nyata!</span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Jelajahi bagaimana sensor pintar, kecerdasan buatan, dan kekuatan alam membantu kita
            membangun masa depan yang lebih tangguh.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <MagneticButton />
            <div className="hero-proof">
              <span>
                <ShieldCheck />
              </span>
              <p>
                <strong>Belajar sambil mencoba</strong>
                <small>Simulasi interaktif &amp; aman</small>
              </p>
            </div>
          </motion.div>
        </div>
        <div className="hero-rimba">
          <div className="speech-bubble">
            <strong>Hai, aku Rimba!</strong>
            <p>Yuk jadi penjaga bumi masa depan.</p>
          </div>
          <RimbaMascot mood="wave" />
        </div>
      </div>
      <div className="climate-stats">
        <div>
          <strong>+1.2°C</strong>
          <span>Suhu global meningkat</span>
        </div>
        <div>
          <strong>3×</strong>
          <span>Cuaca ekstrem lebih sering</span>
        </div>
        <div>
          <strong>2030</strong>
          <span>Dekade aksi iklim</span>
        </div>
      </div>
    </section>
  );
}
