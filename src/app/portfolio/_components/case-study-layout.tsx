import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";

import { CONTENT_PENDING, type Project } from "../_data/types";
import { CaseStudyCTA } from "./case-study-cta";
import { CaseStudyGallery } from "./case-study-gallery";

const SECTIONS: { key: keyof Project; heading: string }[] = [
  { key: "execution", heading: "Our Work" },
  { key: "results", heading: "Our Results" },
];

/**
 * Everything below a case study's hero: narrative sections (each
 * rendered from `Project`, so a future project only needs a new data
 * file — nothing here changes), gallery, CTA, and previous/next
 * navigation. The intro/overview section is rendered separately from
 * `SECTIONS` because its heading is per-project — the source page's own
 * exact title (`project.pageTitle`, e.g. "VivoCity Singapore"), not a
 * generic "Overview" label. "Our Work"/"Our Results" match the exact
 * headings every source case-study page uses. A section is only
 * rendered when the source page actually had it — `CONTENT_PENDING`
 * sections are skipped entirely (e.g. ARC has no "Our Results" on its
 * source page) rather than shown as an empty placeholder heading.
 */
export function CaseStudyLayout({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project | null;
  next: Project | null;
}) {
  return (
    <div className="tablet:px-6 tablet:py-14 mx-auto w-full max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {project.overview !== CONTENT_PENDING && (
            <FadeIn>
              <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                {project.pageTitle}
              </h2>
              <p className="text-foreground mt-3 leading-relaxed">
                {project.overview}
              </p>
            </FadeIn>
          )}
          {SECTIONS.map(({ key, heading }) => {
            const value = project[key];
            if (typeof value !== "string" || value === CONTENT_PENDING) {
              return null;
            }
            return (
              <FadeIn key={key}>
                <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                  {heading}
                </h2>
                <p className="text-foreground mt-3 leading-relaxed">
                  {value}
                </p>
              </FadeIn>
            );
          })}
        </div>

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
                  className="text-muted-foreground group-hover:text-primary-text size-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-1"
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
                  className="text-muted-foreground group-hover:text-primary-text size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
