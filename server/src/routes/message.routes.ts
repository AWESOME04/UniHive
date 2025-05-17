import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  getOrCreateConversation,
  getConversations,
  getMessages,
  markMessagesAsRead,
  sendMessage
} from '../controllers/messageController';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Conversation routes
router.post('/conversations', getOrCreateConversation);
router.get('/conversations', getConversations);
router.get('/conversations/:conversationId/messages', getMessages);
router.put('/conversations/:conversationId/read', markMessagesAsRead);
router.post('/send', sendMessage);

export default router;
