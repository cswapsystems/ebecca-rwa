import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  serverExternalPackages: ["pdfkit"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "ebecca.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cswap-ebecca.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
