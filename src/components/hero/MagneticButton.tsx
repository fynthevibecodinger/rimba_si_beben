import { motion, useMotionValue, useSpring } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "../../router";

interface MagneticButtonProps {
  to?: string;
  onClick?: () => void;
  label?: string;
  icon?: React.ReactNode;
}

export default function MagneticButton({
  to = "/simulasi",
  onClick,
  label = "Mulai Simulasi Ekosistem",
  icon,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Link
        to={to}
        onClick={onClick}
        className="hero-cta cursor-pointer select-none inline-flex items-center gap-3"
      >
        <span>
          {icon || <Sparkles className="w-4 h-4 text-white animate-spin" />}
        </span>
        <strong className="font-bold text-white text-sm sm:text-base font-['Fredoka']">
          {label}
        </strong>
      </Link>
    </motion.div>
  );
}
