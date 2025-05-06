import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Generate hashed password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Verify password
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_here';
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_here';
  return jwt.verify(token, secret);
};

// Generate random OTP
export const generateOTP = (): string => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};
