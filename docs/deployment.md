# 배포

## 구조

- **호스팅**: Netlify (`master` 푸시 시 자동 배포, PR마다 Deploy Preview)
- **CI**: GitHub Actions `.github/workflows/ci.yml` — type-check + build만 수행 (배포하지 않음)
- **Node**: 22 LTS (`.nvmrc`, `package.json` engines, `netlify.toml`의 `NODE_VERSION`을 함께 맞춤)

## netlify.toml

- 보안 헤더와 CSP. 외부 리소스를 추가하면 CSP에 도메인을 넣어야 차단되지 않습니다.
  - 스크립트: 카카오 우편번호(`t1.daumcdn.net`), Google Tag Manager
  - 수집: `*.google-analytics.com`
  - 폰트: self-host (Pretendard npm 패키지)
- 캐시: `/assets/*` 영구(해시 파일명), `/images/*` 1주일
- 단일 페이지라 SPA 리다이렉트는 두지 않습니다.

## 도메인을 바꿀 때

현재 기준 주소는 `https://pyeongwon-architecture.netlify.app` 입니다. 커스텀 도메인을 연결하면 아래를 함께 바꾸세요.

- `index.html`: canonical, `og:url`, `og:image`, JSON-LD의 `url`/`image`/`logo`
- `public/robots.txt`, `public/sitemap.xml`
- `src/constants/company-info.ts`의 `website`

배포 후 네이버 서치어드바이저와 Google Search Console에 `sitemap.xml`을 등록하세요.
