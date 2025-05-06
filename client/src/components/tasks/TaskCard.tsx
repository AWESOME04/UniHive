import { CalendarClock, Clock, MapPin, Briefcase, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Task } from '../../types';
import { useState } from 'react';
import { formatCurrency } from '../../utils/formatUtils';

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Determine status color
  const getStatusColor = (status: string) => {
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

  // Determine deadline color based on days remaining
  const getDeadlineColor = (dateString?: string) => {
    if (!dateString) return 'text-gray-500';
    
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600'; // Overdue
    if (diffDays <= 2) return 'text-orange-600'; // Due soon
    return 'text-gray-600'; // Plenty of time
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl-soft p-6 transition-all duration-300 h-full flex flex-col border border-white/20 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background patterns */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
      <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5"></div>
      
      {/* Status badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${getStatusColor(task.status)}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      
      <div className="flex-grow relative z-10">
        <h3 className="text-xl font-bold text-primary mb-3 pr-24">{task.title}</h3>
        
        {/* University and location */}
        {task.university && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin size={14} className="mr-1 text-secondary" />
            <span>{task.university}</span>
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-3">{task.description}</p>
        
        {/* Category */}
        {task.category && (
          <div className="flex items-center mb-4">
            <Briefcase size={16} className="mr-2 text-secondary" />
            <span className="text-sm font-medium text-gray-700 capitalize">{task.category}</span>
          </div>
        )}
        
        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="w-full flex items-center mb-1">
              <Tag size={14} className="mr-1 text-secondary" />
              <span className="text-xs text-gray-500">Tags:</span>
            </div>
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-light-orange/20 text-secondary rounded-full text-xs hover:bg-secondary hover:text-white transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 pt-4 mt-2 relative z-10">
        <div className="flex justify-between items-center">
          <div className={`flex items-center text-sm ${getDeadlineColor(task.deadline)}`}>
            {task.deadline ? (
              <div className="flex items-center">
                <CalendarClock size={16} className="mr-1" />
                <span>{formatDate(task.deadline)}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>No deadline</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {task.price && (
              <span className="text-sm font-medium bg-light-orange/30 text-secondary px-3 py-1 rounded-full shadow-sm">
                {typeof task.price === 'string' ? task.price : formatCurrency(task.price)}
              </span>
            )}
            <span className="text-sm font-medium bg-light-orange/30 text-secondary px-3 py-1 rounded-full shadow-sm">
              {task.points} Points
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Link 
            to={`/tasks/${task.id}`}
            className="text-sm text-secondary hover:text-dark-orange font-medium transition-all duration-300 flex items-center group-hover:translate-x-1"
          >
            View Details
            <ArrowRight size={16} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      ></div>
    </div>
  );
}

export default TaskCard;
