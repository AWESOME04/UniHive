import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

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

function NotFound() {
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Cursor light effect - using CSS variables instead of inline styles */}
      <div className="pointer-events-none fixed inset-0 z-10 opacity-70 hidden md:block cursor-light" />
      
      {/* Background elements - added contain property for performance */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob contain-paint"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 contain-paint"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 contain-paint"></div>
      
      <div className="max-w-lg w-full relative z-20">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl-soft p-12 border border-white/20 relative overflow-hidden optimize-gpu">
          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5 contain-paint"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5 contain-paint"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-32 h-32 mx-auto mb-6 relative contain-layout">
              <div className="absolute inset-0 bg-secondary/10 rounded-full animate-ping opacity-75 contain-paint"></div>
              <div className="relative bg-secondary text-white text-9xl font-bold rounded-full flex items-center justify-center h-full w-full">
                4
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mb-8">
              <div className="w-16 h-16 bg-secondary text-white text-4xl font-bold rounded-full flex items-center justify-center optimize-gpu">
                0
              </div>
              <div className="w-16 h-16 bg-secondary text-white text-4xl font-bold rounded-full flex items-center justify-center optimize-gpu">
                4
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-primary mb-4">Page not found</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary flex items-center justify-center py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] relative overflow-hidden group optimize-gpu"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white group-hover:translate-x-0 opacity-20 contain-paint"></span>
                <Home size={20} className="mr-2" />
                <span className="relative">Return to Homepage</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn-secondary flex items-center justify-center py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] optimize-gpu"
              >
                <ArrowLeft size={20} className="mr-2" />
                Go Back
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500">
          <p>Looking for something specific? Try using the navigation menu above.</p>
        </div>
      </div>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(NotFound);
