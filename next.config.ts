import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Prisma's native engine must run in Node, outside the Turbopack bundle.
  serverExternalPackages: ['@memoryx/prisma-client'],
};

export default nextConfig;
