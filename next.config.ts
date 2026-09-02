import type { NextConfig } from "next";

/**
 * GitHub Pages project URL is https://astraa00.github.io/University-/
 * (repo name has a trailing hyphen). Local `next dev` stays at `/`.
 */
const githubPagesBasePath = "/University-";
const useGithubPagesPath =
  process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  ...(useGithubPagesPath
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: githubPagesBasePath,
      }
    : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
