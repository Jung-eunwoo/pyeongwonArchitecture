import { createSSRApp } from "vue";
import App from "./App.vue";
import { vReveal } from "./directives/reveal";

// 빌드 시 프리렌더(entry-server.ts)와 브라우저 하이드레이션(main.ts)이 같은 앱 구성을 쓴다
export function createApp() {
  return createSSRApp(App).directive("reveal", vReveal);
}
