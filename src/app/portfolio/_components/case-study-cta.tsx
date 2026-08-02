"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { useHoverCapable } from "@/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * Proposed microcopy (docs/05-content-plan.md — new UI microcopy is
 * Proposed during build, not a customer-facing claim) framed generically
 * rather than referencing this project's own results, since those are
 * still CONTENT_PENDING. Same button motion spec as the sitewide `Cta`
 * (Home _sections/cta.tsx) for visual consistency.
 */
export function CaseStudyCTA() {
  const hoverCapable = useHoverCapable();

  return (
    <div
      className="rounded-lg px-8 py-12 text-center"
      style={{ backgroundImage: "var(--gradient-accent)" }}
    >
      <FadeIn>
        <h2 className="font-heading tablet:text-3xl text-2xl font-bold text-black">
          Let&apos;s build your next success story
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-black/70">
          Tell us about your brand and goals — we&apos;ll get back to you with
          how we can help.
        </p>
        <div className="mt-6 flex justify-center">
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
            Contact Us!
          </MotionLink>
        </div>
      </FadeIn>
    </div>
  );
}
