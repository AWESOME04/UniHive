import { useState } from "react";
import {
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Users,
  ChevronRight,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

// Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("week");

  // Stats data
  const stats = [
    {
      id: "earnings",
      title: "Total Earnings",
      value: "₵1,250",
      change: "+12%",
      changeType: "positive" as "positive" | "negative",
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
      changeType: "positive" as "positive" | "negative",
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
  const taskActivity = [
    { month: "Jan", completed: 4, applied: 6 },
    { month: "Feb", completed: 5, applied: 8 },
    { month: "Mar", completed: 7, applied: 10 },
    { month: "Apr", completed: 6, applied: 9 },
    { month: "May", completed: 9, applied: 12 },
    { month: "Jun", completed: 8, applied: 10 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const renderTaskActivityChart = () => {
    const maxValue = Math.max(
      ...taskActivity.map((item) => Math.max(item.completed, item.applied))
    );

    return (
      <div className="h-64 flex items-end space-x-2 px-2">
        {taskActivity.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex space-x-1 h-48 items-end">
              <motion.div
                className="w-1/2 bg-secondary rounded-t-sm"
                style={{ height: `${(item.completed / maxValue) * 160}px` }}
                initial={{ height: 0 }}
                animate={{ height: `${(item.completed / maxValue) * 160}px` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
              <motion.div
                className="w-1/2 bg-blue-400 rounded-t-sm"
                style={{ height: `${(item.applied / maxValue) * 160}px` }}
                initial={{ height: 0 }}
                animate={{ height: `${(item.applied / maxValue) * 160}px` }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{item.month}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Student"}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your tasks and earnings
          </p>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          variants={containerVariants}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm text-gray-500 font-medium">{stat.title}</h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      {stat.change && (
                        <span className={`ml-2 text-xs font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    {stat.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity & Recommendations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Activity Overview</h2>
                <div className="flex space-x-2">
                  {["week", "month", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        timeRange === range
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-64 relative">
                {renderTaskActivityChart()}
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    <span className="text-xs text-gray-500">Completed Tasks</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-xs text-gray-500">Applied Tasks</span>
                  </div>
                </div>
                <motion.button
                  className="text-sm text-secondary font-medium flex items-center"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Upcoming Deadlines */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h2>
                <motion.button
                  className="text-sm text-secondary font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Web Development Task",
                    deadline: "Tomorrow, 5:00 PM",
                    status: "in-progress",
                    priority: "high" as "high" | "medium" | "low",
                  },
                  {
                    id: 2,
                    title: "Content Writing Assignment",
                    deadline: "May 10, 5:00 PM",
                    status: "in-progress",
                    priority: "medium" as "high" | "medium" | "low",
                  },
                  {
                    id: 3,
                    title: "Data Entry Project",
                    deadline: "May 15, 5:00 PM",
                    status: "in-progress",
                    priority: "low" as "high" | "medium" | "low",
                  },
                ].map((deadline) => (
                  <motion.div 
                    key={deadline.id}
                    className="bg-gray-50 rounded-lg p-3 relative overflow-hidden"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    layout
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      deadline.priority === "high" ? "bg-red-500" : 
                      deadline.priority === "medium" ? "bg-yellow-500" : 
                      "bg-green-500"
                    }`}></div>
                    <h3 className="font-medium text-gray-800 mb-1">{deadline.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      <span>{deadline.deadline}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Recommended Tasks Section */}
        <motion.div 
          className="mt-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
            <Link 
              to="/dashboard/search" 
              className="text-sm text-secondary font-medium flex items-center"
            >
              Browse All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
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
            ].map((task) => (
              <motion.div 
                key={task.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{task.title}</h3>
                    <span className="font-bold text-secondary">{task.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-gray-500 text-xs mr-4">
                      <MapPin size={12} className="mr-1" />
                      {task.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock size={12} className="mr-1" />
                      {task.deadline}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/dashboard/job/${task.id}`}
                    className="mt-4 flex items-center justify-center py-2 px-4 bg-secondary/10 text-secondary text-sm font-medium rounded-lg hover:bg-secondary/20 transition-colors w-full"
                  >
                    View Details
                    <motion.span 
                      animate={{ x: [0, 3, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight size={16} className="ml-1" />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div 
          className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <motion.button
                className="text-sm text-secondary font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {[
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
              ].map((activity, idx) => (
                <motion.div 
                  key={activity.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-gray-800 font-medium text-sm">{activity.title}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                  <motion.button
                    className="text-xs text-secondary font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
