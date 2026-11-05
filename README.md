# 평원건축 홈페이지

부천 평원건축(신축·증축·리모델링) 소개 및 견적 문의 사이트입니다.

- **스택**: Vue 3 · TypeScript · Vite 7 · Tailwind CSS v4 · @lucide/vue
- **호스팅**: Netlify (정적 사이트 + Netlify Functions)

## 시작하기

Node 22가 필요합니다 (`.nvmrc`).

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build   # type-check + 프로덕션 빌드
```

## 디렉터리

```
src/
  views/PyeongwonArchitecture.vue   한 페이지 전체 구성
  components/                       섹션·카드·레이아웃 컴포넌트
  constants/company-info.ts         회사 정보·서비스·포트폴리오 데이터 (내용 수정은 대부분 여기서)
  constants/features.ts             기능 플래그 (견적 폼 on/off)
  shared/inquiry.ts                 견적 문의 선택지·검증 (클라이언트/함수 공용)
  directives/reveal.ts              v-reveal: 스크롤 등장 애니메이션
  composables/useActiveSection.ts   현재 보고 있는 섹션 계산
  assets/main.css                   Tailwind, 디자인 토큰(--color-brand), 애니메이션
netlify/functions/contact.ts        견적 문의 메일 발송 함수
public/images/portfolio/            포트폴리오 사진 (WebP)
email-templates/                    EmailJS 메일 템플릿
```

## 자주 하는 작업

- **회사 정보/문구 수정**: `src/constants/company-info.ts`
- **포트폴리오 추가**: 사진을 WebP로 변환해 `public/images/portfolio/`에 넣고 `PORTFOLIO_PROJECTS`에 추가 ([가이드](public/images/portfolio/README.md))
- **견적 폼 켜기/끄기**: `src/constants/features.ts`
- **브랜드 컬러**: `src/assets/main.css`의 `--color-brand` (클래스는 `text-brand`, `bg-brand` 등)

## 문서

- [견적 문의 메일 시스템](docs/inquiry-email.md)
- [배포](docs/deployment.md)
