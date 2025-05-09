import { Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

interface NavbarProps {
  user?: any;
  onMenuClick?: () => void;
}

const Navbar = ({ user: propUser, onMenuClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, logout } = useAuth();
  
  // Use prop user if provided, otherwise use the one from auth context
  const user = propUser || authUser;

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileMenu = document.getElementById('profile-menu');
      if (profileMenu && !profileMenu.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    // Call logout function from AuthContext
    logout();
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <nav className={`bg-white border-b border-gray-100 fixed top-0 w-full z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''} overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src="/unihive-no-text.svg" alt="UniHive Logo" className="h-10 w-10 mr-2" />
                <span className="text-2xl font-bold text-primary">Uni<span className="text-secondary">Hive</span></span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  location.pathname === '/'
                    ? 'border-secondary text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${
                  location.pathname === '/about'
                    ? 'border-secondary text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`${
                  location.pathname === '/contact'
                    ? 'border-secondary text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                {/* Profile dropdown */}
                <div className="ml-3 relative" id="profile-menu">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      {user?.avatarUrl ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatarUrl}
                          alt={user.name || "User profile"}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                          <User size={16} />
                        </div>
                      )}
                    </button>
                  </div>

                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Menu toggle for mobile */}
            <button
              className="mr-2 lg:hidden"
              onClick={onMenuClick || (() => setIsMenuOpen(!isMenuOpen))}
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === '/about'
                  ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === '/contact'
                  ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`${
                    location.pathname === '/dashboard'
                      ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/search"
                  className={`${
                    location.pathname === '/search'
                      ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/messages"
                  className={`${
                    location.pathname === '/messages'
                      ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Messages
                </Link>
                <Link
                  to="/notifications"
                  className={`${
                    location.pathname === '/notifications'
                      ? 'bg-secondary bg-opacity-10 border-secondary text-secondary'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Notifications
                </Link>
              </>
            )}
          </div>
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {user?.avatarUrl ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatarUrl}
                      alt={user.username || "User profile"}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center">
                      <User size={20} />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.username || "User"}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email || ""}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  to="/saved-jobs"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Saved Jobs
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2 text-base font-medium bg-secondary text-white hover:bg-opacity-90 rounded-md"
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
