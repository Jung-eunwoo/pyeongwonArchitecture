import { createApp as createClientApp, createSSRApp } from "vue";
import App from "./App.vue";
import { vReveal } from "./directives/reveal";

// 빌드 시 프리렌더(entry-server.ts)와 브라우저(main.ts)가 같은 앱 구성을 쓴다.
// hydrate: 프리렌더된 마크업을 재사용할 때 true (서버 렌더링도 SSR 앱이어야 함)
export function createApp({ hydrate = true } = {}) {
  return (hydrate ? createSSRApp : createClientApp)(App).directive(
    "reveal",
    vReveal
  );
}
