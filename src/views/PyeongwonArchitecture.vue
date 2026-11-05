<template>
  <div class="min-h-screen bg-white">
    <!-- 키보드·스크린리더 사용자를 위한 본문 바로가기 -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-gray-900 focus:shadow-lg"
    >
      본문 바로가기
    </a>

    <!-- Header -->
    <Header
      :active-section="activeSection"
      :nav-items="navItems"
      @scroll-to="scrollToSection"
    />

    <main id="main" tabindex="-1" class="outline-none">
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
    </main>

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
} from "@lucide/vue";
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

// 메뉴로 이동하면 화면뿐 아니라 키보드 포커스도 해당 섹션으로 옮긴다
// (그래야 다음 Tab이 이동한 섹션 안에서 이어진다)
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
  section.focus({ preventScroll: true });
};
</script>
