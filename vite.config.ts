import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";
import tsconfigPaths from "vite-tsconfig-paths";

const htmlPluginOpt = {
  favicon: "/favicon.ico"
};

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    htmlPlugin(htmlPluginOpt),
    react(),
  ],
  build: {
    sourcemap: true
  },
  server:{
    headers:{
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    }
  }
});
