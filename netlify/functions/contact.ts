import type { Handler, HandlerEvent } from "@netlify/functions";
import emailjs from "@emailjs/nodejs";
import { FEATURES } from "../../src/constants/features";
import {
  AREA_OPTIONS,
  BUDGET_OPTIONS,
  CONSTRUCTION_TYPES,
  labelOf,
  validateInquiry,
  type InquiryData,
} from "../../src/shared/inquiry";

/** 요청 본문 최대 크기 (정상 문의는 수 KB) */
const MAX_BODY_BYTES = 16 * 1024;

// 같은 사이트에서만 호출하므로 CORS 헤더는 두지 않는다 (브라우저가 교차 출처 호출을 막음)
const JSON_HEADERS = { "Content-Type": "application/json" };

const respond = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: JSON_HEADERS,
  body: JSON.stringify(body),
});

const createDebugId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/**
 * Origin이 이 사이트와 같은지 확인한다.
 * 브라우저의 fetch POST는 항상 Origin을 보내므로, Origin이 없는 요청(curl 등 스크립트)은 거부한다.
 */
function isSameOrigin(event: HandlerEvent): boolean {
  const origin = event.headers.origin;
  const host = event.headers.host;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getEmailConfig() {
  // VITE_ 접두사는 기존 Netlify 환경변수 호환용 fallback
  const env = process.env;
  const config = {
    serviceId: env.EMAILJS_SERVICE_ID || env.VITE_EMAILJS_SERVICE_ID,
    templateId: env.EMAILJS_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID,
    customerTemplateId:
      env.EMAILJS_CUSTOMER_TEMPLATE_ID || env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
    publicKey: env.EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_PUBLIC_KEY,
    privateKey: env.EMAILJS_PRIVATE_KEY,
  };
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  return { config: config as Record<keyof typeof config, string>, missing };
}

/** 회사 수신 메일의 "회신" 버튼 링크: 값은 서버에서 URL 인코딩해 템플릿에 넘긴다 */
function buildReplyMailto(data: InquiryData): string {
  const subject = `[회신] ${data.name} 님 견적문의 관련`;
  return `mailto:${data.email}?subject=${encodeURIComponent(subject)}`;
}

/** 회사 수신 메일용 (문의 전체 내용) */
function toTemplateParams(data: InquiryData) {
  const fullAddress = [
    data.postalCode && `(${data.postalCode})`,
    data.roadAddress,
    data.detailAddress,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    customer_name: data.name,
    customer_phone: data.phone,
    customer_email: data.email,
    reply_mailto: buildReplyMailto(data),
    construction_type: labelOf(CONSTRUCTION_TYPES, data.constructionType),
    construction_date: data.constructionDate || "미정",
    area: data.area ? labelOf(AREA_OPTIONS, data.area) : "미정",
    budget: data.budget ? labelOf(BUDGET_OPTIONS, data.budget) : "미정",
    postal_code: data.postalCode,
    road_address: data.roadAddress,
    detail_address: data.detailAddress,
    full_address: fullAddress || "미입력",
    message: data.message || "특별한 요청사항 없음",
    // 접수 시각은 서버 기준(KST)으로 기록
    inquiry_date: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      dateStyle: "long",
      timeStyle: "short",
    }),
  };
}

/**
 * 고객 확인 메일용: 사용자가 자유롭게 입력한 값(이름·문의 내용 등)은 넘기지 않는다.
 * 확인 메일은 입력된 아무 주소로나 발송되므로, 자유 입력값이 들어가면 회사 명의로 임의 문구를 보내는
 * 스팸·피싱 통로가 된다. 받는 주소와 선택지 값·접수 시각만 넘긴다.
 */
function toCustomerTemplateParams(params: ReturnType<typeof toTemplateParams>) {
  return {
    customer_email: params.customer_email,
    construction_type: params.construction_type,
    inquiry_date: params.inquiry_date,
  };
}

const handler: Handler = async (event) => {
  // 폼 문의 비활성화 중에는 직접 호출도 받지 않음 (스팸 메일 발송 방지)
  if (!FEATURES.inquiryForm) {
    return respond(503, { error: "현재 온라인 문의를 받지 않습니다." });
  }

  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method not allowed" });
  }

  if (!isSameOrigin(event)) {
    // 화면에 그대로 표시되므로 한국어로 응답
    return respond(403, { error: "잘못된 요청입니다." });
  }

  const contentType = event.headers["content-type"] ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return respond(415, { error: "잘못된 요청입니다." });
  }

  if (Buffer.byteLength(event.body ?? "", "utf8") > MAX_BODY_BYTES) {
    return respond(413, { error: "요청이 너무 큽니다." });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body ?? "");
  } catch {
    return respond(400, { error: "잘못된 요청입니다." });
  }

  const result = validateInquiry(payload);
  if (!result.ok) {
    // 봇에게는 성공처럼 보이게 응답하고 메일은 보내지 않는다
    if (result.bot) {
      console.warn("[contact] bot submission dropped");
      return respond(200, { success: true });
    }
    return respond(400, { error: result.message });
  }

  const { config, missing } = getEmailConfig();
  if (missing.length) {
    const debugId = createDebugId();
    console.error("[contact] missing EmailJS config", { debugId, missing });
    return respond(500, {
      error: "일시적인 오류로 접수하지 못했습니다.",
      debugId,
    });
  }

  const templateParams = toTemplateParams(result.data);
  const keys = { publicKey: config.publicKey, privateKey: config.privateKey };

  let phase: "company" | "customer" = "company";
  try {
    await emailjs.send(config.serviceId, config.templateId, templateParams, keys);
    phase = "customer";
    await emailjs.send(
      config.serviceId,
      config.customerTemplateId,
      toCustomerTemplateParams(templateParams),
      keys
    );
  } catch (error: unknown) {
    const debugId = createDebugId();
    const err = error as { status?: number; text?: string; message?: string };
    // 고객 정보(이름·연락처 등)와 키 값은 로그에 남기지 않는다
    console.error("[contact] EmailJS send failed", {
      debugId,
      phase,
      status: err?.status,
      text: err?.text ?? err?.message,
    });
    // 회사 메일은 이미 발송됨 → 접수는 완료된 것이므로 실패로 응답하면 재전송으로 중복 접수가 생긴다
    if (phase === "customer") return respond(200, { success: true });
    return respond(502, {
      error: "일시적인 오류로 접수하지 못했습니다.",
      debugId,
    });
  }

  return respond(200, { success: true });
};

export { handler };
