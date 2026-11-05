<template>
  <div class="flex flex-col items-center">
    <component :is="icon" class="h-8 w-8 mb-3 text-brand" />
    <h3 class="font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ content }}</p>
    <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: any;
  title: string;
  content: string;
  subtitle?: string;
}

defineProps<Props>();
</script>
