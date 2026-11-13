import { Menu, X } from "lucide-react";

export default function NavToggle({ menuOpen, setMenuOpen }) {
  return (
    <button
      className="nav-toggle"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Buka menu"
    >
      {menuOpen ? <X /> : <Menu />}
    </button>
  );
}
