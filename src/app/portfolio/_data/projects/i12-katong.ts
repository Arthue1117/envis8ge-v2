import type { Project } from "../types";

// Migrated verbatim from https://envis8ge.com/i12-Katong
// (captured 2026-08-19, re-verified against raw source HTML on
// 2026-08-19) — content and images are Envis8ge's own. Source page
// itself is inconsistent about capitalization ("i12 Katong" in the
// title, "I12 Katong" in the body) — preserved as-is rather than
// normalized.
export const i12Katong: Project = {
  slug: "i12-katong",
  clientName: "i12 Katong",
  pageTitle: "i12 Katong",
  industry: "Retail / Malls", // Confirmed — docs/02-brand-guidelines.md Section 5.
  services: null,
  overview:
    "Located at the intersection of East Coast Road and Joo Chiat Road, 112 Katong (previously known as Katong Mall), is positioned as the premier lifestyle and F&B hub in the Eastern-part of Singapore. With over 100 specialty shops and selected F&B outlets operating extended hours, 112 Katong offers shoppers and diners an unrivalled and eclectic mix of retail, dining and entertainment options.",
  execution:
    "Working closely with I12 Katong, we planned and managed their Facebook and Instagram social feed according to thematic campaigns. Contests and Giveaways were integrated to encourage foot traffic and awareness. With lifestyle events happening at the mall, we captured the moments for the social feeds.",
  results:
    "I12 Katong Facebook page saw a 35.9% increase in total fans and 2.3X increase in total reach after 4 months. Some campaigns were based on trends such as Pokemon Go, which gave I12 Katong a leveraged boost in activity and awareness.",
  heroImage: "/images/portfolio/i12-katong/hero.jpeg",
  galleryImages: [
    "/images/portfolio/i12-katong/gallery-1.webp",
    "/images/portfolio/i12-katong/gallery-2.webp",
  ],
  hasRealContent: true,
};
