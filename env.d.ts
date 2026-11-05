/// <reference types="vite/client" />

import type { vReveal } from "./src/directives/reveal";

// 전역 디렉티브 타입 (템플릿에서 v-reveal 타입 체크)
declare module "vue" {
  interface ComponentCustomProperties {
    vReveal: typeof vReveal;
  }
}
