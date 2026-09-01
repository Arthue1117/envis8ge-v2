import type { Article } from "../_data/types";

/**
 * Blog scheduling / featured logic.
 *
 *  - An article is "published" once its `publishAt` instant has passed.
 *  - A future-dated (scheduled) article is hidden everywhere on the
 *    public site: it does NOT appear on the /blog listing in any form,
 *    and its /blog/[slug] page 404s until `publishAt`. Both routes
 *    render per request (`export const dynamic = "force-dynamic"`), so
 *    the transition to published needs no rebuild.
 *  - The Featured (first) card on /blog is the newest published article,
 *    determined automatically — there is no manual pin.
 *
 * Helpers take an optional `now` so build-time stays deterministic;
 * callers normally omit it.
 */

export function isPublished(article: Article, now: Date = new Date()): boolean {
  if (!article.publishAt) return false;
  return new Date(article.publishAt).getTime() <= now.getTime();
}

/** Published articles only, newest first. */
export function publishedArticles(
  articles: Article[],
  now: Date = new Date()
): Article[] {
  return articles
    .filter((a) => isPublished(a, now))
    .sort(
      (a, b) =>
        new Date(b.publishAt as string).getTime() -
        new Date(a.publishAt as string).getTime()
    );
}

const displayDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Singapore",
});

/**
 * Human-readable Singapore publish date, e.g. "10 September 2026".
 * Returns `null` for an unscheduled draft.
 */
export function publishedDateLabel(article: Article): string | null {
  if (!article.publishAt) return null;
  return displayDate.format(new Date(article.publishAt));
}
