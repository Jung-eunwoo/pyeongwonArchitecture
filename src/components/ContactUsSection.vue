<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 fade-in-up" ref="titleRef">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">견적 문의</h2>
          <p class="text-lg text-gray-600">무료 상담 및 견적을 받아보세요</p>
        </div>

        <div
          class="bg-white rounded-lg shadow-md p-8 mb-12 fade-in-up-delay"
          ref="formRef"
        >
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
                  :maxlength="INQUIRY_LIMITS.name"
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
                <p class="text-sm text-gray-500">
                  ※실제 연락을 받을 수 있는 번호를 입력해주세요.
                </p>
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
              <p class="text-sm text-gray-500">
                ※실제 연락을 받을 수 있는 이메일을 입력해주세요.
              </p>
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
                  for="construction-type"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >공사 구분 *</label
                >
                <select
                  v-model="formData.constructionType"
                  id="construction-type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
                >
                  <option value="">공사 구분을 선택해주세요</option>
                  <option
                    v-for="option in CONSTRUCTION_TYPES"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
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
                  <option
                    v-for="option in AREA_OPTIONS"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
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
                  <option
                    v-for="option in BUDGET_OPTIONS"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
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
                    readonly
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent bg-gray-50"
                  />
                  <button
                    type="button"
                    @click="handleAddressSearch"
                    class="px-4 py-2 bg-[#d52e38] text-white rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    검색
                  </button>
                </div>
                <input
                  v-model="formData.roadAddress"
                  id="road-address"
                  placeholder="도로명 주소"
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent bg-gray-50"
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
                for="message"
                class="block text-sm font-medium text-gray-700 mb-2"
                >문의 내용</label
              >
              <textarea
                v-model="formData.message"
                id="message"
                :maxlength="INQUIRY_LIMITS.message"
                placeholder="프로젝트에 대한 상세한 내용을 알려주세요"
                rows="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d52e38] focus:border-transparent"
              ></textarea>
            </div>

            <!-- 스팸 방지용 honeypot: 사람에게는 보이지 않고, 봇만 채우는 필드 -->
            <div class="hidden" aria-hidden="true">
              <label for="company-website">회사 웹사이트</label>
              <input
                v-model="honeypot"
                id="company-website"
                type="text"
                name="company_website"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <div class="text-center">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-[#d52e38] text-white px-12 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">전송 중...</span>
                <span v-else>견적 문의하기</span>
              </button>
            </div>
          </form>
        </div>

        <div
          class="grid md:grid-cols-3 gap-8 text-center stagger-animation"
          ref="contactsRef"
        >
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
import {
  AREA_OPTIONS,
  BUDGET_OPTIONS,
  CONSTRUCTION_TYPES,
  INQUIRY_LIMITS,
  type InquiryRequest,
} from "@/shared/inquiry";

// 카카오 주소 검색 API 타입 정의
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
          buildingName: string;
          apartment: string;
        }) => void;
        width?: string;
        height?: string;
      }) => {
        open: () => void;
        embed: (element: HTMLElement) => void;
      };
    };
  }
}

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
    constructionType: string;
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
const isSubmitting = ref(false);

// 스팸 방지: honeypot 값과 폼이 화면에 뜬 시각
const honeypot = ref("");
const formShownAt = ref(Date.now());

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

const handleSubmit = async () => {
  // 필수 필드 검증
  if (
    !formData.value.name ||
    !formData.value.phone ||
    !formData.value.email ||
    !formData.value.constructionType
  ) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }

  isSubmitting.value = true;

  try {
    // 기본값("미정" 등) 채우기와 접수 시각 기록은 서버에서 처리
    const requestData: InquiryRequest = {
      customer_name: formData.value.name,
      customer_phone: formData.value.phone,
      customer_email: formData.value.email,
      construction_type: formData.value.constructionType,
      construction_date: formData.value.constructionDate,
      area: formData.value.area,
      budget: formData.value.budget,
      postal_code: formData.value.postalCode,
      road_address: formData.value.roadAddress,
      detail_address: formData.value.detailAddress,
      message: formData.value.message,
      company_website: honeypot.value,
      elapsed_ms: Date.now() - formShownAt.value,
    };

    // 서버리스 함수로 이메일 전송 요청
    const response = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert(
        result.error ?? "견적 문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    alert(
      "견적 문의가 성공적으로 전송되었습니다!\n빠른 시일 내에 연락드리겠습니다."
    );

    // 폼 초기화
    formData.value = {
      name: "",
      phone: "",
      email: "",
      constructionDate: "",
      constructionType: "",
      area: "",
      postalCode: "",
      roadAddress: "",
      detailAddress: "",
      budget: "",
      message: "",
    };
    formShownAt.value = Date.now();

    emit("submit-form");
  } catch (error: any) {
    console.error("이메일 전송 실패:", error);

    let errorMessage = "견적 문의 전송에 실패했습니다.";

    // 네트워크 에러 처리
    if (error instanceof TypeError && error.message.includes("fetch")) {
      errorMessage = "네트워크 연결을 확인해주세요.";
    } else if (error.message) {
      errorMessage = `전송 실패: ${error.message}`;
    }

    alert(errorMessage + "\n\n잠시 후 다시 시도해주세요.");
  } finally {
    isSubmitting.value = false;
  }
};

const handleAddressSearch = () => {
  // 카카오 주소 검색 API가 로드되었는지 확인
  if (!window.daum || !window.daum.Postcode) {
    alert(
      "주소 검색 서비스를 불러올 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요."
    );
    return;
  }

  new window.daum.Postcode({
    oncomplete: function (data) {
      // 우편번호와 주소 정보를 입력 필드에 자동 설정
      formData.value.postalCode = data.zonecode;
      formData.value.roadAddress = data.roadAddress;

      // 상세주소 입력 필드에 포커스
      setTimeout(() => {
        const detailAddressInput = document.getElementById(
          "detail-address"
        ) as HTMLInputElement;
        if (detailAddressInput) {
          detailAddressInput.focus();
        }
      }, 100);
    },
    width: "100%",
    height: "400px",
  }).open();
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
