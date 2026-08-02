import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";

import { hero } from "./data";

/**
 * Home hero — Confirmed copy (docs/05-content-plan.md Section 2).
 *
 * Visual composition verified directly against the live site's computed
 * styles (not estimated): the hero section has a solid `#000000`
 * background with the Singapore skyline photo layered on top at exactly
 * `opacity: 0.5`, `mix-blend-mode: normal`. There is no gradient inside
 * the hero itself — an earlier pass incorrectly attributed a separate,
 * unrelated 86px decorative gradient strip (positioned above the hero,
 * class `borderTop`) to the hero background; that was a heuristic
 * (nearest-heading) matching error, corrected here after re-verifying
 * via direct DOM traversal from the hero text node.
 */
export function Hero() {
  return (
    <section className="tablet:py-28 desktop:py-32 relative overflow-hidden bg-black py-24">
      <Image
        src="/images/backgrounds/hero-skyline.webp"
        alt=""
        fill
        priority
        className="object-cover opacity-50"
      />
      <div className="tablet:px-6 relative mx-auto w-full max-w-[1200px] px-4">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading tablet:text-5xl desktop:text-6xl text-4xl font-bold text-white">
            {hero.heading}
          </h1>
          <p className="tablet:text-lg mt-6 text-base text-white/90">
            {hero.body}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact-us" className={buttonVariants({ size: "lg" })}>
              Contact Us!
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
