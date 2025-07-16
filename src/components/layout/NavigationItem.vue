<template>
  <button
    @click="$emit('click')"
    class="text-sm font-medium transition-colors hover:text-[#d52e38]"
    :class="{ 'text-[#d52e38]': isActive, 'text-gray-600': !isActive }"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  isActive: boolean;
}

interface Emits {
  (e: "click"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
