// 카카오(다음) 우편번호 서비스: 검색 버튼을 처음 누를 때만 스크립트를 불러온다.
const POSTCODE_SCRIPT_SRC =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export interface DaumPostcodeData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  buildingName: string;
  apartment: string;
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
  width?: string;
  height?: string;
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: DaumPostcodeOptions) => {
        open: () => void;
        embed: (element: HTMLElement) => void;
      };
    };
  }
}

let loadingPromise: Promise<void> | null = null;

function loadPostcodeScript(): Promise<void> {
  if (window.daum?.Postcode) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = POSTCODE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadingPromise = null; // 다음 클릭 때 재시도할 수 있게
      script.remove();
      reject(new Error("우편번호 서비스를 불러오지 못했습니다."));
    };
    document.head.appendChild(script);
  });

  return loadingPromise;
}

export async function openPostcodeSearch(
  oncomplete: (data: DaumPostcodeData) => void
): Promise<void> {
  await loadPostcodeScript();
  if (!window.daum?.Postcode) {
    throw new Error("우편번호 서비스를 불러오지 못했습니다.");
  }
  new window.daum.Postcode({ oncomplete, width: "100%", height: "400px" }).open();
}
