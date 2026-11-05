<template>
  <!-- 전화 문의 안내 (폼 비활성화 시, 또는 폼을 불러오지 못했을 때) -->
  <div
    class="bg-white rounded-lg shadow-md px-6 py-10 mb-12 text-center fade-in-up-delay"
    v-reveal
  >
    <Phone class="mx-auto mb-4 h-12 w-12 text-brand" />
    <p class="mb-2 text-lg font-semibold text-gray-900">
      견적 문의는 전화로 받고 있습니다
    </p>
    <p class="mb-6 text-gray-600">
      공사 내용을 말씀해 주시면 상담 후 견적을 안내해 드립니다.
    </p>
    <a
      :href="CONTACT_LINKS.tel"
      class="inline-flex items-center gap-2 rounded-lg border border-transparent bg-brand px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-brand-dark"
    >
      <Phone class="h-5 w-5" />
      {{ COMPANY_INFO.phone }}
    </a>
    <!-- 항목 단위로만 줄바꿈 ("일요일 / 휴무"처럼 끊기지 않게) -->
    <p class="mt-4 text-sm text-gray-500">
      <span class="whitespace-nowrap">{{ COMPANY_INFO.businessHours.weekday }}</span>
      ·
      <span class="whitespace-nowrap">{{ COMPANY_INFO.businessHours.saturday }}</span>
      ·
      <span class="whitespace-nowrap">{{ COMPANY_INFO.businessHours.sunday }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Phone } from "lucide-vue-next";
import { COMPANY_INFO, CONTACT_LINKS } from "@/constants/company-info";
</script>
