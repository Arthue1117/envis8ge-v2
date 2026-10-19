/**
 * Blog content model. Every field on `Article` is transcribed verbatim
 * from the locked content/blog/<slug>/ source files — this file holds
 * no draft copy of its own. See docs/06-blog-plan.md Section 3 for the
 * template this maps to.
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "subheading"; text: string }
  | { type: "caseStudyCard"; fields: Record<string, string> }
  | {
      type: "calloutBox";
      tone: "neutral" | "warning" | "tip";
      title: string;
      items: string[];
    }
  | { type: "pullQuote"; quote: string }
  | {
      type: "comparisonTable";
      headers: string[];
      rows: { label: string; values: string[] }[];
    }
  | { type: "statistics"; items: { figure: string; context: string }[] }
  | { type: "list"; ordered: boolean; items: ListItem[] };

/**
 * A list entry is either a plain string or, for lists whose items carry
 * a bold lead-in (e.g. the "5 questions to ask" checklist), a
 * `{ lead, text }` pair rendered as `<strong>{lead}</strong> {text}`.
 * Kept as a typed shape rather than parsing `**markdown**` inside item
 * strings, consistent with the rest of this model.
 */
export type ListItem = string | { lead: string; text: string };

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  subtitle: string;
  /**
   * Card excerpt for the /blog listing page — supplied directly by the
   * client as separate listing copy (distinct from the article's own
   * `subtitle`/introduction). Kept as its own field rather than reused
   * from the locked article body, since it was authored specifically
   * for this purpose and phrased slightly differently.
   */
  listingExcerpt: string;
  description: string;
  category: string;
  categorySlug: string;
  author: string;
  authorBio: string;
  keywords: string[];
  featuredImage: string;
  /**
   * Scheduled publication instant as an ISO 8601 string with the
   * Singapore offset, e.g. "2026-09-10T09:00:00+08:00". The article is
   * treated as published — and appears in the /blog listing, sorted
   * newest-first, eligible to be the Featured card — only once this
   * instant has passed (see _lib/publish.ts). `null` = an unscheduled
   * draft that never auto-publishes. The human-readable date shown on
   * cards and the article page is derived from this value.
   */
  publishAt: string | null;
  lastUpdated: string | null;
  socialShare: string[];
  tableOfContents: { id: string; label: string }[];
  introduction: string[];
  keyTakeaways: string[];
  body: ContentBlock[];
  faq: FaqItem[];
  /** `heading` overrides the closing section's default "Verdict" title. */
  verdict: { heading?: string; paragraphs: string[]; pullQuote: string };
  cta: { heading: string; body: string; buttonText: string; href: string };
}
