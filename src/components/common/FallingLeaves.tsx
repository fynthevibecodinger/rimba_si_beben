import { useEffect, useRef, useState } from "react";

const leafAssets = [
  "/images/Glossy Tropical Green Leaf.svg",
  "/images/Windblown Glossy Green Leaf.svg",
];

const leaves = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  asset: leafAssets[index % leafAssets.length],
  left: `${(index * 31 + 7) % 101}%`,
  size: 30 + (index % 5) * 9,
  duration: 2.8 + (index % 5) * 0.38,
  delay: (index % 6) * 0.12,
  drift: index % 2 === 0 ? 1 : -1,
}));

export default function FallingLeaves() {
  const [fallBurst, setFallBurst] = useState(1);
  const lastScrollY = useRef(0);
  const cooldownUntil = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const canStartBurst = Date.now() >= cooldownUntil.current;

      if (isScrollingDown && canStartBurst) {
        setFallBurst((current) => current + 1);
        cooldownUntil.current = Date.now() + 850;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div key={fallBurst} className={`falling-leaves ${fallBurst > 0 ? "is-falling" : ""}`} aria-hidden="true">
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          src={leaf.asset}
          alt=""
          className="falling-leaf"
          style={
            {
              "--leaf-left": leaf.left,
              "--leaf-size": `${leaf.size}px`,
              "--leaf-duration": `${leaf.duration}s`,
              "--leaf-delay": `${leaf.delay}s`,
              "--leaf-drift": leaf.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
