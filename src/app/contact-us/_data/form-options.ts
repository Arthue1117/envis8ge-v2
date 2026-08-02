/**
 * Contact form option lists. Service options are the exact list you
 * specified. Budget/Timeline have no confirmed/published tiers anywhere
 * in the locked docs — these are Proposed, reasonable defaults for a
 * lead-qualification form, not published pricing.
 */
export const serviceOptions = [
  "Social Media Marketing",
  "Meta Ads",
  "Content Strategy",
  "Website Design",
  "Email Marketing",
  "Video & Photography",
  "Other",
] as const;

// Proposed — no confirmed budget tiers exist anywhere in the locked docs.
export const budgetOptions = [
  "Under S$2,000/month",
  "S$2,000 – S$5,000/month",
  "S$5,000 – S$10,000/month",
  "S$10,000+/month",
  "Not sure yet",
] as const;

// Proposed — no confirmed timeline options exist anywhere in the locked docs.
export const timelineOptions = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Just exploring",
] as const;

/**
 * FAQ answers are grounded in confirmed facts where they exist
 * (industries, regional client base — both from the locked Brand
 * Guidelines). "How soon will you reply?" has no confirmed SLA anywhere
 * in the docs, so the answer is intentionally non-committal rather than
 * inventing a specific response time.
 */
export const contactFaq = [
  {
    question: "How soon will you reply?",
    answer:
      "We personally review every enquiry and get back to you as soon as we can — drop us your details and we'll follow up shortly.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes — we're a regional team based in Singapore, working with brands and organisations across Singapore and the Asia-Pacific region.",
  },
  {
    question: "What industries do you specialise in?",
    answer:
      "We've worked across retail and malls, beauty and fashion, F&B, education, corporate and institutional clients, and travel — take a look at our portfolio for examples.",
  },
];
