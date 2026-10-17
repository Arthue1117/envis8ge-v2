import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";

import { asSeenOn } from "./data";

/**
 * As Seen On — discovered during the Phase 3 Visual Fidelity Pass; this
 * section did not exist in the original build. Confirmed heading + real
 * composite logo image (Mediacorp, DAN, DesignRush) from the live site,
 * with the same subtle halftone-dot decoration used there.
 *
 * Heading verified directly against the live DOM: it's "As Seen On" as a
 * normal-case H1 with only the word "Seen" bolded in the brand primary
 * color (`<h1>As <strong>Seen</strong> On</h1>`) — not the small-caps
 * uppercase gray label this section used before.
 *
 * `container={false}` + a manual `Container` keeps the background
 * `Image` a direct child of the `relative` Section root, as `next/image`
 * `fill` requires — nesting it inside Section's auto-Container (which is
 * not itself positioned) triggered a dev-mode warning and incorrect
 * sizing.
 *
 * Padding reduced below the shared `Section` default
 * (`tablet:py-20 desktop:py-24 py-16`) and heading bumped up to match
 * the standard section-heading scale used elsewhere on the homepage
 * (`tablet:text-4xl text-3xl`, e.g. Agency Results/Testimonials) per
 * correction — tightens the gap above/below this section and makes the
 * heading read more clearly. The composite logo image itself is
 * untouched.
 */
export function AsSeenOn() {
  return (
    <Section
      container={false}
      className="tablet:py-10 desktop:py-12 relative overflow-hidden py-8"
    >
      <Image
        src="/images/backgrounds/pattern-dots.png"
        alt=""
        fill
        className="object-cover opacity-40"
      />
      <Container className="relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
            As <strong className="text-primary-text">Seen</strong> On
          </h2>
          <Image
            src={asSeenOn.image}
            alt="Envis8ge as seen on Mediacorp, Digital Agency Network, and DesignRush"
            width={800}
            height={200}
            className="mx-auto mt-6 h-auto w-full max-w-2xl"
          />
        </FadeIn>
      </Container>
    </Section>
  );
}
