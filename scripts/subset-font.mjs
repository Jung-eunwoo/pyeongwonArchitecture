// 페이지에서 실제로 쓰는 글자만 담은 Pretendard 서브셋(woff2 1개)을 만든다.
// - 대상: src/**/*.{vue,ts}, index.html 의 모든 글자 + 출력 가능한 ASCII 전체
// - dev/build 전에 자동 실행되므로 문구를 바꾸면 폰트도 자동으로 따라간다.
// - 서브셋에 없는 글자(예: 사용자가 입력한 글자)는 시스템 한글 폰트로 표시된다.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_FONT = join(
  root,
  "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
);
const OUTPUT = join(root, "src/assets/fonts/pretendard-subset.woff2");

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) return collectFiles(p);
      return [".vue", ".ts"].includes(extname(e.name)) ? [p] : [];
    })
  );
  return files.flat();
}

const files = [...(await collectFiles(join(root, "src"))), join(root, "index.html")];
const chars = new Set();
for (const file of files) {
  for (const ch of await readFile(file, "utf8")) chars.add(ch);
}
// 출력 가능한 ASCII 전체 (숫자·영문·기호)
for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c));

const text = [...chars].filter((ch) => ch.codePointAt(0) >= 0x20).join("");
const source = await readFile(SOURCE_FONT);
// 사이트에서 쓰는 굵기(400~700)만 남겨 크기를 줄인다
const subset = await subsetFont(source, text, {
  targetFormat: "woff2",
  variationAxes: { wght: { min: 400, max: 700 } },
});

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, subset);
console.log(
  `[subset-font] ${chars.size} chars → ${(subset.length / 1024).toFixed(1)}KB (${OUTPUT.replace(root + "/", "")})`
);
