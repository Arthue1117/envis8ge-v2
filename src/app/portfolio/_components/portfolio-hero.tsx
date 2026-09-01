import { FadeIn } from "@/components/motion/fade-in";
import { ParallaxImage } from "@/components/motion/parallax-image";

import { portfolioHero } from "../_data/copy";

/**
 * Confirmed "Our Works" heading + subheading (_data/copy.ts), same
 * fixed-height dark hero band pattern as BlogHero.
 */
export function PortfolioHero() {
  return (
    <section className="tablet:h-[420px] desktop:h-[460px] relative flex h-[300px] items-center overflow-hidden bg-black">
      <ParallaxImage
        src="/images/banners/portfolio.jpg"
        alt=""
        priority
        className="object-cover"
      />

      {/* Dark overlay (~60%, calibrated so text stays WCAG AA-readable
          even over the image's brightest highlights) + soft vignette */}
      <div className="absolute inset-0 bg-black/60" />
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
