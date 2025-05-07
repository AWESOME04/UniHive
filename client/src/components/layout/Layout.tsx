import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import ScrollRestoration from '../ui/ScrollRestoration';
import { useAppSelector } from '../../store';
import { RootState } from '../../store';

// Helper function to throttle events
const throttle = (callback: Function, delay: number) => {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
};

function Layout() {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Use CSS variables for cursor position to avoid inline style re-renders
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-x', `${cursorPosition.x}px`);
    document.documentElement.style.setProperty('--cursor-y', `${cursorPosition.y}px`);
  }, [cursorPosition]);

  // Optimize mouse move handler with useCallback and throttling
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 50), // Throttle to 50ms (20 updates per second)
    []
  );
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Memoize the main content class to prevent unnecessary re-renders
  const mainContentClass = useMemo(() => 
    `flex-1 transition-all duration-300 pt-16 ${isAuthenticated ? 'ml-0 md:ml-64' : ''}`,
    [isAuthenticated]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cursor light effect - using CSS variables instead of inline styles */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 opacity-70 hidden md:block cursor-light"
      />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Background elements - added contain property for performance */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob contain-paint"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 contain-paint"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 contain-paint"></div>
      
      {/* Main layout structure */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar />}
          <main className={mainContentClass}>
            <ScrollRestoration />
            <Outlet />
            
            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Layout);
