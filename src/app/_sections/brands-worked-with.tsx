"use client";

import Image from "next/image";

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

import { brandLogos } from "./data";

const logoCardClass =
  "tablet:h-28 tablet:w-[204px] relative flex h-24 w-[168px] shrink-0 items-center justify-center p-4";

function LogoCard({ logo }: { logo: (typeof brandLogos)[number] }) {
  return (
    <Card className={logoCardClass}>
      <div className="relative h-full w-full">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="(min-width: 640px) 204px, 168px"
          className="object-contain"
        />
      </div>
    </Card>
  );
}

/**
 * "Brands we've worked with" — the real, in-color client-logo artwork
 * from https://shawnyeodigital.com/agency/ (see `brandLogos` in
 * ./data.ts for the sourcing note), NOT the site's own earlier
 * grayscale client-logo grid. Each logo sits in a standard Envis8ge
 * `Card` (rounded-md, shadow-sm) at its native aspect ratio via
 * `object-contain` — the 41 logos span very different proportions
 * (e.g. a square icon vs. an ultra-wide wordmark), so a fixed
 * width/height box with `object-contain` shows each exactly as
 * downloaded, undistorted, rather than stretching them to a uniform
 * ratio. Card size is ~17% larger than the original pass (mobile
 * 80×144 → 96×168, tablet 96×176 → 112×204) per correction, for
 * legibility.
 *
 * Its own full-width `bg-primary` (the site's brand cyan, `#02baf9`)
 * section — a request to color "the entire section," not just behind
 * individual logos, so this is no longer a plain fragment nested inside
 * `AgencyServices`'s shared muted `Section`; it renders its own
 * full-bleed band between two muted `Section`s (see agency-services.tsx),
 * matching the same padding scale (`tablet:py-20 desktop:py-24 py-16`)
 * as the shared `Section` component for visual consistency, and reusing
 * the same `Container` for content width. Logo cards keep their white
 * `bg-card` background untouched, so they stay clearly visible against
 * the cyan backdrop; heading text stays `text-foreground` (black),
 * which has strong contrast against this cyan (~11:1).
 *
 * Right-to-left continuous marquee — same keyframes as the Portfolio
 * Preview image marquee this replaced, at a slower pace of its own
 * (`.animate-marquee-brands`, globals.css, kept separate from the
 * shared `.animate-marquee` class since that one is also used by the
 * Portfolio page's brand marquee): the track is the logo list
 * duplicated once and translated -50% for a seamless loop; hover
 * pauses it. `overflow-hidden` on the wrapper keeps it clipped to the
 * section's normal container width, so it never causes page overflow.
 * Falls back to a static wrapped row — same cards, no motion — when
 * the user prefers reduced motion.
 */
export function BrandsWorkedWith() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="tablet:py-20 desktop:py-24 bg-primary-tint/40 py-16">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
            Brands we&apos;ve worked with
          </h2>
        </FadeIn>

        {reducedMotion ? (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {brandLogos.map((logo) => (
              <LogoCard key={logo.src} logo={logo} />
            ))}
          </div>
        ) : (
          <div className="marquee-fade mt-10 overflow-hidden">
            <div className="animate-marquee-brands flex w-max gap-4">
              {[...brandLogos, ...brandLogos].map((logo, i) => (
                <LogoCard key={`${logo.src}-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
