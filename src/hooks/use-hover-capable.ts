"use client";

import { useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * True only on devices with real hover + fine pointer capability.
 * Used to gate JS-driven hover animations (e.g. Framer Motion
 * `whileHover`) so they never trigger from a touch tap, per Design
 * System Section 20 mobile-friendly rule. `useSyncExternalStore` avoids
 * the "setState inside an effect" anti-pattern for subscribing to
 * browser media-query state.
 */
export function useHoverCapable() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
