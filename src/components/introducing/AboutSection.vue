<template>
  <!-- About Section -->
  <section id="about" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 fade-in-up" ref="titleRef">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">평원건축 소개</h2>
          <p class="text-lg text-gray-600">
            신뢰와 품질로 함께하는 건축 파트너
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div class="fade-in-up" ref="contentRef">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">
              40년 경험의 전문성
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              평원건축은 40년간 수많은 프로젝트를 성공적으로 완수하며 건축 및
              인테리어 분야에서 확고한 신뢰를 쌓아왔습니다. 고객의
              라이프스타일과 니즈를 정확히 파악하여 최적의 공간을 제안합니다.
            </p>
            <div
              class="grid grid-cols-2 gap-6 stagger-animation"
              ref="statsRef"
            >
              <div class="text-center">
                <div
                  class="text-3xl font-bold mb-2"
                  :style="{ color: '#d52e38' }"
                >
                  {{ stats.completedProjects }}+
                </div>
                <div class="text-sm text-gray-600">완공 프로젝트</div>
              </div>
              <div class="text-center">
                <div
                  class="text-3xl font-bold mb-2"
                  :style="{ color: '#d52e38' }"
                >
                  {{ stats.experienceYears }}년
                </div>
                <div class="text-sm text-gray-600">업계 경험</div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-100 rounded-lg p-6 fade-in-up-delay"
            ref="imageRef"
          >
            <div class="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/pwarcitecture.png"
                alt="평원건축 사무실"
                class="w-full h-full object-cover object-center"
              />
            </div>
            <div class="mt-4 text-center">
              <p class="text-gray-700 font-medium">평원건축 사무실</p>
              <p class="text-sm text-gray-500 mt-1">
                {{ COMPANY_INFO.address.fullAddress }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="grid md:grid-cols-3 gap-8 stagger-animation"
          ref="featuresRef"
        >
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FeatureCard from "../FeatureCard.vue";
import { COMPANY_INFO } from "../../constants/company-info";

interface Props {
  features: Array<{
    icon: any;
    title: string;
    description: string;
  }>;
  stats: {
    completedProjects: number;
    experienceYears: number;
  };
}

defineProps<Props>();

// Refs for animation elements
const titleRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const imageRef = ref<HTMLElement>();
const statsRef = ref<HTMLElement>();
const featuresRef = ref<HTMLElement>();

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
  const elementsToObserve = [
    titleRef.value,
    contentRef.value,
    imageRef.value,
    statsRef.value,
    featuresRef.value,
  ];

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
