/**
 * Reading time estimate for blog content.
 * Source of truth: docs/06-blog-plan.md, Section 6 — 200–238 wpm average,
 * calculated at build time rather than entered manually per article.
 */
const WORDS_PER_MINUTE = 220;

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
