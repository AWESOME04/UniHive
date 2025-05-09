import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { forceScrollReset, handleHashNavigation, preventScrollJank, fixIOSScrollIssues } from '../../utils/scrollManager';

/**
 * Enhanced ScrollRestoration component
 * 
 * Features:
 * - Scrolls to top when navigating to a new page
 * - Preserves scroll position when using browser back/forward buttons
 * - Supports hash links and anchor navigation with header offset
 * - Uses multiple strategies to ensure reliable scrolling
 * - Handles browser history navigation properly
 * 
 * IMPORTANT: Must be used inside a Router context.
 */
const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef<string>('');
  const isInitialMount = useRef<boolean>(true);
  const isHistoryNavigation = useRef<boolean>(false);
  const scrollPositionRef = useRef<number>(0);
  
  // Track navigation type (POP means back/forward buttons)
  useEffect(() => {
    const handleNavigationType = () => {
      isHistoryNavigation.current = true;
    };
    
    window.addEventListener('popstate', handleNavigationType);
    return () => window.removeEventListener('popstate', handleNavigationType);
  }, []);
  
  // Initialize iOS scroll fixes on mount
  useEffect(() => {
    fixIOSScrollIssues();
  }, []);

  useEffect(() => {
    // Handle initial page load
    if (isInitialMount.current) {
      // Force scroll to top on initial load
      if (!hash) {
        forceScrollReset();
      } else {
        // If there's a hash on initial load, scroll to it with delay
        handleHashNavigation(hash, 70);
      }
      
      isInitialMount.current = false;
      lastPathname.current = pathname;
      return;
    }
    
    // Prevent scroll jank during transitions
    scrollPositionRef.current = preventScrollJank();
    
    // Handle hash navigation
    if (hash) {
      handleHashNavigation(hash, 70);
      return;
    }
    
    // Don't auto-scroll on history navigation (back/forward buttons)
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    
    // Only scroll to top if pathname changed (not on query param changes)
    if (pathname !== lastPathname.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        forceScrollReset();
      });
      lastPathname.current = pathname;
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollRestoration;
