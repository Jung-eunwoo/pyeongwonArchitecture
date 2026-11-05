<template>
  <header
    class="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img src="/logo.png" alt="평원건축 로고" class="h-10 w-auto" />
          <span class="text-2xl font-bold text-gray-900">평원건축</span>
        </div>

        <!-- 데스크톱 메뉴 -->
        <nav class="hidden md:flex space-x-8" aria-label="주요 메뉴">
          <NavigationItem
            v-for="item in navItems"
            :key="item.id"
            :label="item.label"
            :is-active="activeSection === item.id"
            @click="scrollToSection(item.id)"
          />
        </nav>

        <!-- 모바일 메뉴 토글 -->
        <button
          type="button"
          class="-mr-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="isMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- 모바일 메뉴 패널 -->
    <nav
      v-show="isMenuOpen"
      id="mobile-menu"
      class="border-t border-gray-200 bg-white md:hidden"
      aria-label="모바일 메뉴"
    >
      <ul class="container mx-auto px-4 py-2">
        <li v-for="item in navItems" :key="item.id">
          <button
            type="button"
            class="block w-full py-3 text-left text-base font-medium"
            :class="
              activeSection === item.id ? 'text-[#d52e38]' : 'text-gray-700'
            "
            :aria-current="activeSection === item.id ? 'true' : undefined"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Menu, X } from "lucide-vue-next";
import NavigationItem from "./NavigationItem.vue";

interface Props {
  activeSection: string;
  navItems: Array<{ id: string; label: string }>;
}

interface Emits {
  (e: "scroll-to", sectionId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const isMenuOpen = ref(false);

const scrollToSection = (sectionId: string) => {
  isMenuOpen.value = false;
  emit("scroll-to", sectionId);
};

// ESC로 닫기
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") isMenuOpen.value = false;
};

// md 이상으로 화면이 커지면 모바일 메뉴 상태 초기화
const desktopQuery = window.matchMedia("(min-width: 768px)");
const handleViewportChange = (event: MediaQueryListEvent) => {
  if (event.matches) isMenuOpen.value = false;
};

watch(isMenuOpen, (open) => {
  if (open) document.addEventListener("keydown", handleKeydown);
  else document.removeEventListener("keydown", handleKeydown);
});

onMounted(() => {
  desktopQuery.addEventListener("change", handleViewportChange);
});

onUnmounted(() => {
  desktopQuery.removeEventListener("change", handleViewportChange);
  document.removeEventListener("keydown", handleKeydown);
});
</script>
