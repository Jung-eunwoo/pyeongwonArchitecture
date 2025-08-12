<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="평원건축 로고" class="h-10 w-auto" />
              <span class="text-2xl font-bold">{{ COMPANY_INFO.name }}</span>
            </div>
            <p class="text-gray-400 mb-4">
              40년 경험의 전문성으로 고객의 꿈을 현실로 만드는 건축 및 인테리어
              전문 회사입니다.
            </p>
            <div class="text-sm text-gray-400">
              <p>
                사업자등록번호: {{ COMPANY_INFO.business.registrationNumber }}
              </p>
              <!-- <p>대표자: {{ COMPANY_INFO.business.representative }}</p> -->
              <!-- <p>설립연도: {{ COMPANY_INFO.business.establishedYear }}년</p> -->
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
              <li>Tel: {{ COMPANY_INFO.phone }}</li>
              <li>Fax: {{ COMPANY_INFO.fax }}</li>
              <li>Email: {{ COMPANY_INFO.email }}</li>
              <li>{{ COMPANY_INFO.address.fullAddress }}</li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
        >
          <p>
            &copy; {{ new Date().getFullYear() }} {{ COMPANY_INFO.name }}. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CONTACT_INFO, COMPANY_INFO, SERVICES } from "@/constants/company-info";

// Footer component script
</script>

<style scoped></style>
