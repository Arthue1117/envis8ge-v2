"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { FadeIn } from "@/components/motion/fade-in";

/**
 * Full-width Blog hero. Deliberately distinct from the Home hero's
 * Singapore skyline photo, per explicit request — uses a bespoke
 * abstract composition instead (public/images/backgrounds/blog-hero-bg.jpg,
 * dark navy/cyan with a subtle data-network motif, built the same
 * honest way as the article's featured image: a hand-authored SVG
 * rasterized to a real file, not a fabricated stock photo of a
 * "workspace" or "team collaboration" scene). Fixed height band
 * (~440px desktop, ~280px mobile) rather than the Home hero's larger
 * proportions, with an explicit dark overlay + soft vignette for text
 * contrast and a subtle scroll-linked parallax on the background.
 */
export function BlogHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="tablet:h-[400px] desktop:h-[440px] relative flex h-[280px] items-center overflow-hidden bg-black"
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

      {/* Dark overlay (Design System-consistent black, ~40%) + soft vignette for text legibility */}
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
            Blog
          </h1>
          <span className="text-primary-tint mt-3 block text-sm font-semibold tracking-wide uppercase">
            Insights, Strategies &amp; Marketing Guides
          </span>
          <p className="mt-3 text-white/90">
            Actionable articles about Social Media Marketing, Meta Ads, Content
            Strategy, Website Design and Digital Marketing in Singapore.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
