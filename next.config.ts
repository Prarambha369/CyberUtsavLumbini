import type { NextConfig } from "next";

/**
 * Fully static export for Cloudflare Pages (free plan, no per-request limits).
 * `next build` writes the site to `out/`; there is no server runtime, so no
 * API routes, server actions, middleware or on-demand image optimization.
 * Security headers live in public/_headers (Cloudflare Pages format).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
