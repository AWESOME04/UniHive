import { Request, Response, NextFunction } from 'express';
import { Conversation, Message, User } from '../models';
import { Op } from 'sequelize';
import { sequelize } from '../config/database';

// Create or get a conversation between two users
export const getOrCreateConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { recipientId } = req.body;
    const userId = req.user.id;
    
    // Don't allow conversations with self
    if (userId === recipientId) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Cannot create conversation with yourself'
      });
      return;
    }
    
    // Check if recipient exists
    const recipient = await User.findByPk(recipientId);
    if (!recipient) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Recipient not found'
      });
      return;
    }
    
    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          {
            participantOneId: userId,
            participantTwoId: recipientId
          },
          {
            participantOneId: recipientId,
            participantTwoId: userId
          }
        ]
      },
      include: [
        { model: User, as: 'participantOneUser', attributes: ['id', 'name', 'profileImage'] },
        { model: User, as: 'participantTwoUser', attributes: ['id', 'name', 'profileImage'] },
        { model: Message, as: 'conversationLastMessage' }
      ],
      transaction
    });
    
    if (!conversation) {
      // Create a new conversation
      conversation = await Conversation.create({
        participantOneId: userId,
        participantTwoId: recipientId
      }, { transaction });
      
      // Reload to get the associations
      conversation = await Conversation.findByPk(conversation.id, {
        include: [
          { model: User, as: 'participantOneUser', attributes: ['id', 'name', 'profileImage'] },
          { model: User, as: 'participantTwoUser', attributes: ['id', 'name', 'profileImage'] }
        ],
        transaction
      });
    }
    
    await transaction.commit();
    
    res.status(200).json({
      status: 'success',
      data: conversation
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error in getOrCreateConversation:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get or create conversation'
    });
  }
};

// Get all conversations for the current user
export const getConversations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { participantOneId: userId },
          { participantTwoId: userId }
        ]
      },
      include: [
        { 
          model: User, 
          as: 'participantOneUser',
          attributes: ['id', 'name', 'profileImage'] 
        },
        { 
          model: User, 
          as: 'participantTwoUser',
          attributes: ['id', 'name', 'profileImage'] 
        },
        { 
          model: Message, 
          as: 'conversationLastMessage',
          include: [{ model: User, as: 'messageAuthor', attributes: ['id', 'name'] }]
        }
      ],
      order: [['updatedAt', 'DESC']]
    });
    
    // Process conversations to add an "otherParticipant" field
    const processedConversations = conversations.map(conversation => {
      const conv = conversation.toJSON();
      // Determine which participant is the other user
      conv.otherParticipant = conv.participantOneId === userId 
        ? conv.participantTwoUser 
        : conv.participantOneUser;
      
      // Count unread messages
      conv.unreadCount = 0;
      
      return conv;
    });
    
    // Get unread counts for each conversation
    for (let i = 0; i < processedConversations.length; i++) {
      const conv = processedConversations[i];
      const unreadCount = await Message.count({
        where: {
          conversationId: conv.id,
          senderId: { [Op.ne]: userId },
          isRead: false
        }
      });
      
      processedConversations[i].unreadCount = unreadCount;
    }
    
    res.status(200).json({
      status: 'success',
      data: processedConversations
    });
  } catch (error) {
    console.error('Error in getConversations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get conversations'
    });
  }
};

// Get messages for a specific conversation
export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;
    
    // Check if conversation exists and user is a participant
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [
          { participantOneId: userId },
          { participantTwoId: userId }
        ]
      }
    });
    
    if (!conversation) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation not found or you do not have access'
      });
      return;
    }
    
    // Get messages
    const messages = await Message.findAndCountAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: 'messageAuthor',
          attributes: ['id', 'name', 'profileImage']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: Number(offset)
    });
    
    // Mark messages from other user as read
    await Message.update(
      { isRead: true },
      {
        where: {
          conversationId,
          senderId: { [Op.ne]: userId },
          isRead: false
        }
      }
    );
    
    res.status(200).json({
      status: 'success',
      count: messages.count,
      data: messages.rows,
      pagination: {
        total: messages.count,
        limit: Number(limit),
        offset: Number(offset),
        pages: Math.ceil(messages.count / Number(limit)),
        currentPage: Math.floor(Number(offset) / Number(limit)) + 1
      }
    });
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get messages'
    });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;
    
    // Check if conversation exists and user is a participant
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [
          { participantOneId: userId },
          { participantTwoId: userId }
        ]
      }
    });
    
    if (!conversation) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation not found or you do not have access'
      });
      return;
    }
    
    // Mark all messages from other participant as read
    const [updated] = await Message.update(
      { isRead: true },
      {
        where: {
          conversationId,
          senderId: { [Op.ne]: userId },
          isRead: false
        }
      }
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Messages marked as read',
      count: updated
    });
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark messages as read'
    });
  }
};

// Send a message (REST API method for testing)
export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user.id;
    
    if (!conversationId || !content) {
      res.status(400).json({
        status: 'error',
        message: 'Conversation ID and content are required'
      });
      return;
    }
    
    // Check if conversation exists and user is a participant
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [
          { participantOneId: senderId },
          { participantTwoId: senderId }
        ]
      }
    });
    
    if (!conversation) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation not found or you do not have access'
      });
      return;
    }
    
    // Create the message
    const newMessage = await Message.create({
      conversationId,
      senderId,
      content,
      isRead: false
    });
    
    // Update conversation with lastMessageId
    await conversation.update({ 
      lastMessageId: newMessage.id,
      updatedAt: new Date() 
    });
    
    // Get complete message with sender info
    const completeMessage = await Message.findByPk(newMessage.id, {
      include: [
        {
          model: User,
          as: 'messageAuthor',
          attributes: ['id', 'name', 'profileImage']
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      data: completeMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send message'
    });
  }
};
