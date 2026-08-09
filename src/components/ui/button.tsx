import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Design System Section 8 — Buttons.
 * Primary variant is the one Confirmed, non-negotiable brand signature:
 * `#02BAF9` background, pill radius, capitalize. Do not change its
 * shape/color without updating the locked design system first. Font is
 * `font-button`, which now resolves to the sitewide Montserrat typeface
 * (see app/layout.tsx) rather than the earlier Poppins.
 */
const buttonVariants = cva(
  "font-button rounded-pill inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden capitalize whitespace-nowrap transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-neutral-800",
        outline:
          "border-primary text-primary hover:bg-primary/10 border bg-transparent",
        ghost: "text-foreground hover:bg-muted bg-transparent",
      },
      size: {
        default: "px-[30px] py-[15px] text-sm",
        sm: "px-6 py-3 text-xs",
        lg: "px-9 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
