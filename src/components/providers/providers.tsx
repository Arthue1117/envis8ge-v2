"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Root client providers. Kept deliberately minimal in Phase 1 — this
 * project has no dark mode (docs/03-design-system.md, Summary) so no
 * theme provider is needed.
 *
 * `reducedMotion="user"` makes every Framer Motion animation in the app
 * automatically honor the OS-level `prefers-reduced-motion` setting,
 * satisfying Design System Section 20.8 globally rather than per-component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
