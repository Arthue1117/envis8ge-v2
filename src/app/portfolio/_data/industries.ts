/**
 * Confirmed served-industry taxonomy — docs/02-brand-guidelines.md Section 5.
 * Declared in full (not derived from the current 8 case studies) so the
 * filter architecture is ready for future case studies in industries no
 * project has yet been published for, matching the Blog category pattern
 * (categories.ts) where the taxonomy is Approved independent of content.
 * Selecting an industry with no matching project yet shows a real empty
 * state rather than hiding the filter.
 */
export const industries = [
  { name: "Corporate / Institutional", slug: "corporate-institutional" },
  { name: "Education & Training", slug: "education-training" },
  { name: "Retail / Malls", slug: "retail-malls" },
  { name: "F&B", slug: "fb" },
  { name: "Travel", slug: "travel" },
  { name: "Beauty & Fashion", slug: "beauty-fashion" },
] as const;

export function industrySlugFor(industry: string | null): string | null {
  if (!industry) return null;
  return industries.find((i) => i.name === industry)?.slug ?? null;
}
