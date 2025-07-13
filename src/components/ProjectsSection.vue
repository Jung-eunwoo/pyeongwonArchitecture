<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">주요 프로젝트</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-image">
            <p>{{ project.imageText }}</p>
          </div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface Project {
  id: number;
  imageText: string;
  title: string;
  description: string;
}

const projects = reactive<Project[]>([
  {
    id: 1,
    imageText: "현대식 단독주택",
    title: "모던 하우스",
    description:
      "깔끔하고 모던한 디자인의 단독주택으로, 자연과 조화를 이루는 공간을 구현했습니다.",
  },
  {
    id: 2,
    imageText: "상업시설",
    title: "상업 복합 건물",
    description:
      "효율적인 동선과 기능적인 공간 배치로 상업성을 극대화한 복합 건물입니다.",
  },
  {
    id: 3,
    imageText: "리모델링",
    title: "주택 리모델링",
    description:
      "기존 건물의 장점을 살리면서도 현대적인 감각을 더한 리모델링 프로젝트입니다.",
  },
]);
</script>

<style scoped>
.projects {
  padding: 5rem 0;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d52e38;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #d52e38;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
