import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function RootSnakeScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(580);
  const lastScrollY = useRef(0);
  const scrollStopTimer = useRef<NodeJS.Timeout | null>(null);

  // Ukur tinggi lintasan akar
  useEffect(() => {
    const measureTrack = () => {
      if (trackRef.current) {
        setTrackHeight(trackRef.current.clientHeight);
      }
    };
    measureTrack();
    window.addEventListener("resize", measureTrack);
    return () => window.removeEventListener("resize", measureTrack);
  }, []);

  // Multi-source scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const body = document.body;

      const currentY =
        window.scrollY ||
        window.pageYOffset ||
        doc.scrollTop ||
        body.scrollTop ||
        0;

      const scrollHeight = Math.max(
        doc.scrollHeight,
        body.scrollHeight,
        doc.offsetHeight,
        body.offsetHeight
      );
      const clientHeight = window.innerHeight || doc.clientHeight || 800;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);

      const rawProgress = Math.min(Math.max(currentY / maxScroll, 0), 1);
      setScrollProgress(rawProgress);

      if (currentY > lastScrollY.current + 3) {
        setIsScrollingDown(true);
      } else if (currentY < lastScrollY.current - 3) {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentY;

      setIsScrolling(true);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    };
  }, []);

  const scrollToRatio = (ratio: number) => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const clientHeight = window.innerHeight || doc.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    window.scrollTo({
      top: maxScroll * ratio,
      behavior: "smooth",
    });
  };

  const snakeHeight = 68;
  const maxTravel = Math.max(trackHeight - snakeHeight, 100);
  const snakeY = scrollProgress * maxTravel;

  // Alur lekukan halus
  const snakeX = Math.sin(scrollProgress * Math.PI * 3.5) * 4;
  const percentText = `${Math.round(scrollProgress * 100)}%`;

  const milestones = [
    { ratio: 0, label: "Puncak Beranda" },
    { ratio: 0.28, label: "Radar Bencana" },
    { ratio: 0.65, label: "4 Materi Isu" },
    { ratio: 0.98, label: "Lab Simulasi" },
  ];

  return (
    <aside
      className="fixed right-0 top-16 bottom-8 z-50 w-7 sm:w-9 md:w-10 flex flex-col items-center pointer-events-none select-none transition-all"
      aria-label="Akar Rimba & Ular Penunjuk Scroll"
    >
      <div
        ref={trackRef}
        className="relative w-full h-full flex items-center justify-end pr-1 sm:pr-1.5"
      >
        {/* =========================================================================
            1. RANTING DAUN DI PALING ATAS (TEPI KANAN)
           ========================================================================= */}
        <div
          onClick={() => scrollToRatio(0)}
          className="absolute -top-3 right-0 pointer-events-auto cursor-pointer group z-30"
          title="Kembali ke Puncak Rimba"
        >
          <svg viewBox="0 0 24 18" className="w-6 sm:w-7 h-4 sm:h-5 text-emerald-800 transition-transform group-hover:scale-125">
            <path d="M24,18 Q14,8 4,14 C0,8 6,2 14,0 C20,4 24,10 24,18 Z" fill="#1b4332" />
            <path d="M24,18 Q16,4 10,2 C18,0 24,6 24,18 Z" fill="#52b788" />
          </svg>
        </div>

        {/* =========================================================================
            2. BATANG AKAR GANTUNG DI SISI PALING KANAN (SVG TRACK)
           ========================================================================= */}
        <svg
          viewBox="0 0 32 400"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id="edgeSapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <filter id="edgeRootShadow" x="-30%" y="-10%" width="160%" height="120%">
              <feDropShadow dx="-1.5" dy="1.5" stdDeviation="1.5" floodColor="#1a0f08" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Dedaunan Rimba Kecil Menyembul dari Sisi Kiri Akar */}
          <path d="M 16,80 Q 2,75 0,84 Q 8,88 16,80 Z" fill="#2d6a4f" />
          <path d="M 22,170 Q 8,165 4,174 Q 14,178 22,170 Z" fill="#1b4332" />
          <path d="M 16,270 Q 2,265 0,274 Q 8,278 16,270 Z" fill="#52b788" />
          <path d="M 20,340 Q 6,335 2,344 Q 12,348 20,340 Z" fill="#2d6a4f" />

          {/* 1. Lapisan Bayangan Batang Akar (#2e1a0f) */}
          <path
            d="M 22,0 C 14,70 28,130 20,200 C 12,270 26,330 20,400"
            fill="none"
            stroke="#2e1a0f"
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#edgeRootShadow)"
          />

          {/* 2. Kulit Batang Kayu Utama (#5a351f) */}
          <path
            d="M 22,0 C 14,70 28,130 20,200 C 12,270 26,330 20,400"
            fill="none"
            stroke="#5a351f"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {/* 3. Serat Tekstur Kayu (#7a4b2c) */}
          <path
            d="M 22,0 C 14,70 28,130 20,200 C 12,270 26,330 20,400"
            fill="none"
            stroke="#804d2c"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="6 6"
            opacity="0.85"
          />

          {/* 4. Lumut Hutan Tropis (#2d6a4f) */}
          <path
            d="M 20,0 C 12,70 26,130 18,200 C 10,270 24,330 18,400"
            fill="none"
            stroke="#2d6a4f"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="16 28"
            opacity="0.9"
          />

          {/* 5. Alur Getah Hijau Bersinar (Mengisi ke bawah seiring scroll) */}
          <path
            d="M 22,0 C 14,70 28,130 20,200 C 12,270 26,330 20,400"
            fill="none"
            stroke="url(#edgeSapGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 430,
              strokeDashoffset: 430 * (1 - scrollProgress),
              transition: "stroke-dashoffset 80ms ease-out",
            }}
          />
        </svg>

        {/* Simpul Daun Milestone di Batang */}
        {milestones.map((m, i) => (
          <button
            key={i}
            onClick={() => scrollToRatio(m.ratio)}
            style={{ top: `${m.ratio * 90 + 5}%` }}
            className="absolute right-0.5 w-4 h-4 rounded-full bg-emerald-800 hover:bg-emerald-600 border border-white shadow-xs flex items-center justify-center pointer-events-auto cursor-pointer transition-transform hover:scale-130 group z-20"
            title={`${m.label} (Klik untuk lompat)`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
            <span className="absolute right-6 px-2 py-0.5 rounded-lg bg-slate-900/90 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-white/20">
              {m.label}
            </span>
          </button>
        ))}

        {/* Serabut Akar di Paling Bawah */}
        <div
          onClick={() => scrollToRatio(1)}
          className="absolute -bottom-3 right-0 pointer-events-auto cursor-pointer group z-30"
          title="Dasar Hutan"
        >
          <svg viewBox="0 0 24 16" className="w-6 h-4 text-[#4a2b18] transition-transform group-hover:scale-125">
            <path d="M20,0 L12,16 M20,0 L18,16 M20,0 L24,14 M14,6 L6,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* =========================================================================
            3. ULAR RIMBA MENJALAR TEPAT DI ATAS AKAR TEPI
           ========================================================================= */}
        <div
          style={{
            top: `${snakeY}px`,
            transform: `translateX(${snakeX}px)`,
            transition: "top 80ms ease-out, transform 80ms ease-out",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute right-0 pointer-events-auto cursor-pointer z-40 flex items-center justify-center"
          title={`Ular Rimba: ${percentText} • Klik untuk meluncur!`}
          onClick={() => {
            const nextRatio =
              scrollProgress < 0.25
                ? 0.35
                : scrollProgress < 0.6
                ? 0.72
                : scrollProgress < 0.9
                ? 1
                : 0;
            scrollToRatio(nextRatio);
          }}
        >
          {/* Animasi Peristaltik / Melata */}
          <motion.div
            animate={{
              x: isScrolling ? [-1.5, 1.5, -1.5] : 0,
              scaleY: isScrolling ? [0.95, 1.05, 0.95] : 1,
              scaleX: isScrolling ? [1.05, 0.95, 1.05] : 1,
              rotate: isScrollingDown ? 0 : 180,
            }}
            transition={{
              x: { repeat: Infinity, duration: 0.35, ease: "easeInOut" },
              scaleY: { repeat: Infinity, duration: 0.35, ease: "easeInOut" },
              scaleX: { repeat: Infinity, duration: 0.35, ease: "easeInOut" },
              rotate: { type: "spring", stiffness: 260, damping: 22 },
            }}
            className="relative flex flex-col items-center"
          >
            {/* SVG Karakter Ular Hijau Ramping Pas di Tepi */}
            <svg
              viewBox="0 0 44 60"
              className="w-9 sm:w-11 md:w-12 h-13 sm:h-16 md:h-17 overflow-visible drop-shadow-md transition-transform hover:scale-115"
            >
              <defs>
                <linearGradient id="edgeSnakeSkin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="45%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                <linearGradient id="edgeSnakeBelly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#bef264" />
                </linearGradient>
              </defs>

              {/* Lidah Bercabang Merah */}
              <motion.path
                d="M 22,48 L 22,57 M 22,57 L 19,60 M 22,57 L 25,60"
                stroke="#ef4444"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  scaleY: isScrolling || isHovered ? [0.3, 1.25, 0.3] : [0.7, 1, 0.7],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{ repeat: Infinity, duration: 0.4 }}
              />

              {/* Ekor Melilit di Belakang */}
              <path
                d="M 22,4 C 15,2 12,8 15,13 C 19,18 29,16 31,11"
                fill="none"
                stroke="#065f46"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Badan Utama Ular Melilit Depan */}
              <path
                d="M 31,11 C 35,6 40,16 33,25 C 26,32 10,28 12,39 C 14,46 20,46 22,48"
                fill="none"
                stroke="url(#edgeSnakeSkin)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Sisik Perut Kuning */}
              <path
                d="M 31,11 C 34,7 39,16 33,24 C 25,31 12,29 14,38 C 16,44 21,45 22,47"
                fill="none"
                stroke="url(#edgeSnakeBelly)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Totol Sisik Cincin */}
              <circle cx="33" cy="16" r="2" fill="#064e3b" opacity="0.8" />
              <circle cx="24" cy="27" r="2.2" fill="#064e3b" opacity="0.8" />
              <circle cx="14" cy="34" r="1.8" fill="#064e3b" opacity="0.8" />

              {/* Kepala Ular Ceria */}
              <g transform="translate(13, 40)">
                <ellipse cx="9" cy="7" rx="8.5" ry="7" fill="#10b981" />
                <path d="M 4,6 Q 9,11 14,6" fill="url(#edgeSnakeBelly)" opacity="0.95" />

                <circle cx="5" cy="5.5" r="2.8" fill="#ffffff" />
                <circle cx="5.4" cy="5.8" r="1.4" fill="#0f172a" />
                <circle cx="4.6" cy="4.6" r="0.7" fill="#ffffff" />

                <circle cx="13" cy="5.5" r="2.8" fill="#ffffff" />
                <circle cx="12.6" cy="5.8" r="1.4" fill="#0f172a" />
                <circle cx="13.4" cy="4.6" r="0.7" fill="#ffffff" />

                <circle cx="7.8" cy="10" r="0.5" fill="#064e3b" />
                <circle cx="10.2" cy="10" r="0.5" fill="#064e3b" />
              </g>

              {/* Ujung Ekor */}
              <circle cx="22" cy="4" r="3" fill="#059669" />
            </svg>
          </motion.div>
        </div>

      </div>
    </aside>
  );
}
