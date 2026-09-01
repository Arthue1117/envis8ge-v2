import Link from "next/link";

import { Container } from "@/components/layout/container";
import { primaryNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

/**
 * Design System Section 12 — Footer. Content (contact details, copyright,
 * Privacy Policy link) is Confirmed from the live site
 * (docs/05-content-plan.md Section 2) and preserved exactly; layout is a
 * Proposed multi-column structure. Background color for the footer was
 * not reliably extractable from the live page (Design System Section 12
 * "To be confirmed") — a navy-to-black gradient (rather than flat
 * `bg-secondary` black) is used as the documented Proposed default
 * pending confirmation. The base is a purely vertical (top-to-bottom)
 * gradient — its color depends only on vertical position, never on
 * horizontal position — so the left and right sides are mathematically
 * identical at every height, including the bottom corners and the
 * middle band between them, with a smooth, gradual darken toward the
 * bottom and no hard edges. A small radial highlight is layered on top,
 * anchored at the top-left behind the logo, to preserve the extra
 * brightness that area already had.
 *
 * The logo itself is unmodified — same asset/colors as the header, no
 * filter/invert/mask applied.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-secondary-foreground"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 55% 65% at top left, #204d7a 0%, transparent 60%)",
          "linear-gradient(to bottom, #173a5e 0%, #0f2540 45%, black 95%)",
        ].join(", "),
      }}
    >
      <Container className="tablet:grid-cols-3 grid gap-10 py-10">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-lg font-bold text-white">
            {siteConfig.name}
          </span>
          <p className="text-sm text-neutral-300">
            Boutique social media and digital marketing agency in Singapore.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <span className="font-heading text-sm font-semibold">Navigate</span>
          <ul className="flex flex-col gap-2">
            {/* Footer nav intentionally kept as previously approved (Blog,
                Contact Us) when Portfolio was re-added to primaryNav for
                the header/mobile nav only. */}
            {primaryNav
              .filter((item) => item.href !== "/portfolio")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-300 transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="font-heading text-sm font-semibold">Contact Us</span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-300">
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="transition-colors duration-150 hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors duration-150 hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="tablet:flex-row flex flex-col items-center justify-between gap-2 py-4 text-xs text-neutral-300">
          <p>
            © {year} All Rights Reserved. {siteConfig.legalName}
          </p>
          <Link
            href="/privacy-policy"
            className="transition-colors duration-150 hover:text-white"
          >
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
