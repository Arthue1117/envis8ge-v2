"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { primaryNav } from "@/config/nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

/**
 * Design System Section 11 — sticky header, white background, shadow-sm
 * once scrolled. Preserves the confirmed live-site structure (logo left,
 * nav right) with Blog added as the approved third nav item.
 */
export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "bg-background/95 sticky top-0 z-40 w-full backdrop-blur transition-shadow duration-250",
        scrolled && "shadow-sm"
      )}
    >
      <Container className="flex h-14 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="desktop:block hidden">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-foreground hover:text-primary text-sm font-medium transition-colors duration-150",
                      active && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/contact-us"
          className={cn(
            buttonVariants({ size: "sm" }),
            "desktop:inline-flex hidden"
          )}
        >
          Contact Us!
        </Link>

        <MobileNav />
      </Container>
    </header>
  );
}
