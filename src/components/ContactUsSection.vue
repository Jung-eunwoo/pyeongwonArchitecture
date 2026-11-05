<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 fade-in-up" v-reveal>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">견적 문의</h2>
          <p class="text-lg text-gray-600">무료 상담 및 견적을 받아보세요</p>
        </div>

        <div
          v-if="FEATURES.inquiryForm"
          ref="formCardRef"
          class="bg-white rounded-lg shadow-md p-8 mb-12 fade-in-up-delay"
          v-reveal
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
                  autocomplete="name"
                  placeholder="성함을 입력해주세요"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >연락처 *</label
                >
                <input
                  :value="formData.phone"
                  @input="handlePhoneInput"
                  id="phone"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="13"
                  placeholder="010-0000-0000"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                :maxlength="INQUIRY_LIMITS.email"
                autocomplete="email"
                placeholder="example@email.com"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                    class="min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-gray-50"
                  />
                  <button
                    type="button"
                    @click="handleAddressSearch"
                    @pointerenter="preloadPostcode"
                    @focus="preloadPostcode"
                    class="px-4 py-2 bg-brand text-white rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    검색
                  </button>
                </div>
                <input
                  v-model="formData.roadAddress"
                  id="road-address"
                  placeholder="도로명 주소"
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-gray-50"
                />
                <input
                  v-model="formData.detailAddress"
                  ref="detailAddressRef"
                  id="detail-address"
                  :maxlength="INQUIRY_LIMITS.address"
                  placeholder="상세 주소"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              ></textarea>
            </div>

            <!-- 스팸 방지용 honeypot: 사람에게는 보이지 않고, 봇만 채우는 필드 -->
            <div class="hidden" aria-hidden="true">
              <!-- 브라우저 자동완성이 채우지 않도록 의미 없는 이름/라벨을 쓴다 (채워지면 실제 문의가 조용히 버려짐) -->
              <label for="hp-field">이 칸은 비워 두세요</label>
              <input
                v-model="honeypot"
                id="hp-field"
                type="text"
                name="hp_field"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <!-- 개인정보 수집·이용 동의 (필수) -->
            <div class="rounded-md border border-gray-200 bg-gray-50 p-4">
              <p class="mb-3 text-sm text-gray-600">
                수집 항목: {{ PRIVACY_POLICY.items.required.join(", ") }} (필수)
                · 이용 목적: {{ PRIVACY_POLICY.purpose }} · 보유 기간:
                {{ PRIVACY_POLICY.retention }}
              </p>
              <div class="flex flex-wrap items-center justify-between gap-2">
                <label
                  for="privacy-agreed"
                  class="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-800"
                >
                  <input
                    v-model="privacyAgreed"
                    id="privacy-agreed"
                    type="checkbox"
                    required
                    class="h-4 w-4 accent-brand"
                  />
                  개인정보 수집·이용에 동의합니다. (필수)
                </label>
                <button
                  type="button"
                  class="text-sm text-gray-500 underline hover:text-gray-700"
                  @click="privacyDialogRef?.open()"
                >
                  전문 보기
                </button>
              </div>
            </div>

            <p
              v-if="statusMessage"
              role="status"
              aria-live="polite"
              class="rounded-md px-4 py-3 text-sm"
              :class="
                statusMessage.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-700'
              "
            >
              {{ statusMessage.text }}
            </p>

            <div class="text-center">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-brand text-white px-12 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">전송 중...</span>
                <span v-else>견적 문의하기</span>
              </button>
            </div>
          </form>
        </div>

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

        <!-- v-if/v-else 체인 밖에 둔다 (사이에 끼면 v-else가 깨짐) -->
        <PrivacyPolicyDialog v-if="FEATURES.inquiryForm" ref="privacyDialogRef" />

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
import { ref, reactive, watch, onMounted, onUnmounted, type Component } from "vue";
import { Phone } from "lucide-vue-next";
import ContactInfo from "./ContactInfo.vue";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog.vue";
import {
  COMPANY_INFO,
  CONTACT_LINKS,
  PRIVACY_POLICY,
} from "@/constants/company-info";
import { FEATURES } from "@/constants/features";
import { formatPhoneNumber } from "@/utils/phone";
import {
  loadPostcodeScript,
  openPostcodeSearch,
} from "@/utils/daum-postcode";
import {
  AREA_OPTIONS,
  BUDGET_OPTIONS,
  CONSTRUCTION_TYPES,
  INQUIRY_LIMITS,
  createEmptyInquiryForm,
  type InquiryRequest,
} from "@/shared/inquiry";

defineProps<{
  contacts: Array<{
    icon: Component;
    title: string;
    content: string;
    subtitle?: string;
    href?: string;
  }>;
}>();

// 폼 상태는 이 컴포넌트가 소유한다
const formData = reactive(createEmptyInquiryForm());
const privacyAgreed = ref(false);
const isSubmitting = ref(false);

// 스팸 방지: honeypot 값과 폼이 화면에 뜬 시각
const honeypot = ref("");
let formShownAt = Date.now();

const privacyDialogRef = ref<InstanceType<typeof PrivacyPolicyDialog>>();
const detailAddressRef = ref<HTMLInputElement>();
const formCardRef = ref<HTMLElement>();

// 제출 결과/검증 오류를 alert 대신 폼 안에 표시
type StatusMessage = { type: "success" | "error"; text: string };
const statusMessage = ref<StatusMessage | null>(null);
const showStatus = (type: StatusMessage["type"], text: string) => {
  statusMessage.value = { type, text };
};

// 사용자가 다시 입력을 시작하면 이전 오류 안내는 지운다
watch(
  [formData, privacyAgreed],
  () => {
    if (statusMessage.value?.type === "error") statusMessage.value = null;
  },
  { deep: true }
);

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formatted = formatPhoneNumber(input.value);
  formData.phone = formatted;
  // 포맷 결과가 이전 값과 같으면(문자·초과 입력) Vue가 다시 그리지 않으므로 DOM도 직접 맞춘다
  if (input.value !== formatted) input.value = formatted;
};

const resetForm = () => {
  Object.assign(formData, createEmptyInquiryForm());
  privacyAgreed.value = false;
  formShownAt = Date.now();
};

const toRequest = (): InquiryRequest => ({
  customer_name: formData.name,
  customer_phone: formData.phone,
  customer_email: formData.email,
  construction_type: formData.constructionType,
  construction_date: formData.constructionDate,
  area: formData.area,
  budget: formData.budget,
  postal_code: formData.postalCode,
  road_address: formData.roadAddress,
  detail_address: formData.detailAddress,
  message: formData.message,
  privacy_agreed: privacyAgreed.value,
  company_website: honeypot.value,
  elapsed_ms: Date.now() - formShownAt,
});

const handleSubmit = async () => {
  if (
    !formData.name ||
    !formData.phone ||
    !formData.email ||
    !formData.constructionType
  ) {
    showStatus("error", "필수 항목을 모두 입력해주세요.");
    return;
  }

  if (!privacyAgreed.value) {
    showStatus("error", "개인정보 수집·이용에 동의해주세요.");
    return;
  }

  isSubmitting.value = true;
  statusMessage.value = null;

  try {
    // 기본값("미정" 등) 채우기와 접수 시각 기록은 서버에서 처리
    const response = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toRequest()),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      showStatus(
        "error",
        result.error ??
          "견적 문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    showStatus(
      "success",
      "견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다."
    );
    resetForm();
  } catch (error) {
    // fetch 자체가 실패한 경우 (네트워크 오류)
    console.error("견적 문의 전송 실패:", error);
    showStatus("error", "네트워크 연결을 확인한 뒤 잠시 후 다시 시도해주세요.");
  } finally {
    isSubmitting.value = false;
  }
};

const preloadPostcode = () => {
  loadPostcodeScript().catch(() => {
    // 실패해도 클릭 시 다시 시도하므로 무시
  });
};

const handleAddressSearch = async () => {
  try {
    await openPostcodeSearch((data) => {
      formData.postalCode = data.zonecode;
      formData.roadAddress = data.roadAddress;
      // 상세주소 입력으로 포커스 이동
      setTimeout(() => detailAddressRef.value?.focus(), 100);
    });
  } catch {
    showStatus(
      "error",
      "주소 검색 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

// 폼이 화면에 들어오면 우편번호 스크립트를 미리 받아 둔다
// (클릭 시 팝업을 동기적으로 열어야 모바일 팝업 차단을 피할 수 있음)
let preloadObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (!formCardRef.value || typeof IntersectionObserver === "undefined") return;
  preloadObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    preloadPostcode();
    preloadObserver?.disconnect();
  });
  preloadObserver.observe(formCardRef.value);
});

onUnmounted(() => preloadObserver?.disconnect());
</script>
