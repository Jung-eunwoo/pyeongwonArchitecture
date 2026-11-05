import type { Handler, HandlerEvent } from "@netlify/functions";
import emailjs from "@emailjs/nodejs";
import { validateInquiry, type InquiryData } from "../../src/shared/inquiry";

// 같은 사이트에서만 호출하므로 CORS 헤더는 두지 않는다 (브라우저가 교차 출처 호출을 막음)
const JSON_HEADERS = { "Content-Type": "application/json" };

const respond = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: JSON_HEADERS,
  body: JSON.stringify(body),
});

const createDebugId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/** Origin 헤더가 있으면 Host와 같은지 확인 (다른 사이트에서의 호출 차단) */
function isSameOrigin(event: HandlerEvent): boolean {
  const origin = event.headers.origin;
  const host = event.headers.host;
  if (!origin || !host) return true; // 서버 간 호출 등 Origin이 없는 경우는 아래 검증에 맡김
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
    construction_type: data.constructionType,
    construction_date: data.constructionDate || "미정",
    area: data.area || "미정",
    budget: data.budget || "미정",
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

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method not allowed" });
  }

  if (!isSameOrigin(event)) {
    return respond(403, { error: "Forbidden" });
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
      templateParams,
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
    return respond(502, {
      error: "일시적인 오류로 접수하지 못했습니다.",
      debugId,
    });
  }

  return respond(200, { success: true });
};

export { handler };
