import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Generic breadcrumb trail. Not blog-specific — Portfolio Detail pages
 * (docs/04-sitemap.md Section 2.3) will reuse this too, hence living in
 * `components/ui/` rather than a route-specific folder.
 */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-neutral-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "text-foreground font-medium" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight aria-hidden className="size-3.5 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
