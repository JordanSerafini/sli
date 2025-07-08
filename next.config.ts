import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    reactStrictMode: false,
    
    // Configuration pour l'export statique (activé via variable d'environnement)
    ...(process.env.NEXT_EXPORT === 'true' && {
        output: 'export',
        trailingSlash: true,
        images: {
            unoptimized: true,
        },
    }),
};

export default nextConfig;
