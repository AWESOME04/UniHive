import { MapPin, Clock, DollarSign, MoreVertical, Bookmark, BookmarkCheck, Briefcase, GraduationCap, Building } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    university?: string;
    type: string;
    salary: string | number;
    postedAt: string;
    deadline?: string;
    description?: string;
    tags?: string[];
    status?: string;
  };
  isSaved?: boolean;
}

function JobCard({ job, isSaved = false }: JobCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(isSaved);
  const [isHovered, setIsHovered] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const toggleOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  // Format date to display in a readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    
    // Calculate days remaining
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let deadlineText = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    if (diffDays > 0) {
      deadlineText += ` (${diffDays} day${diffDays !== 1 ? 's' : ''} left)`;
    } else if (diffDays === 0) {
      deadlineText += ' (Due today)';
    } else {
      deadlineText += ' (Overdue)';
    }
    
    return deadlineText;
  };

  // Format salary to display in Ghanaian cedis
  const formatSalary = (salary: string | number) => {
    if (typeof salary === 'number') {
      return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(salary);
    }
    
    if (salary.includes('-')) {
      const [min, max] = salary.split('-').map(s => parseFloat(s.trim()));
      return `${new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(min)} - ${new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(max)}`;
    }
    
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(salary));
  };

  // Determine status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'open':
        return 'bg-light-orange/30 text-secondary';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-background text-secondary';
    }
  };

  const getDeadlineColor = (deadline?: string) => {
    if (!deadline) return 'text-gray-600';
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return 'text-gray-600';
    if (diffDays === 0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Link 
      to={`/job/${job.id}`} 
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl-soft p-4 sm:p-6 transition-all duration-300 border border-white/20 group hover:shadow-2xl-soft">
        {/* Background patterns */}
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5"></div>
        
        {/* Status badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
          <span className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium shadow-sm ${getStatusColor(job.status || 'open')}`}>
            {(job.status || 'open').charAt(0).toUpperCase() + (job.status || 'open').slice(1)}
          </span>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-primary pr-20 sm:pr-24">{job.title}</h3>
            <div className="flex items-center mt-2 sm:mt-0">
              <button onClick={toggleBookmark} className="text-secondary hover:text-dark-orange">
                {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
              <button onClick={toggleOptions} className="ml-2 text-gray-500 hover:text-gray-700">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {/* Company and Location */}
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm gap-2 sm:gap-4">
              <div className="flex items-center">
                <Building size={16} className="mr-1.5 text-secondary" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1.5 text-secondary" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Job Type and University */}
            <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-2 sm:gap-4">
              <div className="flex items-center text-gray-600">
                <Briefcase size={16} className="mr-1.5 text-secondary" />
                <span className="capitalize">{job.type}</span>
              </div>
              {job.university && (
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={16} className="mr-1.5 text-secondary" />
                  <span>{job.university}</span>
                </div>
              )}
            </div>

            {/* Salary and Deadline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100">
              <div className="flex items-center text-gray-600 text-sm mb-2 sm:mb-0">
                <DollarSign size={16} className="mr-1.5 text-secondary" />
                <span>{formatSalary(job.salary)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-1.5 text-secondary" />
                <span className={getDeadlineColor(job.deadline)}>{formatDate(job.deadline)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent transition-opacity duration-300 rounded-2xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        ></div>
      </div>
    </Link>
  );
}

export default JobCard;
