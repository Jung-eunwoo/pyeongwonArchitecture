<template>
  <section id="portfolio" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 fade-in-up" v-reveal>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">포트폴리오</h2>
          <p class="text-lg text-gray-600">평원건축이 완성한 아름다운 공간들</p>
        </div>

        <div
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation"
          v-reveal
        >
          <PortfolioItem
            v-for="(project, index) in portfolio"
            :key="index"
            :title="project.title"
            :type="project.type"
            :images="project.images"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PortfolioItem from "../PortfolioItem.vue";

interface Props {
  portfolio: Array<{
    title: string;
    type: string;
    images: string[];
  }>;
}

defineProps<Props>();
</script>
