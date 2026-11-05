import { describe, expect, it } from "vitest";
import { formatPhoneNumber } from "../src/utils/phone";

describe("formatPhoneNumber", () => {
  it.each([
    ["01012345678", "010-1234-5678"],
    ["0101234567", "010-123-4567"],
    ["0212345678", "02-1234-5678"],
    ["021234567", "02-123-4567"],
    ["0322055707", "032-205-5707"],
    ["15881234", "1588-1234"],
    ["05051234567", "0505-123-4567"],
    ["050512345678", "0505-1234-5678"],
  ])("%s → %s", (input, expected) => {
    expect(formatPhoneNumber(input)).toBe(expected);
  });

  it("입력 중인 값은 자릿수에 맞춰 하이픈을 넣는다", () => {
    expect(formatPhoneNumber("010")).toBe("010");
    expect(formatPhoneNumber("0101")).toBe("010-1");
    expect(formatPhoneNumber("0505")).toBe("0505");
    expect(formatPhoneNumber("05051")).toBe("0505-1");
  });

  it("숫자 외 문자는 무시하고 초과 자릿수는 자른다", () => {
    expect(formatPhoneNumber("010-1234-5678")).toBe("010-1234-5678");
    expect(formatPhoneNumber("010123456789")).toBe("010-1234-5678");
  });
});
