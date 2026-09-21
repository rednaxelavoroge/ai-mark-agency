import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
