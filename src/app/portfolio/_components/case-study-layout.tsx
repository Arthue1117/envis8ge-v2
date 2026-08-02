import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

import { CONTENT_PENDING, type Project } from "../_data/types";
import { CaseStudyCTA } from "./case-study-cta";
import { CaseStudyGallery } from "./case-study-gallery";
import { PortfolioCard } from "./portfolio-card";

const SECTIONS: { key: keyof Project; heading: string }[] = [
  { key: "overview", heading: "Overview" },
  { key: "challenge", heading: "The Challenge" },
  { key: "strategy", heading: "Our Strategy" },
  { key: "execution", heading: "Execution" },
  { key: "results", heading: "Results" },
];

/**
 * Everything below a case study's hero: narrative sections (each
 * rendered from `Project`, so a future project only needs a new data
 * file — nothing here changes), gallery, CTA, previous/next navigation,
 * and related case studies. Sections still awaiting real client content
 * render the shared `CONTENT_PENDING` copy in a visibly muted/italic
 * style so it reads as a placeholder, not a finished answer.
 */
export function CaseStudyLayout({
  project,
  previous,
  next,
  related,
}: {
  project: Project;
  previous: Project | null;
  next: Project | null;
  related: Project[];
}) {
  return (
    <div className="tablet:px-6 tablet:py-14 mx-auto w-full max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {SECTIONS.map(({ key, heading }) => {
            const value = project[key];
            if (typeof value !== "string") return null;
            const pending = value === CONTENT_PENDING;
            return (
              <FadeIn key={key}>
                <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                  {heading}
                </h2>
                <p
                  className={
                    pending
                      ? "text-muted-foreground mt-3 leading-relaxed italic"
                      : "text-foreground mt-3 leading-relaxed"
                  }
                >
                  {value}
                </p>
              </FadeIn>
            );
          })}
        </div>

        {project.testimonial && (
          <FadeIn className="mx-auto max-w-3xl">
            <blockquote className="border-primary font-heading text-foreground tablet:text-2xl border-l-4 py-2 pl-6 text-xl font-semibold italic">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-muted-foreground mt-3 pl-6 text-sm not-italic">
              — {project.testimonial.name}, {project.testimonial.title}
            </p>
          </FadeIn>
        )}

        <CaseStudyGallery project={project} />

        <CaseStudyCTA />

        {(previous || next) && (
          <div className="tablet:grid-cols-2 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-8">
            {previous ? (
              <Link
                href={`/portfolio/${previous.slug}`}
                className="group hover:border-primary flex items-center gap-3 rounded-md border border-neutral-200 p-4 transition-colors duration-150"
              >
                <ArrowLeft
                  aria-hidden
                  className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-1"
                />
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Previous
                  </span>
                  <span className="font-heading text-foreground text-sm font-semibold">
                    {previous.clientName}
                  </span>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/portfolio/${next.slug}`}
                className="group hover:border-primary flex items-center justify-end gap-3 rounded-md border border-neutral-200 p-4 text-right transition-colors duration-150"
              >
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Next
                  </span>
                  <span className="font-heading text-foreground text-sm font-semibold">
                    {next.clientName}
                  </span>
                </div>
                <ArrowRight
                  aria-hidden
                  className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        )}

        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
              Related Case Studies
            </h2>
            <StaggerGroup className="tablet:grid-cols-3 mt-6 grid grid-cols-1 gap-6">
              {related.map((relatedProject) => (
                <StaggerItem key={relatedProject.slug}>
                  <PortfolioCard project={relatedProject} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}
      </div>
    </div>
  );
}
