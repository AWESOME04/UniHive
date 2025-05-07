import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and provide information about scroll state
 * Useful for implementing UI elements that change based on scroll position
 */
export function useScrollBehavior(threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Throttle scroll events for better performance
  const throttle = (callback: Function, delay: number) => {
    let previousCall = 0;
    return (...args: any[]) => {
      const now = new Date().getTime();
      if (now - previousCall < delay) {
        return;
      }
      previousCall = now;
      return callback(...args);
    };
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      const position = window.scrollY;
      setScrollPosition(position);
      setIsScrolled(position > threshold);
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return {
    isScrolled,
    scrollPosition,
    scrollToTop,
  };
}
