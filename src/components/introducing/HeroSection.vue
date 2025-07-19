<template>
  <!-- Hero Section -->
  <section
    id="home"
    class="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
          꿈의 공간을 <span :style="{ color: '#d52e38' }">현실로</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up-delay-1">
          평원건축은 30년의 경험과 노하우로 고객의 꿈을 실현하는 전문 건축 및
          인테리어 회사입니다.
          <br />
          주거공간부터 상업공간까지, 완벽한 설계와 시공으로 만족을 드립니다.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
          <button
            @click="scrollToSection('contact')"
            class="px-8 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            :style="{ backgroundColor: '#d52e38' }"
          >
            무료 견적 받기
          </button>
          <button
            @click="scrollToSection('portfolio')"
            class="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            포트폴리오 보기
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Emits {
  (e: "scroll-to", sectionId: string): void;
}

const emit = defineEmits<Emits>();

const scrollToSection = (sectionId: string) => {
  emit("scroll-to", sectionId);
};
</script>

<style scoped></style>
