import portfolioImages from "@/constants/portfolio-images.json";

// scripts/image-variants.py 가 만든 크기 정보(원본 크기·변형 폭)로 srcset을 만든다.
type ImageInfo = { width: number; height: number; variants: number[] };
const manifest: Record<string, ImageInfo> = portfolioImages;

/** 포트폴리오 카드 표시 폭: lg 3열(max-w-6xl) / md 2열 / 모바일 1열 */
export const PORTFOLIO_CARD_SIZES =
  "(min-width: 1024px) 363px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 32px)";

export function getImageInfo(src: string): ImageInfo | undefined {
  return manifest[src];
}

/** `/a.webp` → `/a-400.webp 400w, /a-800.webp 800w, /a.webp 1200w` */
export function buildSrcset(src: string): string | undefined {
  const info = manifest[src];
  if (!info) return undefined;
  const base = src.replace(/\.webp$/, "");
  return [
    ...info.variants.map((w) => `${base}-${w}.webp ${w}w`),
    `${src} ${info.width}w`,
  ].join(", ");
}

export function isPortrait(src: string): boolean {
  const info = manifest[src];
  return !!info && info.height > info.width;
}
