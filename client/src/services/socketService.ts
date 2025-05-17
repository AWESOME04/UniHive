import { io, Socket } from "socket.io-client";
import authService from "./authService";

class SocketService {
  private socket: Socket | null = null;
  private initialized: boolean = false;

  initialize() {
    if (this.initialized) return;

    const token = authService.getToken();
    if (!token) return;

    const baseURL = import.meta.env?.VITE_API_URL || 'https://unihive-hmoi.onrender.com';
    
    try {
      this.socket = io(baseURL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 10
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize socket:', error);
    }
  }

  getSocket(): Socket | null {
    if (!this.initialized) {
      this.initialize();
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.initialized = false;
    }
  }

  sendMessage(data: { conversationId: string; content: string; recipientId: string }) {
    if (this.socket) {
      this.socket.emit('sendMessage', data);
    }
  }

  joinConversation(conversationId: string) {
    if (this.socket) {
      this.socket.emit('joinConversation', { conversationId });
    }
  }

  leaveConversation(conversationId: string) {
    if (this.socket) {
      this.socket.emit('leaveConversation', { conversationId });
    }
  }

  sendTyping(conversationId: string, isTyping: boolean) {
    if (this.socket) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
    return () => {
      if (this.socket) {
        this.socket.off('newMessage', callback);
      }
    };
  }

  onTyping(callback: (data: { userId: string; conversationId: string; isTyping: boolean }) => void) {
    if (this.socket) {
      this.socket.on('userTyping', callback);
    }
    return () => {
      if (this.socket) {
        this.socket.off('userTyping', callback);
      }
    };
  }
}

const socketService = new SocketService();
export default socketService;
