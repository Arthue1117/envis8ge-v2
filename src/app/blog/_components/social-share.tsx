"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

/**
 * Blog Plan Section 8/3.12. Channel list Proposed there: LinkedIn,
 * Facebook, WhatsApp, X, Copy Link. Rendered as short text labels rather
 * than brand glyphs — the installed `lucide-react` version ships no
 * brand-specific icons (Facebook/LinkedIn/X removed upstream).
 */
export function SocialShare({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      short: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      short: "FB",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      short: "WA",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "X",
      short: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className="text-foreground hover:text-primary-text hover:bg-muted rounded-pill inline-flex size-9 items-center justify-center text-xs font-semibold transition-colors duration-150"
          >
            {link.short}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy link"
          className="text-foreground hover:text-primary-text hover:bg-muted rounded-pill inline-flex size-9 items-center justify-center transition-colors duration-150"
        >
          <Link2 aria-hidden className="size-4" />
        </button>
        {copied && (
          <span className="text-muted-foreground text-xs">Link copied</span>
        )}
      </div>
    </div>
  );
}
