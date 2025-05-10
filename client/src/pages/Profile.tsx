import { useState, useEffect } from 'react';
import { 
  Camera, Edit, GraduationCap, Mail, MapPin, Shield, 
  User, Check, Star, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  university?: string;
  profileImage?: string | null;
  bio?: string | null;
  rating?: number;
  isVerified?: boolean;
  createdAt?: string;
}

interface FallbackProfile {
  name: string;
  email: string;
  university: string;
  profileImage: null;
  bio: null;
  rating: number;
  isVerified: boolean;
  createdAt: string;
}

function Profile() {
  const { user: authUser } = useAuth();
  const [, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api'}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'success' && data.data) {
            setProfileData(data.data);
          }
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Define fallback profile with all required properties
  const fallbackProfile: FallbackProfile = {
    name: "Student",
    email: "student@university.edu.gh",
    university: "University of Ghana",
    profileImage: null,
    bio: null,
    rating: 0,
    isVerified: false,
    createdAt: new Date().toISOString()
  };

  // Combine data from auth context and profile API
  const user = profileData || (authUser as UserProfile) || fallbackProfile;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-secondary">
                    {user.name ? user.name.charAt(0) : "U"}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
                <Camera size={16} className="text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600 flex items-center text-sm">
                    <Mail size={14} className="mr-1" /> {user.email}
                  </p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-2 sm:mt-0 flex items-center text-secondary hover:text-secondary-dark text-sm font-medium"
                >
                  <Edit size={16} className="mr-1" /> Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <GraduationCap size={16} className="text-secondary mr-2" />
                  <span className="text-gray-700">{user.university}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="text-secondary mr-2" />
                  <span className="text-gray-700">
                    {user.isVerified ? (
                      <span className="flex items-center text-green-600">
                        <Check size={14} className="mr-1" /> Verified Account
                      </span>
                    ) : "Unverified Account"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-secondary mr-2" />
                  <span className="text-gray-700">Rating: {user.rating || '0'}/5</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-secondary mr-2" />
                  <span className="text-gray-700">Joined: {
                    user.createdAt ? 
                      new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric', 
                        month: 'long'
                      }) : 
                      "Recently"
                  }</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-secondary text-secondary font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`pb-4 px-1 ${
                  activeTab === 'activity'
                    ? 'border-b-2 border-secondary text-secondary font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Activity
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 px-1 ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-secondary text-secondary font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Bio</h3>
                <p className="text-gray-600">
                  {user.bio || "No bio provided yet. Edit your profile to add a bio."}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Mail size={16} className="text-secondary mr-3" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-secondary mr-3" />
                    <span className="text-gray-600">{user.university}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Account Settings</h3>
                <div className="space-y-3">
                  <Link to="/settings/profile" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">Edit Profile</span>
                    <Edit size={16} className="text-gray-500" />
                  </Link>
                  <Link to="/settings/security" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">Security Settings</span>
                    <Shield size={16} className="text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div className="text-center py-8">
              <User size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Activity history will appear here</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <Star size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No reviews yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
