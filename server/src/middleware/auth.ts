import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authUtils';
import { User } from '../models';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required. No token provided.'
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token.'
    });
  }
};

// Middleware to check if user is verified
export const isVerified = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user.isVerified) {
    res.status(403).json({
      status: 'error',
      message: 'Email verification required before accessing this resource.'
    });
    return;
  }
  next();
};
