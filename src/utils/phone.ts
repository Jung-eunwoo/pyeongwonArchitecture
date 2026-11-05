/**
 * 입력 중인 전화번호에 하이픈을 넣는다.
 * - 02 지역번호: 02-XXX-XXXX / 02-XXXX-XXXX
 * - 15XX/16XX/18XX 대표번호: 1588-XXXX
 * - 그 외(010, 031 등): 0XX-XXX-XXXX / 0XX-XXXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  if (/^1[5-9]/.test(digits)) {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
  }

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
