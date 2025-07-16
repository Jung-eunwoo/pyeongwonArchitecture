<template>
  <!-- About Section -->
  <section id="about" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">평원건축 소개</h2>
          <p class="text-lg text-gray-600">
            신뢰와 품질로 함께하는 건축 파트너
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">
              30년 경험의 전문성
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              1994년 설립된 평원건축은 30년간 수많은 프로젝트를 성공적으로
              완수하며 건축 및 인테리어 분야에서 확고한 신뢰를 쌓아왔습니다.
              고객의 라이프스타일과 니즈를 정확히 파악하여 최적의 공간을
              제안합니다.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div
                  class="text-3xl font-bold mb-2"
                  :style="{ color: '#d52e38' }"
                >
                  500+
                </div>
                <div class="text-sm text-gray-600">완공 프로젝트</div>
              </div>
              <div class="text-center">
                <div
                  class="text-3xl font-bold mb-2"
                  :style="{ color: '#d52e38' }"
                >
                  30년
                </div>
                <div class="text-sm text-gray-600">업계 경험</div>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 rounded-lg p-8">
            <div
              class="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"
            >
              <div class="text-center">
                <div
                  class="h-16 w-16 mx-auto mb-4 bg-gray-400 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="h-8 w-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                    />
                  </svg>
                </div>
                <p class="text-gray-500 font-medium">평원건축 사무실</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
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
import FeatureCard from "../FeatureCard.vue";

interface Props {
  features: Array<{
    icon: any;
    title: string;
    description: string;
  }>;
}

defineProps<Props>();
</script>

<style scoped></style>
