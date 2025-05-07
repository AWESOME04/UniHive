import { Request, Response, NextFunction } from 'express';
import { User, OTP, PasswordReset } from '../models';
import { hashPassword, verifyPassword, generateToken, generateOTP, generatePasswordResetToken, verifyPasswordResetToken } from '../utils/authUtils';
import { sendOTPEmail, sendPasswordResetEmail } from '../services/emailService';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, university } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'Email already in use.'
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      university,
      isVerified: false
    });

    // Generate OTP
    const otpCode = generateOTP();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 15); // OTP expires in 15 minutes

    // Save OTP to database
    await OTP.create({
      userId: user.id,
      otp: otpCode,
      expiresAt: expiryTime
    });

    const emailSent = await sendOTPEmail(email, name, otpCode);
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (!emailSent && !isDevelopment) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send verification email.'
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      message: isDevelopment 
        ? 'User registered successfully. Check server console for OTP code.'
        : 'User registered successfully. Please check your email for verification code.',
      data: {
        userId: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration.'
    });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }

    // Check if user is already verified
    if (user.isVerified) {
      res.status(400).json({
        status: 'error',
        message: 'User already verified.'
      });
      return;
    }

    // Find valid OTP
    const validOTP = await OTP.findOne({
      where: {
        userId: user.id,
        otp,
        expiresAt: {
          [Op.gt]: new Date() // OTP hasn't expired
        }
      }
    });

    if (!validOTP) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired OTP.'
      });
      return;
    }

    // Update user to verified
    await user.update({ isVerified: true });

    // Delete used OTP
    await validOTP.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully.',
      data: {
        userId: user.id,
        email: user.email,
        isVerified: true
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during verification.'
    });
  }
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password.'
      });
      return;
    }

    // Check if user is verified
    if (!user.isVerified) {
      res.status(403).json({
        status: 'error',
        message: 'Please verify your email before logging in.'
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password.'
      });
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          university: user.university,
          profileImage: user.profileImage,
          bio: user.bio,
          rating: user.rating
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login.'
    });
  }
};

// Resend OTP
export const resendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }

    // Check if user is already verified
    if (user.isVerified) {
      res.status(400).json({
        status: 'error',
        message: 'User already verified.'
      });
      return;
    }

    // Delete any existing OTPs for the user
    await OTP.destroy({
      where: {
        userId: user.id
      }
    });

    // Generate new OTP
    const otpCode = generateOTP();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 15); // OTP expires in 15 minutes

    // Save new OTP to database
    await OTP.create({
      userId: user.id,
      otp: otpCode,
      expiresAt: expiryTime
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, user.name, otpCode);

    if (!emailSent) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send verification email.'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Verification code has been resent. Please check your email.',
      data: {
        userId: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while resending verification code.'
    });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // User is attached from authenticate middleware
    const user = req.user;
    
    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        university: user.university,
        profileImage: user.profileImage,
        bio: user.bio,
        rating: user.rating,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user data.'
    });
  }
};

// Forgot Password - request password reset
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
      return;
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // For security reasons, we still return success even if the email doesn't exist
      res.status(200).json({
        status: 'success',
        message: 'If your email exists in our system, you will receive a password reset link shortly.'
      });
      return;
    }

    // Delete any existing reset tokens for the user
    await PasswordReset.destroy({
      where: { userId: user.id }
    });

    // Generate reset token
    const token = generatePasswordResetToken(user.id);
    
    // Set token expiry (1 hour)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);

    // Save token to database
    await PasswordReset.create({
      userId: user.id,
      token,
      expiresAt: expiryTime
    });

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(email, user.name, token);

    if (!emailSent) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send password reset email.'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'If your email exists in our system, you will receive a password reset link shortly.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.'
    });
  }
};

// Reset Password - complete password reset
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Email, token, and password are required'
      });
      return;
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset link'
      });
      return;
    }

    try {
      // Verify the reset token
      const decoded = verifyPasswordResetToken(token);
      
      // Check if the token is for password reset and matches user ID
      if (decoded.purpose !== 'password-reset' || decoded.id !== user.id) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid reset token'
        });
        return;
      }
      
      // Find valid token in database
      const resetRecord = await PasswordReset.findOne({
        where: {
          userId: user.id,
          token,
          expiresAt: {
            [Op.gt]: new Date() // Hasn't expired
          }
        }
      });

      if (!resetRecord) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid or expired reset link'
        });
        return;
      }

      // Hash new password
      const hashedPassword = await hashPassword(password);
      
      // Update user's password
      await user.update({ password: hashedPassword });
      
      // Delete the used token
      await resetRecord.destroy();
      
      res.status(200).json({
        status: 'success',
        message: 'Password has been reset successfully. Please log in with your new password.'
      });
    } catch (error) {
      // Token verification failed
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset link'
      });
      return;
    }
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while resetting your password.'
    });
  }
};
