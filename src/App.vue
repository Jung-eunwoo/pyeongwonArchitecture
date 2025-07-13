<template>
  <div id="app">
    <Header @scroll-to="scrollToSection" />
    <HeroSection @scroll-to="scrollToSection" />
    <ServicesSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Header from "./components/Header.vue";
import HeroSection from "./components/HeroSection.vue";
import ServicesSection from "./components/ServicesSection.vue";
import AboutSection from "./components/AboutSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import Footer from "./components/Footer.vue";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
