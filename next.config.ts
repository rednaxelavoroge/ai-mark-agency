import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Let Playwright / 127.0.0.1 dev runs load dev assets. HANDOFF.md documents
  // this setting; it was missing from the file it describes.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/aime",
        destination: "/ai-marketing-employee",
        permanent: true,
      },
      {
        source: "/ru/aime",
        destination: "/ru/ai-marketing-employee",
        permanent: true,
      },
      {
        source: "/products/aime",
        destination: "/ai-marketing-employee",
        permanent: true,
      },
      {
        source: "/ru/products/aime",
        destination: "/ru/ai-marketing-employee",
        permanent: true,
      },
      {
        source: "/products/assistant",
        destination: "/ai-business-assistant",
        permanent: true,
      },
      {
        source: "/ru/products/assistant",
        destination: "/ru/ai-business-assistant",
        permanent: true,
      },
      {
        source: "/products/showroom",
        destination: "/showroom-ai",
        permanent: true,
      },
      {
        source: "/ru/products/showroom",
        destination: "/ru/showroom-ai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
