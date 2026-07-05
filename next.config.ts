import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Opt-in (utilisé par le Dockerfile) : émet .next/standalone pour un runtime
  // conteneur minimal. Sans la variable, `next build` + `next start` restent
  // inchangés — les déploiements Nixpacks/npm existants ne sont pas affectés.
  ...(process.env.NEXT_OUTPUT_STANDALONE ? { output: 'standalone' as const } : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pixieset.com' },
    ],
  },
};

export default nextConfig;
