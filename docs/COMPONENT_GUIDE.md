# Component Guide

**Status: Locked reference.** Documents every reusable component that exists in the codebase as of Phase 2. Update this document as part of any future phase that adds, changes, or retires a reusable component — do not let it drift out of sync with `src/components/`. Route-specific components (e.g. Home page sections built in Phase 3+) are documented separately if/when they become reusable; see [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) Section 6 for the reuse boundary.

---

## Providers

**Purpose:** Root client-side context provider(s) for the whole app.
**Location:** `src/components/providers/providers.tsx`
**Props:** `{ children: ReactNode }`
**Dependencies:** `framer-motion` (`MotionConfig`)
**Animation behavior:** Sets `reducedMotion="user"` on `MotionConfig`, which makes every Framer Motion animation in the app automatically honor the OS `prefers-reduced-motion` setting — no other component needs its own reduced-motion check for Framer-driven animation.
**Accessibility considerations:** This is the mechanism that satisfies Design System Section 20.8 globally.
**Reuse guidelines:** Mounted once, in the root layout. Do not mount a second instance anywhere else in the tree.
**Future extensions:** If a real theme (not applicable — no dark mode, per locked Design System) or a toast/notification system is added later, it would live here as an additional provider, composed alongside `MotionConfig`.

---

## Button

**Purpose:** The one Confirmed, non-negotiable brand signature component — primary CTA styling (pill radius, `#02BAF9`, Poppins, capitalize) plus secondary/outline/ghost variants for a fuller system.
**Location:** `src/components/ui/button.tsx`
**Props:** `variant?: "primary" | "secondary" | "outline" | "ghost"`, `size?: "default" | "sm" | "lg"`, plus all native `<button>` attributes. Also exports `buttonVariants()` (a `cva` function) so non-`<button>` elements (e.g. `next/link`) can share the exact same classes.
**Dependencies:** `class-variance-authority`, `@/lib/utils` (`cn`)
**Animation behavior:** Hover darken + color transition at `duration-fast` (150ms); no Framer Motion — this is a CSS-only micro-interaction per the Animation Strategy in PROJECT_ARCHITECTURE.md Section 7.
**Accessibility considerations:** Uses a real `<button>` element (or, via `buttonVariants()`, a real `<a>`/`Link`) — never a `<div>` with a click handler. Visible focus ring via `focus-visible:ring-*`. Disabled state removes pointer events and lowers opacity.
**Reuse guidelines:** Always use `variant="primary"` for the single main call-to-action per view (matches the confirmed live-site pattern of one primary CTA). Use `buttonVariants({...})` (not the `Button` component) when the interactive element must be a `Link` for routing, as done in `Header`/`MobileNav`'s "Contact Us!" CTA.
**Future extensions:** A `loading` state (spinner/disabled combo) will likely be needed once the Contact form (Phase 6) exists.

---

## Card (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)

**Purpose:** Shared base for every card-shaped UI in the app — Service, Portfolio, and Blog cards all extend this rather than defining their own shadow/radius/hover treatment.
**Location:** `src/components/ui/card.tsx`
**Props:** Each sub-component accepts standard `React.ComponentProps<"div"|"h3"|"p">` (i.e. `className` + native attributes/children).
**Dependencies:** `@/lib/utils` (`cn`)
**Animation behavior:** `shadow-sm` → `shadow-md` on hover, `duration-base` (250ms), CSS transition (not Framer Motion) — the card itself doesn't move; pair with `FadeIn`/`StaggerItem` (see below) for scroll-entrance animation.
**Accessibility considerations:** Purely presentational; if a card is clickable, wrap its content in a real `<Link>`/`<a>`, don't attach a click handler to the `Card` div itself (keeps it keyboard/screen-reader operable for free).
**Reuse guidelines:** Compose from the sub-parts (`CardHeader` > `CardTitle`/`CardDescription`, then `CardContent`, optional `CardFooter`) rather than styling a bare `Card` directly, so all card types stay visually consistent.
**Future extensions:** Portfolio Cards and Blog Cards (Design System Sections 14–15) will be built as route-specific components in their respective phases, composing this base rather than duplicating it.

---

## Skeleton

**Purpose:** Loading placeholder for dynamic content (future Blog list, Portfolio grid, related posts) — never a spinner, per Design System Section 20.7.
**Location:** `src/components/ui/skeleton.tsx`
**Props:** Standard `React.ComponentProps<"div">`.
**Dependencies:** `@/lib/utils` (`cn`)
**Animation behavior:** `motion-safe:animate-pulse` — a plain Tailwind/CSS animation that is automatically disabled under `prefers-reduced-motion` via the `motion-safe:` variant (no JS/Framer Motion involved).
**Accessibility considerations:** Should be paired with `aria-busy`/`aria-live` on the containing region when used for real async loading states (not yet needed — no data fetching exists yet).
**Reuse guidelines:** Match the skeleton's shape (dimensions, `radius-md`) to the real content it's standing in for, so layout doesn't shift when content loads.
**Future extensions:** Not yet consumed anywhere — intentionally built ahead in Phase 2 for the Blog (Phase 5) and Portfolio (Phase 4) listing pages.

---

## Container

**Purpose:** Global horizontal max-width + padding wrapper (Design System Section 6).
**Location:** `src/components/layout/container.tsx`
**Props:** `as?: React.ElementType` (defaults to `"div"`) + standard `div` props.
**Dependencies:** `@/lib/utils` (`cn`)
**Animation behavior:** None — purely structural.
**Accessibility considerations:** `as` lets callers render a semantic element (`nav`, `section`) instead of a generic `div` where appropriate.
**Reuse guidelines:** Every section's inner content should be wrapped in this instead of defining a one-off max-width. `Section` (below) already includes it by default.
**Future extensions:** None anticipated; intentionally minimal.

---

## Section

**Purpose:** Consistent vertical spacing rhythm + background for page sections (Design System Section 3 spacing scale).
**Location:** `src/components/layout/section.tsx`
**Props:** `background?: "default" | "muted"`, `container?: boolean` (default `true`), `as?: React.ElementType` (default `"section"`), + standard section props.
**Dependencies:** `Container` (this package), `@/lib/utils`
**Animation behavior:** None itself — wrap the content passed to it in `FadeIn`/`StaggerGroup` for scroll-reveal behavior.
**Accessibility considerations:** Renders a real `<section>` by default, giving screen-reader users a landmark; pass `id` for in-page anchor navigation.
**Reuse guidelines:** This is the expected outer wrapper for every Home/Portfolio/Blog page section built from Phase 3 onward. Set `container={false}` only when a section needs an edge-to-edge background with custom inner layout.
**Future extensions:** None anticipated.

---

## Logo

**Purpose:** Brand wordmark, used in Header and Footer.
**Location:** `src/components/layout/logo.tsx`
**Props:** `className?: string`
**Dependencies:** `next/link`, `@/lib/utils`
**Animation behavior:** None.
**Accessibility considerations:** Renders as a `Link` to `/`, so it's reachable/labeled like any other navigation link.
**Reuse guidelines:** Use everywhere the brand mark is needed instead of hardcoding "Envis8ge" text.
**Future extensions:** **This is a text-placeholder, not the real logo** (no vector/source logo file exists yet — docs/02-brand-guidelines.md Section 6). Replace the internals with a real `next/image` logo asset the moment the client provides one; the component's public API (`className` prop, renders a link to `/`) should not need to change when that happens.

---

## Header

**Purpose:** Sticky global header — logo, primary nav, CTA, mobile menu trigger.
**Location:** `src/components/layout/header.tsx`
**Props:** None (reads nav items from `@/config/nav`).
**Dependencies:** `Container`, `Logo`, `MobileNav`, `buttonVariants`, `@/config/nav`, `@/hooks/use-scrolled`, `next/navigation` (`usePathname`)
**Animation behavior:** `shadow-sm` fades in via CSS `transition-shadow` (`duration-250`) once scrolled past 24px (via `useScrolled`). No Framer Motion.
**Accessibility considerations:** Nav is a labeled `<nav aria-label="Primary">`; active route gets `aria-current="page"`. Backdrop blur (`backdrop-blur`) keeps text legible over scrolled content.
**Reuse guidelines:** Mounted once, in the root layout. `"use client"` is required here (scroll + pathname state) — keep any new header content as low-interactivity as possible to avoid growing this client boundary unnecessarily.
**Future extensions:** None anticipated unless nav structure itself changes (update `@/config/nav` first, per the locked sitemap).

---

## MobileNav

**Purpose:** Accessible slide-in mobile navigation menu, triggered by a hamburger button in `Header`.
**Location:** `src/components/layout/mobile-nav.tsx`
**Props:** None.
**Dependencies:** `@base-ui/react/dialog`, `lucide-react` (`Menu`, `X`), `next/link`, `next/navigation`, `buttonVariants`, `@/config/nav`
**Animation behavior:** Open/close is driven by Base UI's `data-starting-style`/`data-ending-style` attributes with plain CSS `transition-opacity`/`transition-transform` (backdrop fade + slide-in-from-right), at `duration-base` — not Framer Motion, to keep this interaction off the JS animation thread (see PROJECT_ARCHITECTURE.md Section 7).
**Accessibility considerations:** Built on `@base-ui/react` Dialog — gets focus trap, Escape-to-close, `aria-modal`, and a labeled `Dialog.Title` ("Menu") for free. Verified working via live browser interaction (open/close cycle) during Phase 2.
**Reuse guidelines:** Self-contained; `Header` simply renders `<MobileNav />`. Don't duplicate this pattern for other overlays — extend it or build a second Dialog-based component following the same data-attribute animation pattern.
**Future extensions:** If a "Contact" or "Search" overlay is needed later (Blog search, per docs/06-blog-plan.md Section 2), follow this same Base UI Dialog + CSS-transition pattern rather than introducing a different overlay library.

---

## Footer

**Purpose:** Global footer — confirmed contact details, nav, copyright, Privacy Policy link.
**Location:** `src/components/layout/footer.tsx`
**Props:** None.
**Dependencies:** `Container`, `Logo`, `@/config/nav`, `@/config/site`
**Animation behavior:** Link color transitions only (`duration-150`, CSS).
**Accessibility considerations:** Footer nav is a labeled `<nav aria-label="Footer">`; phone/email use real `tel:`/`mailto:` links.
**Reuse guidelines:** Mounted once, in the root layout — do not re-render per page.
**Future extensions:** Footer background color is a documented "Proposed default, to be confirmed" (Design System Section 12) — revisit if the client confirms otherwise. Social media links are not included (none are published on the live site).

---

## ScrollToTop

**Purpose:** Fixed button that appears after scrolling, smooth-scrolls back to top.
**Location:** `src/components/layout/scroll-to-top.tsx`
**Props:** None.
**Dependencies:** `framer-motion` (`AnimatePresence`, `motion.button`), `lucide-react` (`ArrowUp`), `@/hooks/use-scrolled`, `@/lib/motion`
**Animation behavior:** Fade + scale entrance/exit (`duration-fast`, `easing-standard`) via Framer Motion, visible once scrolled past 400px. Respects reduced motion globally via `Providers`.
**Accessibility considerations:** Real `<button>` with `aria-label="Scroll to top"`.
**Reuse guidelines:** Mounted once, in the root layout, after `Footer`.
**Future extensions:** None anticipated.

---

## FadeIn

**Purpose:** The standard scroll-reveal wrapper — fade + upward lift, once per element, per Design System Section 20.5.
**Location:** `src/components/motion/fade-in.tsx`
**Props:** `children: ReactNode`, `className?: string`, `delay?: number` (seconds)
**Dependencies:** `framer-motion`, `@/lib/motion` (`duration`, `easing`)
**Animation behavior:** `opacity 0→1`, `y 20→0`, `duration-slow` (400ms), `easing-decelerate`, triggers once when 20% of the element is in view (`viewport={{ once: true, amount: 0.2 }}`).
**Accessibility considerations:** Reduced motion handled globally (no extra work needed here).
**Reuse guidelines:** Wrap any section content that should reveal on scroll. Use the `delay` prop sparingly (small offsets only) — for a whole grid of siblings, prefer `StaggerGroup` instead of manually staggering multiple `FadeIn` delays.
**Future extensions:** None anticipated; this is the default building block for Phase 3+ page sections.

---

## StaggerGroup / StaggerItem

**Purpose:** Reveals a grid of children (Service cards, Portfolio cards, Blog cards) with a 50–100ms stagger instead of animating simultaneously, per Design System Section 20.5.
**Location:** `src/components/motion/stagger-group.tsx`
**Props:** Both accept `children: ReactNode`, `className?: string`.
**Dependencies:** `framer-motion`, `@/lib/motion` (`fadeInUp`, `staggerContainer`)
**Animation behavior:** `StaggerGroup` triggers `staggerChildren: 0.08s` once 10% of it is in view; each `StaggerItem` child animates with the same `fadeInUp` variant as `FadeIn`.
**Accessibility considerations:** Same global reduced-motion handling as all Framer Motion components here.
**Reuse guidelines:** Wrap a `StaggerGroup` around a grid container, and wrap each grid child in `StaggerItem` (not `FadeIn` — `StaggerItem` relies on the parent's `variants` context to get its per-child delay).
**Future extensions:** This is the intended pattern for the Services grid, Portfolio grid, and Blog grid in upcoming phases.

---

## PageTransition

**Purpose:** Smooth cross-fade between routes, per Design System Section 20.6.
**Location:** `src/components/motion/page-transition.tsx`
**Props:** `children: ReactNode`
**Dependencies:** `framer-motion` (`AnimatePresence`, `motion.div`), `next/navigation` (`usePathname`), `@/lib/motion` (`pageTransition`)
**Animation behavior:** Cross-fade (`opacity` only) at `duration-page` (550ms), keyed by pathname so each route change triggers exit → enter.
**Accessibility considerations:** `mode="wait"` avoids overlapping/competing content during the transition; no layout shift since only opacity animates.
**Reuse guidelines:** Mounted once, in the root layout, wrapping `{children}`. Do not add a second instance inside individual pages.
**Future extensions:** None anticipated.

---

## Supporting Utilities (not components, but load-bearing for the above)

| File | Purpose |
|---|---|
| `src/lib/motion.ts` | Single source of truth for animation durations/easing curves/variants — mirrors Design System Section 20 exactly |
| `src/lib/utils.ts` | `cn()` class-merging helper (shadcn convention) |
| `src/lib/reading-time.ts` | Reading-time calculation for future Blog articles |
| `src/hooks/use-scrolled.ts` | Shared scroll-threshold hook, used by `Header` and `ScrollToTop` |
| `src/config/nav.ts` | Nav item list, sourced from the locked sitemap |
| `src/config/site.ts` | Site-wide constants for metadata/SEO |
