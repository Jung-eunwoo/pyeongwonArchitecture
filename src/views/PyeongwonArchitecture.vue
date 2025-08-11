<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <Header
      :active-section="activeSection"
      :nav-items="navItems"
      @scroll-to="scrollToSection"
    />

    <!-- Hero Section -->
    <HeroSection @scroll-to="scrollToSection" />

    <!-- About Section -->
    <AboutSection :features="features" :stats="COMPANY_STATS" />

    <!-- Services Section -->
    <ServicesSection :services="services" />

    <!-- Portfolio Section -->
    <PortfolioSection :portfolio="portfolio" />

    <!-- Contact Section -->
    <ContactUsSection
      :contacts="contacts"
      :form="form"
      @submit-form="submitForm"
      @address-search="handleAddressSearch"
    />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import HeroSection from "../components/introducing/HeroSection.vue";
import AboutSection from "../components/introducing/AboutSection.vue";
import ServicesSection from "../components/introducing/ServicesSection.vue";
import PortfolioSection from "../components/introducing/PortfolioSection.vue";
import ContactUsSection from "../components/ContactUsSection.vue";
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import {
  COMPANY_STATS,
  NAV_ITEMS,
  COMPANY_FEATURES,
  SERVICES,
  PORTFOLIO_PROJECTS,
  CONTACT_LIST,
  INITIAL_FORM_DATA,
} from "../constants/company-info";

// Simple icon placeholders
const Phone = "phone";
const Mail = "mail";
const MapPin = "map-pin";
const Calculator = "calculator";
const Users = "users";
const Award = "award";
const Hammer = "hammer";
const Home = "home";
const Building2 = "building2";

const activeSection = ref("home");

// 아이콘 매핑 객체
const iconMap = {
  Award,
  Users,
  Hammer,
  Home,
  Building2,
  Calculator,
  Phone,
  Mail,
  MapPin,
};

// 상수에서 가져온 데이터에 실제 아이콘 컴포넌트 매핑
const navItems = [...NAV_ITEMS];

const features = COMPANY_FEATURES.map((feature) => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}));

const services = SERVICES.map((service) => ({
  ...service,
  icon: iconMap[service.icon as keyof typeof iconMap],
  items: [...service.items],
}));

const portfolio = PORTFOLIO_PROJECTS.map((project) => ({
  ...project,
  images: [...project.images],
}));

const contacts = CONTACT_LIST.map((contact) => ({
  ...contact,
  icon: iconMap[contact.icon as keyof typeof iconMap],
}));

const form = ref({ ...INITIAL_FORM_DATA });

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  const sections = ["home", "about", "services", "portfolio", "contact"];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        activeSection.value = section;
        break;
      }
    }
  }
};

const handleAddressSearch = () => {
  alert("주소 검색 기능입니다. 실제 서비스에서는 우편번호 API를 연동합니다.");
};

const submitForm = () => {
  console.log("Form submitted:", form.value);
  alert("견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Tailwind CSS 클래스들이 정상적으로 작동하도록 보장 */
</style>
