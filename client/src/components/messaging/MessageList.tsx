import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Pencil, House, MessageCircle, Search, Trash2, User } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    status?: 'online' | 'offline';
  };
  preview: string;
  time: string;
  isRead: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      id: 'user1',
      name: 'Andy Robertson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online'
    },
    preview: 'Oh yes, please send your CV/Resume here...',
    time: '09:45 am',
    isRead: false
  },
  {
    id: '2',
    sender: {
      id: 'user2', 
      name: 'Giorgio Chiellini',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    preview: 'Hello, Good Morning!',
    time: '10:20 am',
    isRead: true
  },
  {
    id: '3',
    sender: {
      id: 'user3',
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    preview: 'I saw the UI/UX Designer position you posted...',
    time: '02:30 pm',
    isRead: true
  }
];

function MessageList() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteMessage = (id: string) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  };

  const filteredMessages = messages.filter(message => 
    message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-xl-soft h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <button className="text-secondary hover:text-opacity-80">
            <Pencil size={20} />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length > 0 ? (
          <div className="divide-y">
            {filteredMessages.map((message) => (
              <Link
                key={message.id}
                to={`/messages/${message.id}`}
                className="flex items-center p-4 hover:bg-gray-50 transition-default"
              >
                <div className="relative mr-3">
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {message.sender.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold truncate">{message.sender.name}</h3>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                </div>
                {!message.isRead && (
                  <span className="w-2 h-2 bg-secondary rounded-full ml-2"></span>
                )}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteMessage(message.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-default"
                >
                  <Trash2 size={16} />
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Messages</h3>
            <p className="text-gray-600 mb-6">You currently have no incoming messages. Thank you!</p>
            <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-default">
              CREATE A MESSAGE
            </button>
          </div>
        )}
      </div>

      <div className="border-t p-3 grid grid-cols-5 gap-2">
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-gray-700">
          <House size={20} />
        </button>
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        <button className="flex flex-col items-center justify-center py-2 rounded-full bg-secondary text-white">
          <MessageCircle size={20} />
        </button>
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-gray-700">
          <Search size={20} />
        </button>
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 hover:text-gray-700">
          <User size={20} />
        </button>
      </div>
    </div>
  );
}

export default MessageList;
