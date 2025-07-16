<template>
  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">서비스 분야</h2>
          <p class="text-lg text-gray-600">
            다양한 공간의 설계부터 시공까지 원스톱 서비스
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            :items="service.items"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceCard from "../ServiceCard.vue";

interface Props {
  services: Array<{
    icon: any;
    title: string;
    description: string;
    items: string[];
  }>;
}

defineProps<Props>();
</script>

<style scoped></style>
