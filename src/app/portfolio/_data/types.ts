/**
 * Portfolio content model. Each project is its own data file under
 * `_data/projects/` (per your explicit architecture request) so adding
 * a future case study never touches existing files — see
 * `_data/projects/index.ts` for the aggregation point.
 *
 * `industry` and `services` are only populated where confirmed
 * (docs/02-brand-guidelines.md Section 5's confirmed client groupings);
 * otherwise `null`, never guessed.
 *
 * `overview`/`execution`/`results` map to the three sections every
 * source case-study page on envis8ge.com actually has: an unlabeled
 * intro paragraph, "Our Work", and "Our Results" — confirmed identical
 * across all 31 source pages (same GHL page template). There is no
 * separate "Challenge"/"Strategy" heading on any source page, so those
 * fields were removed rather than kept as permanently-empty
 * `CONTENT_PENDING` slots forcing content into a template shape the
 * source doesn't use. `execution`/`results` are real content gaps only
 * where a source page genuinely lacks that section (e.g. ARC has no
 * "Our Results") — `CONTENT_PENDING` is reserved for that, never for
 * content that exists on the source but wasn't migrated yet.
 *
 * `heroImage`/`galleryImages` are real photos migrated from that same
 * source page (public/images/portfolio/<slug>/) — omitted (falls back to
 * the generic placeholder graphic) when no source page has been migrated
 * yet.
 *
 * `pageTitle` is the exact page title from the source page (its literal
 * H1, e.g. "VivoCity Singapore" or "VSTECS Singapore") — used as the
 * heading for the intro/overview section in `CaseStudyLayout` instead of
 * a generic "Overview" label. This is intentionally separate from
 * `clientName`, which is the shorter name used everywhere else in this
 * site's own design (cards, hero `<h1>`, breadcrumbs, related-case-study
 * links) — the two often differ (e.g. clientName "VSTECS" vs pageTitle
 * "VSTECS Singapore") because the source page's title and this site's
 * short display name aren't always the same string.
 *
 * No testimonial field: client quotes are intentionally not displayed
 * on case-study pages, per explicit request.
 */
export interface Project {
  slug: string;
  clientName: string;
  pageTitle: string;
  industry: string | null;
  services: string[] | null;
  overview: string;
  execution: string;
  results: string;
  hasRealContent: boolean;
  heroImage?: string;
  galleryImages?: string[];
}

export const CONTENT_PENDING =
  "This project's case study content is still being prepared with the client and hasn't been published yet — check back soon.";
