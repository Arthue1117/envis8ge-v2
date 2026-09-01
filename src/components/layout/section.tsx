import * as React from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * Section Wrapper — consistent vertical rhythm and background for every
 * page section built in later phases. Vertical padding follows the
 * Design System Section 3 spacing scale (space-8/9/10 across breakpoints).
 * Wraps children in the Global Container by default; pass `container=false`
 * for a section that needs a full-bleed background with its own inner layout.
 */
function Section({
  className,
  background = "default",
  container = true,
  as: Tag = "section",
  children,
  ...props
}: React.ComponentProps<"section"> & {
  background?: "default" | "muted" | "tint";
  container?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "tablet:py-20 desktop:py-24 py-16",
        background === "muted" && "bg-muted",
        background === "tint" && "bg-tint",
        background === "default" && "bg-background",
        className
      )}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </Tag>
  );
}

export { Section };
