/**
 * Site-wide constants used for metadata/SEO defaults across the app.
 * Values are sourced from the locked project documentation
 * (docs/01-project-brief.md, docs/02-brand-guidelines.md) — nothing here
 * is invented. `url` assumes the rebuild continues to serve from the
 * current live domain; confirm before production deploy.
 */
export const siteConfig = {
  name: "Envis8ge",
  legalName: "Envis8ge Pte Ltd",
  url: "https://envis8ge.com",
  description:
    "Envis8ge is a social media agency in Singapore helping brands grow through creative strategy, digital marketing, and data-driven campaigns.",
  locale: "en-SG",
  contact: {
    phone: "+65 9632 6973",
    email: "contact@envis8ge.com",
    address: "6001 Beach Rd, #22-01 Golden Mile Tower, Singapore 199589",
  },
} as const;
