<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="text-center">
      <component :is="icon" class="h-12 w-12 mx-auto mb-4 text-brand" />
      <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ title }}</h3>
      <p class="text-gray-600 text-center">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  title: string;
  description: string;
}

defineProps<Props>();
</script>
