import { useState, useMemo } from 'react';
import { 
  Clock, DollarSign, Briefcase, UserRound, TrendingUp, 
  MapPin, ChevronRight, Search, MessageSquare, 
  Bookmark, CheckCircle
} from 'lucide-react';
import { useAppSelector } from '../store';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { tasks } = useAppSelector((state) => state.tasks);
  const [timeRange, setTimeRange] = useState('week');

  // Memoized task statistics
  const taskStats = useMemo(() => {
    const openTasks = tasks.filter((task) => task.status === 'open').length;
    const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;
    const completedTasks = tasks.filter((task) => task.status === 'completed').length;
    const totalTasks = openTasks + inProgressTasks + completedTasks || 1;
    
    return {
      openTasks,
      inProgressTasks,
      completedTasks,
      totalTasks,
      openPercentage: (openTasks / totalTasks) * 100,
      inProgressPercentage: (inProgressTasks / totalTasks) * 100,
      completedPercentage: (completedTasks / totalTasks) * 100
    };
  }, [tasks]);

  // Calculate earnings (mock data)
  const earningsData = useMemo(() => {
    const totalEarnings = 1250; // GH₵
    const pendingEarnings = 350; // GH₵
    const monthlyChange = 12; // %
    
    return { totalEarnings, pendingEarnings, monthlyChange };
  }, []);

  // Recent activity data
  const recentActivity = useMemo(() => [
    { 
      id: 1, 
      type: 'application', 
      title: 'Applied to "Web Development Task"', 
      time: '2 hours ago',
      status: 'pending',
      icon: <Briefcase size={16} className="text-blue-500" />
    },
    { 
      id: 2, 
      type: 'message', 
      title: 'Message from John regarding tutoring', 
      time: '5 hours ago',
      status: 'unread',
      icon: <MessageSquare size={16} className="text-green-500" />
    },
    { 
      id: 3, 
      type: 'task', 
      title: 'Completed "Content Writing" task', 
      time: '1 day ago',
      status: 'completed',
      icon: <CheckCircle size={16} className="text-secondary" />
    },
    { 
      id: 4, 
      type: 'payment', 
      title: 'Received payment for "Data Entry"', 
      time: '2 days ago',
      status: 'completed',
      icon: <DollarSign size={16} className="text-secondary" />
    },
  ], []);

  // Recommended tasks
  const recommendedTasks = useMemo(() => [
    {
      id: 1,
      title: 'Web Development',
      description: 'Build a responsive portfolio website',
      price: '₵500',
      location: 'Remote',
      deadline: '7 days',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'Content Writing',
      description: 'Write blog posts about student life',
      price: '₵200',
      location: 'Remote',
      deadline: '5 days',
      skills: ['Writing', 'Editing', 'SEO']
    },
    {
      id: 3,
      title: 'Data Entry',
      description: 'Input research data into spreadsheets',
      price: '₵150',
      location: 'On-campus',
      deadline: '3 days',
      skills: ['Excel', 'Attention to Detail']
    }
  ], []);

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username || 'Student'}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 w-64">
                <Search size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="bg-transparent border-none focus:outline-none text-sm flex-1"
                />
              </div>
            </div>
            <Link 
              to="/create-task" 
              className="btn-primary flex items-center justify-center py-2 px-4 rounded-lg"
            >
              <Briefcase size={18} className="mr-2" />
              <span>Post a Task</span>
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <h3 className="text-2xl font-bold">₵{earningsData.totalEarnings}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{earningsData.monthlyChange}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm">Pending Earnings</p>
                <h3 className="text-2xl font-bold">₵{earningsData.pendingEarnings}</h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">Expected within 7 days</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm">Completed Tasks</p>
                <h3 className="text-2xl font-bold">{taskStats.completedTasks}</h3>
              </div>
              <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-secondary" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">{taskStats.completedPercentage.toFixed(0)}% completion rate</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm">Active Applications</p>
                <h3 className="text-2xl font-bold">{taskStats.inProgressTasks}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">Tasks you've applied to</span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tasks Overview */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Your Tasks</h2>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 text-sm rounded-full ${timeRange === 'week' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded-full ${timeRange === 'month' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded-full ${timeRange === 'year' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => setTimeRange('year')}
                    >
                      Year
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-light-orange bg-opacity-20 rounded-lg">
                    <p className="text-2xl font-bold text-secondary">{taskStats.openTasks}</p>
                    <p className="text-sm text-gray-600">Open</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{taskStats.inProgressTasks}</p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{taskStats.completedTasks}</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Task activity chart will appear here</p>
                </div>
              </div>
            </div>
            
            {/* Recommended Tasks */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Recommended for You</h2>
                  <Link to="/tasks" className="text-secondary flex items-center text-sm hover:underline">
                    View all <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recommendedTasks.map(task => (
                  <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <span className="text-secondary font-medium">{task.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {task.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {task.location}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {task.deadline}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="w-20 h-20 bg-light-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserRound size={32} className="text-secondary" />
                </div>
                <h2 className="text-xl font-bold">{user?.username || 'Student'}</h2>
                <p className="text-gray-600 text-sm">University of Ghana • Computer Science</p>
                
                <div className="flex justify-center mt-4 space-x-2">
                  <Link to="/profile" className="text-secondary text-sm hover:underline">
                    View Profile
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/settings" className="text-secondary text-sm hover:underline">
                    Edit Profile
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{taskStats.completedTasks}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">4.8</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">350</p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-light-orange bg-opacity-20 text-secondary text-xs px-2 py-1 rounded-full">
                      Web Development
                    </span>
                    <span className="bg-light-orange bg-opacity-20 text-secondary text-xs px-2 py-1 rounded-full">
                      Content Writing
                    </span>
                    <span className="bg-light-orange bg-opacity-20 text-secondary text-xs px-2 py-1 rounded-full">
                      Data Entry
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="mr-3 mt-1">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.status === 'unread' && (
                        <div className="ml-auto">
                          <span className="w-2 h-2 bg-secondary rounded-full block"></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 text-center">
                <Link to="/activity" className="text-secondary text-sm hover:underline">
                  View All Activity
                </Link>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold">Quick Actions</h2>
              </div>
              
              <div className="p-6 grid grid-cols-2 gap-4">
                <Link to="/create-task" className="bg-light-orange bg-opacity-20 p-4 rounded-lg text-center hover:bg-opacity-30 transition-colors">
                  <Briefcase size={24} className="text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Post Task</p>
                </Link>
                <Link to="/search" className="bg-light-orange bg-opacity-20 p-4 rounded-lg text-center hover:bg-opacity-30 transition-colors">
                  <Search size={24} className="text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Find Tasks</p>
                </Link>
                <Link to="/messaging" className="bg-light-orange bg-opacity-20 p-4 rounded-lg text-center hover:bg-opacity-30 transition-colors">
                  <MessageSquare size={24} className="text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Messages</p>
                </Link>
                <Link to="/saved-jobs" className="bg-light-orange bg-opacity-20 p-4 rounded-lg text-center hover:bg-opacity-30 transition-colors">
                  <Bookmark size={24} className="text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Saved</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
