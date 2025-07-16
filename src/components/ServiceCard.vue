<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
  >
    <div class="mb-4">
      <component :is="icon" class="h-12 w-12 mb-4" style="color: #d52e38" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
    </div>
    <ul class="text-sm text-gray-600 space-y-2">
      <li v-for="item in items" :key="item">• {{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: any;
  title: string;
  description: string;
  items: string[];
}

defineProps<Props>();
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
