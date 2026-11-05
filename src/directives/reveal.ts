import type { Directive } from "vue";

/**
 * v-reveal: 요소가 화면에 들어오면 `is-visible` 클래스를 붙인다.
 * (.fade-in-up / .fade-in-up-delay / .stagger-animation 애니메이션의 트리거)
 *
 * - 모든 요소가 IntersectionObserver 하나를 공유하고, 한 번 보이면 관찰을 끝낸다.
 * - IntersectionObserver가 없거나 '동작 줄이기' 설정이면 바로 보이게 한다.
 */
const VISIBLE_CLASS = "is-visible";

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE_CLASS);
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  return observer;
}

const shouldSkipAnimation = () =>
  typeof IntersectionObserver === "undefined" ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (shouldSkipAnimation()) {
      el.classList.add(VISIBLE_CLASS);
      return;
    }
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
