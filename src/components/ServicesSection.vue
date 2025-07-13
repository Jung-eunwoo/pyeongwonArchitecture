<template>
  <section id="services" class="services">
    <div class="container">
      <h2 class="section-title">서비스</h2>
      <div class="services-grid">
        <div v-for="service in services" :key="service.id" class="service-card">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const services = reactive<Service[]>([
  {
    id: 1,
    icon: "🏗️",
    title: "건축 설계",
    description:
      "주택, 상업건물, 공공건물 등 모든 유형의 건축물에 대한 전문적인 설계 서비스를 제공합니다.",
  },
  {
    id: 2,
    icon: "🏠",
    title: "인테리어 설계",
    description:
      "공간의 기능성과 미적 가치를 극대화하는 인테리어 설계 및 리모델링 서비스를 제공합니다.",
  },
  {
    id: 3,
    icon: "📋",
    title: "건축 허가",
    description:
      "건축 허가 및 각종 인허가 업무를 전문적으로 처리하여 원활한 공사 진행을 도와드립니다.",
  },
  {
    id: 4,
    icon: "🔧",
    title: "시공 관리",
    description:
      "설계부터 시공까지 전 과정을 체계적으로 관리하여 최상의 품질을 보장합니다.",
  },
  {
    id: 5,
    icon: "🏢",
    title: "상업시설",
    description:
      "상업건물, 사무실, 매장 등 다양한 상업시설의 설계 및 시공 서비스를 제공합니다.",
  },
  {
    id: 6,
    icon: "🏡",
    title: "주거시설",
    description:
      "단독주택, 다세대주택, 아파트 등 주거시설의 설계 및 시공 서비스를 제공합니다.",
  },
]);
</script>

<style scoped>
.services {
  padding: 5rem 0;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d52e38;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #d52e38;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #d52e38;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
