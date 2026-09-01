"use client";

import { useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { usePrefersReducedMotion } from "./use-reduced-motion";

/**
 * Shared scroll-linked parallax for hero/header images (Design System
 * hero band pattern). `ref` goes on the section/container being tracked;
 * `y` goes on the `motion.div` wrapping the image. Falls back to a fixed,
 * non-animating value under prefers-reduced-motion rather than just a
 * smaller range, per WCAG 2.3.3.
 */
export function useParallaxY<T extends HTMLElement = HTMLDivElement>(
  range: [string, string] = ["0%", "15%"]
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], range);
  const staticY = useMotionValue(range[0]);

  return { ref, y: prefersReducedMotion ? staticY : parallaxY };
}
