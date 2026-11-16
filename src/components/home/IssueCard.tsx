import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "../../router";
import { IssueContent } from "../../data/issuesData";
import {
  CloudRainWind,
  DropletOff,
  FlameKindling,
  Waves,
  Mountain,
  SunMedium,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import LandslideIcon from "../icons/LandslideIcon";

interface IssueCardProps {
  issue: IssueContent;
  index: number;
}

export default function IssueCard({ issue, index }: IssueCardProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // Ikon baru yang lebih cocok & merepresentasikan bencana
    CloudRainWind,
    Landslide: LandslideIcon,
    DropletOff,
    FlameKindling,
    // Kompatibilitas mundur
    Waves,
    Mountain,
    SunMedium,
    Flame,
  };

  const sceneIconMap: Record<string, string> = {
    banjir: "🌧",
    "tanah-longsor": "⚠️",
    kekeringan: "💧",
    "kebakaran-hutan": "🔥",
  };

  const Icon = iconMap[issue.icon] || Waves;
  const sceneIcon = sceneIconMap[issue.slug] || "✦";

  // Wadah foto bencana nyata:
  // 1. Target utama membaca file lokal: /images/disasters/[slug].jpg
  // 2. Jika file lokal belum ada, otomatis menggunakan foto dokumentasi riil resolusi tinggi (fallback)
  const localPhotoPath = issue.realPhoto?.src || `/images/disasters/${issue.slug}.jpg`;
  const fallbackUrl = issue.realPhoto?.fallbackSrc || "";

  const [imgSrc, setImgSrc] = useState<string>(localPhotoPath);
  const [isFallbackActive, setIsFallbackActive] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const handleImageError = () => {
    if (!isFallbackActive && fallbackUrl) {
      setIsFallbackActive(true);
      setImgSrc(fallbackUrl);
    } else {
      setImgError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* =========================================================================
          WADAH SEPEREMPAT LINGKARAN (QUARTER CIRCLE) FOTO BENCANA NYATA
          Lokasi file lokal: public/images/disasters/[nama-file].jpg
          Nama file yang langsung dipanggil:
          - banjir:           /images/disasters/banjir.jpg
          - tanah-longsor:    /images/disasters/tanah-longsor.jpg
          - kekeringan:       /images/disasters/kekeringan.jpg
          - kebakaran-hutan:  /images/disasters/kebakaran-hutan.jpg
         ========================================================================= */}
      <div
        className="absolute top-0 right-0 w-36 h-36 sm:w-40 sm:h-40 rounded-bl-full overflow-hidden border-b-2 border-l-2 border-white/90 shadow-md z-0 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
        title={`Wadah foto nyata: ${localPhotoPath}`}
      >
        {!imgError ? (
          <img
            src={imgSrc}
            alt={issue.realPhoto?.alt || `Dokumentasi nyata ${issue.title}`}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-115"
          />
        ) : (
          /* Placeholder informatif jika file lokal belum ada dan offline */
          <div
            className={`w-full h-full bg-gradient-to-bl ${issue.accentBg} flex flex-col items-center justify-center p-3 text-center`}
          >
            <ImageIcon className="w-6 h-6 opacity-40 text-slate-700 mb-1" />
            <span className="text-[9px] font-bold text-slate-600 leading-tight">
              {issue.slug}.jpg
            </span>
          </div>
        )}

        {/* Lapisan bayangan & gradasi sinematik agar foto berpadu mewah dengan kartu */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

        {/* Tint halus warna tema pada sudut */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-color"
          style={{ backgroundColor: issue.themeColor }}
        />

        {/* Lencana kecil penanda foto riil / dokumentasi nyata */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-black/65 backdrop-blur-xs text-[9px] font-black tracking-wider uppercase text-white px-2 py-0.5 rounded-full shadow-xs border border-white/20 select-none">
          <Camera className="w-2.5 h-2.5 text-amber-300" />
          <span>Foto Riil</span>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header Badges with Index, Optimized Icon, & Frosted Right Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Index Badge */}
            <span className="font-mono text-xs font-black px-2 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-600 border border-slate-200/80 shadow-xs">
              0{index + 1}
            </span>

            {/* Icon Art with Scene Symbol */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md p-2.5 relative border border-white/60 backdrop-blur-xs transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${issue.themeColor}18`, color: issue.themeColor }}
            >
              <Icon className="w-6 h-6 relative z-10" />
              <span className="absolute -top-1 -right-1 text-xs opacity-75 select-none font-bold">
                {sceneIcon}
              </span>
            </div>
          </div>

          {/* Badges mengambang elegan dengan efek kaca (frosted glass) di atas foto sudut */}
          <div className="flex flex-col items-end">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                borderColor: `${issue.themeColor}50`,
                color: issue.themeColor,
              }}
            >
              {issue.heroBadge}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-700 mt-1 shadow-xs border border-white/80">
              Ancaman: <strong style={{ color: issue.themeColor }}>{issue.threatLevel}</strong>
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] group-hover:text-emerald-800 transition-colors">
          {issue.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2 leading-relaxed">
          {issue.sections.causeAndEffect.description}
        </p>

        {/* Quick Highlights */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{issue.sections.studentActions[0]?.title}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{issue.sections.greenTechTrivia.techName}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 flex items-center justify-between relative z-10">
        <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
          3 Soal Kuis Interaktif
        </span>
        <Link
          to={`/isu/${issue.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all group-hover:gap-3 cursor-pointer"
          style={{ backgroundColor: issue.themeColor }}
        >
          <span>Eksplorasi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
