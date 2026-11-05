<template>
  <!-- 모바일 전용 하단 고정 전화 상담 버튼.
       견적 문의 섹션(전화 안내 카드가 있는 곳)이 보이는 동안에는 숨겨 버튼이 겹쳐 보이지 않게 한다. -->
  <Transition
    enter-from-class="translate-y-24 opacity-0"
    leave-to-class="translate-y-24 opacity-0"
    enter-active-class="transition duration-200 motion-reduce:transition-none"
    leave-active-class="transition duration-200 motion-reduce:transition-none"
  >
    <a
      v-show="!isContactVisible"
      :href="CONTACT_LINKS.tel"
      class="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-full border border-transparent bg-brand py-3 font-semibold text-white shadow-lg md:hidden"
      :aria-label="`전화 상담 ${COMPANY_INFO.phone}`"
    >
      <Phone class="h-5 w-5" />
      전화 상담 {{ COMPANY_INFO.phone }}
    </a>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Phone } from "lucide-vue-next";
import { COMPANY_INFO, CONTACT_LINKS } from "@/constants/company-info";

const isContactVisible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const contact = document.getElementById("contact");
  if (!contact || typeof IntersectionObserver === "undefined") return;
  observer = new IntersectionObserver(([entry]) => {
    isContactVisible.value = !!entry?.isIntersecting;
  });
  observer.observe(contact);
});

onUnmounted(() => observer?.disconnect());
</script>
