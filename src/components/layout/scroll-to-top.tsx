"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useScrolled } from "@/hooks/use-scrolled";
import { duration, easing } from "@/lib/motion";

/**
 * Fixed button that appears once the page has scrolled, per your Phase 2
 * requirements. Fade/scale entrance and exit use the Design System
 * Section 20.2/20.3 tokens; respects reduced motion automatically via the
 * root MotionConfig (Design System Section 20.8).
 */
export function ScrollToTop() {
  const visible = useScrolled(400);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: duration.fast, ease: easing.standard }}
          className="bg-primary text-primary-foreground rounded-pill fixed right-6 bottom-6 z-30 inline-flex size-11 items-center justify-center shadow-md"
        >
          <ArrowUp aria-hidden className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
