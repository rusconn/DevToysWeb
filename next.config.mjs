/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

export default process.env.ANALYZE === "true"
  ? (await import("@next/bundle-analyzer")).default({ enabled: true })(nextConfig)
  : nextConfig;
