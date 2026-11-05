import "./assets/main.css";

import { createApp } from "./create-app";
import { initAnalytics } from "./analytics";

// 로컬 개발 서버의 방문은 집계하지 않는다
if (import.meta.env.PROD) initAnalytics();

// 빌드된 index.html에는 프리렌더된 마크업이 들어 있으므로 다시 그리지 않고 하이드레이션한다.
// 개발 서버에서는 #app이 비어 있으므로 일반 마운트 (빈 컨테이너 하이드레이션 경고 방지)
const hydrate = !!document.getElementById("app")?.hasChildNodes();
createApp({ hydrate }).mount("#app");
