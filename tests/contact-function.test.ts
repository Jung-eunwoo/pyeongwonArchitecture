import { beforeEach, describe, expect, it, vi } from "vitest";
import type { HandlerEvent } from "@netlify/functions";

const send = vi.hoisted(() => vi.fn());
vi.mock("@emailjs/nodejs", () => ({ default: { send } }));
// 운영에서는 폼이 꺼져 있을 수 있으므로 테스트에서는 켠다
vi.mock("../src/constants/features", () => ({ FEATURES: { inquiryForm: true } }));

const { handler } = await import("../netlify/functions/contact");

const body = {
  customer_name: "홍길동",
  customer_phone: "01012345678",
  customer_email: "hong@example.com",
  construction_type: "증축",
  area: "10-20",
  budget: "",
  message: "안녕하세요",
  privacy_agreed: true,
  company_website: "",
  elapsed_ms: 10_000,
};

const call = (patch: Partial<HandlerEvent> & { headers?: Record<string, string> } = {}) =>
  handler(
    {
      httpMethod: "POST",
      body: JSON.stringify(body),
      ...patch,
      headers: {
        host: "example.com",
        origin: "https://example.com",
        "content-type": "application/json",
        ...patch.headers,
      },
    } as HandlerEvent,
    {} as never
  ) as Promise<{ statusCode: number; body: string }>;

beforeEach(() => {
  send.mockReset().mockResolvedValue({ status: 200 });
  Object.assign(process.env, {
    EMAILJS_SERVICE_ID: "svc",
    EMAILJS_TEMPLATE_ID: "tpl",
    EMAILJS_CUSTOMER_TEMPLATE_ID: "tpl-customer",
    EMAILJS_PUBLIC_KEY: "pub",
    EMAILJS_PRIVATE_KEY: "priv",
  });
});

describe("contact function", () => {
  it("정상 요청이면 회사·고객 메일을 보낸다", async () => {
    const res = await call();
    expect(res.statusCode).toBe(200);
    expect(send).toHaveBeenCalledTimes(2);

    const [, companyTpl, companyParams] = send.mock.calls[0]!;
    expect(companyTpl).toBe("tpl");
    expect(companyParams).toMatchObject({
      customer_name: "홍길동",
      customer_phone: "010-1234-5678",
      construction_type: "증축 (기존 건물 확장)",
      area: "10평 ~ 20평",
      budget: "미정",
      full_address: "미입력",
    });
    expect(companyParams.reply_mailto).toBe(
      `mailto:hong@example.com?subject=${encodeURIComponent("[회신] 홍길동 님 견적문의 관련")}`
    );

    // 고객 확인 메일에는 자유 입력값(이름·문의 내용)을 넣지 않는다
    const [, customerTpl, customerParams] = send.mock.calls[1]!;
    expect(customerTpl).toBe("tpl-customer");
    expect(Object.keys(customerParams).sort()).toEqual(
      ["construction_type", "customer_email", "inquiry_date"].sort()
    );
  });

  it("POST가 아니면 405", async () => {
    expect((await call({ httpMethod: "GET" })).statusCode).toBe(405);
  });

  it("Origin이 없거나 다르면 403", async () => {
    expect((await call({ headers: { origin: "" } })).statusCode).toBe(403);
    expect((await call({ headers: { origin: "https://evil.com" } })).statusCode).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("JSON이 아니면 415", async () => {
    const res = await call({ headers: { "content-type": "text/plain" } });
    expect(res.statusCode).toBe(415);
  });

  it("본문이 너무 크면 413", async () => {
    const res = await call({ body: JSON.stringify({ ...body, message: "가".repeat(6000) }) });
    expect(res.statusCode).toBe(413);
  });

  it("JSON 파싱 실패는 400", async () => {
    expect((await call({ body: "{" })).statusCode).toBe(400);
  });

  it("검증 실패는 400과 사유", async () => {
    const res = await call({ body: JSON.stringify({ ...body, customer_email: "a@b.co?cc=x" }) });
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/이메일/);
  });

  it("봇은 성공처럼 응답하고 메일은 보내지 않는다", async () => {
    const res = await call({ body: JSON.stringify({ ...body, company_website: "spam" }) });
    expect(res.statusCode).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("환경변수가 없으면 500", async () => {
    delete process.env.EMAILJS_PRIVATE_KEY;
    const res = await call();
    expect(res.statusCode).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });

  it("회사 메일 실패는 502", async () => {
    send.mockRejectedValueOnce({ status: 400, text: "bad" });
    expect((await call()).statusCode).toBe(502);
  });

  it("고객 메일만 실패하면 접수 완료(200)로 응답한다", async () => {
    send.mockResolvedValueOnce({ status: 200 }).mockRejectedValueOnce({ status: 400 });
    expect((await call()).statusCode).toBe(200);
  });
});
