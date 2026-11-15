import { useState, useEffect } from "react";
import { Link, useLocation } from "../../router";
import {
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ChevronDown,
  Waves,
  Mountain,
  SunMedium,
  Flame,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [issuesDropdownOpen, setIssuesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCurrent = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const issuesList = [
    { title: "Banjir & Genangan", slug: "banjir", icon: Waves, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "Tanah Longsor", slug: "tanah-longsor", icon: Mountain, color: "text-amber-800", bg: "bg-amber-50" },
    { title: "Kekeringan Air", slug: "kekeringan", icon: SunMedium, color: "text-amber-600", bg: "bg-orange-50" },
    { title: "Kebakaran Hutan", slug: "kebakaran-hutan", icon: Flame, color: "text-red-600", bg: "bg-rose-50" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 pointer-events-none">
      {/* Outer wrapper that pads when floating */}
      <div
        className={`w-full transition-all duration-300 ease-out pointer-events-auto ${
          isScrolled ? "pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8" : "pt-0 px-0"
        }`}
      >
        {/* Main Navbar Capsule */}
        <div
          className={`mx-auto transition-all duration-300 ease-out flex items-center justify-between relative overflow-visible ${
            isScrolled
              ? "max-w-6xl rounded-2xl sm:rounded-full bg-white/92 backdrop-blur-2xl border border-emerald-800/15 shadow-2xl shadow-emerald-950/15 h-16 px-4 sm:px-6 ring-1 ring-white/60"
              : "w-full max-w-7xl rounded-none bg-[#f7f5ee]/90 backdrop-blur-xl border-b border-emerald-900/10 shadow-none h-20 px-4 sm:px-6 lg:px-8"
          }`}
        >
          {/* Brand / Logo Maskot Rimba */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group select-none text-decoration-none"
            onClick={() => {
              setMobileMenuOpen(false);
              setIssuesDropdownOpen(false);
            }}
          >
            <div
              className={`rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0e2c20] p-1 flex items-center justify-center shadow-md shadow-emerald-950/15 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-200 ${
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-11 h-11"
              }`}
            >
              <svg
                viewBox="90 35 240 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-full h-full drop-shadow-xs"
              >
                <ellipse cx="170" cy="139" rx="77" ry="73" fill="#263E38" />
                <path d="M128 111c-17 31-11 66 17 86 30 2 51-13 62-39-7-31-36-53-79-47Z" fill="#FAF6E9" />
                <path
                  d="M170 130c43-27 105-19 149 8-32 8-59 27-95 51-28 19-55 4-50-23Z"
                  fill="#E9A43B"
                  stroke="#7A4938"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <path d="M177 153c45-5 91-2 129-13-28 12-52 31-83 49-24 14-43 4-48-10Z" fill="#F5C354" />
                <path
                  d="M176 126c30-36 82-43 111-9-39-3-67 8-93 25Z"
                  fill="#D88732"
                  stroke="#7A4938"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <circle cx="158" cy="133" r="14" fill="#173B30" />
                <circle cx="153" cy="128" r="4" fill="white" />
                <circle cx="134" cy="161" r="11" fill="#EFA88B" opacity="0.6" />
                <path d="M104 101c26-16 86-25 126-4l-10 16c-39-12-77-8-111 4Z" fill="#8D5B4C" />
                <path
                  d="M126 93c1-48 70-58 87-3l-6 13c-31-10-56-8-81 2Z"
                  fill="#B9825F"
                  stroke="#684437"
                  strokeWidth="4"
                />
                <path d="M125 86c29 8 59 7 88-1l-1 14c-31 8-58 8-87 1Z" fill="#2D6A4F" />
                <path d="M184 74c10-8 21-11 34-7-8 12-18 19-32 20Z" fill="#52B788" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-black leading-none text-[#173a2d] font-['Fredoka'] tracking-tight transition-all ${
                  isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                }`}
              >
                Rimba
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-800 tracking-widest uppercase mt-0.5">
                 Peduli Lingkungan
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                isCurrent("/") && location.pathname === "/"
                  ? "bg-emerald-900 text-white shadow-sm"
                  : "text-slate-700 hover:text-emerald-900 hover:bg-emerald-800/10"
              }`}
            >
              Beranda
            </Link>

            {/* Isu Bencana Dropdown Interaktif */}
            <div className="relative">
              <button
                onClick={() => setIssuesDropdownOpen(!issuesDropdownOpen)}
                onMouseEnter={() => setIssuesDropdownOpen(true)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-all duration-150 ${
                  isCurrent("/isu")
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "text-slate-700 hover:text-emerald-900 hover:bg-emerald-800/10"
                }`}
              >
                 <span>Materi &amp; Aksi</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    issuesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {issuesDropdownOpen && (
                <div
                  onMouseLeave={() => setIssuesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-68 rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-900/15 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-emerald-950/5"
                >
                  <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest px-3 py-1.5 flex items-center justify-between">
                    <span>Isu Hidrometeorologi</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    {issuesList.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          to={`/isu/${item.slug}`}
                          onClick={() => setIssuesDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-emerald-50/80 transition-all text-xs sm:text-sm font-bold text-slate-800 group"
                        >
                          <div
                            className={`p-2 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="group-hover:text-emerald-900">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Lab Simulasi Interaktif dengan Efek Shimmer */}
            <Link
              to="/simulasi"
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black inline-flex items-center gap-1.5 transition-all duration-150 ${
                isCurrent("/simulasi")
                  ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/25 ring-2 ring-emerald-400/50"
                  : "bg-emerald-100/90 text-emerald-900 hover:bg-emerald-200/90 hover:scale-105 active:scale-95"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Lab Simulasi</span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                isCurrent("/about")
                  ? "bg-emerald-900 text-white shadow-sm"
                  : "text-slate-700 hover:text-emerald-900 hover:bg-emerald-800/10"
              }`}
            >
              Tentang Rimba
            </Link>

            {/* Kontak Darurat */}
            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-all duration-150 ${
                isCurrent("/contact")
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/20"
                  : "text-rose-800 bg-rose-50 hover:bg-rose-100 hover:scale-105 active:scale-95 border border-rose-200/60"
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>Kontak Darurat</span>
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/simulasi"
              className="px-3 py-1.5 rounded-full bg-emerald-800 text-white text-xs font-black inline-flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Simulasi</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-900/10 text-emerald-900 hover:bg-emerald-900/15 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Interactive Scroll Progress Indicator at Bottom of Navbar */}
          {isScrolled && (
            <div className="absolute bottom-0 left-6 right-6 h-[2.5px] bg-emerald-900/5 rounded-full overflow-hidden pointer-events-none">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-100 ease-out rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Mobile Drawer Menu - Clean Floating Card */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-lg mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-900/15 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-2xl font-bold text-sm ${
                location.pathname === "/" ? "bg-emerald-800 text-white" : "text-slate-800 hover:bg-emerald-50"
              }`}
            >
              Beranda
            </Link>

            <div className="pt-1 pb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                Materi 4 Bencana
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {issuesList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      to={`/isu/${item.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800 hover:bg-emerald-50 transition-colors"
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              to="/simulasi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-emerald-800 text-white font-black text-sm shadow-md"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Lab Simulasi Ekosistem
              </span>
              <span className="text-[10px] uppercase bg-emerald-600 px-2 py-0.5 rounded-full font-black">
                Interaktif
              </span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-2xl font-bold text-sm text-slate-800 hover:bg-emerald-50"
            >
              Tentang Rimba & Karakter
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200/70 font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              Kontak Darurat (112, 113, 115, 119)
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
