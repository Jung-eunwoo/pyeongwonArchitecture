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
import { COMPANY_INFO, CONTACT_INFO, COMPANY_STATS } from "../constants/company-info";

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

const navItems = [
  { id: "home", label: "홈" },
  { id: "about", label: "회사소개" },
  { id: "services", label: "서비스" },
  { id: "portfolio", label: "포트폴리오" },
  { id: "contact", label: "견적문의" },
];

const features = [
  {
    icon: Award,
    title: "품질 보증",
    description:
      "엄선된 자재와 숙련된 기술진으로 최고 품질의 시공을 보장합니다.",
  },
  {
    icon: Users,
    title: "전문 팀",
    description:
      "건축사, 인테리어 디자이너, 시공 전문가가 함께하는 원스톱 서비스",
  },
  {
    icon: Hammer,
    title: "A/S 보장",
    description:
      "완공 후에도 지속적인 관리와 신속한 A/S로 고객 만족을 실현합니다.",
  },
];

const services = [
  {
    icon: Home,
    title: "주거 공간",
    description: "아파트, 빌라, 단독주택 리모델링",
    items: [
      "전체 리모델링",
      "부분 인테리어",
      "주방, 욕실 전문 시공",
      "확장 및 구조 변경",
    ],
  },
  {
    icon: Building2,
    title: "상업 공간",
    description: "사무실, 매장, 카페 인테리어",
    items: [
      "사무실 인테리어",
      "매장 및 쇼룸",
      "카페, 레스토랑",
      "병원, 클리닉",
    ],
  },
  {
    icon: Calculator,
    title: "설계 서비스",
    description: "3D 설계 및 시뮬레이션",
    items: ["3D 모델링", "도면 작성", "인허가 대행", "구조 안전 진단"],
  },
];

const portfolio = [
  { title: "강남 아파트 리모델링", type: "주거공간", image: "" },
  { title: "홍대 카페 인테리어", type: "상업공간", image: "" },
  { title: "판교 사무실 설계", type: "사무공간", image: "" },
  { title: "용산 단독주택", type: "주거공간", image: "" },
  { title: "명동 매장 인테리어", type: "상업공간", image: "" },
  { title: "분당 빌라 리모델링", type: "주거공간", image: "" },
];

const contacts = [
  {
    icon: Phone,
    title: "전화 문의",
    content: COMPANY_INFO.phone,
    subtitle: COMPANY_INFO.businessHours.weekday,
  },
  {
    icon: Mail,
    title: "이메일 문의",
    content: COMPANY_INFO.email,
    subtitle: "24시간 접수 가능",
  },
  {
    icon: MapPin,
    title: "오시는 길",
    content: COMPANY_INFO.address.roadAddress,
    subtitle: COMPANY_INFO.address.detailAddress,
  },
];

const form = ref({
  name: "",
  phone: "",
  email: "",
  constructionDate: "",
  area: "",
  postalCode: "",
  roadAddress: "",
  detailAddress: "",
  budget: "",
  message: "",
});

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
