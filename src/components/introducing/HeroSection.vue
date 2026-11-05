<template>
  <!-- Hero Section -->
  <section
    id="home"
    class="pt-20 pb-24 md:pb-16 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <!-- 모바일은 위아래 여백·제목 크기를 줄여 하단 고정 전화 버튼과 겹치지 않게 -->
    <div class="container mx-auto px-4 py-10 md:py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h1
          class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up"
        >
          꿈의 공간을 <span class="text-brand">현실로</span>
        </h1>
        <p
          class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up-delay-1"
        >
          평원건축은 {{ COMPANY_STATS.experienceYears }}년의 경험과 노하우로
          고객의 꿈을 실현하는 전문 건축 및 인테리어 회사입니다.
          <br />
          주거공간부터 상업공간까지, 완벽한 설계와 시공으로 만족을 드립니다.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2"
        >
          <!-- 폼을 받지 않는 동안에는 바로 전화가 걸리게 -->
          <a
            v-if="!FEATURES.inquiryForm"
            :href="CONTACT_LINKS.tel"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-medium rounded-lg border border-transparent hover:bg-brand-dark transition-colors bg-brand"
          >
            <Phone class="h-5 w-5" />
            전화로 무료 견적 받기
            <!-- PC에서는 tel: 링크가 동작하지 않을 수 있어 번호를 함께 보여 준다 -->
            <span class="hidden md:inline">· {{ COMPANY_INFO.phone }}</span>
          </a>
          <button
            v-else
            type="button"
            class="px-8 py-3 text-white font-medium rounded-lg border border-transparent hover:bg-brand-dark transition-colors bg-brand"
            @click="scrollToSection('contact')"
          >
            무료 견적 받기
          </button>
          <button
            type="button"
            class="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            @click="scrollToSection('portfolio')"
          >
            포트폴리오 보기
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Phone } from "@lucide/vue";
import {
  COMPANY_INFO,
  COMPANY_STATS,
  CONTACT_LINKS,
} from "@/constants/company-info";
import { FEATURES } from "@/constants/features";

interface Emits {
  (e: "scroll-to", sectionId: string): void;
}

const emit = defineEmits<Emits>();

const scrollToSection = (sectionId: string) => {
  emit("scroll-to", sectionId);
};
</script>
