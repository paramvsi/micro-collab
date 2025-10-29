"use client";

import { useEffect, useState } from "react";

/**
 * useReducedMotion Hook
 *
 * Detects user's reduced motion preference for accessibility.
 * Returns true if user prefers reduced motion (prefers-reduced-motion: reduce).
 *
 * Usage:
 * ```tsx
 * const shouldReduceMotion = useReducedMotion();
 * return shouldReduceMotion ? <StaticComponent /> : <AnimatedComponent />;
 * ```
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if the browser supports matchMedia
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setShouldReduceMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return shouldReduceMotion;
}
