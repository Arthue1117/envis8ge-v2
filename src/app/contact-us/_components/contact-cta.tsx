"use client";

import { motion } from "framer-motion";

import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { useHoverCapable } from "@/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const MotionButton = motion.create("button");

/**
 * Reuses the same gradient CTA pattern as the Home page and Blog article
 * CTAs (docs/03-design-system.md `--gradient-accent`) rather than a new
 * style. "Book a Consultation" has no confirmed external booking tool
 * (e.g. Calendly) anywhere in the locked docs, so it scrolls to the
 * contact form on this same page instead of linking somewhere invented.
 */
export function ContactCta() {
  const hoverCapable = useHoverCapable();

  return (
    <FadeIn>
      <div
        className="tablet:p-12 rounded-md p-8 text-center"
        style={{ backgroundImage: "var(--gradient-accent)" }}
      >
        <h2 className="font-heading tablet:text-3xl text-2xl font-bold text-black">
          Ready to grow your brand?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-black/70">
          Let&apos;s discuss how Envis8ge can help you achieve your marketing
          goals.
        </p>
        <div className="mt-6 flex justify-center">
          <MotionButton
            type="button"
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
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
            Book a Consultation
          </MotionButton>
        </div>
      </div>
    </FadeIn>
  );
}
