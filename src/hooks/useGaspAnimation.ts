import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGaspAnimation(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      // Reveal animations for marked sections
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          }
        );
      });

      // Parallax mountains
      gsap.to(".mountain-far", {
        y: 65,
        scrollTrigger: { trigger: ".eco-hero", start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.to(".mountain-near", {
        y: 30,
        scrollTrigger: { trigger: ".eco-hero", start: "top top", end: "bottom top", scrub: 1 },
      });

      // Staggered title mask slide-up reveal
      gsap.from(".title-mask span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.15,
      });
    }, rootRef);

    return () => context.revert();
  }, [rootRef]);
}
