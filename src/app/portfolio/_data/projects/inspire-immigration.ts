import type { Project } from "../types";

// Migrated verbatim from https://envis8ge.com/Inspire-Immigration
// (captured 2026-08-02, re-verified against raw source HTML on
// 2026-08-19) — content and images are Envis8ge's own. The founder
// quote is embedded inline within the Our Results paragraph on the
// source page (not presented as its own separate quote block like
// other case studies), so it stays inline in `results` here rather
// than being pulled into a separate testimonial component.
export const inspireImmigration: Project = {
  slug: "inspire-immigration",
  clientName: "Inspire Immigration",
  pageTitle: "Inspire Immigration",
  industry: null, // Not categorized in the confirmed Brand Guidelines client groupings — to be confirmed.
  services: null,
  overview:
    "Inspire Immigration Consultancy, Singapore's most trusted PR immigration application partner. With a team of seasoned experts and a track record of thousands of successful applications, they offer comprehensive services to guide clients from application to approval. Their commitment to transparency and personalized support ensures that clients receive the lowest prices and dedicated assistance throughout their PR or citizenship journey.",
  execution:
    "Envis8ge partnered with Inspire Immigration Consultancy to boost brand awareness and showcase their expertise in PR and citizenship applications. Through targeted ads featuring success stories and insights from the founder, we highlighted their professionalism and seamless process, building trust and positioning them as Singapore's go-to immigration experts.",
  results:
    'In just three months, Envis8ge helped Inspire Immigration generate high-quality leads at just $43.14 per acquisition with good conversions. Our targeted campaigns not only increased brand awareness but also drove real results, making the PR application process more accessible to aspiring residents. Founder Lucas Lee shares, "Highly recommend working with Shawn to boost your social media awareness and sales. It has been a smooth sailing journey, and we will be continuing with them."',
  heroImage: "/images/portfolio/inspire-immigration/hero.jpeg",
  galleryImages: ["/images/portfolio/inspire-immigration/gallery-1.jpeg"],
  hasRealContent: true,
};
