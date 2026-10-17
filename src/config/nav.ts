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

/**
 * Header and mobile-menu links. "Contact Us" is left out there because
 * both already show the blue "Contact Us!" button (2026-10-17); the
 * footer still lists it from `primaryNav`.
 */
export const headerNav = primaryNav.filter(
  (item) => item.href !== "/contact-us"
);
