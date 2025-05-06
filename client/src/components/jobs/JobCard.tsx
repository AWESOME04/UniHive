import { MapPin, Clock, DollarSign, MoreVertical, Bookmark, BookmarkCheck, Briefcase, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
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
      return `GH₵${salary.toLocaleString('en-GH')}`;
    }
    
    if (salary.includes('-')) {
      const [min, max] = salary.split('-').map(s => s.trim());
      return `GH₵${min} - GH₵${max}`;
    }
    
    return `GH₵${salary}`;
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
    <Link 
      to={`/job/${job.id}`} 
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl-soft p-6 border border-white/20 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5 contain-paint"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5 contain-paint"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-full bg-light-orange flex items-center justify-center text-secondary font-bold text-lg shadow-md">
                {job.company.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {job.status && (
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              )}
              <button 
                onClick={toggleBookmark}
                className={`p-2 rounded-full ${isBookmarked ? 'text-secondary bg-light-orange/30' : 'text-gray-400 hover:text-secondary hover:bg-light-orange/20'} transition-colors`}
                aria-label={isBookmarked ? "Remove from saved jobs" : "Save job"}
              >
                {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          </div>
          
          {job.description && (
            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 text-secondary" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase size={16} className="mr-2 text-secondary" />
              <span>{job.type}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign size={16} className="mr-2 text-secondary" />
              <span className="font-medium">{formatSalary(job.salary)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-secondary" />
              <span>Posted {new Date(job.postedAt).toLocaleDateString('en-GH')}</span>
            </div>
            
            {job.university && (
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap size={16} className="mr-2 text-secondary" />
                <span>{job.university}</span>
              </div>
            )}
            
            {job.deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-secondary" />
                <span>Deadline: {formatDate(job.deadline)}</span>
              </div>
            )}
          </div>
          
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 bg-light-orange/20 text-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className={`flex justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-secondary text-sm font-medium flex items-center">
              View Details
              <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
