/**
 * ScrollManager - Centralized scroll behavior management
 * Handles all scroll-related functionality for the application
 */

// Scroll to top of the page with configurable behavior
export const scrollToTop = (options: { behavior: ScrollBehavior } = { behavior: 'smooth' }) => {
  try {
    // Try to use modern scrollTo with options
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: options.behavior
    });
  } catch (error) {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
};

// Scroll to a specific element by ID
export const scrollToElement = (
  elementId: string, 
  options: { 
    behavior?: ScrollBehavior,
    offset?: number, 
    delay?: number 
  } = { behavior: 'smooth', offset: 0, delay: 0 }
) => {
  const { behavior = 'smooth', offset = 0, delay = 0 } = options;
  
  setTimeout(() => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    } catch (error) {
      // Fallback for older browsers
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView();
    }
  }, delay);
};

// Disable scroll on body (useful for modals)
export const disableScroll = () => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
};

// Re-enable scroll on body
export const enableScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
};

// Check if user has scrolled past a certain threshold
export const hasScrolledPast = (threshold: number): boolean => {
  return window.scrollY > threshold;
};

// Force scroll reset on page load
export const forceScrollReset = () => {
  // First try to scroll immediately
  scrollToTop({ behavior: 'auto' });
  
  // Then ensure it's at the top after render
  setTimeout(() => {
    scrollToTop({ behavior: 'auto' });
  }, 0);
  
  // Additional check after a slight delay to handle heavy content
  setTimeout(() => {
    scrollToTop({ behavior: 'auto' });
  }, 100);
  
  // Final check after all content is loaded
  window.addEventListener('load', () => {
    scrollToTop({ behavior: 'auto' });
  }, { once: true });
  
  // Handle potential race conditions with animation frames
  requestAnimationFrame(() => {
    scrollToTop({ behavior: 'auto' });
  });
};

// Handle hash navigation with proper offset for fixed header
export const handleHashNavigation = (hash: string, headerOffset: number = 70) => {
  if (!hash) return;
  
  const id = hash.replace('#', '');
  
  // Try multiple times with increasing delays to ensure the element is in the DOM
  scrollToElement(id, { offset: headerOffset, delay: 50 });
  scrollToElement(id, { offset: headerOffset, delay: 150 });
  scrollToElement(id, { offset: headerOffset, delay: 300 });
};

// Prevent scroll jank during page transitions
export const preventScrollJank = () => {
  // Store current scroll position
  const scrollPosition = window.scrollY;
  
  // Temporarily disable smooth scrolling
  document.documentElement.style.scrollBehavior = 'auto';
  
  // Re-enable smooth scrolling after a short delay
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, 50);
  
  return scrollPosition;
};

// Fix for iOS Safari scroll issues
export const fixIOSScrollIssues = () => {
  // iOS Safari has issues with overflow and position:fixed elements
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  
  if (isIOS) {
    document.documentElement.classList.add('ios-device');
    
    // Fix for momentum scrolling issues
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) return; // Allow pinch zoom
    }, { passive: true });
  }
};
