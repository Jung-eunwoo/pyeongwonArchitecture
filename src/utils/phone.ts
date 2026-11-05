/**
 * 입력 중인 전화번호에 하이픈을 넣는다.
 * - 02 지역번호: 02-XXX-XXXX / 02-XXXX-XXXX
 * - 15XX/16XX/18XX 대표번호: 1588-XXXX
 * - 050X 안심번호: 0505-XXX-XXXX / 0505-XXXX-XXXX
 * - 그 외(010, 031 등): 0XX-XXX-XXXX / 0XX-XXXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (/^050\d/.test(digits)) return groupDigits(digits, 4, 12);
  if (digits.startsWith("02")) return groupDigits(digits, 2, 10);

  if (/^1[5-9]/.test(digits)) {
    const head = digits.slice(0, 8);
    if (head.length <= 4) return head;
    return `${head.slice(0, 4)}-${head.slice(4)}`;
  }

  return groupDigits(digits, 3, 11);
}

/**
 * 앞자리(head) 뒤를 3자리씩 묶다가, 최대 자릿수(max)가 되면 4-4로 나눈다.
 * 예) head=3, max=11: 010-123-4567 / 010-1234-5678
 */
function groupDigits(value: string, head: number, max: number): string {
  const digits = value.slice(0, max);
  const prefix = digits.slice(0, head);
  if (digits.length <= head) return digits;
  if (digits.length <= head + 3) return `${prefix}-${digits.slice(head)}`;
  const mid = digits.length < max ? 3 : 4;
  return `${prefix}-${digits.slice(head, head + mid)}-${digits.slice(head + mid)}`;
}
