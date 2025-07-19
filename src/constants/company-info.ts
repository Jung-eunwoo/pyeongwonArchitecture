// 평원건축 회사 정보 상수
export const COMPANY_INFO = {
  // 회사명
  name: '평원건축',
  fullName: '평원건축 주식회사',
  
  // 연락처 정보
  phone: '02-1234-5678',
  fax: '02-1234-5679',
  mobile: '010-1234-5678',
  
  // 이메일
  email: 'pw83437@naver.com',
  supportEmail: 'support@pyeongwon.co.kr',
  
  // 주소 정보
  address: {
    postalCode: '14547',
    roadAddress: '경기 부천시 원미구 심곡동 133-2',
    detailAddress: '1층 평원건축 사무실',
    fullAddress: '경기 부천시 원미구 심곡동 133-2, 1층 평원건축 사무실'
  },
  
  // 영업시간
  businessHours: {
    weekday: '평일 09:00 ~ 18:00',
    saturday: '토요일 09:00 ~ 15:00',
    sunday: '일요일 휴무'
  },
  
  // 사업자 정보
  business: {
    registrationNumber: '123-45-67890',
    representative: '김평원',
    establishedYear: 1994,
    experience: 30
  },
  
  // 실적
  performance: {
    completedProjects: 500,
    experienceYears: 30
  },
  
  // 웹사이트 및 소셜미디어
  website: 'https://www.pyeongwon.co.kr',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    blog: ''
  }
} as const;

// 연락처 정보만 별도로 export
export const CONTACT_INFO = {
  phone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: COMPANY_INFO.address.fullAddress
} as const;

// 비즈니스 아워
export const BUSINESS_HOURS = COMPANY_INFO.businessHours;

// 회사 실적
export const COMPANY_STATS = COMPANY_INFO.performance;
