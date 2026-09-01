"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { primaryNav } from "@/config/nav";
import { cn } from "@/lib/utils";

/**
 * Design System Section 11 (mobile) — hamburger-triggered slide-in menu.
 * Built on @base-ui/react Dialog for accessible focus trap / Escape /
 * aria-modal behavior; open/close motion uses Base UI's
 * data-starting-style / data-ending-style attributes with plain CSS
 * transitions (Design System Section 20.2/20.3 duration/easing values),
 * per Design System Section 20.6's "elegant dropdown/mobile menu" rule.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="text-foreground desktop:hidden inline-flex size-10 items-center justify-center"
      >
        <Menu aria-hidden className="size-6" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/50 transition-opacity duration-250",
            "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
          )}
        />
        <Dialog.Popup
          className={cn(
            "bg-background fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-8 p-6 shadow-lg",
            "transition-transform duration-250 ease-[cubic-bezier(0,0,0.2,1)]",
            "data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-heading text-lg font-bold">
              Menu
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="text-foreground inline-flex size-10 items-center justify-center"
            >
              <X aria-hidden className="size-6" />
            </Dialog.Close>
          </div>

          <nav aria-label="Primary">
            <ul className="flex flex-col gap-6">
              {primaryNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-heading text-2xl font-semibold",
                        active ? "text-primary-text" : "text-foreground"
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
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), "mt-auto justify-center")}
          >
            Contact Us!
          </Link>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
