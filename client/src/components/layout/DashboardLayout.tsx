import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Menu } from 'lucide-react';
import ScrollRestoration from '../ui/ScrollRestoration';

const DashboardLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
        setIsMobile(true);
      } else {
        setSidebarOpen(true);
        setIsMobile(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen && !isMobile ? 'lg:ml-64' : ''}`}>
        {/* Navbar */}
        <Navbar 
          user={user} 
          onMenuClick={toggleSidebar} 
        />

        {/* Scroll Restoration */}
        <ScrollRestoration />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Menu Toggle Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className={`fixed bottom-6 right-6 z-50 bg-secondary text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 ${sidebarOpen ? 'rotate-90' : ''}`}
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
