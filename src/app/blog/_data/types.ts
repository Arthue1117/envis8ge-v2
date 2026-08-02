/**
 * Blog content model. Every field on `Article` is transcribed verbatim
 * from the locked content/blog/<slug>/ source files — this file holds
 * no draft copy of its own. See docs/06-blog-plan.md Section 3 for the
 * template this maps to.
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
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
  | { type: "imagePlaceholder"; caption: string };

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
  publishedAt: string | null;
  lastUpdated: string | null;
  socialShare: string[];
  tableOfContents: { id: string; label: string }[];
  introduction: string[];
  keyTakeaways: string[];
  body: ContentBlock[];
  faq: FaqItem[];
  verdict: { paragraphs: string[]; pullQuote: string };
  cta: { heading: string; body: string; buttonText: string; href: string };
}
