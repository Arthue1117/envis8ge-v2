"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { useHoverCapable } from "@/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

import { cta } from "./data";

const MotionLink = motion.create(Link);

/**
 * Confirmed CTA copy, verbatim (docs/05-content-plan.md Section 2).
 * Section background uses the real `--gradient-accent` (mint→cyan)
 * confirmed on the live site (Phase 3 Visual Fidelity Pass).
 *
 * The button itself was rebuilt from scratch after a reported visual
 * bug: an inline `--gradient-button` background (hard color stop at
 * 30%) rendered as a green "blob" concentrated on the left edge of the
 * pill. That gradient is removed entirely — the button is the shared
 * `buttonVariants` primary style (solid `#02BAF9`, `overflow-hidden` on
 * the shared component now, per this fix), with hover/press motion
 * layered on top via Framer Motion rather than any pseudo-element or
 * background gradient.
 */
export function Cta() {
  const hoverCapable = useHoverCapable();

  return (
    <section
      className="tablet:py-24 py-20"
      style={{ backgroundImage: "var(--gradient-accent)" }}
    >
      <Container>
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-heading tablet:text-4xl text-3xl font-bold text-black">
            {cta.heading}
          </h2>
          <p className="mt-4 text-black/70">{cta.body}</p>
          <div className="mt-8 flex justify-center">
            <MotionLink
              href="/contact-us"
              className={cn(buttonVariants({ size: "lg" }))}
              whileHover={
                hoverCapable
                  ? {
                      y: -4,
                      scale: 1.02,
                      backgroundColor: "#16c0fa",
                      boxShadow: "0 10px 24px rgba(2, 186, 249, 0.35)",
                    }
                  : undefined
              }
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {cta.button}
            </MotionLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
