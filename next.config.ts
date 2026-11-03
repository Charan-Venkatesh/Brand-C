import type { NextConfig } from "next";

// On GitHub Pages the site is served from /<repo>, set via NEXT_PUBLIC_BASE_PATH in the deploy workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
