"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { cn } from "@/lib/utils";

import type { Article } from "../_data/types";
import type { categories as categoriesType } from "../_data/categories";
import { BlogCard } from "./blog-card";
import { Pagination } from "./pagination";

const PAGE_SIZE = 9;

/**
 * Owns search + category filter + pagination state client-side (Blog
 * Plan Section 2 — Proposed given the current small corpus). Category
 * pills for taxonomy with no content yet render a real empty state
 * rather than being hidden, since the taxonomy itself is already
 * Approved even though most categories have no articles.
 */
export function BlogListing({
  articles,
  readingTimes,
  categories,
}: {
  articles: Article[];
  readingTimes: Record<string, number>;
  categories: typeof categoriesType;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        !activeCategory || article.categorySlug === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured = paged[0];
  const rest = paged.slice(1);

  return (
    <div>
      <div className="tablet:flex-row tablet:items-center tablet:justify-between flex flex-col gap-4">
        <div className="tablet:max-w-xs relative w-full">
          <Search
            aria-hidden
            className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles"
            aria-label="Search articles"
            className="rounded-pill focus-visible:ring-ring w-full border border-neutral-300 py-2 pr-4 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setPage(1);
            }}
            className={cn(
              "rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-150",
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => {
                setActiveCategory(category.slug);
                setPage(1);
              }}
              className={cn(
                "rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-150",
                activeCategory === category.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center">
          <p className="font-heading text-foreground font-semibold">
            No articles yet
          </p>
          <p className="text-muted-foreground max-w-sm text-sm">
            {activeCategory
              ? "This category doesn't have any published articles yet — check back soon."
              : "No articles match your search."}
          </p>
        </div>
      ) : (
        <>
          {featured && (
            <div className="mt-10">
              <BlogCard
                article={featured}
                readingMinutes={readingTimes[featured.slug]}
                featured
              />
            </div>
          )}

          {rest.length > 0 && (
            <StaggerGroup className="tablet:grid-cols-2 desktop:grid-cols-3 mt-8 grid grid-cols-1 gap-6">
              {rest.map((article) => (
                <StaggerItem key={article.slug}>
                  <BlogCard
                    article={article}
                    readingMinutes={readingTimes[article.slug]}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
