import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Real logo asset (public/images/logo/envis8ge-logo.png), downloaded
 * directly from the live site. The source file's opaque pixels are a
 * very light near-white tone — nearly invisible against a white header,
 * confirmed via computed styles to have no CSS filter applied on the
 * live site either (likely an unintentional export issue on their end,
 * similar to the "2026/2027" copyright bug found in Phase 2).
 *
 * To make the real artwork (the "ENVIS8GE" wordmark + "Vision. Concepts.
 * Ideas." tagline) actually visible, a `brightness(0)` filter is applied
 * to render it in solid black on light backgrounds, and
 * `brightness(0) invert(1)` for solid white on the dark footer. This
 * preserves the exact logo shape — it does not redesign it. Flagged as
 * an assumption requiring approval.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Envis8ge — go to homepage"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity duration-150 hover:opacity-80",
        className
      )}
    >
      <Image
        src="/images/logo/envis8ge-logo.png"
        alt="Envis8ge"
        width={1796}
        height={457}
        priority
        className={cn(
          "tablet:h-9 desktop:h-10 h-8 w-auto",
          variant === "dark" ? "brightness-0" : "brightness-0 invert"
        )}
      />
    </Link>
  );
}
