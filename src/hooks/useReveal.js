import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches IntersectionObserver to trigger reveal animations.
 * Adds class `reveal-active` when the element enters the viewport.
 *
 * @param {object} options
 * @param {number}  options.threshold - 0–1, how much of the element must be visible (default 0.15)
 * @param {string}  options.rootMargin - CSS margin string (default '0px')
 * @param {boolean} options.once - Only animate once (default true)
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('reveal-active');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          entry.target.classList.remove('reveal-active');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * useRevealGroup — Staggered reveal for a list of child elements.
 * Each child with class `reveal-item` gets staggered entry via CSS delay vars.
 *
 * @param {object} options - same as useReveal
 */
export function useRevealGroup({ threshold = 0.1, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.classList.add('reveal-active');
      container.querySelectorAll('.reveal-item').forEach((el) =>
        el.classList.add('reveal-active')
      );
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
            el.style.transitionDelay = `${i * 60}ms`;
            el.classList.add('reveal-active');
          });
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
