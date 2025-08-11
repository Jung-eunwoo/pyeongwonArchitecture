# 이메일 템플릿 사용 가이드

## 📧 구현된 이메일 시스템

견적 문의 시 **2개의 이메일**이 자동으로 발송됩니다:

### 1️⃣ 회사용 알림 메일

- **받는 사람**: pw83437@naver.com (평원건축)
- **목적**: 새로운 견적 문의 접수 알림
- **템플릿**: `quote-inquiry-template.html`

### 2️⃣ 고객용 확인 메일

- **받는 사람**: 고객이 입력한 이메일
- **목적**: 문의 접수 확인 및 다음 단계 안내
- **템플릿**: `customer-confirmation-template.html`

## 🎨 이메일 템플릿 특징

### 회사용 템플릿

```
🏗️ 새로운 견적 문의가 접수되었습니다
├── 👤 고객 정보 (이름, 연락처, 이메일)
├── 🏢 공사 정보 (구분, 예정일, 평형, 금액)
├── 📍 공사 예정지 (전체 주소)
├── 💬 문의 내용
└── ⚡ 신속한 응답 요청 (전화/이메일 버튼)
```

### 고객용 템플릿

```
안녕하세요, {고객명}님! 👋
├── ✅ 접수 완료 확인
├── 📋 진행 과정 안내 (3단계)
├── 📞 긴급 연락처 정보
└── 🏗️ 회사 소개
```

## 🛠️ EmailJS 설정 방법

1. **EmailJS 대시보드 접속**

   - https://www.emailjs.com/ 에서 계정 생성
   - 서비스 추가 (Gmail/Outlook 연결)

2. **템플릿 생성**

   ```
   템플릿 1: quote_inquiry_admin
   └── email-templates/quote-inquiry-template.html 내용 복사

   템플릿 2: quote_inquiry_customer
   └── email-templates/customer-confirmation-template.html 내용 복사
   ```

3. **환경 변수 설정**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_admin_xxxxx
   VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```

## 📱 템플릿 디자인 특징

### 시각적 요소

- **브랜드 컬러**: #d52e38 (평원건축 메인 컬러)
- **그라데이션 헤더**: 전문성과 신뢰감 표현
- **섹션별 색상 구분**: 정보 가독성 향상
- **이모지 활용**: 친근함과 직관성

### 반응형 디자인

- **모바일 최적화**: 600px 최대 너비
- **클릭 가능 요소**: 전화번호, 이메일 링크
- **CTA 버튼**: 즉시 연락 가능한 액션 버튼

## 🔧 기술적 구현

### 데이터 전송

```javascript
templateParams = {
  customer_name: "홍길동",
  customer_phone: "010-1234-5678",
  customer_email: "hong@email.com",
  construction_type: "신축",
  construction_date: "2025-03-01",
  area: "30-40평",
  budget: "1억원 ~ 5억원",
  full_address: "(12345) 서울시 강남구 ...",
  message: "견적 문의드립니다.",
  inquiry_date: "2025년 8월 12일 오후 2:30",
};
```

### 이메일 발송 흐름

```
고객 폼 제출
    ↓
필수 항목 검증
    ↓
EmailJS 초기화
    ↓
회사용 이메일 발송 → pw83437@naver.com
    ↓
고객용 확인 메일 발송 → 고객 이메일
    ↓
성공 메시지 표시 & 폼 초기화
```

## 📊 활용 효과

### 비즈니스 측면

- ⚡ **즉시 알림**: 실시간 견적 문의 접수
- 📈 **응답률 향상**: 체계적인 정보 정리
- 🤝 **고객 만족**: 자동 확인 메일로 신뢰감 증대

### 기술적 측면

- 🔄 **자동화**: 수동 작업 없이 이메일 처리
- 🎨 **전문성**: HTML 템플릿으로 브랜드 이미지 강화
- 📱 **접근성**: 모바일에서도 완벽한 이메일 표시

## 🚀 확장 가능성

이메일 시스템은 추후 다음과 같이 확장 가능합니다:

- 📅 견적서 발송 자동화
- 📊 CRM 시스템 연동
- 🔔 SMS 알림 추가
- 📋 문의 상태 추적 시스템
