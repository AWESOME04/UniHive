import { Request, Response, NextFunction } from 'express';
import { Hive, User, HiveReview, HiveType } from '../models';
import { sequelize } from '../config/database';

// Create a review for a completed hive
export const createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { hiveId } = req.params;
    const userId = req.user.id;
    const { reviewedId, rating, comment } = req.body;
    
    // Validate required fields
    if (!reviewedId || !rating) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Reviewed user ID and rating are required'
      });
      return;
    }
    
    // Validate rating
    if (rating < 1 || rating > 5) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Rating must be between 1 and 5'
      });
      return;
    }
    
    // Find the hive
    const hive = await Hive.findByPk(hiveId, { transaction });
    
    if (!hive) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check if the user is either the poster or the assignee
    if (hive.postedById !== userId && hive.assignedToId !== userId) {
      await transaction.rollback();
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to review this hive'
      });
      return;
    }
    
    // Check if the reviewed user is also part of the hive
    if (hive.postedById !== reviewedId && hive.assignedToId !== reviewedId) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Reviewed user must be part of this hive'
      });
      return;
    }
    
    // Check if the user is trying to review themselves
    if (userId === reviewedId) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'You cannot review yourself'
      });
      return;
    }
    
    // Check if the hive is completed
    if (hive.status !== 'completed' && hive.status !== 'confirmed') {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'You can only review a completed hive'
      });
      return;
    }
    
    // Check if the user has already reviewed this user for this hive
    const existingReview = await HiveReview.findOne({
      where: {
        hiveId,
        reviewerId: userId,
        reviewedId
      },
      transaction
    });
    
    if (existingReview) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'You have already reviewed this user for this hive'
      });
      return;
    }
    
    // Create the review
    const review = await HiveReview.create({
      hiveId,
      reviewerId: userId,
      reviewedId,
      rating,
      comment: comment || ''
    }, { transaction });
    
    // Update the user's average rating
    const reviewedUser = await User.findByPk(reviewedId, { transaction });
    if (!reviewedUser) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Reviewed user not found'
      });
      return;
    }

    const userReviews = await HiveReview.findAll({
      where: { reviewedId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
      transaction
    });
    
    const averageRating = userReviews[0].getDataValue('averageRating');
    await reviewedUser.update({ rating: averageRating }, { transaction });
    
    await transaction.commit();
    
    res.status(201).json({
      status: 'success',
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create review'
    });
  }
};

// Get all reviews for a specific hive
export const getHiveReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { hiveId } = req.params;
    
    // Check if the hive exists
    const hive = await Hive.findByPk(hiveId);
    if (!hive) {
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    const reviews = await HiveReview.findAll({
      where: { hiveId },
      include: [
        {
          model: User,
          as: 'reviewerUser',
          attributes: ['id', 'name', 'profileImage', 'university']
        },
        {
          model: User,
          as: 'reviewedUser',
          attributes: ['id', 'name', 'profileImage', 'university']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get hive reviews error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reviews'
    });
  }
};

// Get all reviews for a specific user
export const getUserReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }
    
    const reviews = await HiveReview.findAll({
      where: { reviewedId: userId },
      include: [
        {
          model: User,
          as: 'reviewerUser',
          attributes: ['id', 'name', 'profileImage', 'university']
        },
        {
          model: Hive,
          include: [
            {
              model: HiveType,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;
    
    res.status(200).json({
      status: 'success',
      count: reviews.length,
      averageRating,
      data: reviews
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user reviews'
    });
  }
};
