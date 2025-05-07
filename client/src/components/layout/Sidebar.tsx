import { Link, useLocation } from 'react-router-dom';
import { 
  CircleHelp, 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  UserRound, 
  Users, 
  MessageSquare, 
  Bookmark, 
  Search, 
  PlusCircle,
  Briefcase,
  GraduationCap,
  Bell,
  X
} from 'lucide-react';
import { useAppSelector } from '../../store';
import { RootState } from '../../store';

interface SidebarProps {
  isOpen?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = true, isMobile = false, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Browse Tasks', path: '/tasks', icon: <ListTodo size={20} /> },
    { name: 'Find Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Search', path: '/search', icon: <Search size={20} /> },
    { name: 'Messages', path: '/messaging', icon: <MessageSquare size={20} /> },
  ];

  const userNavItems = [
    { name: 'My Profile', path: '/profile', icon: <UserRound size={20} /> },
    { name: 'Saved Jobs', path: '/saved-jobs', icon: <Bookmark size={20} /> },
    { name: 'Post a Task', path: '/add-job', icon: <PlusCircle size={20} /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={20} /> },
  ];

  const otherNavItems = [
    { name: 'Community', path: '/users', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help Center', path: '/help', icon: <CircleHelp size={20} /> },
  ];

  // Early return when closed and on mobile
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-md py-6 overflow-y-auto z-40 transition-all duration-300
      ${isMobile ? 'block' : 'hidden md:block'}
      ${isMobile && isOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''}
    `}>
      {isMobile && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      )}
      <div className="px-6 mb-6">
        <Link to="/" className="flex items-center">
          <img src="/unihive-no-text.svg" alt="UniHive Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold"><span className="text-primary">Uni</span><span className="text-secondary">Hive</span></span>
        </Link>
        {user && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-light-orange flex items-center justify-center">
              <UserRound size={20} className="text-secondary" />
            </div>
            <div>
              <p className="font-medium text-sm">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email || 'student@example.com'}</p>
            </div>
          </div>
        )}
      </div>
      
      <nav className="flex flex-col">
        <div className="px-6 mb-2">
          <h2 className="text-xs uppercase font-semibold text-gray-500">Main</h2>
        </div>
        <ul className="space-y-1 mb-6">
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-2.5 rounded-lg transition-default ${
                  isActive(item.path)
                    ? 'bg-light-orange text-secondary font-medium'
                    : 'text-gray-700 hover:bg-light-orange/50 hover:text-secondary'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.name === 'Messages' && (
                  <span className="ml-auto bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 mb-2">
          <h2 className="text-xs uppercase font-semibold text-gray-500">Your Account</h2>
        </div>
        <ul className="space-y-1 mb-6">
          {userNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-2.5 rounded-lg transition-default ${
                  isActive(item.path)
                    ? 'bg-light-orange text-secondary font-medium'
                    : 'text-gray-700 hover:bg-light-orange/50 hover:text-secondary'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.name === 'Notifications' && (
                  <span className="ml-auto bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 mb-2">
          <h2 className="text-xs uppercase font-semibold text-gray-500">More</h2>
        </div>
        <ul className="space-y-1">
          {otherNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-2.5 rounded-lg transition-default ${
                  isActive(item.path)
                    ? 'bg-light-orange text-secondary font-medium'
                    : 'text-gray-700 hover:bg-light-orange/50 hover:text-secondary'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 mt-8">
        <div className="bg-light-orange/30 p-4 rounded-xl">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white mb-3">
            <GraduationCap size={20} />
          </div>
          <h3 className="font-medium mb-1">Earn while you learn</h3>
          <p className="text-sm text-gray-600 mb-3">Post your first task and start earning today!</p>
          <Link 
            to="/add-job" 
            className="text-secondary text-sm font-medium hover:underline flex items-center"
          >
            Get Started
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
