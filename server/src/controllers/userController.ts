import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { hashPassword, verifyPassword } from '../utils/authUtils';

// Update current user's profile with image upload support
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    const { name, bio, university, profileImage } = req.body;
    
    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }
    
    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (university) user.university = university;
    if (profileImage !== undefined) user.profileImage = profileImage;
    
    // Save changes
    await user.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        university: user.university,
        profileImage: user.profileImage,
        bio: user.bio,
        rating: user.rating,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile'
    });
  }
};

// Get public profile of any user by ID
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }
    
    // Return public profile info (excluding sensitive data)
    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        name: user.name,
        university: user.university,
        profileImage: user.profileImage,
        bio: user.bio,
        rating: user.rating,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user profile'
    });
  }
};

// Change password
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
      return;
    }
    
    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.'
      });
      return;
    }
    
    // Verify current password
    const isPasswordValid = await verifyPassword(currentPassword, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
      return;
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to change password'
    });
  }
};
