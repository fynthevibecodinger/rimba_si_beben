import { Link } from "../../router";
import {
  Phone,
  Shield,
  ArrowUp,
  Sparkles,
  CloudRainWind,
  DropletOff,
  FlameKindling,
  Heart,
  ExternalLink,
  Compass,
  BookOpen,
  Award,
  Activity,
  Trees,
} from "lucide-react";
import LandslideIcon from "../icons/LandslideIcon";

export default function Footer() {
  const emergencyNumbers = [
    {
      number: "112",
      label: "Darurat Umum / BPBD",
      desc: "Evakuasi banjir bandang & pohon tumbang",
      badge: "Bebas Pulsa 24 Jam",
      color: "text-amber-400 group-hover:text-amber-300",
      border: "hover:border-amber-400/40",
    },
    {
      number: "113",
      label: "Pemadam Kebakaran",
      desc: "Karhutla & kebakaran semak/lahan",
      badge: "Siaga Bencana",
      color: "text-rose-400 group-hover:text-rose-300",
      border: "hover:border-rose-400/40",
    },
    {
      number: "115",
      label: "BASARNAS (SAR)",
      desc: "Pencarian korban longsor & perairan",
      badge: "Operasi Penyelamatan",
      color: "text-orange-400 group-hover:text-orange-300",
      border: "hover:border-orange-400/40",
    },
    {
      number: "119",
      label: "Medis Darurat (Kemenkes)",
      desc: "Ambulans, hipotermia & sesak asap",
      badge: "Layanan Gawat Darurat",
      color: "text-emerald-400 group-hover:text-emerald-300",
      border: "hover:border-emerald-400/40",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full block bg-gradient-to-b from-[#173a2d] via-[#122e24] to-[#0d221a] text-white pt-16 pb-12 border-t-4 border-emerald-500 relative overflow-hidden">
      {/* Background Subtle Forest Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full block">
        
        {/* =========================================================================
            1. TOP BAR: NOMOR DARURAT BENCANA BEBAS PULSA
           ========================================================================= */}
        <div className="mb-14 rounded-3xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                <Phone className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                <span>Saluran Siaga Bencana Nasional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Fredoka'] text-white tracking-tight">
                Nomor Panggilan Darurat Bebas Pulsa (24 Jam)
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/75 mt-1">
                Segera hubungi tim tanggap darurat saat mendeteksi tanda bahaya atau membutuhkan evakuasi medis.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm self-start md:self-auto transition-all shadow-md hover:scale-105 active:scale-95 border border-emerald-500/30 cursor-pointer"
            >
              <span>Info Kontak Selengkapnya</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Emergency Grid Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className={`group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 ${item.border} transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5`}
                title={`Panggil darurat ${item.number}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${item.color} transition-colors`}>
                      {item.number}
                    </span>
                    <span className="p-1.5 rounded-xl bg-white/10 text-white/80 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors block">
                    {item.label}
                  </strong>
                  <p className="text-[11px] text-emerald-100/60 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-extrabold text-white/50 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                  {item.badge} →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* =========================================================================
            2. MIDDLE NAVIGATION & BRAND COLUMNS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-emerald-800/40">
          
          {/* Kolom 1: Profil Brand Rimba & Filosofi Karakter (5 Kolom) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              {/* Logo Karakter Rimba Burung Rangkong */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 border border-emerald-400/40 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-950/40 flex-shrink-0">
                <svg viewBox="90 35 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
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
                <span className="font-['Fredoka'] font-black text-2xl text-white tracking-tight leading-none block">
                  Rimba
                </span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-0.5 block">
                  Laboratorium Literasi Bencana Pelajar
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Platform media edukasi interaktif sains iklim dan mitigasi bencana hidrometeorologi. 
              Menghubungkan kecerdasan ekologis, sensor telemetri, dan aksi nyata berbasis alam (*Nature-based Solutions*).
            </p>

            {/* Slogan & Badge Kurikulum */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-300 font-bold border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Selaras P5 Kurikulum Merdeka
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-300 font-bold border border-white/10">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Data Terbuka PetaBencana.id
              </span>
            </div>

            <div className="text-xs text-emerald-300/70 italic pt-1">
              &ldquo;Belajar dari alam. Bergerak dengan data. Selamatkan sesama.&rdquo;
            </div>
          </div>

          {/* Kolom 2: 4 Modul Bencana Hidrometeorologi (3 Kolom) */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-mono text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>4 Materi Bencana</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/80 font-medium">
              <li>
                <Link
                  to="/isu/banjir"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <CloudRainWind className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Banjir &amp; Genangan Ekstrem</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/isu/tanah-longsor"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <LandslideIcon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Tanah Longsor Lereng</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/isu/kekeringan"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <DropletOff className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Kekeringan &amp; Air Bersih</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/isu/kebakaran-hutan"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <FlameKindling className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Kebakaran Hutan &amp; Lahan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Fitur Utama & Laboratorium (2 Kolom) */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-mono text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Laboratorium</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/80 font-medium">
              <li>
                <Link
                  to="/simulasi"
                  className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Simulasi Ekosistem</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Profil Maskot Rimba
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Aspirasi Guru &amp; Siswa
                </Link>
              </li>
              <li>
                <a
                  href="https://petabencana.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-emerald-200/90"
                >
                  <span>Peta Spasial BNPB</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Aksi Hijau Pelajar (2 Kolom) */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-mono text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5" />
              <span>Aksi Hijau</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/75">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Biopori Massal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Akar Rumput Vetiver</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Sekat Kanal Gambut</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Panen Air Hujan (RWH)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            3. BOTTOM ACCREDITATION, COPYRIGHT & KEMBALI KE PUNCAK
           ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-emerald-200/70 text-left w-full border-t border-white/5">
          
          <div className="space-y-1 text-left flex-1">
            <p className="font-medium text-white/90 text-left">
              © {new Date().getFullYear()} Rimba Siaga Bencana — Media Pembelajaran Lingkungan Pelajar Indonesia.
            </p>
            <p className="flex items-center justify-start text-left gap-1.5 text-[11px] text-emerald-300/80">
              <span>Didedikasikan untuk membangun ketangguhan iklim Nusantara</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline flex-shrink-0" />
            </p>
          </div>

          {/* Tombol Kembali ke Puncak Elegan */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer border border-white/10 group self-start sm:self-auto flex-shrink-0"
            title="Kembali ke bagian atas halaman"
          >
            <span>Kembali ke Puncak</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
}
