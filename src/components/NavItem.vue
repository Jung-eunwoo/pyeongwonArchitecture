<template>
  <button
    @click="$emit('click')"
    :class="[
      'text-sm font-medium transition-colors hover:text-[#d52e38]',
      isActive ? 'text-[#d52e38]' : 'text-gray-600',
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  isActive: boolean;
}

defineProps<Props>();

defineEmits<{
  click: [];
}>();
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
