import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGaspAnimation(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
     if (!rootRef.current) return;

     const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      // Reveal animations for marked sections
       gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
           { y: reduceMotion ? 0 : 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
             duration: reduceMotion ? 0.2 : 0.8,
             delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.2),
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          }
        );
      });

       // Staggered title mask slide-up reveal
       if (reduceMotion) return;

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
