// 빌드 후처리: SSR 번들로 첫 화면 HTML을 만들어 dist/index.html의 #app 안에 넣는다.
// 검색 로봇(특히 JS 실행이 제한적인 네이버)이 본문을 읽을 수 있고, JS 실행 전에도 화면이 보인다.
import { readFile, rm, writeFile } from "node:fs/promises";

// 경로 문자열 대신 file: URL로 다룬다 (Windows의 C:\ 경로는 import()에 바로 넘길 수 없음)
const indexUrl = new URL("../dist/index.html", import.meta.url);
const ssrDirUrl = new URL("../dist-ssr/", import.meta.url);
const MOUNT = '<div id="app"></div>';

try {
  const { render } = await import(new URL("entry-server.js", ssrDirUrl).href);
  const html = await render();
  const template = await readFile(indexUrl, "utf8");
  if (!template.includes(MOUNT)) {
    throw new Error(`dist/index.html에서 ${MOUNT}를 찾지 못했습니다.`);
  }
  // 함수로 넘겨 렌더링 결과의 $&·$' 등이 치환 패턴으로 해석되지 않게 한다
  await writeFile(
    indexUrl,
    template.replace(MOUNT, () => `<div id="app">${html}</div>`)
  );
  console.log(
    `prerender: ${(html.length / 1024).toFixed(1)}KB → dist/index.html`
  );
} finally {
  await rm(ssrDirUrl, { recursive: true, force: true });
}
