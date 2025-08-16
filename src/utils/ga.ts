// src/ga.ts
const GA_ID = import.meta.env.VITE_GA_ID;

export function initGA() {
  if (!GA_ID || typeof window === "undefined") return;

  // gtag 스크립트 로드
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  // gtag 초기화
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);
}

export function trackEvent(name: string, params?: Record<string, any>) {
  const gtag = (window as any).gtag;
  const id = GA_ID;
  if (gtag && id) gtag("event", name, params || {});
}
