"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { FadeIn } from "@/components/motion/fade-in";

/**
 * Full-width Contact hero. Background is a literal "how to reach us"
 * graphic — a simplified Singapore map with a location pin at the
 * confirmed office address, plus flat envelope/phone/chat glyphs —
 * rather than the earlier abstract glowing-rings/data-ping composition,
 * which read as decorative "animated tech" rather than anything
 * connected to actually contacting Envis8ge. Same honest construction as
 * the other hero backgrounds: a hand-authored SVG rasterized to a real
 * file, not a fabricated stock photo.
 */
export function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className="tablet:h-[420px] desktop:h-[460px] relative flex h-[320px] items-center overflow-hidden bg-black"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/backgrounds/contact-hero-bg-v2.jpg"
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
          <h1 className="font-heading tablet:text-4xl desktop:text-5xl text-3xl font-bold text-white">
            Let&apos;s Build Something Great Together
          </h1>
          <p className="mt-4 text-white/90">
            Whether you&apos;re launching a campaign, redesigning your website,
            or growing your social media presence, we&apos;d love to hear about
            your project.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
