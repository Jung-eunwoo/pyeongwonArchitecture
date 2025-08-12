import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import emailjs from "@emailjs/nodejs";

interface ContactFormData {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  construction_date: string;
  construction_type: string;
  area: string;
  budget: string;
  postal_code: string;
  road_address: string;
  detail_address: string;
  full_address: string;
  message: string;
  inquiry_date: string;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS 헤더 설정
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // POST 요청만 허용
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // 환경 변수에서 EmailJS 설정 가져오기 (VITE_ 접두사 fallback)
    const serviceId = (process.env.EMAILJS_SERVICE_ID ||
      process.env.VITE_EMAILJS_SERVICE_ID) as string | undefined;
    const templateId = (process.env.EMAILJS_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_ID) as string | undefined;
    const customerTemplateId = (process.env.EMAILJS_CUSTOMER_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID) as string | undefined;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY as string | undefined;
    const publicKey = (process.env.EMAILJS_PUBLIC_KEY ||
      process.env.VITE_EMAILJS_PUBLIC_KEY) as string | undefined;

    const missing: string[] = [];
    if (!serviceId) missing.push("EMAILJS_SERVICE_ID");
    if (!templateId) missing.push("EMAILJS_TEMPLATE_ID");
    if (!customerTemplateId) missing.push("EMAILJS_CUSTOMER_TEMPLATE_ID");
    if (!publicKey) missing.push("EMAILJS_PUBLIC_KEY");
    if (!privateKey) missing.push("EMAILJS_PRIVATE_KEY");

    if (missing.length) {
      console.error("Missing EmailJS configuration keys:", missing);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server configuration error",
          details: "EmailJS configuration is incomplete",
          missing,
          hint: "Netlify 환경변수에 위 키들을 정확히 추가하세요. PRIVATE_KEY 는 EmailJS Dashboard Account에서 확인.",
        }),
      };
    }

    // 요청 본문 파싱
    const formData: ContactFormData = JSON.parse(event.body || "{}");

    // 필수 필드 검증
    if (
      !formData.customer_name ||
      !formData.customer_phone ||
      !formData.customer_email ||
      !formData.construction_type
    ) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing required fields",
          required: [
            "customer_name",
            "customer_phone",
            "customer_email",
            "construction_type",
          ],
        }),
      };
    }

    // 템플릿 파라미터 준비
    const templateParams = {
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_email: formData.customer_email,
      construction_date: formData.construction_date || "미정",
      construction_type: formData.construction_type,
      area: formData.area || "미정",
      budget: formData.budget || "미정",
      postal_code: formData.postal_code || "",
      road_address: formData.road_address || "",
      detail_address: formData.detail_address || "",
      full_address: formData.full_address || "미입력",
      message: formData.message || "특별한 요청사항 없음",
      inquiry_date: formData.inquiry_date,
    };

    // 추가: 환경 설정 요약 로그 (민감정보 직접 출력 금지)
    console.log("[contact] EmailJS config summary", {
      serviceId,
      templateId,
      customerTemplateId,
      publicKeyLen: publicKey?.length,
      privateKeyLen: privateKey?.length,
      privateKeyHead: privateKey ? privateKey.slice(0, 4) + "***" : undefined,
    });

    // 이메일 전송 실행 (각 단계 분리)
    try {
      const startTs = Date.now();
      console.log("[contact] Sending company email...");
      const companyRes = await emailjs.send(
        serviceId!,
        templateId!,
        templateParams,
        {
          publicKey: publicKey!,
          privateKey: privateKey!,
        }
      );
      console.log(
        "[contact] Company email result",
        safeResult(companyRes),
        `elapsed=${Date.now() - startTs}ms`
      );

      console.log("[contact] Sending customer confirmation email...");
      const customerStart = Date.now();
      const customerRes = await emailjs.send(
        serviceId!,
        customerTemplateId!,
        templateParams,
        { publicKey: publicKey!, privateKey: privateKey! }
      );
      console.log(
        "[contact] Customer email result",
        safeResult(customerRes),
        `elapsed=${Date.now() - customerStart}ms`
      );
      console.log(
        "[contact] Emails sent successfully for",
        formData.customer_name
      );
    } catch (emailError: any) {
      const diag = enrichEmailError(emailError);
      console.error("[contact] EmailJS error detail", diag);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Email delivery failed",
          reason: diag.message || "Unknown EmailJS error",
          which: diag.phase,
          status: diag.status,
          text: diag.text,
          rawType: diag.rawType,
          suggestion:
            "서비스/템플릿/키 값 및 Private Key, 템플릿 연결 여부, customer 템플릿 ID 확인",
          debugId: diag.debugId,
        }),
      };
    }

    // 성공 응답
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "견적 문의가 성공적으로 전송되었습니다.",
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    // 에러 응답
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send contact form",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

// 안전하게 EmailJS 응답 로깅 형태 축약
function safeResult(res: any) {
  if (!res) return res;
  try {
    const { status, text } = res as any;
    return { status, text };
  } catch {
    return { type: typeof res };
  }
}

// 에러 세부 정보 추출
function enrichEmailError(err: any) {
  const debugId =
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const base: any = {
    debugId,
    phase: inferPhaseFromStack(err?.stack),
    status: err?.status || err?.response?.status,
    text: err?.text || err?.response?.text,
    message: err?.message,
    rawType: Object.prototype.toString.call(err),
  };
  // message가 없고 객체면 직렬화 시도
  if (!base.message) {
    try {
      base.message = JSON.stringify(err).slice(0, 300);
    } catch {}
  }
  return base;
}

function inferPhaseFromStack(stack?: string) {
  if (!stack) return undefined;
  if (stack.includes("customer")) return "customerTemplate";
  return "companyTemplate"; // 대략적 추정
}

export { handler };
