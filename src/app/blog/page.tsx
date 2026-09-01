import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { calculateReadingTime } from "@/lib/reading-time";

import { articles } from "./_data/articles";
import { categories } from "./_data/categories";
import { BlogHero } from "./_components/blog-hero";
import { BlogListing } from "./_components/blog-listing";
import { articleWordCount } from "./_lib/article-text";
import { publishedArticles } from "./_lib/publish";

// Rendered per request so the scheduled-publish gate (publishedArticles,
// which compares each publishAt against the current time) is
// re-evaluated on every visit — a scheduled article appears on the
// listing the moment its publishAt passes, with no rebuild.
//
// Time-based ISR (`export const revalidate`) is deliberately NOT used
// here: the Cloudflare/OpenNext deployment runs a read-only static-assets
// incremental cache with no revalidation queue (see open-next.config.ts),
// so a route with `revalidate` set makes the cache interceptor enqueue a
// background revalidation that throws ("Dummy queue is not implemented")
// and returns a 500. Dynamic rendering avoids that path entirely.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical social media and digital marketing insights for Singapore brands, from the Envis8ge team.",
  alternates: { canonical: "/blog" },
};

// Invisible structured data only — the visible breadcrumb UI was
// removed per explicit request (the header already provides primary
// navigation). Kept for SEO rich-snippet eligibility, which doesn't
// require an on-page breadcrumb trail.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${siteConfig.url}/blog`,
    },
  ],
};

export default function BlogIndexPage() {
  // Only published articles appear on the public Blog page, newest ->
  // oldest. Scheduled (future-dated) articles are omitted entirely until
  // their publishAt passes. The newest of these is the Featured card.
  const visibleArticles = publishedArticles(articles);
  const readingTimes = Object.fromEntries(
    visibleArticles.map((a) => [
      a.slug,
      calculateReadingTime(articleWordCount(a)),
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogHero />

      <section className="tablet:py-20 desktop:py-24 py-16">
        <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
          <BlogListing
            articles={visibleArticles}
            readingTimes={readingTimes}
            categories={categories}
          />
        </div>
      </section>
    </>
  );
}
