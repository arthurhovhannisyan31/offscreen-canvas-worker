import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";
import tsconfigPaths from "vite-tsconfig-paths";

const htmlPluginOpt = {
  favicon: "/favicon.ico"
};

export default ({ mode }: ConfigEnv): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      sourcemap: true,
      manifest: true,
    },
    /* dev server */
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
      basicSsl()
    ],
  });
};
