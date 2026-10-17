import type { Project } from "../_data/types";
import { PortfolioGrid } from "./portfolio-grid";

/**
 * Renders every project in a grid — no search or industry filtering,
 * per explicit request. PortfolioGrid stays a separate component so it
 * can still be reused/restyled independently.
 */
export function PortfolioListing({ projects }: { projects: Project[] }) {
  return <PortfolioGrid projects={projects} />;
}
