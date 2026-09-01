"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Blog Plan Section 3.2 — sticky on desktop, auto-highlights the active
 * section via IntersectionObserver (Design System Section 20.9 —
 * observer-based, not scroll-event polling). Collapses to a plain list
 * on mobile (no sticky positioning, since there's no side rail there).
 */
export function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="desktop:sticky desktop:top-24"
    >
      <span className="font-heading text-foreground text-sm font-semibold">
        On this page
      </span>
      <ul className="mt-3 flex flex-col gap-2 border-l border-neutral-200">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block border-l-2 py-1 pl-4 text-sm transition-colors duration-150",
                  active
                    ? "border-primary text-primary-text font-medium"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
