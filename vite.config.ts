import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// 개발 환경 여부
const isDev = process.env.NODE_ENV !== "production";

// 동적 설정 (devtools는 개발시에만 동적 import)
export default defineConfig(async () => {
  const plugins: any[] = [vue(), tailwindcss()];

  if (isDev) {
    try {
      const { default: vueDevTools } = await import("vite-plugin-vue-devtools");
      plugins.push(vueDevTools());
    } catch (e) {
      console.warn("[vite] devtools 로드 실패 (개발 전용이므로 무시 가능):", e);
    }
  }

  return {
    base:
      process.env.NODE_ENV === "production" ? "/pyeongwonArchitecture/" : "/",
    plugins,
    build: {
      target: "esnext",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
