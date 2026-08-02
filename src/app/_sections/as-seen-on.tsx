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
 * `container={false}` + a manual `Container` keeps the background
 * `Image` a direct child of the `relative` Section root, as `next/image`
 * `fill` requires — nesting it inside Section's auto-Container (which is
 * not itself positioned) triggered a dev-mode warning and incorrect
 * sizing.
 */
export function AsSeenOn() {
  return (
    <Section
      container={false}
      className="tablet:py-16 relative overflow-hidden py-12"
    >
      <Image
        src="/images/backgrounds/pattern-dots.png"
        alt=""
        fill
        className="object-cover opacity-40"
      />
      <Container className="relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
            {asSeenOn.heading}
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
