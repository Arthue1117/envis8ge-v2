import type { Project } from "../types";

// Migrated verbatim from https://envis8ge.com/Jurong-Point
// (captured 2026-08-19, re-verified against raw source HTML on
// 2026-08-19) — content and images are Envis8ge's own. Source page
// itself spells the campaign name two different ways ("Gywomi" in Our
// Work, "Gwiyomi" in Our Results) — preserved as-is rather than
// normalized to one spelling.
export const jurongPoint: Project = {
  slug: "jurong-point",
  clientName: "Jurong Point",
  pageTitle: "Jurong Point",
  industry: "Retail / Malls", // Confirmed — docs/02-brand-guidelines.md Section 5.
  services: null,
  overview:
    "Jurong Point is a large regional shopping mall in the precinct of Jurong West Central in Jurong West, Singapore. It is next to Boon Lay MRT station and Boon Lay Bus Interchange. It is one of the largest shopping malls in Singapore in terms of number of tenants and the largest in western Singapore.",
  execution:
    "A long-term customer, we worked with Jurong Point over numerous social media campaigns according to key mall events. We helped Jurong Point claim and merge all stray and non-official Social Media pages. Successful campaigns include The National Gywomi Challenge and Uzzlang themed events, which saw a combination of marketing activities such as a Roving Video Mob, Dance Flash Mob, Makeup workshop with professionals, Influencer Engagement, Stage Competition and Video Contest.",
  results:
    "Merged stray Facebook pages and set up main page leading to more than 6,500 fans and over 128,000 check-ins. Initiated the Jurong Point Youtube channel, with a campaign video achieving more than 26,000 views, as well as the hashtag #jurongpoint on Instagram, garnering more than 2000 unique posts after 4 weeks. The National Gwiyomi Challenge campaign leading to 133% increase in new fans, a good 32% increase in Engaged Users and a 49% Increase in Talking about.",
  heroImage: "/images/portfolio/jurong-point/hero.webp",
  galleryImages: [
    "/images/portfolio/jurong-point/gallery-1.webp",
    "/images/portfolio/jurong-point/gallery-2.webp",
  ],
  hasRealContent: true,
};
