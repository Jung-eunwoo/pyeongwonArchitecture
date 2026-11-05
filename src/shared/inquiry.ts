// 견적 문의: 클라이언트(선택지 렌더링)와 서버리스 함수(검증)가 함께 쓰는 정의
import { formatPhoneNumber } from "../utils/phone";

export const CONSTRUCTION_TYPES = [
  { value: "신축", label: "신축 (새로운 건물 건설)" },
  { value: "증축", label: "증축 (기존 건물 확장)" },
  { value: "외관리모델링", label: "외관 리모델링 (외부 개보수)" },
  { value: "내부리모델링", label: "내부 리모델링 (인테리어)" },
  { value: "전체리모델링", label: "전체 리모델링 (내외부 전면 개보수)" },
  { value: "구조변경", label: "구조 변경 및 보강" },
  { value: "기타", label: "기타 (상담 시 문의)" },
] as const;

export const AREA_OPTIONS = [
  { value: "10-20", label: "10평 ~ 20평" },
  { value: "20-30", label: "20평 ~ 30평" },
  { value: "30-40", label: "30평 ~ 40평" },
  { value: "40-50", label: "40평 ~ 50평" },
  { value: "50+", label: "50평 이상" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "1000-3000", label: "1,000만원 ~ 3,000만원" },
  { value: "3000-5000", label: "3,000만원 ~ 5,000만원" },
  { value: "5000-1억", label: "5,000만원 ~ 1억원" },
  { value: "1억-5억", label: "1억원 ~ 5억원" },
  { value: "5억-10억", label: "5억원 ~ 10억원" },
  { value: "10억+", label: "10억원 이상" },
] as const;

export const INQUIRY_LIMITS = {
  name: 50,
  email: 254,
  address: 200,
  message: 2000,
} as const;

/** 폼이 열린 뒤 이 시간 안에 제출되면 봇으로 간주 */
export const MIN_FILL_TIME_MS = 3000;

/** 클라이언트 → 서버 요청 본문 */
export interface InquiryRequest {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  construction_type: string;
  construction_date?: string;
  area?: string;
  budget?: string;
  postal_code?: string;
  road_address?: string;
  detail_address?: string;
  message?: string;
  /** 개인정보 수집·이용 동의 (#1의 동의 체크박스에서 전송) */
  privacy_agreed?: boolean;
  /** honeypot: 사람에게는 보이지 않는 필드. 값이 있으면 봇 */
  company_website?: string;
  /** 폼 노출 후 제출까지 걸린 시간(ms) */
  elapsed_ms?: number;
}

export interface InquiryData {
  name: string;
  phone: string;
  email: string;
  constructionType: string;
  constructionDate: string;
  area: string;
  budget: string;
  postalCode: string;
  roadAddress: string;
  detailAddress: string;
  message: string;
}

export type InquiryValidationResult =
  | { ok: true; data: InquiryData }
  | { ok: false; bot: true }
  | { ok: false; bot: false; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(0\d{1,2}-\d{3,4}-\d{4}|1[5-9]\d{2}-\d{4})$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const POSTAL_RE = /^\d{5}$/;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const isOneOf = (v: string, options: readonly { value: string }[]) =>
  options.some((o) => o.value === v);

export function validateInquiry(input: unknown): InquiryValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, bot: false, message: "잘못된 요청입니다." };
  }
  const body = input as Record<string, unknown>;

  // 봇 판정은 사유를 알려주지 않는다
  if (str(body.company_website)) return { ok: false, bot: true };
  if (typeof body.elapsed_ms !== "number" || body.elapsed_ms < MIN_FILL_TIME_MS) {
    return { ok: false, bot: true };
  }

  const fail = (message: string): InquiryValidationResult => ({
    ok: false,
    bot: false,
    message,
  });

  if (body.privacy_agreed !== true) {
    return fail("개인정보 수집·이용에 동의해주세요.");
  }

  const name = str(body.customer_name);
  const phone = formatPhoneNumber(str(body.customer_phone));
  const email = str(body.customer_email);
  const constructionType = str(body.construction_type);
  const constructionDate = str(body.construction_date);
  const area = str(body.area);
  const budget = str(body.budget);
  const postalCode = str(body.postal_code);
  const roadAddress = str(body.road_address);
  const detailAddress = str(body.detail_address);
  const message = str(body.message);

  if (!name || name.length > INQUIRY_LIMITS.name) {
    return fail("이름을 확인해주세요.");
  }
  if (!PHONE_RE.test(phone)) return fail("연락처 형식을 확인해주세요.");
  if (email.length > INQUIRY_LIMITS.email || !EMAIL_RE.test(email)) {
    return fail("이메일 형식을 확인해주세요.");
  }
  if (!isOneOf(constructionType, CONSTRUCTION_TYPES)) {
    return fail("공사 구분을 선택해주세요.");
  }
  if (constructionDate && !DATE_RE.test(constructionDate)) {
    return fail("공사 예정일을 확인해주세요.");
  }
  if (area && !isOneOf(area, AREA_OPTIONS)) return fail("평형을 확인해주세요.");
  if (budget && !isOneOf(budget, BUDGET_OPTIONS)) {
    return fail("예상 금액을 확인해주세요.");
  }
  if (postalCode && !POSTAL_RE.test(postalCode)) {
    return fail("우편번호를 확인해주세요.");
  }
  if (
    roadAddress.length > INQUIRY_LIMITS.address ||
    detailAddress.length > INQUIRY_LIMITS.address
  ) {
    return fail("주소가 너무 깁니다.");
  }
  if (message.length > INQUIRY_LIMITS.message) {
    return fail(`문의 내용은 ${INQUIRY_LIMITS.message}자 이내로 입력해주세요.`);
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      constructionType,
      constructionDate,
      area,
      budget,
      postalCode,
      roadAddress,
      detailAddress,
      message,
    },
  };
}
