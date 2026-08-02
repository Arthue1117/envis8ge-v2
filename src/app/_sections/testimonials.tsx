"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { testimonials } from "./data";

/**
 * Confirmed testimonials, verbatim (docs/05-content-plan.md Section 2) —
 * all 6 real client quotes, names, titles, and companies. Manually
 * controlled carousel (no autoplay) per accessibility best practice —
 * autoplaying content is a WCAG 2.2.2 concern. Crossfade transition per
 * Design System Section 20 ("Testimonial carousel transitions"). Subtle
 * background photo added during the Phase 3 Visual Fidelity Pass,
 * matching the real low-opacity background image confirmed on the live
 * site behind this section.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials.items[index];

  function go(delta: number) {
    setIndex(
      (current) =>
        (current + delta + testimonials.items.length) %
        testimonials.items.length
    );
  }

  return (
    <Section
      container={false}
      className="tablet:py-20 desktop:py-24 relative overflow-hidden py-16"
    >
      <Image
        src="/images/backgrounds/testimonials-bg.jpeg"
        alt=""
        fill
        className="object-cover opacity-[0.06]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            {testimonials.label}
          </span>
          <h2 className="font-heading text-foreground tablet:text-4xl mt-2 text-3xl font-bold">
            {testimonials.heading}
          </h2>
          <p className="text-muted-foreground mt-4">{testimonials.intro}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.base, ease: easing.standard }}
                className="text-center"
              >
                <Quote aria-hidden className="text-primary mx-auto size-8" />
                <blockquote className="text-foreground tablet:text-xl mt-4 text-lg">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-heading text-foreground font-semibold">
                    {item.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {item.title}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {item.company}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="text-foreground hover:text-primary inline-flex size-10 items-center justify-center transition-colors duration-150"
            >
              <ChevronLeft aria-hidden />
            </button>

            <div className="flex gap-2">
              {testimonials.items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "rounded-pill size-2 transition-colors duration-150",
                    i === index ? "bg-primary" : "bg-neutral-300"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="text-foreground hover:text-primary inline-flex size-10 items-center justify-center transition-colors duration-150"
            >
              <ChevronRight aria-hidden />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
