import { motion } from "motion/react";
import { Link } from "../../router";
import { IssueContent } from "../../data/issuesData";
import { Waves, Mountain, SunMedium, Flame, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface IssueCardProps {
  issue: IssueContent;
  index: number;
}

export default function IssueCard({ issue, index }: IssueCardProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Waves,
    Mountain,
    SunMedium,
    Flame,
  };

  const sceneIconMap: Record<string, string> = {
    banjir: "≈",
    "tanah-longsor": "▲",
    kekeringan: "☼",
    "kebakaran-hutan": "🔥",
  };

  const Icon = iconMap[issue.icon] || Waves;
  const sceneIcon = sceneIconMap[issue.slug] || "✦";

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
      {/* Dynamic Colored Background Corner Accent */}
      <div
        className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${issue.accentBg} rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-300`}
      />

      <div>
        {/* Header Badges with Index & Scene Art */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Index Badge */}
            <span className="font-mono text-xs font-black px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
              0{index + 1}
            </span>

            {/* Icon Art with Scene Symbol */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md p-2.5 relative"
              style={{ backgroundColor: `${issue.themeColor}18`, color: issue.themeColor }}
            >
              <Icon className="w-6 h-6 relative z-10" />
              <span className="absolute -top-1 -right-1 text-xs opacity-75 select-none font-bold">
                {sceneIcon}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: `${issue.themeColor}14`,
                borderColor: `${issue.themeColor}40`,
                color: issue.themeColor,
              }}
            >
              {issue.heroBadge}
            </span>
            <span className="text-[10px] text-slate-400 font-bold mt-1">
              Ancaman: {issue.threatLevel}
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
      <div className="mt-6 pt-4 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
          3 Soal Kuis Interaktif
        </span>
        <Link
          to={`/isu/${issue.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all group-hover:gap-3"
          style={{ backgroundColor: issue.themeColor }}
        >
          <span>Eksplorasi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
