"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

import { portfolioPreview } from "./data";

/**
 * Confirmed heading/copy (docs/05-content-plan.md Section 2) plus the
 * real portfolio showcase images and all 40 real client logos from the
 * live site — corrected during the Phase 3 Visual Fidelity Pass; the
 * original build used text-only client name cards with no imagery.
 * Neither the showcase images nor the client logos carry names/alt text
 * on the live site either (no captions, no links) — reproduced the same
 * way here rather than guessing.
 *
 * `container={false}` + a manual `Container` keeps the background
 * `Image` a direct child of the `relative` Section root, per
 * `next/image`'s `fill` requirement (see as-seen-on.tsx for the same fix).
 *
 * The 8 showcase images run as a continuous right-to-left CSS marquee
 * (`.animate-marquee`, globals.css) — CSS keyframes rather than Framer
 * Motion, since a constant-speed infinite loop is lighter done that way.
 * The track is the image list duplicated once and translated -50% for a
 * seamless loop; hover pauses it (touch has no `:hover`, so it keeps
 * running there as required). Falls back to the original static grid
 * when the user prefers reduced motion.
 */
export function PortfolioPreview() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Section
      container={false}
      className="tablet:py-20 desktop:py-24 relative overflow-hidden py-16"
    >
      <Image
        src="/images/backgrounds/pattern-dots.png"
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
            {portfolioPreview.heading}
          </h2>
          <p className="text-muted-foreground mt-4">{portfolioPreview.body}</p>
        </div>

        {reducedMotion ? (
          <div className="tablet:grid-cols-4 mt-10 grid grid-cols-2 gap-4">
            {portfolioPreview.images.map((src) => (
              <Card key={src} className="overflow-hidden p-0">
                <Image
                  src={src}
                  alt=""
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover"
                  sizes="(min-width: 40em) 25vw, 50vw"
                />
              </Card>
            ))}
          </div>
        ) : (
          <div className="marquee-fade mt-10 overflow-hidden">
            <div className="animate-marquee flex w-max gap-4">
              {[...portfolioPreview.images, ...portfolioPreview.images].map(
                (src, i) => (
                  <Card
                    key={`${src}-${i}`}
                    className="tablet:w-64 desktop:w-72 w-56 shrink-0 overflow-hidden p-0"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={600}
                      height={600}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                      sizes="288px"
                    />
                  </Card>
                )
              )}
            </div>
          </div>
        )}

        <h3 className="font-heading text-foreground mt-16 text-center text-sm font-semibold tracking-wide uppercase">
          {portfolioPreview.subheading}
        </h3>

        <div className="tablet:grid-cols-8 mt-6 grid grid-cols-4 items-center gap-6">
          {Array.from({ length: portfolioPreview.clientLogoCount }, (_, i) => (
            <motion.div
              key={i}
              animate={
                reducedMotion
                  ? undefined
                  : { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 0.9,
                      ease: "easeInOut",
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatDelay:
                        portfolioPreview.clientLogoCount * 0.15 - 0.9,
                    }
              }
            >
              <Image
                src={`/images/clients/client-${String(i + 1).padStart(2, "0")}.webp`}
                alt=""
                width={196}
                height={80}
                className="h-auto w-full grayscale"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className={buttonVariants({ variant: "outline" })}
          >
            View Full Portfolio
          </Link>
        </div>
      </Container>
    </Section>
  );
}
