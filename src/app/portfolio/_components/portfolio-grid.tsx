import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

import type { Project } from "../_data/types";
import { PortfolioCard } from "./portfolio-card";

/**
 * Fade-up + stagger reveal (Design System Section 20.5) on the card
 * grid. Desktop 4 columns / Tablet 2 / Mobile 1, per spec. Renders a
 * real empty state instead of nothing when a filter matches no
 * projects yet.
 */
export function PortfolioGrid({
  projects,
  activeIndustryName,
}: {
  projects: Project[];
  activeIndustryName: string | null;
}) {
  if (projects.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-2 text-center">
        <p className="font-heading text-foreground font-semibold">
          No projects yet
        </p>
        <p className="text-muted-foreground max-w-sm text-sm">
          {activeIndustryName
            ? `We don't have a published case study in ${activeIndustryName} yet — check back soon.`
            : "No projects match your search."}
        </p>
      </div>
    );
  }

  return (
    <StaggerGroup className="tablet:grid-cols-2 desktop:grid-cols-4 mt-10 grid grid-cols-1 gap-6">
      {projects.map((project) => (
        <StaggerItem key={project.slug}>
          <PortfolioCard project={project} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
