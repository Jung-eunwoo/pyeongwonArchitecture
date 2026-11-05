// 평원건축 회사 정보 상수
export const COMPANY_INFO = {
  // 회사명
  name: "평원건축",
  fullName: "평원건축 주식회사",

  // 연락처 정보
  phone: "032-205-5707",
  fax: "032-205-5708",

  // 이메일
  email: "pw83437@naver.com",

  // 주소 정보
  address: {
    postalCode: "14662",
    roadAddress: "부천시 원미구 부흥로 442",
    detailAddress: "1층",
    fullAddress: "부천시 원미구 부흥로 442, 1층",
  },

  // 영업시간
  businessHours: {
    weekday: "평일 09:00 ~ 18:00",
    saturday: "토요일 09:00 ~ 15:00",
    sunday: "일요일 휴무",
  },

  // 사업자 정보
  business: {
    registrationNumber: "130-44-83437",
  },

  // 실적 (화면의 "N년 경험" 문구는 모두 experienceYears 하나만 참조)
  performance: {
    completedProjects: 500,
    experienceYears: 40,
  },

  website: "https://pyeongwon-architecture.netlify.app",
} as const;

// 링크용 값 (tel:, mailto:, 지도)
export const CONTACT_LINKS = {
  tel: `tel:${COMPANY_INFO.phone.replace(/-/g, "")}`,
  mailto: `mailto:${COMPANY_INFO.email}`,
  // 네이버 지도 업체 페이지 (주소 검색 대신 정확한 업체 위치)
  map: "https://naver.me/Gy3TOM0N",
} as const;

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
      "/images/portfolio/sunchang-hanok-1.webp",
      "/images/portfolio/sunchang-hanok-2.webp",
      "/images/portfolio/sunchang-hanok-3.webp",
    ],
  },
  {
    title: "부천옥길동신축공사",
    type: "신축공사",
    images: [
      "/images/portfolio/bucheon-okgil-1.webp",
      "/images/portfolio/bucheon-okgil-2.webp",
      "/images/portfolio/bucheon-okgil-3.webp",
    ],
  },
  {
    title: "부천범박동신축공사",
    type: "신축공사",
    images: [
      "/images/portfolio/bucheon-beombak-1.webp",
      "/images/portfolio/bucheon-beombak-2.webp",
      "/images/portfolio/bucheon-beombak-3.webp",
    ],
  },
  {
    title: "둔천동 천우교회 뉴모델링",
    type: "리모델링",
    images: [
      "/images/portfolio/duncheon-church-1.webp",
      "/images/portfolio/duncheon-church-2.webp",
      "/images/portfolio/duncheon-church-3.webp",
    ],
  },
  {
    title: "김포 상가주택 신축",
    type: "신축",
    images: [
      "/images/portfolio/gimpo-commercial-1.webp",
      "/images/portfolio/gimpo-commercial-2.webp",
      "/images/portfolio/gimpo-commercial-3.webp",
      "/images/portfolio/gimpo-commercial-4.webp",
    ],
  },
  {
    title: "화곡동 pc방 뉴모델링",
    type: "리모델링",
    images: [
      "/images/portfolio/hwagok-pcroom-1.webp",
      "/images/portfolio/hwagok-pcroom-2.webp",
      "/images/portfolio/hwagok-pcroom-3.webp",
    ],
  },
] as const;

// 연락처 목록 (UI 표시용)
export const CONTACT_LIST = [
  {
    id: "phone",
    icon: "Phone",
    title: "전화 문의",
    content: COMPANY_INFO.phone,
    subtitle: COMPANY_INFO.businessHours.weekday,
    href: CONTACT_LINKS.tel,
  },
  {
    id: "email",
    icon: "Mail",
    title: "이메일 문의",
    content: COMPANY_INFO.email,
    subtitle: "24시간 접수 가능",
    href: CONTACT_LINKS.mailto,
  },
  {
    id: "location",
    icon: "MapPin",
    title: "오시는 길",
    content: COMPANY_INFO.address.roadAddress,
    subtitle: COMPANY_INFO.address.detailAddress,
    href: CONTACT_LINKS.map,
  },
] as const;

// 개인정보 수집·이용 고지 (개인정보 보호법 제15조, 제22조)
// ※ 보유기간·위탁 내용은 실제 운영 방식에 맞게 확인 후 수정하세요.
export const PRIVACY_POLICY = {
  effectiveDate: "2026-11-05",
  items: {
    required: ["이름", "연락처", "이메일", "공사 구분"],
    optional: ["공사 예정일", "평형", "예상 금액", "공사 예정지 주소", "문의 내용"],
  },
  purpose: "견적 문의 접수, 상담 및 견적 안내를 위한 연락",
  retention: "문의 처리 완료 후 1년간 보관 후 파기",
  // 처리 위탁 (메일 발송 / 웹사이트 호스팅)
  processors: [
    { name: "EmailJS", task: "견적 문의 메일 발송" },
    { name: "Netlify", task: "웹사이트 호스팅 및 문의 접수 서버 운영" },
  ],
} as const;
