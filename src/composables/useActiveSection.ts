import { ref, onMounted, onUnmounted } from "vue";

/** 화면 상단에서 이 거리(px)의 가로선에 걸린 섹션을 활성으로 본다 (고정 헤더 높이 고려) */
const ACTIVE_LINE_OFFSET = 100;

/**
 * 현재 보고 있는 섹션의 id를 반환한다.
 * 기존 scroll 이벤트 + offsetTop 계산(scrollY + 100 지점의 섹션)과 같은 기준을
 * IntersectionObserver로 구현한다. rootMargin으로 뷰포트를 상단 100px 지점의
 * 1px 띠로 줄여서, 그 띠에 걸린 섹션만 교차로 판정한다.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const activeSection = ref(sectionIds[0] ?? "");
  let observer: IntersectionObserver | null = null;

  const observe = () => {
    observer?.disconnect();
    const bottomMargin = Math.max(
      window.innerHeight - ACTIVE_LINE_OFFSET - 1,
      0
    );
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection.value = entry.target.id;
        }
      },
      { rootMargin: `-${ACTIVE_LINE_OFFSET}px 0px -${bottomMargin}px 0px` }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  };

  // rootMargin을 px로 계산하므로 창 높이가 바뀌면 다시 관찰
  const handleResize = () => observe();

  onMounted(() => {
    observe();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener("resize", handleResize);
  });

  return activeSection;
}
