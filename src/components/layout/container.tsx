import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Design System Section 6 — Global Container. Centers content at the
 * `container-lg` (1200px) max-width with responsive horizontal padding.
 * Every section's inner content should be wrapped in this rather than
 * defining its own max-width.
 */
function Container({
  className,
  as: Tag = "div",
  ...props
}: React.ComponentProps<"div"> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn(
        "tablet:px-6 mx-auto w-full max-w-[1200px] px-4",
        className
      )}
      {...props}
    />
  );
}

export { Container };
