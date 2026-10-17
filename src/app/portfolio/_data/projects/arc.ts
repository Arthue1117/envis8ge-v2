import { CONTENT_PENDING, type Project } from "../types";

// Migrated verbatim from https://envis8ge.com/Alexandra-Retail-Centre
// (captured 2026-08-19, re-verified against raw source HTML on
// 2026-08-19) — content and images are Envis8ge's own. Source page has
// no "Our Results" section at all — left as CONTENT_PENDING (not
// rendered) rather than invented.
export const arc: Project = {
  slug: "arc",
  clientName: "ARC",
  pageTitle: "Alexandra Retail Centre",
  industry: "Retail / Malls", // Confirmed — docs/02-brand-guidelines.md Section 5 ("Alexandra Retail Centre").
  services: null,
  overview:
    "Built to house an inviting retail environment, the comprehensive array of stores at ARC is punctuated with open spaces and generous walkways which offer visitors a conducive shopping experience. With a net lettable area of approximately 89,000 sq ft, the three-storey retail centre offers a varied mix of food and beverage, supermarket, lifestyle, services and retail tenants.",
  execution:
    "Working together to create a website suited for ARC's vibrant theme and professionalism, we've crafted a website with up-to-date content management.",
  results: CONTENT_PENDING,
  heroImage: "/images/portfolio/arc/hero.webp",
  galleryImages: ["/images/portfolio/arc/gallery-1.webp"],
  hasRealContent: true,
};
