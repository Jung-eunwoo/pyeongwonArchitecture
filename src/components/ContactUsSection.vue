<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 fade-in-up" ref="titleRef">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">견적 문의</h2>
          <p class="text-lg text-gray-600">무료 상담 및 견적을 받아보세요</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8 mb-12 fade-in-up-delay" ref="formRef">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >이름 *</label
                >
                <input
                  v-model="formData.name"
                  id="name"
                  type="text"
                  placeholder="성함을 입력해주세요"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >연락처 *</label
                >
                <input
                  v-model="formData.phone"
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
                >이메일 *</label
              >
              <input
                v-model="formData.email"
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
              />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  for="construction-date"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >공사 예정일</label
                >
                <input
                  v-model="formData.constructionDate"
                  id="construction-date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                />
              </div>
              <div>
                <label
                  for="area"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >평형</label
                >
                <select
                  v-model="formData.area"
                  id="area"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                >
                  <option value="">평형을 선택해주세요</option>
                  <option value="10-20">10평 ~ 20평</option>
                  <option value="20-30">20평 ~ 30평</option>
                  <option value="30-40">30평 ~ 40평</option>
                  <option value="40-50">40평 ~ 50평</option>
                  <option value="50+">50평 이상</option>
                </select>
              </div>
            </div>

            <div>
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 mb-2"
                >공사 예정지 주소</label
              >
              <div class="space-y-3">
                <div class="flex gap-2">
                  <input
                    v-model="formData.postalCode"
                    id="postal-code"
                    placeholder="우편번호"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                  />
                  <button
                    type="button"
                    @click="handleAddressSearch"
                    class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  v-model="formData.roadAddress"
                  id="road-address"
                  placeholder="도로명 주소"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                />
                <input
                  v-model="formData.detailAddress"
                  id="detail-address"
                  placeholder="상세 주소"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                for="budget"
                class="block text-sm font-medium text-gray-700 mb-2"
                >예상 금액</label
              >
              <select
                v-model="formData.budget"
                id="budget"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
              >
                <option value="">예상 금액대를 선택해주세요</option>
                <option value="1000-3000">1,000만원 ~ 3,000만원</option>
                <option value="3000-5000">3,000만원 ~ 5,000만원</option>
                <option value="5000-1억">5,000만원 ~ 1억원</option>
                <option value="1억+">1억원 이상</option>
              </select>
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-2"
                >문의 내용</label
              >
              <textarea
                v-model="formData.message"
                id="message"
                placeholder="프로젝트에 대한 상세한 내용을 알려주세요"
                rows="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
              ></textarea>
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="bg-[#d52e38] text-white px-12 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                견적 문의하기
              </button>
            </div>
          </form>
        </div>

        <div class="grid md:grid-cols-3 gap-8 text-center stagger-animation" ref="contactsRef">
          <ContactInfo
            v-for="contact in contacts"
            :key="contact.title"
            :icon="contact.icon"
            :title="contact.title"
            :content="contact.content"
            :subtitle="contact.subtitle"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import ContactInfo from "./ContactInfo.vue";

interface Props {
  contacts: Array<{
    icon: any;
    title: string;
    content: string;
    subtitle?: string;
  }>;
  form: {
    name: string;
    phone: string;
    email: string;
    constructionDate: string;
    area: string;
    postalCode: string;
    roadAddress: string;
    detailAddress: string;
    budget: string;
    message: string;
  };
}

interface Emits {
  (e: "submit-form"): void;
  (e: "address-search"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref({ ...props.form });

// Refs for animation elements
const titleRef = ref<HTMLElement>();
const formRef = ref<HTMLElement>();
const contactsRef = ref<HTMLElement>();

let observer: IntersectionObserver;

const setupIntersectionObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, options);

  // Observe all animation elements
  const elementsToObserve = [titleRef.value, formRef.value, contactsRef.value];

  elementsToObserve.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });
};

// Watch for form changes and sync with parent
watch(
  () => props.form,
  (newForm) => {
    formData.value = { ...newForm };
  },
  { deep: true }
);

const handleSubmit = () => {
  emit("submit-form");
};

const handleAddressSearch = () => {
  emit("address-search");
};

onMounted(() => {
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 여기에 작성 */
</style>
