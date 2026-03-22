import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    const apiBase = process.env.INTERNAL_API_URL?.trim() || "http://artha-api:8000";
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${apiBase}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
