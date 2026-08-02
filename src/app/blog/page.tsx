import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site";
import { calculateReadingTime } from "@/lib/reading-time";

import { articles } from "./_data/articles";
import { categories } from "./_data/categories";
import { BlogListing } from "./_components/blog-listing";
import { articleWordCount } from "./_lib/article-text";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical social media and digital marketing insights for Singapore brands, from the Envis8ge team.",
  alternates: { canonical: "/blog" },
};

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
  const readingTimes = Object.fromEntries(
    articles.map((a) => [a.slug, calculateReadingTime(articleWordCount(a))])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-muted tablet:py-20 border-b border-neutral-200 py-16">
        <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
          <FadeIn className="mt-4 max-w-2xl">
            <h1 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
              Blog
            </h1>
            <span className="text-primary mt-2 block text-sm font-semibold tracking-wide uppercase">
              Insights, Strategies &amp; Marketing Guides
            </span>
            <p className="text-muted-foreground mt-3">
              Actionable articles about Social Media Marketing, Meta Ads,
              Content Strategy, Website Design and Digital Marketing in
              Singapore.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="tablet:py-16 py-12">
        <div className="tablet:px-6 mx-auto w-full max-w-[1200px] px-4">
          <BlogListing
            articles={articles}
            readingTimes={readingTimes}
            categories={categories}
          />
        </div>
      </section>
    </>
  );
}
