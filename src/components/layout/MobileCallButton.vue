<template>
  <!-- 모바일 전용 하단 고정 전화 상담 버튼 -->
  <a
    :href="CONTACT_LINKS.tel"
    class="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-full bg-brand py-3 font-semibold text-white shadow-lg md:hidden"
    :aria-label="`전화 상담 ${COMPANY_INFO.phone}`"
  >
    <Phone class="h-5 w-5" />
    전화 상담 {{ COMPANY_INFO.phone }}
  </a>
</template>

<script setup lang="ts">
import { Phone } from "lucide-vue-next";
import { COMPANY_INFO, CONTACT_LINKS } from "@/constants/company-info";
</script>
