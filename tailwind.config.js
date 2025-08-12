/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
