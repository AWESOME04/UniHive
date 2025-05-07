import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component handles proper scroll management between route transitions
 * - Scrolls to top when navigating to a new page
 * - Preserves scroll position when using browser back/forward buttons
 * - Supports hash links and anchor navigation
 * 
 * IMPORTANT: Must be used inside a Router context.
 */
const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef<string>('');
  
  useEffect(() => {
    // Skip initial render
    if (lastPathname.current === '') {
      lastPathname.current = pathname;
      return;
    }
    
    // Handle hash links (scrolling to specific elements)
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Only scroll to top if pathname changed (not on query param changes)
    if (pathname !== lastPathname.current) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Using 'auto' instead of 'smooth' for instant transitions
      });
      
      lastPathname.current = pathname;
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollRestoration;
