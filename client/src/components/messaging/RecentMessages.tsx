import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Loader } from 'lucide-react';
import messageService from '../../services/messageService';

const RecentMessages = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await messageService.getConversations();

        setConversations(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load recent messages');
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader size={24} className="animate-spin text-secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.length > 0 ? (
        <>
          {conversations.map((conversation) => (
            <Link
              to={`/dashboard/messages/${conversation.id}`}
              key={conversation.id}
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="relative mr-3">
                {conversation.otherParticipant?.profileImage ? (
                  <img
                    src={conversation.otherParticipant.profileImage}
                    alt={conversation.otherParticipant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-secondary/10 rounded-full">
                    <span className="text-secondary font-medium">
                      {conversation.otherParticipant?.name?.[0] || '?'}
                    </span>
                  </div>
                )}
                {conversation.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs flex items-center justify-center rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h4 className="font-medium truncate">
                    {conversation.otherParticipant?.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {conversation.conversationLastMessage?.createdAt ? 
                      new Date(conversation.conversationLastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.conversationLastMessage?.content || 'No messages yet'}
                </p>
              </div>
            </Link>
          ))}
          <Link to="/dashboard/messages" className="block text-center text-secondary text-sm mt-2 hover:underline">
            View all messages
          </Link>
        </>
      ) : (
        <div className="text-center py-6">
          <MessageSquare size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">No recent messages</p>
          <Link to="/dashboard/messages" className="text-secondary text-sm hover:underline mt-2 inline-block">
            Start a conversation
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentMessages;
