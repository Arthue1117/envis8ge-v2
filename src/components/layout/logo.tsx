import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Real logo asset (public/images/logo/envis8ge-logo.png), downloaded
 * directly from the live site. The source file's opaque pixels are a
 * very light near-white tone — nearly invisible against a white header
 * with no recoloring (confirmed via the live site's own computed
 * styles: no CSS filter is applied there either, likely an
 * unintentional export issue on their end, similar to the "2026/2027"
 * copyright bug found in Phase 2).
 *
 * Recolored to the confirmed brand primary (`#02BAF9`) per explicit
 * request, using a CSS mask (not a `filter` chain) so the fill color is
 * exact rather than an approximation — the PNG's alpha channel becomes
 * the shape, `background-color` supplies the precise color. This still
 * renders the real logo artwork ("ENVIS8GE" + "Vision. Concepts.
 * Ideas."), just recolored — it does not redesign it.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Envis8ge — go to homepage"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity duration-150 hover:opacity-80",
        className
      )}
    >
      <span
        role="img"
        aria-label="Envis8ge"
        className="bg-primary tablet:h-9 desktop:h-10 h-8"
        style={{
          maskImage: "url(/images/logo/envis8ge-logo.png)",
          WebkitMaskImage: "url(/images/logo/envis8ge-logo.png)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
          aspectRatio: "1796 / 457",
        }}
      />
    </Link>
  );
}
