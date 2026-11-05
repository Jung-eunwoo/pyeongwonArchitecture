<template>
  <div
    ref="cardRef"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
    @pointerenter="handlePointerEnter"
    @pointerleave="isHovered = false"
    @focusin="isFocused = true"
    @focusout="handleFocusOut"
  >
    <div class="relative">
      <!-- 이미지 슬라이드 영역 -->
      <div
        v-if="images && images.length > 0"
        class="relative h-48 overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        :aria-label="`${title} 사진`"
        @touchstart.passive="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in imageAttrs"
            :key="index"
            class="w-full flex-shrink-0 h-full"
          >
            <!-- 첫 장은 항상 렌더링(검색엔진·이미지 검색이 읽을 수 있게, 브라우저 lazy 로딩).
                 나머지 슬라이드는 카드가 화면 근처에 오면 불러온다
                 (브라우저 lazy 로딩은 가로로 숨겨진 슬라이드를 늦게 불러와 넘길 때 빈 화면이 보임) -->
            <img
              v-if="index === 0 || hasEnteredView"
              :src="image.src"
              :srcset="image.srcset"
              :sizes="image.sizes"
              :width="image.width"
              :height="image.height"
              :alt="`${type} · ${title} 시공 사진 ${index + 1}/${images.length}`"
              :loading="index === 0 ? 'lazy' : undefined"
              decoding="async"
              class="w-full h-full"
              :class="
                image.portrait ? 'object-contain bg-gray-100' : 'object-cover'
              "
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- 슬라이드 네비게이션 점들 -->
        <div
          v-if="images.length > 1"
          class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex"
        >
          <!-- 점은 8px이지만 터치 영역은 버튼 padding으로 32px 확보 -->
          <button
            v-for="(_, index) in images"
            :key="index"
            type="button"
            @click="goTo(index)"
            class="p-3"
            :aria-label="`${index + 1}번째 사진 보기`"
            :aria-current="currentImageIndex === index ? 'true' : undefined"
          >
            <span
              class="block w-2 h-2 rounded-full transition-colors"
              :class="currentImageIndex === index ? 'bg-white' : 'bg-white/50'"
            />
          </button>
        </div>

        <!-- 좌우 화살표 (호버 시 표시) -->
        <button
          v-if="images.length > 1"
          type="button"
          @click="handlePrev"
          aria-label="이전 사진"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-opacity pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 focus-visible:opacity-100"
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
          type="button"
          @click="handleNext"
          aria-label="다음 사진"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-opacity pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 focus-visible:opacity-100"
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
          class="px-3 py-1 text-xs font-medium text-white rounded-full bg-brand"
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
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { getResponsiveImageAttrs } from "@/utils/responsive-image";

interface Props {
  title: string;
  type: string;
  images: string[];
}

const props = defineProps<Props>();

// 사진별 srcset·크기 정보는 사진 목록이 바뀔 때만 계산 (슬라이드가 넘어갈 때마다 다시 만들지 않음)
const imageAttrs = computed(() => props.images.map(getResponsiveImageAttrs));

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
  // 변형 파일(-400/-800)만 없을 수 있으므로 먼저 원본(src)으로 다시 시도하고, 그래도 실패하면 숨긴다
  if (img.hasAttribute("srcset")) {
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    return;
  }
  img.style.display = "none";
};

// 사용자가 직접 넘기면 자동 슬라이드 타이머를 다시 시작 (넘기자마자 또 넘어가지 않도록)
const restartAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

const goTo = (index: number) => {
  currentImageIndex.value = index;
  restartAutoSlide();
};

const handlePrev = () => {
  previousImage();
  restartAutoSlide();
};

const handleNext = () => {
  nextImage();
  restartAutoSlide();
};

// 좌우 스와이프
const SWIPE_THRESHOLD = 40;
let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.touches[0]?.clientX ?? 0;
  touchStartY = event.touches[0]?.clientY ?? 0;
};

const handleTouchEnd = (event: TouchEvent) => {
  const touch = event.changedTouches[0];
  if (!touch) return;
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  // 세로 스크롤 제스처(대각선 포함)는 슬라이드로 취급하지 않음
  if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY))
    return;
  if (deltaX > 0) handlePrev();
  else handleNext();
};

// ── 자동 슬라이드 ──────────────────────────────
// 화면에 보이고, 마우스/포커스가 없고, 동작 줄이기 설정이 아닐 때만 넘긴다.
const AUTO_SLIDE_MS = 4000;

const cardRef = ref<HTMLElement>();
const isInView = ref(false);
const hasEnteredView = ref(false);
// 호버와 포커스는 따로 추적한다 (한쪽이 풀려도 다른 쪽이 남아 있으면 계속 멈춤)
const isHovered = ref(false);
const isFocused = ref(false);

// 터치 탭은 호환 mouseenter만 발생하고 mouseleave가 오지 않아 영구 정지되므로 마우스만 처리
const handlePointerEnter = (event: PointerEvent) => {
  if (event.pointerType === "mouse") isHovered.value = true;
};

// 카드 내부 요소 사이의 포커스 이동은 정지 상태를 유지
const handleFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null;
  if (!next || !cardRef.value?.contains(next)) isFocused.value = false;
};
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const shouldAutoSlide = computed(
  () =>
    props.images.length > 1 &&
    isInView.value &&
    !isHovered.value &&
    !isFocused.value &&
    !prefersReducedMotion
);

const startAutoSlide = () => {
  if (!shouldAutoSlide.value || autoSlideInterval) return;
  autoSlideInterval = setInterval(nextImage, AUTO_SLIDE_MS);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

watch(shouldAutoSlide, (enabled) => (enabled ? startAutoSlide() : stopAutoSlide()));

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // IntersectionObserver 미지원 환경에서는 바로 보이는 것으로 처리
  if (!cardRef.value || typeof IntersectionObserver === "undefined") {
    isInView.value = true;
    hasEnteredView.value = true;
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = !!entry?.isIntersecting;
      if (entry?.isIntersecting) hasEnteredView.value = true;
    },
    // 화면에 들어오기 300px 전부터 사진을 불러오기 시작
    { rootMargin: "300px 0px" }
  );
  observer.observe(cardRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
  stopAutoSlide();
});
</script>
