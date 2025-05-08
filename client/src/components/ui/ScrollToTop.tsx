import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useScrollBehavior } from '../../hooks/useScrollBehavior';

const ScrollToTop: React.FC = () => {
  const { isScrolled, scrollToTop } = useScrollBehavior(300);
  const [isScrolling, setIsScrolling] = useState(false);
  
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
    scrollToTop();
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };
  
  // Manage focus trap when visible
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isScrolled) {
        const button = document.getElementById('scroll-to-top-button');
        button?.blur();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isScrolled]);

  return (
    <button
      id="scroll-to-top-button"
      onClick={handleScrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top of page"
      tabIndex={isScrolled ? 0 : -1}
      className={`fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 
        ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        ${isScrolling ? 'animate-pulse' : ''}
        hover:bg-dark-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;
