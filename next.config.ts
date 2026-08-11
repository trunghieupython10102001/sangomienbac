import type { NextConfig } from "next";

// Allow images served from S3 (or a CDN/custom domain via S3_PUBLIC_URL).
const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  { protocol: 'https', hostname: '*.s3.*.amazonaws.com' },
  { protocol: 'https', hostname: 's3.*.amazonaws.com' },
];

if (process.env.S3_PUBLIC_URL) {
  try {
    const { protocol, hostname } = new URL(process.env.S3_PUBLIC_URL);
    remotePatterns.push({
      protocol: protocol.replace(':', '') as 'http' | 'https',
      hostname,
    });
  } catch {
    // Ignore an invalid S3_PUBLIC_URL; the default S3 patterns still apply.
  }
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
