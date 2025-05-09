import React, { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { scrollToTop, hasScrolledPast } from '../../utils/scrollManager';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  
  // Check scroll position with throttling
  const handleScroll = useCallback(() => {
    setIsVisible(hasScrolledPast(300));
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScrollToTop();
    }
  };
  
  // Enhanced scroll to top with feedback
  const handleScrollToTop = () => {
    setIsScrolling(true);
    
    // Use the scroll manager to scroll to top
    scrollToTop({ behavior: 'smooth' });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };
  
  // Manage focus trap when visible
  // Reset scroll position when route changes
  useEffect(() => {
    setIsScrolling(false);
  }, [location.pathname]);
  
  // Set up scroll event listener
  useEffect(() => {
    // Add throttled scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        const button = document.getElementById('scroll-to-top-button');
        button?.blur();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  return (
    <button
      id="scroll-to-top-button"
      onClick={handleScrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top of page"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        ${isScrolling ? 'animate-pulse' : ''}
        hover:bg-dark-orange hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;
