import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyToken } from '../utils/authUtils';
import { User, Conversation, Message } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userData?: any;
}

// Map of userId to socketId
const connectedUsers = new Map<string, string>();

export const setupSocketServer = (server: HttpServer) => {
  const io = new SocketServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token not provided'));
      }
      
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.id);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      // Attach user ID to socket for future use
      socket.userId = user.id;
      socket.userData = {
        id: user.id,
        name: user.name
      };
      
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    const { userId, userData } = socket;
    
    if (userId) {
      console.log(`User connected: ${userId}`);
      
      // Add user to connected users
      connectedUsers.set(userId, socket.id);
      
      // Join user to their personal room
      socket.join(userId);
      
      // Send online status to client
      socket.emit('connectionStatus', { 
        status: 'connected',
        userId,
        userData
      });
      
      // Handle joining a conversation
      socket.on('joinConversation', (data: { conversationId: string }) => {
        socket.join(data.conversationId);
        console.log(`User ${userId} joined conversation ${data.conversationId}`);
      });
      
      // Handle leaving a conversation
      socket.on('leaveConversation', (data: { conversationId: string }) => {
        socket.leave(data.conversationId);
        console.log(`User ${userId} left conversation ${data.conversationId}`);
      });
      
      // Handle sending a message
      socket.on('sendMessage', async (data: { 
        conversationId: string,
        recipientId: string,
        content: string 
      }) => {
        try {
          const { conversationId, recipientId, content } = data;
          
          const transaction = await sequelize.transaction();
          
          try {
            // Validate conversation exists and user is participant
            const conversation = await Conversation.findOne({
              where: {
                id: conversationId
              },
              transaction
            });
            
            if (!conversation) {
              socket.emit('error', { message: 'Conversation not found' });
              await transaction.rollback();
              return;
            }
            
            // Check if user is a participant
            if (conversation.participantOneId !== userId && conversation.participantTwoId !== userId) {
              socket.emit('error', { message: 'You are not part of this conversation' });
              await transaction.rollback();
              return;
            }
            
            // Create new message
            const newMessage = await Message.create({
              conversationId,
              senderId: userId,
              content,
              isRead: false
            }, { transaction });
            
            // Update conversation's lastMessage
            await conversation.update({
              lastMessageId: newMessage.id
            }, { transaction });
            
            await transaction.commit();
            
            // Get the complete message with sender info
            const completeMessage = await Message.findByPk(newMessage.id, {
              include: [
                {
                  model: User,
                  as: 'messageAuthor',
                  attributes: ['id', 'name', 'profileImage']
                }
              ]
            });
            
            // Emit message to the conversation room
            io.to(conversationId).emit('newMessage', completeMessage);
            
            // If recipient is not in the conversation room but is online, 
            // emit a separate notification
            const recipientSocketId = connectedUsers.get(recipientId);
            if (recipientSocketId) {
              io.to(recipientSocketId).emit('messageNotification', {
                message: completeMessage,
                conversation: {
                  id: conversation.id,
                  senderId: userId,
                  senderName: userData.name
                }
              });
            }
          } catch (dbError) {
            await transaction.rollback();
            console.error('Database error in sendMessage:', dbError);
            socket.emit('error', { message: 'Failed to send message' });
          }
        } catch (error) {
          console.error('Error in sendMessage event:', error);
          socket.emit('error', { message: 'Failed to process message' });
        }
      });
      
      // Handle marking messages as read
      socket.on('markAsRead', async (data: { 
        conversationId: string,
        messageIds?: string[]
      }) => {
        try {
          const { conversationId, messageIds } = data;
          
          // Validate conversation exists and user is participant
          const conversation = await Conversation.findOne({
            where: {
              id: conversationId
            }
          });
          
          if (!conversation) {
            socket.emit('error', { message: 'Conversation not found' });
            return;
          }
          
          if (conversation.participantOneId !== userId && conversation.participantTwoId !== userId) {
            socket.emit('error', { message: 'You are not part of this conversation' });
            return;
          }
          
          // Update message(s)
          const whereClause: any = {
            conversationId,
            senderId: { [Op.ne]: userId },
            isRead: false
          };
          
          // If specific message IDs are provided, add them to the where clause
          if (messageIds && messageIds.length > 0) {
            whereClause.id = messageIds;
          }
          
          await Message.update(
            { isRead: true },
            { where: whereClause }
          );
          
          // Notify both participants that messages were read
          io.to(conversationId).emit('messagesRead', {
            conversationId,
            readBy: userId,
            messageIds: messageIds || 'all'
          });
        } catch (error) {
          console.error('Error in markAsRead event:', error);
          socket.emit('error', { message: 'Failed to mark messages as read' });
        }
      });
      
      // Handle user typing status
      socket.on('typing', (data: { conversationId: string, isTyping: boolean }) => {
        const { conversationId, isTyping } = data;
        
        // Emit to everyone in the conversation except the sender
        socket.to(conversationId).emit('userTyping', {
          userId,
          isTyping
        });
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${userId}`);
        connectedUsers.delete(userId);
        
        // Notify friends that user is offline
        io.emit('userStatus', { userId, status: 'offline' });
      });
    }
  });
  
  return io;
};

// Helper function to check if a user is online
export const isUserOnline = (userId: string): boolean => {
  return connectedUsers.has(userId);
};

// Helper function to get online users
export const getOnlineUsers = (): string[] => {
  return Array.from(connectedUsers.keys());
};
