import { ScanLine } from "lucide-react";
import RiskCard from "../components/risks/RiskCard";
import risks from "../data/risks";

export default function Solutions({ onPick }) {
  return (
    <section className="solution-section page-shell" id="solutions">
      <div className="section-intro" data-reveal>
        <div>
          <span className="section-tag">
            <ScanLine /> KENALI RISIKONYA
          </span>
          <h2>
            Satu bumi, beragam
            <br />
            <em>tantangan iklim.</em>
          </h2>
        </div>
        <p>
          Pilih satu bencana hidrometeorologi. Rimba akan mengajakmu menguji teknologi deteksi dan
          solusi berbasis alam yang tepat.
        </p>
      </div>
      <div className="risk-grid">
        {risks.map((item, index) => (
          <RiskCard key={item.id} risk={item} index={index} onPick={() => onPick(item.id)} />
        ))}
      </div>
    </section>
  );
}
