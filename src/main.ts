import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { vReveal } from "./directives/reveal";
import { initAnalytics } from "./analytics";

initAnalytics();

createApp(App).directive("reveal", vReveal).mount("#app");
