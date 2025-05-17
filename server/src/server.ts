import express, { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { sequelize } from './config/database';
import setupAssociations from './models/index';
import { setupSocketServer } from './socket/socketManager';
import { Conversation, Message } from './models';

dotenv.config();

const app: Express = express();
const PORT = parseInt(process.env.PORT || '10000', 10);

const server = http.createServer(app);

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://unihive.vercel.app',
  'https://uni-hive.vercel.app'
];

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to UniHive API',
  });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    setupAssociations();
    console.log('Model associations initialized successfully.');

    console.log('Synchronizing database models without altering existing constraints...');
    await sequelize.sync({ force: false, alter: false });

    // Only force sync Conversation and Message models in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      console.log('Force syncing conversation and message models...');
      await Conversation.sync({ force: true });
      await Message.sync({ force: true });
      console.log('Database synchronized successfully.');
    } else {
      console.warn('Skipping force sync of conversation and message models in production to prevent data loss.');
    }
    
    const io = setupSocketServer(server);
    console.log('Socket.IO server initialized.');
    
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server bound to 0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

export default app;
