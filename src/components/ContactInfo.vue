<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="flex flex-col items-center rounded-lg p-2"
    :class="{ 'transition-colors hover:bg-white': href }"
  >
    <component :is="icon" class="h-8 w-8 mb-3" style="color: #d52e38" />
    <h3 class="font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600" :class="{ 'underline-offset-4 hover:underline': href }">
      {{ content }}
    </p>
    <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";

interface Props {
  icon: Component;
  title: string;
  content: string;
  subtitle?: string;
  href?: string;
}

const props = defineProps<Props>();

const isExternal = computed(() => !!props.href?.startsWith("http"));
</script>
