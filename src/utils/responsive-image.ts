import portfolioImages from "@/constants/portfolio-images.json";

// scripts/image-variants.py 가 만든 크기 정보(원본 크기·변형 폭)로 srcset을 만든다.
type ImageInfo = { width: number; height: number; variants: number[] };
const manifest: Record<string, ImageInfo> = portfolioImages;

/** 포트폴리오 카드 표시 폭: lg 3열(max-w-6xl) / md 2열 / 모바일 1열 */
const PORTFOLIO_CARD_SIZES =
  "(min-width: 1024px) 363px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 32px)";

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

/** 카드 사진 영역 높이(h-48). 세로 사진은 object-contain 이라 이 높이에 맞춰 폭이 정해진다 */
const PORTFOLIO_CARD_HEIGHT = 192;

export type ResponsiveImageAttrs = {
  src: string;
  srcset?: string;
  sizes: string;
  width?: number;
  height?: number;
  portrait: boolean;
};

/** img 에 넣을 속성을 한 번에 계산한다 (렌더링마다 다시 만들지 않도록 computed 에서 사용) */
export function getResponsiveImageAttrs(src: string): ResponsiveImageAttrs {
  const info = manifest[src];
  const portrait = !!info && info.height > info.width;
  return {
    src,
    srcset: buildSrcset(src),
    // 세로 사진은 카드 폭이 아니라 높이에 맞춰 표시되므로 실제 표시 폭을 알려 준다
    sizes: portrait
      ? `${Math.ceil((PORTFOLIO_CARD_HEIGHT * info.width) / info.height)}px`
      : PORTFOLIO_CARD_SIZES,
    width: info?.width,
    height: info?.height,
    portrait,
  };
}
