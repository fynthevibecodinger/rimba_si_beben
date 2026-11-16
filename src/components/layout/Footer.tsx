import { Link } from "../../router";
import { Phone, Shield, ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const emergencyNumbers = [
    { number: "112", label: "Nomor Darurat Umum", desc: "BPBD & Tanggap Bencana Terpadu" },
    { number: "113", label: "Pemadam Kebakaran", desc: "Karhutla & Evakuasi Api" },
    { number: "115", label: "BASARNAS (SAR)", desc: "Pencarian Korban Banjir & Longsor" },
    { number: "119", label: "Kemenkes / Ambulans", desc: "Gawat Darurat Medis & gangguan pernapasan" },
  ];

  return (
    <footer className="w-full bg-[#173a2d] text-white pt-8 pb-6 border-t-4 border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Hotlines Grid */}
        <div className="mb-8 rounded-2xl bg-emerald-950/55 border border-emerald-700/30 p-4 md:p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="flex items-center gap-2 text-base md:text-lg font-bold font-['Fredoka'] text-white">
                <Phone className="w-4 h-4 text-rose-300" />
                Nomor Darurat
              </h3>
              <p className="text-xs text-emerald-200/70">Hubungi saat membutuhkan bantuan segera.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
            >
              Info lengkap
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="group flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-xl md:text-2xl font-black font-mono text-amber-400 group-hover:scale-105 transition-transform">
                    {item.number}
                  </span>
                </div>
                <strong className="text-[11px] md:text-xs leading-tight font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </strong>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 pb-7 border-b border-emerald-800/60">
          {/* Brand Info */}
          <div className="sm:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center p-1 shadow-lg">
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
                <span className="font-extrabold text-xl font-['Fredoka'] text-white">Rimba</span>
                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                   Edukasi Lingkungan &amp; Kesiapsiagaan
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
               Belajar menjaga alam dan bersiap menghadapi bencana melalui cara yang mudah dan menyenangkan.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
              <Shield className="w-4 h-4 text-emerald-400" />
                Menggunakan data dari PetaBencana.id dan BMKG
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
                   Tempat Mencoba dan Belajar
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
         <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-emerald-300/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} Petualangan Siaga Bencana Bersama Sigi & Rimba. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 justify-center">
            Dibuat untuk mencerdaskan generasi tangguh bencana Indonesia <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
