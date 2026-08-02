import Image from "next/image";

import { FadeIn } from "@/components/motion/fade-in";
import { formatReadingTime } from "@/lib/reading-time";

import type { Article } from "../_data/types";
import { SocialShare } from "./social-share";

/**
 * Blog Plan Section 3.1. Breadcrumbs removed per explicit request (the
 * header already provides primary navigation). The real featured image
 * (public/images/blog/<slug>/hero.jpg — a composited graphic built from
 * the actual downloaded Singapore skyline photo plus hand-authored
 * organic/paid iconography in brand cyan, not a fabricated stock photo)
 * is placed directly below the metadata row, large and rounded, per
 * this pass's requirements.
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

  return (
    <header className="tablet:pt-14 border-b border-neutral-200 pt-10 pb-10">
      <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="bg-primary-tint text-primary rounded-pill inline-block px-3 py-1 text-xs font-semibold">
            {article.category}
          </span>
          <h1 className="font-heading text-foreground tablet:text-4xl desktop:text-5xl mt-4 text-3xl font-bold">
            {article.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            {article.subtitle}
          </p>

          <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
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

          <SocialShare
            url={url}
            title={article.title}
            className="mt-4 flex justify-center"
          />
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="relative mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-lg shadow-lg"
        >
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </FadeIn>
      </div>
    </header>
  );
}
