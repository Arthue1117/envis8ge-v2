import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { siteConfig } from "@/config/site";

import { contactFaq } from "./_data/form-options";
import { ContactCta } from "./_components/contact-cta";
import { ContactHero } from "./_components/contact-hero";
import { GhlContactForm } from "./_components/ghl-contact-form";
import { ContactInfoCards } from "./_components/contact-info-cards";
import { MapPlaceholder } from "./_components/map-placeholder";

const title = "Contact Us";
const description =
  "Get in touch with Envis8ge — tell us about your social media marketing, paid ads, content, or website project and we'll get back to you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteConfig.url}/contact-us`,
    siteName: siteConfig.name,
    locale: "en_SG",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    addressCountry: "SG",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: `${siteConfig.url}/contact-us`,
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: title,
  description,
  url: `${siteConfig.url}/contact-us`,
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <ContactHero />

      <Section>
        <ContactInfoCards />
      </Section>

      <Section background="muted" id="contact-form" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
            Send Us a Message
          </h2>
          <p className="text-muted-foreground mt-3">
            Fill out the form below and we&apos;ll get back to you shortly.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <GhlContactForm />
        </div>
      </Section>

      <Section>
        <ContactCta />
      </Section>

      <Section background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
            Find Us
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <MapPlaceholder />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-foreground tablet:text-3xl text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={contactFaq} />
          </div>
        </div>
      </Section>
    </>
  );
}
