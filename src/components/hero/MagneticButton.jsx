import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 16 });
  const springY = useSpring(y, { stiffness: 170, damping: 16 });

  return (
    <motion.a
      className="hero-cta"
      href="#solutions"
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
    >
      Jelajahi Solusi Iklim
      <span>
        <ArrowDown />
      </span>
    </motion.a>
  );
}
