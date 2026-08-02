import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Generic breadcrumb trail. Not blog-specific — Portfolio Detail pages
 * (docs/04-sitemap.md Section 2.3) reuse this too, hence living in
 * `components/ui/` rather than a route-specific folder. `variant="dark"`
 * swaps the default neutral palette for a white-on-dark one, for use
 * over a photo/gradient hero (e.g. CaseStudyHero) — default behavior is
 * unchanged for existing callers.
 */
export function Breadcrumbs({
  items,
  variant = "light",
}: {
  items: { label: string; href?: string }[];
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          dark ? "text-white/60" : "text-neutral-500"
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors duration-150",
                    dark ? "hover:text-white" : "hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={
                    last
                      ? cn(
                          "font-medium",
                          dark ? "text-white" : "text-foreground"
                        )
                      : undefined
                  }
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
