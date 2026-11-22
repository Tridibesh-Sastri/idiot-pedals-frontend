import React, { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences and skip smooth-scroll libraries on mobile/touch
    // devices (native momentum scrolling is faster and avoids main-thread INP overhead).
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    let cancelled = false;
    let rafId = 0;
    let destroyLenis: (() => void) | undefined;

    // Dynamically import Lenis off the critical bundle on desktop only.
    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 0.85,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      const raf = (time: number) => {
        if (cancelled) return;
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
      destroyLenis = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      destroyLenis?.();
    };
  }, []);

  return <>{children}</>;
}
