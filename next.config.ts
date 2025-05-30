// next.config.ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** 
   * Turbopack options – for now you can leave this empty
   * or add any Turbopack-specific config here.
   */
  turbopack: {
    // e.g. cache: { /* … */ }, experimental: { /* … */ }, etc.
  },

  /** Remote origins allowed to bypass CORS in dev */
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "192.168.200.82",
    "*.ngrok-free.app",
  ],

  reactStrictMode: true,

  /**
   * Webpack customization – here we add your "@/src" alias
   */
  webpack(config) {
    config.resolve ||= {};
    config.resolve.alias ||= {};
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
