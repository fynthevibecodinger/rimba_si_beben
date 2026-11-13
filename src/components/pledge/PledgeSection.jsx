import { motion } from "motion/react";
import { Leaf, ArrowRight, Check, Sparkles } from "lucide-react";
import RimbaMascot from "../mascot/RimbaMascot";

export default function PledgeSection({ pledged, setPledged, mood, setMood }) {
  return (
    <section className="pledge-section" id="pledge">
      <div className="tip-marquee">
        <div>
          HEMAT AIR <Leaf /> TANAM POHON LOKAL <Leaf /> PILAH SAMPAH <Leaf /> NAIK TRANSPORTASI
          PUBLIK <Leaf /> JAGA SUNGAI <Leaf /> HEMAT ENERGI <Leaf />
        </div>
        <div aria-hidden="true">
          HEMAT AIR <Leaf /> TANAM POHON LOKAL <Leaf /> PILAH SAMPAH <Leaf /> NAIK TRANSPORTASI
          PUBLIK <Leaf /> JAGA SUNGAI <Leaf /> HEMAT ENERGI <Leaf />
        </div>
      </div>
      <div className="page-shell pledge-inner">
        <div className="pledge-art" data-reveal>
          <div className={`eco-badge ${pledged ? "earned" : ""}`}>
            <div>
              <Leaf />
              <strong>
                SAHABAT
                <br />
                BUMI
              </strong>
              <small>2025</small>
            </div>
            {pledged && (
              <>
                <Sparkles className="spark spark-a" />
                <Sparkles className="spark spark-b" />
              </>
            )}
          </div>
          <RimbaMascot mood={pledged ? "celebrate" : "wave"} />
        </div>
        <div className="pledge-copy" data-reveal>
          <span className="section-tag">
            <Leaf /> KOMITMEN HIJAU
          </span>
          <h2>
            Satu ikrar kecil,
            <br />
            <em>dampak yang besar.</em>
          </h2>
          <p>
            Aku berjanji untuk belajar dari alam, menggunakan teknologi dengan bijak, dan mengajak
            orang di sekitarku menjaga bumi.
          </p>
          <motion.button
            onClick={() => setPledged(true)}
            disabled={pledged}
            whileHover={!pledged ? { scale: 1.03 } : {}}
            whileTap={!pledged ? { scale: 0.97 } : {}}
          >
            {pledged ? (
              <>
                <Check /> Lencana Sahabat Bumi Didapat!
              </>
            ) : (
              <>
                <Leaf /> Ikrar Sahabat Bumi <ArrowRight />
              </>
            )}
          </motion.button>
          {pledged && (
            <motion.span
              className="pledge-thanks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Lencana digitalmu siap. Terima kasih sudah menjadi bagian dari solusi.
            </motion.span>
          )}
        </div>
      </div>
    </section>
  );
}
