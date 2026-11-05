import { ref, onMounted, onUnmounted } from "vue";

/**
 * 화면 세로 중앙선에 걸린 섹션의 id를 반환한다.
 * (scroll 이벤트 + offsetTop 계산 대신 IntersectionObserver 사용)
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const activeSection = ref(sectionIds[0] ?? "");
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection.value = entry.target.id;
        }
      },
      // 위아래 50%를 잘라 뷰포트 중앙의 가로선만 남김
      { rootMargin: "-50% 0px -50% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onUnmounted(() => observer?.disconnect());

  return activeSection;
}
