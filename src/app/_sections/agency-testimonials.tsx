"use client";

import Image from "next/image";

import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

import { agencyTestimonials, googleReviews } from "./data";

function ReviewCard({ review }: { review: (typeof googleReviews)[number] }) {
  return (
    <Card className="tablet:h-36 desktop:h-40 flex h-28 shrink-0 items-center p-3">
      <Image
        src={review.src}
        alt={review.alt}
        width={review.width}
        height={review.height}
        className="h-full w-auto"
        sizes="400px"
      />
    </Card>
  );
}

/**
 * "What Clients Say" — continuous right-to-left marquee of the real
 * Google review screenshots (see `googleReviews` in ./data.ts for the
 * sourcing note), per the boss's design-refinement request replacing the
 * earlier manual/click-through single-slide carousel. Same technique as
 * `BrandsWorkedWith`'s logo marquee: the track is the review list
 * duplicated once and translated -50% via the shared `marquee` CSS
 * keyframes (globals.css) for a seamless loop, own slower
 * `.animate-marquee-testimonials` duration tuned for these wider cards.
 * Each card keeps a fixed height with the image's real aspect ratio
 * preserved (`h-full w-auto`, no cropping) — these are genuine cropped
 * screenshots of varying proportions, not a uniform design asset, so
 * "consistent card sizing" means a consistent height/rhythm rather than
 * forcing every screenshot to the same width. Falls back to a static
 * wrapped grid, no motion, under prefers-reduced-motion. Hover pauses
 * the animation (`.animate-marquee-testimonials:hover`, globals.css).
 */
export function AgencyTestimonials() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Section background="tint">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
          {agencyTestimonials.heading}
        </h2>
      </div>

      {reducedMotion ? (
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {googleReviews.map((review) => (
            <ReviewCard key={review.src} review={review} />
          ))}
        </div>
      ) : (
        <div className="marquee-fade mt-10 overflow-hidden">
          <div className="animate-marquee-testimonials flex w-max gap-4">
            {[...googleReviews, ...googleReviews].map((review, i) => (
              <ReviewCard key={`${review.src}-${i}`} review={review} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
