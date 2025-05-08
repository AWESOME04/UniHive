import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  MessageSquare, 
  LogOut, 
  User, 
  Settings, 
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';

interface DashboardNavbarProps {
  user: any;
  onMenuClick: () => void;
}

const DashboardNavbar = ({ user, onMenuClick }: DashboardNavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would implement actual dark mode toggle logic
  };

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={onMenuClick}
            >
              <Menu size={24} />
            </button>
            
            {/* Search bar - desktop */}
            <div className="hidden md:block ml-4 lg:ml-6">
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search button - mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>

            {/* Theme toggle */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Messages */}
            <Link to="/messaging" className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500">
              <MessageSquare size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full">
                2
              </span>
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <Link to="/notifications" className="text-secondary text-sm hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 border-l-2 ${
                          notification.read ? 'border-transparent' : 'border-secondary'
                        }`}
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-2"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-light-orange flex items-center justify-center">
                  <User size={18} className="text-secondary" />
                </div>
                <span className="hidden lg:block text-sm font-medium">
                  {user?.username || 'Student'}
                </span>
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <User size={16} className="mr-2 text-gray-500" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Settings size={16} className="mr-2 text-gray-500" />
                    Settings
                  </Link>
                  <Link 
                    to="/help" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <HelpCircle size={16} className="mr-2 text-gray-500" />
                    Help Center
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link 
                    to="/logout" 
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;
