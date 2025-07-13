<template>
  <header :style="{ background: headerBackground }">
    <div class="container">
      <div class="header-content">
        <a href="#" class="logo">
          <div class="logo-icon"></div>
          평원건축
        </a>
        <nav>
          <ul>
            <li><a @click="$emit('scroll-to', 'home')">홈</a></li>
            <li><a @click="$emit('scroll-to', 'services')">서비스</a></li>
            <li><a @click="$emit('scroll-to', 'about')">회사소개</a></li>
            <li><a @click="$emit('scroll-to', 'projects')">프로젝트</a></li>
            <li><a @click="$emit('scroll-to', 'contact')">견적문의</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineEmits<{
  "scroll-to": [sectionId: string];
}>();

const headerBackground = ref(
  "linear-gradient(135deg, #d52e38 0%, #b71c1c 100%)"
);

const handleScroll = () => {
  if (window.scrollY > 100) {
    headerBackground.value = "rgba(213, 46, 56, 0.95)";
  } else {
    headerBackground.value =
      "linear-gradient(135deg, #d52e38 0%, #b71c1c 100%)";
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
header {
  color: white;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 24px;
  background: #d52e38;
  clip-path: polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

nav a:hover {
  color: #ffcdd2;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  nav ul {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
