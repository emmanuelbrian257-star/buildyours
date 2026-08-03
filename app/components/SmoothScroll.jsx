// components/ScrollAnimations.tsx
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers/LenisProvider";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker
    const update = (time) => {
      lenis.raf(time * 1000); // GSAP gives seconds, Lenis expects milliseconds
    };
    gsap.ticker.add(update);

    // Disable lag smoothing in GSAP to prevent delayed scroll animations
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return <>{children}</>;
}
