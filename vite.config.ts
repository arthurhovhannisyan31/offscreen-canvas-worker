import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import htmlPlugin from "vite-plugin-html-config"

const htmlPluginOpt = {
  favicon: "/favicon.ico"
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlPlugin(htmlPluginOpt),
  ],
})
