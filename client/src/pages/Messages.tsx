import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MoreVertical, Paperclip, Phone, Search, Send, Plus, 
  Video, Image, Smile, ChevronRight, User, Users, Bell, X, Filter,
  Calendar, MessageSquare, Check, CheckCheck, Loader
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import messageService from '../services/messageService';
import socketService from '../services/socketService';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  messageAuthor?: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}

interface Contact {
  id: string;
  name: string;
  avatar: string | null; // This should not include undefined
  lastMessage?: string;
  time?: string;
  status?: 'online' | 'offline' | 'away';
  unread?: boolean;
  unreadCount?: number;
}

function Messages() {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize socket connection
  useEffect(() => {
    socketService.initialize();
    
    // Set up listener for new messages
    const unsubscribe = socketService.onNewMessage((newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      
      // Update contacts with new message
      setContacts((prevContacts) => {
        return prevContacts.map((contact) => {
          if (contact.id === newMessage.conversationId) {
            return {
              ...contact,
              lastMessage: newMessage.content,
              time: new Date(newMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unread: newMessage.senderId !== user?.id,
              unreadCount: contact.unreadCount ? contact.unreadCount + 1 : 1
            };
          }
          return contact;
        });
      });
    });
    
    return () => {
      unsubscribe();
    };
  }, [conversationId, user?.id]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const conversations = await messageService.getConversations();
        
        // Transform conversations to contacts
        const contactList: Contact[] = conversations.map(conv => {
          const otherUser = conv.otherParticipant;
          return {
            id: conv.id,
            name: otherUser?.name || 'Unknown User',
            avatar: otherUser?.profileImage || null, // Convert undefined to null
            lastMessage: conv.conversationLastMessage?.content || 'No messages yet',
            time: conv.conversationLastMessage 
              ? new Date(conv.conversationLastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : new Date(conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'offline', // We'll need to implement online status via websockets
            unread: conv.unreadCount ? conv.unreadCount > 0 : false,
            unreadCount: conv.unreadCount || 0
          };
        });
        
        setContacts(contactList);
        
        // If we have a conversationId, find the corresponding contact
        if (conversationId) {
          const selectedContact = contactList.find(contact => contact.id === conversationId);
          if (selectedContact) {
            setActiveContact(selectedContact);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, [conversationId]);

  // Fetch messages when conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      
      try {
        setLoadingMessages(true);
        
        // Mark messages as read
        await messageService.markMessagesAsRead(conversationId);
        
        // Get messages
        const { messages: conversationMessages } = await messageService.getMessages(conversationId);
        setMessages(conversationMessages.reverse()); // Reverse to show newest at bottom
        
        // Update contacts to clear unread count
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === conversationId 
              ? { ...contact, unread: false, unreadCount: 0 }
              : contact
          )
        );
        
        setLoadingMessages(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoadingMessages(false);
      }
    };
    
    if (conversationId) {
      fetchMessages();
      
      // Join conversation room for real-time updates
      socketService.joinConversation(conversationId);
    }
    
    return () => {
      if (conversationId) {
        // Leave conversation room when unmounting
        socketService.leaveConversation(conversationId);
      }
    };
  }, [conversationId]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !conversationId || !activeContact) return;
    
    try {
      setSending(true);
      
      // Get the other participant's ID for the conversation
      const otherUserId = activeContact.id;
      
      // Send message via REST API
      const newMessage = await messageService.sendMessage(conversationId, messageText);
      
      // Also send via Socket for real-time updates
      socketService.sendMessage({
        conversationId,
        content: messageText,
        recipientId: otherUserId
      });
      
      // Add message to local state
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      setSending(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setSending(false);
    }
  };

  const handleContactSelect = async (contact: Contact) => {
    setActiveContact(contact);
    navigate(`/dashboard/messages/${contact.id}`);
    
    // Mark as read
    if (contact.unread) {
      try {
        await messageService.markMessagesAsRead(contact.id);
        
        setContacts(contacts.map(c => 
          c.id === contact.id ? { ...c, unread: false, unreadCount: 0 } : c
        ));
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
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
    
    if (activeTab === 'groups') {
      return false; // We don't have groups yet
    }
    
    return true;
  });

  const getStatusIcon = (message: Message) => {
    const isOwnMessage = message.senderId === user?.id;
    if (!isOwnMessage) return null;
    
    if (message.isRead) {
      return <CheckCheck size={14} className="text-secondary" />;
    }
    return <Check size={14} className="text-gray-400" />;
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
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader size={24} className="animate-spin text-secondary" />
                </div>
              ) : filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`p-3 border-b flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeContact?.id === contact.id ? 'bg-light-orange bg-opacity-20' : ''
                    }`}
                  >
                    <div className="relative">
                      {contact.avatar ? (
                        <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="w-12 h-12 rounded-full object-cover mr-3" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                          <span className="text-lg font-bold text-secondary">{contact.name[0]}</span>
                        </div>
                      )}
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                      {contact.status === 'away' && (
                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></span>
                      )}
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <span className="absolute top-0 right-2 w-5 h-5 bg-secondary text-white rounded-full border-2 border-white flex items-center justify-center text-xs">
                          {contact.unreadCount}
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
                      onClick={() => navigate('/dashboard/messages')}
                      className="mr-3 text-gray-600 hover:text-gray-900 lg:hidden"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    {activeContact.avatar ? (
                      <img
                        src={activeContact.avatar}
                        alt={activeContact.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-secondary">{activeContact.name[0]}</span>
                      </div>
                    )}
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
                  {loadingMessages ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader size={24} className="animate-spin text-secondary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center py-10">
                          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={24} className="text-gray-400" />
                          </div>
                          <p className="text-gray-500">No messages yet</p>
                          <p className="text-sm text-gray-400">Send a message to start the conversation</p>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.senderId === user?.id ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.senderId !== user?.id && (
                              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2 self-end">
                                {message.messageAuthor?.profileImage ? (
                                  <img
                                    src={message.messageAuthor.profileImage}
                                    alt={message.messageAuthor.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-xs font-bold text-secondary">
                                    {message.messageAuthor?.name?.[0] || '?'}
                                  </span>
                                )}
                              </div>
                            )}
                            <div
                              className={`max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-lg ${
                                message.senderId === user?.id
                                  ? 'bg-secondary text-white rounded-br-none'
                                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                              }`}
                            >
                              <p className="mb-1">{message.content}</p>
                              <div className="text-right flex items-center justify-end space-x-1">
                                <span className={`text-xs ${message.senderId === user?.id ? 'text-gray-200' : 'text-gray-500'}`}>
                                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {message.senderId === user?.id && getStatusIcon(message)}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
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
                    disabled={sending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || sending}
                    className={`p-2 rounded-full ml-3 ${
                      messageText.trim() && !sending ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {sending ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
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

export default Messages;
