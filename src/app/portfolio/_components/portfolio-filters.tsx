import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { industries } from "../_data/industries";

/**
 * Presentational filter bar: industry pills (Confirmed taxonomy,
 * _data/industries.ts) plus a search input, mirroring BlogListing's
 * search+category pattern. "All" is the only pill guaranteed to have
 * matches today — the others render a real empty state in
 * PortfolioGrid rather than being hidden, so the architecture is ready
 * the moment a project is added in an industry that has none yet.
 */
export function PortfolioFilters({
  query,
  onQueryChange,
  activeIndustry,
  onIndustryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  activeIndustry: string | null;
  onIndustryChange: (slug: string | null) => void;
}) {
  return (
    <div className="tablet:flex-row tablet:items-center tablet:justify-between flex flex-col gap-4">
      <div className="tablet:max-w-xs relative w-full">
        <Search
          aria-hidden
          className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search projects"
          aria-label="Search projects"
          className="rounded-pill focus-visible:ring-ring w-full border border-neutral-300 py-2 pr-4 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onIndustryChange(null)}
          className={cn(
            "rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-150",
            activeIndustry === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {industries.map((industry) => (
          <button
            key={industry.slug}
            type="button"
            onClick={() => onIndustryChange(industry.slug)}
            className={cn(
              "rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-150",
              activeIndustry === industry.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {industry.name}
          </button>
        ))}
      </div>
    </div>
  );
}
