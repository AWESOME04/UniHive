import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  Briefcase,
  UserRound, 
  Bookmark, 
  PlusCircle,
  Settings, 
  CircleHelp,
  Users,
  X,
  BarChart3,
  Wallet,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.svg'

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const DashboardSidebar = ({ 
  isOpen, 
  isMobile, 
  onClose, 
  isCollapsed, 
  toggleCollapsed 
}: DashboardSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, onClose]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      section: 'Main',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Tasks', path: '/dashboard/tasks', icon: <ListTodo size={20} /> },
        { name: 'Jobs', path: '/dashboard/jobs', icon: <Briefcase size={20} /> },
        { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 size={20} /> },
      ]
    },
    {
      section: 'Account',
      items: [
        { name: 'Profile', path: '/dashboard/profile', icon: <UserRound size={20} /> },
        { name: 'Saved', path: '/dashboard/saved-jobs', icon: <Bookmark size={20} /> },
        { name: 'Post Task', path: '/dashboard/add-job', icon: <PlusCircle size={20} /> },
        { name: 'Earnings', path: '/dashboard/earnings', icon: <Wallet size={20} /> },
      ]
    },
    {
      section: 'Support',
      items: [
        { name: 'Community', path: '/dashboard/users', icon: <Users size={20} /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
        { name: 'Help Center', path: '/dashboard/help', icon: <CircleHelp size={20} /> }
      ]
    }
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: { width: '16rem', transition: { duration: 0.3 } },
    collapsed: { width: '5rem', transition: { duration: 0.3 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${!isMobile && 'lg:translate-x-0'} flex flex-col h-screen`}
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        initial={false}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!isCollapsed ? (
            <motion.div 
              className="flex items-center space-x-2"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              <Link to='/'>
                <img src={logoImg} alt="UniHive Logo" className="h-16 w-16" />
              </Link>
              
              <Link to='/'>
                <span className="font-bold text-lg">
                  <span className="text-primary">Uni</span>
                  <span className="text-secondary">Hive</span>
                </span>
              </Link>
              
            </motion.div>
          ) : (
            <>
              <Link to='/'>
                <img src={logoImg} alt="UniHive Logo" className="h-16 w-16" />
              </Link>
            </>
            
          )}
          
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}

          {!isMobile && (
            <motion.button 
              onClick={toggleCollapsed}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </motion.button>
          )}
        </div>

        {/* User info */}
        {user && (
          <div className={`px-4 py-4 border-b border-gray-200 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex ${isCollapsed ? 'flex-col' : 'items-center space-x-3'}`}>
              <div className="w-10 h-10 rounded-full bg-light-orange flex items-center justify-center flex-shrink-0">
                <UserRound size={20} className="text-secondary" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    className="flex-1 min-w-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-medium text-sm truncate">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email || 'student@example.com'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={`px-3 py-2 h-[calc(100vh-13rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${isCollapsed ? 'scrollbar-none' : ''}`}>
          {navItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <motion.h3 
                  className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {section.section}
                </motion.h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <motion.li 
                    key={item.path}
                    whileHover={{ x: isCollapsed ? 0 : 3 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                        isActive(item.path)
                          ? 'bg-secondary text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <span className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-secondary'}`}>
                        {item.icon}
                      </span>
                      
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Promo card */}
        <div className={`flex-shrink-0 p-3 mt-auto border-t border-gray-200 ${isCollapsed ? 'hidden' : 'block'}`}>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="bg-gradient-to-br from-secondary/10 to-accent-purple/10 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white mb-2">
                  <GraduationCap size={18} />
                </div>
                <h3 className="font-medium text-sm mb-1">Earn while you learn</h3>
                <p className="text-xs text-gray-600 mb-2">Post your first task and start earning today!</p>
                <Link 
                  to="/dashboard/add-job" 
                  className="text-secondary text-xs font-medium hover:underline flex items-center"
                >
                  Get Started
                  <motion.svg 
                    className="w-3 h-3 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardSidebar;
