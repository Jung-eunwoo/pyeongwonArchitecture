<template>
  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 fade-in-up" ref="titleRef">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">서비스 분야</h2>
          <p class="text-lg text-gray-600">
            다양한 공간의 설계부터 시공까지 원스톱 서비스
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation" ref="servicesRef">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            :items="service.items"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ServiceCard from "../ServiceCard.vue";

interface Props {
  services: Array<{
    icon: any;
    title: string;
    description: string;
    items: string[];
  }>;
}

defineProps<Props>();

// Refs for animation elements
const titleRef = ref<HTMLElement>();
const servicesRef = ref<HTMLElement>();

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
  const elementsToObserve = [titleRef.value, servicesRef.value];

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
