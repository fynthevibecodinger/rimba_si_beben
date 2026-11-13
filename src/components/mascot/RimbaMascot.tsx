import { motion } from "motion/react";

export type RimbaMood = "idle" | "wave" | "celebrate" | "scan" | "alert" | "think";

interface RimbaMascotProps {
  mood?: RimbaMood;
  className?: string;
  speech?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function RimbaMascot({
  mood = "idle",
  className = "",
  speech,
  size = "md",
}: RimbaMascotProps) {
  // Dimension presets
  const sizeMap = {
    sm: "w-28 h-28",
    md: "w-44 h-48",
    lg: "w-64 h-72",
    xl: "w-80 h-96",
  };

  const getAnimation = () => {
    switch (mood) {
      case "celebrate":
        return { y: [0, -18, 0], rotate: [0, -4, 4, 0] };
      case "alert":
        return { scale: [1, 1.04, 1], y: [0, -6, 0] };
      case "think":
        return { rotate: [0, 3, -3, 0], y: [0, -3, 0] };
      case "scan":
        return { x: [0, 8, -8, 0] };
      case "wave":
      default:
        return { y: [0, -6, 0] };
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Dynamic Speech Bubble if speech is provided */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-3 max-w-xs rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl border-2 border-emerald-800/10 text-xs md:text-sm font-medium text-emerald-950 backdrop-blur-md relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white/95"
        >
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-[11px] uppercase tracking-wider mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Rimba si Eco-Ranger
          </div>
          <p className="leading-snug text-slate-700">{speech}</p>
        </motion.div>
      )}

      <motion.div
        className={`relative ${sizeMap[size]}`}
        animate={getAnimation()}
        transition={{
          duration: mood === "celebrate" ? 0.8 : mood === "alert" ? 1.2 : 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-label="Rimba, maskot burung rangkong penjaga alam"
      >
        <svg viewBox="0 0 360 390" className="w-full h-full drop-shadow-md" role="img">
          <title>Rimba si Burung Rangkong Edukator</title>
          {/* Ground soft shadow */}
          <ellipse cx="184" cy="361" rx="104" ry="16" fill="#153B2D" opacity=".14" />

          <motion.g
            animate={mood === "scan" ? { rotate: [0, 3, 0, -3, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ transformOrigin: "180px 220px" }}
          >
            {/* Tail and Body */}
            <path d="M118 264 65 347l63-34 18 46 19-91Z" fill="#173B30" />
            <path d="m124 288-37 52 46-23Z" fill="#F5E7C6" />
            <ellipse cx="178" cy="264" rx="84" ry="90" fill="#253D37" />
            <ellipse cx="179" cy="268" rx="59" ry="71" fill="#F6F0DB" />

            {/* Eco Vest */}
            <path
              d="M112 233c16-24 43-34 67-34 27 0 54 11 70 37l-12 93c-38 20-78 20-116 0Z"
              fill="#2D6A4F"
              stroke="#184937"
              strokeWidth="6"
            />
            <path d="M179 205v130M129 235l50 31 51-31" fill="none" stroke="#52B788" strokeWidth="7" />
            <path d="M145 271h27v24h-27zM189 271h27v24h-27z" fill="#1B4332" rx="5" />
            <circle cx="179" cy="257" r="6" fill="#F2C94C" />

            {/* Head */}
            <ellipse cx="170" cy="139" rx="77" ry="73" fill="#263E38" />
            <path d="M128 111c-17 31-11 66 17 86 30 2 51-13 62-39-7-31-36-53-79-47Z" fill="#FAF6E9" />

            {/* Hornbill beak, long and down-curved */}
            <path
              d="M170 130c43-27 105-19 149 8-32 8-59 27-95 51-28 19-55 4-50-23Z"
              fill="#E9A43B"
              stroke="#7A4938"
              strokeLinejoin="round"
              strokeWidth="6"
            />
            <path d="M177 153c45-5 91-2 129-13-28 12-52 31-83 49-24 14-43 4-48-10Z" fill="#F5C354" />

            {/* Casque, species-defining upper bill feature */}
            <path
              d="M176 126c30-36 82-43 111-9-39-3-67 8-93 25Z"
              fill="#D88732"
              stroke="#7A4938"
              strokeLinejoin="round"
              strokeWidth="6"
            />
            <path d="M195 122c20-17 46-22 65-14-21 2-38 8-55 19Z" fill="#F5C354" />

            {/* Eye and blink */}
            <motion.g
              animate={mood === "alert" ? { scale: 1.15 } : { scaleY: [1, 1, 0.08, 1, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.43, 0.46, 0.49, 1] }}
              style={{ transformOrigin: "158px 133px" }}
            >
              <circle cx="158" cy="133" r="14" fill="#173B30" />
              <circle cx="153" cy="128" r="4" fill="white" />
            </motion.g>
            <circle cx="134" cy="161" r="11" fill="#EFA88B" opacity=".5" />

            {/* Explorer Hat */}
            <path d="M104 101c26-16 86-25 126-4l-10 16c-39-12-77-8-111 4Z" fill="#8D5B4C" />
            <path
              d="M126 93c1-48 70-58 87-3l-6 13c-31-10-56-8-81 2Z"
              fill="#B9825F"
              stroke="#684437"
              strokeWidth="5"
            />
            <path d="M125 86c29 8 59 7 88-1l-1 14c-31 8-58 8-87 1Z" fill="#2D6A4F" />
            <path d="M184 74c10-8 21-11 34-7-8 12-18 19-32 20Z" fill="#52B788" />

            {/* Waving Wing */}
            <motion.g
              animate={
                mood === "wave" || mood === "celebrate"
                  ? { rotate: [0, -22, 10, -22, 0] }
                  : { rotate: [0, -3, 0] }
              }
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ transformOrigin: "117px 239px" }}
            >
              <path
                d="M121 239c-33-9-59-30-67-58-14 18-4 51 15 68-24-6-34-2-39 9 23 20 61 25 91 4Z"
                fill="#263E38"
              />
              <path
                d="M55 181c-8-13-15-20-25-22M68 249c-19 4-29 10-34 21"
                fill="none"
                stroke="#263E38"
                strokeLinecap="round"
                strokeWidth="13"
              />
            </motion.g>

            {/* Tablet Wing */}
            <path
              d="M238 244c20 9 29 28 24 49"
              fill="none"
              stroke="#263E38"
              strokeLinecap="round"
              strokeWidth="25"
            />
            <motion.g animate={mood === "scan" ? { y: [0, -5, 0] } : {}}>
              <rect
                x="217"
                y="245"
                width="89"
                height="74"
                rx="12"
                fill="#183E38"
                stroke="#0F2824"
                strokeWidth="6"
              />
              <rect x="225" y="253" width="73" height="50" rx="7" fill="#C9F8E2" />
              <path d="m262 261-11 18 11 15 12-15Z" fill="#10B981" />
              <path
                d="M262 263c-1 14-3 20-9 27M261 278l9-8"
                fill="none"
                stroke="#F2FFF8"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M232 309h30M268 309h22"
                stroke="#52B788"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle cx="262" cy="311" r="3" fill="#10B981" />
            </motion.g>

            {/* Feet */}
            <path
              d="M149 337v23M211 337v23M130 364h40M191 364h40"
              fill="none"
              stroke="#D99A3C"
              strokeLinecap="round"
              strokeWidth="13"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
