import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// 빌드된 Pretendard 서브셋(해시 파일명)을 index.html에서 preload 한다.
// 폰트가 첫 화면 전에 도착해야 폰트 교체로 인한 줄바꿈 변화(CLS)가 생기지 않는다.
function preloadSubsetFont(): Plugin {
  return {
    name: "preload-subset-font",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((file) =>
          /pretendard-subset-.*\.woff2$/.test(file)
        );
        if (!font) return [];
        return [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: `/${font}`,
              as: "font",
              type: "font/woff2",
              crossorigin: "",
            },
            injectTo: "head-prepend",
          },
        ];
      },
    },
  };
}

// 개발 환경 여부
const isDev = process.env.NODE_ENV !== "production";

// 동적 설정 (devtools는 개발시에만 동적 import)
export default defineConfig(async () => {
  const plugins: any[] = [vue(), tailwindcss(), preloadSubsetFont()];

  if (isDev) {
    try {
      const { default: vueDevTools } = await import("vite-plugin-vue-devtools");
      plugins.push(vueDevTools());
    } catch (e) {
      console.warn("[vite] devtools 로드 실패 (개발 전용이므로 무시 가능):", e);
    }
  }

  return {
    base: "/", // Netlify root deploy: remove sub-path to prevent 404 -> index.html fallback (MIME text/html)
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
