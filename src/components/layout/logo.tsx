import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Real logo asset (public/images/logo/envis8ge-logo-new.png) — finished,
 * pre-colored artwork (black "ENVIS8GE" + brand-primary cyan "8" + gray
 * "Vision. Concepts. Ideas" tagline). Rendered directly as an `<Image>`
 * rather than as a CSS mask: a mask only reads the alpha channel and
 * discards actual pixel color, which would flatten this asset's
 * black/cyan/gray coloring into a single flat fill.
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
      <Image
        src="/images/logo/envis8ge-logo-new.png"
        alt="Envis8ge"
        width={763}
        height={214}
        priority
        className="tablet:h-9 desktop:h-10 h-8 w-auto"
      />
    </Link>
  );
}
