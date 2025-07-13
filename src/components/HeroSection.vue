<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <h1>{{ heroData.title }}</h1>
      <p>{{ heroData.description }}</p>
      <a @click="$emit('scroll-to', 'contact')" class="cta-button">
        {{ heroData.buttonText }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

defineEmits<{
  "scroll-to": [sectionId: string];
}>();

const heroData = reactive({
  title: "평원건축",
  description:
    "전문성과 신뢰성을 바탕으로 고객의 꿈을 현실로 만들어가는 건축사무소입니다",
  buttonText: "무료 견적 문의",
});
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23e9ecef" width="1200" height="600"/><rect fill="%23dee2e6" x="100" y="100" width="200" height="400"/><rect fill="%23ced4da" x="400" y="150" width="300" height="350"/><rect fill="%23adb5bd" x="800" y="80" width="250" height="420"/></svg>');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 80px;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: linear-gradient(45deg, #d52e38, #b71c1c);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s;
  text-decoration: none;
  display: inline-block;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(213, 46, 56, 0.3);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
}
</style>
