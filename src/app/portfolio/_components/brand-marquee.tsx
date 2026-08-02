"use client";

import Image from "next/image";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

import { brandMarqueeHeading } from "../_data/copy";

const CLIENT_LOGO_COUNT = 40;

const logos = Array.from(
  { length: CLIENT_LOGO_COUNT },
  (_, i) => `/images/clients/client-${String(i + 1).padStart(2, "0")}.webp`
);

/**
 * Continuous right-to-left infinite marquee of all 40 real client logos
 * (public/images/clients/), reusing the same `.animate-marquee` CSS
 * keyframe utility (globals.css) established for the Home page's
 * Portfolio Preview — a constant-speed infinite loop is lighter as pure
 * CSS than Framer Motion. The track is the logo list duplicated once and
 * translated -50%, so the loop is seamless with no jump or gap. Hover
 * pauses it via `animation-play-state` (no-op on touch, which has no
 * `:hover`, so it keeps running there as required); reduced-motion users
 * get the same logos in a static wrapping grid instead.
 */
export function BrandMarquee() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div>
      <h2 className="font-heading text-foreground text-center text-sm font-semibold tracking-wide uppercase">
        {brandMarqueeHeading}
      </h2>

      {reducedMotion ? (
        <div className="tablet:grid-cols-8 mt-6 grid grid-cols-4 items-center gap-6">
          {logos.map((src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={220}
              height={100}
              className="h-auto w-full opacity-70 grayscale transition-opacity duration-150 hover:opacity-100"
            />
          ))}
        </div>
      ) : (
        <div className="marquee-fade mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[...logos, ...logos].map((src, i) => (
              <Image
                key={`${src}-${i}`}
                src={src}
                alt=""
                width={200}
                height={80}
                loading="lazy"
                className="h-16 w-auto shrink-0 opacity-70 grayscale transition-opacity duration-150 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
