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
    <ContactUsSection :contacts="contacts" />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
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
} from "../constants/company-info";
import { useActiveSection } from "../composables/useActiveSection";

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
const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

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

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
</script>
