import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { placeholderImageFor } from "../_data/placeholder-image";
import { viewCaseStudyLabel } from "../_data/copy";
import type { Project } from "../_data/types";

/**
 * Whole-card link (Design System pattern shared with BlogCard): image
 * zoom + card lift + shadow grow all driven by `group`/`group-hover`
 * CSS transitions rather than Framer Motion `whileHover`, since these
 * are simple transform/shadow changes that don't need JS — and CSS
 * `:hover` never fires from a touch tap, so no `useHoverCapable` gating
 * is needed here either. `cursor-pointer` plus the arrow's
 * `group-hover:translate-x-1` give the card an obvious interactive cue.
 */
export function PortfolioCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full cursor-pointer"
    >
      <Card className="h-full overflow-hidden rounded-lg p-0 shadow-sm transition-[transform,box-shadow] duration-250 group-hover:-translate-y-1.5 group-hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.heroImage ?? placeholderImageFor(project.slug)}
            alt=""
            fill
            className="object-cover transition-transform duration-[500ms] ease-out group-hover:scale-105"
            sizes="(min-width: 64em) 25vw, (min-width: 48em) 50vw, 100vw"
          />
          {project.industry && (
            <span className="bg-background/90 text-foreground rounded-pill absolute top-4 left-4 px-3 py-1 text-xs font-semibold">
              {project.industry}
            </span>
          )}
        </div>
        <CardContent className="flex flex-col gap-2 p-6">
          <h3 className="font-heading text-foreground text-lg font-semibold">
            {project.clientName}
          </h3>
          <span className="text-primary-text mt-1 inline-flex items-center gap-1 text-sm font-semibold">
            {viewCaseStudyLabel}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-150 group-hover:translate-x-1"
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
