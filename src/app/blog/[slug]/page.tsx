import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { calculateReadingTime } from "@/lib/reading-time";

import { articles } from "../_data/articles";
import { articleWordCount } from "../_lib/article-text";
import { ArticleBody } from "../_components/article-body";
import { ArticleCta } from "../_components/article-cta";
import { ArticleHero } from "../_components/article-hero";
import {
  ArticleNavPlaceholder,
  RelatedArticlesPlaceholder,
} from "../_components/article-nav-placeholders";
import { AuthorBio } from "../_components/author-bio";
import { KeyTakeaways, PullQuote } from "../_components/content-blocks";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { NewsletterSignup } from "../_components/newsletter-signup";
import { SocialShare } from "../_components/social-share";
import { TableOfContents } from "../_components/table-of-contents";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${siteConfig.url}/blog/${article.slug}`;
  const ogImage = `${siteConfig.url}${article.featuredImage}`;

  return {
    // `absolute` bypasses the root layout's "%s | Envis8ge" title
    // template — the locked seoTitle already ends in "| Envis8ge" and
    // would otherwise be duplicated.
    title: { absolute: article.seoTitle },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1600, height: 900 }],
      locale: "en_SG",
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const readingMinutes = calculateReadingTime(articleWordCount(article));
  const url = `${siteConfig.url}/blog/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${siteConfig.url}${article.featuredImage}`,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo/envis8ge-logo.png`,
      },
    },
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.lastUpdated ? { dateModified: article.lastUpdated } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    keywords: article.keywords,
    inLanguage: "en-SG",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `${siteConfig.url}/blog/category/${article.categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: article.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ArticleHero
        article={article}
        url={url}
        readingMinutes={readingMinutes}
      />

      <div className="tablet:px-6 tablet:py-14 mx-auto w-full max-w-[1200px] px-4 py-10">
        <div className="desktop:grid-cols-[minmax(0,1fr)_260px] grid grid-cols-1 gap-10">
          <article className="flex flex-col gap-8">
            <details className="desktop:hidden rounded-md border border-neutral-200 p-4">
              <summary className="font-heading text-foreground cursor-pointer text-sm font-semibold">
                On this page
              </summary>
              <ul className="mt-3 flex flex-col gap-2">
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <div className="flex flex-col gap-4">
              {article.introduction.map((paragraph, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <KeyTakeaways items={article.keyTakeaways} />

            <ArticleBody blocks={article.body} />

            <div id="frequently-asked-questions" className="scroll-mt-24">
              <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                Frequently Asked Questions
              </h2>
              <div className="mt-4">
                <FaqAccordion items={article.faq} />
              </div>
            </div>

            <div id="verdict" className="flex scroll-mt-24 flex-col gap-4">
              <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                Verdict
              </h2>
              {article.verdict.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <PullQuote quote={article.verdict.pullQuote} />
            </div>

            <ArticleCta
              heading={article.cta.heading}
              body={article.cta.body}
              buttonText={article.cta.buttonText}
              href={article.cta.href}
            />

            <ArticleNavPlaceholder />
            <RelatedArticlesPlaceholder />
            <AuthorBio author={article.author} bio={article.authorBio} />
            <NewsletterSignup />

            <div className="border-t border-neutral-200 pt-6">
              <span className="text-muted-foreground text-sm">
                Share this article
              </span>
              <SocialShare url={url} title={article.title} className="mt-2" />
            </div>
          </article>

          <aside className="desktop:block hidden">
            <TableOfContents items={article.tableOfContents} />
          </aside>
        </div>
      </div>
    </>
  );
}
