# 포트폴리오 이미지

포트폴리오 카드에 쓰이는 사진입니다. 경로는 `src/constants/company-info.ts`의
`PORTFOLIO_PROJECTS[].images`에 정의합니다.

## 규칙

- **형식**: WebP (원본 JPG/PNG는 올리지 않습니다)
- **크기**: 가로 최대 1200px (카드 표시 폭은 최대 약 400px)
- **용량**: 장당 150KB 안팎
- **파일명**: `{지역}-{프로젝트}-{번호}.webp` (예: `gimpo-commercial-1.webp`)

## 새 사진 추가 방법

```bash
# cwebp 사용 시 (brew install webp / apt install webp)
cwebp -q 78 -resize 1200 0 원본.jpg -o public/images/portfolio/새파일-1.webp
```

또는 https://squoosh.app 에서 WebP · 품질 75~80 · 가로 1200px로 저장하세요.
휴대폰 사진은 EXIF 회전 정보가 있으므로 변환 후 방향이 맞는지 확인하세요.
