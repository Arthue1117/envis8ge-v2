import Image from "next/image";

import { FadeIn } from "@/components/motion/fade-in";

import type { Project } from "../_data/types";

const GENERIC_PLACEHOLDERS = [
  "/images/portfolio/case-study-placeholder-1.jpg",
  "/images/portfolio/case-study-placeholder-2.jpg",
  "/images/portfolio/case-study-placeholder-3.jpg",
];

/**
 * Uses the project's own migrated `galleryImages` (real photos from its
 * source page, public/images/portfolio/<slug>/) where available. Projects
 * that haven't been migrated yet (docs/05-content-plan.md Section 4 — a
 * client-provided content gap) fall back to the same three generic
 * placeholder graphics with an explicit caption, rather than fabricating
 * project-specific screenshots.
 */
export function CaseStudyGallery({ project }: { project: Project }) {
  const hasRealImages = !!project.galleryImages?.length;
  const images = hasRealImages ? project.galleryImages! : GENERIC_PLACEHOLDERS;

  return (
    <div>
      <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
        Gallery
      </h2>
      {!hasRealImages && (
        <p className="text-muted-foreground mt-2 text-sm">
          Placeholder imagery — real project visuals will be added once supplied
          by the client.
        </p>
      )}
      <FadeIn className="tablet:grid-cols-3 mt-6 grid grid-cols-1 gap-4">
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt=""
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 64em) 33vw, 100vw"
            />
          </div>
        ))}
      </FadeIn>
    </div>
  );
}
