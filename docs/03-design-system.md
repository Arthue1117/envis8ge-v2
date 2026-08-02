# Design System

> **How to read this document.** Same labeling convention as [01-project-brief.md](01-project-brief.md) and [02-brand-guidelines.md](02-brand-guidelines.md):
> - **Confirmed** — directly sourced from the live site or the locked [02-brand-guidelines.md](02-brand-guidelines.md).
> - **Proposed** — a new systematic token/component spec needed to make the current identity cleaner and more maintainable. The current site (a page-builder-built single page) has no formal design system, so most of this document is necessarily Proposed — but every value is anchored to a Confirmed brand fact wherever one exists, never invented independently.
> - **To be confirmed** — an open decision for the client.
>
> **Purpose:** this document translates the locked Brand Guidelines into concrete, buildable UI tokens and component specs for the implementation plan. It preserves the current look while formalizing it into a consistent, reusable system. No code is included — tokens and specs only.

---

## 1. Color Tokens
**Status: Values Confirmed (from [02-brand-guidelines.md](02-brand-guidelines.md)); token structure Proposed**

| Token | Value | Source |
|---|---|---|
| `color-primary` | `#02BAF9` | Confirmed |
| `color-primary-tint` | `#9FE7FF` | Confirmed |
| `color-secondary` | `#000000` | Confirmed |
| `color-bg-primary` | `#FFFFFF` | Confirmed |
| `color-bg-secondary` | `#FAFAFA` | Confirmed |
| `color-text-primary` | `#000000` | Confirmed |
| `color-text-secondary` | `#484848` | Confirmed |
| `color-text-tertiary` | `#1B1B1B` | Confirmed |
| `color-success` | `#1FA971` | Proposed (no precedent on current site) |
| `color-warning` | `#E0A400` | Proposed |
| `color-error` | `#D64545` | Proposed |
| `color-neutral-100`–`900` | `#FAFAFA → #E5E5E5 → #C4C4C4 → #9E9E9E → #757575 → #484848 → #303030 → #1B1B1B → #000000` | Proposed scale extending confirmed neutrals |
| `color-primary-hover` | `#00A6E0` (darkened `#02BAF9`) | Proposed, derived from confirmed primary |
| `color-focus-ring` | `#02BAF9` at reduced opacity | Proposed, ties to Section 21 |

**To be confirmed:** Any additional official brand hex values not visible on the current live page.

---

## 2. Typography Scale
**Status: Anchor sizes Confirmed; full scale Proposed**

Confirmed families: **Montserrat** (headings/display, 600–700), **Poppins** (buttons, 400–500), **Lato** (body, loaded but not yet formally applied).

| Token | Font | Size | Weight | Line-height | Source |
|---|---|---|---|---|---|
| `text-display` | Montserrat | 60px | 700 | 78px | Confirmed (hero statement) |
| `text-h1` | Montserrat | 32px | 700 | 41.6px | Confirmed |
| `text-h2` | Montserrat | 21px | 600 | 27.3px | Confirmed |
| `text-h3` | Montserrat | 18px | 600 | 24px | Proposed, interpolated |
| `text-h4` | Montserrat | 16px | 600 | 22px | Proposed |
| `text-body-lg` | Lato | 18px | 400 | 28px | Proposed |
| `text-body` | Lato | 16px | 400 | 24px | Proposed |
| `text-caption` | Lato | 13px | 400 | 18px | Proposed |
| `text-button` | Poppins | 14–16px | 500 | 1 | Confirmed family/weight range, size interpolated |

Mobile scale should step down `text-display`/`text-h1` proportionally (Proposed — no mobile behavior observable from a static CSS read); exact fluid/clamp values are an implementation detail for the build phase, not fixed here.

**To be confirmed:** Whether Lato is the client's intended body font or purely a page-builder default that should be replaced.

---

## 3. Spacing System (8px base)
**Status: Proposed — the current site has no documented spacing system**

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 16px |
| `space-4` | 24px |
| `space-5` | 32px |
| `space-6` | 40px |
| `space-7` | 48px |
| `space-8` | 64px |
| `space-9` | 80px |
| `space-10` | 96px |

All component padding/margin/gap values in this document reference this scale. This is a new formalization, not a preserved rule — the current page-builder site has no consistent spacing rhythm.

---

## 4. Border Radius
**Status: Anchor Confirmed (buttons); scale Proposed**

| Token | Value | Source |
|---|---|---|
| `radius-sm` | 8px | Proposed |
| `radius-md` | 12px | Proposed |
| `radius-lg` | 16px | Proposed |
| `radius-pill` | 50px | **Confirmed** — matches live CTA button (`border-radius: 50px`) |

The pill radius is the one confirmed, load-bearing brand signature and must be preserved on all primary buttons. Card/input radii are new, proposed for consistency, chosen to feel related to (not competing with) the pill button.

---

## 5. Shadows
**Status: Proposed — no shadow usage detected on the current site**

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` | Subtle card resting state |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Card hover, dropdowns |
| `shadow-lg` | `0 12px 32px rgba(0,0,0,0.12)` | Modals, elevated overlays |

Kept deliberately soft and neutral (black-based, low opacity) rather than tinted with the brand cyan, to stay consistent with the current site's flat, uncluttered look.

---

## 6. Containers
**Status: Proposed**

| Token | Max-width |
|---|---|
| `container-sm` | 640px |
| `container-md` | 960px |
| `container-lg` | 1200px |
| `container-xl` | 1440px |

Default page content container: `container-lg` (1200px), centered, with `space-3`–`space-4` horizontal padding on smaller viewports. Not observable from the current site's builder markup; chosen as a standard, safe default.

---

## 7. Grid System
**Status: Proposed**

12-column fluid grid, gutters set to `space-3` (16px) on mobile and `space-4` (24px) at desktop widths. Section layouts (Services grid, Portfolio grid, Testimonials, Blog grid) should compose from this grid rather than bespoke per-section markup, to improve maintainability over the current page-builder approach.

---

## 8. Buttons
**Status: Primary style Confirmed; variants Proposed**

**Primary button (Confirmed, must be preserved exactly):**
Background `color-primary` (`#02BAF9`), text white, `radius-pill` (50px), padding `15px 30px`, font Poppins 400–500, `text-transform: capitalize`.

**Proposed additional variants (needed for a fuller system; none exist on the current single-CTA-style site):**

| Variant | Spec |
|---|---|
| Secondary | `color-secondary` (black) background, white text, same pill radius/padding |
| Outline | Transparent background, `color-primary` border and text, pill radius |
| Ghost | Transparent background, `color-text-primary`, no border, used for tertiary actions |
| Disabled | `color-neutral-300` background, `color-neutral-600` text, no hover/focus animation |

All variants inherit the confirmed pill radius as the non-negotiable brand signature.

---

## 9. Forms
**Status: Proposed — exact current styling not reliably extractable from page-builder markup**

- Inputs: `radius-sm` (8px), 1px `color-neutral-300` border, `space-3` internal padding, `color-text-secondary` placeholder
- Focus: border becomes `color-primary`, plus `color-focus-ring` (Section 21)
- Labels: `text-caption` weight increased to 500, positioned above the field
- Validation states use `color-success` / `color-error` per Section 1
- Submit button uses the Confirmed primary button style

**To be confirmed:** The actual current contact form's field set and validation behavior on `/contact-us`, if it should be replicated exactly rather than restyled.

---

## 10. Cards
**Status: Proposed base spec; specific card types detailed in Sections 14–15**

Base card: `color-bg-primary` or `color-bg-secondary` background, `radius-md` (12px), `shadow-sm` at rest, `shadow-md` on hover, internal padding `space-4`. Used as the shared base for service cards, portfolio cards, and blog cards (Sections 14–15) so all card types feel like one family rather than one-off designs, unlike the current page-builder site where each section is bespoke.

---

## 11. Navigation
**Status: Structure Confirmed; component spec Proposed**

**Confirmed:** Header contains logo (left) and links "Portfolio," "Contact Us" (right). No hamburger/mobile menu behavior was verifiable from static inspection.

**Proposed for the rebuild:**
- Add "Blog" as a third nav item (per approved project direction), positioned between "Portfolio" and "Contact Us"
- Sticky header on scroll, white background, `shadow-sm` once scrolled
- Mobile: collapse into a hamburger-triggered slide-in/dropdown menu (animation per Section 20)
- Active/hover link state uses `color-primary` underline or text color shift

---

## 12. Footer
**Status: Content Confirmed; layout spec Proposed**

**Confirmed content to preserve exactly:** "Contact Us" heading, phone (+65 9632 6973), email (contact@envis8ge.com), address (6001 Beach Rd, #22-01 Golden Mile Tower, Singapore 199589), copyright line, "Envis8ge Pte Ltd," Privacy Policy link.

**Proposed layout:** Multi-column footer (contact info / quick links / social if applicable) on desktop, stacked single column on mobile, `color-bg-secondary` or `color-secondary` (black) background — exact footer background not confirmed from the live page and should be visually matched during build, not assumed here.

**To be confirmed:** Footer background color (not reliably extracted) and whether social media links exist/should be added.

---

## 13. Hero Sections
**Status: Pattern Confirmed; reusable component spec Proposed**

**Confirmed pattern:** Large Montserrat display statement ("Trusted by brands since 2013") followed by a supporting paragraph, on the homepage.

**Proposed:** Formalize as a reusable Hero component (`text-display` + `text-body-lg` + optional CTA button) so it can be reused with different copy on the Blog landing page and Portfolio Detail pages while keeping the same visual language — rather than the current one-off hero markup.

---

## 14. Portfolio Cards
**Status: Section Confirmed to exist; card spec Proposed**

**Confirmed:** A portfolio/"Our Work Speaks for Itself" section and client logos exist on the homepage; a dedicated `/portfolio` page exists.

**Proposed card spec** (extends base Card, Section 10): featured image (16:9), client name, industry/category tag, `radius-md`, hover state per Section 20 (Animation System Foundation), linking to a Portfolio Detail page (`/portfolio/project-name`) per your approved portfolio requirements.

---

## 15. Blog Cards
**Status: Proposed — new feature, no current-site precedent**

Extends the base Card (Section 10) to stay visually consistent with Portfolio Cards: featured image, category tag, title (`text-h4`), excerpt (`text-body`), author + reading time (`text-caption`, `color-text-secondary`), hover state per Section 20 (Animation System Foundation).

---

## 16. Tables
**Status: Proposed — no table usage on the current site**

Minimal, borderless-row style: `color-bg-secondary` header row, `1px solid color-neutral-200` row dividers, `space-3` cell padding. Included for completeness (e.g. potential process/comparison content) but usage is not confirmed as required — **to be confirmed** whether any page actually needs tabular content.

---

## 17. Modals
**Status: Proposed — no modal usage on the current site**

`radius-lg`, `shadow-lg`, `color-bg-primary`, centered overlay with a semi-transparent black scrim (`rgba(0,0,0,0.5)`). Primary anticipated use: portfolio image gallery lightbox (per your Portfolio Detail requirements). Entrance/exit animation per Section 20 (Animation System Foundation).

---

## 18. Icons
**Status: Proposed — no icon system detected on current site**

Single consistent line-icon set (one library, consistent stroke width), colored `color-primary` or `color-text-secondary` per Section 11 of the Brand Guidelines. No existing icon usage to preserve; this is a net-new addition kept deliberately minimal and consistent.

---

## 19. Responsive Breakpoints
**Status: Proposed**

| Token | Width |
|---|---|
| `bp-mobile` | 0–639px |
| `bp-tablet` | 640–1023px |
| `bp-desktop` | 1024–1439px |
| `bp-wide` | 1440px+ |

Standard, framework-agnostic breakpoints; not derived from the current site (page-builder sites typically hard-code breakpoints internally, not inspectable as tokens).

---

## 20. Animation System Foundation
**Status: Proposed — the current site has no custom animation to preserve; this is the base ruleset for all motion added in the rebuild**

This section is the single source of truth for animation across the entire site. Every animated interaction elsewhere in this document (buttons, cards, nav, modals, loading states) must follow the rules below rather than defining its own timing or feel.

### 20.1 Animation Philosophy

Motion exists only to clarify — hierarchy, state change, or spatial relationship — never as decoration. The current Envis8ge site has no animation to preserve, so this entire layer is new; it must feel like a natural, restrained upgrade to the existing identity, not a new visual language. Reference quality bar: Apple, Stripe, Linear, Vercel — subtle, premium, smooth, and never distracting. If an animation draws attention to itself rather than the content, it's wrong.

### 20.2 Duration Scale

| Token | Value | Use |
|---|---|---|
| `duration-instant` | 100ms | Micro feedback (button press/active state) |
| `duration-fast` | 150ms | Hover states (buttons, links, nav) |
| `duration-base` | 250ms | Card hover, dropdowns, mobile menu |
| `duration-slow` | 400ms | Scroll-triggered reveals |
| `duration-page` | 500–600ms | Page transitions |

### 20.3 Easing Curves

| Token | Value | Use |
|---|---|---|
| `easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for most transitions |
| `easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering (reveals, modal/menu open) |
| `easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting (modal/menu close) |

Linear easing is reserved only for continuous/looping effects (e.g. skeleton shimmer) — never for discrete state changes.

### 20.4 Hover Animation Rules

| Element | Behavior |
|---|---|
| Primary/secondary buttons | Slight darken (`color-primary-hover`) + subtle lift (2px translateY), `duration-fast` |
| Cards (portfolio/blog/service) | `shadow-sm` → `shadow-md`, subtle scale (1.02) or image zoom, `duration-base` |
| Nav links | Underline or color shift to `color-primary`, `duration-fast` |
| Text links (body copy) | Underline or opacity shift, no color change required, `duration-fast` |

### 20.5 Scroll Animation Rules

- Sections/cards fade in with a small upward translate (16–24px) as they enter the viewport, `duration-slow`, `easing-decelerate`
- Trigger threshold: ~20% of the element visible; animation runs **once** per element, never re-triggers on scrolling back up/down, to avoid feeling repetitive or distracting
- Grids (Services, Portfolio, Testimonials, Blog) stagger children by 50–100ms rather than animating simultaneously
- Hero text may use a restrained line/word reveal at `duration-slow`; this is the one place a slightly more expressive entrance is appropriate, per your Hero Section Entrance requirement
- Parallax, where used at all, must be subtle background-only movement — never applied to text or interactive elements, and disabled entirely under reduced motion (Section 20.7)

### 20.6 Page Transition Rules

- Route changes use a smooth cross-fade (and optional slight translate), `duration-page`, `easing-standard`
- No full-screen spinners or blocking loaders for standard navigation; prefer instant shell + skeleton content (Section 20.7/25 pattern) over a hard loading wall
- Transition treatment must be identical across Home, Portfolio, Portfolio Detail, and Blog so navigation feels like one consistent site, not disjointed sections
- Scroll position resets appropriately on route change (top of new page), except where returning to a prior list view (e.g. back from a Blog article) where preserving scroll position is preferable

### 20.7 Loading Animation Rules

- Use skeleton loaders (not spinners) for dynamic content — Blog list, Portfolio grid, related posts — matching the final content's shape (`radius-md`, text-line heights matching the type scale) so layout never shifts on load
- Skeleton shimmer: 1200ms linear loop
- Once real content is ready, fade it in (`duration-fast`) rather than popping in abruptly

### 20.8 Reduced Motion Support

- All non-essential motion (scroll reveals, staggered animations, parallax, page-transition movement, hover lifts) must be disabled or reduced to near-instant when `prefers-reduced-motion: reduce` is set
- Essential state feedback (focus rings, disabled styling, form validation states) remains but without animated easing — it should simply appear
- This is a hard requirement, not a nice-to-have, consistent with Brand Guidelines Section 14 (Accessibility)

### 20.9 Performance Rules

- Animate only `transform` and `opacity` (GPU-accelerated); never animate `width`, `height`, `top`, `left`, or `margin`
- Scroll-triggered animations use IntersectionObserver, not scroll-event listeners, to avoid jank
- Target 60fps on all animated interactions; test on mid-range mobile hardware, not just desktop
- Stagger large groups of simultaneous animations (Section 20.5) rather than animating many elements at once, to keep frame time low
- Motion must never block interactivity — users can click/scroll through an in-progress animation at any time

---

## 21. Focus States
**Status: Proposed**

All interactive elements (links, buttons, inputs, nav items) receive a visible focus ring using `color-focus-ring` (`#02BAF9` at reduced opacity), 2px offset outline, satisfying keyboard-navigation accessibility per Brand Guidelines Section 14. Focus states must never be suppressed (no `outline: none` without a replacement). Per Section 20.8, the focus ring itself appears instantly rather than animating in.

---

## Summary

This design system is built around a small set of **Confirmed, non-negotiable brand signatures** — the `#02BAF9` primary color, the pill-shaped button, and Montserrat/Poppins typography — with everything else being a **Proposed** systematic formalization to make the current look consistent and maintainable. Nothing here replaces or redirects the existing identity; it organizes it.

The site is **light-theme only** — no dark mode is in scope, since the current Envis8ge identity has no dark variant and preserving the existing visual identity is the explicit goal of this project.

**To be confirmed before implementation:** items flagged throughout (footer background color, official logo variants, whether Lato is the intended body font, exact current contact form fields).

---

**Sources:** Confirmed values inherited from the locked [01-project-brief.md](01-project-brief.md) and [02-brand-guidelines.md](02-brand-guidelines.md), which were themselves sourced from https://envis8ge.com on 2026-08-02. No code included in this document — tokens and component specifications only.
