// 평원건축 회사 정보 상수
export const COMPANY_INFO = {
  // 회사명
  name: "평원건축",
  fullName: "평원건축 주식회사",

  // 연락처 정보
  phone: "02-1234-5678",
  fax: "02-1234-5679",
  mobile: "010-1234-5678",

  // 이메일
  email: "pw83437@naver.com",
  supportEmail: "support@pyeongwon.co.kr",

  // 주소 정보
  address: {
    postalCode: "14547",
    roadAddress: "경기 부천시 원미구 심곡동 133-2",
    detailAddress: "1층 평원건축 사무실",
    fullAddress: "경기 부천시 원미구 심곡동 133-2, 1층 평원건축 사무실",
  },

  // 영업시간
  businessHours: {
    weekday: "평일 09:00 ~ 18:00",
    saturday: "토요일 09:00 ~ 15:00",
    sunday: "일요일 휴무",
  },

  // 사업자 정보
  business: {
    registrationNumber: "123-45-67890",
    representative: "김평원",
    establishedYear: 1994,
    experience: 30,
  },

  // 실적
  performance: {
    completedProjects: 500,
    experienceYears: 30,
  },

  // 웹사이트 및 소셜미디어
  website: "https://www.pyeongwon.co.kr",
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    blog: "",
  },
} as const;

// 연락처 정보만 별도로 export
export const CONTACT_INFO = {
  phone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: COMPANY_INFO.address.fullAddress,
} as const;

// 비즈니스 아워
export const BUSINESS_HOURS = COMPANY_INFO.businessHours;

// 회사 실적
export const COMPANY_STATS = COMPANY_INFO.performance;

// 네비게이션 메뉴
export const NAV_ITEMS = [
  { id: "home", label: "홈" },
  { id: "about", label: "회사소개" },
  { id: "services", label: "서비스" },
  { id: "portfolio", label: "포트폴리오" },
  { id: "contact", label: "견적문의" },
] as const;

// 회사 특징/강점
export const COMPANY_FEATURES = [
  {
    icon: "Award",
    title: "품질 보증",
    description:
      "엄선된 자재와 숙련된 기술진으로 최고 품질의 시공을 보장합니다.",
  },
  {
    icon: "Users",
    title: "전문 팀",
    description:
      "건축사, 인테리어 디자이너, 시공 전문가가 함께하는 원스톱 서비스",
  },
  {
    icon: "Hammer",
    title: "A/S 보장",
    description:
      "완공 후에도 지속적인 관리와 신속한 A/S로 고객 만족을 실현합니다.",
  },
] as const;

// 서비스 분야
export const SERVICES = [
  {
    icon: "Home",
    title: "주거 공간",
    description: "아파트, 빌라, 단독주택 리모델링",
    items: [
      "전체 리모델링",
      "부분 인테리어",
      "주방, 욕실 전문 시공",
      "확장 및 구조 변경",
    ],
  },
  {
    icon: "Building2",
    title: "상업 공간",
    description: "사무실, 매장, 카페 인테리어",
    items: [
      "사무실 인테리어",
      "매장 및 쇼룸",
      "카페, 레스토랑",
      "병원, 클리닉",
    ],
  },
  {
    icon: "Calculator",
    title: "설계 서비스",
    description: "3D 설계 및 시뮬레이션",
    items: ["3D 모델링", "도면 작성", "인허가 대행", "구조 안전 진단"],
  },
] as const;

// 포트폴리오 프로젝트
export const PORTFOLIO_PROJECTS = [
  { title: "강남 아파트 리모델링", type: "주거공간", image: "" },
  { title: "홍대 카페 인테리어", type: "상업공간", image: "" },
  { title: "판교 사무실 설계", type: "사무공간", image: "" },
  { title: "용산 단독주택", type: "주거공간", image: "" },
  { title: "명동 매장 인테리어", type: "상업공간", image: "" },
  { title: "분당 빌라 리모델링", type: "주거공간", image: "" },
] as const;

// 연락처 목록 (UI 표시용)
export const CONTACT_LIST = [
  {
    icon: "Phone",
    title: "전화 문의",
    content: COMPANY_INFO.phone,
    subtitle: COMPANY_INFO.businessHours.weekday,
  },
  {
    icon: "Mail",
    title: "이메일 문의",
    content: COMPANY_INFO.email,
    subtitle: "24시간 접수 가능",
  },
  {
    icon: "MapPin",
    title: "오시는 길",
    content: COMPANY_INFO.address.roadAddress,
    subtitle: COMPANY_INFO.address.detailAddress,
  },
] as const;

// 견적 문의 폼 초기값
export const INITIAL_FORM_DATA = {
  name: "",
  phone: "",
  email: "",
  constructionDate: "",
  area: "",
  postalCode: "",
  roadAddress: "",
  detailAddress: "",
  budget: "",
  message: "",
} as const;
