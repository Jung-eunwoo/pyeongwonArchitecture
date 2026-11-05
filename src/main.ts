import "./assets/main.css";

import { createApp } from "./create-app";
import { initAnalytics } from "./analytics";

// 로컬 개발 서버의 방문은 집계하지 않는다
if (import.meta.env.PROD) initAnalytics();

// 빌드된 index.html에는 프리렌더된 마크업이 들어 있으므로 다시 그리지 않고 하이드레이션한다.
// (개발 서버에서는 #app이 비어 있어 일반 마운트처럼 동작)
createApp().mount("#app");
