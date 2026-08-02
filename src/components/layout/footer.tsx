import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { primaryNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

/**
 * Design System Section 12 — Footer. Content (contact details, copyright,
 * Privacy Policy link) is Confirmed from the live site
 * (docs/05-content-plan.md Section 2) and preserved exactly; layout is a
 * Proposed multi-column structure. Background color for the footer was
 * not reliably extractable from the live page (Design System Section 12
 * "To be confirmed") — `bg-secondary` (black) is used here as the
 * documented Proposed default pending confirmation.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <Container className="tablet:grid-cols-3 grid gap-10 py-16">
        <div className="flex flex-col gap-4">
          <Logo className="text-secondary-foreground" />
          <p className="text-sm text-neutral-400">
            Boutique social media and digital marketing agency in Singapore.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <span className="font-heading text-sm font-semibold">Navigate</span>
          <ul className="flex flex-col gap-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="font-heading text-sm font-semibold">Contact Us</span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-400">
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
        <Container className="tablet:flex-row flex flex-col items-center justify-between gap-2 py-6 text-xs text-neutral-500">
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
