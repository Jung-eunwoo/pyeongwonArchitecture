<template>
  <!-- 현재 섹션은 색 + 밑줄로 표시 (색만으로 구분하지 않음), 보조기기에는 aria-current로 전달 -->
  <button
    type="button"
    @click="$emit('click')"
    class="text-sm font-medium underline-offset-8 transition-colors hover:text-brand"
    :class="isActive ? 'text-brand underline decoration-2' : 'text-gray-600'"
    :aria-current="isActive ? 'true' : undefined"
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
