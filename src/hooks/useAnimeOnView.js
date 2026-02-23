import { useRef, useEffect, useCallback } from 'react';
import { animate, stagger } from 'animejs';

/**
 * useAnimeOnView — Triggers Anime.js v4 animations when an element enters the viewport.
 *
 * @param {object|function} animeConfig - Anime.js config object or function(el) => config
 * @param {object}          options     - { once: true, threshold: 0.2, rootMargin: '0px' }
 * @returns {React.RefObject}
 */
const useAnimeOnView = (animeConfig, options = {}) => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const animationRef = useRef(null);

  const { once = true, threshold = 0.2, rootMargin = '0px' } = options;

  const runAnimate = useCallback(() => {
    if (!ref.current) return;
    if (once && hasAnimated.current) return;

    const config = typeof animeConfig === 'function'
      ? animeConfig(ref.current)
      : { ...animeConfig, targets: animeConfig.targets || ref.current };

    animationRef.current = animate(config.targets, config);
    hasAnimated.current = true;
  }, [animeConfig, once]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimate();
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runAnimate, once, threshold, rootMargin]);

  return ref;
};

/**
 * animeStagger — Helper to create staggered child animations.
 */
export const animeStagger = (parentEl, selector, config, staggerMs = 50) => {
  if (!parentEl) return null;
  const targets = parentEl.querySelectorAll(selector);
  if (!targets.length) return null;

  return animate(targets, {
    delay: stagger(staggerMs),
    ...config,
  });
};

/**
 * animeCounter — Animate a number from startVal to endVal.
 */
export const animeCounter = (el, endVal, duration = 1200, startVal = 0) => {
  if (!el) return null;
  const obj = { val: startVal };
  return animate(obj, {
    val: endVal,
    duration,
    ease: 'outExpo',
    round: 1,
    onUpdate: () => {
      el.textContent = Math.round(obj.val);
    },
  });
};

export default useAnimeOnView;
