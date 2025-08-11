<template>
  <section id="portfolio" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 fade-in-up" ref="titleRef">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">포트폴리오</h2>
          <p class="text-lg text-gray-600">평원건축이 완성한 아름다운 공간들</p>
        </div>

        <div
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation"
          ref="portfolioRef"
        >
          <PortfolioItem
            v-for="(project, index) in portfolio"
            :key="index"
            :title="project.title"
            :type="project.type"
            :images="project.images"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import PortfolioItem from "../PortfolioItem.vue";

interface Props {
  portfolio: Array<{
    title: string;
    type: string;
    images: string[];
  }>;
}

defineProps<Props>();

// Refs for animation elements
const titleRef = ref<HTMLElement>();
const portfolioRef = ref<HTMLElement>();

let observer: IntersectionObserver;

const setupIntersectionObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, options);

  // Observe all animation elements
  const elementsToObserve = [titleRef.value, portfolioRef.value];

  elementsToObserve.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });
};

onMounted(() => {
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
