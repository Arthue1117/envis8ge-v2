import Image from "next/image";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { formatReadingTime } from "@/lib/reading-time";

import type { Article } from "../_data/types";
import { SocialShare } from "./social-share";

/**
 * Blog Plan Section 3.1 (Hero) + 3.11 (Breadcrumbs). No real featured
 * image asset exists yet (see articles.ts) — falls back to the same
 * confirmed `--gradient-accent` treatment used on the Home page rather
 * than a broken image or fabricated stock photo.
 */
export function ArticleHero({
  article,
  url,
  readingMinutes,
}: {
  article: Article;
  url: string;
  readingMinutes: number;
}) {
  const publishLabel = article.publishedAt ?? "To be published";
  const hasFeaturedImage = false; // flip to true once the real asset lands at article.featuredImage

  return (
    <header className="border-b border-neutral-200 pt-8 pb-10">
      <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            {
              label: article.category,
              href: `/blog/category/${article.categorySlug}`,
            },
            { label: article.title },
          ]}
        />

        <FadeIn className="mt-6 max-w-3xl">
          <span className="bg-primary-tint text-primary rounded-pill inline-block px-3 py-1 text-xs font-semibold">
            {article.category}
          </span>
          <h1 className="font-heading text-foreground tablet:text-4xl desktop:text-5xl mt-4 text-3xl font-bold">
            {article.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            {article.subtitle}
          </p>

          <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span>By {article.author}</span>
            <span aria-hidden>·</span>
            <span>{publishLabel}</span>
            {article.lastUpdated && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {article.lastUpdated}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{formatReadingTime(readingMinutes)}</span>
          </div>

          <SocialShare url={url} title={article.title} className="mt-4" />
        </FadeIn>

        {hasFeaturedImage ? (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="mt-8 aspect-video w-full rounded-md"
            style={{ backgroundImage: "var(--gradient-accent)" }}
            role="img"
            aria-label={article.title}
          />
        )}
      </div>
    </header>
  );
}
