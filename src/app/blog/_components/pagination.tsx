import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Blog Plan Section 2 — "ready for future posts." With a single
 * article, `totalPages` is always 1 and this renders nothing; it
 * activates automatically as more articles are published, no code
 * changes needed.
 */
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="text-foreground hover:text-primary rounded-pill inline-flex size-9 items-center justify-center transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft aria-hidden className="size-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
          className={cn(
            "rounded-pill inline-flex size-9 items-center justify-center text-sm font-medium transition-colors duration-150",
            n === page
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="text-foreground hover:text-primary rounded-pill inline-flex size-9 items-center justify-center transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight aria-hidden className="size-4" />
      </button>
    </nav>
  );
}
