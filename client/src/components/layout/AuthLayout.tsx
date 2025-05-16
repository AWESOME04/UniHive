import { useState, useEffect, useCallback, ReactNode, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ScrollRestoration from '../ui/ScrollRestoration';
import Footer from './Footer';

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

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Cursor light effect - using CSS variables instead of inline styles */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 opacity-70 hidden md:block cursor-light"
      />
      
      {/* Background elements - added contain property for performance */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob contain-paint"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 contain-paint"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 contain-paint"></div>
      
      {/* Auth layout structure */}
      <div className="flex flex-col min-h-screen">
        {/* Simple Navbar for Auth Pages */}
        <header className={`bg-white py-4 px-4 md:px-8 ${isScrolled ? 'shadow-md' : 'shadow-sm'} fixed top-0 left-0 right-0 z-50 transition-shadow duration-300`}>
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <img src="/unihive-no-text.svg" alt="UniHive Logo" className="h-10 w-10 mr-2" />
                <span className="text-xl font-bold"><span className="text-primary">Uni</span><span className="text-secondary">Hive</span></span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-secondary transition-default px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-dark-orange transition-default">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="flex-1 flex flex-col items-center justify-center mt-8 sm:mt-0">
            <ScrollRestoration />
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(AuthLayout);
