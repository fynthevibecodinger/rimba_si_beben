import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGaspAnimation(rootRef) {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });
      gsap.to(".mountain-far", {
        y: 70,
        scrollTrigger: { trigger: ".eco-hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".mountain-near", {
        y: 35,
        scrollTrigger: { trigger: ".eco-hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.from(".title-mask span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        delay: 0.15,
      });
      gsap.to(".kinetic-word", {
        xPercent: -18,
        scrollTrigger: {
          trigger: ".kinetic-strip",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);
    return () => context.revert();
  }, [rootRef]);
}
