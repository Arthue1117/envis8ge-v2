/**
 * Blog Plan Sections 3.7 (Related Articles) and 3.9 (Previous/Next) —
 * both explicitly placeholders until more than one article is published
 * (docs/06-blog-plan.md Section 11; content/.../related-articles.md).
 * No article titles are fabricated here.
 */
export function RelatedArticlesPlaceholder() {
  return (
    <div className="border-t border-neutral-200 pt-8 text-center">
      <h2 className="font-heading text-foreground text-lg font-semibold">
        Related Articles
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        This is currently the only published article on the Envis8ge Blog —
        related articles will appear here automatically once more are published.
      </p>
    </div>
  );
}

export function ArticleNavPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-1 border-t border-neutral-200 pt-6 text-center">
      <p className="text-muted-foreground text-sm">
        This is the first article on the Envis8ge Blog.
      </p>
      <p className="text-muted-foreground text-sm">
        Previous/next navigation will appear once more are published.
      </p>
    </div>
  );
}
