import { globalIgnores } from "eslint/config";
import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

// 서식은 Prettier가 담당하고, ESLint는 코드 품질 규칙만 검사한다
export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,vue}"],
  },
  globalIgnores(["**/dist/**", "**/coverage/**", "**/.netlify/**"]),
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  {
    name: "app/rules",
    rules: {
      // 레이아웃의 Header·Footer는 페이지에 하나뿐이라 한 단어 이름을 허용
      "vue/multi-word-component-names": [
        "error",
        { ignores: ["Header", "Footer"] },
      ],
    },
  },
  skipFormatting
);
