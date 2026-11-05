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

    <MobileCallButton />
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import {
  Award,
  Building2,
  Calculator,
  Hammer,
  Home,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-vue-next";
import HeroSection from "../components/introducing/HeroSection.vue";
import AboutSection from "../components/introducing/AboutSection.vue";
import ServicesSection from "../components/introducing/ServicesSection.vue";
import PortfolioSection from "../components/introducing/PortfolioSection.vue";
import ContactUsSection from "../components/ContactUsSection.vue";
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import MobileCallButton from "../components/layout/MobileCallButton.vue";
import {
  COMPANY_STATS,
  NAV_ITEMS,
  COMPANY_FEATURES,
  SERVICES,
  PORTFOLIO_PROJECTS,
  CONTACT_LIST,
} from "../constants/company-info";
import { FEATURES } from "../constants/features";
import { useActiveSection } from "../composables/useActiveSection";

// 상수의 아이콘 이름 → lucide 아이콘 컴포넌트
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
} satisfies Record<string, Component>;

// 상수에서 가져온 데이터에 실제 아이콘 컴포넌트 매핑
const navItems = [...NAV_ITEMS];
const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

const features = COMPANY_FEATURES.map((feature) => ({
  ...feature,
  icon: iconMap[feature.icon],
}));

const services = SERVICES.map((service) => ({
  ...service,
  icon: iconMap[service.icon],
  items: [...service.items],
}));

const portfolio = PORTFOLIO_PROJECTS.map((project) => ({
  ...project,
  images: [...project.images],
}));

// 폼 문의를 받지 않는 동안에는 "이메일 문의" 카드도 숨김
const contacts = CONTACT_LIST.filter(
  (contact) => FEATURES.inquiryForm || contact.id !== "email"
).map((contact) => ({
  ...contact,
  icon: iconMap[contact.icon],
}));

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
</script>
