/**
 * Motion tokens and reusable Framer Motion variants.
 *
 * Source of truth: docs/03-design-system.md, Section 20 (Animation System
 * Foundation) — durations, easing curves, and behavior rules are defined
 * there and must not drift from this file. Do not add new animation
 * patterns here without updating that section first.
 *
 * Reduced-motion handling is global, not per-variant: the root
 * `MotionConfig` (see src/components/providers/providers.tsx) is set to
 * `reducedMotion="user"`, which makes Framer Motion automatically respect
 * `prefers-reduced-motion` for every animation using these variants,
 * per Design System Section 20.8.
 */
import type { Transition, Variants } from "framer-motion";

/** Design System Section 20.2 — Duration Scale (seconds, for Framer Motion). */
export const duration = {
  instant: 0.1,
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  page: 0.55,
} as const;

/** Design System Section 20.3 — Easing Curves. */
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
} as const;

/** Design System Section 20.5 — scroll-triggered fade + upward reveal. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.decelerate,
    } satisfies Transition,
  },
};

/** Simple opacity-only fade, for elements where vertical movement isn't appropriate. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.decelerate,
    } satisfies Transition,
  },
};

/**
 * Design System Section 20.5 — staggers children by 50–100ms rather than
 * animating a grid simultaneously. Pair with `fadeInUp` on children.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/** Design System Section 20.4 — card hover: shadow lift + subtle scale. */
export const cardHover: Transition = {
  duration: duration.base,
  ease: easing.decelerate,
};

/** Design System Section 20.4 — button hover: darken + subtle lift. */
export const buttonHover: Transition = {
  duration: duration.fast,
  ease: easing.standard,
};

/** Design System Section 20.6 — page transition cross-fade. */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.page, ease: easing.standard },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.base, ease: easing.accelerate },
  },
};
