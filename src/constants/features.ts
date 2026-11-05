// 기능 플래그
// inquiryForm: 이메일(폼) 견적 문의. false면 폼 대신 전화 문의 안내를 보여주고
//              서버리스 함수(/.netlify/functions/contact)도 요청을 받지 않는다.
//              다시 받으려면 true로 바꾸고 배포하면 된다.
export const FEATURES = {
  inquiryForm: false,
} as const;
