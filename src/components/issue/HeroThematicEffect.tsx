import { motion } from "motion/react";

interface HeroThematicEffectProps {
  slug: "banjir" | "tanah-longsor" | "kekeringan" | "kekeringan-air" | "kebakaran-hutan" | string;
}

export default function HeroThematicEffect({ slug }: HeroThematicEffectProps) {
  // Normalize slug in case user or route passes "kekeringan-air"
  const isBanjir = slug === "banjir";
  const isLongsor = slug === "tanah-longsor";
  const isKekeringan = slug === "kekeringan" || slug === "kekeringan-air";
  const isKarhutla = slug === "kebakaran-hutan";

  // ========================================================
  // 1. BANJIR & GENANGAN EKSTREM
  // Overcast stormy sky, drifting dark clouds, lightning flashes,
  // distant village/tree silhouettes, 3-tier river flood waves, parallax rain & splashes
  // ========================================================
  if (isBanjir) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Langit Mendung Badai Kebiruan (Stormy Overcast Gradient Sky) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091926] via-[#10273c] to-[#183652]" />

        {/* Kilatan Petir Halus di Balik Awan (Subtle Atmospheric Lightning Flash) */}
        <motion.div
          className="absolute inset-0 bg-sky-200/20 mix-blend-screen"
          animate={{
            opacity: [0, 0, 0.35, 0.05, 0.55, 0.08, 0.4, 0, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            times: [0, 0.65, 0.67, 0.68, 0.7, 0.71, 0.73, 0.76, 1],
            ease: "easeInOut",
          }}
        />

        {/* Awan Gelap Bergerak Perlahan di Langit Atas (Drifting Dark Clouds) */}
        <motion.div
          className="absolute top-0 left-0 w-[160%] h-36 opacity-40 flex"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1600 160" preserveAspectRatio="none" className="w-full h-full fill-[#0c1f30]">
            <path d="M0,70 Q120,20 280,50 T620,30 Q820,10 1020,45 T1380,25 Q1500,50 1600,60 L1600,0 L0,0 Z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute top-4 left-0 w-[150%] h-32 opacity-30 flex"
          animate={{ x: [-40, 40, -40] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1500 140" preserveAspectRatio="none" className="w-full h-full fill-[#162e44]">
            <path d="M0,60 Q180,15 360,40 T780,20 Q980,5 1180,35 T1500,50 L1500,0 L0,0 Z" />
          </svg>
        </motion.div>

        {/* Siluet Pegunungan Hulu & Lereng Jauh */}
        <div className="absolute bottom-16 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-30">
          <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="w-full h-full fill-[#0d2235]">
            <path d="M0,110 Q180,40 380,90 T820,55 Q1040,30 1200,95 L1200,180 L0,180 Z" />
          </svg>
        </div>

        {/* Siluet Pemukiman, Rumah Desa & Pepohonan di Tepi Sungai (Distant Shoreline) */}
        <div className="absolute bottom-14 left-0 right-0 h-28 overflow-hidden pointer-events-none opacity-45">
          <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className="w-full h-full fill-[#081827]">
            {/* Pohon & Kanopi */}
            <path d="M40,110 Q60,60 80,110 M120,115 Q145,55 170,115 M160,115 Q180,70 200,115" stroke="#081827" strokeWidth="6" strokeLinecap="round" />
            <path d="M520,110 Q545,50 570,110 M560,110 Q580,65 600,110" stroke="#081827" strokeWidth="6" strokeLinecap="round" />
            <path d="M960,115 Q985,55 1010,115 M1000,115 Q1020,60 1040,115" stroke="#081827" strokeWidth="6" strokeLinecap="round" />
            
            {/* Siluet Atap Rumah & Bangunan */}
            <polygon points="230,115 250,90 270,115" />
            <rect x="235" y="102" width="30" height="15" />
            <polygon points="275,115 300,85 325,115" />
            <rect x="280" y="98" width="40" height="18" />
            
            <polygon points="680,115 705,85 730,115" />
            <rect x="685" y="98" width="40" height="18" />
            <polygon points="735,115 755,92 775,115" />
            
            <polygon points="850,115 870,88 890,115" />
            <rect x="855" y="100" width="30" height="16" />

            {/* Tiang Listrik & Antena */}
            <line x1="420" y1="115" x2="420" y2="70" stroke="#081827" strokeWidth="2.5" />
            <line x1="412" y1="80" x2="428" y2="80" stroke="#081827" strokeWidth="2" />
            <line x1="810" y1="115" x2="810" y2="75" stroke="#081827" strokeWidth="2" />
            <line x1="804" y1="84" x2="816" y2="84" stroke="#081827" strokeWidth="1.5" />

            {/* Kontur Tanah Tepi Tanggul */}
            <path d="M0,115 Q300,105 600,112 T1200,115 L1200,140 L0,140 Z" />
          </svg>
        </div>

        {/* 3 Lapis Gelombang Air Sungai Meluap (3-Tier Continuous Flood Waves) */}
        <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden pointer-events-none">
          {/* Gelombang 1: Lapisan Dalam / Belakang (Arus Lambat) */}
          <motion.div
            className="absolute bottom-0 w-[200%] h-full flex opacity-30"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#1e4a6d]">
              <path d="M0,50 C180,90 380,20 560,60 C740,100 960,30 1200,65 L1200,120 L0,120 Z" />
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#1e4a6d]">
              <path d="M0,50 C180,90 380,20 560,60 C740,100 960,30 1200,65 L1200,120 L0,120 Z" />
            </svg>
          </motion.div>

          {/* Gelombang 2: Lapisan Tengah (Arus Berlawanan) */}
          <motion.div
            className="absolute bottom-0 w-[200%] h-full flex opacity-45"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#0284c7]">
              <path d="M0,65 C220,25 440,85 640,45 C860,95 1060,35 1200,70 L1200,120 L0,120 Z" />
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#0284c7]">
              <path d="M0,65 C220,25 440,85 640,45 C860,95 1060,35 1200,70 L1200,120 L0,120 Z" />
            </svg>
          </motion.div>

          {/* Gelombang 3: Lapisan Depan (Cepat dengan Busa Puncak Gelombang) */}
          <motion.div
            className="absolute bottom-0 w-[200%] h-full flex opacity-50"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#38bdf8]">
              <path d="M0,80 C160,50 360,100 560,65 C760,105 960,55 1200,80 L1200,120 L0,120 Z" />
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-[#38bdf8]">
              <path d="M0,80 C160,50 360,100 560,65 C760,105 960,55 1200,80 L1200,120 L0,120 Z" />
            </svg>
          </motion.div>
        </div>

        {/* Lapisan Hujan 1: Belakang (Halus, Samar, Lambat) */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 28 }).map((_, i) => {
            const left = (i * 3.6) % 100;
            const duration = 1.3 + (i % 5) * 0.25;
            const delay = (i % 7) * 0.18;
            const height = 18 + (i % 3) * 8;
            return (
              <motion.div
                key={`rain-back-${i}`}
                className="absolute w-[1px] bg-gradient-to-b from-transparent via-cyan-100 to-white/70 rounded-full"
                style={{
                  left: `${left}%`,
                  height: `${height}px`,
                  top: "-40px",
                }}
                animate={{
                  y: ["0vh", "115vh"],
                  x: [0, -16],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              />
            );
          })}
        </div>

        {/* Lapisan Hujan 2: Depan (Tajam, Cepat, Miring Tertiup Angin) */}
        <div className="absolute inset-0 opacity-55">
          {Array.from({ length: 22 }).map((_, i) => {
            const left = (i * 4.6 + 2) % 98;
            const duration = 0.72 + (i % 4) * 0.14;
            const delay = (i % 6) * 0.12;
            const height = 34 + (i % 4) * 10;
            return (
              <motion.div
                key={`rain-front-${i}`}
                className="absolute w-[2px] bg-gradient-to-b from-transparent via-cyan-200 to-white shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-full"
                style={{
                  left: `${left}%`,
                  height: `${height}px`,
                  top: "-60px",
                }}
                animate={{
                  y: ["0vh", "115vh"],
                  x: [0, -28],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              />
            );
          })}
        </div>

        {/* Percikan Air / Splash Ripples di Atas Permukaan Banjir */}
        <div className="absolute bottom-14 left-0 right-0 h-10 overflow-hidden opacity-35">
          {Array.from({ length: 10 }).map((_, i) => {
            const left = (i * 10 + 4) % 95;
            const delay = (i % 5) * 0.35;
            return (
              <motion.div
                key={`splash-${i}`}
                className="absolute bottom-1 w-6 h-1.5 rounded-full border border-cyan-200 bg-cyan-100/40"
                style={{ left: `${left}%` }}
                animate={{
                  scale: [0.3, 1.8],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. TANAH LONGSOR & PERGERAKAN LERENG
  // Moody mountain mist sky, steep multi-layered hill terraces,
  // leaning trees along the slope edge, cracked fissure lines, tumbling rocks & dirt, falling leaves
  // ========================================================
  if (isLongsor) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Langit Lembah Pegunungan Berkabut (Mountain Valley Gradient Sky) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1715] via-[#29231e] to-[#3a2e24]" />

        {/* Kabut Pegunungan Melayang Perlahan (Rolling Mountain Mist) */}
        <motion.div
          className="absolute top-0 left-0 w-[160%] h-36 opacity-25"
          animate={{ x: [0, -45, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-stone-400/20 via-stone-300/10 to-transparent blur-xl" />
        </motion.div>

        {/* Lanskap Tebing Perbukitan Terjal Berlapis (Layered Steep Hill Terraces) */}
        <div className="absolute bottom-0 left-0 right-0 h-52 overflow-hidden pointer-events-none">
          {/* Bukit Pegunungan Jauh (Lapisan 1) */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#211a15] opacity-60"
          >
            <path d="M0,110 Q240,40 520,95 T1020,60 Q1120,80 1200,120 L1200,240 L0,240 Z" />
          </svg>

          {/* Lereng Tebing Menengah (Lapisan 2: Curam Menurun ke Kanan) */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#30241b] opacity-80"
          >
            <path d="M0,150 C260,100 480,185 760,125 C960,80 1100,145 1200,165 L1200,240 L0,240 Z" />
          </svg>

          {/* Tebing Curam Depan dengan Garis Retakan Bidang Gelincir (Lapisan 3) */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#1c140e] opacity-95"
          >
            {/* Permukaan Lereng Curam */}
            <path d="M0,185 Q340,145 620,195 T1200,180 L1200,240 L0,240 Z" />

            {/* Garis Patahan / Retakan Lereng (Fissure Crack Line) */}
            <path
              d="M120,175 L220,160 L310,178 L430,152 L540,188 L680,165 L810,182 L960,168 L1080,180"
              fill="none"
              stroke="#eab308"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              opacity="0.65"
            />
            {/* Cabang Retakan Kecil */}
            <path
              d="M310,178 L340,195 M540,188 L565,208 M810,182 L835,202"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.8"
              opacity="0.5"
            />
          </svg>

          {/* Pohon-Pohon Miring di Tepi Lereng (Leaning Trees Symbolizing Slope Instability) */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#130f0b] stroke-[#130f0b]"
          >
            {/* Pohon Miring 1 (Kiri) - Miring 20 derajat */}
            <g transform="translate(180, 160) rotate(22)">
              <line x1="0" y1="0" x2="0" y2="-45" strokeWidth="5" strokeLinecap="round" />
              <polygon points="-16,-25 0,-58 16,-25" />
              <polygon points="-12,-40 0,-68 12,-40" />
            </g>

            {/* Pohon Miring 2 (Tengah) - Miring 18 derajat */}
            <g transform="translate(480, 155) rotate(19)">
              <line x1="0" y1="0" x2="0" y2="-40" strokeWidth="4.5" strokeLinecap="round" />
              <polygon points="-14,-22 0,-52 14,-22" />
              <polygon points="-10,-35 0,-60 10,-35" />
            </g>

            {/* Pohon Miring 3 (Tepi Tebing Kanan) - Miring 25 derajat */}
            <g transform="translate(860, 165) rotate(26)">
              <line x1="0" y1="0" x2="0" y2="-48" strokeWidth="5" strokeLinecap="round" />
              <polygon points="-18,-26 0,-62 18,-26" />
              <polygon points="-14,-42 0,-72 14,-42" />
            </g>
          </svg>
        </div>

        {/* Partikel Kerikil & Gumpalan Tanah Meluncur Miring Menuruni Lereng */}
        <div className="absolute inset-0">
          {Array.from({ length: 22 }).map((_, i) => {
            const left = (i * 4.8 + 4) % 94;
            const duration = 2.8 + (i % 5) * 0.7;
            const delay = (i % 6) * 0.45;
            const isRock = i % 3 === 0;
            const size = isRock ? 5 + (i % 3) * 2 : 2.5 + (i % 2);

            return (
              <motion.div
                key={`landslide-particle-${i}`}
                className={`absolute rounded-full ${
                  isRock
                    ? "bg-stone-300 shadow-[0_0_6px_rgba(214,211,209,0.5)] border border-stone-500/60"
                    : "bg-amber-300/80"
                }`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: "-20px",
                }}
                animate={{
                  y: ["0vh", "110vh"],
                  x: [0, 85 + (i % 3) * 25],
                  rotate: [0, i % 2 === 0 ? 360 : -360],
                  opacity: [0, 0.95, 0.95, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay,
                }}
              />
            );
          })}
        </div>

        {/* Daun Gugur Melayang Tertiup Angin Lereng */}
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 8 }).map((_, i) => {
            const left = (i * 12 + 6) % 92;
            const duration = 5.5 + (i % 4) * 1.5;
            const delay = i * 0.8;
            return (
              <motion.div
                key={`leaf-${i}`}
                className="absolute text-sm select-none"
                style={{ left: `${left}%`, top: "-30px" }}
                animate={{
                  y: ["0vh", "110vh"],
                  x: [0, 50, -25, 70],
                  rotate: [0, 180, -90, 360],
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              >
                🍂
              </motion.div>
            );
          })}
        </div>

        {/* Kepulan Debu Tipis di Kaki Bukit */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-900/60 to-transparent blur-md pointer-events-none"
          animate={{ opacity: [0.35, 0.65, 0.35], y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  // ========================================================
  // 3. KEKERINGAN AIR & KRISIS AIR BERSIH
  // Scorching golden orange sky, blazing sun with rotating sunbeams,
  // arid hill contours, silhouetted leafless dead trees, cracked soil riverbed, horizontal blowing dust
  // ========================================================
  if (isKekeringan) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Langit Terik Keemasan (Scorching Amber-Orange Gradient Sky) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#451a03] via-[#78350f] via-[#92400e] to-[#592205]" />

        {/* Matahari Bersinar Terik di Sudut Kanan Atas dengan Rotating Sunbeams */}
        <div className="absolute -top-28 -right-28 w-[480px] h-[480px] pointer-events-none">
          {/* Inti Cahaya Matahari Berpendar (Solar Corona) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 via-amber-400 to-transparent blur-3xl opacity-50 animate-pulse duration-1000" />
          <div className="absolute top-1/4 right-1/4 w-36 h-36 rounded-full bg-amber-100/40 blur-2xl" />

          {/* Sinar Matahari Berputar Perlahan (Rotating Sunbeams) */}
          <motion.div
            className="w-full h-full opacity-30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 500 500" className="w-full h-full fill-amber-200">
              <polygon points="250,250 180,0 230,0" opacity="0.35" />
              <polygon points="250,250 320,0 370,0" opacity="0.3" />
              <polygon points="250,250 500,120 500,170" opacity="0.4" />
              <polygon points="250,250 500,280 500,330" opacity="0.3" />
              <polygon points="250,250 350,500 400,500" opacity="0.35" />
              <polygon points="250,250 160,500 210,500" opacity="0.3" />
              <polygon points="250,250 0,380 0,330" opacity="0.35" />
              <polygon points="250,250 0,180 0,130" opacity="0.4" />
            </svg>
          </motion.div>
        </div>

        {/* Siluet Perbukitan Gersang Berlapis (Arid Rolling Hills) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none">
          {/* Bukit Gersang Jauh (Lapisan 1) */}
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#652b07] opacity-60"
          >
            <path d="M0,90 Q280,30 580,75 T1200,70 L1200,200 L0,200 Z" />
          </svg>

          {/* Bukit Gersang Tengah (Lapisan 2) */}
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#451803] opacity-80"
          >
            <path d="M0,130 Q360,70 720,120 T1200,110 L1200,200 L0,200 Z" />
          </svg>

          {/* Siluet Pohon-Pohon Kering Tanpa Daun di Punggung Bukit */}
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#2a0e02] stroke-[#2a0e02]"
          >
            {/* Kontur Tanah Kering Depan */}
            <path d="M0,150 Q300,130 650,155 T1200,145 L1200,200 L0,200 Z" />

            {/* Pohon Gersang 1 (Kiri) */}
            <g transform="translate(140, 140)">
              <line x1="0" y1="0" x2="0" y2="-45" strokeWidth="4" strokeLinecap="round" />
              <path d="M0,-25 L-15,-40 M0,-30 L18,-45 M-15,-40 L-22,-52 M18,-45 L25,-58" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Pohon Gersang 2 (Tengah) */}
            <g transform="translate(540, 148)">
              <line x1="0" y1="0" x2="0" y2="-40" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M0,-20 L-14,-36 M0,-26 L14,-38 M-14,-36 L-18,-48 M14,-38 L20,-50" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Pohon Gersang 3 (Kanan) */}
            <g transform="translate(920, 145)">
              <line x1="0" y1="0" x2="0" y2="-48" strokeWidth="4" strokeLinecap="round" />
              <path d="M0,-28 L-16,-46 M0,-34 L18,-52 M-16,-46 L-24,-60 M18,-52 L26,-64" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Pola Retakan Tanah Mengering / Dasar Sungai Kering (Cracked Soil / Dry Riverbed) */}
        <div className="absolute bottom-0 left-0 right-0 h-18 overflow-hidden pointer-events-none opacity-45">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-full stroke-amber-200/80 fill-none"
            strokeWidth="2"
          >
            {/* Garis-Garis Retakan Poligonal Tanah Kering */}
            <path d="M0,75 L90,52 L170,68 L260,45 L350,65 L440,40 L530,62 L620,44 L710,60 L800,38 L890,66 L980,44 L1070,64 L1160,48 L1200,75" />
            <path d="M90,52 L110,78 M170,68 L195,80 M260,45 L280,68 L295,80 M350,65 L375,80 M440,40 L460,65 L480,80 M530,62 L550,80 M620,44 L645,62 L660,80 M710,60 L730,80 M800,38 L820,62 L840,80 M890,66 L915,80 M980,44 L1005,65 L1020,80 M1070,64 L1095,80" />
          </svg>
        </div>

        {/* Distorsi Udara Panas / Heat Haze Bergelombang di Area Bawah */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-600/25 via-yellow-500/10 to-transparent pointer-events-none"
          animate={{
            scaleY: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.35, 0.6, 0.4, 0.65, 0.35],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Partikel Debu Pasir Tertiup Angin Melintang Horisontal */}
        <div className="absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => {
            const top = (i * 3.8 + 6) % 85;
            const duration = 5.2 + (i % 5) * 1.4;
            const delay = (i % 6) * 0.65;
            const size = 1.5 + (i % 3);

            return (
              <motion.div
                key={`dust-${i}`}
                className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: "-10px",
                }}
                animate={{
                  x: ["0vw", "105vw"],
                  y: [0, i % 2 === 0 ? 18 : -18, 0],
                  opacity: [0, 0.85, 0.95, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // ========================================================
  // 4. KEBAKARAN HUTAN & LAHAN (KARHUTLA)
  // Peat forest silhouette with charred blackened trees, pulsing red-orange fire glow,
  // thick smoke haze ribbons drifting, drifting glowing embers floating upwards
  // ========================================================
  if (isKarhutla) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Langit Kelam Membara (Smoky Charred Night Sky) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#160403] via-[#2c0805] via-[#450a0a] to-[#1e0403]" />

        {/* Pendaran Cahaya Api Hangat Membara dari Balik Pohon (Pulsing Fire Glow Bloom) */}
        <div className="absolute -bottom-20 left-0 right-0 h-64 bg-gradient-to-t from-red-600/45 via-orange-500/30 to-transparent blur-3xl" />
        <motion.div
          className="absolute -bottom-10 left-1/3 w-[560px] h-48 rounded-full bg-orange-600/35 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-12 right-1/4 w-[480px] h-40 rounded-full bg-amber-500/25 blur-3xl pointer-events-none"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Siluet Hutan Gambut & Pohon-Pohon Menghitam (Peat Forest Silhouette) */}
        <div className="absolute bottom-0 left-0 right-0 h-52 overflow-hidden pointer-events-none">
          {/* Lapis 1: Hutan Belakang (Samar di Balik Asap) */}
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#200504] opacity-70 stroke-[#200504]"
          >
            <path d="M0,130 Q350,90 700,125 T1200,120 L1200,220 L0,220 Z" />
            {/* Batang Pohon Jauh */}
            <line x1="80" y1="130" x2="80" y2="60" strokeWidth="5" strokeLinecap="round" />
            <line x1="160" y1="125" x2="160" y2="50" strokeWidth="6" strokeLinecap="round" />
            <line x1="380" y1="110" x2="380" y2="45" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="620" y1="120" x2="620" y2="55" strokeWidth="6" strokeLinecap="round" />
            <line x1="880" y1="122" x2="880" y2="48" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="1040" y1="120" x2="1040" y2="60" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* Lapis 2: Pohon Gambut Menghitam Depan (Charred Trees & Snags) */}
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full fill-[#150302] stroke-[#150302]"
          >
            {/* Kontur Tanah Kubah Gambut */}
            <path d="M0,165 Q300,140 600,160 T1200,150 L1200,220 L0,220 Z" />

            {/* Pohon Hangus 1 (Kiri) */}
            <g transform="translate(120, 160)">
              <line x1="0" y1="0" x2="0" y2="-65" strokeWidth="7" strokeLinecap="round" />
              <path d="M0,-35 L-22,-52 M0,-45 L20,-60 M-22,-52 L-30,-68 M20,-60 L28,-75" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* Pohon Hangus 2 (Tengah Kiri) */}
            <g transform="translate(320, 155)">
              <line x1="0" y1="0" x2="0" y2="-75" strokeWidth="8" strokeLinecap="round" />
              <path d="M0,-40 L-25,-60 M0,-52 L24,-70 M-25,-60 L-32,-78" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Pohon Hangus 3 (Tengah Kanan) */}
            <g transform="translate(740, 158)">
              <line x1="0" y1="0" x2="0" y2="-70" strokeWidth="7.5" strokeLinecap="round" />
              <path d="M0,-38 L-20,-56 M0,-48 L22,-68 M22,-68 L30,-84" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Pohon Hangus 4 (Kanan) */}
            <g transform="translate(980, 152)">
              <line x1="0" y1="0" x2="0" y2="-68" strokeWidth="7" strokeLinecap="round" />
              <path d="M0,-36 L-22,-54 M0,-46 L20,-62 M-22,-54 L-28,-70" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Lapisan Asap 1: Asap Tebal Melayang Berkelok (Wispy Drifting Smoke Ribbons) */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="w-[200%] h-full flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="w-1/2 h-full fill-white/14 filter blur-md"
            >
              <path d="M0,160 C220,80 420,230 620,120 C820,20 1020,190 1200,110 L1200,300 L0,300 Z" />
            </svg>
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="w-1/2 h-full fill-white/14 filter blur-md"
            >
              <path d="M0,160 C220,80 420,230 620,120 C820,20 1020,190 1200,110 L1200,300 L0,300 Z" />
            </svg>
          </motion.div>
        </div>

        {/* Lapisan Asap 2: Kabut Asap Pekat di Area Bawah (Ground Smoke Layer) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-stone-950/60 via-orange-950/25 to-transparent backdrop-blur-[2px]"
          animate={{ opacity: [0.6, 0.9, 0.6], y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Partikel Bara Api Melayang Naik Berkelok (Sinuous Rising Flickering Embers) */}
        <div className="absolute inset-0">
          {Array.from({ length: 32 }).map((_, i) => {
            const left = (i * 3.1 + 2) % 97;
            const duration = 3.2 + (i % 6) * 0.85;
            const delay = (i % 7) * 0.38;
            const size = 1.8 + (i % 4) * 0.9;

            const emberPalettes = [
              "bg-amber-300 shadow-[0_0_10px_#f59e0b]",
              "bg-orange-400 shadow-[0_0_12px_#ea580c]",
              "bg-yellow-200 shadow-[0_0_8px_#fde047]",
              "bg-red-400 shadow-[0_0_10px_#ef4444]",
            ];
            const emberColor = emberPalettes[i % emberPalettes.length];

            return (
              <motion.div
                key={`ember-${i}`}
                className={`absolute rounded-full ${emberColor}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  bottom: "-25px",
                }}
                animate={{
                  y: ["0vh", "-115vh"],
                  x: [
                    0,
                    i % 2 === 0 ? 36 : -36,
                    i % 3 === 0 ? -24 : 26,
                    i % 2 === 0 ? 16 : -16,
                  ],
                  opacity: [0, 1, 0.6, 1, 0],
                  scale: [0.6, 1.35, 0.95, 0.4],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
