import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

import type { Project } from "../_data/types";
import { PortfolioCard } from "./portfolio-card";

/**
 * Fade-up + stagger reveal (Design System Section 20.5) on the card
 * grid. Desktop 4 columns / Tablet 2 / Mobile 1, per spec.
 */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
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
