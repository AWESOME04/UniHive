import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatCurrencyRange } from '../../utils/formatUtils';

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
    companyLogo?: string;
    category?: string;
  };
  isSaved?: boolean;
}

function JobCard({ job, isSaved = false }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Format date to display in a readable format
  const formatDeadline = (dateString?: string) => {
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

  // Format salary display
  const formatSalary = (salary: any): string => {
    if (!salary) return 'Negotiable';

    if (typeof salary === 'object' && salary.min && salary.max) {
      return formatCurrencyRange(salary.min, salary.max);
    } else if (typeof salary === 'number') {
      return formatCurrency(salary);
    }
    
    return formatCurrency(salary);
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

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/job/${job.id}`} 
        className="block"
      >
        <div className="p-5">
          {/* Card Header - Company info and actions */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                ) : (
                  <Briefcase size={20} className="text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{job.company}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                    {job.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full ${isBookmarked ? 'text-secondary bg-light-orange/30' : 'text-gray-400 hover:text-secondary hover:bg-light-orange/20'} transition-colors`}
            >
              {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>

          {/* Job Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{job.title}</h2>

          {/* Job Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 text-secondary" />
              <span className="truncate">{job.location || 'Remote'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-secondary" />
              <span className="truncate">{formatDeadline(job.deadline)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign size={16} className="mr-2 text-secondary" />
              <span className="truncate">{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap size={16} className="mr-2 text-secondary" />
              <span className="truncate">{job.university || 'All Universities'}</span>
            </div>
          </div>

          {/* Job Type Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
              {job.type || 'Part-time'}
            </span>
            {job.category && (
              <span className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                {job.category}
              </span>
            )}
            {job.tags && job.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Apply Button */}
          <div className={`flex justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-sm font-medium text-primary flex items-center">
              View Details <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
