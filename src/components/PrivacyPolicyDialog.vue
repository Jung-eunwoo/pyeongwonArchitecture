<template>
  <dialog
    ref="dialogRef"
    class="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-lg p-0 shadow-xl backdrop:bg-black/50"
    :aria-labelledby="titleId"
    @mousedown="handleBackdropMousedown"
    @click="handleBackdropClick"
  >
    <div class="max-h-[80vh] overflow-y-auto p-6 text-left text-gray-700">
      <div class="mb-4 flex items-start justify-between gap-4">
        <h2 :id="titleId" class="text-xl font-bold text-gray-900">
          개인정보처리방침
        </h2>
        <button
          type="button"
          class="rounded p-1 text-gray-500 hover:bg-gray-100"
          aria-label="닫기"
          @click="close"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <p class="mb-4 text-sm">
        {{ COMPANY_INFO.name }}(이하 "회사")는 「개인정보 보호법」에 따라
        이용자의 개인정보를 보호하고 관련 고충을 원활하게 처리하기 위해 다음과
        같이 개인정보처리방침을 수립·공개합니다.
      </p>

      <dl class="space-y-4 text-sm">
        <div>
          <dt class="font-semibold text-gray-900">1. 수집하는 개인정보 항목</dt>
          <dd class="mt-1">
            필수: {{ PRIVACY_POLICY.items.required.join(", ") }}<br />
            선택: {{ PRIVACY_POLICY.items.optional.join(", ") }}
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">2. 수집 및 이용 목적</dt>
          <dd class="mt-1">{{ PRIVACY_POLICY.purpose }}</dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">3. 보유 및 이용 기간</dt>
          <dd class="mt-1">
            {{ PRIVACY_POLICY.retention }}. 단, 관계 법령에 따라 보존할 필요가
            있는 경우 해당 기간 동안 보관합니다.
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">4. 개인정보 처리 위탁</dt>
          <dd class="mt-1">
            <ul class="list-inside list-disc">
              <li v-for="p in PRIVACY_POLICY.processors" :key="p.name">
                {{ p.name }}: {{ p.task }}
              </li>
            </ul>
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">5. 동의 거부 권리</dt>
          <dd class="mt-1">
            이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있으며, 이 경우
            온라인 견적 문의 접수가 제한됩니다. 전화({{ COMPANY_INFO.phone }})로
            문의하실 수 있습니다.
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">6. 파기 절차 및 방법</dt>
          <dd class="mt-1">
            보유 기간이 지난 개인정보는 지체 없이 파기하며, 전자적 파일은 복구할
            수 없는 방법으로 삭제합니다.
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">7. 정보주체의 권리</dt>
          <dd class="mt-1">
            이용자는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수
            있으며, 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.
          </dd>
        </div>
        <div>
          <dt class="font-semibold text-gray-900">8. 개인정보 보호 문의</dt>
          <dd class="mt-1">
            전화 {{ COMPANY_INFO.phone }} · 이메일 {{ COMPANY_INFO.email }}
          </dd>
        </div>
      </dl>

      <p class="mt-6 text-xs text-gray-500">
        시행일: {{ PRIVACY_POLICY.effectiveDate }}
      </p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, useId } from "vue";
import { X } from "lucide-vue-next";
import { COMPANY_INFO, PRIVACY_POLICY } from "@/constants/company-info";

const dialogRef = ref<HTMLDialogElement>();
// 푸터·견적 폼에 인스턴스가 둘 있을 수 있으므로 id를 인스턴스마다 고유하게
const titleId = useId();

const open = () => dialogRef.value?.showModal();
const close = () => dialogRef.value?.close();

// dialog 바깥(backdrop) 클릭 시 닫기.
// 본문에서 드래그를 시작해 backdrop에서 놓으면 click target이 dialog가 되므로
// mousedown도 backdrop에서 시작했을 때만 닫는다.
let pressedOnBackdrop = false;
const handleBackdropMousedown = (event: MouseEvent) => {
  pressedOnBackdrop = event.target === dialogRef.value;
};
const handleBackdropClick = (event: MouseEvent) => {
  if (pressedOnBackdrop && event.target === dialogRef.value) close();
  pressedOnBackdrop = false;
};

defineExpose({ open, close });
</script>
