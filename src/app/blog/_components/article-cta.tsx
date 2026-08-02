"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { useHoverCapable } from "@/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * Blog Plan Section 3.8 — reuses the Home page CTA's confirmed visual
 * pattern and button treatment (see `_sections/cta.tsx`) rather than a
 * new CTA style, with the article's own approved CTA copy verbatim.
 */
export function ArticleCta({
  heading,
  body,
  buttonText,
  href,
}: {
  heading: string;
  body: string;
  buttonText: string;
  href: string;
}) {
  const hoverCapable = useHoverCapable();

  return (
    <FadeIn>
      <div
        className="rounded-md p-8 text-center"
        style={{ backgroundImage: "var(--gradient-accent)" }}
      >
        <h2 className="font-heading tablet:text-3xl text-2xl font-bold text-black">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-black/70">{body}</p>
        <div className="mt-6 flex justify-center">
          <MotionLink
            href={href}
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
            {buttonText}
          </MotionLink>
        </div>
      </div>
    </FadeIn>
  );
}
