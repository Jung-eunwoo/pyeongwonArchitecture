import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

// vite.config.ts의 플러그인(폰트 서브셋 생성 등)은 테스트에 필요 없으므로 따로 둔다
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
