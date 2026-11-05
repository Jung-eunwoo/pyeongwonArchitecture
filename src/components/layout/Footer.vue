<template>
  <!-- 모바일에선 하단 고정 전화 버튼에 가리지 않도록 아래 여백 확보 -->
  <footer class="bg-gray-900 text-white pt-12 pb-24 md:pb-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <img
            src="/logo.png"
            alt="평원건축 로고"
            width="40"
            height="40"
            class="h-10 w-auto"
          />
              <span class="text-2xl font-bold">{{ COMPANY_INFO.name }}</span>
            </div>
            <p class="text-gray-400 mb-4">
              {{ COMPANY_STATS.experienceYears }}년 경험의 전문성으로 고객의 꿈을 현실로 만드는 건축 및 인테리어
              전문 회사입니다.
            </p>
            <div class="text-sm text-gray-400">
              <p>
                사업자등록번호: {{ COMPANY_INFO.business.registrationNumber }}
              </p>
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-4">서비스</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li v-for="service in SERVICES" :key="service.title">
                {{ service.title }}
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-4">연락처</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                Tel:
                <a :href="CONTACT_LINKS.tel" class="hover:text-white">{{
                  COMPANY_INFO.phone
                }}</a>
              </li>
              <li>Fax: {{ COMPANY_INFO.fax }}</li>
              <li>
                Email:
                <a :href="CONTACT_LINKS.mailto" class="hover:text-white">{{
                  COMPANY_INFO.email
                }}</a>
              </li>
              <li>
                <a
                  :href="CONTACT_LINKS.map"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-white"
                  >{{ COMPANY_INFO.address.fullAddress }}</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
        >
          <button
            type="button"
            class="mb-2 font-semibold text-gray-300 hover:text-white"
            @click="privacyDialogRef?.open()"
          >
            개인정보처리방침
          </button>
          <p>
            &copy; {{ new Date().getFullYear() }} {{ COMPANY_INFO.name }}. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
    <PrivacyPolicyDialog ref="privacyDialogRef" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  COMPANY_INFO,
  COMPANY_STATS,
  CONTACT_LINKS,
  SERVICES,
} from "@/constants/company-info";
import PrivacyPolicyDialog from "../PrivacyPolicyDialog.vue";

const privacyDialogRef = ref<InstanceType<typeof PrivacyPolicyDialog>>();
</script>

<style scoped></style>
