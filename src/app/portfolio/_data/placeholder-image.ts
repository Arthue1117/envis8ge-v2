/**
 * The 8 real campaign images from the live site's portfolio grid
 * (public/images/portfolio/portfolio-1..8) carry no client attribution
 * there either (no alt text, no captions) — see _sections/data.ts on the
 * Home page for the same finding. Assigning one of those photos to a
 * named case study here would fabricate a client/work association that
 * isn't confirmed anywhere, so case studies instead get one of three
 * generic, clearly-abstract placeholder graphics (composited the same
 * honest way as the Blog/Contact hero backgrounds) until real project
 * imagery is supplied by each client.
 */
const PLACEHOLDER_COUNT = 3;

export function placeholderImageFor(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const index = (hash % PLACEHOLDER_COUNT) + 1;
  return `/images/portfolio/case-study-placeholder-${index}.jpg`;
}
