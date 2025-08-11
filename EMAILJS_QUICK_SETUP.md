# 🚀 EmailJS 빠른 설정 가이드

## ⚠️ 오류 해결: "The Public Key is invalid"

현재 `.env` 파일의 값들이 실제 EmailJS 키로 설정되지 않았습니다.

### 1단계: EmailJS 계정 생성

1. **EmailJS 웹사이트 접속**: https://www.emailjs.com/
2. **회원가입** 또는 **로그인**
3. **무료 계정**: 월 200회 이메일 발송 가능

### 2단계: 서비스 연결

1. **대시보드** → **Email Services** → **Add New Service**
2. **Gmail** 선택 (추천)
3. **회사 Gmail 계정 연결**: `pw83437@naver.com`
4. **Service ID 복사**: 예) `service_abc123`

### 3단계: 이메일 템플릿 생성

#### 템플릿 1: 회사용 견적 문의

1. **Email Templates** → **Create New Template**
2. **Template Name**: `견적문의_회사용`
3. **To Email**: `pw83437@naver.com` (고정)
4. **Subject**: `[평원건축] 새로운 견적 문의 - {{customer_name}}님`
5. **Content**: 아래 HTML 복사

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>새 견적문의</title>
  </head>
  <body
    style="margin:0;padding:0;background:#f6f7f9;font-family:system-ui,sans-serif;"
  >
    <div
      style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;"
    >
      <!-- 헤더 -->
      <div
        style="background:#d52e38;padding:20px;text-align:center;color:white;"
      >
        <h1 style="margin:0;font-size:24px;">🏗️ 평원건축</h1>
        <p style="margin:5px 0 0;opacity:0.9;">새로운 견적 문의</p>
      </div>

      <!-- 내용 -->
      <div style="padding:30px;">
        <h2
          style="color:#d52e38;border-bottom:2px solid #d52e38;padding-bottom:10px;"
        >
          👤 고객 정보
        </h2>
        <div
          style="background:#f8f9fa;padding:15px;border-radius:8px;margin:15px 0;"
        >
          <p><strong>이름:</strong> {{customer_name}}</p>
          <p>
            <strong>연락처:</strong>
            <a href="tel:{{customer_phone}}">{{customer_phone}}</a>
          </p>
          <p>
            <strong>이메일:</strong>
            <a href="mailto:{{customer_email}}">{{customer_email}}</a>
          </p>
        </div>

        <h2
          style="color:#d52e38;border-bottom:2px solid #d52e38;padding-bottom:10px;"
        >
          🏢 프로젝트 정보
        </h2>
        <div
          style="background:#fff5f5;padding:15px;border-radius:8px;margin:15px 0;"
        >
          <p><strong>공사 구분:</strong> {{construction_type}}</p>
          <p><strong>예정일:</strong> {{construction_date}}</p>
          <p><strong>평형:</strong> {{area}}</p>
          <p><strong>예상 금액:</strong> {{budget}}</p>
        </div>

        <h2
          style="color:#d52e38;border-bottom:2px solid #d52e38;padding-bottom:10px;"
        >
          📍 주소
        </h2>
        <div
          style="background:#f0f9ff;padding:15px;border-radius:8px;margin:15px 0;"
        >
          <p>{{full_address}}</p>
        </div>

        <h2
          style="color:#d52e38;border-bottom:2px solid #d52e38;padding-bottom:10px;"
        >
          💬 문의 내용
        </h2>
        <div
          style="background:#fffef0;padding:15px;border-radius:8px;margin:15px 0;"
        >
          <p style="white-space:pre-wrap;">{{message}}</p>
        </div>

        <!-- 액션 버튼 -->
        <div style="text-align:center;margin:30px 0;">
          <a
            href="tel:{{customer_phone}}"
            style="display:inline-block;background:#d52e38;color:white;padding:12px 25px;text-decoration:none;border-radius:5px;margin:5px;"
            >📞 전화하기</a
          >
          <a
            href="mailto:{{customer_email}}"
            style="display:inline-block;background:#2563eb;color:white;padding:12px 25px;text-decoration:none;border-radius:5px;margin:5px;"
            >📧 이메일 보내기</a
          >
        </div>
      </div>

      <!-- 푸터 -->
      <div
        style="background:#f8f9fa;padding:20px;text-align:center;border-top:1px solid #eee;"
      >
        <p style="margin:0;color:#666;font-size:12px;">
          접수일시: {{inquiry_date}}
        </p>
      </div>
    </div>
  </body>
</html>
```

6. **Template ID 복사**: 예) `template_abc123`

#### 템플릿 2: 고객용 확인 메일

1. **Create New Template**
2. **Template Name**: `견적문의_고객확인`
3. **To Email**: `{{customer_email}}` (동적)
4. **Subject**: `[평원건축] 견적 문의 접수 확인 - {{customer_name}}님`
5. **Content**: 아래 HTML 복사

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>견적 문의 접수 확인</title>
  </head>
  <body
    style="margin:0;padding:0;background:#f6f7f9;font-family:system-ui,sans-serif;"
  >
    <div
      style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;"
    >
      <!-- 헤더 -->
      <div
        style="background:linear-gradient(135deg,#d52e38,#c41e28);padding:30px;text-align:center;color:white;"
      >
        <h1 style="margin:0;font-size:28px;">평원건축</h1>
        <p style="margin:5px 0 0;opacity:0.9;">PYEONGWON ARCHITECTURE</p>
      </div>

      <!-- 내용 -->
      <div style="padding:30px;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#333;font-size:24px;margin:0;">
            안녕하세요, {{customer_name}}님! 👋
          </h1>
          <p style="color:#666;margin:15px 0 0;">
            평원건축에 견적 문의를 해주셔서 감사합니다.
          </p>
        </div>

        <!-- 접수 확인 -->
        <div
          style="background:#f0f8ff;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #d52e38;"
        >
          <h2 style="color:#d52e38;margin:0 0 10px;">
            ✅ 견적 문의가 접수되었습니다
          </h2>
          <p style="margin:0;color:#555;">
            {{construction_type}} 프로젝트에 대한 견적 문의를 정상적으로
            받았습니다.
          </p>
        </div>

        <!-- 진행 과정 -->
        <div
          style="background:#fff8f8;padding:20px;border-radius:8px;margin:20px 0;"
        >
          <h2
            style="color:#d52e38;margin:0 0 15px;border-bottom:2px solid #d52e38;padding-bottom:8px;"
          >
            📋 진행 과정
          </h2>
          <div
            style="margin:15px 0;padding:12px;background:white;border-radius:6px;border-left:4px solid #d52e38;"
          >
            <strong style="color:#d52e38;">1단계 (1~2일 내)</strong><br />
            담당자가 문의 내용을 검토하고 연락드립니다.
          </div>
          <div
            style="margin:15px 0;padding:12px;background:white;border-radius:6px;border-left:4px solid #d52e38;"
          >
            <strong style="color:#d52e38;">2단계 (3~5일 내)</strong><br />
            현장 방문 일정을 조율하여 정확한 견적을 산출합니다.
          </div>
          <div
            style="margin:15px 0;padding:12px;background:white;border-radius:6px;border-left:4px solid #d52e38;"
          >
            <strong style="color:#d52e38;">3단계 (7일 내)</strong><br />
            상세한 견적서와 시공 계획을 제공해드립니다.
          </div>
        </div>

        <!-- 연락처 -->
        <div
          style="background:#fffef7;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #f0e68c;"
        >
          <h2 style="color:#d52e38;margin:0 0 15px;">
            📞 급한 문의사항이 있으시면
          </h2>
          <p style="margin:0 0 15px;">
            아래 연락처로 직접 연락 주시면 더욱 빠른 상담이 가능합니다.
          </p>
          <div style="text-align:center;">
            <a
              href="tel:02-1234-5678"
              style="display:inline-block;background:#d52e38;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;margin:5px;"
              >📞 02-1234-5678</a
            >
            <a
              href="tel:010-1234-5678"
              style="display:inline-block;background:#2563eb;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;margin:5px;"
              >📱 010-1234-5678</a
            >
          </div>
        </div>
      </div>

      <!-- 푸터 -->
      <div
        style="background:#f8f9fa;padding:20px;text-align:center;border-top:1px solid #eee;"
      >
        <div
          style="color:#666;font-size:14px;font-weight:bold;margin-bottom:10px;"
        >
          평원건축 주식회사
        </div>
        <div style="color:#888;font-size:12px;">
          📞 02-1234-5678 | 📱 010-1234-5678<br />
          📧 pw83437@naver.com<br />
          📍 (14547) 경기 부천시 원미구 심곡동 133-2
        </div>
      </div>
    </div>
  </body>
</html>
```

7. **Template ID 복사**: 예) `template_def456`

### 4단계: Public Key 확인

1. **Account** → **General** 탭
2. **Public Key** 복사: 예) `abc123xyz789`

### 5단계: .env 파일 업데이트

```env
# EmailJS 설정 (실제 값으로 변경)
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_def456
VITE_EMAILJS_PUBLIC_KEY=abc123xyz789
```

### 6단계: 테스트

1. **개발 서버 재시작**: `npm run dev`
2. **견적 문의 폼 테스트**
3. **이메일 확인**: 회사 및 고객 메일 수신 확인

## 🔧 문제 해결

### Public Key 오류

- **대시보드 접속**: https://dashboard.emailjs.com/admin/account
- **Public Key 재확인** 및 복사
- **.env 파일 업데이트** 후 서버 재시작

### Template ID 오류

- **템플릿 목록**: https://dashboard.emailjs.com/admin/templates
- **Template ID 확인** (template_xxx 형식)

### Service ID 오류

- **서비스 목록**: https://dashboard.emailjs.com/admin
- **Service ID 확인** (service_xxx 형식)

## 📞 지원

설정 중 문제가 발생하면:

1. **EmailJS 공식 문서**: https://www.emailjs.com/docs/
2. **브라우저 개발자 도구** 콘솔 확인
3. **네트워크 탭**에서 API 요청 상태 확인
