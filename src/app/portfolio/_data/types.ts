/**
 * Portfolio content model. Each project is its own data file under
 * `_data/projects/` (per your explicit architecture request) so adding
 * a future case study never touches existing files — see
 * `_data/projects/index.ts` for the aggregation point.
 *
 * `industry` and `services` are only populated where confirmed
 * (docs/02-brand-guidelines.md Section 5's confirmed client groupings);
 * otherwise `null`, never guessed. `overview`/`challenge`/`strategy`/
 * `execution`/`results` are real content gaps — docs/05-content-plan.md
 * Section 4 flags this as the single largest gap in the project — so
 * every project starts with an explicit placeholder string rather than
 * an invented case study narrative or fabricated results, and is filled
 * in per-field only where the client's own case study page (envis8ge.com)
 * has real, directly corresponding copy — fields with no matching source
 * content stay CONTENT_PENDING rather than being invented to fill the
 * template's shape.
 *
 * `heroImage`/`galleryImages` are real photos migrated from that same
 * source page (public/images/portfolio/<slug>/) — omitted (falls back to
 * the generic placeholder graphic) when no source page has been migrated
 * yet. `testimonial` is a real, attributed client quote where the source
 * page has one; otherwise omitted, never invented.
 */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export interface Project {
  slug: string;
  clientName: string;
  industry: string | null;
  services: string[] | null;
  overview: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  hasRealContent: boolean;
  heroImage?: string;
  galleryImages?: string[];
  testimonial?: Testimonial;
}

export const CONTENT_PENDING =
  "This project's case study content is still being prepared with the client and hasn't been published yet — check back soon.";
