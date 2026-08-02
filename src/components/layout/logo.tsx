import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Text wordmark placeholder. No vector/official logo file exists yet
 * (docs/02-brand-guidelines.md Section 6 — "To be confirmed"); the live
 * site's logo is a raster image with no source file available. Replace
 * with the real logo asset once the client provides one — do not treat
 * this styling as final brand signage.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-foreground text-xl font-bold tracking-tight",
        className
      )}
    >
      Envis8ge
    </Link>
  );
}
