<template>
  <button
    @click="$emit('click')"
    class="text-sm font-medium transition-colors hover:text-brand"
    :class="{ 'text-brand': isActive, 'text-gray-600': !isActive }"
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
