# 서버리스 함수 환경 설정 가이드

## 필수 환경 변수

Netlify 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### EmailJS 설정

1. **EMAILJS_SERVICE_ID**

   - EmailJS 대시보드에서 서비스 ID 복사
   - 예: `service_xxxxxxx`

2. **EMAILJS_TEMPLATE_ID**

   - 회사용 이메일 템플릿 ID
   - 예: `template_company_xxxx`

3. **EMAILJS_CUSTOMER_TEMPLATE_ID**

   - 고객용 이메일 템플릿 ID
   - 예: `template_customer_xxxx`

4. **EMAILJS_PUBLIC_KEY**

   - EmailJS 퍼블릭 키
   - 예: `xxxxxxxxxxxxxxxx`

5. **EMAILJS_PRIVATE_KEY**
   - EmailJS 프라이빗 키 (서버 전용)
   - 예: `xxxxxxxxxxxxxxxx`

## Netlify 환경 변수 설정 방법

1. Netlify 대시보드 접속
2. 사이트 선택
3. **Site settings** → **Environment variables** 메뉴
4. **Add a variable** 버튼 클릭
5. 위의 환경 변수들을 하나씩 추가

## 보안 주의사항

- **PRIVATE_KEY는 절대 클라이언트 코드에 노출하지 마세요**
- 환경 변수는 Netlify 서버에서만 접근 가능합니다
- 로컬 개발시에는 `.env` 파일을 사용하되, Git에 커밋하지 마세요

## 테스트 방법

1. 환경 변수 설정 완료 후 사이트 재배포
2. 견적 문의 폼에서 테스트 이메일 전송
3. Netlify Functions 로그 확인 (Site settings → Functions → View logs)

## 문제 해결

### 500 에러가 발생하는 경우

- 환경 변수가 모두 설정되었는지 확인
- EmailJS 서비스, 템플릿 ID가 올바른지 확인
- Netlify Functions 로그 확인

### 이메일이 전송되지 않는 경우

- EmailJS 계정 상태 확인 (무료 요금제 한도 등)
- 이메일 템플릿 설정 확인
- 스팸 폴더 확인

## 개발용 로컬 설정

로컬 개발시 `.env` 파일 생성:

```bash
# .env (Git에 커밋하지 마세요!)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_company_template_id
EMAILJS_CUSTOMER_TEMPLATE_ID=your_customer_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

Netlify CLI로 로컬 테스트:

```bash
netlify dev
```
