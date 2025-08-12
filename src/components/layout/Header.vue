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
