import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Cta } from "@/app/_sections/cta";

import { caseStudiesHeading } from "./_data/copy";
import { projects } from "./_data/projects";
import { BrandMarquee } from "./_components/brand-marquee";
import { PortfolioHero } from "./_components/portfolio-hero";
import { PortfolioListing } from "./_components/portfolio-listing";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Envis8ge's portfolio of social media marketing case studies for Singapore brands across retail, F&B, education, travel and more.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    title: "Portfolio | Envis8ge",
    description:
      "Explore Envis8ge's portfolio of social media marketing case studies for Singapore brands.",
    url: `${siteConfig.url}/portfolio`,
    siteName: siteConfig.name,
    locale: "en_SG",
  },
};

// Invisible structured data only, same pattern as the Blog index page —
// the visible breadcrumb UI was removed sitewide per explicit request.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Portfolio",
      item: `${siteConfig.url}/portfolio`,
    },
  ],
};

// CollectionPage + ItemList so search engines can see this as an index
// of the individual CaseStudy pages linked from it.
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Portfolio",
  url: `${siteConfig.url}/portfolio`,
  isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.clientName,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
    })),
  },
};

export default function PortfolioIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PortfolioHero />

      <section className="tablet:py-20 desktop:py-24 py-16">
        <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
          <h2 className="font-heading text-foreground tablet:text-4xl text-center text-3xl font-bold">
            {caseStudiesHeading}
          </h2>
          <div className="mt-10">
            <PortfolioListing projects={projects} />
          </div>
        </div>
      </section>

      <section className="bg-muted tablet:py-20 desktop:py-24 py-16">
        <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
          <BrandMarquee />
        </div>
      </section>

      <Cta />
    </>
  );
}
