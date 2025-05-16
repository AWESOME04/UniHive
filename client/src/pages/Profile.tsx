import { useState, useEffect } from 'react';
import { 
  Award, Camera, Edit, GraduationCap, Mail, MapPin, Shield, 
  Briefcase, Star, ChevronRight, MessageSquare, CheckCircle
} from 'lucide-react';
import { useAppSelector } from '../store';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    university: 'University of Ghana, Legon',
    program: 'BSc. Computer Science',
    yearOfStudy: '3rd Year',
    bio: 'Computer Science student passionate about web development and AI. Looking for side hustles in software development and tutoring.',
    skills: ['JavaScript', 'React', 'Python', 'Teaching', 'UI/UX Design']
  });

  // Add cursor light effect
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data
    setIsEditing(false);
  };

  // Sample data for portfolio and stats
  const portfolioItems = [
    { id: 1, title: 'Web Development Project', category: 'Development', rating: 4.8, reviews: 5 },
    { id: 2, title: 'Python Data Analysis', category: 'Data Science', rating: 4.9, reviews: 3 },
    { id: 3, title: 'UI/UX Design for Mobile App', category: 'Design', rating: 4.7, reviews: 4 },
  ];

  const stats = {
    tasksCompleted: 23,
    tasksCreated: 12,
    totalEarnings: 1250,
    successRate: 95,
    memberSince: 'January 15, 2025',
    lastActive: 'Today',
    points: 350,
    level: 'Silver',
    nextLevel: 'Gold',
    nextLevelPoints: 1000,
  };

  const achievements = [
    { id: 1, title: 'First Task Completed', points: 50, icon: <CheckCircle size={18} /> },
    { id: 2, title: '10 Tasks Completed', points: 100, icon: <Award size={18} /> },
    { id: 3, title: 'Perfect Rating', points: 200, icon: <Star size={18} /> },
  ];

  const renderTabs = () => {
    return (
      <div className="flex border-b overflow-x-auto hide-scrollbar mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === 'overview' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === 'portfolio' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === 'reviews' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === 'achievements' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === 'settings' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          Settings
        </button>
      </div>
    );
  };

  const renderOverviewTab = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-gray-700 mb-6">{formData.bio}</p>
            
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-light-orange text-secondary rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Link to="/tasks" className="text-secondary text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-light-orange text-secondary rounded-full mr-3">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="font-medium">Completed a Web Development task</p>
                  <p className="text-sm text-gray-500">2 days ago • Earned GH₵250</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-light-orange text-secondary rounded-full mr-3">
                  <Star size={18} />
                </div>
                <div>
                  <p className="font-medium">Received a 5-star review</p>
                  <p className="text-sm text-gray-500">3 days ago • From John D.</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-light-orange text-secondary rounded-full mr-3">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="font-medium">Posted a new task</p>
                  <p className="text-sm text-gray-500">1 week ago • Python Tutoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-semibold">{stats.tasksCompleted}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasks Created</span>
                <span className="font-semibold">{stats.tasksCreated}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Earnings</span>
                <span className="font-semibold">GH₵{stats.totalEarnings}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold">{stats.successRate}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold">{stats.memberSince}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Level & Points</h3>
            
            <div className="bg-light-orange bg-opacity-20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-3xl font-bold text-secondary">{stats.points}</p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center">
                  <span className="text-secondary font-medium text-sm">{stats.level}</span>
                </div>
              </div>
              
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div 
                  className="bg-secondary h-full" 
                  style={{ width: `${(stats.points / stats.nextLevelPoints) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-right mt-1 text-gray-600">
                {stats.points}/{stats.nextLevelPoints} to {stats.nextLevel}
              </p>
            </div>
            
            <Link to="/rewards" className="btn-secondary w-full text-center flex items-center justify-center">
              View Rewards <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderPortfolioTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Portfolio</h3>
          <button className="btn-secondary text-sm px-4 py-2">Add Project</button>
        </div>
        
        <div className="space-y-4">
          {portfolioItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-primary">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-secondary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Showcase your skills by adding more projects to your portfolio</p>
          <button className="btn-primary">Add New Project</button>
        </div>
      </div>
    );
  };

  const renderReviewsTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Reviews & Ratings</h3>
          <div className="flex items-center bg-light-orange bg-opacity-20 px-3 py-1 rounded-full">
            <Star size={16} className="text-secondary mr-1" />
            <span className="font-semibold">4.8</span>
            <span className="text-xs text-gray-500 ml-1">(12 reviews)</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                  <span>JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= 5 ? "text-yellow-500" : "text-gray-300"} 
                          fill={star <= 5 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">2 weeks ago</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Web Development</span>
            </div>
            <p className="mt-3 text-gray-700">
              Excellent work! Delivered the project ahead of schedule and was very responsive to feedback. Would definitely hire again.
            </p>
          </div>
          
          <div className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                  <span>SA</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Adams</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= 4 ? "text-yellow-500" : "text-gray-300"} 
                          fill={star <= 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">1 month ago</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Data Analysis</span>
            </div>
            <p className="mt-3 text-gray-700">
              Great analysis work! The insights provided were very helpful for our project. Communication could have been a bit more frequent.
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                  <span>MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= 5 ? "text-yellow-500" : "text-gray-300"} 
                          fill={star <= 5 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">2 months ago</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">UI/UX Design</span>
            </div>
            <p className="mt-3 text-gray-700">
              Incredible design work! The UI mockups were exactly what I was looking for. Very talented designer with great attention to detail.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAchievementsTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Achievements & Badges</h3>
          <div className="bg-light-orange bg-opacity-20 px-3 py-1 rounded-full text-sm text-secondary font-medium">
            {achievements.length} Unlocked
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {achievements.map(achievement => (
            <div key={achievement.id} className="flex items-center p-4 bg-light-orange bg-opacity-10 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-light-orange text-secondary rounded-full mr-4">
                {achievement.icon}
              </div>
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-xs text-gray-500">Earned {achievement.points} points</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Locked Achievements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-400 rounded-full mr-4">
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 className="font-medium">Communication Expert</h4>
                <p className="text-xs text-gray-500">Complete 20 tasks with 5-star communication rating</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-400 rounded-full mr-4">
                <Briefcase size={18} />
              </div>
              <div>
                <h4 className="font-medium">Work Superstar</h4>
                <p className="text-xs text-gray-500">Complete 50 tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Academic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="University of Ghana, Legon">University of Ghana, Legon</option>
                    <option value="KNUST">KNUST</option>
                    <option value="University of Cape Coast">University of Cape Coast</option>
                    <option value="Ashesi University">Ashesi University</option>
                    <option value="GIMPA">GIMPA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program
                  </label>
                  <input
                    type="text"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Bio</h4>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="form-input w-full"
                placeholder="Tell others about yourself..."
              />
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Python', 'Teaching', 'UI/UX Design', 'Content Writing', 'Photography', 'Event Planning'].map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.skills.includes(skill) 
                        ? 'bg-secondary text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen pb-12 relative overflow-hidden">
      {/* Cursor light effect */}
      <div 
        className="pointer-events-none absolute -inset-40 opacity-20 bg-gradient-radial from-primary to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: '80vw',
          height: '80vw',
          transition: 'left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      ></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-light-orange opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Profile header with cover image */}
            <div className="h-48 bg-gradient-to-r from-light-orange to-secondary relative">
              <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all">
                <Camera size={18} className="text-secondary" />
              </button>
            </div>
            
            <div className="px-6 sm:px-8 pb-8 relative">
              {/* Profile picture */}
              <div className="absolute -top-16 left-8 flex items-end">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
                    <span className="text-white text-3xl font-bold">{(user?.username || 'U').charAt(0)}</span>
                    <button className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
                      <Camera size={24} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="ml-4 mb-4">
                  <h2 className="text-2xl font-bold text-primary">{user?.username || 'Student'}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail size={16} className="mr-2" />
                    <span>{user?.email || 'student@example.com'}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <GraduationCap size={16} className="mr-2" />
                    <span>{formData.program} • {formData.yearOfStudy}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-2" />
                    <span>{formData.university}</span>
                  </div>
                </div>
              </div>
              
              {/* Edit profile button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center"
                >
                  <Edit size={16} className="mr-2" /> Edit Profile
                </button>
              </div>
              
              {isEditing ? (
                <form className="mt-20" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Academic Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            University
                          </label>
                          <select
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                            className="form-input"
                          >
                            <option value="University of Ghana, Legon">University of Ghana, Legon</option>
                            <option value="KNUST">KNUST</option>
                            <option value="University of Cape Coast">University of Cape Coast</option>
                            <option value="Ashesi University">Ashesi University</option>
                            <option value="GIMPA">GIMPA</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Program
                          </label>
                          <input
                            type="text"
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year of Study
                          </label>
                          <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className="form-input"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Postgraduate">Postgraduate</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Bio</h4>
                      <textarea
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-input w-full"
                        placeholder="Tell others about yourself..."
                      />
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'React', 'Python', 'Teaching', 'UI/UX Design', 'Content Writing', 'Photography', 'Event Planning'].map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillChange(skill)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              formData.skills.includes(skill) 
                                ? 'bg-secondary text-white' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mt-4">
                  {renderTabs()}
                  {activeTab === 'overview' && renderOverviewTab()}
                  {activeTab === 'portfolio' && renderPortfolioTab()}
                  {activeTab === 'reviews' && renderReviewsTab()}
                  {activeTab === 'achievements' && renderAchievementsTab()}
                  {activeTab === 'settings' && renderSettingsTab()}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl-soft p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-light-orange rounded-full flex items-center justify-center mr-4">
                  <Award size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Points & Rewards</h3>
              </div>
              
              <div className="bg-light-orange bg-opacity-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">350</p>
                    <p className="text-sm text-gray-600">Total Points Earned</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center">
                    <span className="text-secondary font-bold">Silver</span>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-600">350/1000 to Gold</p>
              </div>
              
              <h4 className="font-medium mb-3 text-lg">Recent Achievements</h4>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-light-orange bg-opacity-30 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-secondary rounded-full mr-3 shadow-md">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="font-medium">First Task Completed</p>
                    <p className="text-xs text-gray-600">Earned 50 points</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-light-orange bg-opacity-30 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-secondary rounded-full mr-3 shadow-md">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="font-medium">10 Tasks Completed</p>
                    <p className="text-xs text-gray-600">Earned 100 points</p>
                  </div>
                </div>
                
                <Link to="/rewards" className="btn-secondary w-full text-center mt-4">View All Rewards</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl-soft p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-light-orange rounded-full flex items-center justify-center mr-4">
                  <Shield size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Account Stats</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-light-orange bg-opacity-30 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-gray-600">Tasks Created</p>
                </div>
                
                <div className="bg-light-orange bg-opacity-30 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-primary">23</p>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                </div>
                
                <div className="bg-light-orange bg-opacity-30 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-primary">GH₵1,250</p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
                
                <div className="bg-light-orange bg-opacity-30 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Member Since</h4>
                  <p className="text-gray-900 font-medium">January 15, 2025</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Last Active</h4>
                  <p className="text-gray-900 font-medium">Today</p>
                </div>
                
                <div className="pt-4 border-t">
                  <Link to="/tasks" className="btn-primary w-full text-center">View My Tasks</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
