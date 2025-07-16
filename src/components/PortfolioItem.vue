<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
  >
    <div class="relative">
      <div
        v-if="!image"
        class="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="text-4xl mb-2">🏢</div>
          <p class="text-gray-500 text-sm">{{ title }}</p>
        </div>
      </div>
      <img v-else :src="image" :alt="title" class="w-full h-48 object-cover" />
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
interface Props {
  title: string;
  type: string;
  image?: string;
}

defineProps<Props>();
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
