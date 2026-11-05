import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { generateFontSubset } from "./scripts/subset-font.mjs";

// Pretendard 서브셋 폰트
// - dev 서버 시작·빌드 시작 때 페이지 글자로 서브셋을 생성 (vite를 어떻게 실행하든 보장)
// - 빌드된 파일(해시 파일명)을 index.html에서 preload: 폰트가 첫 화면 전에 도착해야
//   폰트 교체로 인한 줄바꿈 변화(CLS)가 생기지 않는다.
function pretendardSubset(): Plugin {
  return {
    name: "pretendard-subset",
    // 프리렌더용 SSR 빌드는 CSS·폰트를 만들지 않으므로 클라이언트 빌드에서만 생성
    apply: (_config, env) => !env.isSsrBuild,
    async buildStart() {
      const { chars, bytes } = await generateFontSubset();
      this.info?.(
        `pretendard subset: ${chars} chars, ${(bytes / 1024).toFixed(1)}KB`
      );
    },
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        if (!ctx.bundle) return []; // dev 서버에서는 preload 불필요
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
export default defineConfig(async ({ isSsrBuild }) => {
  const plugins: PluginOption[] = [vue(), tailwindcss(), pretendardSubset()];

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
      // 프리렌더용 SSR 번들(dist-ssr)은 곧 지우므로 public/(이미지 등)을 복사하지 않는다
      copyPublicDir: !isSsrBuild,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
