# 견적 문의 메일 시스템

## 현재 상태

`src/constants/features.ts`의 `FEATURES.inquiryForm`이 **`false`** 입니다.

- 견적 문의 섹션에는 폼 대신 **전화 문의 안내**가 표시됩니다.
- 연락처 카드 중 "이메일 문의"가 숨겨집니다.
- `/.netlify/functions/contact`는 **503**을 반환합니다.

다시 켜려면 `inquiryForm: true`로 바꾸고 배포하세요.

## 동작 흐름

```
ContactUsSection.vue ──POST JSON──▶ netlify/functions/contact.ts ──▶ EmailJS
                                       │                              ├─ 회사 수신 메일 (EMAILJS_TEMPLATE_ID)
                                       │                              └─ 고객 확인 메일 (EMAILJS_CUSTOMER_TEMPLATE_ID)
                                       └─ validateInquiry() (src/shared/inquiry.ts)
```

- 선택지(공사 구분·평형·예상 금액)와 검증 규칙은 `src/shared/inquiry.ts` 한 곳에 있고, 클라이언트와 함수가 함께 사용합니다.
- 기본값("미정" 등) 채우기와 접수 시각(KST) 기록은 함수에서 합니다.

## 보안 장치

| 장치 | 내용 |
|---|---|
| 개인정보 동의 | `privacy_agreed !== true` 이면 400 |
| honeypot | 숨겨진 `company_website` 필드에 값이 있으면 봇으로 판단 |
| 작성 시간 | 폼 표시 후 3초 안에 제출되면 봇으로 판단 |
| 출처 확인 | `Origin`과 `Host`가 다르면 403 (CORS 헤더 없음) |
| 입력 검증 | 형식(이메일/전화/날짜/우편번호), 길이, 선택지 화이트리스트 |
| 정보 노출 방지 | 클라이언트에는 일반 메시지와 `debugId`만 반환, 로그에 고객 정보·키 미기록 |

봇으로 판단된 요청은 **200으로 응답하되 메일을 보내지 않습니다**(차단 사실을 알리지 않기 위함).
스팸이 계속되면 Cloudflare Turnstile 도입을 검토하세요.

## 환경 변수 (Netlify → Site configuration → Environment variables)

| 이름 | 설명 |
|---|---|
| `EMAILJS_SERVICE_ID` | EmailJS 서비스 ID |
| `EMAILJS_TEMPLATE_ID` | 회사 수신용 템플릿 ID |
| `EMAILJS_CUSTOMER_TEMPLATE_ID` | 고객 확인 메일 템플릿 ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS Public Key |
| `EMAILJS_PRIVATE_KEY` | EmailJS Private Key (Account → API keys) |

`VITE_` 접두사 이름(`VITE_EMAILJS_SERVICE_ID` 등)도 호환용으로 읽지만, 새로 설정할 때는 위 이름을 쓰세요.
EmailJS 대시보드의 **Account → Security**에서 "Allow EmailJS API for non-browser applications"를 켜야 서버에서 발송됩니다.

## 메일 템플릿

`email-templates/`의 HTML을 EmailJS 템플릿 본문에 붙여 넣어 사용합니다.

| 파일 | 용도 |
|---|---|
| `quote-inquiry-template.html` | 회사 수신용 (문의 전체 내용) |
| `customer-confirmation-template.html` | 고객 접수 확인 |

템플릿 변수: `customer_name`, `customer_phone`, `customer_email`, `construction_type`,
`construction_date`, `area`, `budget`, `postal_code`, `road_address`, `detail_address`,
`full_address`, `message`, `inquiry_date`

## 로컬 테스트

```bash
npm i -g netlify-cli
```

```bash
netlify dev
```

`.env`에 위 환경 변수를 넣고(`.env.example` 참고, 커밋 금지) `features.ts`의 플래그를 켠 뒤 확인합니다.
