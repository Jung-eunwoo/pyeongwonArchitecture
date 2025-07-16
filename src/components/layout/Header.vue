<template>
  <header
    class="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div
            class="h-8 w-8 bg-red-600 rounded flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 text-white"
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
          <span class="text-2xl font-bold text-gray-900">평원건축</span>
        </div>
        <nav class="hidden md:flex space-x-8">
          <NavigationItem
            v-for="item in navItems"
            :key="item.id"
            :label="item.label"
            :is-active="activeSection === item.id"
            @click="scrollToSection(item.id)"
          />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import NavigationItem from "./NavigationItem.vue";

interface Props {
  activeSection: string;
  navItems: Array<{ id: string; label: string }>;
}

interface Emits {
  (e: "scroll-to", sectionId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const scrollToSection = (sectionId: string) => {
  emit("scroll-to", sectionId);
};
</script>

<style scoped></style>
