import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';

interface DashboardLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  showFooter = false 
}) => {
  const { user: authUser } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Listen for window resize to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Try to get the user profile from the API
        const response = await userService.getCurrentUserProfile();
        
        if (response.status === 'success' && response.data) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Combine user data from auth context and profile API
  const user = userProfile || authUser || {
    name: "Student",
    email: "student@university.edu.gh",
    university: "University of Ghana"
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${
        !isMobile && (sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64')
      }`}>
        {/* Dashboard Navbar */}
        <DashboardNavbar 
          user={user} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        {/* Page content */}
        <motion.main 
          className="min-h-[calc(100vh-64px)]"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>

        {/* Optional Footer */}
        {showFooter && (
          <footer className="bg-white py-4 px-6 border-t border-gray-200 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} UniHive. All rights reserved.
          </footer>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
