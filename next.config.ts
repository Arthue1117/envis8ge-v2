import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No external image hosts are confirmed yet (docs/05-content-plan.md —
    // Portfolio Detail and Blog imagery are still pending from the client).
    // Add entries here once real image hosting is decided; do not widen
    // this to a wildcard.
    remotePatterns: [],
  },
};

export default nextConfig;
