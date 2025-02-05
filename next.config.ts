import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
 };

export default nextConfig;
