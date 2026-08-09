import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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

// Cloudflare/OpenNext local dev parity — lets `next dev` resolve
// Cloudflare bindings (env vars, KV/R2, etc.) the same way the app would
// running under Workers. No-op for `next build`/`next start`; does not
// affect existing page behavior.
initOpenNextCloudflareForDev();
