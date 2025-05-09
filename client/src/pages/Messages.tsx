import { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, User } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CHAT = {
  user: {
    id: '1',
    name: 'Evans Acheampong',
    avatar: '/assets/images/evans.png',
    status: 'online',
    lastSeen: 'just now',
    university: 'University of Ghana'
  },
  messages: [
    {
      id: '1',
      content: 'Hi there! I saw your Electric Stove listing. Is it still available?',
      sender: 'Evans Acheampong',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isMe: false
    },
    {
      id: '2',
      content: 'Yes, it is! Are you interested in buying it?',
      sender: 'Me',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isMe: true
    },
    {
      id: '3',
      content: 'Great! Could you tell me more about its condition and how long you\'ve had it?',
      sender: 'Evans Acheampong',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      isMe: false
    }
  ]
};

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_CHAT.messages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'Me',
      timestamp: new Date().toISOString(),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Chat list sidebar */}
      <motion.div 
        className="w-80 border-r border-gray-200 bg-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {/* Active chat preview */}
          <div className="p-4 bg-secondary/5 border-l-4 border-secondary hover:bg-secondary/10 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={MOCK_CHAT.user.avatar} 
                  alt={MOCK_CHAT.user.name} 
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${MOCK_CHAT.user.name}&background=random`;
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900">{MOCK_CHAT.user.name}</p>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Could you tell me more about its condition...</p>
              </div>
            </div>
          </div>
          
          {/* Empty state for other chats */}
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No other conversations yet</p>
          </div>
        </div>
      </motion.div>

      {/* Chat area */}
      <motion.div 
        className="flex-1 flex flex-col bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Chat header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={MOCK_CHAT.user.avatar} 
                alt={MOCK_CHAT.user.name} 
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${MOCK_CHAT.user.name}&background=random`;
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="ml-3">
              <h2 className="font-medium text-gray-900">{MOCK_CHAT.user.name}</h2>
              <p className="text-xs text-gray-500">{MOCK_CHAT.user.university}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`max-w-[70%] ${msg.isMe ? 'bg-secondary text-white' : 'bg-white'} rounded-2xl px-4 py-2 shadow-sm`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <motion.button
              type="submit"
              className="p-2 bg-secondary text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!message.trim()}
            >
              <Send size={20} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Messages;
