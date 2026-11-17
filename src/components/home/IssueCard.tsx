import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "../../router";
import { IssueContent } from "../../data/issuesData";
import { useLanguage } from "../../context/LanguageContext";
import {
  CloudRainWind,
  DropletOff,
  FlameKindling,
  Waves,
  Mountain,
  SunMedium,
  Flame,
  ArrowRight,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import LandslideIcon from "../icons/LandslideIcon";

interface IssueCardProps {
  issue: IssueContent;
  index: number;
}

export default function IssueCard({ issue, index }: IssueCardProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    CloudRainWind,
    Landslide: LandslideIcon,
    DropletOff,
    FlameKindling,
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

  const getThreatLabel = (threat: string) => {
    if (!isEn) return threat;
    switch (threat) {
      case "Sangat Tinggi":
        return "Very High";
      case "Tinggi":
        return "High";
      case "Kritis":
        return "Critical";
      case "Sedang":
        return "Moderate";
      default:
        return threat;
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
      className="group rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      <div
        className="relative w-full h-28 sm:h-32 overflow-hidden border-b border-slate-200/70 z-0 pointer-events-none transition-transform duration-500 ease-out"
        title={`Wadah foto nyata: ${localPhotoPath}`}
      >
        {!imgError ? (
          <img
            src={imgSrc}
            alt={issue.realPhoto?.alt || (isEn ? `Documentation of ${issue.title}` : `Dokumentasi nyata ${issue.title}`)}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-bl ${issue.accentBg} flex flex-col items-center justify-center p-3 text-center`}
          >
            <ImageIcon className="w-6 h-6 opacity-40 text-slate-700 mb-1" />
            <span className="text-[9px] font-bold text-slate-600 leading-tight">
              {issue.slug}.jpg
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-color"
          style={{ backgroundColor: issue.themeColor }}
        />

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-black/65 backdrop-blur-xs text-[9px] font-black tracking-wider uppercase text-white px-2 py-0.5 rounded-full shadow-xs border border-white/20 select-none">
          <Camera className="w-2.5 h-2.5 text-amber-300" />
          <span>{isEn ? "Real Photo" : "Foto Riil"}</span>
        </div>
      </div>

      <div className="relative z-10 p-5 sm:p-6 flex-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md p-2 relative border border-white/60 backdrop-blur-xs transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${issue.themeColor}18`, color: issue.themeColor }}
            >
              <Icon className="w-5 h-5 relative z-10" />
              <span className="absolute -top-1 -right-1 text-xs opacity-75 select-none font-bold">
                {sceneIcon}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span
              className="text-[9px] font-black uppercase tracking-wide text-right px-2 py-1 rounded-full border shadow-xs backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                borderColor: `${issue.themeColor}50`,
                color: issue.themeColor,
              }}
            >
              {issue.heroBadge}
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-700 mt-1 shadow-xs border border-white/80">
              {isEn ? "Threat: " : "Ancaman: "}
              <strong style={{ color: issue.themeColor }}>{getThreatLabel(issue.threatLevel)}</strong>
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black leading-tight text-slate-900 font-['Fredoka'] group-hover:text-emerald-800 transition-colors">
          {issue.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
          {issue.sections.causeAndEffect.description}
        </p>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex items-center justify-end relative z-10 gap-3">
        <Link
          to={`/isu/${issue.slug}`}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all group-hover:gap-3 cursor-pointer shrink-0"
          style={{ backgroundColor: issue.themeColor }}
        >
          <span>{isEn ? "Explore" : "Eksplorasi"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
