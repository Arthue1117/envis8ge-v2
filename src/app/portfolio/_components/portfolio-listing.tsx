"use client";

import { useMemo, useState } from "react";

import { industries, industrySlugFor } from "../_data/industries";
import type { Project } from "../_data/types";
import { PortfolioFilters } from "./portfolio-filters";
import { PortfolioGrid } from "./portfolio-grid";

/**
 * Owns search + industry filter state client-side, same split as
 * BlogListing: this component holds state, PortfolioFilters and
 * PortfolioGrid stay presentational so either can be reused or
 * restyled independently.
 */
export function PortfolioListing({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesIndustry =
        !activeIndustry || industrySlugFor(project.industry) === activeIndustry;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.clientName.toLowerCase().includes(q) ||
        (project.industry?.toLowerCase().includes(q) ?? false);
      return matchesIndustry && matchesQuery;
    });
  }, [projects, activeIndustry, query]);

  const activeIndustryName =
    industries.find((i) => i.slug === activeIndustry)?.name ?? null;

  return (
    <div>
      <PortfolioFilters
        query={query}
        onQueryChange={setQuery}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
      />
      <PortfolioGrid
        projects={filtered}
        activeIndustryName={activeIndustryName}
      />
    </div>
  );
}
