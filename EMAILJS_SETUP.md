# EmailJS 설정 가이드

## 1. EmailJS 계정 설정

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 회원가입
2. 대시보드에서 새 서비스 생성 (Gmail, Outlook 등)
3. 이메일 템플릿 2개 생성 (회사용, 고객 자동응답용)
4. Public Key 발급

## 2. 환경 변수 설정

`.env` 파일에서 다음 값들을 실제 값으로 변경:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=your_customer_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 3. 이메일 템플릿 설정

### 템플릿 1: 회사용 견적 문의 접수 알림

**템플릿 ID**: `quote_inquiry_admin`
**받는 사람**: pw83437@naver.com (회사 이메일)
**제목**: [평원건축] 새로운 견적 문의 - {{customer_name}}님

**HTML 내용**: `email-templates/quote-inquiry-template.html` 파일의 내용 전체 복사

### 템플릿 2: 고객용 접수 확인 메일

**템플릿 ID**: `quote_inquiry_customer`
**받는 사람**: {{customer_email}} (고객 이메일)
**제목**: [평원건축] 견적 문의가 접수되었습니다 - {{customer_name}}님

**HTML 내용**: `email-templates/customer-confirmation-template.html` 파일의 내용 전체 복사

## 4. 템플릿 변수 설정

EmailJS 템플릿에서 다음 변수들을 사용할 수 있습니다:

### 고객 정보

- `{{customer_name}}` - 고객 이름
- `{{customer_phone}}` - 고객 연락처
- `{{customer_email}}` - 고객 이메일

### 공사 정보

- `{{construction_type}}` - 공사 구분
- `{{construction_date}}` - 공사 예정일
- `{{area}}` - 평형
- `{{budget}}` - 예상 금액

### 주소 정보

- `{{postal_code}}` - 우편번호
- `{{road_address}}` - 도로명 주소
- `{{detail_address}}` - 상세 주소
- `{{full_address}}` - 전체 주소 (조합된 형태)

### 기타

- `{{message}}` - 문의 내용
- `{{inquiry_date}}` - 접수 일시

## 5. 이메일 템플릿 특징

### 회사용 템플릿

- 📊 체계적인 정보 구성 (고객정보, 공사정보, 주소, 문의내용)
- 🎨 시각적으로 구분된 섹션 (색상별 배경)
- ⚡ 즉시 연락 가능한 버튼 (전화걸기, 이메일보내기)
- 📱 모바일 친화적 반응형 디자인

### 고객용 템플릿

- 🤝 친근한 인사말과 감사 메시지
- 📋 명확한 다음 단계 안내 (1단계→2단계→3단계)
- 📞 긴급 연락처 정보
- 🏗️ 회사 소개 및 신뢰감 조성

## 6. 테스트

설정 완료 후 견적 문의 폼을 테스트하여 다음을 확인:

- ✅ 회사 이메일로 견적 문의 알림 수신
- ✅ 고객에게 접수 확인 메일 발송
- ✅ 모든 변수가 올바르게 치환되어 표시

## 7. 보안 고려사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- Public Key만 사용하므로 클라이언트 사이드에서 안전합니다
- EmailJS는 월 200회 무료 전송을 제공합니다

## 8. 추가 기능

이메일 템플릿의 특별한 기능들:

- 📞 클릭 가능한 전화번호 링크
- 📧 클릭 가능한 이메일 링크
- 🎨 브랜드 컬러(#d52e38) 적용
- 📱 모바일 최적화 디자인
- 🔗 즉시 응답을 위한 액션 버튼
