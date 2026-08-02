# Project Architecture

**Status: Locked technical reference.** This document describes how the codebase is organized and how future development should extend it. It does not restate business, content, or design decisions already recorded in the locked planning documents ([01-project-brief.md](01-project-brief.md) through [06-blog-plan.md](06-blog-plan.md)) — consult those for *what* the site says and looks like; consult this document for *how the code is structured*.

---

## 1. Overall Architecture

The site is a single Next.js application (App Router), statically generated wherever possible. There is no separate backend service, API layer, or database at this stage — content is file-based (Markdown/JSON under `content/`, per docs/05-content-plan.md and docs/06-blog-plan.md) and consumed at build time. If a CMS or database is introduced later (still "To be confirmed" per the locked docs), it should slot in as a data source behind the same page/component structure described below, not require a restructure.

Rendering model:
- **Server Components by default.** Every component is a Server Component unless it needs interactivity, browser APIs, or React state — those are marked `"use client"` explicitly and kept as small/leaf as possible (e.g. `MobileNav`, `Header`'s scroll listener, motion wrappers).
- **Client Components are composed, not inherited.** A client component (e.g. `Providers`, `PageTransition`) wraps server-rendered children via the `children` prop, so the subtree under it can still be server-rendered where possible.

---

## 2. Folder Structure

```
docs/                         Locked planning documents (source of truth for product decisions)
content/                      File-based content (blog articles, metadata, schema, creative briefs)
public/                       Static assets served as-is
src/
  app/                        App Router routes only — no components live here except page.tsx/layout.tsx files
  components/
    ui/                       Design-system primitives (Button, Card, Skeleton) — generic, no business logic
    layout/                   Structural/global layout (Header, Footer, Container, Section, MobileNav, Logo, ScrollToTop)
    motion/                   Reusable Framer Motion wrapper components (FadeIn, StaggerGroup, PageTransition)
    providers/                App-wide client providers (currently: MotionConfig)
  config/                     Small typed constants (site.ts, nav.ts) — not logic, not fetched data
  lib/                        Framework-agnostic utilities (cn, motion tokens, reading-time calc)
  hooks/                      Reusable client hooks (e.g. useScrolled)
```

**Route-specific components live inside their route folder**, not in `components/`. e.g. a Portfolio Detail-only component belongs under `src/app/portfolio/[slug]/`, imported only by that route. `components/` is reserved for things reused across at least two routes.

---

## 3. Technology Stack

Next.js 16 (App Router, Turbopack default), React 19, TypeScript (strict), Tailwind CSS v4 (CSS-first theme, no `tailwind.config.ts` — theme tokens live in `src/app/globals.css`), shadcn/ui conventions (`components.json`, `cn()` in `lib/utils.ts`) with `@base-ui/react` as the underlying accessible-primitives library, Framer Motion, Lucide React icons, ESLint (flat config) + Prettier.

Full rationale for these choices and version-specific notes are in the Phase 1 delivery summary (conversation record), not repeated here.

---

## 4. Design Principles

1. **Preserve, don't invent.** Every visual/brand decision traces back to a Confirmed fact in docs/02-brand-guidelines.md or an explicit Proposed/Approved item in docs/03-design-system.md. Code comments cite the section they implement (e.g. "Design System Section 8"). If you need a value not covered there, add it to the design system doc first, then implement it — don't invent inline.
2. **Tokens over literals.** Colors, spacing, radius, shadows, breakpoints, and motion durations/easings are defined once (in `globals.css` and `lib/motion.ts`) and consumed by name. Never hardcode a hex value, arbitrary pixel spacing, or animation duration inside a component — reference the token.
3. **Light-only, no dark mode.** Per docs/03-design-system.md Summary. Do not add `dark:` variants or a theme toggle.

---

## 5. Coding Standards

- TypeScript strict mode is on; do not add `any` or disable strict checks to unblock a build.
- Prefer Server Components; add `"use client"` only when the component genuinely needs interactivity/browser APIs, and keep the client boundary as low in the tree as possible.
- Co-locate a component's variants/logic in one file; don't split a single component across multiple files unless it's genuinely reused elsewhere.
- Run `npm run lint` and `npm run format` before considering work done. `.prettierignore` deliberately excludes `docs/` and `content/` — never remove that exclusion (see docs/03-design-system.md commit history / Phase 1 incident).
- No comments explaining *what* code does; comments are reserved for *why* (a cited design-system section, a non-obvious constraint), matching the convention already used throughout `src/`.

---

## 6. Component Organization

| Folder | Contains | Reused by |
|---|---|---|
| `components/ui/` | Style-only primitives (Button, Card, Skeleton, and future Input/Table/Modal per docs/03-design-system.md Sections 9/16/17) | Any component, any route |
| `components/layout/` | Global chrome (Header, Footer, Container, Section, MobileNav, Logo, ScrollToTop) | Every route, via root layout |
| `components/motion/` | Animation wrapper components consuming `lib/motion.ts` tokens | Any component that needs scroll-reveal, stagger, or page-transition behavior |
| `components/providers/` | Client-side context/config providers mounted once in root layout | Root layout only |
| Route folders (`app/**`) | Page- or route-segment-specific composition | That route only |

Rule of thumb: if a component encodes a *business/content* concept (a Portfolio Card's specific fields, a Blog Card's excerpt logic), it belongs in its route folder and composes primitives from `components/ui/`. If it's purely structural or stylistic with no content opinion, it belongs in `components/`.

---

## 7. Animation Strategy

`src/lib/motion.ts` is the single source of truth for animation values (durations, easing curves), mirroring docs/03-design-system.md Section 20 exactly — do not define a duration or easing curve anywhere else. Three consumption patterns:

1. **Scroll reveals / stagger:** use `<FadeIn>` / `<StaggerGroup>` + `<StaggerItem>` from `components/motion/`. Don't hand-write `whileInView` variants in page code.
2. **Page transitions:** handled once, globally, by `<PageTransition>` in the root layout. Individual pages do not need their own transition logic.
3. **Simple CSS transitions** (hover states, the mobile menu's open/close): implemented with plain Tailwind `transition-*` utilities using the same duration/easing values, not Framer Motion — Framer Motion is reserved for scroll-triggered and route-level animation, not micro-interactions, to keep bundle weight down.

Reduced motion is handled globally via `MotionConfig reducedMotion="user"` in `Providers` — components using Framer Motion do not need their own `prefers-reduced-motion` checks. Components using CSS-only animation (e.g. `Skeleton`'s pulse) use Tailwind's `motion-safe:` variant for the same guarantee.

---

## 8. SEO Architecture

- `src/config/site.ts` holds shared SEO constants (name, url, description, locale) consumed by the root layout's `metadata` export. Route-level pages override `title`/`description` via their own `generateMetadata`/`metadata` export, inheriting the title template (`%s | Envis8ge`) from the root.
- Structured data (JSON-LD) for content-driven pages (blog articles) is authored as plain JSON files alongside the content itself (see `content/blog/**/article-schema.json`, `faq-schema.json`) and should be imported and injected via a `<script type="application/ld+json">` in the relevant route — not hand-built inline in the component.
- Per-page canonical URLs, Open Graph, and Twitter Card metadata follow the pattern already established in `content/blog/organic-vs-paid-social-media-singapore/metadata.md`: one metadata file per content item, consumed by the route at build time.

---

## 9. Content Architecture

Content lives under `content/`, organized by type (`content/blog/<slug>/`), separate from `src/`. Each content item is a small bundle of files (body, metadata, schema) rather than one monolithic record, so schema/metadata can be validated or regenerated independently of the prose. Routes under `src/app/` read from `content/` at build time (via file system reads or, later, a CMS adapter behind the same interface) — routes should never contain hardcoded copy that belongs in `content/`.

---

## 10. Blog Architecture

Per docs/06-blog-plan.md Section 3, every article uses one shared template component tree (Hero, Sticky TOC, Key Takeaways, Main Content blocks, FAQ Accordion, Related Articles, CTA, Prev/Next, Author Bio, Newsletter placeholder) driven by a single content bundle under `content/blog/<slug>/`. The template lives in `src/app/blog/[slug]/`; individual articles never fork the template — new content-block types (Case Study Card, Pro Tip, etc.) are added as reusable components under that route folder (or promoted to `components/ui/` if a second content type needs them) rather than one-off markup per article. Category and search are derived from content frontmatter/metadata, not maintained as a separate index to keep in sync by hand.

---

## 11. Portfolio Architecture

Per docs/04-sitemap.md Section 2.3, Portfolio Detail uses one reusable dynamic route (`src/app/portfolio/[slug]/`) and one template component, parameterized by client/industry/services/challenge/solution/results/gallery content — never a bespoke page per project. Each project's content is a data bundle (mirroring the blog's `content/blog/<slug>/` pattern) under `content/portfolio/<slug>/` once that content is populated by the client (docs/05-content-plan.md Section 4).

---

## 12. Naming Conventions

- Files: kebab-case (`scroll-to-top.tsx`, `use-scrolled.ts`).
- Components: PascalCase exports matching the concept, not the filename mechanically (e.g. `stagger-group.tsx` exports `StaggerGroup` and `StaggerItem`).
- Hooks: `useX` naming, one hook per file under `src/hooks/`.
- Design tokens: match the exact names used in docs/03-design-system.md (`color-primary`, `radius-pill`, `duration-slow`) so a reviewer can grep the doc section name straight into the codebase.
- Route folders: match the URL segment exactly, including dynamic segment brackets (`app/blog/[slug]/`).

---

## 13. File Organization Rules

- One component per file; co-located sub-parts (e.g. `CardHeader`, `CardTitle`) are exported from the same file as their parent when they have no independent reuse (see `components/ui/card.tsx`).
- No barrel (`index.ts`) re-export files unless a folder grows past ~6 sibling modules and imports become unwieldy — prefer direct imports (`@/components/ui/button`) until then.
- Config/constants (`config/`) contain no logic and fetch nothing — if a value needs computation or I/O, it belongs in `lib/`.

---

## 14. Future Scalability Considerations

- **CMS migration:** content currently read from the filesystem under `content/` should be swappable for a CMS-backed data source behind the same shape (frontmatter/metadata fields) without changing route components — keep data-fetching isolated to a thin loader function per content type rather than inlined in page components.
- **New content-block types** (blog Main Content, Section 3.5) should be added as discriminated-union-friendly components so the article renderer can switch on a `type` field, keeping the template itself unchanged.
- **New service verticals / landing pages:** the `Section` + `Container` + `FadeIn`/`StaggerGroup` primitives are intentionally content-agnostic so new marketing pages can be assembled from existing building blocks rather than new one-off layout code.
- **i18n:** not in scope today (docs/01-project-brief.md marks multi-language "To be confirmed"), but the `siteConfig.locale` field and `lang`/`inLanguage` metadata fields are already parameterized, not hardcoded, so a locale switch would touch config, not every component.

---

**Maintenance note:** when a future phase introduces a genuinely new architectural pattern (e.g. adding a CMS, adding server actions/forms, adding authentication), update this document as part of that phase's deliverables — it should stay current, not become stale reference material.
