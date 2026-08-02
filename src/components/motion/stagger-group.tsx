"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp, staggerContainer } from "@/lib/motion";

/**
 * Global Animation System — wraps a grid of children (Services, Portfolio,
 * Blog cards) so they reveal with a 50–100ms stagger instead of animating
 * simultaneously (Design System Section 20.5). Wrap each child in
 * `<StaggerItem>` or apply `fadeInUp` variants directly.
 */
export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
