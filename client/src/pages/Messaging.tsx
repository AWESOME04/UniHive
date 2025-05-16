import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MoreVertical, Paperclip, Phone, Search, Send, Plus, 
  Video, Image, Smile, ChevronRight, User, Users, Bell, X, Filter,
  Calendar, MessageSquare, Check, CheckCheck
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'file' | 'image';
    name: string;
    url: string;
  };
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status?: 'online' | 'offline' | 'away';
  unread?: boolean;
}

function Messaging() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Andy Robertson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Oh yes, please send your CV/Resume here.',
      time: '09:45 am',
      status: 'online',
      unread: true
    },
    {
      id: '2',
      name: 'Giorgio Chiellini',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      lastMessage: 'Hello sir, Good Morning!',
      time: '10:01 am',
      status: 'online'
    },
    {
      id: '3',
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'I saw the UI/UX Designer role...',
      time: '02:30 pm',
      status: 'away'
    },
    {
      id: '4',
      name: 'Megan Rapinoe',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      lastMessage: 'I am interested in the UI/UX Designer role...',
      time: '01:00 pm',
      status: 'offline'
    },
    {
      id: '5',
      name: 'Alessandro Bastoni',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      lastMessage: 'Thanks for your quick response!',
      time: '05:00 pm',
      status: 'offline'
    },
    {
      id: '6',
      name: 'Ilkay Gundogan',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      lastMessage: 'When is the interview scheduled?',
      time: 'Yesterday',
      status: 'offline'
    },
    {
      id: '7',
      name: 'Web Design Group',
      avatar: 'https://ui-avatars.com/api/?name=WD&background=4F46E5&color=fff',
      lastMessage: "Sarah: I'll share my screen in the next meeting",
      time: '2 days ago',
      status: 'offline'
    }
  ]);

  // Mock chat data
  useEffect(() => {
    if (id) {
      const selectedContact = contacts.find(contact => contact.id === id);
      if (selectedContact) {
        setActiveContact(selectedContact);
      }

      setMessages([
        {
          id: '1',
          text: 'Hello sir, Good Morning!',
          time: '09:45 am',
          sender: 'other',
        },
        {
          id: '2',
          text: 'Morning! Can I help you?',
          time: '09:51 am',
          sender: 'me',
          status: 'read'
        },
        {
          id: '3',
          text: 'I am interested in the UI/UX Designer position that you uploaded on fiverr yesterday, and I would like to know more about joining your company.',
          time: '09:53 am',
          sender: 'other',
        },
        {
          id: '4',
          text: 'Oh yes, please send your CV/Resume here.',
          time: '09:55 am',
          sender: 'me',
          status: 'read'
        },
        {
          id: '5',
          text: '',
          time: '09:58 am',
          sender: 'other',
          attachment: {
            type: 'file',
            name: 'Expert-CV-UX-Designer.pdf',
            url: '#',
          },
        },
        {
          id: '6',
          text: 'Thanks for sending your CV. Your experience looks impressive! When would you be available for an interview?',
          time: '10:05 am',
          sender: 'me',
          status: 'delivered'
        },
      ]);
    }
  }, [id, contacts]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
        status: 'sent'
      };
      
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact);
    navigate(`/messaging/${contact.id}`);
    
    // Mark as read
    if (contact.unread) {
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, unread: false } : c
      ));
    }
  };

  const filteredContacts = contacts.filter(contact => {
    // Filter by search term
    if (searchTerm && !contact.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'unread' && !contact.unread) {
      return false;
    }
    
    if (activeTab === 'groups' && !contact.name.includes('Group')) {
      return false;
    }
    
    return true;
  });

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cursor light effect */}
      <div 
        className="pointer-events-none absolute -inset-40 opacity-20 bg-gradient-radial from-primary to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: '80vw',
          height: '80vw',
          transition: 'left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      ></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-light-orange opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button className="btn-primary flex items-center">
            <Plus size={18} className="mr-2" /> New Message
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Message List Column */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeTab === 'all' 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('unread')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeTab === 'unread' 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unread
                </button>
                <button 
                  onClick={() => setActiveTab('groups')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeTab === 'groups' 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Groups
                </button>
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`p-2 rounded-full ${showFilter ? 'bg-light-orange text-secondary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Filter size={18} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
            
            {showFilter && (
              <div className="p-3 bg-gray-50 border-b">
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-white border rounded-full text-xs font-medium">
                    Date <ChevronRight size={14} className="inline ml-1" />
                  </button>
                  <button className="px-3 py-1 bg-white border rounded-full text-xs font-medium">
                    Status <ChevronRight size={14} className="inline ml-1" />
                  </button>
                  <button className="px-3 py-1 bg-white border rounded-full text-xs font-medium">
                    Category <ChevronRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="p-3 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`p-3 border-b flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeContact?.id === contact.id ? 'bg-light-orange bg-opacity-20' : ''
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3" 
                      />
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                      {contact.status === 'away' && (
                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></span>
                      )}
                      {contact.unread && (
                        <span className="absolute top-0 right-2 w-5 h-5 bg-secondary text-white rounded-full border-2 border-white flex items-center justify-center text-xs">
                          1
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <p className={`text-xs truncate ${contact.unread ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">No messages found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
            
            <div className="p-3 flex justify-around border-t bg-gray-50">
              <button className="text-gray-500 hover:text-secondary p-2 rounded-full">
                <Users size={20} />
              </button>
              <button className="text-gray-500 hover:text-secondary p-2 rounded-full">
                <Bell size={20} />
              </button>
              <button className="text-gray-500 hover:text-secondary p-2 rounded-full">
                <User size={20} />
              </button>
              <button className="text-gray-500 hover:text-secondary p-2 rounded-full">
                <Calendar size={20} />
              </button>
            </div>
          </div>

          {/* Chat Column */}
          <div className="lg:col-span-8">
            {activeContact ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-150px)]">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => navigate('/messaging')}
                      className="mr-3 text-gray-600 hover:text-gray-900 lg:hidden"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <img
                      src={activeContact.avatar}
                      alt={activeContact.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h2 className="font-semibold">{activeContact.name}</h2>
                      <p className={`text-xs ${
                        activeContact.status === 'online' ? 'text-green-500' : 
                        activeContact.status === 'away' ? 'text-yellow-500' : 'text-gray-500'
                      }`}>
                        {activeContact.status === 'online' ? 'Online' : 
                         activeContact.status === 'away' ? 'Away' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-secondary p-2 rounded-full">
                      <Phone size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-secondary p-2 rounded-full">
                      <Video size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-secondary p-2 rounded-full">
                      <Search size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-secondary p-2 rounded-full">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Message area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'me' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'other' && (
                          <img
                            src={activeContact.avatar}
                            alt={activeContact.name}
                            className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                          />
                        )}
                        <div
                          className={`max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-secondary text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          {message.text && <p className="mb-1">{message.text}</p>}
                          
                          {message.attachment && (
                            <div className="mb-2 p-2 bg-white bg-opacity-10 rounded flex items-center">
                              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5 text-red-500"
                                >
                                  <path d="M7 18h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1z" />
                                  <path d="M9 10h6v1H9z" fill="white" />
                                  <path d="M9 13h4v1H9z" fill="white" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{message.attachment.name}</p>
                                <p className="text-xs opacity-70">PDF Document</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="text-right flex items-center justify-end space-x-1">
                            <span className={`text-xs ${message.sender === 'me' ? 'text-gray-200' : 'text-gray-500'}`}>
                              {message.time}
                            </span>
                            {message.sender === 'me' && message.status && (
                              <span>{getStatusIcon(message.status)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input area */}
                <div className="p-3 border-t flex items-center bg-white">
                  <div className="flex space-x-2 mr-3">
                    <button className="p-2 text-gray-500 hover:text-secondary rounded-full">
                      <Paperclip size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-secondary rounded-full">
                      <Image size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-secondary rounded-full">
                      <Smile size={18} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className={`p-2 rounded-full ml-3 ${
                      messageText.trim() ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-150px)]">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Select a conversation</h2>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <div className="mb-6">
                    <div className="w-32 h-32 bg-light-orange bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                      <MessageSquare size={48} className="text-secondary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-xl mb-2">No conversation selected</h3>
                  <p className="text-gray-500 text-center mb-8 max-w-md">
                    Choose from your existing conversations or start a new one to connect with other students and professionals
                  </p>
                  <button className="btn-primary px-6 py-3 flex items-center">
                    <Plus size={18} className="mr-2" /> Start a new conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
