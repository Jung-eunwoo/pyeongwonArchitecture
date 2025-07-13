<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">견적문의</h2>
      <div class="contact-content">
        <div class="contact-info">
          <h3>연락처 정보</h3>
          <p v-for="info in contactInfo" :key="info">{{ info }}</p>

          <h3 style="margin-top: 2rem">왜 평원건축을 선택해야 할까요?</h3>
          <p v-for="reason in whyChooseUs" :key="reason">{{ reason }}</p>
        </div>
        <div class="quote-form">
          <h3>무료 견적 문의</h3>
          <form @submit.prevent="submitQuote">
            <div class="form-group">
              <label for="name">성함*</label>
              <input type="text" id="name" v-model="quoteForm.name" required />
            </div>
            <div class="form-group">
              <label for="phone">연락처*</label>
              <input type="tel" id="phone" v-model="quoteForm.phone" required />
            </div>
            <div class="form-group">
              <label for="email">이메일</label>
              <input type="email" id="email" v-model="quoteForm.email" />
            </div>
            <div class="form-group">
              <label for="service">서비스 종류*</label>
              <select id="service" v-model="quoteForm.service" required>
                <option value="">선택하세요</option>
                <option
                  v-for="option in serviceOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="budget">예산 범위</label>
              <select id="budget" v-model="quoteForm.budget">
                <option value="">선택하세요</option>
                <option
                  v-for="option in budgetOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">상세 내용*</label>
              <textarea
                id="message"
                v-model="quoteForm.message"
                rows="5"
                required
                placeholder="프로젝트의 규모, 위치, 일정 등 자세한 내용을 알려주세요."
              ></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? "전송 중..." : "견적 문의하기" }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <span class="close" @click="closeModal">&times;</span>
            <h2>견적 문의 완료</h2>
            <p>
              견적 문의가 성공적으로 접수되었습니다.<br />빠른 시일 내에
              연락드리겠습니다.
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

interface QuoteForm {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

interface Option {
  value: string;
  text: string;
}

// 연락처 정보
const contactInfo = [
  "📞 전화: 010-XXXX-XXXX",
  "✉️ 이메일: info@pyeongwon.com",
  "📍 주소: 서울시 강남구 테헤란로 123",
  "🕐 운영시간: 평일 9:00 - 18:00",
];

// 선택 이유
const whyChooseUs = [
  "✓ 풍부한 경험과 전문성",
  "✓ 고객 중심의 맞춤형 서비스",
  "✓ 합리적인 가격과 투명한 견적",
  "✓ 체계적인 사후 관리",
];

// 서비스 옵션
const serviceOptions: Option[] = [
  { value: "building", text: "건축 설계" },
  { value: "interior", text: "인테리어 설계" },
  { value: "remodeling", text: "리모델링" },
  { value: "permit", text: "건축 허가" },
  { value: "other", text: "기타" },
];

// 예산 옵션
const budgetOptions: Option[] = [
  { value: "under5000", text: "5천만원 이하" },
  { value: "5000-10000", text: "5천만원 - 1억원" },
  { value: "10000-20000", text: "1억원 - 2억원" },
  { value: "20000-50000", text: "2억원 - 5억원" },
  { value: "over50000", text: "5억원 이상" },
];

// 견적 폼 데이터
const quoteForm = reactive<QuoteForm>({
  name: "",
  phone: "",
  email: "",
  service: "",
  budget: "",
  message: "",
});

// UI 상태
const showModal = ref(false);
const isSubmitting = ref(false);

// 견적 문의 제출
const submitQuote = async () => {
  isSubmitting.value = true;

  try {
    // 실제 환경에서는 서버로 데이터 전송
    console.log("견적 문의 데이터:", quoteForm);

    // 모의 API 호출 (2초 지연)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 성공 모달 표시
    showModal.value = true;

    // 폼 초기화
    resetForm();
  } catch (error) {
    console.error("견적 문의 실패:", error);
    alert("견적 문의 중 오류가 발생했습니다. 다시 시도해주세요.");
  } finally {
    isSubmitting.value = false;
  }
};

// 폼 초기화
const resetForm = () => {
  Object.assign(quoteForm, {
    name: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.contact {
  padding: 5rem 0;
  background: #d52e38;
  color: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.contact-info p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.quote-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  color: #333;
}

.quote-form h3 {
  color: #d52e38;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #d52e38;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #d52e38;
}

.submit-btn {
  background: linear-gradient(45deg, #d52e38, #b71c1c);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s;
  width: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  position: relative;
  color: #333;
}

.close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}

.modal-content h2 {
  color: #d52e38;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
