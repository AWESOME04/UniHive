import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  MessageSquare, 
  LogOut, 
  User, 
  Settings, 
  HelpCircle,
  X,
  Check,
  Clock,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface DashboardNavbarProps {
  user: any;
  onMenuClick: () => void;
}

const DashboardNavbar = ({ user, onMenuClick }: DashboardNavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState(['web development', 'data entry', 'content writing']);
  
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New message from John',
      description: 'Hey, I wanted to discuss the project...',
      time: '2 min ago',
      read: false,
      type: 'message'
    },
    {
      id: 2,
      title: 'Task application approved',
      description: 'Your application for "Web Development" has been approved',
      time: '1 hour ago',
      read: false,
      type: 'task'
    },
    {
      id: 3,
      title: 'Payment received',
      description: 'You received ₵200 for completing "Data Entry" task',
      time: '5 hours ago',
      read: true,
      type: 'payment'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.2,
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const mobileSearchVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 500, damping: 30 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-30 sticky top-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <motion.button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={onMenuClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
            
            {/* Search bar - desktop */}
            <div className="hidden md:block ml-4 lg:ml-6" ref={searchRef}>
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search tasks, users, or skills..."
                      className="block w-full lg:w-64 xl:w-80 bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={() => setSearchOpen(true)}
                    />
                  </div>
                </form>
                
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div 
                      className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {recentSearches.length > 0 && (
                        <>
                          <h4 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">Recent Searches</h4>
                          {recentSearches.map((search, index) => (
                            <div 
                              key={index}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                              onClick={() => {
                                setSearchQuery(search);
                                navigate(`/dashboard/search?q=${encodeURIComponent(search)}`);
                                setSearchOpen(false);
                              }}
                            >
                              <Clock size={14} className="text-gray-400 mr-2" />
                              <span className="text-sm">{search}</span>
                            </div>
                          ))}
                          <div className="border-t border-gray-100 my-1"></div>
                        </>
                      )}
                      <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate('/dashboard/search')}
                      >
                        <span className="text-sm text-secondary font-medium">Advanced Search</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={() => setSearchOpen(!searchOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={20} />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/dashboard/messages" className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 block">
                <MessageSquare size={20} />
                <motion.span 
                  className="absolute top-0 right-0 h-4 w-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  2
                </motion.span>
              </Link>
            </motion.div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <motion.button
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={20} />
                <motion.span 
                  className="absolute top-0 right-0 h-4 w-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  3
                </motion.span>
              </motion.button>

              {/* Notifications dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <Link to="/dashboard/notifications" className="text-secondary text-sm hover:underline">
                        View all
                      </Link>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 border-l-2 ${
                            notification.read ? 'border-transparent' : 'border-secondary'
                          }`}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex">
                            <div className={`mr-3 p-2 rounded-full ${
                              notification.type === 'message' ? 'bg-blue-100 text-blue-500' :
                              notification.type === 'task' ? 'bg-green-100 text-green-500' :
                              'bg-secondary/10 text-secondary'
                            }`}>
                              {notification.type === 'message' ? <MessageSquare size={16} /> :
                              notification.type === 'task' ? <Bell size={16} /> :
                              <Bell size={16} />}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <motion.button 
                                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Check size={16} />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <motion.button
                className="flex items-center space-x-2"
                onClick={() => setProfileOpen(!profileOpen)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 rounded-full bg-light-orange flex items-center justify-center">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-secondary" />
                  )}
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {user?.name || 'Student'}
                  </span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </div>
              </motion.button>

              {/* Profile dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name || 'Student'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || 'student@university.edu'}</p>
                    </div>
                    
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={16} className="mr-2 text-gray-500" />
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings size={16} className="mr-2 text-gray-500" />
                      Settings
                    </Link>
                    <Link 
                      to="/dashboard/help" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HelpCircle size={16} className="mr-2 text-gray-500" />
                      Help Center
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="p-4 border-t border-gray-200 md:hidden overflow-hidden"
            variants={mobileSearchVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks, users, or skills..."
                  className="block w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-10 py-2 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <motion.button
                    type="button"
                    className="p-2 text-gray-400"
                    onClick={() => setSearchOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>
            </form>
            
            {recentSearches.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Recent</h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full"
                      onClick={() => {
                        setSearchQuery(search);
                        navigate(`/dashboard/search?q=${encodeURIComponent(search)}`);
                        setSearchOpen(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardNavbar;
