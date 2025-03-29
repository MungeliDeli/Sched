import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "icons/apple-touch-icon.png",
        "icons/masked-icon.svg",
      ],
      manifest: {
        name: "Sched",
        short_name: "Sched",
        description: "Stay on top of your daily tasks and routines.",
        theme_color: "#DFE8F4",
        background_color: "#1e90ff",
        display: "standalone",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  base: "/Sched/",
});
