"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

/**
 * True once the page has scrolled past `threshold`. Shared by the sticky
 * Header (shadow-on-scroll) and the Scroll-to-Top button (show/hide).
 */
export function useScrolled(threshold = 24) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > threshold);
  });

  return scrolled;
}
