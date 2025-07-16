<template>
  <svg
    :class="classes"
    :style="iconStyle"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
    <path d="M7 7h10" />
    <path d="M7 11h10" />
    <path d="M7 15h10" />
    <path d="M3 21h18" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  class?: string;
  style?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
  class: "h-6 w-6",
});

const classes = props.class;
const iconStyle =
  typeof props.style === "object" && props.style !== null
    ? Object.entries(props.style)
        .map(([key, value]) => `${key}:${value}`)
        .join(";")
    : props.style;
</script>
