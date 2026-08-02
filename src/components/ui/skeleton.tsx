import { cn } from "@/lib/utils";

/**
 * Design System Section 20.7 — skeleton loaders for dynamic content
 * (Blog list, Portfolio grid, related posts), not spinners. Match the
 * final content's shape (radius, line heights) when using this so layout
 * never shifts on load.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md bg-neutral-200 motion-safe:animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
