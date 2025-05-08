import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle,
  Calendar,
  ArrowRight,
  Users,
  ChevronRight,
  MapPin,
  Search,
  UserRound,
  Wallet,
  ArrowUpRight,
  Menu,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";

// Define types for our data
interface StatItem {
  id: string;
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}

interface TaskActivityItem {
  month: string;
  completed: number;
  applied: number;
}

interface DeadlineItem {
  id: number;
  title: string;
  deadline: string;
  status: string;
  priority: "high" | "medium" | "low";
}

interface ActivityItem {
  id: number;
  type: string;
  title: string;
  time: string;
  status: string;
  icon: React.ReactNode;
}

interface TaskItem {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  deadline: string;
  skills: string[];
}

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

// Dashboard component
const Dashboard: React.FC = () => {
  const { user: authUser } = useAuth();
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Listen for window resize to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Try to get the user profile from the /api/auth/me endpoint
        const response = await userService.getCurrentUserProfile();
        
        if (response.status === 'success' && response.data) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Combine user data from auth context and profile API
  const user = userProfile || authUser || {
    name: "Student",
    email: "student@university.edu.gh",
    university: "University of Ghana"
  };

  // Stats data
  const stats: StatItem[] = [
    {
      id: "earnings",
      title: "Total Earnings",
      value: "₵1,250",
      change: "+12%",
      changeType: "positive",
      icon: <DollarSign size={20} />,
      color: "bg-green-500",
    },
    {
      id: "pending",
      title: "Pending Earnings",
      value: "₵350",
      subtitle: "Expected within 7 days",
      icon: <Clock size={20} />,
      color: "bg-yellow-500",
    },
    {
      id: "completed",
      title: "Completed Tasks",
      value: "12",
      change: "+5%",
      changeType: "positive",
      icon: <CheckCircle size={20} />,
      color: "bg-secondary",
    },
    {
      id: "applications",
      title: "Active Applications",
      value: "5",
      subtitle: "Tasks you've applied to",
      icon: <Briefcase size={20} />,
      color: "bg-blue-500",
    },
  ];

  // Task activity data
  const taskActivity: TaskActivityItem[] = [
    { month: "Jan", completed: 4, applied: 6 },
    { month: "Feb", completed: 5, applied: 8 },
    { month: "Mar", completed: 7, applied: 10 },
    { month: "Apr", completed: 6, applied: 9 },
    { month: "May", completed: 9, applied: 12 },
    { month: "Jun", completed: 8, applied: 10 },
  ];

  // Upcoming deadlines
  const upcomingDeadlines: DeadlineItem[] = [
    {
      id: 1,
      title: "Web Development Task",
      deadline: "Tomorrow, 5:00 PM",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 2,
      title: "Content Writing Assignment",
      deadline: "May 10, 5:00 PM",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Data Entry Project",
      deadline: "May 15, 5:00 PM",
      status: "in-progress",
      priority: "low",
    },
  ];

  // Recent activity
  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      type: "application",
      title: 'Applied to "Web Development Task"',
      time: "2 hours ago",
      status: "pending",
      icon: <Briefcase size={16} className="text-blue-500" />,
    },
    {
      id: 2,
      type: "message",
      title: "Message from John regarding tutoring",
      time: "5 hours ago",
      status: "unread",
      icon: <Users size={16} className="text-green-500" />,
    },
    {
      id: 3,
      type: "task",
      title: 'Completed "Content Writing" task',
      time: "1 day ago",
      status: "completed",
      icon: <CheckCircle size={16} className="text-secondary" />,
    },
  ];

  // Recommended tasks
  const recommendedTasks: TaskItem[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Build a responsive portfolio website",
      price: "₵500",
      location: "Remote",
      deadline: "7 days",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      title: "Content Writing",
      description: "Write blog posts about student life",
      price: "₵200",
      location: "Remote",
      deadline: "5 days",
      skills: ["Writing", "Editing", "SEO"],
    },
    {
      id: 3,
      title: "Data Entry",
      description: "Input research data into spreadsheets",
      price: "₵150",
      location: "On-campus",
      deadline: "3 days",
      skills: ["Excel", "Attention to Detail"],
    },
  ];

  // Render task activity chart (simplified version)
  const renderTaskActivityChart = () => {
    const maxValue = Math.max(
      ...taskActivity.map((item) => Math.max(item.completed, item.applied))
    );

    return (
      <div className="h-64 flex items-end space-x-6 px-4">
        {taskActivity.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex space-x-1">
              <div
                className="w-1/2 bg-secondary rounded-t-sm"
                style={{ height: `${(item.completed / maxValue) * 180}px` }}
              />
              <div
                className="w-1/2 bg-blue-400 rounded-t-sm"
                style={{ height: `${(item.applied / maxValue) * 180}px` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{item.month}</div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${!isMobile && 'lg:ml-64'}`}>
        {/* Top header with mobile menu and search */}
        <header className="bg-white shadow-sm py-4 px-4 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-xl font-bold text-primary lg:hidden">UniHive</h1>
            
            {/* Search and user profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary w-full md:w-64 lg:w-80"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button className="p-1.5 rounded-full relative bg-gray-100 hover:bg-gray-200">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary flex items-center justify-center text-white text-xs">
                      3
                    </span>
                  </button>
                </div>
                
                <div className="h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center">
                  <UserRound size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name || "Student"}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your tasks and earnings
            </p>
          </div>
          
          {/* Rest of dashboard content */}
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-1 overflow-x-auto">
            <div className="flex min-w-max">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-secondary text-white"
                    : "text-gray-700 hover:text-secondary"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "tasks"
                    ? "bg-secondary text-white"
                    : "text-gray-700 hover:text-secondary"
                }`}
                onClick={() => setActiveTab("tasks")}
              >
                My Tasks
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "earnings"
                    ? "bg-secondary text-white"
                    : "text-gray-700 hover:text-secondary"
                }`}
                onClick={() => setActiveTab("earnings")}
              >
                Earnings
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div
                    className={`w-10 h-10 ${stat.color} bg-opacity-15 rounded-full flex items-center justify-center`}
                  >
                    <span className={stat.color.replace("bg-", "text-")}>
                      {stat.icon}
                    </span>
                  </div>
                </div>
                {stat.change && (
                  <div className="flex items-center text-sm">
                    <TrendingUp
                      size={14}
                      className={
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />
                    <span
                      className={`ml-1 ${
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                )}
                {stat.subtitle && (
                  <div className="text-sm text-gray-500">{stat.subtitle}</div>
                )}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Activity */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Task Activity</h2>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        timeRange === "week"
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setTimeRange("week")}
                    >
                      Week
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        timeRange === "month"
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setTimeRange("month")}
                    >
                      Month
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        timeRange === "year"
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setTimeRange("year")}
                    >
                      Year
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Applied</span>
                    </div>
                  </div>

                  {renderTaskActivityChart()}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
                  <Link
                    to="/tasks"
                    className="text-secondary text-sm hover:underline flex items-center"
                  >
                    View all <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {upcomingDeadlines.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`mt-0.5 w-2 h-2 rounded-full ${
                              task.priority === "high"
                                ? "bg-red-500"
                                : task.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          ></div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {task.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <Calendar size={14} className="text-gray-400 mr-1" />
                              <span
                                className={`text-xs ${
                                  task.deadline.includes("Tomorrow")
                                    ? "text-red-500 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {task.deadline}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 px-6 py-3">
                  <Link
                    to="/tasks/add"
                    className="text-secondary text-sm font-medium flex items-center justify-center"
                  >
                    <span>Create new task</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-light-orange rounded-full flex items-center justify-center">
                      <UserRound size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {user?.name || "Student"}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        University of Ghana • Computer Science
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-secondary">12</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-secondary">4.8</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-secondary">350</p>
                      <p className="text-xs text-gray-500">Points</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/profile"
                      className="bg-secondary/10 text-secondary text-sm font-medium py-2 px-4 rounded-lg w-full flex items-center justify-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <h3 className="text-sm font-medium mb-3">Your Skills</h3>
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
                    <span className="bg-light-orange bg-opacity-20 text-secondary text-xs px-2 py-1 rounded-full">
                      Research
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <Link
                    to="/activity"
                    className="text-secondary text-sm hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex">
                        <div className="mr-3 mt-0.5">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {activity.time}
                          </p>
                        </div>
                        {activity.status === "unread" && (
                          <div className="ml-auto">
                            <span className="w-2 h-2 bg-secondary rounded-full block"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Earnings Summary</h2>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">This Month</p>
                      <p className="text-2xl font-bold">₵450</p>
                    </div>
                    <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
                      <ArrowUpRight size={12} className="mr-1" />
                      +15%
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wallet size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">Available Balance</span>
                      </div>
                      <span className="text-sm font-medium">₵1,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">₵350</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/earnings"
                      className="text-secondary text-sm font-medium hover:underline flex items-center justify-center"
                    >
                      View Earnings History
                      <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Tasks */}
          <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recommended for You</h2>
              <Link
                to="/tasks"
                className="text-secondary text-sm hover:underline flex items-center"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {recommendedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className="text-secondary font-medium">{task.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {task.location}
                    </div>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {task.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
