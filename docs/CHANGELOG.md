# Changelog

**Status: Locked, living document.** Updated after every approved phase — do not edit past entries retroactively; append new ones.

---

## Phase 1

**Summary:** Project foundation initialized — Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui tooling, Framer Motion, and Lucide React. Design tokens from the locked Design System (colors, typography, radius, shadows, breakpoints) mapped into `globals.css`; confirmed brand fonts (Montserrat/Poppins/Lato) wired via `next/font`; ESLint + Prettier configured; git initialized. No pages or UI components built — foundation only, per scope.

**Git Commit:** `Phase 1 - Project Initialization` (`ec1ca53`)

**Major Decisions:**
- Scaffolded via a temporary lowercase-named subfolder then merged into the project root, since npm forbids capital letters in package names (the project folder is `Envis8ge-v2`).
- Pinned to Next.js 16 (current stable) per explicit direction, after an initial mis-scaffold pulled a Next 15 target by default.
- Removed shadcn's auto-generated `Button` component — its default styling (non-pill radius, `dark:` variants) contradicted the locked pill-button/light-only design system; proper components were deferred to Phase 2.
- No dark mode anywhere, per the locked Design System.
- **Incident:** an unscoped `npx prettier --write .` reformatted 9 locked documentation/content files. All were restored exactly from the original authored text, and `.prettierignore` was updated to permanently exclude `docs/` and `content/` from any formatting tool.

---

## Phase 2

**Summary:** Global layout built — Header (sticky, scroll-shadow, desktop nav), accessible Mobile Nav (Base UI Dialog), Footer (confirmed contact info/nav/copyright), Global Container and Section wrapper, Global Buttons and Cards, Skeleton loading primitive, Scroll-to-Top button, and the Global Animation System (`FadeIn`, `StaggerGroup`/`StaggerItem`, `PageTransition`, backed by `lib/motion.ts` tokens mirroring Design System Section 20). No page content (Home/Portfolio/Blog/Contact) built — layout only, per scope. `docs/PROJECT_ARCHITECTURE.md` created as the long-term technical reference.

**Git Commit:** `Phase 2 - Global Layout` (`f84681b`)

**Major Decisions:**
- Mobile nav built on `@base-ui/react` Dialog (already a transitive dependency) for real focus-trap/Escape/aria-modal accessibility, animated via CSS transitions on its `data-starting-style`/`data-ending-style` attributes rather than Framer Motion, to keep micro-interactions off the JS thread.
- Logo implemented as a text wordmark placeholder — no vector/source logo file exists yet; flagged for replacement once the client provides a real asset.
- Footer background color set to the Design System's own documented "Proposed default, to be confirmed" (black/`bg-secondary`).
- Copyright line uses a dynamically computed year instead of literally reproducing the live site's "2026/2027" (assessed as a page-builder display bug, not a convention worth preserving).
- Pre-Phase-3 codebase audit: confirmed no duplicate components, no dead code, no TODO comments, consistent kebab-case/PascalCase naming, and correct Server/Client component boundaries (only `Header`, `MobileNav`, `ScrollToTop`, `Providers`, and the `motion/` wrappers are Client Components — everything else, including `Footer`, `Logo`, `Container`, `Section`, `Button`, and `Card`, is a Server Component). One fix applied: `shadcn` (a CLI-only tool, referenced only via a build-time CSS import) was moved from `dependencies` to `devDependencies`.

---

<!-- Add new phase entries below this line, in order. -->
