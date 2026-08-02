"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { duration, easing } from "@/lib/motion";

/**
 * Global Animation System — the standard scroll-reveal wrapper
 * (Design System Section 20.5): fades and lifts content in once, the
 * first time it enters the viewport. Use this around any section content
 * that should reveal on scroll, instead of writing bespoke variants
 * per page.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.slow, ease: easing.decelerate, delay }}
    >
      {children}
    </motion.div>
  );
}
