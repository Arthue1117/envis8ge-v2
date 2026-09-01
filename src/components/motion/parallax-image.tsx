"use client";

import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

import { useParallaxY } from "@/hooks/use-parallax";

/**
 * Shared header/hero parallax image. The image itself is rendered
 * intentionally larger than its visible container (`overscanPercent`
 * taller on each side) and only ever translated within that overscanned
 * margin (`intensityPercent`), so the frame is always fully covered —
 * no gap can appear at the top/bottom edge during scroll regardless of
 * what's behind it. `ref` (from `useParallaxY`) sits on the outer,
 * container-sized box so scroll progress is measured against the header
 * itself, not the oversized image. Falls back to a static position under
 * prefers-reduced-motion (handled inside `useParallaxY`).
 */
export function ParallaxImage({
  overscanPercent = 10,
  intensityPercent = 6,
  className,
  alt,
  ...imageProps
}: {
  overscanPercent?: number;
  intensityPercent?: number;
} & Omit<ImageProps, "fill">) {
  const { ref, y } = useParallaxY<HTMLDivElement>([
    `-${intensityPercent}%`,
    `${intensityPercent}%`,
  ]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, top: `-${overscanPercent}%`, bottom: `-${overscanPercent}%` }}
        className="absolute inset-x-0"
      >
        <Image fill alt={alt} className={className} {...imageProps} />
      </motion.div>
    </div>
  );
}
