import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { ParallaxImage } from "@/components/motion/parallax-image";

import { placeholderImageFor } from "../_data/placeholder-image";
import type { Project } from "../_data/types";

/**
 * No client logo assets are confirmed for any project (docs/05-content-plan.md
 * Section 4 — hero/gallery imagery is a content gap awaiting the client),
 * so this never renders a logo mark. Uses the project's own migrated
 * `heroImage` (public/images/portfolio/<slug>/) where available; falls
 * back to the generic placeholder graphic for projects still awaiting
 * their source page migration.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="tablet:h-[420px] desktop:h-[460px] relative flex h-[300px] items-end overflow-hidden bg-black">
      <ParallaxImage
        src={project.heroImage ?? placeholderImageFor(project.slug)}
        alt=""
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 55%)",
        }}
      />

      <div className="tablet:px-6 relative mx-auto w-full max-w-[1200px] px-4 pb-10">
        <FadeIn>
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.clientName },
            ]}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.industry && (
              <span className="bg-primary/90 text-foreground rounded-pill px-3 py-1 text-xs font-semibold">
                {project.industry}
              </span>
            )}
            {project.services?.map((service) => (
              <span
                key={service}
                className="rounded-pill bg-white/15 px-3 py-1 text-xs font-semibold text-white"
              >
                {service}
              </span>
            ))}
          </div>
          <h1 className="font-heading tablet:text-4xl mt-3 text-3xl font-bold text-white">
            {project.clientName}
          </h1>
        </FadeIn>
      </div>
    </section>
  );
}
