import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { CONTENT_PENDING } from "../_data/types";
import { placeholderImageFor } from "../_data/placeholder-image";
import { projects } from "../_data/projects";
import { CaseStudyHero } from "../_components/case-study-hero";
import { CaseStudyLayout } from "../_components/case-study-layout";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `${siteConfig.url}/portfolio/${project.slug}`;
  const ogImage = `${siteConfig.url}${project.heroImage ?? placeholderImageFor(project.slug)}`;
  const description =
    project.overview !== CONTENT_PENDING
      ? project.overview
      : `${project.clientName} case study${project.industry ? ` — ${project.industry}` : ""}. Full write-up coming soon.`;

  return {
    title: `${project.clientName} Case Study`,
    description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.clientName} Case Study | Envis8ge`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 900 }],
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.clientName} Case Study | Envis8ge`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const related = projects
    .filter((p) => p.slug !== slug)
    .filter((p) => (project.industry ? p.industry === project.industry : true))
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : projects.filter((p) => p.slug !== slug).slice(0, 3);

  const url = `${siteConfig.url}/portfolio/${project.slug}`;
  const ogImage = `${siteConfig.url}${project.heroImage ?? placeholderImageFor(project.slug)}`;

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.clientName} Case Study`,
    description:
      project.overview !== CONTENT_PENDING
        ? project.overview
        : `${project.clientName} case study. Full write-up coming soon.`,
    image: ogImage,
    url,
    about: { "@type": "Organization", name: project.clientName },
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo/envis8ge-logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-SG",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteConfig.url}/portfolio`,
      },
      { "@type": "ListItem", position: 3, name: project.clientName, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CaseStudyHero project={project} />
      <CaseStudyLayout
        project={project}
        previous={previous}
        next={next}
        related={relatedFallback}
      />
    </>
  );
}
