<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div
                class="h-8 w-8 bg-red-600 rounded flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                  />
                </svg>
              </div>
              <span class="text-2xl font-bold">평원건축</span>
            </div>
            <p class="text-gray-400 mb-4">
              30년 경험의 전문성으로 고객의 꿈을 현실로 만드는 건축 및 인테리어
              전문 회사입니다.
            </p>
            <div class="text-sm text-gray-400">
              <p>사업자등록번호: 123-45-67890</p>
              <p>건설업 등록번호: 서울-12345</p>
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-4">서비스</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>주거공간 리모델링</li>
              <li>상업공간 인테리어</li>
              <li>설계 및 시공</li>
              <li>A/S 서비스</li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-4">연락처</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>Tel: {{ CONTACT_INFO.phone }}</li>
              <li>Email: {{ CONTACT_INFO.email }}</li>
              <li>{{ CONTACT_INFO.address }}</li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
        >
          <p>&copy; 2024 평원건축. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { COMPANY_INFO } from "@/constants/company-info";

const CONTACT_INFO = COMPANY_INFO.contact;

// Footer component script
</script>

<style scoped></style>
