import type { Directive } from "vue";

/**
 * v-reveal: 요소가 화면에 들어오면 `is-visible` 클래스를 붙인다.
 * (.fade-in-up / .fade-in-up-delay / .stagger-animation 애니메이션의 트리거)
 *
 * - 모든 요소가 IntersectionObserver 하나를 공유하고, 한 번 보이면 관찰을 끝낸다.
 * - IntersectionObserver가 없으면 바로 보이게 한다.
 * - '동작 줄이기' 설정은 main.css의 prefers-reduced-motion 블록이 처리한다.
 */
const VISIBLE_CLASS = "is-visible";

// 이미 드러난 요소. :class 바인딩이 바뀌면 Vue가 className을 통째로 덮어써
// is-visible이 사라지므로 updated 훅에서 다시 붙인다.
const revealed = new WeakSet<Element>();

const reveal = (el: Element) => {
  revealed.add(el);
  el.classList.add(VISIBLE_CLASS);
};

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  return observer;
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (typeof IntersectionObserver === "undefined") {
      reveal(el);
      return;
    }
    getObserver().observe(el);
  },
  updated(el) {
    if (revealed.has(el)) el.classList.add(VISIBLE_CLASS);
  },
  unmounted(el) {
    observer?.unobserve(el);
    revealed.delete(el);
  },
};
