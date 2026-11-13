import { ArrowDown } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <Logo />
      <p>Belajar dari alam. Bergerak dengan data. Tumbuh bersama.</p>
      <div>
        <span>Climate education for everyone</span>
        <a href="#top">
          Kembali ke atas <ArrowDown />
        </a>
      </div>
    </footer>
  );
}
