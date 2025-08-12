# 🚀 Netlify 배포 가이드

## 1. Netlify 계정 설정

1. **Netlify 계정 생성**: https://netlify.com
2. **GitHub 연결**: GitHub 계정으로 로그인
3. **새 사이트 추가**: "New site from Git" 클릭

## 2. 저장소 연결

1. **GitHub 선택**: GitHub provider 선택
2. **저장소 선택**: `pyeongwonArchitecture` 저장소 선택
3. **배포 설정 확인**:
   - Branch: `master`
   - Build command: `npm run build`
   - Publish directory: `dist`

## 3. 환경 변수 설정

Netlify 대시보드에서 환경 변수를 설정해야 합니다:

### Site Settings → Environment Variables → Add Variable

```bash
# EmailJS 설정
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 환경 변수 값 확인

1. **EmailJS 대시보드**: https://dashboard.emailjs.com
2. **Service ID**: Email Services 페이지에서 확인
3. **Template ID**: Email Templates 페이지에서 확인
4. **Public Key**: Account 페이지에서 확인

## 4. 배포 확인

1. **자동 배포**: 코드 푸시 시 자동으로 빌드 & 배포
2. **배포 로그**: Netlify 대시보드에서 빌드 로그 확인
3. **사이트 URL**: 배포 완료 후 제공되는 URL 확인

## 5. 커스텀 도메인 설정 (선택사항)

### 도메인 연결

```bash
# Domain settings → Add custom domain
# 예: pyeongwon-architecture.com
```

### DNS 설정

```bash
# 도메인 관리 업체에서 설정
CNAME www your-site-name.netlify.app
A @ 75.2.60.5
```

## 6. 성능 최적화

### 빌드 최적화

- **Node.js 18** 사용 (netlify.toml에서 설정)
- **정적 파일 캐싱** 1년 설정
- **Gzip 압축** 자동 적용

### 보안 설정

- **HTTPS** 자동 적용
- **보안 헤더** 설정 (netlify.toml)
- **CSP** (Content Security Policy) 적용

## 7. 문제 해결

### 빌드 실패 시

```bash
# 로컬에서 빌드 테스트
npm install
npm run build

# 환경 변수 확인
echo $VITE_EMAILJS_SERVICE_ID
```

### 환경 변수 오류 시

1. Netlify 대시보드에서 환경 변수 재확인
2. 변수명이 `VITE_`로 시작하는지 확인
3. 빌드 로그에서 환경 변수 로딩 확인

### 이메일 전송 실패 시

1. EmailJS 대시보드에서 키 값 재확인
2. 브라우저 개발자 도구에서 네트워크 탭 확인
3. CSP 오류 확인 (Console 탭)

## 8. 배포 상태 확인

### 성공적인 배포

- ✅ Build successful
- ✅ Deploy successful
- ✅ EmailJS 연동 작동
- ✅ 주소 검색 API 작동
- ✅ 모든 애니메이션 정상 작동

### 배포 URL 예시

```
https://pyeongwon-architecture.netlify.app
```

## 9. 자동 배포 워크플로

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin master
# → Netlify가 자동으로 빌드 & 배포
```

## 📞 지원

배포 중 문제가 발생하면:

- **Netlify 문서**: https://docs.netlify.com
- **빌드 로그**: Netlify 대시보드에서 확인
- **커뮤니티**: https://community.netlify.com
