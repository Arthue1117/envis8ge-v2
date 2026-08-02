import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { AsSeenOn } from "./_sections/as-seen-on";
import { Cta } from "./_sections/cta";
import { Hero } from "./_sections/hero";
import { PortfolioPreview } from "./_sections/portfolio-preview";
import { Process } from "./_sections/process";
import { Services } from "./_sections/services";
import { Testimonials } from "./_sections/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Organization structured data, built entirely from confirmed contact
 * details (docs/01-project-brief.md Section 1) — no invented fields.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    addressCountry: "SG",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <AsSeenOn />
      <Services />
      <PortfolioPreview />
      <Process />
      <Testimonials />
      <Cta />
    </>
  );
}
