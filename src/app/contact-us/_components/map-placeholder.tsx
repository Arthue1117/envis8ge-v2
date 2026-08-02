import { MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site";

/**
 * Section 6 — placeholder for a future live map embed. Not connected to
 * any map provider yet, per explicit instruction.
 */
export function MapPlaceholder() {
  return (
    <FadeIn>
      <div className="bg-muted flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 rounded-lg text-center shadow-sm">
        <MapPin aria-hidden className="text-primary size-8" />
        <p className="text-foreground font-heading text-sm font-semibold">
          Map coming soon
        </p>
        <p className="text-muted-foreground max-w-xs px-4 text-xs">
          {siteConfig.contact.address}
        </p>
      </div>
    </FadeIn>
  );
}
