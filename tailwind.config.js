/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Pretendard 폰트 설정
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
      },
      // 한국어 텍스트 처리를 위한 추가 설정
      typography: {
        DEFAULT: {
          css: {
            "word-break": "keep-all",
            "word-wrap": "break-word",
            "overflow-wrap": "break-word",
          },
        },
      },
    },
  },
  plugins: [],
};
