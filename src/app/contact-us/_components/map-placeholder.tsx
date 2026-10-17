import { ExternalLink, MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site";

/**
 * Section 6 — real interactive map, centered on the confirmed office
 * address. Uses Google's keyless embed URL scheme
 * (`google.com/maps?q=...&output=embed`) rather than the JS Maps
 * Embed API, so no API key is ever needed — nothing to expose in the
 * frontend. `q` is the exact address, geocoded by Google server-side.
 */
export function MapPlaceholder() {
  const address = siteConfig.contact.address;
  const encodedAddress = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <FadeIn>
      <div className="aspect-[21/9] w-full overflow-hidden rounded-lg shadow-sm">
        <iframe
          title={`Map showing Envis8ge's office at ${address}`}
          src={embedSrc}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <p className="text-muted-foreground max-w-xs text-sm">{address}</p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-text hover:text-primary-hover inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
        >
          <MapPin aria-hidden className="size-4" />
          Open in Google Maps
          <ExternalLink aria-hidden className="size-3.5" />
        </a>
      </div>
    </FadeIn>
  );
}
