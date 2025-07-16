import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/pyeongwonArchitecture/" : "/",
  plugins: [
    vue(),
    tailwindcss(),
    ...(process.env.NODE_ENV === "development" ? [vueDevTools()] : []),
  ],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
