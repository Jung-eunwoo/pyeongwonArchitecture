<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 fade-in-up" v-reveal>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">견적 문의</h2>
          <p class="text-lg text-gray-600">무료 상담 및 견적을 받아보세요</p>
        </div>

        <ContactForm v-if="FEATURES.inquiryForm" />

        <!-- 폼 비활성화 시: 전화 문의 안내 -->
        <div
          v-else
          class="bg-white rounded-lg shadow-md px-6 py-10 mb-12 text-center fade-in-up-delay"
          v-reveal
        >
          <Phone class="mx-auto mb-4 h-12 w-12 text-brand" />
          <p class="mb-2 text-lg font-semibold text-gray-900">
            견적 문의는 전화로 받고 있습니다
          </p>
          <p class="mb-6 text-gray-600">
            공사 내용을 말씀해 주시면 상담 후 견적을 안내해 드립니다.
          </p>
          <a
            :href="CONTACT_LINKS.tel"
            class="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            <Phone class="h-5 w-5" />
            {{ COMPANY_INFO.phone }}
          </a>
          <p class="mt-4 text-sm text-gray-500">
            {{ COMPANY_INFO.businessHours.weekday }} ·
            {{ COMPANY_INFO.businessHours.saturday }} ·
            {{ COMPANY_INFO.businessHours.sunday }}
          </p>
        </div>

        <div
          class="grid gap-8 text-center stagger-animation"
          :class="contacts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'"
          v-reveal
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
import { Phone } from "lucide-vue-next";
import ContactInfo from "./ContactInfo.vue";
import { COMPANY_INFO, CONTACT_LINKS } from "@/constants/company-info";
import { FEATURES } from "@/constants/features";

// 폼은 꺼져 있는 동안 번들에 포함되지 않도록 별도 청크로 분리
const ContactForm = defineAsyncComponent(() => import("./ContactForm.vue"));

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
