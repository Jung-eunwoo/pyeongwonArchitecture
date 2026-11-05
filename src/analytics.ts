// Google Analytics (gtag.js)
// CSP에서 'unsafe-inline'을 빼기 위해 index.html의 인라인 스크립트를 모듈로 옮겼다.
// dataLayer 큐는 바로 만들고, gtag.js 다운로드는 페이지 load 이후 유휴 시점으로 미룬다
// (첫 화면의 폰트·JS와 대역폭을 다투지 않도록). 그 사이 이벤트는 큐에 쌓였다 전송된다.
const GA_ID = "G-CFMN6TEZ6C";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initAnalytics(): void {
  window.dataLayer = window.dataLayer || [];
  // gtag.js는 배열이 아니라 arguments 객체가 큐에 들어 있기를 기대한다
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const load = () => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  };
  const scheduleLoad = () => {
    if ("requestIdleCallback" in window)
      requestIdleCallback(load, { timeout: 3000 });
    else setTimeout(load, 1500);
  };
  // 모듈 스크립트는 load 이전에 실행되지만, 혹시 이미 load가 끝났다면 바로 예약
  if (document.readyState === "complete") scheduleLoad();
  else window.addEventListener("load", scheduleLoad, { once: true });
}
