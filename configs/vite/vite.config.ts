import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

const htmlPluginOpt = {
  favicon: "/favicon.ico"
};

export default defineConfig({
  build: {
    sourcemap: true,
    manifest: true,
  },
  server:{
    headers:{
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    tsconfigPaths(),
    htmlPlugin(htmlPluginOpt),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/workers/service-worker/sw.js',
          dest: './',
        },
      ],
    }),
  ],
});

