import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully statically generated (no ISR, no revalidate, no API
// routes) — every route already exists as a prerendered asset at build
// time, so the read-only static-assets cache is sufficient and avoids
// provisioning an R2 bucket/Queue that this project doesn't need.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
