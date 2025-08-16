import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { initGA } from "./utils/ga";
import "./assets/main.css";

initGA();
createApp(App).mount("#app");
