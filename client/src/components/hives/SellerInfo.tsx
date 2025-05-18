import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Loader } from 'lucide-react';
import userService from '../../services/userService';
import messageService from '../../services/messageService';

interface UserProfile {
  id: string;
  name: string;
  university: string;
  profileImage: string | null;
  bio: string | null;
  rating: number;
  createdAt: string;
}

interface SellerInfoProps {
  sellerId: string;
  createdAt?: string | null;
  className?: string;
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'recently';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes === 0) {
        return 'just now';
      }
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
  
  if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  }
  
  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
};

const SellerInfo: React.FC<SellerInfoProps> = ({ sellerId, createdAt, className = '' }) => {
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageSending, setMessageSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerInfo = async () => {
      if (!sellerId) {
        setError('Seller ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await userService.getUserById(sellerId);
        setSeller(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching seller details:', err);
        setError('Failed to load seller information');
        setLoading(false);
      }
    };

    fetchSellerInfo();
  }, [sellerId]);

  const handleMessageSeller = async () => {
    if (!seller) return;
    
    try {
      setMessageSending(true);
      const conversation = await messageService.createOrGetConversation(sellerId);
      navigate(`/dashboard/messages/${conversation.id}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
      setMessageSending(false);
    }
  };

  if (loading) {
    return (
      <div className={`border-t border-gray-100 pt-4 mb-6 ${className}`}>
        <div className="flex justify-center py-4">
          <Loader size={24} className="animate-spin text-secondary" />
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className={`border-t border-gray-100 pt-4 mb-6 ${className}`}>
        <div className="p-4 text-center">
          <p className="text-red-500">
            {error || 'User information not available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-t border-gray-100 pt-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            {seller.profileImage ? (
              <img 
                src={seller.profileImage} 
                alt={seller.name} 
                className="w-10 h-10 object-cover"
              />
            ) : (
              <span className="font-medium text-secondary">
                {seller.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium">{seller.name}</p>
            <p className="text-xs text-gray-500">
              Posted {createdAt ? formatDate(createdAt) : 'recently'} • {seller.university}
            </p>
          </div>
        </div>
        <button
          onClick={handleMessageSeller}
          disabled={messageSending}
          className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium hover:bg-secondary/20 transition-colors"
        >
          {messageSending ? (
            <Loader size={16} className="animate-spin mr-2" />
          ) : (
            <MessageSquare size={16} className="mr-2" />
          )}
          Message
        </button>
      </div>
    </div>
  );
};

export default SellerInfo;
