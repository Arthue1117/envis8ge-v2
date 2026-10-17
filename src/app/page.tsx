import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { AgencyResults } from "./_sections/agency-results";
import { AgencyServices } from "./_sections/agency-services";
import { AgencyTestimonials } from "./_sections/agency-testimonials";
import { AsSeenOn } from "./_sections/as-seen-on";
import { Cta } from "./_sections/cta";
import { Hero } from "./_sections/hero";
import { VideoShowcase } from "./_sections/video-showcase";

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
      <VideoShowcase />
      <AgencyServices />
      <AgencyResults />
      <AgencyTestimonials />
      <Cta />
    </>
  );
}
