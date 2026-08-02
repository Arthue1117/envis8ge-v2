"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { FadeIn } from "@/components/motion/fade-in";

import { portfolioHero } from "../_data/copy";

/**
 * Confirmed "Our Works" heading + subheading (_data/copy.ts), same
 * fixed-height dark hero band pattern as BlogHero. Reuses the same
 * background image as the Blog/Contact heroes
 * (public/images/backgrounds/blog-hero-bg.jpg) rather than a bespoke
 * graphic per page, so the dark hero band reads as one consistent,
 * aligned treatment across Portfolio/Blog/Contact instead of three
 * different one-off designs.
 */
export function PortfolioHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="tablet:h-[420px] desktop:h-[460px] relative flex h-[300px] items-center overflow-hidden bg-black"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/backgrounds/blog-hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="tablet:px-6 relative mx-auto w-full max-w-[1200px] px-4">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading tablet:text-4xl text-3xl font-bold text-white">
            {portfolioHero.heading}
          </h1>
          <p className="mt-3 text-white/90">{portfolioHero.body}</p>
        </FadeIn>
      </div>
    </section>
  );
}
