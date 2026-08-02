"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/layout/section";
import { useHoverCapable } from "@/hooks/use-hover-capable";

import { process } from "./data";

/**
 * Confirmed 8-step process, verbatim (docs/05-content-plan.md Section 2).
 * Each step card uses the real `--gradient-accent` background (mint→cyan)
 * confirmed on the live site — corrected during the Phase 3 Visual
 * Fidelity Pass; the original build used plain white/shadow cards.
 *
 * Animation spec (entrance, stagger, spring hover, glow, tap) is specific
 * to this section and implemented locally rather than altering the
 * shared Design System Section 20 tokens other sections rely on. Hover
 * motion is gated behind `useHoverCapable` (no touch-triggered hover);
 * root `MotionConfig reducedMotion="user"` already collapses this to
 * fade-only under reduced motion, so no extra handling is needed here.
 */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Process() {
  const hoverCapable = useHoverCapable();

  return (
    <Section background="muted">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
          {process.heading}
        </h2>
        <p className="text-muted-foreground mt-4">{process.intro}</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.09 }}
        className="tablet:grid-cols-2 desktop:grid-cols-4 mt-12 grid grid-cols-1 items-stretch gap-6"
      >
        {process.steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={cardVariants}
            whileHover={
              hoverCapable
                ? {
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }
                : undefined
            }
            whileTap={{ scale: 0.98 }}
            className="group relative h-full"
          >
            {/* Subtle cyan glow behind the card on hover — opacity-only */}
            <div className="bg-primary/30 absolute inset-0 -z-10 rounded-md opacity-0 blur-xl transition-opacity duration-[220ms] group-hover:opacity-60" />

            <div
              className="group-hover:border-primary relative h-full overflow-hidden rounded-md border border-transparent p-6 transition-[box-shadow,border-color] duration-[220ms] group-hover:shadow-lg"
              style={{ backgroundImage: "var(--gradient-accent)" }}
            >
              {/* "Gradient becomes slightly brighter" — white wash, opacity-only */}
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-[220ms] group-hover:opacity-20" />

              <div className="relative transition-transform duration-[220ms] group-hover:-translate-y-0.5">
                <span className="font-heading inline-block text-3xl font-bold text-black transition-transform duration-[220ms] group-hover:scale-[1.08] group-hover:rotate-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading group-hover:text-primary mt-3 text-lg font-semibold text-black transition-colors duration-[220ms]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-black/70">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
