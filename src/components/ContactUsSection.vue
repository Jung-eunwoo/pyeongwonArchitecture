<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div v-reveal class="text-center mb-16 fade-in-up">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">견적 문의</h2>
          <p class="text-lg text-gray-600">무료 상담 및 견적을 받아보세요</p>
        </div>

        <ContactForm v-if="FEATURES.inquiryForm" />

        <!-- 폼 비활성화 시: 전화 문의 안내 -->
        <PhoneInquiryCard v-else />

        <div
          v-reveal
          class="grid gap-8 text-center stagger-animation"
          :class="contacts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'"
        >
          <ContactInfo
            v-for="contact in contacts"
            :key="contact.title"
            :icon="contact.icon"
            :title="contact.title"
            :content="contact.content"
            :subtitle="contact.subtitle"
            :href="contact.href"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, type Component } from "vue";
import ContactInfo from "./ContactInfo.vue";
import PhoneInquiryCard from "./PhoneInquiryCard.vue";
import { FEATURES } from "@/constants/features";

// 폼은 꺼져 있는 동안 번들에 포함되지 않도록 별도 청크로 분리.
// 청크를 못 받으면(재배포 후 오래된 탭, 네트워크 오류) 전화 안내로 대신 보여 준다.
const ContactForm = defineAsyncComponent({
  loader: () => import("./ContactForm.vue"),
  errorComponent: PhoneInquiryCard,
  timeout: 10000,
});

defineProps<{
  contacts: Array<{
    icon: Component;
    title: string;
    content: string;
    subtitle?: string;
    href?: string;
  }>;
}>();
</script>
