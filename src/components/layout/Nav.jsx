import { Leaf, Menu, X } from "lucide-react";

export default function Nav({ menuOpen, setMenuOpen }) {
  return (
    <nav className={menuOpen ? "open" : ""}>
      <a href="#solutions" onClick={() => setMenuOpen(false)}>
        Risiko Iklim
      </a>
      <a href="#lab" onClick={() => setMenuOpen(false)}>
        Laboratorium
      </a>
      <a href="#mission" onClick={() => setMenuOpen(false)}>
        Misi Ekosistem
      </a>
      <a className="nav-pill" href="#pledge" onClick={() => setMenuOpen(false)}>
        <Leaf /> Ikrar Hijau
      </a>
    </nav>
  );
}
