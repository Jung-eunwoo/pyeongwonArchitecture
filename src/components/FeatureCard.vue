<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="text-center">
      <component
        :is="icon"
        class="h-12 w-12 mx-auto mb-4"
        style="color: #d52e38"
      />
      <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ title }}</h3>
      <p class="text-gray-600 text-center">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: any;
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
