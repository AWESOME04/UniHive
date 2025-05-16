import { useEffect, useState } from 'react';
import { 
  Briefcase, CirclePlus, Filter, GraduationCap, 
  MapPin, Search, Users, ChevronDown, Clock, ArrowRight
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchJobs, setCurrentPage } from '../store/slices/jobsSlice';
import JobCard from '../components/jobs/JobCard';
import CreateJobModal from '../components/jobs/CreateJobModal';
import { Link } from 'react-router-dom';

function Tasks() {
  const dispatch = useAppDispatch();
  const { filteredJobs, loading, pagination } = useAppSelector((state) => state.jobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs({ page: pagination.currentPage, limit: pagination.limit }));
  }, [dispatch, pagination.currentPage]);

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Open create job modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close create job modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Calculate total pages based on totalPages property instead of totalItems
    const totalPages = pagination.totalPages;
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    );
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= pagination.currentPage - 1 && i <= pagination.currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              pagination.currentPage === i
                ? 'bg-secondary text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        i === pagination.currentPage - 2 ||
        i === pagination.currentPage + 2
      ) {
        buttons.push(
          <span key={i} className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    );
    
    return buttons;
  };

  // Categories
  const categories = [
    { id: 'all', name: 'All Tasks', icon: <Briefcase size={20} className="text-secondary" />, count: filteredJobs.length },
    { id: 'tutoring', name: 'Tutoring', icon: <GraduationCap size={20} className="text-secondary" />, count: 24 },
    { id: 'event', name: 'Event Planning', icon: <Users size={20} className="text-secondary" />, count: 18 },
    { id: 'design', name: 'Design', icon: <Briefcase size={20} className="text-secondary" />, count: 15 },
    { id: 'data', name: 'Data Entry', icon: <Briefcase size={20} className="text-secondary" />, count: 12 },
    { id: 'web', name: 'Web Development', icon: <Briefcase size={20} className="text-secondary" />, count: 9 },
  ];

  // Featured tasks
  const featuredTasks = [
    {
      id: 1,
      title: 'Web Development',
      category: 'Technical',
      description: 'Build a responsive portfolio website for a local business',
      price: '₵500',
      deadline: '7 days',
      location: 'Remote',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'Content Writing',
      category: 'Creative',
      description: 'Write blog posts about student life and university experiences',
      price: '₵200',
      deadline: '5 days',
      location: 'Remote',
      skills: ['Writing', 'Editing', 'SEO']
    },
    {
      id: 3,
      title: 'Data Entry',
      category: 'Administrative',
      description: 'Input research data into spreadsheets for academic project',
      price: '₵150',
      deadline: '3 days',
      location: 'On-campus',
      skills: ['Excel', 'Attention to Detail']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Tasks</h1>
            <p className="text-gray-600">Find side hustles that match your skills and schedule</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={openModal}
              className="btn-primary flex items-center py-2 px-4 rounded-lg"
            >
              <CirclePlus size={20} className="mr-2" />
              Post a Task
            </button>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="w-full lg:w-2/3 relative">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for tasks..." 
                  className="bg-transparent border-none focus:outline-none text-sm flex-1"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative">
                <button
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-40 text-sm"
                  onClick={() => setSortBy(sortBy === 'newest' ? 'highest' : 'newest')}
                >
                  <span>Sort by: {sortBy === 'newest' ? 'Newest' : 'Highest Paid'}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <button
                onClick={toggleFilter}
                className="flex items-center justify-center bg-secondary text-white rounded-lg px-4 py-2 text-sm"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {isFilterOpen && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="on-campus">On Campus</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm mr-2">
                  Reset
                </button>
                <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap ${
                  selectedCategory === category.name 
                    ? 'bg-secondary text-white' 
                    : 'bg-white text-gray-700 hover:bg-light-orange/50'
                } transition-default shadow-sm`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="text-xs opacity-80">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Tasks Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Featured Tasks</h2>
              <Link to="/tasks" className="text-secondary flex items-center text-sm hover:underline">
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {featuredTasks.map(task => (
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className="text-xs bg-light-orange text-secondary px-2 py-1 rounded-full">
                      {task.category}
                    </span>
                  </div>
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
        
        {/* Main Task Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="w-20 h-20 bg-light-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any tasks matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setIsFilterOpen(false);
                }}
                className="btn-secondary inline-flex items-center"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center mt-8 space-x-2">
            {renderPaginationButtons()}
          </div>
        )}
      </div>
      
      {/* Create Job Modal */}
      {isModalOpen && <CreateJobModal isOpen={isModalOpen} onClose={closeModal} />}
      
      {/* CSS for hiding scrollbar but allowing scroll */}
      <style>
        {`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </div>
  );
}

export default Tasks;
