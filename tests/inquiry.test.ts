import { describe, expect, it } from "vitest";
import {
  AREA_OPTIONS,
  labelOf,
  MIN_FILL_TIME_MS,
  validateInquiry,
} from "../src/shared/inquiry";

const valid = {
  customer_name: "홍길동",
  customer_phone: "010-1234-5678",
  customer_email: "hong@example.com",
  construction_type: "신축",
  construction_date: "2026-12-01",
  area: "20-30",
  budget: "1억-5억",
  postal_code: "14662",
  road_address: "경기 부천시 원미구 부흥로 442",
  detail_address: "1층",
  message: "견적 부탁드립니다.\r\n감사합니다.",
  privacy_agreed: true,
  company_website: "",
  elapsed_ms: MIN_FILL_TIME_MS + 1000,
};

const errorOf = (patch: Record<string, unknown>) => {
  const result = validateInquiry({ ...valid, ...patch });
  return !result.ok && !result.bot ? result.message : null;
};

describe("validateInquiry", () => {
  it("정상 입력을 통과시키고 값을 정리한다", () => {
    const result = validateInquiry(valid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.phone).toBe("010-1234-5678");
    expect(result.data.message).toBe("견적 부탁드립니다.\n감사합니다.");
  });

  it("객체가 아닌 요청은 거부한다", () => {
    expect(validateInquiry(null)).toMatchObject({ ok: false, bot: false });
    expect(validateInquiry("x")).toMatchObject({ ok: false, bot: false });
  });

  describe("봇 판정", () => {
    it("honeypot 값이 있으면 봇", () => {
      expect(validateInquiry({ ...valid, company_website: "x" })).toEqual({
        ok: false,
        bot: true,
      });
    });
    it("너무 빨리 제출하거나 시간이 없으면 봇", () => {
      expect(validateInquiry({ ...valid, elapsed_ms: 100 })).toEqual({
        ok: false,
        bot: true,
      });
      expect(validateInquiry({ ...valid, elapsed_ms: undefined })).toEqual({
        ok: false,
        bot: true,
      });
    });
  });

  it("개인정보 동의가 없으면 거부", () => {
    expect(errorOf({ privacy_agreed: false })).toMatch(/동의/);
    expect(errorOf({ privacy_agreed: "true" })).toMatch(/동의/);
  });

  describe("이메일", () => {
    it.each([
      "a@b.co?cc=evil@x.com",
      "a@b.co&subject=x",
      "a%0A@b.co",
      "a,b@b.co",
      "a@b",
      "a@b.c",
      "a b@b.co",
    ])("mailto에 섞일 수 있는 값 거부: %s", (email) => {
      expect(errorOf({ customer_email: email })).toMatch(/이메일/);
    });
    it("일반 주소·국제화 도메인(punycode)은 통과", () => {
      expect(
        errorOf({ customer_email: "first.last+tag@mail.co.kr" })
      ).toBeNull();
      expect(
        errorOf({ customer_email: "hong@example.xn--3e0b707e" })
      ).toBeNull();
    });
  });

  describe("연락처", () => {
    it.each(["02-123-4567", "032-205-5707", "1588-1234", "0505-123-4567"])(
      "통과: %s",
      (phone) => {
        expect(errorOf({ customer_phone: phone })).toBeNull();
      }
    );
    it.each(["010-1234-56789", "1234", "010-12-345"])("거부: %s", (phone) => {
      expect(errorOf({ customer_phone: phone })).toMatch(/연락처/);
    });
  });

  describe("제어문자", () => {
    it("한 줄 입력에 줄바꿈·Bidi 문자가 있으면 거부", () => {
      expect(errorOf({ customer_name: "홍\n길동" })).toMatch(/사용할 수 없는/);
      expect(errorOf({ detail_address: "1층‮" })).toMatch(/사용할 수 없는/);
    });
    it("문의 내용은 줄바꿈만 허용", () => {
      expect(errorOf({ message: "첫 줄\n둘째 줄" })).toBeNull();
      expect(errorOf({ message: "탭\t문자" })).toMatch(/사용할 수 없는/);
      expect(errorOf({ message: "숨김​문자" })).toMatch(/사용할 수 없는/);
    });
    it("문의 내용의 이모지 조합(ZWJ)은 허용", () => {
      expect(errorOf({ message: "부탁드립니다🙇‍♂️" })).toBeNull();
      expect(errorOf({ customer_name: "홍‍길동" })).toMatch(/사용할 수 없는/);
    });
    it("어느 항목에 문제가 있는지 알려준다", () => {
      expect(errorOf({ detail_address: "1층​" })).toMatch(/^상세주소에/);
      expect(errorOf({ message: "탭\t문자" })).toMatch(/^문의 내용에/);
    });
  });

  it("존재하지 않는 날짜는 거부", () => {
    expect(errorOf({ construction_date: "2026-13-01" })).toMatch(/예정일/);
    expect(errorOf({ construction_date: "2026-02-30" })).toMatch(/예정일/);
    expect(errorOf({ construction_date: "2028-02-29" })).toBeNull();
    expect(errorOf({ construction_date: "" })).toBeNull();
  });

  it("선택지에 없는 값은 거부", () => {
    expect(errorOf({ construction_type: "철거" })).toMatch(/공사 구분/);
    expect(errorOf({ area: "1000" })).toMatch(/평형/);
    expect(errorOf({ budget: "free" })).toMatch(/예상 금액/);
  });

  it("길이 제한을 넘으면 거부", () => {
    expect(errorOf({ customer_name: "가".repeat(51) })).toMatch(/이름/);
    expect(errorOf({ message: "가".repeat(2001) })).toMatch(/2000자/);
    expect(errorOf({ road_address: "가".repeat(201) })).toMatch(/주소/);
  });
});

describe("labelOf", () => {
  it("값을 라벨로 바꾸고, 없으면 값을 그대로 돌려준다", () => {
    expect(labelOf(AREA_OPTIONS, "10-20")).toBe("10평 ~ 20평");
    expect(labelOf(AREA_OPTIONS, "??")).toBe("??");
  });
});
