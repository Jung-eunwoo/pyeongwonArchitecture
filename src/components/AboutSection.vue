<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title">회사소개</h2>
      <div class="about-content">
        <div class="about-text">
          <h3>{{ aboutData.title }}</h3>
          <p v-for="paragraph in aboutData.content" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
        <div class="about-image">
          <p>{{ aboutData.imageText }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface AboutData {
  title: string;
  content: string[];
  imageText: string;
}

const aboutData = reactive<AboutData>({
  title: "평원건축이 걸어온 길",
  content: [
    "평원건축은 고객의 꿈과 비전을 현실로 만들어가는 전문 건축사무소입니다. 수년간의 경험과 노하우를 바탕으로 고품질의 건축 서비스를 제공하고 있습니다.",
    "우리는 단순히 건물을 짓는 것이 아니라, 사람들의 삶의 질을 향상시키고 더 나은 환경을 만들어가는 것을 목표로 합니다. 모든 프로젝트에서 창의성과 기능성을 동시에 추구하며, 고객과의 소통을 통해 최적의 솔루션을 제공합니다.",
    "앞으로도 평원건축은 지속적인 혁신과 발전을 통해 건축 분야의 새로운 가치를 창출해 나가겠습니다.",
  ],
  imageText: "평원건축의 비전\n고객 만족을 위한 최고의 품질",
});
</script>

<style scoped>
.about {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d52e38;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

.about-text h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #d52e38;
}

.about-text p {
  margin-bottom: 1.5rem;
}

.about-image {
  background: linear-gradient(135deg, #d52e38, #b71c1c);
  height: 400px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>
