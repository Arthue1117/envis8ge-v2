/**
 * Category taxonomy per docs/06-blog-plan.md Section 4. Only
 * "Social Media Marketing" is Approved/populated (the first article's
 * confirmed category); the rest are Proposed and currently empty —
 * selecting them should show an empty state, not be hidden, since the
 * taxonomy itself is already approved even though content hasn't been
 * written for them yet.
 */
export const categories = [
  { name: "Social Media Marketing", slug: "social-media-marketing" },
  { name: "Content & Community", slug: "content-community" },
  { name: "Email Marketing", slug: "email-marketing" },
  { name: "Web & Landing Pages", slug: "web-landing-pages" },
  { name: "Video & Photography", slug: "video-photography" },
] as const;
