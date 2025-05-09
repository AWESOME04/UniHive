import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  MessageSquare, 
  Bookmark, 
  Search, 
  LogOut, 
  Settings, 
  ChevronRight, 
  Columns,
  X,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../shared/Logo';

// Define interface for navigation items
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  path?: string; // Optional path property for backward compatibility
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  isMobile: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  toggleCollapsed,
  isMobile,
}) => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  // Define navigation items based on our interface
  const mainNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={20} />
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: <User size={20} />
    },
    {
      name: 'Hives',
      href: '/dashboard/hives',
      icon: <Columns size={20} />
    },
    {
      name: 'Messages',
      href: '/dashboard/messages',
      icon: <MessageSquare size={20} />
    },
    {
      name: 'Payments',
      href: '/dashboard/payments',
      icon: <DollarSign size={20} />
    }
  ];

  const secondaryNavigation: NavigationItem[] = [
    {
      name: 'Saved Posts',
      href: '/dashboard/saved-jobs',
      icon: <Bookmark size={20} />
    },
    {
      name: 'Find Jobs',
      href: '/dashboard/search',
      icon: <Search size={20} />
    }
  ];

  const utilityNavigation: NavigationItem[] = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings size={20} />
    },
    {
      name: 'Log Out',
      href: '/logout',
      icon: <LogOut size={20} />
    }
  ];

  // Check if an item's href matches the current path
  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      // Only match exactly for the dashboard path to avoid it being always selected
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Handle logout
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.aside
            className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
              isCollapsed ? 'w-20' : 'w-64'
            }`}
            initial={{ x: isMobile ? -320 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -320 : 0, opacity: isMobile ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sidebar header */}
            <div className={`px-4 py-5 flex items-center justify-between border-b border-gray-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}>
              {!isCollapsed ? (
                <>
                  <Logo />
                  {isMobile && (
                    <button 
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X size={24} />
                    </button>
                  )}
                </>
              ) : (
                <Logo />
              )}

              {!isMobile && !isCollapsed && (
                <button
                  onClick={toggleCollapsed}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Nav sections */}
            <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
              <div className="space-y-6">
                {/* Main Navigation */}
                <div>
                  {!isCollapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</div>}
                  <nav className="space-y-1">
                    {mainNavigation.map((item) => {
                      const isItemActive = isActive(item.href);

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                            isItemActive
                              ? 'bg-secondary text-white font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`${isItemActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="ml-3">{item.name}</span>}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                {/* Secondary Navigation */}
                <div>
                  {!isCollapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Discover</div>}
                  <nav className="space-y-1">
                    {secondaryNavigation.map((item) => {
                      const isItemActive = isActive(item.href);

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                            isItemActive
                              ? 'bg-secondary text-white font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`${isItemActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="ml-3">{item.name}</span>}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                {/* Utility Navigation */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  {!isCollapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Settings</div>}
                  <nav className="space-y-1">
                    {utilityNavigation.map((item) => {
                      const isItemActive = isActive(item.href);

                      return item.href === '/logout' ? (
                        <a
                          key={item.name}
                          href="#"
                          onClick={handleLogout}
                          className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group text-gray-700 hover:bg-gray-100`}
                        >
                          <span className="text-gray-500 group-hover:text-gray-700">
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="ml-3">{item.name}</span>}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                            isItemActive
                              ? 'bg-secondary text-white font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`${isItemActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="ml-3">{item.name}</span>}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
            
            {/* User profile section at bottom */}
            <div className={`p-3 border-t border-gray-200 ${isCollapsed ? 'flex justify-center' : ''}`}>
              {!isCollapsed ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user?.name || 'User'} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-secondary text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user?.name || 'User'} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-secondary text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
