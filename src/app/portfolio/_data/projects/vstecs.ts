import type { Project } from "../types";

// Migrated verbatim from https://envis8ge.com/VSTECS-Singapore
// (captured 2026-08-19, re-verified against raw source HTML on
// 2026-08-19) — content and images are Envis8ge's own.
export const vstecs: Project = {
  slug: "vstecs",
  clientName: "VSTECS",
  pageTitle: "VSTECS Singapore",
  industry: "Corporate / Institutional", // Confirmed — docs/02-brand-guidelines.md Section 5.
  services: null,
  overview:
    "VSTECS (Singapore) is a leading IT solutions provider with trusted vendors and clients around the region. The company has gained multiple prestigious awards over the years and has a consistent track record towards excellence.",
  execution:
    "Relying on traditional marketing channels, VSTECS (Singapore) seeks to build its presence on social media at a steady pace. With the main focus as brand awareness for VSTECS (Singapore) and its partnerships, we created content and managed their Facebook page and ad buys. Envis8ge had also assisted to communicate with Facebook to update for a name change in the company. Envis8ge continues to work with VSTECS and their vendors on numerous campaigns including website development, lead generation and video content.",
  results:
    "Over the past few years, VSTECS (Singapore) has a significantly more active Facebook page with an increase in reach and engagement. VSTECS (Singapore), along with its partners has achieved increased online presence, leads and sales capabilities through the respective campaigns.",
  // Man-holding-a-balloon image from the source page — explicitly
  // requested. gallery-2 (an XGIMI projector ad) is the tablet/ad-style
  // image explicitly excluded per instruction.
  heroImage: "/images/portfolio/vstecs/gallery-1.webp",
  galleryImages: ["/images/portfolio/vstecs/gallery-3.webp"],
  hasRealContent: true,
};
