import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLink?: string;
  actionText?: string;
  onActionClick?: () => void;
}

function EmptyState({
  title = 'No results found',
  message = 'No tasks could be found. Please check back later or try a different search.',
  actionLink = '/tasks/create',
  actionText = 'Create a Task',
  onActionClick
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-md">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search size={32} className="text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onActionClick ? (
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-default"
        >
          {actionText}
        </button>
      ) : (
        <Link
          to={actionLink}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-default"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
