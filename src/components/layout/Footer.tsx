import { Link } from "../../router";
import { Phone, Shield, ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const emergencyNumbers = [
    { number: "112", label: "Panggilan Darurat Umum", desc: "BPBD & Tanggap Bencana Terpadu" },
    { number: "113", label: "Pemadam Kebakaran", desc: "Karhutla & Evakuasi Api" },
    { number: "115", label: "BASARNAS (SAR)", desc: "Pencarian Korban Banjir & Longsor" },
    { number: "119", label: "Kemenkes / Ambulans", desc: "Gawat Darurat Medis & ISPA" },
  ];

  return (
    <footer className="w-full bg-[#173a2d] text-white pt-16 pb-12 border-t-4 border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Hotlines Grid */}
        <div className="mb-14 rounded-3xl bg-emerald-950/70 border border-emerald-700/30 p-6 md:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider mb-2">
                <Phone className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                Nomor Penting Bebas Pulsa
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-['Fredoka'] text-white">
                Kontak Darurat Bencana Nasional
              </h3>
              <p className="text-sm text-emerald-200/80">
                Hubungi segera saat berada dalam situasi bahaya atau memerlukan evakuasi cepat.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs md:text-sm self-start md:self-auto transition-colors"
            >
              Info Kontak Lengkap
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="group flex flex-col p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl md:text-3xl font-black font-mono text-amber-400 group-hover:scale-105 transition-transform">
                    {item.number}
                  </span>
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
                <strong className="text-xs md:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </strong>
                <span className="text-[11px] text-emerald-200/60 mt-1 line-clamp-1">
                  {item.desc}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center p-1 shadow-lg">
                <svg viewBox="90 35 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <ellipse cx="170" cy="139" rx="77" ry="73" fill="#263E38" />
                  <path d="M128 111c-17 31-11 66 17 86 30 2 51-13 62-39-7-31-36-53-79-47Z" fill="#FAF6E9" />
                  <path d="M170 130c43-27 105-19 149 8-32 8-59 27-95 51-28 19-55 4-50-23Z" fill="#E9A43B" stroke="#7A4938" strokeWidth="5" />
                  <path d="M176 126c30-36 82-43 111-9-39-3-67 8-93 25Z" fill="#D88732" stroke="#7A4938" strokeWidth="5" />
                  <circle cx="158" cy="133" r="14" fill="#173B30" />
                  <circle cx="153" cy="128" r="4" fill="white" />
                  <path d="M104 101c26-16 86-25 126-4l-10 16c-39-12-77-8-111 4Z" fill="#8D5B4C" />
                  <path d="M126 93c1-48 70-58 87-3l-6 13c-31-10-56-8-81 2Z" fill="#B9825F" stroke="#684437" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-2xl font-['Fredoka'] text-white">Rimba</span>
                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                   Edukasi Lingkungan &amp; Kesiapsiagaan
                </span>
              </div>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-md">
               Portal edukasi lingkungan interaktif untuk generasi muda Indonesia. Rimba menghubungkan konservasi alam,
               pengelolaan sampah, penghijauan, dan kesiapsiagaan melalui simulasi serta aksi sederhana.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <Shield className="w-4 h-4 text-emerald-400" />
              Didukung data terbuka PetaBencana.id & BMKG
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
               Jelajah Alam
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <Link to="/isu/banjir" className="hover:text-white transition-colors">
                  Banjir & Genangan Kota
                </Link>
              </li>
              <li>
                <Link to="/isu/tanah-longsor" className="hover:text-white transition-colors">
                  Tanah Longsor Lereng
                </Link>
              </li>
              <li>
                <Link to="/isu/kekeringan" className="hover:text-white transition-colors">
                  Kekeringan & Air Bersih
                </Link>
              </li>
              <li>
                <Link to="/isu/kebakaran-hutan" className="hover:text-white transition-colors">
                  Kebakaran Hutan & Lahan
                </Link>
              </li>
            </ul>
          </div>

          {/* Feature Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
               Jelajahi Rimba
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <Link to="/simulasi" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-emerald-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                   Laboratorium Ekosistem
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                   Tentang Rimba
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Kirim Masukan Pelajar
                </Link>
              </li>
              <li>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors inline-block"
                >
                  Kembali ke Puncak ↑
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} Petualangan Siaga Bencana Bersama Sigi & Rimba. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 justify-center">
            Dibuat untuk mencerdaskan generasi tangguh bencana Indonesia <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
