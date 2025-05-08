import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo, 
  MessageSquare, 
  UserRound, 
  Bookmark, 
  PlusCircle, 
  Bell, 
  Settings, 
  CircleHelp,
  Users,
  X,
  Wallet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, isMobile, onClose }: DashboardSidebarProps) => {
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
        { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={20} />, badge: 2 }
      ]
    },
    {
      section: 'Account',
      items: [
        { name: 'Profile', path: '/dashboard/profile', icon: <UserRound size={20} /> },
        { name: 'Saved', path: '/dashboard/saved-jobs', icon: <Bookmark size={20} /> },
        { name: 'Post Task', path: '/dashboard/add-job', icon: <PlusCircle size={20} /> },
        { name: 'Earnings', path: '/dashboard/earnings', icon: <Wallet size={20} /> },
        { name: 'Notifications', path: '/dashboard/notifications', icon: <Bell size={20} />, badge: 3 }
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

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${!isMobile && 'lg:translate-x-0'}`}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center text-white font-bold text-lg">
              UH
            </div>
            <span className="font-bold text-lg">
              <span className="text-primary">Uni</span>
              <span className="text-secondary">Hive</span>
            </span>
          </Link>
          
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* User info */}
        {user && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-light-orange flex items-center justify-center">
                <UserRound size={20} className="text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                {/* Use proper name property */}
                <p className="font-medium text-sm truncate">{user.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || 'student@example.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="px-4 py-2 h-[calc(100vh-13rem)] overflow-y-auto">
          {navItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                        isActive(item.path)
                          ? 'bg-secondary text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-secondary'}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className={`ml-auto rounded-full text-xs w-5 h-5 flex items-center justify-center ${
                          isActive(item.path) 
                            ? 'bg-white text-secondary' 
                            : 'bg-secondary text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
