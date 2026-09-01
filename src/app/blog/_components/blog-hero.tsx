import { FadeIn } from "@/components/motion/fade-in";
import { ParallaxImage } from "@/components/motion/parallax-image";

/**
 * Full-width Blog hero. Fixed height band (~440px desktop, ~280px
 * mobile) with an explicit dark overlay + soft vignette for text
 * contrast and a subtle scroll-linked parallax on the banner image.
 */
export function BlogHero() {
  return (
    <section className="tablet:h-[400px] desktop:h-[440px] relative flex h-[280px] items-center overflow-hidden bg-black">
      <ParallaxImage
        src="/images/banners/blog.jpg"
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
