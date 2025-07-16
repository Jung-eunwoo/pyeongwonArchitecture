<template>
  <div class="flex flex-col items-center">
    <component :is="icon" class="h-8 w-8 mb-3" style="color: #d52e38" />
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

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
