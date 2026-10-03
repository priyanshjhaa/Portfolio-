'use client';

import { useEffect } from 'react';

/**
 * Fades `[data-reveal]` elements in once as they enter the viewport.
 * Content stays fully visible without JavaScript or with reduced motion,
 * because the hidden state only applies once `js-reveal` is added here.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    // Anything already on screen shows immediately, so nothing flashes.
    targets.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add('is-visible');
    });
    root.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((element) => {
      if (!element.classList.contains('is-visible')) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);

  return null;
}
