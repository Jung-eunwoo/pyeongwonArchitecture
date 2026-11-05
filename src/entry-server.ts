// 빌드 전용: 첫 화면 HTML을 문자열로 렌더링한다 (scripts/prerender.mjs에서 사용)
import { renderToString } from "vue/server-renderer";
import { createApp } from "./create-app";

export async function render(): Promise<string> {
  return renderToString(createApp());
}
