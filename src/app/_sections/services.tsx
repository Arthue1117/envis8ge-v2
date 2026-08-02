"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHoverCapable } from "@/hooks/use-hover-capable";

import { services } from "./data";

/**
 * Confirmed 6-category service list (docs/05-content-plan.md Section 2),
 * using the real per-category icon images from the live site
 * (public/images/services/) — corrected during the Phase 3 Visual
 * Fidelity Pass; the original build used generic Lucide icons instead.
 *
 * Animation spec for this section only (title 0.7s fade+slide, cards
 * 0.55s stagger reveal at 30px, spring hover lift/scale/icon-rotate) is
 * intentionally more specific than the shared Design System Section 20
 * tokens (`lib/motion.ts`) and implemented locally rather than changing
 * those shared values, which other sections still rely on. Hover motion
 * is gated behind `useHoverCapable` so it never fires from a touch tap;
 * `MotionConfig reducedMotion="user"` (root Providers) already collapses
 * all transform-based motion here to fade-only when the user has
 * requested reduced motion, so no extra handling is needed for that.
 */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Services() {
  const hoverCapable = useHoverCapable();

  return (
    <Section background="muted">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-heading text-foreground tablet:text-4xl text-center text-3xl font-bold"
      >
        {services.heading}
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
        className="tablet:grid-cols-2 desktop:grid-cols-3 mt-12 grid grid-cols-1 gap-6"
      >
        {services.items.map((service) => (
          <motion.div
            key={service.category}
            variants={cardVariants}
            whileHover={
              hoverCapable
                ? {
                    y: -7,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }
                : undefined
            }
            className="group h-full"
          >
            <Card className="border-primary/0 hover:border-primary h-full border transition-[box-shadow,border-color] duration-[220ms] hover:shadow-lg">
              <CardHeader>
                <Image
                  src={service.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="size-14 transition-transform duration-[220ms] ease-out group-hover:scale-[1.08] group-hover:rotate-3"
                />
                <CardTitle className="capitalize">
                  {service.category.toLowerCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
