import { useEffect, useRef } from "react";
import { useRouter } from "../../router";

const leafAssets = [
  "/images/Glossy Tropical Green Leaf.svg",
  "/images/Windblown Glossy Green Leaf.svg",
];

const leaves = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  asset: leafAssets[index % leafAssets.length],
  left: `${(index * 31 + 7) % 101}%`,
  size: 30 + (index % 5) * 9,
  duration: 2.8 + (index % 5) * 0.38,
  delay: (index % 6) * 0.12,
  drift: index % 2 === 0 ? 1 : -1,
}));

const SCROLL_DISTANCE_THRESHOLD = 700;

export default function FallingLeaves() {
  const { path } = useRouter();
  const scrollLeavesEnabled = path !== "/simulasi" && !path.startsWith("/isu/");
  const leavesRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const downwardDistance = useRef(0);
  const scrollBurstTriggered = useRef(false);

  useEffect(() => {
    const leavesElement = leavesRef.current;
    if (!leavesElement) return;

    const triggerBurst = () => {
      leavesElement.classList.remove("is-falling");
      void leavesElement.offsetWidth;
      leavesElement.classList.add("is-falling");
    };

    triggerBurst();
    lastScrollY.current = window.scrollY;
    downwardDistance.current = 0;
    scrollBurstTriggered.current = false;

    if (!scrollLeavesEnabled) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const isScrollingDown = scrollDelta > 0;

      if (isScrollingDown) {
        downwardDistance.current += scrollDelta;
      } else if (scrollDelta < 0) {
        downwardDistance.current = 0;
      }

      if (
        downwardDistance.current >= SCROLL_DISTANCE_THRESHOLD &&
        !scrollBurstTriggered.current
      ) {
        triggerBurst();
        downwardDistance.current = 0;
        scrollBurstTriggered.current = true;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path, scrollLeavesEnabled]);

  return (
    <div ref={leavesRef} className="falling-leaves" aria-hidden="true">
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
