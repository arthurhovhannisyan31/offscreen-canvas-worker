import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";
import tsconfigPaths from "vite-tsconfig-paths";

const htmlPluginOpt = {
  favicon: "/favicon.ico"
};

export default defineConfig({
  build: {
    sourcemap: true
  },
  server:{
    headers:{
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    https: true
  },
  plugins: [
    tsconfigPaths(),
    htmlPlugin(htmlPluginOpt),
    react(),
    basicSsl()
  ],
});
