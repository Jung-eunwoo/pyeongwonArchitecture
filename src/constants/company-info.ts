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
    postalCode: "14662",
    roadAddress: "경기 부천시 원미구 부흥로 442",
    detailAddress: "1층",
    fullAddress: "경기 부천시 원미구 부흥로 442, 1층",
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
    title: "신축",
    description: "단독주택, 다세대 주택, 상업시설 신축 건설",
    items: [
      "단독주택 신축",
      "다세대/다가구 주택 신축",
      "근린생활시설 신축",
      "소규모 상업시설 건설",
    ],
  },
  {
    icon: "Building2",
    title: "증축",
    description: "기존 건물의 면적 확장 및 층수 증축",
    items: [
      "수직 증축 (층수 추가)",
      "수평 증축 (면적 확장)",
      "발코니 확장 및 샷시 설치",
      "옥상 구조물 증축",
    ],
  },
  {
    icon: "Calculator",
    title: "리모델링",
    description: "기존 건물의 구조 변경 및 전면 개보수, 인테리어 전문 시공",
    items: [
      "구조 변경 및 보강",
      "내외부 전면 리모델링",
      "주방, 욕실 인테리어",
      "바닥재, 벽지, 도배 시공",
    ],
  },
] as const;

// 포트폴리오 프로젝트
export const PORTFOLIO_PROJECTS = [
  {
    title: "순창한옥전체뉴모델링",
    type: "주거공간",
    images: [
      "/images/portfolio/sunchang-hanok-1.jpg",
      "/images/portfolio/sunchang-hanok-2.jpg",
      "/images/portfolio/sunchang-hanok-3.jpg",
    ],
  },
  {
    title: "부천옥길동신축공사",
    type: "신축공사",
    images: [
      "/images/portfolio/bucheon-okgil-1.jpg",
      "/images/portfolio/bucheon-okgil-2.jpg",
      "/images/portfolio/bucheon-okgil-3.jpg",
    ],
  },
  {
    title: "부천범박동신축공사",
    type: "신축공사",
    images: [
      "/images/portfolio/bucheon-beombak-1.jpg",
      "/images/portfolio/bucheon-beombak-2.jpg",
      "/images/portfolio/bucheon-beombak-3.jpg",
    ],
  },
  {
    title: "둔천동 천우교회 뉴모델링",
    type: "리모델링",
    images: [
      "/images/portfolio/duncheon-church-1.jpg",
      "/images/portfolio/duncheon-church-2.jpg",
      "/images/portfolio/duncheon-church-3.jpg",
    ],
  },
  {
    title: "김포 상가주택 신축",
    type: "신축",
    images: [
      "/images/portfolio/gimpo-commercial-1.jpg",
      "/images/portfolio/gimpo-commercial-2.jpg",
      "/images/portfolio/gimpo-commercial-3.jpg",
      "/images/portfolio/gimpo-commercial-4.jpg",
    ],
  },
  {
    title: "화곡동 pc방 뉴모델링",
    type: "리모델링",
    images: [
      "/images/portfolio/hwagok-pcroom-1.jpg",
      "/images/portfolio/hwagok-pcroom-2.jpg",
      "/images/portfolio/hwagok-pcroom-3.jpg",
    ],
  },
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
  constructionType: "",
  area: "",
  postalCode: "",
  roadAddress: "",
  detailAddress: "",
  budget: "",
  message: "",
} as const;
