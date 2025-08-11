<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
  >
    <div class="relative">
      <!-- 이미지 슬라이드 영역 -->
      <div
        v-if="images && images.length > 0"
        class="relative h-48 overflow-hidden"
      >
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex-shrink-0 h-full"
          >
            <img
              :src="image"
              :alt="`${title} 이미지 ${index + 1}`"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- 슬라이드 네비게이션 점들 -->
        <div
          v-if="images.length > 1"
          class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          <button
            v-for="(_, index) in images"
            :key="index"
            @click="currentImageIndex = index"
            class="w-2 h-2 rounded-full transition-colors"
            :class="currentImageIndex === index ? 'bg-white' : 'bg-white/50'"
          />
        </div>

        <!-- 좌우 화살표 (호버 시 표시) -->
        <button
          v-if="images.length > 1"
          @click="previousImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-opacity"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          v-if="images.length > 1"
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-opacity"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- 이미지가 없을 때 플레이스홀더 -->
      <div
        v-else
        class="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="text-4xl mb-2">🏢</div>
          <p class="text-gray-500 text-sm">{{ title }}</p>
        </div>
      </div>

      <!-- 타입 라벨 -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1 text-xs font-medium text-white rounded-full"
          style="background-color: #d52e38"
        >
          {{ type }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-semibold text-gray-900">{{ title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  title: string;
  type: string;
  images: string[];
}

const props = defineProps<Props>();

// 현재 이미지 인덱스
const currentImageIndex = ref(0);

// 자동 슬라이드를 위한 인터벌
let autoSlideInterval: ReturnType<typeof setInterval> | null = null;

// 이전 이미지로 이동
const previousImage = () => {
  if (props.images && props.images.length > 0) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? props.images.length - 1
        : currentImageIndex.value - 1;
  }
};

// 다음 이미지로 이동
const nextImage = () => {
  if (props.images && props.images.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % props.images.length;
  }
};

// 이미지 로드 에러 처리
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
};

// 자동 슬라이드 시작
const startAutoSlide = () => {
  if (props.images && props.images.length > 1) {
    autoSlideInterval = setInterval(() => {
      nextImage();
    }, 4000); // 4초마다 자동 슬라이드
  }
};

// 자동 슬라이드 정지
const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
