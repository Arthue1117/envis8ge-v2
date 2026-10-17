/**
 * Primary site navigation. Source of truth: docs/04-sitemap.md Section 3
 * (locked) — Portfolio · Blog · Contact Us. Do not add items here (Home,
 * About, Services, etc.) without updating the locked sitemap first.
 */
export const primaryNav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
] as const;
