import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { formatReadingTime } from "@/lib/reading-time";

import type { Article } from "../_data/types";

/**
 * Design System Section 15 — featured image (fallback to the confirmed
 * `--gradient-accent` since no real photo asset exists yet), category
 * tag, publish date, reading time, title, listing excerpt, and a
 * "Continue Reading" affordance. The whole card is one `Link` — the
 * "button" is styled text, not a nested interactive element (invalid
 * HTML inside an anchor), with its arrow animating via `group-hover`.
 */
export function BlogCard({
  article,
  readingMinutes,
  featured = false,
}: {
  article: Article;
  readingMinutes: number;
  featured?: boolean;
}) {
  const publishLabel = article.publishedAt ?? "Coming soon";

  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden p-0 transition-[transform,box-shadow] duration-250 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div
          className={
            featured
              ? "aspect-[21/9] overflow-hidden"
              : "aspect-video overflow-hidden"
          }
        >
          <div
            className="h-full w-full transition-transform duration-[400ms] ease-out group-hover:scale-105"
            style={{ backgroundImage: "var(--gradient-accent)" }}
          />
        </div>
        <CardContent className="flex flex-col gap-3 pt-6">
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-primary-tint text-primary rounded-pill px-3 py-1 font-semibold">
              {article.category}
            </span>
            <span aria-hidden>·</span>
            <span>{publishLabel}</span>
            <span aria-hidden>·</span>
            <span>{formatReadingTime(readingMinutes)}</span>
          </div>
          <h3
            className={
              featured
                ? "font-heading text-foreground tablet:text-3xl text-2xl font-bold"
                : "font-heading text-foreground text-lg font-semibold"
            }
          >
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {article.listingExcerpt}
          </p>
          <span className="text-primary mt-1 inline-flex items-center gap-1 text-sm font-semibold">
            Continue Reading
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-150 group-hover:translate-x-1"
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
