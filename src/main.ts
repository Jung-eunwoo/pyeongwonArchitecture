import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { vReveal } from "./directives/reveal";
import { initAnalytics } from "./analytics";

// 로컬 개발 서버의 방문은 집계하지 않는다
if (import.meta.env.PROD) initAnalytics();

createApp(App).directive("reveal", vReveal).mount("#app");
