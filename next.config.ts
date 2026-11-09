import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Legacy HubSpot single-page anchor/section equivalents -> new structured hubs
      {
        source: "/services",
        destination: "/commercial-cleaning/",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/reviews/",
        permanent: true,
      },
      {
        source: "/quote",
        destination: "/pricing/commercial-cleaning-calculator/",
        permanent: true,
      },
      {
        source: "/request-a-quote",
        destination: "/pricing/commercial-cleaning-calculator/",
        permanent: true,
      },
      {
        source: "/rocklin-house-cleaning",
        destination: "/house-cleaning/rocklin-ca/",
        permanent: true,
      },
      // Domain redirect rule for rocklinhousecleaning.com -> /house-cleaning/
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "rocklinhousecleaning.com",
          },
        ],
        destination: "https://debrasclassiccleaning.com/house-cleaning/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.rocklinhousecleaning.com",
          },
        ],
        destination: "https://debrasclassiccleaning.com/house-cleaning/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

